/**
 * Event Data Parser Utility
 *
 * Parses uploaded text files or CSV files to auto-fill panel event creation forms.
 * Supports multiple formats for maximum flexibility.
 */

import type { PanelEvent } from '../types';

export type ParsedEventData = Omit<PanelEvent, 'id' | 'createdAt' | 'panelists' | 'generatedEmails' | 'recordingLink'>;

/**
 * Parses event data from uploaded file (text or CSV)
 */
export async function parseEventDataFromFile(file: File): Promise<ParsedEventData> {
  const text = await readFileAsText(file);

  if (file.name.endsWith('.csv')) {
    return parseEventDataFromCSV(text);
  } else {
    return parseEventDataFromText(text);
  }
}

/**
 * Attempts to pull event data out of an unstructured brief (email, doc, etc.)
 * Falls back to heuristics similar to our "Codex plan" so we can operate without an API key.
 */
export function parseEventDataFromUnstructuredText(rawText: string): ParsedEventData | null {
  const normalized = rawText
    .replace(/\r\n/g, '\n')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/\s+$/g, '');

  const kvParsed = parseEventDataFromText(normalized);
  if (validateEventData(kvParsed).isValid) {
    return kvParsed;
  }

  const data: ParsedEventData = {
    name: '',
    panelTitle: '',
    panelSubtitle: '',
    panelPurpose: '',
    eventDate: '',
    eventDateFull: '',
    eventDateShort: '',
    eventDateMinus1: '',
    discussionPoints: ['', '', '', '', ''],
    briefTopicDescription: '',
  };

  const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const valueAfter = (label: string): string | null => {
    const pattern = new RegExp(`${escapeRegex(label)}\\s*[:\\-]\\s*(.+)`, 'i');
    const match = normalized.match(pattern);
    return match ? match[1].trim() : null;
  };

  const lines = normalized
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length);

  const topicLineCandidate = lines.find((line) => /^topic\b/i.test(line));
  if (topicLineCandidate) {
    const value = topicLineCandidate.split(/[:\\-]/)[1]?.trim();
    if (value) {
      data.panelSubtitle = value;
    }
  }

  const explicitTopic = valueAfter('Topic') || valueAfter('Webinar Topic');
  if (explicitTopic) {
    data.panelSubtitle = explicitTopic;
    data.briefTopicDescription = data.briefTopicDescription || explicitTopic;
  }

  const panelTitleFromLabel = [
    'Panel Title',
    'Webinar Series',
    "Veterinary Business Institute's",
    'Annual Expert Panel Webinar Series',
  ]
    .map((label) => valueAfter(label))
    .find((value) => value && value.trim().length > 0);
  if (panelTitleFromLabel) {
    data.panelTitle = panelTitleFromLabel;
  }

  if (!data.panelTitle) {
    const panelLineIndex = lines.findIndex(
      (line) => /panel\b/i.test(line) && !/:/.test(line) && line.length <= 120
    );
    if (panelLineIndex !== -1) {
      data.panelTitle = lines[panelLineIndex];
      const nextLine = lines[panelLineIndex + 1];
      if (!data.panelSubtitle && nextLine && /[\u2013\u2014-]/.test(nextLine)) {
        data.panelSubtitle = nextLine;
      }
    }
  }

  if (!data.panelTitle && data.panelSubtitle) {
    data.panelTitle = data.panelSubtitle;
  }

  const purposeLine =
    valueAfter('This webinar is designed to') ||
    valueAfter('This webinar will') ||
    valueAfter('Webinar Focused On');
  if (purposeLine) {
    data.panelPurpose = `This webinar is designed to ${purposeLine.replace(/\.+$/, '')}`;
  }

  const aboutIndex = lines.findIndex((line) => /about the event/i.test(line));
  if (!data.panelPurpose && aboutIndex !== -1) {
    const aboutParagraph = lines
      .slice(aboutIndex + 1, aboutIndex + 5)
      .join(' ')
      .trim();
    if (aboutParagraph) {
      const sentence = findSentenceContaining(aboutParagraph, /(has transformed|designed to|help)/i);
      if (sentence) {
        data.panelPurpose = sentence;
      }
    }
  }

  const dateLine = valueAfter('Date') || valueAfter('Date & Time');
  if (dateLine) {
    extractDatesFromLine(dateLine, data);
  }

  lines.forEach((line) => {
    if (/date/i.test(line) && /\d{4}/.test(line)) {
      extractDatesFromLine(line, data);
    }
  });

  const timeLine = valueAfter('Time');
  if (timeLine && data.eventDateFull && !/at\s/i.test(data.eventDateFull)) {
    data.eventDateFull = `${data.eventDateFull} at ${timeLine}`;
  }

  ensureDateFields(data);

  if (!data.name && data.panelTitle && data.eventDate) {
    data.name = `${data.eventDate} Panel Event`;
  }

  const focusMatch = normalized.match(/Webinar Focus:\s*([\s\S]*?)(?:\n\s*\n|$)/i);
  if (focusMatch) {
    const focusLines = focusMatch[1]
      .split('\n')
      .map((l) => stripBulletPrefix(l))
      .filter((l) => l.length);
    focusLines.slice(0, 5).forEach((line, idx) => {
      data.discussionPoints[idx] = line;
    });
  }

  if (data.discussionPoints.filter(Boolean).length === 0) {
    const sectionHeaders = [
      /what you['ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢]ll learn/i,
      /what you will learn/i,
      /key takeaways/i,
      /why attend/i,
    ];
    for (const header of sectionHeaders) {
      const index = lines.findIndex((line) => header.test(line));
      if (index !== -1) {
        const collected: string[] = [];
        for (let i = index + 1; i < lines.length; i++) {
          if (!lines[i]) break;
          if (/^[A-Za-z].+:/.test(lines[i])) break;
          const candidate = stripBulletPrefix(lines[i]);
          if (!candidate) break;
          collected.push(candidate);
          if (collected.length >= 5) break;
        }
        if (collected.length) {
          collected.slice(0, 5).forEach((line, idx) => {
            data.discussionPoints[idx] = line;
          });
          break;
        }
      }
    }
  }

  if (data.discussionPoints.filter(Boolean).length === 0) {
    const bullets: string[] = [];
    const bulletRegex = /[\-\u2013\u2014]\s*(.+)/g;
    let match: RegExpExecArray | null;
    while ((match = bulletRegex.exec(normalized)) !== null) {
      bullets.push(match[1].trim());
    }
    bullets.slice(0, 5).forEach((line, idx) => {
      data.discussionPoints[idx] = line;
    });
  }

  if (!data.panelPurpose) {
    const purposeSentence = findSentenceContaining(normalized, /(designed to|aims to|help|focus)/i);
    if (purposeSentence) {
      data.panelPurpose = purposeSentence;
    }
  }

  if (!data.briefTopicDescription) {
    const summary = data.discussionPoints
      .filter(Boolean)
      .map((p) => p.split(/[\u2013\u2014-]/)[0].trim())
      .slice(0, 3)
      .join(', ');
    if (summary) {
      data.briefTopicDescription = summary;
    }
  }

    const hasMeaningfulData =
    [
      data.name,
      data.panelTitle,
      data.panelSubtitle,
      data.panelPurpose,
      data.eventDate,
      data.eventDateFull,
      data.briefTopicDescription,
    ].some((value) => value && value.trim().length > 0) ||
    data.discussionPoints.some((point) => point && point.trim().length > 0);

  if (!hasMeaningfulData) {
    return null;
  }

  return data;
}
/**
 * Parses event data from plain text format
 *
 * Expected format:
 * Event Name: OCT 29 Panel Event
 * Panel Title: Veterinary Talent Solutions Panel
 * Panel Subtitle: The Workforce Crisis - Real Strategies...
 * Panel Purpose: address the workforce crisis in veterinary medicine
 * Event Date: October 29th
 * Event Date Full: Tuesday, October 29th, 2025
 * Event Date Short: 29th
 * Event Date Minus 1: October 28th
 * Discussion Point 1: Beyond job postings: creative recruitment strategies
 * Discussion Point 2: Building a culture that retains top talent
 * ... (up to 5 points)
 * Brief Topic Description: recruitment, retention, and rebuilding teams
 */
export function parseEventDataFromText(text: string): ParsedEventData {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);

  const data: any = {
    name: '',
    panelTitle: '',
    panelSubtitle: '',
    panelPurpose: '',
    eventDate: '',
    eventDateFull: '',
    eventDateShort: '',
    eventDateMinus1: '',
    discussionPoints: [],
    briefTopicDescription: '',
  };

  const discussionPoints: string[] = [];

  for (const line of lines) {
    // Parse key-value pairs
    if (line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      const normalizedKey = key.trim().toLowerCase();

      if (normalizedKey === 'event name' || normalizedKey === 'name') {
        data.name = value;
      } else if (normalizedKey === 'panel title' || normalizedKey === 'title') {
        data.panelTitle = value;
      } else if (normalizedKey === 'panel subtitle' || normalizedKey === 'subtitle') {
        data.panelSubtitle = value;
      } else if (normalizedKey === 'panel purpose' || normalizedKey === 'purpose') {
        data.panelPurpose = value;
      } else if (normalizedKey === 'event date' && !normalizedKey.includes('full') && !normalizedKey.includes('short') && !normalizedKey.includes('minus')) {
        data.eventDate = value;
      } else if (normalizedKey === 'event date full' || normalizedKey === 'full date') {
        data.eventDateFull = value;
      } else if (normalizedKey === 'event date short' || normalizedKey === 'short date') {
        data.eventDateShort = value;
      } else if (normalizedKey === 'event date minus 1' || normalizedKey === 'date minus 1') {
        data.eventDateMinus1 = value;
      } else if (normalizedKey.startsWith('discussion point')) {
        discussionPoints.push(value);
      } else if (normalizedKey === 'brief topic description' || normalizedKey === 'topic description') {
        data.briefTopicDescription = value;
      }
    }
  }

  // Ensure we have exactly 5 discussion points
  while (discussionPoints.length < 5) {
    discussionPoints.push('');
  }
  data.discussionPoints = discussionPoints.slice(0, 5);

  return data as ParsedEventData;
}

/**
 * Parses event data from CSV format
 *
 * Expected CSV format:
 * Field,Value
 * Event Name,OCT 29 Panel Event
 * Panel Title,Veterinary Talent Solutions Panel
 * Panel Subtitle,The Workforce Crisis...
 * ...
 */
export function parseEventDataFromCSV(csvText: string): ParsedEventData {
  const lines = csvText.trim().split('\n');

  const data: any = {
    name: '',
    panelTitle: '',
    panelSubtitle: '',
    panelPurpose: '',
    eventDate: '',
    eventDateFull: '',
    eventDateShort: '',
    eventDateMinus1: '',
    discussionPoints: [],
    briefTopicDescription: '',
  };

  const discussionPoints: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length < 2) continue;

    const key = values[0].trim().toLowerCase();
    const value = values.slice(1).join(',').trim();

    if (key === 'event name' || key === 'name') {
      data.name = value;
    } else if (key === 'panel title' || key === 'title') {
      data.panelTitle = value;
    } else if (key === 'panel subtitle' || key === 'subtitle') {
      data.panelSubtitle = value;
    } else if (key === 'panel purpose' || key === 'purpose') {
      data.panelPurpose = value;
    } else if (key === 'event date') {
      data.eventDate = value;
    } else if (key === 'event date full' || key === 'full date') {
      data.eventDateFull = value;
    } else if (key === 'event date short' || key === 'short date') {
      data.eventDateShort = value;
    } else if (key === 'event date minus 1' || key === 'date minus 1') {
      data.eventDateMinus1 = value;
    } else if (key.startsWith('discussion point')) {
      discussionPoints.push(value);
    } else if (key === 'brief topic description' || key === 'topic description') {
      data.briefTopicDescription = value;
    }
  }

  // Ensure we have exactly 5 discussion points
  while (discussionPoints.length < 5) {
    discussionPoints.push('');
  }
  data.discussionPoints = discussionPoints.slice(0, 5);

  return data as ParsedEventData;
}

/**
 * Parses a CSV line handling quoted values
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim().replace(/^"|"$/g, ''));
  return result;
}

/**
 * Reads file as text
 */
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

/**
 * Generates a template text file for users to fill out
 */
export function generateEventDataTemplate(): string {
  return `Event Name: OCT 29 Panel Event
Panel Title: Veterinary Talent Solutions Panel
Panel Subtitle: The Workforce Crisis - Real Strategies to Recruit, Retain, and Rebuild Veterinary Teams
Panel Purpose: address the workforce crisis in veterinary medicine
Event Date: October 29th
Event Date Full: Tuesday, October 29th, 2025
Event Date Short: 29th
Event Date Minus 1: October 28th
Discussion Point 1: Beyond job postings: creative recruitment strategies
Discussion Point 2: Building a culture that retains top talent
Discussion Point 3: Addressing burnout and building resilience
Discussion Point 4: The role of ownership models in staff retention
Discussion Point 5: Creating sustainable career pathways in veterinary medicine
Brief Topic Description: recruitment, retention, and rebuilding teams

# Instructions:
# 1. Fill in each field after the colon
# 2. Keep the format: "Field Name: Your Value"
# 3. Include all 5 discussion points
# 4. Save as .txt file
# 5. Upload to auto-fill the event creation form
`;
}

/**
 * Generates a template CSV file for users to fill out
 */
export function generateEventDataTemplateCSV(): string {
  return `Field,Value
Event Name,OCT 29 Panel Event
Panel Title,Veterinary Talent Solutions Panel
Panel Subtitle,The Workforce Crisis - Real Strategies to Recruit Retain and Rebuild Veterinary Teams
Panel Purpose,address the workforce crisis in veterinary medicine
Event Date,October 29th
Event Date Full,"Tuesday, October 29th, 2025"
Event Date Short,29th
Event Date Minus 1,October 28th
Discussion Point 1,Beyond job postings: creative recruitment strategies
Discussion Point 2,Building a culture that retains top talent
Discussion Point 3,Addressing burnout and building resilience
Discussion Point 4,The role of ownership models in staff retention
Discussion Point 5,Creating sustainable career pathways in veterinary medicine
Brief Topic Description,recruitment retention and rebuilding teams
`;
}

/**
 * Validates parsed event data
 */
export function validateEventData(data: ParsedEventData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.name || data.name.trim() === '') {
    errors.push('Event Name is required');
  }

  if (!data.panelTitle || data.panelTitle.trim() === '') {
    errors.push('Panel Title is required');
  }

  if (!data.panelSubtitle || data.panelSubtitle.trim() === '') {
    errors.push('Panel Subtitle is required');
  }

  if (!data.panelPurpose || data.panelPurpose.trim() === '') {
    errors.push('Panel Purpose is required');
  }

  if (!data.eventDate || data.eventDate.trim() === '') {
    errors.push('Event Date is required');
  }

  if (!data.eventDateFull || data.eventDateFull.trim() === '') {
    errors.push('Event Date Full is required');
  }

  if (!data.discussionPoints || data.discussionPoints.length < 5) {
    errors.push('5 Discussion Points are required');
  } else {
    const emptyPoints = data.discussionPoints.filter(p => !p || p.trim() === '');
    if (emptyPoints.length > 0) {
      errors.push(`${emptyPoints.length} discussion point(s) are empty`);
    }
  }

  if (!data.briefTopicDescription || data.briefTopicDescription.trim() === '') {
    errors.push('Brief Topic Description is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}


function ensureDateFields(data: ParsedEventData) {
  if (data.eventDateFull) {
    extractDatesFromLine(data.eventDateFull, data);
  } else if (data.eventDate) {
    extractDatesFromLine(data.eventDate, data);
  }
}

function stripBulletPrefix(line: string): string {
  return line
    .replace(/^[\u2022\u2023\u2043\u25AA\u25CF\u25C9\u25CB\u25E6\u2212\u2013\u2014\-\*]+\s*/u, '')
    .replace(/^[:\s]+/, '')
    .trim();
}
function extractDatesFromLine(line: string, data: ParsedEventData) {
  const cleaned = line.replace(/Time:.+/i, '').trim();
  const dateMatch = cleaned.match(/([A-Za-z]+,\s*)?[A-Za-z]+\s*\d{1,2}(?:st|nd|rd|th)?(?:,\s*\d{4})?/);
  if (!dateMatch) return;

  const dateString = dateMatch[0].replace(/(\d)(st|nd|rd|th)/gi, '$1');
  const parsed = Date.parse(dateString);
  if (!Number.isNaN(parsed)) {
    const date = new Date(parsed);
    data.eventDateFull = formatFullDate(date);
    data.eventDate = formatMonthDay(date);
    data.eventDateShort = formatDayWithSuffix(date);

    const minusOne = new Date(date);
    minusOne.setDate(date.getDate() - 1);
    data.eventDateMinus1 = formatMonthDay(minusOne);
  } else {
    data.eventDateFull = cleaned;
  }
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

function formatMonthDay(date: Date): string {
  const month = date.toLocaleString('default', { month: 'long' });
  return `${month} ${getDaySuffix(date.getDate())}`;
}

function formatDayWithSuffix(date: Date): string {
  return getDaySuffix(date.getDate());
}

function formatFullDate(date: Date): string {
  return date.toLocaleString('default', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function findSentenceContaining(text: string, regex: RegExp): string | null {
  const sentences = text.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/);
  for (const sentence of sentences) {
    if (regex.test(sentence)) {
      return sentence.trim();
    }
  }
  return null;
}






