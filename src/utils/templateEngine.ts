import type { PanelEvent, Panelist } from '../types';

/**
 * Replaces all variables in an email template with actual data
 */
export function replaceVariables(
  template: string,
  event: PanelEvent,
  panelist?: Panelist
): string {
  let result = template;

  // Event-level variables
  const eventVars: Record<string, string> = {
    PANEL_TITLE: event.panelTitle,
    PANEL_SUBTITLE: event.panelSubtitle,
    PANEL_PURPOSE: event.panelPurpose,
    EVENT_DATE: event.eventDate,
    EVENT_DATE_FULL: event.eventDateFull,
    EVENT_DATE_SHORT: event.eventDateShort,
    EVENT_DATE_MINUS_1: event.eventDateMinus1,
    BRIEF_PANEL_TOPIC_DESCRIPTION: event.briefTopicDescription,
    RECORDING_LINK: event.recordingLink || '[RECORDING_LINK_NOT_YET_AVAILABLE]',
  };

  // Discussion points
  event.discussionPoints.forEach((point, index) => {
    eventVars[`DISCUSSION_POINT_${index + 1}`] = point;
  });

  // Replace event variables
  Object.entries(eventVars).forEach(([key, value]) => {
    const regex = new RegExp(`\\[${key}\\]`, 'g');
    result = result.replace(regex, value);
  });

  // Panelist-specific variables
  if (panelist) {
    const panelistVars: Record<string, string> = {
      PANELIST_FIRST_NAME: panelist.firstName,
      PANELIST_FULL_NAME: panelist.fullName,
      PANELIST_ZOOM_JOIN_LINK: panelist.zoomJoinLink,
      PANELIST_REGISTRATION_TRACKING_LINK: panelist.registrationTrackingLink,
      PROMOTIONAL_MATERIALS_DOC_LINK: panelist.promotionalMaterialsLink,
      QUESTIONS_LINK: panelist.questionsLink,
      FINAL_BANNER_LINK: panelist.finalBannerLink,
      BRIEF_PANELIST_CONTRIBUTION_SUMMARY: panelist.contributionSummary || '[CONTRIBUTION_SUMMARY_NOT_YET_AVAILABLE]',
      X: panelist.registrationCount?.toString() || '[REGISTRATION_COUNT_NOT_YET_AVAILABLE]',
      ATTENDEE_LIST_LINK: panelist.attendeeListLink || '[ATTENDEE_LIST_NOT_AVAILABLE]',
    };

    // Questions
    panelist.questions.forEach((question, index) => {
      panelistVars[`QUESTION_${index + 1}`] = question;
    });

    // Replace panelist variables
    Object.entries(panelistVars).forEach(([key, value]) => {
      const regex = new RegExp(`\\[${key}\\]`, 'g');
      result = result.replace(regex, value);
    });
  }

  return result;
}

/**
 * Handles conditional sections in templates based on registration count
 */
export function processConditionalSections(
  html: string,
  registrationCount?: number
): string {
  let result = html;

  // Remove conditional section markers (these are just comments for clarity)
  result = result.replace(/<!-- CONDITIONAL: .*? -->/g, '');

  // Handle 10+ registration section
  const has10Plus = registrationCount !== undefined && registrationCount >= 10;
  if (!has10Plus) {
    // Remove the attendee list paragraph
    result = result.replace(
      /<p>As promised, here's the full attendee list:.*?<\/p>/s,
      ''
    );
  }

  // Handle 25+ registration section
  const has25Plus = registrationCount !== undefined && registrationCount >= 25;
  if (!has25Plus) {
    // Remove the podcast qualification paragraph
    result = result.replace(
      /<p>🎉 Congratulations! You've qualified to be featured on the Veterinary Business Podcast.*?<\/p>/s,
      ''
    );
  }

  return result;
}

/**
 * Validates that all required variables have been replaced
 */
export function validateTemplate(html: string): {
  isValid: boolean;
  missingVariables: string[];
} {
  const variableRegex = /\[([A-Z_0-9]+)\]/g;
  const matches = html.matchAll(variableRegex);
  const missingVariables = Array.from(matches, m => m[1]);

  // Filter out intentionally unfilled post-event variables
  const filtered = missingVariables.filter(
    v =>
      !v.includes('NOT_YET_AVAILABLE') &&
      !v.includes('NOT_AVAILABLE') &&
      v !== 'IF' && // From conditional comments
      v !== 'INSERT_LINK_HERE'
  );

  return {
    isValid: filtered.length === 0,
    missingVariables: filtered,
  };
}

/**
 * Generates a subject line for an email based on template type
 */
export function generateSubjectLine(
  templateCode: string,
  templateName: string,
  event: PanelEvent,
  panelist?: Panelist
): string {
  const name = panelist?.firstName || '';

  switch (templateCode) {
    case 'E-22':
      return `Invitation to Share Your Expertise at the Veterinary Business Institute's ${event.panelTitle}`;
    case 'E-20':
      return `Following Up: Panel Invitation for ${event.eventDate}`;
    case 'E-13':
      return `Thrilled to Have You on Our Expert Panel Series!`;
    case 'E-10':
      return `Promotional Materials for ${event.panelTitle}`;
    case 'E-6':
      return `Let's Boost Registrations for ${event.eventDate} Panel`;
    case 'E-5':
      return `5 Days Until Our Panel - ${event.eventDate}`;
    case 'E-4':
      return `3 Days Reminder: ${event.panelTitle}`;
    case 'E-2':
      return `Tomorrow: ${event.panelTitle} at 8 PM EST`;
    case 'E-1':
      return `Today: ${event.panelTitle} at 8 PM EST`;
    case 'E-DAY':
      if (templateName.includes('2 Hours')) {
        return `Starting in 2 Hours: ${event.panelTitle}`;
      }
      return `Starting Now: ${event.panelTitle}`;
    case 'E+1':
      return `Thank You + Recording: ${event.panelTitle}`;
    case 'POST':
      if (templateName.includes('Lead Report')) {
        return `Panel Lead Report: ${event.panelTitle}`;
      } else if (templateName.includes('Panelists')) {
        return `Thank You for Participating in ${event.panelTitle}`;
      }
      return `Thank You for Attending ${event.panelTitle}`;
    default:
      return `${event.panelTitle} - ${templateName}`;
  }
}

/**
 * Creates a filename for saving/exporting an email
 */
export function generateEmailFilename(
  event: PanelEvent,
  templateName: string,
  panelist?: Panelist
): string {
  const eventName = event.name.replace(/[^a-zA-Z0-9]/g, '_');
  const templateNameClean = templateName.replace(/[^a-zA-Z0-9]/g, '_');
  const panelistName = panelist
    ? panelist.fullName.replace(/[^a-zA-Z0-9]/g, '_')
    : 'ALL';

  return `${eventName}_${templateNameClean}_${panelistName}.html`;
}
