import type { Panelist, CSVPanelistRow } from '../types';

const REQUIRED_HEADERS = [
  'First Name',
  'Full Name',
  'Email',
  'Zoom Join Link',
  'Registration Tracking Link',
] as const;

/**
 * Parses CSV text and converts to panelist objects
 */
export function parseCSV(csvText: string): Panelist[] {
  const lines = csvText.trim().split('\n');

  if (lines.length < 2) {
    throw new Error('CSV must have at least a header row and one data row');
  }

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const panelists: Panelist[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);

    if (values.length === 0 || values.every(v => !v)) {
      continue; // Skip empty lines
    }

    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    try {
      const panelist = rowToPanelist(row as unknown as CSVPanelistRow);
      panelists.push(panelist);
    } catch (error) {
      console.error(`Error parsing row ${i + 1}:`, error);
      throw new Error(`Error parsing row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return panelists;
}

/**
 * Parses a single CSV line, handling quoted values with commas
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
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

/**
 * Converts a CSV row to a Panelist object
 */
function rowToPanelist(row: CSVPanelistRow): Panelist {
  // Validate required fields
  for (const field of REQUIRED_HEADERS) {
    const key = field as keyof CSVPanelistRow;
    if (!row[key]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Collect questions
  const questions: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const key = `Question ${i}` as keyof CSVPanelistRow;
    questions.push(row[key] || '');
  }

  return {
    id: crypto.randomUUID(),
    firstName: row['First Name'],
    fullName: row['Full Name'],
    email: row['Email'],
    zoomJoinLink: row['Zoom Join Link'],
    registrationTrackingLink: row['Registration Tracking Link'],
    promotionalMaterialsLink: row['Promotional Materials Link'] || '',
    questionsLink: row['Questions Link'] || '',
    finalBannerLink: row['Final Banner Link'] || '',
    questions,
  };
}

/**
 * Validates CSV headers
 */
export function validateCSVHeaders(csvText: string): {
  isValid: boolean;
  missingHeaders: string[];
  headers: string[];
} {
  const lines = csvText.trim().split('\n');

  if (lines.length === 0) {
    return {
      isValid: false,
      missingHeaders: [],
      headers: [],
    };
  }

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

  const missingHeaders = REQUIRED_HEADERS.filter(h => !headers.includes(h));

  return {
    isValid: missingHeaders.length === 0,
    missingHeaders,
    headers,
  };
}

type ParsedZoomRow = {
  name: string;
  email: string;
  joinLink: string;
};

type ContactInfo = {
  name: string;
  emails: string[];
  links: string[];
};

const QUESTIONS_TEMPLATE = Array.from({ length: 5 }, () => '');
type TrackingEntry = {
  displayName: string;
  link: string;
};

/**
 * Attempts to parse unstructured text (Zoom exports, email dumps, etc.) into panelists.
 */
export function parseUnstructuredPanelistText(rawText: string): Panelist[] {
  let normalizedText = rawText.replace(/\r\n/g, '\n');
  const sectionLabels = ['General Link', 'Tracking Links', 'Unique Login Link'];
  for (const label of sectionLabels) {
    const regex = new RegExp(`([^\\n])(${label}\\s*:)`, 'gi');
    normalizedText = normalizedText.replace(regex, (_, prefix, match) => {
      return `${prefix}\n${match}`;
    });
  }

  const trackingLinks = extractTrackingLinks(normalizedText);
  const trackingKeys = Array.from(trackingLinks.keys());
  const generalLink = extractGeneralLink(normalizedText);
  const contactInfo = extractContactInfo(normalizedText);
  const contactKeys = Array.from(contactInfo.keys());
  const zoomRows = [
    ...extractZoomTableRows(normalizedText),
    ...extractMarkdownTableRows(normalizedText),
    ...extractTabSeparatedRows(normalizedText),
    ...extractWhitespaceSeparatedRows(normalizedText),
  ];

  const panelists: Panelist[] = [];
  const rowMap = new Map<string, ParsedZoomRow>();

  for (const row of zoomRows) {
    const normalized = normalizeName(row.name);
    if (!normalized) continue;
    if (!rowMap.has(normalized)) {
      rowMap.set(normalized, row);
    }
  }

  if (trackingKeys.length > 0) {
    for (const key of trackingKeys) {
      const trackingEntry = trackingLinks.get(key);
      if (!trackingEntry) continue;

      const row = rowMap.get(key);
      const contact = contactInfo.get(key);
      const context = collectContextForName(normalizedText, key);

      const email =
        row?.email ||
        contact?.emails?.[0] ||
        extractEmails(context)[0] ||
        findEmailForName(normalizedText, key) ||
        '';

      if (!email) {
        continue;
      }

      const joinLink =
        row?.joinLink ||
        extractZoomJoinUrl(context) ||
        contact?.links?.find((link) => /zoom\.us\/(w|j)\//i.test(link)) ||
        findJoinLinkForName(normalizedText, key) ||
        generalLink ||
        trackingEntry.link;

      if (!joinLink) {
        continue;
      }

      const promotionalLinkCandidate =
        contact?.links?.find((link) => !link.includes('linkedin.com') && !/zoom\.us\/(w|j)\//i.test(link)) ||
        extractNonZoomLink(context);
      const promotionalLink =
        promotionalLinkCandidate && promotionalLinkCandidate !== trackingEntry.link
          ? promotionalLinkCandidate
          : '';

      const fullName = (row?.name || contact?.name || trackingEntry.displayName).trim();
      const firstName = deriveFirstName(fullName);

      panelists.push({
        id: crypto.randomUUID(),
        firstName,
        fullName,
        email,
        zoomJoinLink: joinLink,
        registrationTrackingLink: trackingEntry.link,
        promotionalMaterialsLink: promotionalLink,
        questionsLink: '',
        finalBannerLink: '',
        questions: [...QUESTIONS_TEMPLATE],
      });
    }

    return panelists;
  }

  for (const [normalizedName, row] of rowMap.entries()) {
    const contactMatchKey = findBestMatch(normalizedName, contactKeys);
    const contact = contactMatchKey ? contactInfo.get(contactMatchKey) : undefined;
    const context = collectContextForName(normalizedText, normalizedName);

    const email =
      row.email ||
      contact?.emails?.[0] ||
      extractEmails(context)[0] ||
      findEmailForName(normalizedText, normalizedName) ||
      '';
    if (!email) {
      continue;
    }

    const joinLink =
      row.joinLink ||
      extractZoomJoinUrl(context) ||
      contact?.links?.find((link) => /zoom\.us\/(w|j)\//i.test(link)) ||
      findJoinLinkForName(normalizedText, normalizedName) ||
      generalLink ||
      '';
    if (!joinLink) {
      continue;
    }

    const promotionalLinkCandidate =
      contact?.links?.find((link) => !link.includes('linkedin.com') && !/zoom\.us\/(w|j)\//i.test(link)) ||
      extractNonZoomLink(context);
    const promotionalLink =
      promotionalLinkCandidate && promotionalLinkCandidate !== joinLink
        ? promotionalLinkCandidate
        : '';

    const fullName = (contact?.name || row.name).trim();
    const firstName = deriveFirstName(fullName);

    panelists.push({
      id: crypto.randomUUID(),
      firstName,
      fullName,
      email,
      zoomJoinLink: joinLink,
      registrationTrackingLink: generalLink || joinLink,
      promotionalMaterialsLink: promotionalLink,
      questionsLink: '',
      finalBannerLink: '',
      questions: [...QUESTIONS_TEMPLATE],
    });
  }

  if (panelists.length === 0) {
    const names = extractLikelyNames(normalizedText);
    for (const fullName of names) {
      const firstName = deriveFirstName(fullName);
      panelists.push({
        id: crypto.randomUUID(),
        firstName,
        fullName,
        email: '',
        zoomJoinLink: '',
        registrationTrackingLink: generalLink || '',
        promotionalMaterialsLink: '',
        questionsLink: '',
        finalBannerLink: '',
        questions: [...QUESTIONS_TEMPLATE],
      });
    }
  }

  return panelists;
}

function extractZoomTableRows(text: string): ParsedZoomRow[] {
  const lines = text.split('\n');
  const headerIndex = lines.findIndex((line) =>
    line.trim().toLowerCase().startsWith('webinar id')
  );

  if (headerIndex === -1) {
    return [];
  }

  const rows: string[] = [];
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      if (rows.length > 0) {
        break;
      }
      continue;
    }

    if (line.toLowerCase().startsWith('unique login link')) {
      break;
    }

    if (line.startsWith(',') && rows.length > 0) {
      rows[rows.length - 1] += line;
      continue;
    }

    if (!line.includes(',')) {
      continue;
    }

    rows.push(line);
  }

  const parsedRows: ParsedZoomRow[] = [];

  for (const row of rows) {
    const parts = row.split(',');
    if (parts.length < 4) {
      continue;
    }

    const [, displayNameRaw, emailRaw, ...rest] = parts;

    const displayName = displayNameRaw.trim().replace(/^"|"$/g, '');
    const email = emailRaw.trim().replace(/^"|"$/g, '');
    const joinLink = rest.join(',').trim().replace(/^"|"$/g, '');

    if (!displayName || !joinLink) {
      continue;
    }

    parsedRows.push({
      name: displayName,
      email,
      joinLink,
    });
  }

  return parsedRows;
}

function extractMarkdownTableRows(text: string): ParsedZoomRow[] {
  const lines = text.split('\n');
  const headerIndex = lines.findIndex((line) => {
    const trimmed = line.trim().toLowerCase();
    return trimmed.startsWith('|') && trimmed.includes('webinar id');
  });

  if (headerIndex === -1) {
    return [];
  }

  const rows: string[] = [];
  for (let i = headerIndex + 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim().startsWith('|')) {
      break;
    }

    rows.push(line);
  }

  const parsedRows: ParsedZoomRow[] = [];

  for (const row of rows) {
    const columns = row.split('|').slice(1, -1).map((cell) => cell.trim());
    const displayNameRaw = columns[1] || '';
    const displayName = stripMarkdownFormatting(displayNameRaw);

    const email = extractEmails(row)[0] || '';
    const joinLink = extractZoomJoinUrl(row);

    if (!displayName || !joinLink) {
      continue;
    }

    parsedRows.push({
      name: displayName,
      email,
      joinLink,
    });
  }

  return parsedRows;
}

function extractTabSeparatedRows(text: string): ParsedZoomRow[] {
  const lines = text.split('\n');
  const headerIndex = lines.findIndex((line) => {
    const normalized = line.trim().toLowerCase();
    return normalized.startsWith('webinar id') && normalized.includes('\t');
  });

  if (headerIndex === -1) {
    return [];
  }

  const parsedRows: ParsedZoomRow[] = [];

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      break;
    }

    const columns = line.split(/\t+/);
    const displayName = stripMarkdownFormatting(columns[1] || '');
    const email = extractEmails(line)[0] || '';
    const joinLink = extractZoomJoinUrl(line);

    if (!displayName || !joinLink) {
      continue;
    }

    parsedRows.push({
      name: displayName,
      email,
      joinLink,
    });
  }

  return parsedRows;
}

function extractWhitespaceSeparatedRows(text: string): ParsedZoomRow[] {
  const lines = text.split('\n');
  const headerIndex = lines.findIndex((line) => {
    const trimmed = line.trim().toLowerCase();
    return trimmed.startsWith('webinar id') && /\s{2,}/.test(trimmed);
  });

  if (headerIndex === -1) {
    return [];
  }

  const parsedRows: ParsedZoomRow[] = [];

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      break;
    }

    if (!/\s{2,}/.test(line)) {
      continue;
    }

    const columns = line.split(/\s{2,}/).map((cell) => cell.trim());

    const nameColumn = columns[1] || columns[0] || '';
    const displayName = stripMarkdownFormatting(nameColumn);
    const email = extractEmails(line)[0] || '';
    const joinLink = extractZoomJoinUrl(line);

    if (!displayName || !joinLink) {
      continue;
    }

    parsedRows.push({
      name: displayName,
      email,
      joinLink,
    });
  }

  return parsedRows;
}

function extractTrackingLinks(text: string): Map<string, TrackingEntry> {
  const map = new Map<string, TrackingEntry>();
  const trackingSectionMatch = text.match(/Tracking Links\s*:\s*([\s\S]*?)(?:\n\s*\n|\nUnique Login Link|$)/i);

  if (!trackingSectionMatch) {
    return map;
  }

  const lines = trackingSectionMatch[1].split('\n');
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const namePart = line.slice(0, colonIndex);
    const linkPart = line.slice(colonIndex + 1);

    const name = stripMarkdownFormatting(namePart.replace(/^[*\-\u2022]+\s*/, '').trim());
    const link = extractFirstUrl(linkPart);
    if (!name || !link) continue;

    const normalized = normalizeName(name);
    if (normalized) {
      map.set(normalized, { displayName: name, link });
    }
  }

  return map;
}

function extractGeneralLink(text: string): string | null {
  const match = text.match(/General Link\s*:\s*(https?:\/\/\S+)/i);
  return match ? sanitizeUrl(match[1]) : null;
}

function extractContactInfo(text: string): Map<string, ContactInfo> {
  const map = new Map<string, ContactInfo>();
  const lines = text.split('\n');

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const emailMatches = line.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi);
    if (!emailMatches) continue;

    const parts = line.split(/\t| {2,}/);
    const nameCandidate = parts[0]?.trim();
    if (!nameCandidate) continue;
    if (/^\d/.test(nameCandidate)) continue;

    const normalized = normalizeName(nameCandidate);
    if (!normalized) continue;

    const urlMatches = line.match(/https?:\/\/\S+/gi) || [];

    const existing = map.get(normalized) || {
      name: nameCandidate,
      emails: [],
      links: [],
    };

    existing.name = nameCandidate;
    existing.emails = Array.from(
      new Set([...existing.emails, ...emailMatches.map((email) => email.trim())])
    );
    existing.links = Array.from(
      new Set([...existing.links, ...urlMatches.map((url) => sanitizeUrl(url)).filter(Boolean) as string[]])
    );

    map.set(normalized, existing);
  }

  return map;
}

function normalizeName(name: string): string {
  return stripTitle(name)
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}

function stripTitle(name: string): string {
  return name.replace(/^(dr|mr|mrs|ms|miss|prof|sir)\.?\s+/i, '').trim();
}

function deriveFirstName(name: string): string {
  const withoutTitle = stripTitle(name);
  const [first = ''] = withoutTitle.split(/\s+/);
  return first || withoutTitle || name;
}

function sanitizeUrl(url: string): string | null {
  const match = url.match(/https?:\/\/[^\s"'\)\]]+/i);
  if (!match) {
    return null;
  }

  const cleaned = match[0].replace(/[),.;]+$/, '');
  return cleaned || null;
}

function findBestMatch(target: string, candidates: string[]): string | null {
  if (!target || candidates.length === 0) {
    return null;
  }

  if (candidates.includes(target)) {
    return target;
  }

  const prefixMatch = candidates.find((candidate) => {
    const len = Math.min(candidate.length, target.length);
    return len >= 6 && candidate.slice(0, len) === target.slice(0, len);
  });

  if (prefixMatch) {
    return prefixMatch;
  }

  let bestCandidate: string | null = null;
  let bestScore = 0;

  for (const candidate of candidates) {
    const score = longestCommonPrefix(candidate, target);
    if (score > bestScore) {
      bestScore = score;
      bestCandidate = candidate;
    }
  }

  return bestScore >= 5 ? bestCandidate : null;
}

function longestCommonPrefix(a: string, b: string): number {
  const length = Math.min(a.length, b.length);
  let i = 0;
  while (i < length && a[i] === b[i]) {
    i++;
  }
  return i;
}

function normalizeForMatching(text: string): string {
  return text
    .toLowerCase()
    .replace(/\b(dr|mr|mrs|ms|miss|prof|sir)\.?/g, '')
    .replace(/[^a-z]/g, '');
}

function findJoinLinkForName(text: string, normalizedName: string): string | null {
  const lines = text.split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    const normalizedLine = normalizeForMatching(line);
    if (!normalizedLine.includes(normalizedName)) continue;
    const joinLink = extractZoomJoinUrl(line);
    if (joinLink) {
      return joinLink;
    }
  }
  return null;
}

function findEmailForName(text: string, normalizedName: string): string | null {
  const lines = text.split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    const normalizedLine = normalizeForMatching(line);
    if (!normalizedLine.includes(normalizedName)) continue;
    const emails = extractEmails(line);
    if (emails.length > 0) {
      return emails[0];
    }
  }
  return null;
}

function collectContextForName(text: string, normalizedName: string): string {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const normalizedLine = normalizeForMatching(line);
    if (!normalizedLine.includes(normalizedName)) continue;
    const windowStart = Math.max(0, i - 1);
    const windowEnd = Math.min(lines.length, i + 3);
    return lines.slice(windowStart, windowEnd).join('\n');
  }
  return '';
}

function stripMarkdownFormatting(text: string): string {
  return text.replace(/\*\*/g, '').replace(/__|`/g, '').trim();
}

function extractFirstUrl(text: string): string {
  const markdownMatch = text.match(/\[.*?\]\((https?:\/\/[^\s)]+)\)/i);
  if (markdownMatch) {
    const sanitized = sanitizeUrl(markdownMatch[1]);
    if (sanitized) {
      return sanitized;
    }
  }

  const directMatch = sanitizeUrl(text);
  return directMatch || '';
}

function extractEmails(text: string): string[] {
  const matches = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi);
  return matches ? matches.map((email) => email.trim()) : [];
}

function extractZoomJoinUrl(text: string): string | null {
  const urls = text.match(/https?:\/\/[^\s"')]+/gi);
  if (!urls) {
    return null;
  }

  const preferred = urls.find((url) => /zoom\.us\/w\//i.test(url) || /zoom\.us\/j\//i.test(url));
  const candidate = preferred || urls[0];
  return sanitizeUrl(candidate);
}

function extractNonZoomLink(text: string): string | null {
  const urls = text.match(/https?:\/\/[^\s"')]+/gi);
  if (!urls) {
    return null;
  }

  const candidate = urls.find((url) => !/zoom\.us\//i.test(url));
  return candidate ? sanitizeUrl(candidate) : null;
}

function extractLikelyNames(text: string): string[] {
  const results = new Set<string>();
  const pieces = text
    .replace(/\band\b/gi, '\n')
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const nameRegex = /^(?:Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)$/;
  for (const piece of pieces) {
    const m = piece.match(nameRegex);
    if (!m) continue;
    results.add(piece.replace(/\s+/g, ' ').trim());
  }
  return Array.from(results);
}

/**
 * Generates a CSV template that users can fill out
 */
export function generateCSVTemplate(): string {
  const headers = [
    'First Name',
    'Full Name',
    'Email',
    'Zoom Join Link',
    'Registration Tracking Link',
    'Promotional Materials Link',
    'Questions Link',
    'Final Banner Link',
    'Question 1',
    'Question 2',
    'Question 3',
    'Question 4',
    'Question 5',
  ];

  const exampleRow = [
    'Keith',
    'Keith True',
    'keith@example.com',
    'https://us02web.zoom.us/w/82154...',
    'https://us02web.zoom.us/webinar/register/...',
    'https://docs.google.com/document/d/...',
    'https://docs.google.com/document/d/...?tab=...',
    'https://docs.google.com/document/d/...?tab=...',
    'How do ownership models impact retention?',
    'What recruitment strategies work across regions?',
    'How do you build loyalty beyond financial incentives?',
    'How can startups compete with corporate groups?',
    'What cultural shifts are needed for sustainable careers?',
  ];

  return [
    headers.join(','),
    exampleRow.map(v => `"${v}"`).join(','),
  ].join('\n');
}

/**
 * Reads a file as text
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}


