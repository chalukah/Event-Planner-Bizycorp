# **VETERINARY BUSINESS INSTITUTE (VBI) PANEL AUTOMATION GUIDE**
## Complete End-to-End Event Management System

---

## **TABLE OF CONTENTS**

1. [Overview & Variables](#overview--variables)
2. [Phase 1: Recruitment & Confirmation (E-30 to E-21 Days)](#phase-1-recruitment--confirmation-e-30-to-e-21-days)
3. [Phase 2: Pre-Panel Preparation & Promotion (E-14 to E-1 Days)](#phase-2-pre-panel-preparation--promotion-e-14-to-e-1-days)
4. [Phase 3: Event Day (E-Day)](#phase-3-event-day-e-day)
5. [Phase 4: Post-Panel Follow-Up (E+1 to E+7 Days)](#phase-4-post-panel-follow-up-e1-to-e7-days)
6. [Outlook Automation Setup](#outlook-automation-setup)
7. [Email Templates Library](#email-templates-library)
8. [Quality Control Checklist](#quality-control-checklist)

---

## **OVERVIEW & VARIABLES**

### **Required Data Points for Each Panel**

Before starting automation, gather the following information:

#### **Event Details**
- `[Event_Date]` - Example: Wednesday, October 29, 2025
- `[Event_Time_EST]` - Example: 8:00 PM - 9:00 PM EST
- `[Event_Duration]` - Example: 1 Hour
- `[Event_Topic_Category]` - Example: Veterinary Talent Solutions
- `[Event_Title]` - Example: The Workforce Crisis: Real Strategies to Recruit, Retain, and Rebuild Veterinary Teams
- `[Event_Registration_Page_Link]` - Main Zoom registration URL
- `[Event_Recording_Link]` - Available post-event
- `[Zoom_Webinar_ID]` - Example: 84025717176
- `[Event_Platform]` - Example: Zoom (Live Webinar)

#### **Discussion Points**
- `[Key_Discussion_Point_1]`
- `[Key_Discussion_Point_2]`
- `[Key_Discussion_Point_3]`
- `[Key_Discussion_Point_4]`
- `[Key_Discussion_Point_5]`

#### **Panelist Details** (Collect for each panelist)
- `[Panelist_Full_Name]`
- `[Panelist_First_Name]`
- `[Panelist_Email]`
- `[Panelist_Phone]`
- `[Panelist_Title]`
- `[Panelist_Organization]`
- `[Panelist_Bio_Short]` - 3-4 sentences
- `[Panelist_Headshot_URL]`
- `[Panelist_Unique_Join_Link]` - Private Zoom panelist link
- `[Panelist_Unique_Registration_Link]` - Public registration link with tracking

#### **Internal Team Details**
- `[Coordinator_Name]` - Example: Chaluka Harsha
- `[Coordinator_Email]` - Example: chaluka@veterinarybusinessinstitute.com
- `[Host_Name]` - Example: Liyanna Faith
- `[Manager_Email]` - Example: faith@ekwa.com
- `[Team_Lead_Email]` - Example: reshani@thrivingdentistpartnerships.com
- `[BDR_Email]` - Example: achini@ekwa.com

#### **Marketing Assets**
- `[Graphics_Folder_Link]` - Google Drive or cloud storage link
- `[Questions_Document_Link]` - Link to panelist questions document
- `[Slide_Deck_Link]` - Link to presentation slides
- `[Social_Media_Caption_Document]` - Link to pre-written social posts
- `[Email_Templates_Folder]` - Link to all email templates

#### **Sponsor Details**
- `[Sponsor_Name]` - Example: Ekwa Marketing
- `[Sponsor_Offer_Name]` - Example: Marketing Strategy Consultation
- `[Sponsor_Offer_Link]` - Example: https://www.veterinarybusinessinstitute.com/msm/
- `[Sponsor_Offer_Description]` - Brief description of the free offer

---

## **PHASE 1: RECRUITMENT & CONFIRMATION (E-30 to E-21 Days)**

### **TASK 1.1: Send Initial Panelist Invitation**

**Timeline:** 30 days before event (E-30)  
**Automation Type:** Manual or scheduled send  
**Outlook Category:** VBI Panel - Recruitment

**Email Template:** [See Template #1](#template-1-initial-panelist-invitation)

**Action Steps:**
1. Research and identify 5-7 potential panelists
2. Customize invitation email for each prospect
3. Send invitation emails
4. Set follow-up reminder for 5 days if no response
5. Track responses in tracking spreadsheet

**Follow-Up Schedule:**
- Day 5: Gentle follow-up if no response
- Day 10: Final follow-up with alternative date offer
- Day 14: Mark as declined and move to next prospect

---

### **TASK 1.2: Send Confirmation & Onboarding Email**

**Timeline:** Within 24 hours of panelist confirmation  
**Automation Type:** Semi-automated (trigger on confirmation)  
**Outlook Category:** VBI Panel - Onboarding

**Email Template:** [See Template #2](#template-2-confirmation--onboarding)

**Action Steps:**
1. Send confirmation email with onboarding details
2. CC manager and team lead
3. Create contact folder for panelist
4. Request biographical information
5. Set reminder to follow up on bio information in 3 days
6. Add panelist to internal tracking sheet

**Information to Collect:**
- Full Name
- Contact Number
- Current Position and Organization
- Professional Headshot (high resolution)
- Email Address (confirm)
- Short Bio (3-4 sentences)
- LinkedIn Profile URL
- Preferred social media handles

---

### **TASK 1.3: Create Panelist Profile & Assets**

**Timeline:** Within 48 hours of receiving bio information  
**Automation Type:** Manual  
**Outlook Category:** VBI Panel - Assets

**Action Steps:**
1. Create panelist profile document
2. Generate promotional graphics with panelist information
3. Prepare panelist-specific registration tracking link
4. Create unique Zoom panelist join link
5. Draft 5 customized questions for the panelist
6. Compile all assets into panelist folder
7. Send internal notification to team that panelist is ready

---

## **PHASE 2: PRE-PANEL PREPARATION & PROMOTION (E-14 to E-1 Days)**

### **TASK 2.1: Internal Asset Creation & Review**

**Timeline:** 14 days before event (E-14)  
**Automation Type:** Manual  
**Outlook Category:** VBI Panel - Production

**Action Steps:**
1. **Zoom Setup:**
   - Create Zoom Webinar event
   - Set up registration page
   - Configure panelist roles and permissions
   - Test all links (registration, panelist join, practice mode)
   - Set up automated Zoom reminder emails

2. **Marketing Materials:**
   - Finalize all promotional graphics (LinkedIn, Facebook, Instagram)
   - Create email graphics and headers
   - Design social media carousel posts
   - Prepare video snippets or GIFs for promotion

3. **Content Creation:**
   - Finalize panelist questions (5 per panelist)
   - Create moderator script
   - Prepare opening and closing remarks
   - Create slide deck with panelist bios
   - Prepare sponsor slide and talking points

4. **Email Sequences:**
   - Set up all automated email sequences in Outlook
   - Test email delivery and formatting
   - Prepare backup manual send list

5. **Quality Check:**
   - Review all links for accuracy
   - Spell-check all materials
   - Confirm all dates and times are correct
   - Test registration process end-to-end

---

### **TASK 2.2: Send Panelist Promotional Package**

**Timeline:** 10 days before event (E-10)  
**Automation Type:** Scheduled send with tracking  
**Outlook Category:** VBI Panel - Promotion

**Email Template:** [See Template #3](#template-3-panelist-promotional-package)

**Action Steps:**
1. Prepare complete promotional package for each panelist
2. Include all graphics, captions, and email templates
3. Send unique registration link for tracking
4. Provide Zoom panelist join link
5. Include questions document for review
6. Set deadline for question approval (E-7)
7. Request social media promotion commitment
8. CC manager and team lead

**Package Contents:**
- Unique Panelist Join Link
- Unique Registration Link (for their audience tracking)
- Social Media Graphics (all formats)
- Pre-written Social Media Captions
- Email Templates for their mailing list
- Discussion Questions Document
- Event logistics one-pager
- Promotional timeline and expectations

---

### **TASK 2.3: Launch Public Promotion**

**Timeline:** 10 days before event (E-10)  
**Automation Type:** Scheduled posts and emails  
**Outlook Category:** VBI Panel - Marketing

**Marketing Channels:**

1. **Email Marketing:**
   - Send to VBI mailing list (all subscribers)
   - Send to past webinar attendees
   - Send to veterinary practice database
   - Segment by interest category if possible

2. **Social Media:**
   - LinkedIn: Post 3x during promotion period
   - Facebook: Post 3x during promotion period
   - Instagram: Stories daily + 2 feed posts
   - Tag all panelists in posts

3. **Panelist Networks:**
   - Request panelists share on their channels
   - Monitor panelist promotion activity
   - Thank panelists for sharing (personal messages)

4. **Partner Promotion:**
   - Send to partner organizations
   - Request cross-promotion where applicable
   - Share with sponsor for their network

**Content Calendar:**
- E-10: Announcement post (all channels)
- E-7: "Meet the Panelists" spotlight post
- E-5: Key discussion topics teaser
- E-3: "Last Chance to Register" push
- E-1: "Tomorrow!" reminder post
- E-Day: "Starting Soon" and "Going Live" posts

---

### **TASK 2.4: Send Attendee Reminder #1**

**Timeline:** 7 days before event (E-7)  
**Automation Type:** Automated Zoom + Manual Outlook  
**Outlook Category:** VBI Panel - Attendee Reminders

**Email Template:** [See Template #4](#template-4-attendee-reminder-1)

**Action Steps:**
1. Send "See you next week!" reminder to all registrants
2. Include "Add to Calendar" link
3. Highlight one key discussion point
4. Include sponsor mention
5. Track email open and click rates

---

### **TASK 2.5: Send "Last Chance" Promotion & Reminder #2**

**Timeline:** 3 days before event (E-3)  
**Automation Type:** Automated sequence  
**Outlook Category:** VBI Panel - Final Push

**Two-Part Email Strategy:**

**Email A - To Non-Registrants:**
- Subject: Last Chance to Register for `[Event_Title]`
- Emphasize FOMO and limited time
- Highlight panelist expertise
- Clear CTA to register

**Email B - To Current Registrants:**
- Subject: See you in 3 days at `[Event_Title]`!
- Thank them for registering
- Remind them of date and time
- Encourage them to invite colleagues
- Provide "Add to Calendar" link again

**Templates:** [See Template #5A and #5B](#template-5a--5b-last-chance-emails)

---

### **TASK 2.6: Send Final Panelist Check-In**

**Timeline:** 1 day before event (E-1)  
**Automation Type:** Scheduled send  
**Outlook Category:** VBI Panel - Final Prep

**Email Template:** [See Template #6](#template-6-final-panelist-check-in)

**Action Steps:**
1. Send final logistics email to all panelists
2. Include Zoom join link (clickable)
3. Request they join 10 minutes early
4. Provide host contact number for day-of issues
5. Attach one-page tech checklist
6. Confirm they reviewed questions
7. Send personal encouragement message

**Include in Email:**
- Zoom panelist link
- Start time (with time zone!)
- Request to join 10 minutes early
- Tech requirements checklist
- Host contact information
- Last-minute question contact
- Expression of excitement and gratitude

---

### **TASK 2.7: Send Final Attendee Reminder**

**Timeline:** 1 day before event (E-1)  
**Automation Type:** Automated Zoom + Outlook  
**Outlook Category:** VBI Panel - Attendee Reminders

**Email Template:** [See Template #7](#template-7-final-attendee-reminder)

**Action Steps:**
1. Send "Tomorrow!" email to all registrants
2. Build anticipation with discussion point teaser
3. Remind about free sponsor offer
4. Provide "Add to Calendar" link
5. Include direct Zoom link

---

## **PHASE 3: EVENT DAY (E-DAY)**

### **TASK 3.1: Send "1 Hour Before" Reminder**

**Timeline:** 1 hour before event start (E-Day, 60 mins before)  
**Automation Type:** Automated Zoom + Outlook backup  
**Outlook Category:** VBI Panel - Live Event

**Email Template:** [See Template #8](#template-8-one-hour-reminder)

**Action Steps:**
1. Confirm automated Zoom reminder is scheduled
2. Send manual Outlook backup to all registrants
3. Include direct Zoom link
4. Brief, energetic message
5. Monitor for any email bouncebacks

---

### **TASK 3.2: Send "15 Minutes Before" Reminder**

**Timeline:** 15 minutes before event start (E-Day, 15 mins before)  
**Automation Type:** Automated Zoom + SMS if available  
**Outlook Category:** VBI Panel - Live Event

**Email Template:** [See Template #9](#template-9-fifteen-minute-reminder)

**Action Steps:**
1. Send urgent "We're starting now!" message
2. Include only the Zoom link (no other distractions)
3. Keep subject line short and urgent
4. If SMS capability exists, send text message too

---

### **TASK 3.3: Backstage & Technical Setup**

**Timeline:** 20 minutes before event start (E-Day, 20 mins before)  
**Automation Type:** Manual  
**Outlook Category:** VBI Panel - Live Event

**Host Checklist:**

**Technical Setup (20 minutes before):**
- [ ] Host logs into Zoom webinar
- [ ] Verify audio and video quality
- [ ] Test screen sharing capability
- [ ] Check panelist names and titles in Zoom
- [ ] Confirm sponsor slide is ready
- [ ] Test Q&A and chat functions
- [ ] Start Zoom recording
- [ ] Enable live stream if applicable (LinkedIn/Facebook)

**Panelist Welcome (15 minutes before):**
- [ ] Admit panelists as they join
- [ ] Welcome each panelist personally
- [ ] Audio/video check for each panelist
- [ ] Confirm panelist can see screen share
- [ ] Brief reminders:
  - Mute when not speaking
  - Look at camera when speaking
  - Keep answers concise (2-3 minutes)
  - Signal if technical issues arise
- [ ] Review question order and timing
- [ ] Confirm pronunciation of names
- [ ] Share positive energy and gratitude

**Final Countdown (5 minutes before):**
- [ ] Remind panelists of start time
- [ ] Request they stay muted until introduced
- [ ] Open registration to attendees
- [ ] Monitor attendee entry
- [ ] Welcome early attendees via chat
- [ ] Play intro music or display welcome slide

**Live Event Protocol (During):**
- [ ] Start recording
- [ ] Welcome and housekeeping (3 mins)
- [ ] Introduce panelists (5 mins)
- [ ] Panel discussion (40 mins)
- [ ] Q&A session (10 mins)
- [ ] Sponsor message and free offer (2 mins)
- [ ] Closing and thank you (2 mins)
- [ ] End recording
- [ ] Save recording to cloud

---

### **TASK 3.4: During Event - Chat Management**

**Timeline:** Throughout event  
**Automation Type:** Manual  
**Outlook Category:** VBI Panel - Live Event

**Chat Messages to Post:**

**At Start:**
```
Welcome! We're thrilled to have you with us! Please feel free to share any questions in the Q&A panel. We hope this discussion offers valuable insights and an engaging experience. Thank you for being part of this!
```

**Midway Through:**
```
Schedule a complimentary meeting with VBI at your convenience:
https://www.veterinarybusinessinstitute.com/msm/
```

**Before Q&A:**
```
We'll be opening for Q&A shortly. Please submit your questions via the Q&A panel now!
```

**At Closing:**
```
Thank you for attending! You'll receive a recording link via email within 24 hours. Don't forget to book your free Marketing Strategy Session!
```

---

## **PHASE 4: POST-PANEL FOLLOW-UP (E+1 to E+7 Days)**

### **TASK 4.1: Internal Debrief & Data Collection**

**Timeline:** Within 2 hours after event (E-Day)  
**Automation Type:** Manual  
**Outlook Category:** VBI Panel - Post-Event

**Action Steps:**
1. **Download Reports:**
   - Zoom registration report (CSV)
   - Zoom attendee report (CSV)
   - Q&A log
   - Polling results (if used)
   - Chat transcript

2. **Save Recording:**
   - Download Zoom recording
   - Upload to Google Drive
   - Create shareable link
   - Test link access

3. **Compile Assets:**
   - Screenshot key moments
   - Save final slide deck
   - Export any live polling data
   - Save panelist contact list

4. **Create Lead Report:**
   - Total registrations
   - Total attendees
   - Attendance rate
   - Engagement metrics (Q&A, chat activity)
   - Registrations by panelist (tracking links)
   - Top questions asked
   - Sponsor offer interest

5. **Internal Debrief Notes:**
   - What went well
   - Technical issues encountered
   - Panelist performance notes
   - Audience engagement observations
   - Ideas for improvement

---

### **TASK 4.2: Send Panelist Thank You**

**Timeline:** Next morning after event (E+1, morning)  
**Automation Type:** Scheduled send  
**Outlook Category:** VBI Panel - Thank You

**Email Template:** [See Template #10](#template-10-panelist-thank-you)

**Action Steps:**
1. Send personalized thank you to each panelist
2. Include recording link
3. Provide registration stats (if promised)
4. Attach attendee list (if promised based on performance)
5. Request permission to use recording clips
6. Invite them to future events
7. CC manager and team lead

**Determine List Sharing:**
- If panelist generated 10+ registrations → Full registration list
- If panelist generated 25+ registrations → Full list + podcast invitation
- If panelist generated 50+ registrations → Long-term partnership discussion

---

### **TASK 4.3: Send Attendee Thank You & Recording**

**Timeline:** Next morning after event (E+1, morning)  
**Automation Type:** Automated sequence  
**Outlook Category:** VBI Panel - Recording Delivery

**Email Template:** [See Template #11](#template-11-attendee-thank-you--recording)

**Segment Audiences:**

**Email A - For Attendees:**
- Subject: Here's Your Recording: `[Event_Title]`
- Thank them for attending
- Provide recording link
- Highlight key takeaways
- Include sponsor offer
- Request feedback or testimonial
- Invite to next event

**Email B - For No-Shows:**
- Subject: Sorry We Missed You at `[Event_Title]`
- Express that they were missed
- Provide recording link
- Encourage them to watch
- Include sponsor offer
- Invite to next event

**Templates:** [See Template #11A and #11B](#template-11a--11b-attendee-follow-up)

---

### **TASK 4.4: BDR Lead Handoff**

**Timeline:** Same day as attendee email (E+1)  
**Automation Type:** Manual  
**Outlook Category:** VBI Panel - Lead Distribution

**Email Template:** [See Template #12](#template-12-bdr-lead-report)

**Action Steps:**
1. Compile complete lead report
2. Segment leads by engagement level:
   - Hot: Attended + asked questions + clicked sponsor link
   - Warm: Attended + engaged in chat
   - Cool: Registered but no-show
   - Cold: Registered only

3. Provide BDR team with:
   - Full attendee list with engagement scores
   - Registration report
   - Q&A log (shows interest areas)
   - Chat transcript
   - Recording link
   - Slide deck
   - Sponsor offer details

4. Include BDR talking points:
   - "Requesting recording" → Send recording link + offer consult
   - "Asking about CE credit" → Explain if available or not
   - Follow-up timeline: Within 48 hours of report

5. Send to:
   - BDR team lead
   - Individual BDRs assigned territories
   - CC: Manager and sales director

---

### **TASK 4.5: Social Media Recap**

**Timeline:** 1-2 days after event (E+1 or E+2)  
**Automation Type:** Scheduled posts  
**Outlook Category:** VBI Panel - Post-Event Marketing

**Content to Create:**
1. **Highlight Reel:**
   - 60-second video clip of best moments
   - Post to LinkedIn, Facebook, Instagram, YouTube

2. **Quote Graphics:**
   - Create 3-5 quote graphics from panelists
   - Schedule over next 2 weeks

3. **Testimonial Posts:**
   - Request and share attendee testimonials
   - Tag panelists when sharing their insights

4. **Thank You Post:**
   - Thank panelists publicly
   - Thank attendees for participation
   - Share key statistics (attendees, engagement)

5. **Recording Promotion:**
   - Promote recording availability
   - Create "teaser" clips for social
   - Use as lead magnet for email list growth

---

### **TASK 4.6: Send Final CTA Email (Sponsor Offer Push)**

**Timeline:** 5-7 days after event (E+5 to E+7)  
**Automation Type:** Automated sequence  
**Outlook Category:** VBI Panel - Final CTA

**Email Template:** [See Template #13](#template-13-final-sponsor-offer-push)

**Action Steps:**
1. Create urgency with limited-time offer language
2. Highlight sponsor offer value
3. Include recording link again (for those who haven't watched)
4. Use social proof (attendee numbers, testimonials)
5. Clear, prominent CTA button
6. Set expiration date for offer (if applicable)

**Segment Audiences:**
- Attendees who clicked sponsor link → Personalized high-interest email
- Attendees who haven't clicked → Benefits-focused email
- No-shows → "Last chance to access content" angle

---

### **TASK 4.7: Long-Term Nurture Sequence**

**Timeline:** 2-4 weeks after event (E+14 to E+30)  
**Automation Type:** Automated drip sequence  
**Outlook Category:** VBI Panel - Nurture

**Sequence Plan:**

**Email 1 (E+14):** Related content/resources
- Share blog post or resource related to panel topic
- Soft CTA to sponsor offer
- Invite to join mailing list if not already subscribed

**Email 2 (E+21):** Next event invitation
- Announce next panel or webinar
- Early bird registration
- VIP invite language

**Email 3 (E+30):** Value-add content
- Industry insights newsletter
- Podcast episode recommendation
- Case study or success story

---

## **OUTLOOK AUTOMATION SETUP**

### **Option 1: Outlook Rules for Email Automation**

**Setting Up Rules in Outlook:**

1. **Go to Rules:**
   - File → Manage Rules & Alerts → New Rule

2. **Create Rule Templates for Each Phase:**

**Example: Auto-CC Manager on Panelist Emails**
- Condition: Subject contains "VBI Panel"
- Action: CC faith@ekwa.com
- Exception: Unless from faith@ekwa.com

**Example: Auto-Categorize Registration Confirmations**
- Condition: From "no-reply@zoom.us" AND Subject contains webinar ID
- Action: Move to folder "VBI Events" AND Categorize as "VBI Panel - Registrations"

**Example: Auto-Forward Panelist Confirmations**
- Condition: Body contains "confirmed participation"
- Action: Forward to reshani@thrivingdentistpartnerships.com
- Action: Flag for follow-up

3. **Create Quick Steps for Common Tasks:**

**Quick Step: "Send to Panelist"**
- CC: faith@ekwa.com, reshani@thrivingdentistpartnerships.com
- Category: VBI Panel - Panelist Comms
- Signature: Your VBI signature

**Quick Step: "BDR Handoff"**
- To: BDR team distribution list
- CC: Manager
- Attach: Lead report template
- Subject: [Lead Report - `[Event_Title]` on `[Event_Date]`]
- Category: VBI Panel - Lead Distribution

---

### **Option 2: Using Outlook Calendar for Timeline Management**

**Create Calendar Template:**

1. **Create "VBI Panel Template" Calendar:**
   - File → New → Calendar → Name: "VBI Panel Template"

2. **Add All Tasks as Calendar Appointments:**
   - Each task becomes a calendar appointment
   - Set reminders for each task
   - Include checklist in appointment body
   - Link to email templates

3. **When New Panel Confirmed:**
   - Duplicate template calendar
   - Rename with event name
   - Adjust all dates based on event date
   - Share calendar with team

**Sample Calendar Structure:**
```
E-30: Send panelist invitations
E-25: Follow up on invitations
E-21: Finalize panelist roster
E-14: Create all marketing assets
E-10: Send promotional packages to panelists
E-10: Launch public promotion
E-7: Attendee reminder #1
E-5: Social media push
E-3: Last chance promotion
E-1: Final panelist check-in
E-1: Final attendee reminder
E-Day -1hr: One hour reminder
E-Day -15min: Fifteen minute reminder
E-Day: Host event
E+1: Send thank yous and recordings
E+1: BDR lead handoff
E+5: Final CTA email
E+7: Close promotion
E+14: Begin nurture sequence
```

---

### **Option 3: Using Outlook Tasks & To-Do**

**Create Master Task List:**

1. **Create "VBI Panel Master Checklist":**
   - Open Outlook Tasks
   - Create new task list: "VBI Panel Template"
   - Add all tasks from this guide
   - Set relative due dates (E-30, E-14, etc.)

2. **For Each New Panel:**
   - Duplicate master task list
   - Rename with event name
   - Update all due dates
   - Assign tasks to team members if applicable

3. **Set Up Reminders:**
   - Each task should have reminder set
   - High-priority tasks: 2 reminders (1 week before, 1 day before)
   - Regular tasks: 1 reminder (1 day before)

---

### **Option 4: Outlook with Yahoo Mail Integration**

**Since You're Using Yahoo Mail with Outlook:**

1. **Ensure Proper Sync:**
   - File → Account Settings → Email → Verify Yahoo account is syncing
   - Check sync frequency (recommend: every 15 minutes)
   - Enable "Send/Receive on Outlook startup"

2. **Set Default Account:**
   - If sending from Yahoo through Outlook
   - File → Options → Mail → Send messages → Select Yahoo as default

3. **Create Signatures for Yahoo Account:**
   - File → Options → Mail → Signatures
   - Create "VBI Panel Signature" for Yahoo account
   - Include:
     - Your name and title
     - VBI logo
     - Contact information
     - VBI website link

4. **Test Email Delivery:**
   - Send test emails to yourself
   - Verify formatting appears correctly
   - Check links are clickable
   - Confirm images display properly

**Common Issues & Solutions:**

**Issue:** Emails sent from Outlook appear as "sent from Outlook" in recipient's inbox  
**Solution:** Send test, then adjust Yahoo settings to allow Outlook access

**Issue:** Images don't display  
**Solution:** Use hosted images (Google Drive public links or Imgur) rather than embedded

**Issue:** Formatting breaks in Yahoo display  
**Solution:** Use simple HTML formatting, avoid complex tables

---

### **Option 5: Scheduled Sending in Outlook**

**How to Schedule Emails in Outlook:**

1. **Write Email**

2. **Set Delayed Delivery:**
   - Options tab → Delay Delivery
   - Check "Do not deliver before"
   - Set date and time
   - Click Close
   - Click Send (email will sit in Outbox until scheduled time)

3. **Important Notes:**
   - Outlook must be open for scheduled send to work
   - If computer is off, email sends when Outlook next opens
   - Consider using Outlook.com (web version) for true cloud-based scheduling

**Alternative for Cloud Scheduling:**
- Use Outlook.com web interface
- Compose email
- Click arrow next to Send
- Select "Send later"
- Choose date and time
- Email will send even if computer is off

---

### **Option 6: Email Template Storage in Outlook**

**How to Save Email Templates:**

1. **Create Email**

2. **Save as Template:**
   - File → Save As
   - Save as type: Outlook Template (*.oft)
   - Name file clearly (e.g., "VBI_Panel_Invitation_Template.oft")
   - Save to dedicated folder

3. **To Use Template:**
   - Home → New Items → More Items → Choose Form
   - Look In: User Templates in File System
   - Select template
   - Customize variables
   - Send

**Template Organization:**
- Create folder: "VBI Panel Email Templates"
- Subfolders by phase (Recruitment, Promotion, Follow-Up)
- Name templates clearly with numbers (01_Invitation, 02_Confirmation, etc.)

---

## **EMAIL TEMPLATES LIBRARY**

### **Template #1: Initial Panelist Invitation**

```
SUBJECT: Invitation to Share Your Expertise at VBI's [Event_Topic_Category] Panel

Hi [Panelist_First_Name],

I hope you are doing great! I'm Chaluka Harsha, and I serve as the Strategic Events and Partnerships Coordinator for the Veterinary Business Institute. It's a pleasure to connect with you!

I've been following your remarkable work in the veterinary community and believe you would provide tremendous value to our audience through a joint online event.

### A Quick Look at What We Do

At the Veterinary Business Podcast, we cover a wide range of topics, including business strategies, marketing trends, financial management, client relations, AI, law, and more. Our main goal is to provide veterinarians, practice owners, and office managers in the USA and Canada with the knowledge and insights they need to manage their practices effectively.

### Our Podcast Co-Host Panel Includes:
- Naren Arurajah - Founder of Veterinary Business Institute & CEO of Ekwa Marketing
- Dr. Joel Parker - Veterinarian & Co-Founder of Parke Business Systems
- Dr. Mark Roozen - Veterinarian & International Business Advisor
- Dr. Amanda Landis-Hanna - Veterinarian & Chief Veterinary Officer of One Health Group

👉 For more information, please visit our website: https://www.veterinarybusinessinstitute.com/

On behalf of the Team, I'd love to extend a warm invitation for you to join us as a **featured speaker** at our upcoming Expert Panel Webinar Series: **[Event_Topic_Category]**.

This webinar is designed to help veterinary professionals [brief benefit statement]. The webinar will be in a panel format, featuring you as an expert alongside other leaders in the field.

### Event Snapshot:
**Date:** [Event_Date]
**Time:** [Event_Time_EST]
**Duration:** [Event_Duration]
**Topic:** [Event_Title]

**Key discussion points:**
• [Key_Discussion_Point_1]
• [Key_Discussion_Point_2]
• [Key_Discussion_Point_3]
• [Key_Discussion_Point_4]
• [Key_Discussion_Point_5]

**Number of Speakers:** 2-3 expert panelists
**Format:** Panel Discussion with Interactive Q&A Session
**Platform:** [Event_Platform]
**Webinar Type:** Live Webinar (also streaming on our LinkedIn and Facebook pages)
**Event Registration:** Complimentary

### What We're Looking For

We believe your voice and expertise would resonate strongly with our global audience. You've been shortlisted based on your impactful work, and we're confident you'd add tremendous value to the conversation.

### What's In It for You

**Visibility:** Showcase your expertise to a broad audience of veterinarians and practice owners eager to learn from industry leaders.

**Networking Opportunities:** Connect with fellow panelists and engage with a community of veterinary professionals, fostering relationships that can lead to future collaborations.

**Content Contribution:** Share your knowledge and insights, establishing yourself as a thought leader within the veterinary community and potentially leading to future speaking opportunities.

**Promotional Exposure:** Your involvement will be highlighted across our promotional channels, including our website, social media platforms, and podcast episodes.

**Further Opportunities:** Panelists who actively contribute and are recognized as experts by veterinary practice owners will be invited to future webinars, including solo Lunch and Learns, panels, or quarterly Veterinary Business Institute Summits.

**Attract Potential Clients:** This platform will help you showcase your expertise, enhance your visibility, and ultimately attract clients seeking your solutions.

### Here's a quick summary of how the partnership works:

• No financial commitment is required, as the event is fully sponsored and free to attend.
• Promotional materials will be provided to share with your audience.
• Your only commitment would be to assist in promoting the event and encouraging sign-ups to help make it successful. Any effort to boost registrations would be deeply appreciated.
• The event will be recorded for later viewing.
• Additionally, **if you secure more than 10 registrations, you will receive the full registration list** after the event, and **if you secure more than 25 registrations, you will have the chance to feature in our podcast** and be considered a long-term partner for future collaborations as a token of our appreciation.

A host from our team will be there to support you throughout the session. At the end, the host will also display a slide featuring a free giveaway from our platinum sponsor, [Sponsor_Name].

We're incredibly excited about this event and would be honored to have you on board and to learn from your expertise. Looking forward to hearing from you!

Best regards,

Chaluka Harsha
Strategic Events and Partnerships Coordinator
Veterinary Business Institute
[Coordinator_Email]
https://www.veterinarybusinessinstitute.com/
```

---

### **Template #2: Confirmation & Onboarding**

```
SUBJECT: Thrilled to Have You on Our Expert Panel Series!

Hi [Panelist_First_Name],

Thank you for confirming your participation in our expert panel on [Event_Date]! We're excited to have you join us.

Here's a quick overview of how the panel will work:

• The session will follow a Q&A format, and I'll handle all back-end operations, including marketing, promotions, and email campaigns.

• We'll create promotional emails and graphics for you to share on social media to help drive registrations.

• As a valued expert, you may also be invited to participate in future events.

• We will draft the discussion questions and share them with you in advance. If you have any preferences or suggestions, we're happy to incorporate them.

### Next Steps

To finalize our promotional materials and social media content, could you please share the following details at your earliest convenience?

1. Full Name
2. Contact Number  
3. Current Position and Organization
4. Professional Headshot (high resolution image)
5. Email Address (for confirmation)
6. Short Bio (3-4 sentences highlighting your expertise)
7. LinkedIn Profile URL (optional)

Your insights will bring tremendous value to our audience, and we're looking forward to an engaging discussion!

I've copied [Manager_Email] and [Team_Lead_Email] from our team, and they'll be looped in on our communications as we prepare for the event.

Please let me know if you have any questions or need any additional details.

Best regards,

Chaluka Harsha
Strategic Events and Partnerships Coordinator
Veterinary Business Institute
[Coordinator_Email]
https://www.veterinarybusinessinstitute.com/
```

---

### **Template #3: Panelist Promotional Package**

```
SUBJECT: Promotional Materials for Upcoming Panel - [Event_Title]

Hi [Panelist_First_Name],

We've developed the promotional material and updated the Zoom landing page! Everything is ready for you to start promoting.

### YOUR UNIQUE PANELIST JOIN LINK

[Panelist_Unique_Join_Link]

You may have already received an invite from **Podcast & Events** through "no-reply@zoom.us."

Please use this link to join the webinar on the day of the event. For your convenience, I've added it above.

**IMPORTANT:** Please bookmark this link or save this email for easy access on event day.

### YOUR UNIQUE REGISTRATION LINK

This is your personalized registration link for tracking sign-ups from your audience:

[Panelist_Unique_Registration_Link]

Every registration through this link will be tracked to your account for the partnership rewards we discussed (10+ registrations = full attendee list; 25+ registrations = podcast feature opportunity).

### PROMOTIONAL MATERIALS PACKAGE

To help spread the word, we've prepared a complete set of promotional materials:

📱 **Social Media Graphics**
All graphics for LinkedIn, Facebook, and Instagram are accessible here:
[Graphics_Folder_Link]

Includes:
• Announcement graphics (3 versions)
• Countdown graphics
• Story/Reel templates
• Event day graphics
• Your individual "Meet the Panelist" spotlight graphic

📝 **Pre-Written Captions & Posts**
Ready-to-use social media captions:
[Social_Media_Caption_Document]

✉️ **Email Templates**
Draft emails for your mailing list:
[Email_Templates_Folder]

### YOUR PANEL QUESTIONS

I've drafted 5 questions specifically for you in preparation for the panel discussion:

[Questions_Document_Link]

**Please review these questions and:**
• Confirm they align with your expertise
• Suggest any adjustments or alternative questions
• Reply to this email by [Date, typically E-7] with your approval or suggested changes

If you'd like to adjust or add questions, please feel free to share your thoughts. These questions are meant to guide the conversation and showcase your unique expertise.

### PROMOTIONAL TIMELINE

Here's a suggested timeline for promoting to your network:

**Today - E-10:** Initial announcement post on LinkedIn/Facebook
**E-7:** Share "Meet the Panelists" spotlight post  
**E-5:** Personal email to your mailing list
**E-3:** Reminder post with registration link
**E-1:** "Tomorrow!" countdown post
**E-Day:** "Going live soon!" post 2 hours before

### WHAT WE NEED FROM YOU

Your commitment to help promote the event will ensure its success and maximize the value for your participation:

✅ Share the event on your social media channels (LinkedIn, Facebook, Instagram)
✅ Send an email to your mailing list (we've drafted templates for you)
✅ Encourage colleagues and professional network to register
✅ Use the unique registration link we provided for tracking

### TECHNICAL DETAILS

**Event Date:** [Event_Date]
**Event Time:** [Event_Time_EST]
**Your Role:** Expert Panelist
**Format:** Panel discussion with Q&A
**Platform:** Zoom Webinar
**Duration:** 60 minutes
**Audience:** Veterinary practice owners, managers, veterinarians

**Please plan to:**
• Join 10 minutes early (at [Time - 10 mins]) for tech check
• Use a quiet space with good lighting
• Test your audio and video beforehand
• Have a backup internet connection if possible

### SUPPORT

If you need any assistance with promotion, have questions about the content, or need technical support, I'm here to help!

Let me know if you need anything else. I'm here to ensure this is a smooth and successful experience for you!

Looking forward to an amazing panel discussion with you!

Best regards,

Chaluka Harsha
Strategic Events and Partnerships Coordinator
Veterinary Business Institute
[Coordinator_Email]
https://www.veterinarybusinessinstitute.com/

CC: [Manager_Email], [Team_Lead_Email]
```

---

### **Template #4: Attendee Reminder #1**

```
SUBJECT: See You Next Week! [Event_Title]

Hi [First_Name],

Just a friendly reminder that you're registered for our upcoming expert panel:

**[Event_Title]**

📅 **Date:** [Event_Date]
🕖 **Time:** [Event_Time_EST]
💻 **Platform:** Zoom (Live Webinar)

### What You'll Learn

Our expert panelists will discuss:
• [Key_Discussion_Point_1]
• [Key_Discussion_Point_2]
• [Key_Discussion_Point_3]
• [Key_Discussion_Point_4]
• [Key_Discussion_Point_5]

### Meet Your Expert Panelists

[Brief 1-line intro for each panelist with their headshot if possible]

### Add to Your Calendar

Don't forget! Click here to add this event to your calendar:
[Add to Calendar Link]

### Bonus: Free [Sponsor_Offer_Name]

As a special bonus for attendees, [Sponsor_Name] is offering a complimentary [Sponsor_Offer_Name]. We'll share details during the event!

**Your Zoom Link:**
[Individual Zoom Registration Link]

We're excited to see you there! Feel free to invite colleagues who might benefit from this discussion.

See you next week!

Best regards,

The Veterinary Business Institute Team
https://www.veterinarybusinessinstitute.com/

P.S. If you can no longer attend, please let us know so we can send you the recording afterward.
```

---

### **Template #5A: Last Chance - Non-Registrants**

```
SUBJECT: Last Chance to Register: [Event_Title] - Tomorrow!

Hi [First_Name],

This is your final reminder! Our expert panel discussion is happening tomorrow, and you don't want to miss it.

**[Event_Title]**

📅 **Tomorrow:** [Event_Date]
🕖 **Time:** [Event_Time_EST]
🎟️ **Cost:** FREE
💻 **Platform:** Zoom

### Why You Should Attend

[Brief compelling reason related to topic - 2-3 sentences]

### Featured Expert Panelists

[Quick list of panelist names and credentials]

### Key Topics We'll Cover

• [Key_Discussion_Point_1]
• [Key_Discussion_Point_2]
• [Key_Discussion_Point_3]

### PLUS: Free [Sponsor_Offer_Name]

All attendees will receive information on how to claim a complimentary [Sponsor_Offer_Name] from [Sponsor_Name] (valued at $[Value]).

⏰ **Last Chance to Register:**

[Event_Registration_Page_Link]

Registration closes in 24 hours!

Don't miss this opportunity to learn from industry experts and connect with fellow veterinary professionals.

See you tomorrow!

Best regards,

The Veterinary Business Institute Team
https://www.veterinarybusinessinstitute.com/
```

---

### **Template #5B: Last Chance - Current Registrants**

```
SUBJECT: See You in 3 Days! [Event_Title]

Hi [First_Name],

Just 3 days until our expert panel discussion! We're excited to see you there.

**[Event_Title]**

📅 **Date:** [Event_Date]
🕖 **Time:** [Event_Time_EST]
💻 **Platform:** Zoom

### Quick Reminder of What to Expect

Our expert panelists will dive deep into:
• [Key_Discussion_Point_1]
• [Key_Discussion_Point_2]
• [Key_Discussion_Point_3]

### Prepare Your Questions!

We'll have a live Q&A session where you can ask our panelists anything related to [Event_Topic_Category]. Start thinking about what you'd like to know!

### Add to Your Calendar

If you haven't already, add this to your calendar so you don't forget:
[Add to Calendar Link]

### Your Zoom Link

[Individual Zoom Registration Link]

### Know Someone Who'd Benefit?

Feel free to forward this email to colleagues or friends in the veterinary field. They can register here:
[Event_Registration_Page_Link]

### Don't Forget!

All attendees will learn how to claim a complimentary [Sponsor_Offer_Name] from [Sponsor_Name] during the event.

See you in 3 days!

Best regards,

The Veterinary Business Institute Team
https://www.veterinarybusinessinstitute.com/
```

---

### **Template #6: Final Panelist Check-In**

```
SUBJECT: Final Details for Tomorrow's Panel - [Event_Title]

Hi [Panelist_First_Name],

Just a quick reminder that our panel, **[Event_Title]**, is tomorrow!

**[Event_Date] at [Event_Time_EST]**

We're incredibly excited to have you share your insights and expertise with our audience.

### YOUR ZOOM PANELIST LINK

Please use this link to join tomorrow:

[Panelist_Unique_Join_Link]

**IMPORTANT:** 
• Please plan to join 10 minutes early at [Time - 10 mins] EST for a final tech check
• Make sure you're in a quiet space with good lighting
• Test your audio and video before joining

### FINAL REMINDERS

✅ **Questions:** You should have received and approved your 5 questions. If you need to review them again: [Questions_Document_Link]

✅ **Format:** Panel discussion (40 mins) + Q&A (10 mins) + Sponsor message (2 mins)

✅ **Your Intro:** We'll introduce you using your bio. If you'd like to add anything last-minute, reply to this email before tomorrow.

✅ **Technical Setup:**
• Strong internet connection (wired if possible)
• Good lighting (face the light source)
• Quiet space with minimal background noise
• Professional background (or use Zoom virtual background)

✅ **During the Panel:**
• Keep answers concise (2-3 minutes)
• Mute when not speaking
• Signal the host if you have technical issues

### DAY-OF CONTACT

If you have any issues joining or need immediate assistance tomorrow, contact:

[Host_Name] (Event Host)
Email: [Manager_Email]
Phone: [Host_Phone_Number]

### RECORDING & FOLLOW-UP

The session will be recorded and you'll receive:
• The recording link within 24 hours
• Attendee statistics
• Registration list (if you generated 10+ sign-ups via your unique link)

### THANK YOU!

We truly appreciate your commitment to sharing your expertise with the veterinary community. Your insights will be invaluable to our audience.

Looking forward to an amazing discussion tomorrow!

Best regards,

Chaluka Harsha
Strategic Events and Partnerships Coordinator
Veterinary Business Institute
[Coordinator_Email]
https://www.veterinarybusinessinstitute.com/

CC: [Manager_Email], [Team_Lead_Email]

P.S. Get a good night's rest and bring your A-game tomorrow! 🌟
```

---

### **Template #7: Final Attendee Reminder**

```
SUBJECT: Tomorrow! [Event_Title]

Hi [First_Name],

Tomorrow is the day! We're excited to see you at:

**[Event_Title]**

📅 **Tomorrow:** [Event_Date]
🕖 **Time:** [Event_Time_EST]
⏱️ **Duration:** 60 minutes
💻 **Platform:** Zoom (Live)

### Meet Your Expert Panelists

[Brief intro of each panelist with photo if possible]

### What You'll Learn

• [Key_Discussion_Point_1]
• [Key_Discussion_Point_2]
• [Key_Discussion_Point_3]
• [Key_Discussion_Point_4]
• [Key_Discussion_Point_5]

### Your Zoom Link

[Individual Zoom Registration Link]

📲 **Pro Tip:** Click the link 5 minutes early to ensure you don't miss the start!

### Prepare Your Questions

We'll have a live Q&A session. Think about what you'd like to ask our expert panelists!

### Bonus Offer

All attendees will learn how to claim a FREE [Sponsor_Offer_Name] from [Sponsor_Name]. Don't miss out!

### Add to Calendar

[Add to Calendar Link]

See you tomorrow!

Best regards,

The Veterinary Business Institute Team
https://www.veterinarybusinessinstitute.com/

P.S. Forward this to a colleague! They can still register: [Event_Registration_Page_Link]
```

---

### **Template #8: One Hour Reminder**

```
SUBJECT: Starting in 1 Hour! [Event_Title]

Hi [First_Name],

Our expert panel starts in just 1 HOUR!

**[Event_Title]**

🕖 **Time:** [Event_Time_EST] (in 1 hour)
💻 **Platform:** Zoom

### Join Here:

[Individual Zoom Registration Link]

We recommend joining 5 minutes early to get settled.

See you soon!

The Veterinary Business Institute Team
https://www.veterinarybusinessinstitute.com/
```

---

### **Template #9: Fifteen Minute Reminder**

```
SUBJECT: We're Starting NOW! Join [Event_Title]

Hi [First_Name],

We're starting in 15 minutes!

Click here to join now:
[Individual Zoom Registration Link]

See you in a moment!

The Veterinary Business Institute Team
```

---

### **Template #10: Panelist Thank You**

```
SUBJECT: Thank You for an Amazing Panel Discussion!

Hi [Panelist_First_Name],

Thank you so much for your outstanding contribution to yesterday's panel discussion! Your insights on [specific topic they discussed] were incredibly valuable to our audience.

### Event Highlights

We had fantastic engagement:
• **Total Registrations:** [Number]
• **Total Attendees:** [Number]
• **Attendance Rate:** [Percentage]%
• **Q&A Questions Submitted:** [Number]
• **Average Engagement Score:** [If tracked]

### Your Impact

Through your unique registration link, you generated **[Number] registrations**! 

[IF 10+ registrations]
As promised, I'm attaching the full registration list for your records.

[IF 25+ registrations]
Amazing work! You've generated 25+ registrations, which means you're invited to be featured on the Veterinary Business Podcast! I'll follow up separately with podcast scheduling details.

### Recording & Assets

Here's the recording link to share with your network:
[Event_Recording_Link]

All promotional assets and final materials are available here:
[Graphics_Folder_Link]

### Testimonials

Here are some audience comments about your insights:
[Include 2-3 positive comments from chat or Q&A]

### Future Opportunities

Based on the overwhelmingly positive response to your participation, we'd love to explore future collaboration opportunities:

• Feature expert interviews on the VBI Podcast
• Solo "Lunch & Learn" session on a topic of your choice
• Quarterly VBI Summit participation
• Long-term partnership as a regular expert contributor

Would you be interested in discussing these opportunities? I'd be happy to schedule a brief call to explore how we can continue working together.

### Request

We'd love to create short video clips from the recording to share on social media. Do we have your permission to:
☐ Create and share video clips featuring your segments
☐ Use screenshots for promotional materials
☐ Quote your insights in future marketing

Please reply with your approval or any restrictions.

### Thank You Again

Your expertise, professionalism, and engaging communication style made this event a tremendous success. The veterinary community is fortunate to have thought leaders like you sharing knowledge so generously.

Looking forward to staying connected!

Best regards,

Chaluka Harsha
Strategic Events and Partnerships Coordinator
Veterinary Business Institute
[Coordinator_Email]
https://www.veterinarybusinessinstitute.com/

CC: [Manager_Email], [Team_Lead_Email]

Attachments:
[IF APPLICABLE]
• Registration_List_[Event_Date].xlsx
• Event_Statistics_Report.pdf
```

---

### **Template #11A: Attendee Thank You & Recording**

```
SUBJECT: Here's Your Recording: [Event_Title]

Hi [First_Name],

Thank you for attending our expert panel yesterday! We hope you found the discussion valuable and walked away with actionable insights for your practice.

### Watch the Recording

Missed anything or want to watch again? Here's the full recording:

[Event_Recording_Link]

**Bonus:** Feel free to share this recording with colleagues who couldn't attend!

### Key Takeaways

Our expert panelists covered:
• [Key_Discussion_Point_1]
• [Key_Discussion_Point_2]
• [Key_Discussion_Point_3]

### Claim Your FREE [Sponsor_Offer_Name]

As promised, [Sponsor_Name] is offering all attendees a complimentary [Sponsor_Offer_Name].

**How to Claim:**
1. Visit: [Sponsor_Offer_Link]
2. Mention you attended the VBI panel
3. Schedule your free consultation

**This offer is available for a limited time**, so don't wait!

### Share Your Feedback

We'd love to hear your thoughts! Please take 2 minutes to share your feedback:
[Survey Link if applicable]

Your input helps us create even better content for the veterinary community.

### Connect with Our Panelists

Want to learn more from our expert panelists?

[Panelist 1]: [LinkedIn URL]
[Panelist 2]: [LinkedIn URL]
[Panelist 3]: [LinkedIn URL]

### Join Our Next Event

We're already planning our next expert panel! Want to be the first to know?

☐ Yes, add me to the VBI Events email list
☐ Yes, notify me about the next [Event_Topic_Category] event

Reply to this email with your preference or click here: [Mailing List Signup Link]

### Resources

Additional resources related to today's discussion:
• [Resource 1 link]
• [Resource 2 link]
• [Blog post or article link]

Thank you again for being part of our community!

Best regards,

The Veterinary Business Institute Team
https://www.veterinarybusinessinstitute.com/

P.S. Know someone who'd benefit from this recording? Forward this email!
```

---

### **Template #11B: No-Show Follow-Up**

```
SUBJECT: Sorry We Missed You! [Event_Title] Recording Inside

Hi [First_Name],

We noticed you couldn't make it to yesterday's expert panel discussion. We missed you!

The good news? You can still access all the insights and expertise from the session.

### Watch the Full Recording

[Event_Recording_Link]

### What You Missed

Our expert panelists shared incredible insights on:
• [Key_Discussion_Point_1]
• [Key_Discussion_Point_2]
• [Key_Discussion_Point_3]

### Featured Expert Panelists

[Panelist 1 name & credential]
[Panelist 2 name & credential]
[Panelist 3 name & credential]

### Bonus: Your FREE [Sponsor_Offer_Name]

Even though you couldn't attend live, you're still eligible to claim your complimentary [Sponsor_Offer_Name] from [Sponsor_Name]!

**Claim Your Offer:**
Visit: [Sponsor_Offer_Link]
Mention: VBI Panel Registrant

**Limited Time Offer** - Claim within the next 7 days!

### Don't Miss the Next One

We'd love to see you at our next event! Be the first to know when we schedule our next expert panel:

[Mailing List Signup Link]

### Connect with Our Panelists

[Panelist 1]: [LinkedIn URL]
[Panelist 2]: [LinkedIn URL]
[Panelist 3]: [LinkedIn URL]

We hope this recording provides value to you and your practice!

Best regards,

The Veterinary Business Institute Team
https://www.veterinarybusinessinstitute.com/

P.S. Forward this recording to colleagues who might benefit!
```

---

### **Template #12: BDR Lead Report**

```
SUBJECT: [Lead Report - [Event_Title] on [Event_Date]]

Hi Team,

Attached is the complete lead report and key details from the **[Event_Title]** held on [Event_Date], from [Event_Time_EST].

### EVENT OVERVIEW

**Event Details:**
• Title: [Event_Title]
• Date: [Event_Date]
• Time: [Event_Time_EST]
• Platform: Zoom Webinar
• Event Type: Live Expert Panel Discussion

**Documentation:**
• Zoom Registrant Report: [Link to Google Sheet or Attachment]
• Zoom Attendee Report: [Link to Google Sheet or Attachment]
• Q&A Log: [Attachment]
• Chat Transcript: [Attachment]
• Recording Link: [Event_Recording_Link]
• Slide Deck: [Slide_Deck_Link]

### EVENT STATISTICS

**Registration & Attendance:**
• Total Registrations: [Number]
• Total Attendees: [Number]
• Attendance Rate: [Percentage]%
• Average Attendance Duration: [Minutes]

**Engagement Metrics:**
• Questions Asked: [Number]
• Chat Messages: [Number]
• Poll Responses: [Number if applicable]
• Sponsor Link Clicks: [Number if tracked]

### FEATURED EXPERT PANELISTS

[Panelist 1 Name] - [Title, Organization]
[Panelist 2 Name] - [Title, Organization]
[Panelist 3 Name] - [Title, Organization]

### KEY WEBINAR DISCUSSION POINTS

• [Key_Discussion_Point_1]
• [Key_Discussion_Point_2]
• [Key_Discussion_Point_3]
• [Key_Discussion_Point_4]
• [Key_Discussion_Point_5]

### LEAD SEGMENTATION

I've segmented the leads by engagement level:

**🔥 HOT LEADS ([Number]):**
• Attended live + asked questions + clicked sponsor link
• Action: Priority follow-up within 24-48 hours
• [List of names or link to filtered spreadsheet]

**🌡️ WARM LEADS ([Number]):**
• Attended live + engaged in chat OR asked questions
• Action: Follow-up within 3-5 days
• [List of names or link to filtered spreadsheet]

**❄️ COOL LEADS ([Number]):**
• Registered but did not attend (no-shows)
• Action: Send recording + gentle follow-up within 5-7 days
• [List of names or link to filtered spreadsheet]

**📋 COLD LEADS ([Number]):**
• Registered only, minimal engagement indicators
• Action: Add to nurture sequence
• [List of names or link to filtered spreadsheet]

### SPONSOR OFFER DETAILS

**Offer:** FREE [Sponsor_Offer_Name]
**Provider:** [Sponsor_Name]
**Link:** [Sponsor_Offer_Link]
**Value:** $[Value] (if applicable)

**How to Position:**
• "As a VBI panel attendee, you're eligible for a complimentary [Sponsor_Offer_Name]"
• "During the panel, we mentioned our partner [Sponsor_Name] is offering..."
• Direct them to [Sponsor_Offer_Link]

### POTENTIAL FOLLOW-UP QUESTIONS FROM LEADS

Based on past events, expect these common inquiries:

**"Can I get the recording?"**
✅ Response: Yes! Here's the link: [Event_Recording_Link]
💡 Upsell: "Would you also like to schedule a consultation to discuss how these strategies apply to your practice?"

**"Is there CE credit for this?"**
✅ Response: [If Yes: Details] [If No: "This session was educational but did not offer CE credit. However, we do offer CE credit for [other programs]. Would you like more information?"]

**"Can you send me the slides?"**
✅ Response: The slide deck is available here: [Slide_Deck_Link]
💡 Upsell: "I noticed you were interested in [specific topic]. Would you like to discuss how we can help implement these strategies at your practice?"

### TOP QUESTIONS ASKED (HIGH INTENT SIGNALS)

These attendees asked questions indicating strong interest:

1. [Attendee Name] asked: "[Question]" → Follow up on: [Specific service/topic]
2. [Attendee Name] asked: "[Question]" → Follow up on: [Specific service/topic]
3. [Attendee Name] asked: "[Question]" → Follow up on: [Specific service/topic]

### BDR ACTION ITEMS

**Immediate (24-48 hours):**
☐ Follow up with all HOT leads
☐ Send personalized emails referencing their specific questions
☐ Offer to schedule consultation calls
☐ Track response rates in CRM

**Short-term (3-7 days):**
☐ Follow up with WARM leads
☐ Send recording to all no-shows with personalized note
☐ Begin email nurture sequence for COOL leads

**Ongoing:**
☐ Monitor sponsor offer redemptions
☐ Track consultation bookings from this event
☐ Report conversion metrics weekly

### SUPPORTING MATERIALS

All event materials available here:
[Link to Google Drive Folder containing:]
• Panelist bios
• Event graphics
• Q&A log
• Chat transcript
• Slide deck
• Recording
• Registration reports

### FOLLOW-UP TIMELINE

**Day 1-2:** Hot leads (attended + high engagement)
**Day 3-5:** Warm leads (attended + moderate engagement)
**Day 5-7:** Cool leads (no-shows)
**Week 2+:** Cold leads (nurture sequence)

### CONTACT FOR QUESTIONS

For any additional inquiries or clarifications:

Chaluka Harsha
Strategic Events and Partnerships Coordinator
Email: [Coordinator_Email]
Slack: Chaluka Harsha

Thank you, and happy converting!

Best regards,

Chaluka Harsha
Strategic Events and Partnerships Coordinator
Veterinary Business Institute

---

**Attachments:**
• Zoom_Registration_Report_[Event_Date].csv
• Zoom_Attendee_Report_[Event_Date].csv
• Lead_Segmentation_[Event_Date].xlsx
• QA_Log_[Event_Date].pdf
• Chat_Transcript_[Event_Date].txt
```

---

### **Template #13: Final Sponsor Offer Push**

```
SUBJECT: Final Reminder: Claim Your FREE [Sponsor_Offer_Name]

Hi [First_Name],

This is your final reminder to claim the exclusive offer from our recent expert panel!

### Your FREE [Sponsor_Offer_Name] is Waiting

As an attendee of **[Event_Title]**, you're eligible to receive a complimentary [Sponsor_Offer_Name] from [Sponsor_Name].

**What You'll Get:**
[Brief bullet points describing the offer value]

**Valued at $[Value]** - Yours FREE as a VBI panel participant!

### ⏰ Claim Before [Expiration Date]

This exclusive offer expires on [Date]. Don't miss out!

**Claim Your Offer Now:**
👉 [Sponsor_Offer_Link]

### Haven't Watched the Recording Yet?

Revisit the insights from our expert panelists:
[Event_Recording_Link]

### Why Veterinary Practice Owners Love [Sponsor_Name]

[Include 1-2 testimonials or brief success stories]

### Questions?

Contact [Sponsor_Name] directly:
📧 [Sponsor_Contact_Email]
📞 [Sponsor_Contact_Phone]

Or reply to this email and I'll connect you!

Don't let this valuable opportunity pass you by!

Best regards,

The Veterinary Business Institute Team
https://www.veterinarybusinessinstitute.com/

P.S. This offer expires [Date]. Claim yours now: [Sponsor_Offer_Link]
```

---

## **QUALITY CONTROL CHECKLIST**

### **Pre-Event Quality Check (E-3 Days)**

**Event Setup:**
- [ ] Zoom webinar created and tested
- [ ] Registration page is live and functional
- [ ] Panelist join links tested and confirmed working
- [ ] Attendee registration links tested
- [ ] Automated Zoom reminders enabled

**Content Review:**
- [ ] All panelist bios accurate and finalized
- [ ] Questions reviewed and approved by each panelist
- [ ] Slide deck complete with panelist photos
- [ ] Sponsor slide prepared and approved
- [ ] Moderator script finalized

**Marketing Assets:**
- [ ] All graphics created and approved
- [ ] Social media captions proofread
- [ ] Email templates proofread and tested
- [ ] Links in all materials tested and working
- [ ] Dates and times verified in all communications

**Email Verification:**
- [ ] All scheduled emails queued properly
- [ ] Email subject lines optimized
- [ ] Sender name and reply-to address correct
- [ ] All links tested (click each one!)
- [ ] Unsubscribe link present and functional
- [ ] Mobile formatting tested

**Panelist Preparation:**
- [ ] All panelists confirmed attendance
- [ ] All panelists received promotional package
- [ ] All panelists approved their questions
- [ ] All panelists have technical requirements info
- [ ] All panelists have host contact information

---

### **Event Day Quality Check (E-Day, 30 mins before)**

**Technical Setup:**
- [ ] Host logged into Zoom
- [ ] Recording enabled
- [ ] Live stream configured (if applicable)
- [ ] Screen share tested
- [ ] Audio/video quality verified
- [ ] Panelist permissions configured
- [ ] Q&A panel enabled
- [ ] Chat settings configured
- [ ] Polls loaded (if applicable)

**Content Ready:**
- [ ] Slide deck loaded and tested
- [ ] Panelist intro slides ready
- [ ] Sponsor slide ready
- [ ] Question list accessible
- [ ] Timer/stopwatch ready
- [ ] Backup questions prepared

**Team Coordination:**
- [ ] Host present and ready
- [ ] Backup moderator identified
- [ ] Chat monitor assigned
- [ ] Technical support contact available
- [ ] All panelists checked in

---

### **Post-Event Quality Check (E+1)**

**Immediate Follow-Up:**
- [ ] Recording saved and uploaded
- [ ] Recording link tested and working
- [ ] Recording link is shareable (permissions set)
- [ ] All reports downloaded from Zoom
- [ ] Lead segmentation completed
- [ ] BDR report compiled and sent

**Communications Sent:**
- [ ] Panelist thank you emails sent
- [ ] Attendee thank you + recording emails sent
- [ ] No-show emails sent
- [ ] BDR team received lead report
- [ ] Internal team debrief scheduled

**Asset Organization:**
- [ ] All files organized in project folder
- [ ] Recording uploaded to permanent storage
- [ ] Reports saved and backed up
- [ ] Screenshots captured
- [ ] Social media clips created

---

### **Ongoing Quality Check (E+7)**

**Follow-Up Progress:**
- [ ] Final CTA email sent
- [ ] Social media recap posted
- [ ] Panelist follow-up conversations initiated
- [ ] BDR team conversion metrics tracked
- [ ] Sponsor offer redemptions monitored

**Lessons Learned:**
- [ ] Debrief meeting completed
- [ ] Success metrics documented
- [ ] Improvement areas identified
- [ ] Process updates noted
- [ ] Template updates made

---

## **QUICK REFERENCE: TIMELINE AT A GLANCE**

```
E-30: Send panelist invitations
E-25: Follow up on invitations
E-21: Finalize panelist roster & send onboarding
E-14: Create all marketing assets
E-10: Send promotional package to panelists
E-10: Launch public promotion (emails + social)
E-7: Attendee reminder #1
E-5: Mid-week social media push
E-3: Last chance promotion + Attendee reminder #2
E-1: Final panelist check-in
E-1: Final attendee reminder
E-Day -1hr: One hour reminder
E-Day -15min: Fifteen minute reminder
E-Day: Host live event
E+1: Send thank yous, recordings, and BDR report
E+2: Social media recap
E+5 to E+7: Final sponsor offer push
E+14: Begin long-term nurture sequence
```

---

## **APPENDIX: USEFUL LINKS & RESOURCES**

### **Internal Resources**
- VBI Website: https://www.veterinarybusinessinstitute.com/
- Sponsor Offer Link: https://www.veterinarybusinessinstitute.com/msm/
- VBI LinkedIn: [Link]
- VBI Facebook: [Link]
- VBI Instagram: [Link]

### **Tools & Platforms**
- Zoom Webinar Dashboard: [Link]
- Email Marketing Platform: [Outlook/Yahoo]
- Social Media Scheduling: [Platform Name]
- CRM System: [Platform Name]
- Cloud Storage: [Google Drive/Other]

### **Team Contacts**
- Strategic Events Coordinator: [Coordinator_Email]
- Event Manager: [Manager_Email]
- Team Lead: [Team_Lead_Email]
- BDR Team Lead: [BDR_Email]

---

## **END OF GUIDE**

This automation guide should be updated after each panel to reflect lessons learned and process improvements. Version control recommended!

**Document Version:** 1.0  
**Last Updated:** [Date]  
**Next Review Date:** [Date]
