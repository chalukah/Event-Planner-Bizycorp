import type { EmailTemplate } from '../types';

// These are the 16 standard VBI panel email templates
export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: '01-e22-initial',
    code: 'E-22',
    name: 'Initial Invitation',
    sender: 'CHALUKA',
    timing: '~22 days before event',
    perPanelist: true,
    requiresPostEventData: false,
    template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Calibri, Arial, sans-serif;
            line-height: 1.6;
            font-size: 11pt;
            max-width: 800px;
            margin: 0;
            padding: 0;
        }
        a {
            color: #0066cc;
            text-decoration: underline;
        }
        a:hover {
            color: #004499;
        }
        strong {
            font-weight: bold;
        }
        p {
            margin: 8px 0;
        }
    </style>
</head>
<body>
<p>Hi [PANELIST_FIRST_NAME],</p>

<p>I hope you are doing great! I'm Chaluka Harsha, Strategic Events and Partnerships Coordinator for Veterinary Business Institute. It's a pleasure to connect with you!</p>

<p>I've been following your remarkable work to the veterinary community and believe you would provide tremendous value to our audience through a joint online event. We have an upcoming online event and have shortlisted you as a guest speaker.</p>

<p><strong>A Quick Look at What We Do</strong></p>

<p>At the Veterinary Business Podcast, we cover a wide range of topics, including business strategies, marketing trends, financial management, client relations, AI, law, and more. Our main goal is to provide veterinarians, practice owners, and office managers in the USA and Canada, with the knowledge and insights they need to manage their practices effectively.</p>

<p><strong>Our Podcast Co-Host Panel Includes:</strong></p>

<p>▪️ <strong>Naren Arurajah</strong> – Founder of Veterinary Business Institute CEO of Ekwa Marketing</p>

<p>▪️ <strong>Dr. Joel Parker</strong> – Veterinarian and Co-Founder of Parke Business Systems</p>

<p>▪️ <strong>Dr. Mark Roozen</strong> – Veterinarian and International Business Advisor</p>

<p>▪️ <strong>Dr. Amanda Landis-Hanna</strong> – Veterinarian and Chief Veterinary Officer of One Health Group</p>

<p>👉 For more information, please visit our website: <a href="https://www.veterinarybusinessinstitute.com">Veterinary Business Institute</a></p>

<p>On behalf of the Team, I'd love to extend a warm invitation for you to join us as a featured speaker at our upcoming Expert Panel Webinar Series: <strong>[PANEL_TITLE]</strong>.</p>

<p>This webinar is designed to help veterinary professionals [PANEL_PURPOSE]. The webinar will be in a panel format, featuring you as an expert alongside other leaders in the field.</p>

<p><strong>Event Snapshot:</strong></p>

<p><strong>Date:</strong> [EVENT_DATE_FULL]</p>

<p><strong>Time:</strong> 8:00 PM to 9:00 PM EST</p>

<p><strong>Duration:</strong> 1 Hour</p>

<p><strong>Topic:</strong> [PANEL_SUBTITLE]</p>

<p><strong>Key discussion points:</strong></p>

<p>▪️ [DISCUSSION_POINT_1]</p>

<p>▪️ [DISCUSSION_POINT_2]</p>

<p>▪️ [DISCUSSION_POINT_3]</p>

<p>▪️ [DISCUSSION_POINT_4]</p>

<p>▪️ [DISCUSSION_POINT_5]</p>

<p><strong>Number of Speakers:</strong> 2-3</p>

<p><strong>Format:</strong> Panel Discussion with Interactive Q&A Session</p>

<p><strong>Platform:</strong> Zoom</p>

<p><strong>Webinar Type:</strong> Live Webinar (also streaming on our LinkedIn and Facebook pages)</p>

<p><strong>Event Registration:</strong> Complimentary</p>

<p><strong>What We're Looking For</strong></p>

<p>We believe your voice and expertise would resonate strongly with our global audience. You've been shortlisted based on your impactful work, and we're confident you'd add tremendous value to the conversation.</p>

<p><strong>What's In It for You</strong></p>

<p>▪️ <strong>Visibility:</strong> Showcase your expertise to a broad audience of veterinarians and practice owners eager to learn from industry leaders.</p>

<p>▪️ <strong>Networking Opportunities:</strong> Connect with fellow panelists and engage with a community of veterinary professionals, fostering relationships that can lead to future collaborations.</p>

<p>▪️ <strong>Content Contribution:</strong> Share your knowledge and insights, establishing yourself as a thought leader within the veterinary community and potentially leading to future speaking opportunities.</p>

<p>▪️ <strong>Promotional Exposure:</strong> Your involvement will be highlighted across our promotional channels, including our website, social media platforms, and podcast episodes.</p>

<p>▪️ <strong>Further Opportunities:</strong> Panelists who actively contribute and are recognized as experts by veterinary practice owners will be invited to future webinars, including solo Lunch and Learns, panels, or quarterly Veterinary Business Institute Summits.</p>

<p>▪️ <strong>Attract Potential Clients:</strong> This platform will help you showcase your leadership and culture-building strategies, enhance your visibility, and ultimately attract clients seeking your expertise.</p>

<p><strong>Here's a quick summary of how the partnership works:</strong></p>

<p>▪️ No financial commitment is required, as the event is fully sponsored and free to attend.</p>

<p>▪️ Promotional materials will be provided to share with your audience.</p>

<p>▪️ Your only commitment would be to assist in promoting the event and encouraging sign-ups to help make it successful. Any effort to boost registrations would be deeply appreciated.</p>

<p>▪️ The event will be recorded for later viewing.</p>

<p>▪️ Additionally, if you were able to secure more than 10 registrations you will receive the full registration list after the event and if you were able to secure more than 25 registrations you will have the chance to feature in our podcast and be considered a long-term partner for future collaborations as a token of our appreciation (we organize mini summits, summits, expert panels as well).</p>

<p>A host from our academy will be there to support you throughout the session. At the end, the host will also display a slide featuring a free giveaway from our platinum sponsor, Ekwa Marketing.</p>

<p>We're incredibly excited about this event and would be honored to have you on board and to learn from your expertise. Looking forward to hearing from you!</p>

<p>Best regards,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '02-e20-followup',
    code: 'E-20',
    name: 'Follow-up Reminder',
    sender: 'CHALUKA',
    timing: '~20 days before event (2 days after initial)',
    perPanelist: true,
    requiresPostEventData: false,
    template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
    </style>
</head>
<body>
<p>Hi [PANELIST_FIRST_NAME],</p>

<p>I hope you're doing well! I wanted to follow up on my previous invitation regarding our upcoming expert panel webinar, "<strong>[PANEL_SUBTITLE]</strong>."</p>

<p>We would love to feature you as a panelist alongside other industry experts to share valuable insights on [BRIEF_PANEL_TOPIC_DESCRIPTION]. This is a fantastic opportunity to connect with a global audience of veterinary professionals and position yourself as a thought leader in the industry.</p>

<p><strong>Event Details:</strong></p>

<p>📅 <strong>Date:</strong> <strong><u>[EVENT_DATE_FULL]</u></strong></p>

<p>⏰ <strong>Time:</strong> <strong><u>8:00 PM - 9:00 PM EST</u></strong></p>

<p>📍 <strong>Format:</strong> Live Zoom Panel (also streamed on LinkedIn & Facebook)</p>

<p>💡 <strong>Discussion Topics:</strong> [DISCUSSION_POINT_1], [DISCUSSION_POINT_2], [DISCUSSION_POINT_3], [DISCUSSION_POINT_4], and [DISCUSSION_POINT_5].</p>

<p>If you're interested, please confirm your participation by sending a brief bio and a high-resolution headshot at your earliest convenience. Let me know if you have any questions—I'd be happy to discuss further!</p>

<p>Looking forward to your response.</p>

<p>Best regards,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '03-e13-confirmation',
    code: 'E-13',
    name: 'Confirmation Thank You',
    sender: 'CHALUKA',
    timing: 'Immediately after panelist confirms',
    perPanelist: true,
    requiresPostEventData: false,
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
    </style>
</head>
<body>
<p>Hi [PANELIST_FIRST_NAME],</p>

<p>Thank you for confirming your participation in our expert panel! We're excited to have you join us.</p>

<p><strong>Here's a quick overview of how the panel will work:</strong></p>

<p>▪️ The session will follow a Q&A format, and I'll handle all back-end operations, including marketing, promotions, and email campaigns.</p>

<p>▪️ We'll create promotional emails and graphics for you to share on social media to help drive registrations.</p>

<p>▪️ As a valued expert, you may also be invited to participate in future events.</p>

<p>▪️ We will draft the discussion questions and share them with you in advance. If you have any preferences or suggestions, we're happy to incorporate them.</p>

<p><strong>To finalize our promotional materials and social media content, could you please share the following details at your earliest convenience?</strong></p>

<p>▪️ Full Name</p>

<p>▪️ Contact Number</p>

<p>▪️ Current Position and Organization</p>

<p>▪️ Professional Headshot</p>

<p>▪️ Email Address</p>

<p>▪️ Short Bio (3-4 sentences)</p>

<p>In the meantime, if there's anything else you need, don't hesitate to reach out. We're excited to collaborate and will make sure you have everything you need to prepare for the event. Thank you again for joining us!</p>

<p>Best regards,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '04-e10-promo',
    code: 'E-10',
    name: 'Promotional Materials & Questions',
    sender: 'CHALUKA',
    timing: '~10 days before event',
    perPanelist: true,
    requiresPostEventData: false,
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
    </style>
</head>
<body>
<p>Hi [PANELIST_FIRST_NAME],</p>

<p>We've developed the promotional material and updated the Zoom landing page!</p>

<p><strong>Unique Panelist Join Link</strong></p>

<p>You may have already received an invite from Podcast & Events through "no-reply@zoom.us."</p>

<p>Please use this link to join the webinar on the day of the event, for your convenience, I've added it here: <a href="[PANELIST_ZOOM_JOIN_LINK]">Click here to join the panel</a></p>

<p><strong>Promotional Materials</strong></p>

<p>This is your Unique Registration Link: <a href="[PANELIST_REGISTRATION_TRACKING_LINK]">LINK</a></p>

<p>To help spread the word, we've prepared a set of promotional materials, including graphics, captions, and email drafts. Here's what's available:</p>

<p><strong>Social Media Graphics</strong></p>

<p>All graphics for LinkedIn, Facebook, and Instagram are accessible here: <a href="[PROMOTIONAL_MATERIALS_DOC_LINK]">Graphic Promotions</a>.</p>

<p><strong>Questions for the Panel:</strong> <a href="[QUESTIONS_LINK]">LINK</a></p>

<p>I've drafted these sets of questions for you in preparation for the panel discussion. If you'd like to adjust or suggest additional questions, please feel free to share your thoughts.</p>

<p>If the questions meet your approval, kindly reply to this email confirming the questions. If you need to do any change in these questions you are free to change and adjust these questions accordingly.</p>

<p>Let me know if you need anything else or have questions. I'm here to assist and ensure this is a smooth and successful experience!</p>

<p>Best regards,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '06-e6-boost',
    code: 'E-6',
    name: 'Boost Registrations',
    sender: 'CHALUKA',
    timing: '~6 days before event',
    perPanelist: true,
    requiresPostEventData: false,
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
    </style>
</head>
<body>
<p><strong><u>Lets Boost Registrations for the Expert Panel!</u></strong></p>
            <p>Hi [PANELIST_FIRST_NAME],</p>

<p>You have been amazing, and we can't wait to share your expertise with our audience on [EVENT_DATE].</p>

<p>We're reaching out because we currently have a low number of registrations, and we'd love to see more attendees benefiting from this incredible discussion. Your insights are invaluable, and with your help in promoting the event, we can ensure that a vast audience gets to learn from your expertise.</p>

<p>Please share the event with your network to encourage more registrations. We truly appreciate your support in making this panel a success.</p>


<p>Once again, thank you for your amazing support. We're looking forward to an engaging and impactful session.</p>

<p>Best regards,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '07-e5-help',
    code: 'E-5',
    name: 'Help Reach More',
    sender: 'CHALUKA',
    timing: '~5 days before event',
    perPanelist: true,
    requiresPostEventData: false,
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
    </style>
</head>
<body>
<p>Hi [PANELIST_FIRST_NAME],</p>

<p>Thank you for being part of our upcoming [PANEL_TITLE] on [EVENT_DATE].</p>

<p>We're excited about the value you'll bring to this conversation, and we want to make sure as many veterinary professionals as possible can benefit from your expertise. We'd really appreciate your help in spreading the word to your network.</p>

<p>Sharing the event on your social media or with your email list would make a huge difference in reaching more people who need these insights on [BRIEF_PANEL_TOPIC_DESCRIPTION].</p>

<p><strong>Your unique registration tracking link:</strong> <a href="[PANELIST_REGISTRATION_TRACKING_LINK]">Track your sign-ups here</a></p>

<p>Thank you for your continued support in making this event impactful.</p>

<p>Best regards,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '08-e4-3days',
    code: 'E-4',
    name: '3 Days Reminder',
    sender: 'CHALUKA',
    timing: '3 days before event',
    perPanelist: true,
    requiresPostEventData: false,
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
    </style>
</head>
<body>
<p>Hi [PANELIST_FIRST_NAME],</p>

<p>Just a quick reminder that our [PANEL_TITLE] is in 3 days!</p>

<p><strong>Event Details:</strong></p>

<p>🗓 <strong>Date:</strong> [EVENT_DATE_FULL]</p>

<p>🕖 <strong>Time:</strong> 8:00 PM to 9:00 PM EST</p>

<p>🎯 <strong>Topic:</strong> [PANEL_SUBTITLE]</p>

<p>🎙 <strong>Your Join Link:</strong> <a href="[PANELIST_ZOOM_JOIN_LINK]">Click here to join the panel</a></p>

<p><strong>Final Social Media Push</strong></p>

<p>If you haven't already, this is a great time to share the event with your network. We've provided all the graphics and captions in your promotional materials package.</p>

<p><strong>Access your promotional materials:</strong> <a href="[PROMOTIONAL_MATERIALS_DOC_LINK]">View Your Graphics & Captions</a></p>

<p><strong>Your unique registration link to track sign-ups:</strong> <a href="[PANELIST_REGISTRATION_TRACKING_LINK]">Track your registrations here</a></p>

<p>We're excited to see you on the [EVENT_DATE_SHORT]!</p>

<p>Best regards,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '09-e2-tomorrow',
    code: 'E-2',
    name: 'Tomorrow Panel',
    sender: 'CHALUKA',
    timing: '1 day before event',
    perPanelist: true,
    requiresPostEventData: false,
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
    </style>
</head>
<body>
<p>Hi [PANELIST_FIRST_NAME],</p>

<p>Tomorrow is the big day! Here are all the final details for the [PANEL_TITLE].</p>

<p><strong>Unique Panelist Join Link</strong></p>

<p>You may have already received an invite from Michael Walker through "no-reply@zoom.us."</p>

<p>Please use this link to join the webinar tomorrow: <a href="[PANELIST_ZOOM_JOIN_LINK]">Click here to join</a></p>

<p><strong>IMPORTANT - Please Save These Details</strong></p>

<p>📅 <strong>Tomorrow - [EVENT_DATE_FULL]</strong></p>

<p>🕖 <strong>Tech Check:</strong> 7:50 PM EST (Join 10 minutes early)</p>

<p>🎙 <strong>Event Start:</strong> 8:00 PM EST</p>

<p>⏰ <strong>Event End:</strong> 9:00 PM EST</p>

<p><strong>Tech Check Details:</strong></p>

<p>▪️ Michael Walker (host) will admit you at 7:50 PM</p>

<p>▪️ We'll do a quick audio/video check</p>

<p>▪️ Review the question flow</p>

<p>▪️ Answer any last-minute questions</p>

<p><strong>During the Panel:</strong></p>

<p>▪️ We'll follow a conversational Q&A format</p>

<p>▪️ Feel free to share specific examples and stories</p>

<p>▪️ The host will guide the discussion flow</p>

<p>▪️ There will be time for audience Q&A at the end</p>

<p><strong>After the Panel:</strong></p>

<p>▪️ We'll display a slide about Ekwa Marketing's free offer</p>

<p>▪️ Recording will be available within 24 hours</p>

<p>▪️ Registration list will be shared if you brought 10+ registrants</p>

<p><strong>One More Thing</strong></p>

<p>If you haven't already, please share one final post on social media today ([EVENT_DATE_MINUS_1]) to remind your network. Your promotional materials have a "Tomorrow" graphic and caption ready to go.</p>

<p><strong>Access your promotional materials:</strong> <a href="[PROMOTIONAL_MATERIALS_DOC_LINK]">View Your Graphics & Captions</a></p>

<p><strong>Your unique registration link:</strong> <a href="[PANELIST_REGISTRATION_TRACKING_LINK]">Track your sign-ups</a></p>

<p>See you tomorrow at 7:50 PM EST!</p>

<p>Best regards,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '10-e1-today',
    code: 'E-1',
    name: 'Today is the Day',
    sender: 'CHALUKA',
    timing: 'Event day morning',
    perPanelist: true,
    requiresPostEventData: false,
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
    </style>
</head>
<body>
<p>Hi [PANELIST_FIRST_NAME],</p>

<p>Today's the day! Just a quick reminder about tonight's [PANEL_TITLE].</p>

<p><strong>Tonight's Schedule:</strong></p>

<p>🕖 <strong>7:50 PM EST</strong> - Join for tech check</p>

<p>🎙 <strong>8:00 PM EST</strong> - Panel begins</p>

<p>⏰ <strong>9:00 PM EST</strong> - Panel concludes</p>

<p><strong>Your Unique Join Link:</strong> <a href="[PANELIST_ZOOM_JOIN_LINK]">Join the panel here</a></p>

<p><strong>Quick Checklist:</strong></p>

<p>✅ Test your camera and microphone before 7:50 PM</p>

<p>✅ Find a quiet space with good lighting</p>

<p>✅ Have a glass of water nearby</p>

<p>✅ Close unnecessary browser tabs/applications</p>

<p><strong>Last Social Media Push</strong></p>

<p>Post the "Going Live Tonight" graphic to your social media now or during the day. This is the final push to drive registrations.</p>

<p><strong>Download the final graphic here:</strong> <a href="[FINAL_BANNER_LINK]">View Final Banner</a></p>

<p>We're looking forward to an excellent discussion tonight!</p>

<p>Best regards,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '11-eday-2hrs',
    code: 'E-DAY',
    name: 'Starting in 2 Hours',
    sender: 'CHALUKA',
    timing: '2 hours before event (6:00 PM EST)',
    perPanelist: true,
    requiresPostEventData: false,
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
    </style>
</head>
<body>
<p>Hi [PANELIST_FIRST_NAME],</p>

<p>Just a quick reminder that our '<strong>[PANEL_SUBTITLE]</strong>' is starting in a few hours. We're excited to have you share your insights and expertise.</p>

<p><strong>ZOOM LINK TO THE PANEL:</strong> <a href="[PANELIST_ZOOM_JOIN_LINK]">LINK</a></p>

<p>Thank you,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '12-eday-now',
    code: 'E-DAY',
    name: 'Starting Now',
    sender: 'CHALUKA',
    timing: '15 minutes before event (7:45 PM EST)',
    perPanelist: true,
    requiresPostEventData: false,
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
    </style>
</head>
<body>
<p>Hi [PANELIST_FIRST_NAME],</p>

<p>Just a quick reminder that our '<strong>[PANEL_SUBTITLE]</strong>' is starting in a few minutes. We're excited to have you share your insights and expertise.</p>

<p><strong>ZOOM LINK TO THE PANEL:</strong> <a href="[PANELIST_ZOOM_JOIN_LINK]">LINK</a></p>

<p>Looking forward to seeing you there.</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '13-eplus1-thankyou',
    code: 'E+1',
    name: 'Thank You + Recording',
    sender: 'CHALUKA',
    timing: '1 day after event',
    perPanelist: true,
    requiresPostEventData: true,
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
    </style>
</head>
<body>
<p>Hi [PANELIST_FIRST_NAME],</p>

<p>Thank you so much for being part of our [PANEL_TITLE] yesterday. Your insights on [BRIEF_PANELIST_CONTRIBUTION_SUMMARY] were incredibly valuable to our audience.</p>

<p><strong>Event Recording</strong></p>

<p>The recording is now available here: <a href="[RECORDING_LINK]">View Panel Recording</a></p>

<p><strong>Registration Data</strong></p>

<p>Based on your unique registration link, you helped bring <strong>[X]</strong> registrants to the event.</p>

<p><strong>[IF 10+ registrations, include this section:]</strong></p>

<p>As promised, here's the full attendee list: <a href="[ATTENDEE_LIST_LINK]">Download Attendee List</a></p>

<p><strong>[IF 25+ registrations, include this section:]</strong></p>

<p>🎉 Congratulations! You've qualified to be featured on the Veterinary Business Podcast. We'll reach out separately to schedule your episode.</p>

<p><strong>What's Next</strong></p>

<p>▪️ We'll be sharing the recording with all attendees and registrants</p>

<p>▪️ Social media clips will be created and shared</p>

<p>▪️ You're welcome to share the recording with your network</p>

<p><strong>Complimentary Gift</strong></p>

<p>The Veterinary Business Institute is offering you a <strong>free Marketing Strategy Analysis</strong> as an exclusive gift, worth <strong>$900</strong>, entirely free for you!</p>

<p>This complimentary consultation will help you analyze your practice's marketing effectiveness and identify growth opportunities.</p>

<p><strong>BOOK A MEETING to analyze your practice's marketing:</strong> <a href="https://www.veterinarybusinessinstitute.com/marketing-strategy-meeting/expanels/">Schedule Your Free Strategy Session</a></p>

<p><strong>Future Opportunities</strong></p>

<p>We host expert panels regularly and would love to have you back for future events. We'll keep you in the loop.</p>

<p>Thank you again for your valuable contribution to the veterinary community!</p>

<p>Best regards,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '14-post-lead-report',
    code: 'POST',
    name: 'Lead Report to Karen',
    sender: 'CHALUKA',
    timing: 'Day after event',
    perPanelist: false,
    requiresPostEventData: true,
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
        ul { margin: 8px 0; }
        li { margin: 4px 0; }
    </style>
</head>
<body>
<p><strong>Subject: Lead Report - Veterinary Business Institute - [PANEL_TITLE] on [EVENT_DATE_FULL]</strong></p>

<p>Dear Team,</p>

<p>Attached is the lead report and key details from the <strong>[PANEL_TITLE]</strong> Live Event held on [EVENT_DATE_FULL], from 8:00 pm EST to 9:00 pm EST.</p>

<p><strong>Event Overview:</strong></p>

<ul>
    <li><strong>Agenda:</strong> <a href="[CALENDAR_NOTES_LINK]">Calendar Notes</a></li>
    <li><strong>Zoom Registrant Report:</strong> <a href="[REGISTRATIONS_REPORT_LINK]">Registration Report</a></li>
    <li><strong>Zoom Attendee Report:</strong> <a href="[ATTENDEE_REPORT_LINK]">Attendee Report</a></li>
    <li><strong>Title:</strong> [PANEL_TITLE] - [PANEL_SUBTITLE]</li>
</ul>

<p><strong>Main Speakers:</strong></p>

<ul>
    <li>Speaker 1: [PANELIST_1_NAME]</li>
    <li>Speaker 2: [PANELIST_2_NAME]</li>
    <li>Speaker 3 (if applicable): [PANELIST_3_NAME]</li>
    <li>EKWA Representatives: [EKWA_REP_NAMES]</li>
</ul>

<p><strong>MSM Link Shared:</strong> <a href="https://www.veterinarybusinessinstitute.com/marketing-strategy-meeting/expanels/">https://www.veterinarybusinessinstitute.com/marketing-strategy-meeting/expanels/</a></p>

<p><strong>Slide Decks:</strong> <a href="[SLIDE_DECK_LINK]">Slide Deck</a></p>

<p><strong>Webinar Recording:</strong> <a href="[RECORDING_LINK]">Zoom Recording</a></p>

<p><strong>Survey Form Responses:</strong> [SURVEY_RESPONSES_LINK or N/A]</p>

<p><strong>Attendees Interested in MSM:</strong> [NUMBER or N/A]</p>

<p><strong>Direct MSMs Booked:</strong></p>

<ul>
    <li>MSM 1: [NAME or N/A]</li>
    <li>MSM 2: [NAME or N/A]</li>
</ul>

<p><strong>Key Webinar Points:</strong></p>

<ul>
    <li>[KEY_POINT_1]</li>
    <li>[KEY_POINT_2]</li>
    <li>[KEY_POINT_3]</li>
</ul>

<p><strong>Potential Questions from Leads for BDRs:</strong></p>

<ul>
    <li><em>Requesting recordings</em></li>
    <li><em>Asking about CE credit</em></li>
    <li>[OTHER_POTENTIAL_QUESTIONS]</li>
</ul>

<p>For any additional inquiries, please reach out using the contact details below:</p>

<ul>
    <li><strong>Email:</strong> [YOUR_EMAIL]</li>
    <li><strong>Slack:</strong> [YOUR_SLACK_HANDLE]</li>
</ul>

<p>Thank you,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '15-post-panelist-thanks',
    code: 'POST',
    name: 'Thank You to Panelists',
    sender: 'CHALUKA',
    timing: 'Day after event',
    perPanelist: true,
    requiresPostEventData: false,
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
    </style>
</head>
<body>
<p><strong>Subject: Thank You for Attending the Expert Panel Discussion</strong></p>

<p>Hi [PANELIST_FIRST_NAME],</p>

<p>I hope this message finds you well.</p>

<p>On behalf of the Veterinary Business Institute, I would like to sincerely thank you for attending the <strong>[PANEL_TITLE] on [EVENT_DATE_FULL]</strong></p>

<p>We appreciate your time and engagement in this important discussion.</p>

<p>Should you have any questions or require further assistance, please do not hesitate to reach out.</p>

<p>For your reference, you can access the <strong>Zoom recording</strong> from today's panel: <a href="[RECORDING_LINK]">VIEW RECORDING</a></p>

<p>You can find your registration report here, attached!</p>

<p>Once again, thank you for being a part of this event. We look forward to your continued participation in future discussions.</p>

<p><strong>Complimentary Gift</strong></p>

<p>If you're looking to refine your marketing approach, schedule a complimentary marketing strategy meeting with our team at your convenience.</p>

<p>< BOOK A MEETING to analyze your practice's marketing:</strong> <a href="https://www.veterinarybusinessinstitute.com/marketing-strategy-meeting/expanels/">Schedule Your Free Strategy Session</a></p>

<p>Warm regards,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>
<p>🌐 <a href="https://www.veterinarybusinessinstitute.com">www.veterinarybusinessinstitute.com</a></p>

</body>
</html>`
  },
  {
    id: '16-post-registrant-thanks',
    code: 'POST',
    name: 'Thank You to Registrants',
    sender: 'CHALUKA',
    timing: 'Day after event',
    perPanelist: false,
    requiresPostEventData: true,
        template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 800px; margin: 0; padding: 0; }
        a { color: #0066cc; text-decoration: underline; }
        a:hover { color: #004499; }
        strong { font-weight: bold; }
        p { margin: 8px 0; }
        ul { margin: 8px 0; }
        li { margin: 4px 0; }
    </style>
</head>
<body>
<p><strong>Subject: Thank You for Joining Us at the [PANEL_TITLE]</strong></p>

<p>Dear [RECIPIENT_NAME],</p>

<p>Thank you so much for attending the panel and contributing your valuable time and insights! Your participation made the session a tremendous success, and we truly appreciate your support.</p>

<p>It was an absolute pleasure to have you as part of our audience for this special event, where we explored <strong>[PANEL_TITLE] - [PANEL_SUBTITLE]</strong>, with insights from an incredible panel of experts. Your participation and engagement made this webinar truly memorable and impactful.</p>

<p><strong>Our Panelists Are:</strong></p>

<ul>
    <li><strong>[PANELIST_1_NAME]</strong> - [PANELIST_1_EMAIL]</li>
    <li><strong>[PANELIST_2_NAME]</strong> - [PANELIST_2_EMAIL]</li>
    <li><strong>[PANELIST_3_NAME]</strong> - [PANELIST_3_EMAIL]</li>
</ul>

<p><strong>You may reach out to them directly via the provided email addresses for any future needs or inquiries.</strong></p>

<p><strong>Topics We Covered:</strong></p>

<ul>
    <li>[TOPIC_1]</li>
    <li>[TOPIC_2]</li>
    <li>[TOPIC_3]</li>
    <li>[TOPIC_4]</li>
</ul>

<p><strong>You Can View the Panel:</strong> <a href="[RECORDING_LINK]">VIEW RECORDING</a></p>

<p><strong>Complimentary Gift</strong></p>

<p>The Veterinary Business Institute is offering you a <strong>free Marketing Strategy Analysis</strong> as an exclusive gift, worth <strong>$900</strong>, entirely free for you!</p>

<p><strong>BOOK A MEETING to analyze your practice's marketing:</strong> <a href="https://www.veterinarybusinessinstitute.com/marketing-strategy-meeting/expanels/">Schedule Your Free Strategy Session</a></p>

<p>We hope the session provided valuable strategies and inspiration to help you strengthen your leadership skills and cultivate a thriving practice.</p>

<p>We'd love to hear your thoughts about the event. Please feel free to reply with feedback or suggestions, as they help us continually improve and provide content that resonates with you.</p>

<p>Thank you again for being an integral part of the <strong>Veterinary Business Institute Community</strong>. We look forward to seeing you at future events!</p>

<p>Warm regards,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  }
];
