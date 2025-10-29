# VBI Panel Event Management Guide

## Overview
This guide provides comprehensive information about the VBI Panel Event Management System, including event lifecycle, data structures, and workflows.

## Event Lifecycle Phases

### Phase 1: Planning & Setup (E-30 to E-22)
**Objective**: Define event scope and recruit panelists

**Key Activities**:
- Define panel topic, purpose, and discussion points
- Identify and invite 2-4 expert panelists
- Set event date and time (EST timezone)
- Create event in system
- Generate initial documentation

**Deliverables**:
- Panel event metadata complete
- Panelists confirmed
- Initial checklist created

### Phase 2: Recruitment (E-22 to E-15)
**Objective**: Engage panelists and gather materials

**Key Activities**:
- Send E-22 panel invitations
- Track panelist confirmations
- Send E-15 confirmation emails
- Collect 5 discussion questions per panelist
- Request panelist headshots
- Create promotional materials

**Deliverables**:
- All panelists confirmed and engaged
- 5 questions per panelist collected
- Promotional materials created

### Phase 3: Preparation (E-15 to E-1)
**Objective**: Execute promotional campaign and prepare logistics

**Key Activities**:
- Generate promotional banners (3 sizes × N panelists)
- Generate event poster
- Set up Zoom webinar with panelist links
- Create registration tracking per panelist
- Send reminder emails (E-10, E-8, E-4, E-1)
- Prepare presentation deck
- Conduct tech checks (E-1)
- Monitor registrations

**Deliverables**:
- All graphics generated
- Zoom webinar configured
- Registration tracking active
- All reminder emails sent
- Tech checks completed

### Phase 4: Execution (E-0)
**Objective**: Successfully host panel event

**Key Activities**:
- Send event day instructions to panelists
- Host live panel discussion
- Record session
- Monitor attendance
- Facilitate Q&A
- Save recording to Drive

**Deliverables**:
- Panel event completed
- Recording saved
- Attendance data captured

### Phase 5: Follow-Up (E+1 to E+30)
**Objective**: Post-event engagement and conversion tracking

**Key Activities**:
- Process registration and attendance reports from Zoom
- Classify ICP vs. non-ICP registrants
- Send E+1 thank you emails to panelists
- Share recording with attendees (E+7)
- Distribute recording to no-shows
- Track MSM (Marketing Strategy Meeting) conversions
- Update CRM with attendance and engagement data
- Document lessons learned

**Deliverables**:
- Post-event data captured
- Thank you emails sent
- Recording distributed
- MSM conversions tracked
- Event retrospective complete

## Email Template Timeline

| Code | Name | Timing | Audience | Per-Panelist |
|------|------|--------|----------|--------------|
| E-22 | Panel Invitation | 22 days before | Panelists | Yes |
| E-15 | Panel Confirmation | 15 days before | Panelists | Yes |
| QUESTIONS | Question Confirmation | After questions received | Panelists | Yes |
| REG-MILESTONE | Registration Milestone | When 10/25/50 registrations | Panelists | Yes |
| E-10 | Reminder | 10 days before | Panelists | Yes |
| E-8 | Panelist Check-In | 8 days before | Panelists | Yes |
| PANEL-ASSETS | Panel Assets Shared | When graphics ready | Panelists | Yes |
| E-4 | Final Reminder | 4 days before | Panelists | Yes |
| PROMO | Promotional Materials | Before event | Panelists | Yes |
| PARTNER | Partner Details | Before event | Panelists | Yes |
| EVENT-Q | Event Questions | Before event | Panelists | Yes |
| E-1-DAY | Day Before Email | 1 day before | Panelists | Yes |
| E-1-TECH | Tech Check Reminder | 1 day before | Panelists | Yes |
| E-0 | Event Day Instructions | Event day | Panelists | Yes |
| E+1 | Thank You Email | 1 day after | Panelists | Yes |
| E+7 | Recording Share | 7 days after | Panelists | No |

## Data Structures

### PanelEvent
```typescript
{
  id: string;                    // UUID
  name: string;                  // Internal reference name
  createdAt: string;             // ISO timestamp
  panelTitle: string;            // Main event title
  panelSubtitle: string;         // Tagline
  panelPurpose: string;          // 2-3 sentence description
  briefTopicDescription: string; // Elevator pitch
  eventDate: string;             // YYYY-MM-DD
  eventDateFull: string;         // "Tuesday, October 29, 2025"
  eventDateShort: string;        // "Oct 29"
  eventDateMinus1: string;       // For Sri Lanka timezone
  eventTime: string;             // "8:00 PM EST"
  discussionPoints: string[];    // Array of 5 discussion topics
  panelists: Panelist[];         // Array of 2-4 panelists
  generatedEmails: GeneratedEmail[];
  recordingLink?: string;        // Post-event
}
```

### Panelist
```typescript
{
  id: string;
  firstName: string;
  fullName: string;
  email: string;
  zoomJoinLink: string;                  // Panelist-specific Zoom link
  registrationTrackingLink: string;      // Track registrations via this panelist
  promotionalMaterialsLink: string;      // Google Drive/Canva folder
  questionsLink: string;                 // Link to panelist's 5 questions doc
  finalBannerLink: string;               // Promotional banner URL
  questions: string[];                   // Array of 5 discussion questions
  registrationCount?: number;            // Post-event: total registrations attributed
  attendeeListLink?: string;             // Post-event: if 10+ registrations
  contributionSummary?: string;          // Post-event: qualitative assessment
}
```

## Variable Replacement System

### Event Variables
- `[PANEL_TITLE]` → Panel title
- `[PANEL_SUBTITLE]` → Panel subtitle
- `[EVENT_DATE]` → Full date (Tuesday, October 29, 2025)
- `[EVENT_DATE_SHORT]` → Short date (Oct 29)
- `[EVENT_TIME]` → Time (8:00 PM EST)
- `[DISCUSSION_POINT_1]` through `[DISCUSSION_POINT_5]`

### Panelist Variables
- `[PANELIST_FIRST_NAME]` → Panelist first name
- `[PANELIST_FULL_NAME]` → Panelist full name
- `[PANELIST_EMAIL]` → Panelist email
- `[ZOOM_JOIN_LINK]` → Panelist-specific Zoom join link
- `[REGISTRATION_TRACKING_LINK]` → Track who registers via this panelist
- `[QUESTIONS_LINK]` → Link to panelist questions document
- `[PROMOTIONAL_MATERIALS_LINK]` → Link to promotional materials folder
- `[FINAL_BANNER_LINK]` → Link to promotional banner

### Post-Event Variables
- `[RECORDING_LINK]` → Panel recording URL
- `[REGISTRATION_COUNT]` → Total registrations for this panelist
- `[ATTENDEE_LIST_LINK]` → Link to attendee list (if 10+)

## Conditional Content Rules

### E+1 Thank You Email
**Condition**: Registration count >= 10
- **If true**: Include section about strong turnout and attendee list link
- **If false**: Generic thank you without mentioning registration numbers

### E+7 Recording Share
**Condition**: At least one panelist has 10+ registrations
- **If true**: Send recording share email
- **If false**: Skip this email

## Best Practices

### Event Creation
1. Set event date at least 30 days in advance
2. Recruit 2-4 panelists (3 is ideal)
3. Ensure diverse perspectives among panelists
4. Choose panel title that is specific and actionable

### Panelist Management
1. Collect all required data before E-22
2. Validate email addresses and URLs
3. Request professional headshots (500×500px minimum)
4. Set clear expectations for time commitment

### Email Campaign
1. Generate all emails at once for consistency
2. Review variable replacement for accuracy
3. Test emails in Outlook before sending
4. Follow timing schedule precisely

### Graphics Production
1. Collect high-resolution panelist headshots
2. Generate all 3 banner sizes for flexibility
3. Maintain brand consistency (VBI teal #1a8a9f)
4. Optimize file sizes for email compatibility

### Post-Event Follow-Up
1. Import Zoom reports within 24 hours of event
2. Classify ICP leads immediately
3. Send E+1 thank you within 1 business day
4. Track MSM conversions for 30 days post-event

## Common Issues and Solutions

### Issue: Missing panelist data
**Solution**: Use Panelist Coordinator agent to validate data and identify missing fields

### Issue: Email variables not replaced
**Solution**: Ensure event and panelist data is complete before generating emails

### Issue: Graphics not generating
**Solution**: Verify panelist headshot URLs are accessible (not blocked by permissions)

### Issue: ICP classification inaccurate
**Solution**: Review ICP rules and manually classify edge cases

### Issue: Zoom integration not working
**Solution**: Check API credentials and token expiration via Integration Hub agent
