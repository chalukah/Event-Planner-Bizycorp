/**
 * OCT 29 Panel Event Test Data
 * Based on the actual OCT 29 Panel Event folder
 */

import type { Panelist } from '../types';

export const oct29EventData = {
  name: 'OCT 29 Panel Event',
  panelTitle: 'Veterinary Talent Solutions Panel',
  panelSubtitle:
    'The Workforce Crisis - Real Strategies to Recruit, Retain, and Rebuild Veterinary Teams',
  panelPurpose: 'address the workforce crisis in veterinary medicine',
  eventDate: 'October 29th',
  eventDateFull: 'Tuesday, October 29th, 2025',
  eventDateShort: '29th',
  eventDateMinus1: 'October 28th',
  discussionPoints: [
    'Beyond job postings: creative recruitment strategies',
    'Building a culture that retains top talent',
    'Addressing burnout and building resilience',
    'The role of ownership models in staff retention',
    'Creating sustainable career pathways in veterinary medicine',
  ],
  briefTopicDescription: 'recruitment, retention, and rebuilding teams',
};

export const oct29Panelists: Omit<Panelist, 'id'>[] = [
  {
    firstName: 'Keith',
    fullName: 'Keith True',
    email: 'keith.true@example.com',
    zoomJoinLink: 'https://us02web.zoom.us/w/82154861472?tk=example-keith',
    registrationTrackingLink:
      'https://us02web.zoom.us/webinar/register/WN_keithtracking',
    promotionalMaterialsLink:
      'https://docs.google.com/document/d/keith-promo-materials',
    questionsLink: 'https://docs.google.com/document/d/keith-questions',
    finalBannerLink: 'https://docs.google.com/document/d/keith-banner',
    questions: [
      'How do ownership models impact retention and recruitment in veterinary practices?',
      'What recruitment strategies have consistently attracted high-performing talent across different company stages?',
      'What approaches have you found effective for building loyalty beyond financial incentives?',
      'How can emerging veterinary organizations position themselves as desirable employers?',
      'What cultural or operational shifts must veterinary businesses make for sustainable careers?',
    ],
    // Post-event data (for testing):
    registrationCount: 47,
    attendeeListLink: 'https://docs.google.com/spreadsheets/d/keith-attendees',
    contributionSummary:
      'ownership models, recruitment strategies, and building long-term loyalty',
  },
  {
    firstName: 'Charlotte',
    fullName: 'Charlotte Weir',
    email: 'charlotte.weir@example.com',
    zoomJoinLink: 'https://us02web.zoom.us/w/82154861472?tk=example-charlotte',
    registrationTrackingLink:
      'https://us02web.zoom.us/webinar/register/WN_charlottetracking',
    promotionalMaterialsLink:
      'https://docs.google.com/document/d/charlotte-promo-materials',
    questionsLink: 'https://docs.google.com/document/d/charlotte-questions',
    finalBannerLink: 'https://docs.google.com/document/d/charlotte-banner',
    questions: [
      'How do you see culture influencing recruitment success in veterinary organizations?',
      'What recruitment strategies have worked across different regions for your businesses?',
      'How do you retain top talent after rapid growth periods?',
      'How can startups compete with large corporate groups for talent?',
      'What shifts are needed culturally to create fulfilling career paths in veterinary medicine?',
    ],
    // Post-event data (for testing):
    registrationCount: 32,
    attendeeListLink:
      'https://docs.google.com/spreadsheets/d/charlotte-attendees',
    contributionSummary:
      'culture-driven recruitment, scaling challenges, and retention strategies',
  },
];

export const oct29PostEventData = {
  recordingLink: 'https://zoom.us/rec/share/oct29-panel-recording',
};

/**
 * Function to load OCT 29 test data into the app
 */
export function loadOct29TestData(createEvent: Function, importPanelists: Function) {
  const eventId = createEvent({
    ...oct29EventData,
    panelists: [],
  });

  importPanelists(eventId, oct29Panelists);

  return eventId;
}
