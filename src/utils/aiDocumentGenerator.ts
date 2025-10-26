import type { PanelEvent, Panelist } from '../types';

/**
 * AI Document Generator
 * Generates promotional materials using AI while maintaining exact template structure
 */

interface PromoContent {
  introLine: string;
  datetimeLine: string;
  platformLine: string;
  bodyParagraph: string;
  keyPoints: string[];
  ctaLabel: string;
  ctaUrl: string;
}

interface EmailContent {
  subject: string;
  openingLine: string;
  bodyParagraph: string;
  highlights: string[];
  ctaLabel: string;
  ctaUrl: string;
}

/**
 * Generate promotional content for a panelist using AI
 * This will use Claude API to generate engaging promotional content
 */
export async function generatePanelistPromoContent(
  event: PanelEvent,
  panelist: Panelist,
  promoNumber: number
): Promise<PromoContent> {
  // TODO: Integrate with Claude API
  // For now, return structured content that follows the template pattern

  const promoVariations = [
    {
      intro: `Excited to announce my participation in the ${event.panelTitle}!`,
      body: `Join me and other experts as we dive deep into ${event.briefTopicDescription}. This is a unique opportunity to gain insights and ask questions directly.`,
    },
    {
      intro: `Don't miss this expert panel discussion on ${event.panelTitle}.`,
      body: `I'll be sharing my expertise on ${event.briefTopicDescription}. Register now to secure your spot and bring your toughest questions!`,
    },
    {
      intro: `Looking forward to being part of the ${event.panelTitle} panel!`,
      body: `We'll be exploring ${event.briefTopicDescription} with actionable insights you can implement immediately. Free registration available now.`,
    },
    {
      intro: `Join me for an insightful discussion on ${event.panelTitle}.`,
      body: `Together with industry experts, we'll tackle ${event.briefTopicDescription}. This complimentary event is designed specifically for veterinary professionals.`,
    },
    {
      intro: `Mark your calendar! I'm speaking at the ${event.panelTitle} panel.`,
      body: `We'll cover ${event.briefTopicDescription} and answer your most pressing questions. Don't miss this opportunity to learn from multiple experts in one session.`,
    },
  ];

  const variation = promoVariations[(promoNumber - 1) % promoVariations.length];

  return {
    introLine: variation.intro,
    datetimeLine: `📅 ${event.eventDateFull} | 🕖 8:00 PM - 9:00 PM EST`,
    platformLine: `📍 Live on Zoom (Free Registration Required)`,
    bodyParagraph: variation.body,
    keyPoints: event.discussionPoints,
    ctaLabel: `Register Now - It's Free!`,
    ctaUrl: panelist.registrationTrackingLink || '[REGISTRATION_LINK]',
  };
}

/**
 * Generate email promotional content
 */
export async function generateEmailPromoContent(
  event: PanelEvent,
  panelist: Panelist
): Promise<EmailContent> {
  return {
    subject: `Join Me at the ${event.panelTitle} Expert Panel`,
    openingLine: `I'm excited to invite you to an upcoming expert panel discussion where I'll be sharing insights on ${event.briefTopicDescription}.`,
    bodyParagraph: `This complimentary webinar brings together leading experts in the veterinary field to discuss ${event.panelTitle}. Whether you're looking to enhance your practice or simply stay current with industry trends, this session will provide valuable takeaways.`,
    highlights: event.discussionPoints,
    ctaLabel: `Reserve Your Spot (Free)`,
    ctaUrl: panelist.registrationTrackingLink || '[REGISTRATION_LINK]',
  };
}

/**
 * Generate Speaker 1 Promotional Materials HTML Document
 */
export function generateSpeaker1PromoDocument(
  event: PanelEvent,
  panelist: Panelist,
  promoContents: PromoContent[],
  emailContent: EmailContent
): string {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Speaker 1 Promotional Materials</title>
<style>
    body { margin:0; padding:48px 20px; background:#f5f7fb; font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif; color:#1f2937; }
    .stack { max-width:900px; margin:0 auto; display:grid; gap:32px; }
    .card { background:#ffffff; border-radius:18px; box-shadow:0 18px 44px rgba(15,23,42,0.12); padding:34px 40px; }
    h1, h2 { font-family:'Merriweather','Georgia',serif; margin-top:0; color:#0f172a; }
    h1 { font-size:1.75rem; margin-bottom:14px; }
    h2 { font-size:1.3rem; margin-top:24px; }
    p { margin:0 0 12px; line-height:1.7; }
    ul { margin:0 0 14px 1.2rem; }
</style>
</head>
<body>
<div class="stack">
${promoContents
  .map(
    (promo, index) => `  <section class="card">
    <h1>Promo 0${index + 1}</h1>
    <p><strong>Unique registration link:</strong> ${panelist.registrationTrackingLink || '[TRACKING_LINK]'}</p>
    <p>${promo.introLine}</p>
    <p>${promo.datetimeLine}</p>
    <p>${promo.platformLine}</p>
    <p>${promo.bodyParagraph}</p>
    <h2>Key Talking Points</h2>
    <ul>
${promo.keyPoints.map((point) => `      <li>${point}</li>`).join('\n')}
    </ul>
    <p><strong>${promo.ctaLabel}</strong></p>
    <p>${promo.ctaUrl}</p>
  </section>`
  )
  .join('')}
  <section class="card">
    <h1>Email Promotion</h1>
    <p><strong>Subject:</strong> ${emailContent.subject}</p>
    <p>Hi [RECIPIENT_NAME],</p>
    <p>${emailContent.openingLine}</p>
    <p>${emailContent.bodyParagraph}</p>
    <h2>Key Highlights</h2>
    <ul>
${emailContent.highlights.map((highlight) => `      <li>${highlight}</li>`).join('\n')}
    </ul>
    <p><strong>${emailContent.ctaLabel}</strong></p>
    <p>${emailContent.ctaUrl}</p>
  </section>
</div>
</body>
</html>`;

  return template;
}

/**
 * Generate Questions for the Panel HTML Document
 */
export function generateQuestionsDocument(
  event: PanelEvent,
  panelists: Panelist[]
): string {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Questions for the Panel Template</title>
<style>
    body { margin:0; padding:48px 20px; background:#f8f9fd; font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif; color:#1f2937; }
    .stack { max-width:860px; margin:0 auto; display:grid; gap:32px; }
    .card { background:#ffffff; border-radius:18px; box-shadow:0 16px 40px rgba(15,23,42,0.12); padding:34px 40px; }
    h1, h2 { font-family:'Merriweather','Georgia',serif; color:#0f172a; margin-top:0; }
    h1 { font-size:1.8rem; }
    h2 { font-size:1.28rem; margin-top:24px; }
    p { margin:0 0 12px; line-height:1.75; }
    ol { margin:0 0 14px 1.4rem; }
</style>
</head>
<body>
<div class="stack">
${panelists
  .map(
    (panelist, index) => `  <section class="card">
    <h1>Speaker ${index + 1} - Questions</h1>
    <p>Hi ${panelist.firstName},</p>
    <p>I've drafted these sets of questions for you in preparation for the upcoming panel discussion, ${event.panelTitle}. If you'd like to adjust or suggest additional questions, please feel free to share your thoughts.</p>
    <p>If the questions meet your approval, kindly reply to this email confirming the questions. If you'd like to make any changes or refinements, you're welcome to do so.</p>
    <p>Looking forward to your feedback!</p>
    <p><strong>Please note:</strong> 5 questions will be directed to you during the panel. Each panelist will be assigned 5 questions equally, which will be asked during the discussion.</p>
    <h2>Question Set</h2>
    <ol>
${panelist.questions.map((q) => `      <li>${q}</li>`).join('\n')}
    </ol>
  </section>`
  )
  .join('\n')}

  <section class="card">
    <h1>Panelist Cheat Sheet</h1>
${panelists
  .map(
    (panelist, index) => `    <p><strong>Speaker ${index + 1}:</strong> ${panelist.fullName}</p>
    <p>${panelist.email}</p>
    <ol>
${panelist.questions.map((q) => `      <li>${q}</li>`).join('\n')}
    </ol>`
  )
  .join('\n')}
  </section>
</div>
</body>
</html>`;

  return template;
}

/**
 * Generate General Promotional Materials HTML Document
 */
export function generateGeneralPromoDocument(
  event: PanelEvent,
  panelists: Panelist[]
): string {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>General Promotional Materials Template</title>
<style>
    body { margin:0; padding:48px 20px; background:#f7f8fc; font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif; color:#1f2937; }
    .stack { max-width:880px; margin:0 auto; display:grid; gap:32px; }
    .card { background:#ffffff; border-radius:16px; box-shadow:0 18px 40px rgba(15,23,42,0.12); padding:36px 42px; }
    h1, h2, h3 { font-family:'Merriweather','Georgia',serif; margin-top:0; color:#111827; }
    h1 { font-size:1.85rem; margin-bottom:16px; }
    h2 { font-size:1.35rem; margin-top:28px; }
    h3 { font-size:1.1rem; margin-top:20px; }
    p { margin:0 0 14px; line-height:1.7; }
    ul { margin:0 0 16px 1.2rem; }
</style>
</head>
<body>
<div class="stack">
${panelists
  .map(
    (panelist, index) => `  <section class="card">
    <h1>Speaker ${index + 1} Outreach</h1>
    <p>${panelist.fullName}</p>
    <p>Hi ${panelist.firstName},</p>
    <p>We've developed the promotional material and updated the Zoom landing page!</p>
    <h2>Unique Panelist Join Link</h2>
    <p>You may have already received an invite from Michael Walker.</p>
    <p>Please use this link to join the webinar on the day of the event. For your convenience, it is included here:</p>
    <p><strong>${panelist.zoomJoinLink || '[PANELIST_JOIN_LINK]'}</strong></p>
    <h2>Promotional Materials</h2>
    <p>This is your unique registration link: <strong>${panelist.registrationTrackingLink || '[TRACKING_LINK]'}</strong></p>
    <p>To help spread the word, we've prepared a set of promotional materials, including graphics, captions, and email drafts. Here's what's available:</p>
    <h3>Social Media Graphics</h3>
    <p>All graphics for LinkedIn, Facebook, and Instagram are accessible here: <strong>${panelist.promotionalMaterialsLink || '[GRAPHIC_FOLDER_LINK]'}</strong></p>
    <h3>Captions for Social Media</h3>
    <p>We've created ready-to-use captions to make sharing easy. Suggested posting schedule:</p>
    <ul>
      <li>Post 1: At a time of your convenience</li>
      <li>Post 2: At a time of your convenience</li>
      <li>Post 3: At a time of your convenience</li>
      <li>Post 4: ${event.eventDateMinus1} at a time of your convenience</li>
      <li>Post 5: ${event.eventDate} at a time of your convenience</li>
    </ul>
    <h3>Email Drafts for Your Network</h3>
    <p>We'd love your help in spreading the word with your network through your email list. Suggested email schedule:</p>
    <p>Draft 1: Please schedule for ${event.eventDate}</p>
    <p>Let me know if you need anything else or have questions. I'm here to assist and ensure this is a smooth and successful experience!</p>
    <p>Best regards,</p>
    <p>Chaluka Harsha<br>Strategic Events and Partnerships Coordinator<br>Veterinary Business Institute</p>
  </section>`
  )
  .join('\n')}
</div>
</body>
</html>`;

  return template;
}
