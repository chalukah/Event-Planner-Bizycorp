import type { Template } from '../store';

const TEMPLATE_NAMES = [
  'Invite',
  'Reminder 1',
  'Reminder 2',
  'Speaker Brief',
  'Moderator Brief',
  'Panel Logistics',
  'Registration Open',
  'Registration Closed',
  'Calendar Hold',
  'Venue Details',
  'Pre-Event Nudge',
  'Day-Before Nudge',
  'Day-Of Instructions',
  'Follow-Up Thanks',
  'Post-Event Survey',
  'Misc / Custom'
];

const DEFAULT_CONTENTS: Record<string, string> = {
  'Invite': `<p>Hi {{SpeakerName}},</p>
<p>You're invited to speak at <strong>{{EventName}}</strong> on {{EventDate}} at {{StartTime}}.</p>
<p><strong>Event Details:</strong></p>
<ul>
  <li>Date: {{EventDate}}</li>
  <li>Time: {{StartTime}} - {{EndTime}}</li>
  <li>Venue: {{Venue}}</li>
</ul>
<p>Join link: <a href="{{JoinLink}}">{{JoinLink}}</a></p>
<p>Please RSVP here: <a href="{{RSVPLink}}">{{RSVPLink}}</a></p>
<p>Best regards,<br>{{OrganizerName}}</p>`,

  'Reminder 1': `Hi {{SpeakerName}},

Quick reminder for **{{EventName}}** on **{{EventDate}}** ({{StartTime}}–{{EndTime}}).

**Join link:** {{JoinLink}}

Looking forward to seeing you there!

— {{OrganizerName}}`,

  'Reminder 2': `<p>Hi {{SpeakerName}},</p>
<p>Just a final reminder about <strong>{{EventName}}</strong> tomorrow!</p>
<p><strong>Time:</strong> {{StartTime}} - {{EndTime}}<br>
<strong>Join:</strong> <a href="{{JoinLink}}">{{JoinLink}}</a></p>
<p>See you soon!</p>
<p>{{OrganizerName}}</p>`,

  'Speaker Brief': `**Speaker Brief - {{EventName}}**

**Date:** {{EventDate}}
**Time:** {{StartTime}} - {{EndTime}}
**Moderator:** {{ModeratorName}}

**Your Role:**
- Present on [topic]
- Q&A session at the end
- Keep remarks to 15-20 minutes

**Technical Setup:**
- Join 10 minutes early: {{JoinLink}}
- Test your audio/video
- Have backup device ready

**Contact:**
{{ContactEmail}}

Thank you!
{{OrganizerName}}`,

  'Moderator Brief': `**Moderator Brief - {{EventName}}**

**Date:** {{EventDate}}
**Time:** {{StartTime}} - {{EndTime}}
**Speaker:** {{SpeakerName}}

**Your Responsibilities:**
- Introduce the speaker
- Facilitate Q&A
- Keep time (total: 60 min)

**Rundown:**
- 0-5 min: Introduction
- 5-25 min: Speaker presentation
- 25-55 min: Q&A
- 55-60 min: Closing remarks

**Join Link:** {{JoinLink}}

Thank you!
{{OrganizerName}}`,

  'Panel Logistics': `<h2>Panel Logistics - {{EventName}}</h2>
<p><strong>Date:</strong> {{EventDate}}<br>
<strong>Time:</strong> {{StartTime}} - {{EndTime}}<br>
<strong>Venue:</strong> {{Venue}}</p>

<h3>Schedule:</h3>
<ul>
  <li>Setup: 30 min before</li>
  <li>Sound check: 15 min before</li>
  <li>Doors open: 10 min before</li>
</ul>

<h3>Equipment:</h3>
<ul>
  <li>Microphones (3x)</li>
  <li>Projector & screen</li>
  <li>Backup laptop</li>
</ul>

<p><strong>Contact:</strong> {{ContactEmail}}</p>`,

  'Registration Open': `Registration is now OPEN for {{EventName}}!

📅 **Date:** {{EventDate}}
🕐 **Time:** {{StartTime}} - {{EndTime}}
📍 **Venue:** {{Venue}}

Reserve your spot: {{RSVPLink}}

Hosted by {{OrganizerName}}`,

  'Registration Closed': `<p>Registration for <strong>{{EventName}}</strong> is now closed.</p>
<p>If you've already registered, you'll receive joining instructions 24 hours before the event.</p>
<p><strong>Event Date:</strong> {{EventDate}}<br>
<strong>Time:</strong> {{StartTime}}</p>
<p>Questions? Contact {{ContactEmail}}</p>`,

  'Calendar Hold': `🗓️ **Calendar Hold**

**Event:** {{EventName}}
**Date:** {{EventDate}}
**Time:** {{StartTime}} - {{EndTime}}
**Location:** {{Venue}}

Please hold this time slot. More details to follow.

— {{OrganizerName}}`,

  'Venue Details': `<h2>Venue Details - {{EventName}}</h2>

<p><strong>Location:</strong> {{Venue}}</p>

<p><strong>Date & Time:</strong><br>
{{EventDate}} at {{StartTime}}</p>

<p><strong>Directions:</strong><br>
[Add directions here]</p>

<p><strong>Parking:</strong><br>
[Add parking info]</p>

<p><strong>Accessibility:</strong><br>
[Add accessibility info]</p>

<p><strong>Contact:</strong> {{ContactEmail}}</p>`,

  'Pre-Event Nudge': `Hi there!

{{EventName}} is coming up in **one week**!

📅 {{EventDate}} at {{StartTime}}
🔗 {{JoinLink}}

We're excited to see you there!

Best,
{{OrganizerName}}`,

  'Day-Before Nudge': `<p>Hi {{SpeakerName}},</p>

<p><strong>{{EventName}}</strong> is happening <strong>tomorrow</strong>!</p>

<p>⏰ <strong>Time:</strong> {{StartTime}} - {{EndTime}}<br>
🔗 <strong>Join:</strong> <a href="{{JoinLink}}">{{JoinLink}}</a></p>

<p>Please join 5-10 minutes early for a tech check.</p>

<p>See you tomorrow!<br>
{{OrganizerName}}</p>`,

  'Day-Of Instructions': `**TODAY: {{EventName}}**

⏰ Starting in a few hours at {{StartTime}}!

**Join here:** {{JoinLink}}

**Quick reminders:**
- Join 5 min early
- Mute when not speaking
- Use chat for questions

See you soon!
{{OrganizerName}}`,

  'Follow-Up Thanks': `<p>Dear {{SpeakerName}},</p>

<p>Thank you for participating in <strong>{{EventName}}</strong>!</p>

<p>Your contribution made the event a success. We truly appreciate your time and expertise.</p>

<p>If you have any feedback or would like to collaborate again, please reach out to {{ContactEmail}}.</p>

<p>Warm regards,<br>
{{OrganizerName}}</p>`,

  'Post-Event Survey': `Thank you for attending {{EventName}}!

We'd love your feedback:

📋 **Survey link:** [Insert survey URL]

Your input helps us improve future events.

Takes only 2-3 minutes!

— {{OrganizerName}}`,

  'Misc / Custom': `<p>Custom template for {{EventName}}</p>
<p>Date: {{EventDate}}<br>
Time: {{StartTime}} - {{EndTime}}</p>
<p>[Add your custom content here]</p>`
};

export function makeDefaultTemplates(): Template[] {
  return TEMPLATE_NAMES.map((name, i) => ({
    id: crypto.randomUUID(),
    name,
    sort: i,
    type: i % 3 === 0 ? 'html' : 'md',
    content: DEFAULT_CONTENTS[name] || '',
    updatedAt: new Date().toISOString()
  }));
}

export function getDefaultTemplateContent(name: string): string {
  return DEFAULT_CONTENTS[name] || '';
}

export { TEMPLATE_NAMES };
