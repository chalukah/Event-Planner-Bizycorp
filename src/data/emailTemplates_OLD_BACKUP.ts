import type { EmailTemplate } from '../types';

// These are the 16 standard VBI panel email templates
export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: '01-e22-initial',
    code: 'E-22',
    name: 'Initial Invitation',
    sender: 'RESHANI',
    timing: '~22 days before event',
    perPanelist: true,
    requiresPostEventData: false,
    template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 760px; margin: 0; padding: 0; color: #1f2937; }
        a { color: #0B5ED7; text-decoration: underline; }
        a:hover { color: #094db3; }
        h2 { margin: 18px 0 8px; font-size: 13pt; color: #0f172a; }
        ul { margin: 8px 0 16px 22px; padding: 0; }
        li { margin: 4px 0; }
        p { margin: 8px 0; }
        .muted { color: #475569; font-size: 10pt; }
        .tag { display: inline-block; margin-right: 6px; margin-bottom: 6px; padding: 4px 10px; background: #e2e8f0; border-radius: 9999px; font-size: 10pt; }
    </style>
</head>
<body>
<p>Hello [PANELIST_FIRST_NAME],</p>

<p>I hope you are doing great! I am <strong>Chaluka Harsha</strong>, Strategic Events and Partnerships Coordinator of the Veterinary Business Institute. It is a pleasure to connect with you. I recently came across your profile and was impressed by your contributions to the veterinary community.</p>

<h2>About the Veterinary Business Institute and Podcast</h2>
<p>At the Veterinary Business Podcast, we explore business strategy, marketing trends, financial management, client relations, leadership, artificial intelligence, law, and more. Our goal is to equip veterinarians, practice owners, and office managers across the USA and Canada with the insights they need to manage thriving practices.</p>

<p><strong>Our Podcast Co-Host Panel Includes:</strong></p>
<ul>
  <li>Naren Arurajah — Founder of Veterinary Business Institute and CEO of Ekwa Marketing</li>
  <li>Dr. Joel Parker — Veterinarian and Co-Founder of Parke Business Systems</li>
  <li>Dr. Mark Roozen — Veterinarian and International Business Advisor</li>
  <li>Dr. Amanda Landis-Hanna — Veterinarian and Chief Veterinary Officer of One Health Group</li>
  <li>Michael Walker — Leadership Coach and Consultant</li>
</ul>

<p>Learn more about us at <a href="https://www.veterinarybusinessinstitute.com/" target="_blank" rel="noopener">https://www.veterinarybusinessinstitute.com/</a>.</p>

<h2>Your Invitation</h2>
<p>On behalf of Naren and the Veterinary Business Institute team, I would love to invite you to join us as a featured expert on our upcoming panel webinar: <strong>[PANEL_TITLE]</strong> — <em>[PANEL_SUBTITLE]</em>. This conversation brings together leaders who are redefining practice culture, communication, and leadership.</p>

<h2>Panel Webinar Details</h2>
<p class="tag">Date: [EVENT_DATE_FULL]</p>
<p class="tag">Time: 8:00 PM – 9:00 PM EST</p>
<p class="tag">Format: Zoom panel discussion with interactive Q&amp;A</p>
<p class="tag">Streaming: LinkedIn and Facebook</p>
<p class="tag">Registration: Complimentary</p>

<p><strong>Moderator:</strong> Adeesha Pemananda, Co-Host of the Veterinary Business Podcast and Leadership Coach.</p>

<h2>What We Will Explore Together</h2>
<ul>
  <li>[DISCUSSION_POINT_1]</li>
  <li>[DISCUSSION_POINT_2]</li>
  <li>[DISCUSSION_POINT_3]</li>
  <li>[DISCUSSION_POINT_4]</li>
  <li>[DISCUSSION_POINT_5]</li>
</ul>

<h2>How This Opportunity Benefits You</h2>
<ul>
  <li><strong>Visibility:</strong> Share your expertise with a growing audience of veterinary leaders.</li>
  <li><strong>Networking:</strong> Connect with fellow panelists and practice owners for future collaboration.</li>
  <li><strong>Thought Leadership:</strong> Position yourself for future speaking opportunities and media features.</li>
  <li><strong>Promotion:</strong> We highlight every panelist across our website, social media, podcast, and email channels.</li>
  <li><strong>Future Engagements:</strong> Active contributors are shortlisted for future Lunch and Learn sessions, expert panels, and VBI Summits.</li>
  <li><strong>Client Attraction:</strong> Demonstrate how your leadership and culture-building strategies create thriving veterinary practices.</li>
</ul>

<p>We are committed to creating a dynamic and engaging experience for both panelists and attendees, and we would be thrilled to have you join us. Let me know if you are available, and I will send the onboarding kit, promotional assets, and briefing details right away.</p>

<p>Thank you for considering the invitation. I look forward to the possibility of partnering with you for this event!</p>

<p>Best regards,<br>
Chaluka Harsha<br>
Strategic Events and Partnerships Coordinator<br>
Veterinary Business Institute</p>


</body>
</html>`
  },
  {
    id: '02-e20-followup',
    code: 'E-20',
    name: 'Follow-up Reminder',
    sender: 'RESHANI',
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

<p>Gentle reminder on above invitation. Please share your thoughts.</p>

<p>We have an event scheduled and would like to invite you as a guest speaker.</p>

<p><strong>Event Snapshot:</strong></p>

<p>🗓 <strong>Date:</strong> [EVENT_DATE]</p>

<p>🕖 <strong>Time:</strong> 8:00 PM to 9:00 PM EST</p>

<p>⏰ <strong>Duration:</strong> 1 Hour</p>

<p>🎯 <strong>Topic:</strong> [PANEL_TITLE] - [PANEL_SUBTITLE]</p>

<p><strong>Key discussion points:</strong></p>

<p>▪️ [DISCUSSION_POINT_1]</p>

<p>▪️ [DISCUSSION_POINT_2]</p>

<p>▪️ [DISCUSSION_POINT_3]</p>

<p>▪️ [DISCUSSION_POINT_4]</p>

<p>▪️ [DISCUSSION_POINT_5]</p>

<p>🎙 <strong>Number of Speakers:</strong> 2-3</p>

<p>💬 <strong>Format:</strong> Panel Discussion with Interactive Q&A Session</p>

<p>📍 <strong>Platform:</strong> Zoom</p>

<p>🌐 <strong>Webinar Type:</strong> Live Webinar (also streaming on our LinkedIn and Facebook pages)</p>

<p>✅ <strong>Event Registration:</strong> Complimentary</p>

<p>If now isn't the right time, I completely understand, and we'd love to stay connected for future opportunities.</p>

<p>Looking forward to your response!</p>

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
    sender: 'RESHANI',
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

<p>Thank you for confirming your participation. We'd be thrilled to have you on board for the event and to learn from your expertise.</p>

<p><strong>Here's a quick overview of how the panel will work:</strong></p>

<p>▪️ The session will follow a Q&A format, and Liyanna will handle all back-end operations, including marketing, promotions, and email campaigns.</p>

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

<p>I've copied Liyanna from our event coordination team, and she'll be in touch with additional details. In the meantime, if there's anything else you need, don't hesitate to reach out. We're excited to collaborate and will make sure you have everything you need to prepare for the event. Thank you again for joining us!</p>

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
    name: 'Promotional Materials',
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

<p>We've developed the promotional material and updated the zoom landing page!</p>

<p><strong>Unique Panelist Join Link</strong></p>

<p>You may have already received an invite from Michael Walker through "no-reply@zoom.us,"</p>

<p>Please use this link to join the webinar on the day of the event, for your convenience I've added it here: <a href="[PANELIST_ZOOM_JOIN_LINK]">Click here to join the panel</a></p>

<p><strong>Promotional Materials</strong></p>

<p>This is your Unique Registration Link: <a href="[PANELIST_REGISTRATION_TRACKING_LINK]">Track your sign-ups here</a></p>

<p>To help spread the word, we've prepared a set of promotional materials, including graphics, captions, and email drafts. Here's what's available:</p>

<p><strong>Social Media Graphics</strong></p>

<p>All graphics for LinkedIn, Facebook, and Instagram are accessible here: <a href="[PROMOTIONAL_MATERIALS_DOC_LINK]">Graphic Promotions</a>.</p>

<p><strong>Captions for Social Media</strong></p>

<p>We've created ready-to-use captions to make sharing easy. Suggested posting schedule:</p>

<p>▪️ <strong>Post 1:</strong> At a time of your convenience.</p>

<p>▪️ <strong>Post 2:</strong> At a time of your convenience.</p>

<p>▪️ <strong>Post 3:</strong> At a time of your convenience.</p>

<p>▪️ <strong>Post 4:</strong> [EVENT_DATE_MINUS_1] at a time of your convenience.</p>

<p>▪️ <strong>Post 5:</strong> [EVENT_DATE] at a time of your convenience.</p>

<p><strong>Email Drafts for Your Network</strong></p>

<p>We'd love your help in spreading the word with your network of veterinary professionals through your email list. Suggested email schedule:</p>

<p>▪️ <strong>Draft 1:</strong> Please schedule for [EVENT_DATE]</p>

<p>Let me know if you need anything else or have questions. I'm here to assist and ensure this is a smooth and successful experience!</p>

<p>Best regards,</p>

<p>Chaluka Harsha</p>
<p>Strategic Events and Partnerships Coordinator</p>
<p>Veterinary Business Institute</p>

</body>
</html>`
  },
  {
    id: '05-e10-questions',
    code: 'E-10',
    name: 'Questions',
    sender: 'CHALUKA',
    timing: 'Same day or 1 day after Promo Materials',
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

<p>I've drafted these sets of questions for you in preparation for the upcoming panel discussion, <strong>[PANEL_TITLE]: [PANEL_SUBTITLE].</strong> If you'd like to adjust or suggest additional questions, please feel free to share your thoughts.</p>

<p>If the questions meet your approval, kindly reply to this email confirming the questions. If you'd like to make any changes or refinements, you're welcome to do so.</p>

<p>Looking forward to your feedback!</p>

<p><strong>Please note:</strong> 05 questions will be directed to you during the panel. Each panelist will be assigned 05 questions equally, which will be asked during the discussion.</p>

<p><strong>Your Questions:</strong></p>

<p>1. [QUESTION_1]</p>

<p>2. [QUESTION_2]</p>

<p>3. [QUESTION_3]</p>

<p>4. [QUESTION_4]</p>

<p>5. [QUESTION_5]</p>

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
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 760px; margin: 0; padding: 0; color: #1f2937; }
        a { color: #0B5ED7; text-decoration: underline; }
        a:hover { color: #094db3; }
        h2 { margin: 18px 0 8px; font-size: 13pt; color: #0f172a; }
        ul { margin: 8px 0 16px 22px; padding: 0; }
        li { margin: 4px 0; }
        p { margin: 8px 0; }
        .muted { color: #475569; font-size: 10pt; }
        .tag { display: inline-block; margin-right: 6px; margin-bottom: 6px; padding: 4px 10px; background: #e2e8f0; border-radius: 9999px; font-size: 10pt; }
    </style>
</head>
<body>
<p>Hello [PANELIST_FIRST_NAME],</p>

<p>I hope you are doing great! I'm <strong>Shahina Alexandra</strong>, Program Coordinator of the Veterinary Business Podcast &amp; Institute. It's a pleasure to connect with you. I recently came across your profile and was impressed by your contributions to the veterinary community.</p>

<h2>About the Veterinary Business Institute &amp; Podcast</h2>
<p>At the Veterinary Business Podcast, we explore business strategy, marketing trends, financial management, client relations, leadership, AI, law, and more. Our goal is to equip veterinarians, practice owners, and office managers across the USA and Canada with the insights they need to run thriving practices.</p>

<p><strong>Our Podcast Co-Host Panel Includes:</strong></p>
<ul>
  <li>Naren Arurajah - Founder of Veterinary Business Institute &amp; CEO of Ekwa Marketing</li>
  <li>Dr. Joel Parker - Veterinarian and Co-Founder of Parke Business Systems</li>
  <li>Dr. Mark Roozen - Veterinarian and International Business Advisor</li>
  <li>Dr. Amanda Landis-Hanna - Veterinarian and Chief Veterinary Officer of One Health Group</li>
  <li>Michael Walker - Leadership Coach &amp; Consultant</li>
</ul>

<p>Learn more about us at <a href="https://www.veterinarybusinessinstitute.com/" target="_blank" rel="noopener">Veterinary Business Institute</a>.</p>

<h2>Your Invitation</h2>
<p>On behalf of Naren and the entire Veterinary Business Institute team, I'd love to invite you to join us as a featured expert on our upcoming panel webinar: <strong>[PANEL_TITLE]</strong> &mdash; <em>[PANEL_SUBTITLE]</em>. This series brings together leaders who are redefining practice culture, communication, and leadership.</p>

<h2>Panel Webinar Details</h2>
<p class="tag">Date: [EVENT_DATE_FULL]</p>
<p class="tag">Time: 8:00 PM - 9:00 PM EST</p>
<p class="tag">Format: Zoom Panel Discussion + Live Q&amp;A</p>
<p class="tag">Streaming: LinkedIn &amp; Facebook</p>
<p class="tag">Registration: Complimentary</p>

<p><strong>Moderator:</strong> Adeesha Pemananda, Co-Host of the Veterinary Business Podcast and Leadership Coach.</p>

<h2>What We'll Explore Together</h2>
<ul>
  <li>[DISCUSSION_POINT_1]</li>
  <li>[DISCUSSION_POINT_2]</li>
  <li>[DISCUSSION_POINT_3]</li>
  <li>[DISCUSSION_POINT_4]</li>
  <li>[DISCUSSION_POINT_5]</li>
</ul>

<h2>How This Opportunity Benefits You</h2>
<ul>
  <li><strong>Visibility:</strong> Showcase your expertise to a growing audience of veterinary leaders.</li>
  <li><strong>Networking:</strong> Connect with fellow panelists and practice owners looking for collaboration.</li>
  <li><strong>Thought Leadership:</strong> Share actionable strategies that position you for future speaking opportunities.</li>
  <li><strong>Promotion:</strong> We highlight panelists across our website, podcast, and social platforms.</li>
  <li><strong>Future Engagements:</strong> Active contributors are invited to future Lunch &amp; Learns, panels, and VBI Summits.</li>
  <li><strong>Client Attraction:</strong> Demonstrate how your leadership and culture-building frameworks create thriving practices.</li>
</ul>

<p>We are committed to creating a dynamic and engaging experience for both panelists and attendees, and we would be thrilled to have you with us. Please let me know if you're available, and I'll share next steps along with onboarding materials.</p>

<p>Thank you for considering the invitation. I'm excited about the possibility of partnering with you for this event!</p>

<p>Warmly,<br>
Shahina Alexandra<br>
Program Coordinator, Veterinary Business Podcast &amp; Institute<br>
<a href="mailto:shanina@veterinarybusinessinstitute.com">shanina@veterinarybusinessinstitute.com</a></p>

<p class="muted">Questions? Reply to this email or call our team at (866) 430-1711.</p>

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
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 760px; margin: 0; padding: 0; color: #1f2937; }
        a { color: #0B5ED7; text-decoration: underline; }
        a:hover { color: #094db3; }
        h2 { margin: 18px 0 8px; font-size: 13pt; color: #0f172a; }
        ul { margin: 8px 0 16px 22px; padding: 0; }
        li { margin: 4px 0; }
        p { margin: 8px 0; }
        .muted { color: #475569; font-size: 10pt; }
        .tag { display: inline-block; margin-right: 6px; margin-bottom: 6px; padding: 4px 10px; background: #e2e8f0; border-radius: 9999px; font-size: 10pt; }
    </style>
</head>
<body>
<p>Hello [PANELIST_FIRST_NAME],</p>

<p>I hope you are doing great! I'm <strong>Shahina Alexandra</strong>, Program Coordinator of the Veterinary Business Podcast &amp; Institute. It's a pleasure to connect with you. I recently came across your profile and was impressed by your contributions to the veterinary community.</p>

<h2>About the Veterinary Business Institute &amp; Podcast</h2>
<p>At the Veterinary Business Podcast, we explore business strategy, marketing trends, financial management, client relations, leadership, AI, law, and more. Our goal is to equip veterinarians, practice owners, and office managers across the USA and Canada with the insights they need to run thriving practices.</p>

<p><strong>Our Podcast Co-Host Panel Includes:</strong></p>
<ul>
  <li>Naren Arurajah - Founder of Veterinary Business Institute &amp; CEO of Ekwa Marketing</li>
  <li>Dr. Joel Parker - Veterinarian and Co-Founder of Parke Business Systems</li>
  <li>Dr. Mark Roozen - Veterinarian and International Business Advisor</li>
  <li>Dr. Amanda Landis-Hanna - Veterinarian and Chief Veterinary Officer of One Health Group</li>
  <li>Michael Walker - Leadership Coach &amp; Consultant</li>
</ul>

<p>Learn more about us at <a href="https://www.veterinarybusinessinstitute.com/" target="_blank" rel="noopener">Veterinary Business Institute</a>.</p>

<h2>Your Invitation</h2>
<p>On behalf of Naren and the entire Veterinary Business Institute team, I'd love to invite you to join us as a featured expert on our upcoming panel webinar: <strong>[PANEL_TITLE]</strong> &mdash; <em>[PANEL_SUBTITLE]</em>. This series brings together leaders who are redefining practice culture, communication, and leadership.</p>

<h2>Panel Webinar Details</h2>
<p class="tag">Date: [EVENT_DATE_FULL]</p>
<p class="tag">Time: 8:00 PM - 9:00 PM EST</p>
<p class="tag">Format: Zoom Panel Discussion + Live Q&amp;A</p>
<p class="tag">Streaming: LinkedIn &amp; Facebook</p>
<p class="tag">Registration: Complimentary</p>

<p><strong>Moderator:</strong> Adeesha Pemananda, Co-Host of the Veterinary Business Podcast and Leadership Coach.</p>

<h2>What We'll Explore Together</h2>
<ul>
  <li>[DISCUSSION_POINT_1]</li>
  <li>[DISCUSSION_POINT_2]</li>
  <li>[DISCUSSION_POINT_3]</li>
  <li>[DISCUSSION_POINT_4]</li>
  <li>[DISCUSSION_POINT_5]</li>
</ul>

<h2>How This Opportunity Benefits You</h2>
<ul>
  <li><strong>Visibility:</strong> Showcase your expertise to a growing audience of veterinary leaders.</li>
  <li><strong>Networking:</strong> Connect with fellow panelists and practice owners looking for collaboration.</li>
  <li><strong>Thought Leadership:</strong> Share actionable strategies that position you for future speaking opportunities.</li>
  <li><strong>Promotion:</strong> We highlight panelists across our website, podcast, and social platforms.</li>
  <li><strong>Future Engagements:</strong> Active contributors are invited to future Lunch &amp; Learns, panels, and VBI Summits.</li>
  <li><strong>Client Attraction:</strong> Demonstrate how your leadership and culture-building frameworks create thriving practices.</li>
</ul>

<p>We are committed to creating a dynamic and engaging experience for both panelists and attendees, and we would be thrilled to have you with us. Please let me know if you're available, and I'll share next steps along with onboarding materials.</p>

<p>Thank you for considering the invitation. I'm excited about the possibility of partnering with you for this event!</p>

<p>Warmly,<br>
Shahina Alexandra<br>
Program Coordinator, Veterinary Business Podcast &amp; Institute<br>
<a href="mailto:shanina@veterinarybusinessinstitute.com">shanina@veterinarybusinessinstitute.com</a></p>

<p class="muted">Questions? Reply to this email or call our team at (866) 430-1711.</p>

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
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 760px; margin: 0; padding: 0; color: #1f2937; }
        a { color: #0B5ED7; text-decoration: underline; }
        a:hover { color: #094db3; }
        h2 { margin: 18px 0 8px; font-size: 13pt; color: #0f172a; }
        ul { margin: 8px 0 16px 22px; padding: 0; }
        li { margin: 4px 0; }
        p { margin: 8px 0; }
        .muted { color: #475569; font-size: 10pt; }
        .tag { display: inline-block; margin-right: 6px; margin-bottom: 6px; padding: 4px 10px; background: #e2e8f0; border-radius: 9999px; font-size: 10pt; }
    </style>
</head>
<body>
<p>Hello [PANELIST_FIRST_NAME],</p>

<p>I hope you are doing great! I'm <strong>Shahina Alexandra</strong>, Program Coordinator of the Veterinary Business Podcast &amp; Institute. It's a pleasure to connect with you. I recently came across your profile and was impressed by your contributions to the veterinary community.</p>

<h2>About the Veterinary Business Institute &amp; Podcast</h2>
<p>At the Veterinary Business Podcast, we explore business strategy, marketing trends, financial management, client relations, leadership, AI, law, and more. Our goal is to equip veterinarians, practice owners, and office managers across the USA and Canada with the insights they need to run thriving practices.</p>

<p><strong>Our Podcast Co-Host Panel Includes:</strong></p>
<ul>
  <li>Naren Arurajah - Founder of Veterinary Business Institute &amp; CEO of Ekwa Marketing</li>
  <li>Dr. Joel Parker - Veterinarian and Co-Founder of Parke Business Systems</li>
  <li>Dr. Mark Roozen - Veterinarian and International Business Advisor</li>
  <li>Dr. Amanda Landis-Hanna - Veterinarian and Chief Veterinary Officer of One Health Group</li>
  <li>Michael Walker - Leadership Coach &amp; Consultant</li>
</ul>

<p>Learn more about us at <a href="https://www.veterinarybusinessinstitute.com/" target="_blank" rel="noopener">Veterinary Business Institute</a>.</p>

<h2>Your Invitation</h2>
<p>On behalf of Naren and the entire Veterinary Business Institute team, I'd love to invite you to join us as a featured expert on our upcoming panel webinar: <strong>[PANEL_TITLE]</strong> &mdash; <em>[PANEL_SUBTITLE]</em>. This series brings together leaders who are redefining practice culture, communication, and leadership.</p>

<h2>Panel Webinar Details</h2>
<p class="tag">Date: [EVENT_DATE_FULL]</p>
<p class="tag">Time: 8:00 PM - 9:00 PM EST</p>
<p class="tag">Format: Zoom Panel Discussion + Live Q&amp;A</p>
<p class="tag">Streaming: LinkedIn &amp; Facebook</p>
<p class="tag">Registration: Complimentary</p>

<p><strong>Moderator:</strong> Adeesha Pemananda, Co-Host of the Veterinary Business Podcast and Leadership Coach.</p>

<h2>What We'll Explore Together</h2>
<ul>
  <li>[DISCUSSION_POINT_1]</li>
  <li>[DISCUSSION_POINT_2]</li>
  <li>[DISCUSSION_POINT_3]</li>
  <li>[DISCUSSION_POINT_4]</li>
  <li>[DISCUSSION_POINT_5]</li>
</ul>

<h2>How This Opportunity Benefits You</h2>
<ul>
  <li><strong>Visibility:</strong> Showcase your expertise to a growing audience of veterinary leaders.</li>
  <li><strong>Networking:</strong> Connect with fellow panelists and practice owners looking for collaboration.</li>
  <li><strong>Thought Leadership:</strong> Share actionable strategies that position you for future speaking opportunities.</li>
  <li><strong>Promotion:</strong> We highlight panelists across our website, podcast, and social platforms.</li>
  <li><strong>Future Engagements:</strong> Active contributors are invited to future Lunch &amp; Learns, panels, and VBI Summits.</li>
  <li><strong>Client Attraction:</strong> Demonstrate how your leadership and culture-building frameworks create thriving practices.</li>
</ul>

<p>We are committed to creating a dynamic and engaging experience for both panelists and attendees, and we would be thrilled to have you with us. Please let me know if you're available, and I'll share next steps along with onboarding materials.</p>

<p>Thank you for considering the invitation. I'm excited about the possibility of partnering with you for this event!</p>

<p>Warmly,<br>
Shahina Alexandra<br>
Program Coordinator, Veterinary Business Podcast &amp; Institute<br>
<a href="mailto:shanina@veterinarybusinessinstitute.com">shanina@veterinarybusinessinstitute.com</a></p>

<p class="muted">Questions? Reply to this email or call our team at (866) 430-1711.</p>

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
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 760px; margin: 0; padding: 0; color: #1f2937; }
        a { color: #0B5ED7; text-decoration: underline; }
        a:hover { color: #094db3; }
        h2 { margin: 18px 0 8px; font-size: 13pt; color: #0f172a; }
        ul { margin: 8px 0 16px 22px; padding: 0; }
        li { margin: 4px 0; }
        p { margin: 8px 0; }
        .muted { color: #475569; font-size: 10pt; }
        .tag { display: inline-block; margin-right: 6px; margin-bottom: 6px; padding: 4px 10px; background: #e2e8f0; border-radius: 9999px; font-size: 10pt; }
    </style>
</head>
<body>
<p>Hello [PANELIST_FIRST_NAME],</p>

<p>I hope you are doing great! I'm <strong>Shahina Alexandra</strong>, Program Coordinator of the Veterinary Business Podcast &amp; Institute. It's a pleasure to connect with you. I recently came across your profile and was impressed by your contributions to the veterinary community.</p>

<h2>About the Veterinary Business Institute &amp; Podcast</h2>
<p>At the Veterinary Business Podcast, we explore business strategy, marketing trends, financial management, client relations, leadership, AI, law, and more. Our goal is to equip veterinarians, practice owners, and office managers across the USA and Canada with the insights they need to run thriving practices.</p>

<p><strong>Our Podcast Co-Host Panel Includes:</strong></p>
<ul>
  <li>Naren Arurajah - Founder of Veterinary Business Institute &amp; CEO of Ekwa Marketing</li>
  <li>Dr. Joel Parker - Veterinarian and Co-Founder of Parke Business Systems</li>
  <li>Dr. Mark Roozen - Veterinarian and International Business Advisor</li>
  <li>Dr. Amanda Landis-Hanna - Veterinarian and Chief Veterinary Officer of One Health Group</li>
  <li>Michael Walker - Leadership Coach &amp; Consultant</li>
</ul>

<p>Learn more about us at <a href="https://www.veterinarybusinessinstitute.com/" target="_blank" rel="noopener">Veterinary Business Institute</a>.</p>

<h2>Your Invitation</h2>
<p>On behalf of Naren and the entire Veterinary Business Institute team, I'd love to invite you to join us as a featured expert on our upcoming panel webinar: <strong>[PANEL_TITLE]</strong> &mdash; <em>[PANEL_SUBTITLE]</em>. This series brings together leaders who are redefining practice culture, communication, and leadership.</p>

<h2>Panel Webinar Details</h2>
<p class="tag">Date: [EVENT_DATE_FULL]</p>
<p class="tag">Time: 8:00 PM - 9:00 PM EST</p>
<p class="tag">Format: Zoom Panel Discussion + Live Q&amp;A</p>
<p class="tag">Streaming: LinkedIn &amp; Facebook</p>
<p class="tag">Registration: Complimentary</p>

<p><strong>Moderator:</strong> Adeesha Pemananda, Co-Host of the Veterinary Business Podcast and Leadership Coach.</p>

<h2>What We'll Explore Together</h2>
<ul>
  <li>[DISCUSSION_POINT_1]</li>
  <li>[DISCUSSION_POINT_2]</li>
  <li>[DISCUSSION_POINT_3]</li>
  <li>[DISCUSSION_POINT_4]</li>
  <li>[DISCUSSION_POINT_5]</li>
</ul>

<h2>How This Opportunity Benefits You</h2>
<ul>
  <li><strong>Visibility:</strong> Showcase your expertise to a growing audience of veterinary leaders.</li>
  <li><strong>Networking:</strong> Connect with fellow panelists and practice owners looking for collaboration.</li>
  <li><strong>Thought Leadership:</strong> Share actionable strategies that position you for future speaking opportunities.</li>
  <li><strong>Promotion:</strong> We highlight panelists across our website, podcast, and social platforms.</li>
  <li><strong>Future Engagements:</strong> Active contributors are invited to future Lunch &amp; Learns, panels, and VBI Summits.</li>
  <li><strong>Client Attraction:</strong> Demonstrate how your leadership and culture-building frameworks create thriving practices.</li>
</ul>

<p>We are committed to creating a dynamic and engaging experience for both panelists and attendees, and we would be thrilled to have you with us. Please let me know if you're available, and I'll share next steps along with onboarding materials.</p>

<p>Thank you for considering the invitation. I'm excited about the possibility of partnering with you for this event!</p>

<p>Warmly,<br>
Shahina Alexandra<br>
Program Coordinator, Veterinary Business Podcast &amp; Institute<br>
<a href="mailto:shanina@veterinarybusinessinstitute.com">shanina@veterinarybusinessinstitute.com</a></p>

<p class="muted">Questions? Reply to this email or call our team at (866) 430-1711.</p>

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
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 760px; margin: 0; padding: 0; color: #1f2937; }
        a { color: #0B5ED7; text-decoration: underline; }
        a:hover { color: #094db3; }
        h2 { margin: 18px 0 8px; font-size: 13pt; color: #0f172a; }
        ul { margin: 8px 0 16px 22px; padding: 0; }
        li { margin: 4px 0; }
        p { margin: 8px 0; }
        .muted { color: #475569; font-size: 10pt; }
        .tag { display: inline-block; margin-right: 6px; margin-bottom: 6px; padding: 4px 10px; background: #e2e8f0; border-radius: 9999px; font-size: 10pt; }
    </style>
</head>
<body>
<p>Hello [PANELIST_FIRST_NAME],</p>

<p>I hope you are doing great! I'm <strong>Shahina Alexandra</strong>, Program Coordinator of the Veterinary Business Podcast &amp; Institute. It's a pleasure to connect with you. I recently came across your profile and was impressed by your contributions to the veterinary community.</p>

<h2>About the Veterinary Business Institute &amp; Podcast</h2>
<p>At the Veterinary Business Podcast, we explore business strategy, marketing trends, financial management, client relations, leadership, AI, law, and more. Our goal is to equip veterinarians, practice owners, and office managers across the USA and Canada with the insights they need to run thriving practices.</p>

<p><strong>Our Podcast Co-Host Panel Includes:</strong></p>
<ul>
  <li>Naren Arurajah - Founder of Veterinary Business Institute &amp; CEO of Ekwa Marketing</li>
  <li>Dr. Joel Parker - Veterinarian and Co-Founder of Parke Business Systems</li>
  <li>Dr. Mark Roozen - Veterinarian and International Business Advisor</li>
  <li>Dr. Amanda Landis-Hanna - Veterinarian and Chief Veterinary Officer of One Health Group</li>
  <li>Michael Walker - Leadership Coach &amp; Consultant</li>
</ul>

<p>Learn more about us at <a href="https://www.veterinarybusinessinstitute.com/" target="_blank" rel="noopener">Veterinary Business Institute</a>.</p>

<h2>Your Invitation</h2>
<p>On behalf of Naren and the entire Veterinary Business Institute team, I'd love to invite you to join us as a featured expert on our upcoming panel webinar: <strong>[PANEL_TITLE]</strong> &mdash; <em>[PANEL_SUBTITLE]</em>. This series brings together leaders who are redefining practice culture, communication, and leadership.</p>

<h2>Panel Webinar Details</h2>
<p class="tag">Date: [EVENT_DATE_FULL]</p>
<p class="tag">Time: 8:00 PM - 9:00 PM EST</p>
<p class="tag">Format: Zoom Panel Discussion + Live Q&amp;A</p>
<p class="tag">Streaming: LinkedIn &amp; Facebook</p>
<p class="tag">Registration: Complimentary</p>

<p><strong>Moderator:</strong> Adeesha Pemananda, Co-Host of the Veterinary Business Podcast and Leadership Coach.</p>

<h2>What We'll Explore Together</h2>
<ul>
  <li>[DISCUSSION_POINT_1]</li>
  <li>[DISCUSSION_POINT_2]</li>
  <li>[DISCUSSION_POINT_3]</li>
  <li>[DISCUSSION_POINT_4]</li>
  <li>[DISCUSSION_POINT_5]</li>
</ul>

<h2>How This Opportunity Benefits You</h2>
<ul>
  <li><strong>Visibility:</strong> Showcase your expertise to a growing audience of veterinary leaders.</li>
  <li><strong>Networking:</strong> Connect with fellow panelists and practice owners looking for collaboration.</li>
  <li><strong>Thought Leadership:</strong> Share actionable strategies that position you for future speaking opportunities.</li>
  <li><strong>Promotion:</strong> We highlight panelists across our website, podcast, and social platforms.</li>
  <li><strong>Future Engagements:</strong> Active contributors are invited to future Lunch &amp; Learns, panels, and VBI Summits.</li>
  <li><strong>Client Attraction:</strong> Demonstrate how your leadership and culture-building frameworks create thriving practices.</li>
</ul>

<p>We are committed to creating a dynamic and engaging experience for both panelists and attendees, and we would be thrilled to have you with us. Please let me know if you're available, and I'll share next steps along with onboarding materials.</p>

<p>Thank you for considering the invitation. I'm excited about the possibility of partnering with you for this event!</p>

<p>Warmly,<br>
Shahina Alexandra<br>
Program Coordinator, Veterinary Business Podcast &amp; Institute<br>
<a href="mailto:shanina@veterinarybusinessinstitute.com">shanina@veterinarybusinessinstitute.com</a></p>

<p class="muted">Questions? Reply to this email or call our team at (866) 430-1711.</p>

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
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 760px; margin: 0; padding: 0; color: #1f2937; }
        a { color: #0B5ED7; text-decoration: underline; }
        a:hover { color: #094db3; }
        h2 { margin: 18px 0 8px; font-size: 13pt; color: #0f172a; }
        ul { margin: 8px 0 16px 22px; padding: 0; }
        li { margin: 4px 0; }
        p { margin: 8px 0; }
        .muted { color: #475569; font-size: 10pt; }
        .tag { display: inline-block; margin-right: 6px; margin-bottom: 6px; padding: 4px 10px; background: #e2e8f0; border-radius: 9999px; font-size: 10pt; }
    </style>
</head>
<body>
<p>Hello [PANELIST_FIRST_NAME],</p>

<p>I hope you are doing great! I'm <strong>Shahina Alexandra</strong>, Program Coordinator of the Veterinary Business Podcast &amp; Institute. It's a pleasure to connect with you. I recently came across your profile and was impressed by your contributions to the veterinary community.</p>

<h2>About the Veterinary Business Institute &amp; Podcast</h2>
<p>At the Veterinary Business Podcast, we explore business strategy, marketing trends, financial management, client relations, leadership, AI, law, and more. Our goal is to equip veterinarians, practice owners, and office managers across the USA and Canada with the insights they need to run thriving practices.</p>

<p><strong>Our Podcast Co-Host Panel Includes:</strong></p>
<ul>
  <li>Naren Arurajah - Founder of Veterinary Business Institute &amp; CEO of Ekwa Marketing</li>
  <li>Dr. Joel Parker - Veterinarian and Co-Founder of Parke Business Systems</li>
  <li>Dr. Mark Roozen - Veterinarian and International Business Advisor</li>
  <li>Dr. Amanda Landis-Hanna - Veterinarian and Chief Veterinary Officer of One Health Group</li>
  <li>Michael Walker - Leadership Coach &amp; Consultant</li>
</ul>

<p>Learn more about us at <a href="https://www.veterinarybusinessinstitute.com/" target="_blank" rel="noopener">Veterinary Business Institute</a>.</p>

<h2>Your Invitation</h2>
<p>On behalf of Naren and the entire Veterinary Business Institute team, I'd love to invite you to join us as a featured expert on our upcoming panel webinar: <strong>[PANEL_TITLE]</strong> &mdash; <em>[PANEL_SUBTITLE]</em>. This series brings together leaders who are redefining practice culture, communication, and leadership.</p>

<h2>Panel Webinar Details</h2>
<p class="tag">Date: [EVENT_DATE_FULL]</p>
<p class="tag">Time: 8:00 PM - 9:00 PM EST</p>
<p class="tag">Format: Zoom Panel Discussion + Live Q&amp;A</p>
<p class="tag">Streaming: LinkedIn &amp; Facebook</p>
<p class="tag">Registration: Complimentary</p>

<p><strong>Moderator:</strong> Adeesha Pemananda, Co-Host of the Veterinary Business Podcast and Leadership Coach.</p>

<h2>What We'll Explore Together</h2>
<ul>
  <li>[DISCUSSION_POINT_1]</li>
  <li>[DISCUSSION_POINT_2]</li>
  <li>[DISCUSSION_POINT_3]</li>
  <li>[DISCUSSION_POINT_4]</li>
  <li>[DISCUSSION_POINT_5]</li>
</ul>

<h2>How This Opportunity Benefits You</h2>
<ul>
  <li><strong>Visibility:</strong> Showcase your expertise to a growing audience of veterinary leaders.</li>
  <li><strong>Networking:</strong> Connect with fellow panelists and practice owners looking for collaboration.</li>
  <li><strong>Thought Leadership:</strong> Share actionable strategies that position you for future speaking opportunities.</li>
  <li><strong>Promotion:</strong> We highlight panelists across our website, podcast, and social platforms.</li>
  <li><strong>Future Engagements:</strong> Active contributors are invited to future Lunch &amp; Learns, panels, and VBI Summits.</li>
  <li><strong>Client Attraction:</strong> Demonstrate how your leadership and culture-building frameworks create thriving practices.</li>
</ul>

<p>We are committed to creating a dynamic and engaging experience for both panelists and attendees, and we would be thrilled to have you with us. Please let me know if you're available, and I'll share next steps along with onboarding materials.</p>

<p>Thank you for considering the invitation. I'm excited about the possibility of partnering with you for this event!</p>

<p>Warmly,<br>
Shahina Alexandra<br>
Program Coordinator, Veterinary Business Podcast &amp; Institute<br>
<a href="mailto:shanina@veterinarybusinessinstitute.com">shanina@veterinarybusinessinstitute.com</a></p>

<p class="muted">Questions? Reply to this email or call our team at (866) 430-1711.</p>

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
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 760px; margin: 0; padding: 0; color: #1f2937; }
        a { color: #0B5ED7; text-decoration: underline; }
        a:hover { color: #094db3; }
        h2 { margin: 18px 0 8px; font-size: 13pt; color: #0f172a; }
        ul { margin: 8px 0 16px 22px; padding: 0; }
        li { margin: 4px 0; }
        p { margin: 8px 0; }
        .muted { color: #475569; font-size: 10pt; }
        .tag { display: inline-block; margin-right: 6px; margin-bottom: 6px; padding: 4px 10px; background: #e2e8f0; border-radius: 9999px; font-size: 10pt; }
    </style>
</head>
<body>
<p>Hello [PANELIST_FIRST_NAME],</p>

<p>I hope you are doing great! I'm <strong>Shahina Alexandra</strong>, Program Coordinator of the Veterinary Business Podcast &amp; Institute. It's a pleasure to connect with you. I recently came across your profile and was impressed by your contributions to the veterinary community.</p>

<h2>About the Veterinary Business Institute &amp; Podcast</h2>
<p>At the Veterinary Business Podcast, we explore business strategy, marketing trends, financial management, client relations, leadership, AI, law, and more. Our goal is to equip veterinarians, practice owners, and office managers across the USA and Canada with the insights they need to run thriving practices.</p>

<p><strong>Our Podcast Co-Host Panel Includes:</strong></p>
<ul>
  <li>Naren Arurajah - Founder of Veterinary Business Institute &amp; CEO of Ekwa Marketing</li>
  <li>Dr. Joel Parker - Veterinarian and Co-Founder of Parke Business Systems</li>
  <li>Dr. Mark Roozen - Veterinarian and International Business Advisor</li>
  <li>Dr. Amanda Landis-Hanna - Veterinarian and Chief Veterinary Officer of One Health Group</li>
  <li>Michael Walker - Leadership Coach &amp; Consultant</li>
</ul>

<p>Learn more about us at <a href="https://www.veterinarybusinessinstitute.com/" target="_blank" rel="noopener">Veterinary Business Institute</a>.</p>

<h2>Your Invitation</h2>
<p>On behalf of Naren and the entire Veterinary Business Institute team, I'd love to invite you to join us as a featured expert on our upcoming panel webinar: <strong>[PANEL_TITLE]</strong> &mdash; <em>[PANEL_SUBTITLE]</em>. This series brings together leaders who are redefining practice culture, communication, and leadership.</p>

<h2>Panel Webinar Details</h2>
<p class="tag">Date: [EVENT_DATE_FULL]</p>
<p class="tag">Time: 8:00 PM - 9:00 PM EST</p>
<p class="tag">Format: Zoom Panel Discussion + Live Q&amp;A</p>
<p class="tag">Streaming: LinkedIn &amp; Facebook</p>
<p class="tag">Registration: Complimentary</p>

<p><strong>Moderator:</strong> Adeesha Pemananda, Co-Host of the Veterinary Business Podcast and Leadership Coach.</p>

<h2>What We'll Explore Together</h2>
<ul>
  <li>[DISCUSSION_POINT_1]</li>
  <li>[DISCUSSION_POINT_2]</li>
  <li>[DISCUSSION_POINT_3]</li>
  <li>[DISCUSSION_POINT_4]</li>
  <li>[DISCUSSION_POINT_5]</li>
</ul>

<h2>How This Opportunity Benefits You</h2>
<ul>
  <li><strong>Visibility:</strong> Showcase your expertise to a growing audience of veterinary leaders.</li>
  <li><strong>Networking:</strong> Connect with fellow panelists and practice owners looking for collaboration.</li>
  <li><strong>Thought Leadership:</strong> Share actionable strategies that position you for future speaking opportunities.</li>
  <li><strong>Promotion:</strong> We highlight panelists across our website, podcast, and social platforms.</li>
  <li><strong>Future Engagements:</strong> Active contributors are invited to future Lunch &amp; Learns, panels, and VBI Summits.</li>
  <li><strong>Client Attraction:</strong> Demonstrate how your leadership and culture-building frameworks create thriving practices.</li>
</ul>

<p>We are committed to creating a dynamic and engaging experience for both panelists and attendees, and we would be thrilled to have you with us. Please let me know if you're available, and I'll share next steps along with onboarding materials.</p>

<p>Thank you for considering the invitation. I'm excited about the possibility of partnering with you for this event!</p>

<p>Warmly,<br>
Shahina Alexandra<br>
Program Coordinator, Veterinary Business Podcast &amp; Institute<br>
<a href="mailto:shanina@veterinarybusinessinstitute.com">shanina@veterinarybusinessinstitute.com</a></p>

<p class="muted">Questions? Reply to this email or call our team at (866) 430-1711.</p>

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
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 760px; margin: 0; padding: 0; color: #1f2937; }
        a { color: #0B5ED7; text-decoration: underline; }
        a:hover { color: #094db3; }
        h2 { margin: 18px 0 8px; font-size: 13pt; color: #0f172a; }
        ul { margin: 8px 0 16px 22px; padding: 0; }
        li { margin: 4px 0; }
        p { margin: 8px 0; }
        .muted { color: #475569; font-size: 10pt; }
        .tag { display: inline-block; margin-right: 6px; margin-bottom: 6px; padding: 4px 10px; background: #e2e8f0; border-radius: 9999px; font-size: 10pt; }
    </style>
</head>
<body>
<p>Hello [PANELIST_FIRST_NAME],</p>

<p>I hope you are doing great! I'm <strong>Shahina Alexandra</strong>, Program Coordinator of the Veterinary Business Podcast &amp; Institute. It's a pleasure to connect with you. I recently came across your profile and was impressed by your contributions to the veterinary community.</p>

<h2>About the Veterinary Business Institute &amp; Podcast</h2>
<p>At the Veterinary Business Podcast, we explore business strategy, marketing trends, financial management, client relations, leadership, AI, law, and more. Our goal is to equip veterinarians, practice owners, and office managers across the USA and Canada with the insights they need to run thriving practices.</p>

<p><strong>Our Podcast Co-Host Panel Includes:</strong></p>
<ul>
  <li>Naren Arurajah - Founder of Veterinary Business Institute &amp; CEO of Ekwa Marketing</li>
  <li>Dr. Joel Parker - Veterinarian and Co-Founder of Parke Business Systems</li>
  <li>Dr. Mark Roozen - Veterinarian and International Business Advisor</li>
  <li>Dr. Amanda Landis-Hanna - Veterinarian and Chief Veterinary Officer of One Health Group</li>
  <li>Michael Walker - Leadership Coach &amp; Consultant</li>
</ul>

<p>Learn more about us at <a href="https://www.veterinarybusinessinstitute.com/" target="_blank" rel="noopener">Veterinary Business Institute</a>.</p>

<h2>Your Invitation</h2>
<p>On behalf of Naren and the entire Veterinary Business Institute team, I'd love to invite you to join us as a featured expert on our upcoming panel webinar: <strong>[PANEL_TITLE]</strong> &mdash; <em>[PANEL_SUBTITLE]</em>. This series brings together leaders who are redefining practice culture, communication, and leadership.</p>

<h2>Panel Webinar Details</h2>
<p class="tag">Date: [EVENT_DATE_FULL]</p>
<p class="tag">Time: 8:00 PM - 9:00 PM EST</p>
<p class="tag">Format: Zoom Panel Discussion + Live Q&amp;A</p>
<p class="tag">Streaming: LinkedIn &amp; Facebook</p>
<p class="tag">Registration: Complimentary</p>

<p><strong>Moderator:</strong> Adeesha Pemananda, Co-Host of the Veterinary Business Podcast and Leadership Coach.</p>

<h2>What We'll Explore Together</h2>
<ul>
  <li>[DISCUSSION_POINT_1]</li>
  <li>[DISCUSSION_POINT_2]</li>
  <li>[DISCUSSION_POINT_3]</li>
  <li>[DISCUSSION_POINT_4]</li>
  <li>[DISCUSSION_POINT_5]</li>
</ul>

<h2>How This Opportunity Benefits You</h2>
<ul>
  <li><strong>Visibility:</strong> Showcase your expertise to a growing audience of veterinary leaders.</li>
  <li><strong>Networking:</strong> Connect with fellow panelists and practice owners looking for collaboration.</li>
  <li><strong>Thought Leadership:</strong> Share actionable strategies that position you for future speaking opportunities.</li>
  <li><strong>Promotion:</strong> We highlight panelists across our website, podcast, and social platforms.</li>
  <li><strong>Future Engagements:</strong> Active contributors are invited to future Lunch &amp; Learns, panels, and VBI Summits.</li>
  <li><strong>Client Attraction:</strong> Demonstrate how your leadership and culture-building frameworks create thriving practices.</li>
</ul>

<p>We are committed to creating a dynamic and engaging experience for both panelists and attendees, and we would be thrilled to have you with us. Please let me know if you're available, and I'll share next steps along with onboarding materials.</p>

<p>Thank you for considering the invitation. I'm excited about the possibility of partnering with you for this event!</p>

<p>Warmly,<br>
Shahina Alexandra<br>
Program Coordinator, Veterinary Business Podcast &amp; Institute<br>
<a href="mailto:shanina@veterinarybusinessinstitute.com">shanina@veterinarybusinessinstitute.com</a></p>

<p class="muted">Questions? Reply to this email or call our team at (866) 430-1711.</p>

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
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 760px; margin: 0; padding: 0; color: #1f2937; }
        a { color: #0B5ED7; text-decoration: underline; }
        a:hover { color: #094db3; }
        h2 { margin: 18px 0 8px; font-size: 13pt; color: #0f172a; }
        ul { margin: 8px 0 16px 22px; padding: 0; }
        li { margin: 4px 0; }
        p { margin: 8px 0; }
        .muted { color: #475569; font-size: 10pt; }
        .tag { display: inline-block; margin-right: 6px; margin-bottom: 6px; padding: 4px 10px; background: #e2e8f0; border-radius: 9999px; font-size: 10pt; }
    </style>
</head>
<body>
<p>Hello [PANELIST_FIRST_NAME],</p>

<p>I hope you are doing great! I'm <strong>Shahina Alexandra</strong>, Program Coordinator of the Veterinary Business Podcast &amp; Institute. It's a pleasure to connect with you. I recently came across your profile and was impressed by your contributions to the veterinary community.</p>

<h2>About the Veterinary Business Institute &amp; Podcast</h2>
<p>At the Veterinary Business Podcast, we explore business strategy, marketing trends, financial management, client relations, leadership, AI, law, and more. Our goal is to equip veterinarians, practice owners, and office managers across the USA and Canada with the insights they need to run thriving practices.</p>

<p><strong>Our Podcast Co-Host Panel Includes:</strong></p>
<ul>
  <li>Naren Arurajah - Founder of Veterinary Business Institute &amp; CEO of Ekwa Marketing</li>
  <li>Dr. Joel Parker - Veterinarian and Co-Founder of Parke Business Systems</li>
  <li>Dr. Mark Roozen - Veterinarian and International Business Advisor</li>
  <li>Dr. Amanda Landis-Hanna - Veterinarian and Chief Veterinary Officer of One Health Group</li>
  <li>Michael Walker - Leadership Coach &amp; Consultant</li>
</ul>

<p>Learn more about us at <a href="https://www.veterinarybusinessinstitute.com/" target="_blank" rel="noopener">Veterinary Business Institute</a>.</p>

<h2>Your Invitation</h2>
<p>On behalf of Naren and the entire Veterinary Business Institute team, I'd love to invite you to join us as a featured expert on our upcoming panel webinar: <strong>[PANEL_TITLE]</strong> &mdash; <em>[PANEL_SUBTITLE]</em>. This series brings together leaders who are redefining practice culture, communication, and leadership.</p>

<h2>Panel Webinar Details</h2>
<p class="tag">Date: [EVENT_DATE_FULL]</p>
<p class="tag">Time: 8:00 PM - 9:00 PM EST</p>
<p class="tag">Format: Zoom Panel Discussion + Live Q&amp;A</p>
<p class="tag">Streaming: LinkedIn &amp; Facebook</p>
<p class="tag">Registration: Complimentary</p>

<p><strong>Moderator:</strong> Adeesha Pemananda, Co-Host of the Veterinary Business Podcast and Leadership Coach.</p>

<h2>What We'll Explore Together</h2>
<ul>
  <li>[DISCUSSION_POINT_1]</li>
  <li>[DISCUSSION_POINT_2]</li>
  <li>[DISCUSSION_POINT_3]</li>
  <li>[DISCUSSION_POINT_4]</li>
  <li>[DISCUSSION_POINT_5]</li>
</ul>

<h2>How This Opportunity Benefits You</h2>
<ul>
  <li><strong>Visibility:</strong> Showcase your expertise to a growing audience of veterinary leaders.</li>
  <li><strong>Networking:</strong> Connect with fellow panelists and practice owners looking for collaboration.</li>
  <li><strong>Thought Leadership:</strong> Share actionable strategies that position you for future speaking opportunities.</li>
  <li><strong>Promotion:</strong> We highlight panelists across our website, podcast, and social platforms.</li>
  <li><strong>Future Engagements:</strong> Active contributors are invited to future Lunch &amp; Learns, panels, and VBI Summits.</li>
  <li><strong>Client Attraction:</strong> Demonstrate how your leadership and culture-building frameworks create thriving practices.</li>
</ul>

<p>We are committed to creating a dynamic and engaging experience for both panelists and attendees, and we would be thrilled to have you with us. Please let me know if you're available, and I'll share next steps along with onboarding materials.</p>

<p>Thank you for considering the invitation. I'm excited about the possibility of partnering with you for this event!</p>

<p>Warmly,<br>
Shahina Alexandra<br>
Program Coordinator, Veterinary Business Podcast &amp; Institute<br>
<a href="mailto:shanina@veterinarybusinessinstitute.com">shanina@veterinarybusinessinstitute.com</a></p>

<p class="muted">Questions? Reply to this email or call our team at (866) 430-1711.</p>

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
        body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; font-size: 11pt; max-width: 760px; margin: 0; padding: 0; color: #1f2937; }
        a { color: #0B5ED7; text-decoration: underline; }
        a:hover { color: #094db3; }
        h2 { margin: 18px 0 8px; font-size: 13pt; color: #0f172a; }
        ul { margin: 8px 0 16px 22px; padding: 0; }
        li { margin: 4px 0; }
        p { margin: 8px 0; }
        .muted { color: #475569; font-size: 10pt; }
        .tag { display: inline-block; margin-right: 6px; margin-bottom: 6px; padding: 4px 10px; background: #e2e8f0; border-radius: 9999px; font-size: 10pt; }
    </style>
</head>
<body>
<p>Hello [PANELIST_FIRST_NAME],</p>

<p>I hope you are doing great! I'm <strong>Shahina Alexandra</strong>, Program Coordinator of the Veterinary Business Podcast &amp; Institute. It's a pleasure to connect with you. I recently came across your profile and was impressed by your contributions to the veterinary community.</p>

<h2>About the Veterinary Business Institute &amp; Podcast</h2>
<p>At the Veterinary Business Podcast, we explore business strategy, marketing trends, financial management, client relations, leadership, AI, law, and more. Our goal is to equip veterinarians, practice owners, and office managers across the USA and Canada with the insights they need to run thriving practices.</p>

<p><strong>Our Podcast Co-Host Panel Includes:</strong></p>
<ul>
  <li>Naren Arurajah - Founder of Veterinary Business Institute &amp; CEO of Ekwa Marketing</li>
  <li>Dr. Joel Parker - Veterinarian and Co-Founder of Parke Business Systems</li>
  <li>Dr. Mark Roozen - Veterinarian and International Business Advisor</li>
  <li>Dr. Amanda Landis-Hanna - Veterinarian and Chief Veterinary Officer of One Health Group</li>
  <li>Michael Walker - Leadership Coach &amp; Consultant</li>
</ul>

<p>Learn more about us at <a href="https://www.veterinarybusinessinstitute.com/" target="_blank" rel="noopener">Veterinary Business Institute</a>.</p>

<h2>Your Invitation</h2>
<p>On behalf of Naren and the entire Veterinary Business Institute team, I'd love to invite you to join us as a featured expert on our upcoming panel webinar: <strong>[PANEL_TITLE]</strong> &mdash; <em>[PANEL_SUBTITLE]</em>. This series brings together leaders who are redefining practice culture, communication, and leadership.</p>

<h2>Panel Webinar Details</h2>
<p class="tag">Date: [EVENT_DATE_FULL]</p>
<p class="tag">Time: 8:00 PM - 9:00 PM EST</p>
<p class="tag">Format: Zoom Panel Discussion + Live Q&amp;A</p>
<p class="tag">Streaming: LinkedIn &amp; Facebook</p>
<p class="tag">Registration: Complimentary</p>

<p><strong>Moderator:</strong> Adeesha Pemananda, Co-Host of the Veterinary Business Podcast and Leadership Coach.</p>

<h2>What We'll Explore Together</h2>
<ul>
  <li>[DISCUSSION_POINT_1]</li>
  <li>[DISCUSSION_POINT_2]</li>
  <li>[DISCUSSION_POINT_3]</li>
  <li>[DISCUSSION_POINT_4]</li>
  <li>[DISCUSSION_POINT_5]</li>
</ul>

<h2>How This Opportunity Benefits You</h2>
<ul>
  <li><strong>Visibility:</strong> Showcase your expertise to a growing audience of veterinary leaders.</li>
  <li><strong>Networking:</strong> Connect with fellow panelists and practice owners looking for collaboration.</li>
  <li><strong>Thought Leadership:</strong> Share actionable strategies that position you for future speaking opportunities.</li>
  <li><strong>Promotion:</strong> We highlight panelists across our website, podcast, and social platforms.</li>
  <li><strong>Future Engagements:</strong> Active contributors are invited to future Lunch &amp; Learns, panels, and VBI Summits.</li>
  <li><strong>Client Attraction:</strong> Demonstrate how your leadership and culture-building frameworks create thriving practices.</li>
</ul>

<p>We are committed to creating a dynamic and engaging experience for both panelists and attendees, and we would be thrilled to have you with us. Please let me know if you're available, and I'll share next steps along with onboarding materials.</p>

<p>Thank you for considering the invitation. I'm excited about the possibility of partnering with you for this event!</p>

<p>Warmly,<br>
Shahina Alexandra<br>
Program Coordinator, Veterinary Business Podcast &amp; Institute<br>
<a href="mailto:shanina@veterinarybusinessinstitute.com">shanina@veterinarybusinessinstitute.com</a></p>

<p class="muted">Questions? Reply to this email or call our team at (866) 430-1711.</p>

</body>
</html>`
  }
];


