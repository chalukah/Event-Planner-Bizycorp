# VBI Panel Email Generator - Complete Guide

## Overview

This is a **complete redesign** of the Events Control Center specifically for the Veterinary Business Institute panel email workflow. It generates personalized HTML emails for panel events with support for dynamic panelist counts and conditional content.

## Key Features

### 1. **Dynamic Panelist Support**
- Import panelist data from CSV or Google Sheets
- Supports 2, 3, 4, or more panelists per event
- Each panelist gets personalized emails with unique links

### 2. **16 Email Templates**
Based on your PANEL EMAIL TEMPLATES folder:

| Code | Email Name | Sender | Timing | Per-Panelist |
|------|-----------|---------|---------|--------------|
| E-22 | Initial Invitation | RESHANI | ~22 days before | ✓ |
| E-20 | Follow-up Reminder | RESHANI | ~20 days before | ✓ |
| E-13 | Confirmation Thank You | RESHANI | After confirm | ✓ |
| E-10 | Promotional Materials | CHALUKA | ~10 days before | ✓ |
| E-10 | Questions | CHALUKA | ~10 days before | ✓ |
| E-6 | Boost Registrations | CHALUKA | ~6 days before | ✓ |
| E-5 | Help Reach More | CHALUKA | ~5 days before | ✓ |
| E-4 | 3 Days Reminder | CHALUKA | 3 days before | ✓ |
| E-2 | Tomorrow Panel | CHALUKA | 1 day before | ✓ |
| E-1 | Today is Day | CHALUKA | Event day morning | ✓ |
| E-DAY | Starting in 2 Hours | CHALUKA | 6:00 PM EST | ✓ |
| E-DAY | Starting Now | CHALUKA | 7:45 PM EST | ✓ |
| E+1 | Thank You + Recording | CHALUKA | Day after event | ✓ |
| POST | Lead Report to Karen | CHALUKA | Day after event | ✗ |
| POST | Thank You to Panelists | CHALUKA | Day after event | ✓ |
| POST | Thank You to Registrants | CHALUKA | Day after event | ✗ |

### 3. **Variable Replacement System**

All `[VARIABLES]` in templates are automatically replaced:

**Event-Level Variables:**
- `[PANEL_TITLE]`
- `[PANEL_SUBTITLE]`
- `[PANEL_PURPOSE]`
- `[EVENT_DATE]`, `[EVENT_DATE_FULL]`, `[EVENT_DATE_SHORT]`, `[EVENT_DATE_MINUS_1]`
- `[DISCUSSION_POINT_1]` through `[DISCUSSION_POINT_5]`
- `[BRIEF_PANEL_TOPIC_DESCRIPTION]`
- `[RECORDING_LINK]` (post-event)

**Panelist-Specific Variables:**
- `[PANELIST_FIRST_NAME]`, `[PANELIST_FULL_NAME]`
- `[PANELIST_ZOOM_JOIN_LINK]`
- `[PANELIST_REGISTRATION_TRACKING_LINK]`
- `[PROMOTIONAL_MATERIALS_DOC_LINK]`
- `[FINAL_BANNER_LINK]`
- `[QUESTION_1]` through `[QUESTION_5]`
- `[X]` (registration count, post-event)
- `[ATTENDEE_LIST_LINK]` (post-event, if 10+)
- `[BRIEF_PANELIST_CONTRIBUTION_SUMMARY]` (post-event)

### 4. **Conditional Content**

The Thank You email (E+1) has conditional sections:

```html
<!-- Shown only if panelist brought 10+ registrations -->
<p>As promised, here's the full attendee list: ...</p>

<!-- Shown only if panelist brought 25+ registrations -->
<p>🎉 Congratulations! You've qualified for the podcast...</p>
```

The generator automatically includes/removes these sections based on registration counts.

### 5. **CSV Import Format**

Create a CSV with these columns:

```csv
First Name,Full Name,Email,Zoom Join Link,Registration Tracking Link,Promotional Materials Link,Final Banner Link,Question 1,Question 2,Question 3,Question 4,Question 5
Keith,Keith True,keith@example.com,https://zoom.us/...,https://zoom.us/register/...,https://docs.google.com/...,https://docs.google.com/...,Question text 1,Question text 2,Question text 3,Question text 4,Question text 5
Charlotte,Charlotte Weir,charlotte@example.com,https://zoom.us/...,https://zoom.us/register/...,https://docs.google.com/...,https://docs.google.com/...,Question text 1,Question text 2,Question text 3,Question text 4,Question text 5
```

### 6. **Google Sheets Integration**

**Option A: Direct Import (Requires Google Sheets API)**
- Set up Google Cloud Project
- Enable Google Sheets API
- Create OAuth 2.0 credentials
- Import sheet data directly into app

**Option B: Export to CSV (Simpler)**
- In Google Sheets: File → Download → CSV
- Import CSV into app

I'll implement **both options** - direct Google Sheets API for convenience, and CSV fallback for simplicity.

## Workflow

### Creating a New Panel Event

1. **Import Event Data**
   - Click "New Panel Event"
   - Fill in panel details (title, subtitle, dates, discussion points)
   - Import panelist data (CSV or Google Sheets)

2. **Generate Emails**
   - App generates all 16 templates × number of panelists
   - Example: 2 panelists = 26 emails (13 per-panelist × 2, plus 3 general)

3. **Review & Customize**
   - Review each generated email
   - Make manual adjustments if needed
   - Check all variables are replaced

4. **Copy to Outlook**
   - Click "Copy HTML" button
   - Paste directly into Outlook (Ctrl+V)
   - All formatting and hyperlinks preserved
   - Add subject line and recipients

5. **Post-Event Updates**
   - Enter registration counts per panelist
   - Add recording link
   - Add attendee list links (for 10+)
   - Regenerate E+1 emails with conditional sections

## Technical Implementation

### File Structure

```
src/
├── types.ts                     # TypeScript types
├── data/
│   └── emailTemplates.ts        # 16 email templates
├── utils/
│   ├── templateEngine.ts        # Variable replacement
│   ├── csvImport.ts             # CSV parsing
│   └── googleSheetsAPI.ts       # Google Sheets integration
├── store.ts                     # State management (Zustand)
└── components/
    ├── PanelEventCreator.tsx    # Create new event
    ├── PanelistImporter.tsx     # CSV/Sheets import
    ├── EmailGenerator.tsx       # Generate & display emails
    ├── EmailViewer.tsx          # View/edit/copy emails
    └── PostEventEditor.tsx      # Add post-event data
```

### Data Flow

```
1. User creates panel event → Enters event details
                           ↓
2. User imports panelists → CSV or Google Sheets
                           ↓
3. System validates data → Checks all required fields
                           ↓
4. System generates emails → Replaces all variables
                           ↓
5. User reviews emails → Makes manual edits if needed
                           ↓
6. User copies to Outlook → One click copy HTML
                           ↓
7. After event: User adds data → Recording, reg counts
                           ↓
8. System regenerates E+1 → With conditional sections
```

## Google Sheets API Integration

### Setup Steps

1. **Create Google Cloud Project**
   ```
   1. Go to https://console.cloud.google.com/
   2. Create new project: "VBI Panel Email Generator"
   3. Enable Google Sheets API
   4. Create OAuth 2.0 Client ID
   5. Add authorized redirect URI: http://localhost:3000
   ```

2. **Get API Credentials**
   ```javascript
   const GOOGLE_CLIENT_ID = "your-client-id.apps.googleusercontent.com"
   const GOOGLE_API_KEY = "your-api-key"
   ```

3. **Install Google API Client**
   ```bash
   npm install gapi-script @types/gapi
   ```

4. **Authenticate & Import**
   ```typescript
   // User clicks "Import from Google Sheets"
   // → Opens OAuth consent
   // → User grants permission
   // → App reads sheet data
   // → Converts to panelist objects
   ```

### Alternative: Simple CSV Export

If API setup is complex, users can:
1. Open Google Sheet
2. File → Download → CSV
3. Drag CSV into app
4. App parses and imports

## Benefits of This System

✅ **Speed**: Generate all emails in seconds instead of hours
✅ **Accuracy**: No missed variable replacements
✅ **Consistency**: All emails follow exact template format
✅ **Scalability**: Handle 2, 3, 5, 10 panelists effortlessly
✅ **Flexibility**: Edit generated emails before sending
✅ **Reusability**: Save events as templates for future panels
✅ **Export/Import**: Backup and share event configurations

## Next Steps

1. I'll implement the complete system with:
   - Panel event creator
   - CSV import
   - Google Sheets API integration
   - Email generator with variable replacement
   - Copy-to-Outlook functionality
   - Post-event data editor
   - Conditional section logic

2. You'll be able to:
   - Create a new event in 2 minutes
   - Generate all emails instantly
   - Copy each email to Outlook with one click
   - Update post-event data and regenerate

Ready to proceed with implementation?
