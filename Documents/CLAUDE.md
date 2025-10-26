# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is an automated Veterinary Panel Event creation system that generates complete event packages including:
- Word documents (emails, questions, promotional materials)
- Excel tracking spreadsheets
- Promotional graphics (banners and posters)

The system reads configuration from JSON and generates 12+ documents plus 7+ promotional graphics in under a minute.

## Core Architecture

### Two-Script System

**1. `enhanced_panel_automation.py`** - Main automation engine
   - Contains `EnhancedPanelEventAutomation` class with all generation logic
   - Handles folder creation, document generation, banner/poster creation
   - Can be imported as a module or run standalone

**2. `create_panel_event.py`** - Entry point script
   - User-facing script that loads `event_config.json`
   - Validates configuration
   - Instantiates automation class and runs event generation
   - This is what users execute (either directly or via `RUN_ME.bat`)

### Configuration System

Events are configured via `event_config.json` with structure:
```json
{
  "event_date": "DD_MM_YYYY",  // Note: Underscore format is critical
  "panel_topic": "string",
  "panel_type": "string",
  "panelists": [2-4 objects],  // Min 2, max 4 recommended
  "event_details": {...}
}
```

The date format `DD_MM_YYYY` with underscores is used throughout:
- For folder naming: `22_10_2025_-_Panel_Topic`
- For date parsing: `datetime.strptime(event_date, "%d_%m_%Y")`
- Never use dashes or slashes

### Output Structure

All outputs go to `C:\Users\Bizycorp_Work\Documents\CLaude Vet\Panel_Events\`:

```
Panel_Events\
├── Master_Panel_Tracker.xlsx
└── [Date]_-_[Topic]\
    ├── Banners_Posters\          # PNG graphics
    ├── Email_Communications\      # DOCX templates
    ├── Promotional_Materials\     # DOCX per panelist
    ├── Panel_Questions\           # DOCX per panelist
    ├── Partner_Details\           # Zoom/landing page info
    ├── Presentations\             # Empty (for user's PPT files)
    └── Reports\                   # Empty (for future use)
```

## Key Components

### Document Generation (`enhanced_panel_automation.py`)

**Email Templates** (`create_invitation_email`, `create_followup_emails`):
- Invitation email
- 1st follow-up
- 2nd follow-up
- All use python-docx with formatted paragraphs and headings

**Per-Panelist Documents**:
- `create_panel_questions_document()` - 5 questions sent in advance
- `create_promotional_materials()` - Bio, social posts, email signatures

**Partner/Event Documents**:
- `create_partner_details_document()` - Zoom details, landing page content

### Graphics Generation

**Banner Creation** (`create_promotional_banner()`):
- Uses Pillow (PIL) library
- Three sizes per panelist:
  - `webinar`: 1920x400 (registration pages)
  - `social`: 1200x630 (social media)
  - `email_header`: 600x200 (email campaigns)
- Teal brand color: `#1a8a9f`
- Includes event title, date, panelist name/role/company, "REGISTER NOW" CTA

**Event Poster** (`create_event_poster()`):
- 1920x1080 poster with all panelists
- Handles long titles by splitting into multiple lines
- Shows up to 4 panelists

### Excel Tracking (`create_master_spreadsheet`)

- Creates or updates `Master_Panel_Tracker.xlsx`
- "Confirmed Panelist" sheet for cross-event tracking
- Individual sheet per event (named by date like "22 Oct")
- Uses openpyxl with styled headers (blue fill, white text, borders)

## Running the System

### Standard Usage
```bash
# Via entry script (recommended)
python create_panel_event.py

# Or via batch file
RUN_ME.bat  # Double-click on Windows
```

### Direct Module Usage
```python
from enhanced_panel_automation import EnhancedPanelEventAutomation
import json

automation = EnhancedPanelEventAutomation()
with open('event_config.json') as f:
    config = json.load(f)
automation.create_complete_event_package(config)
```

## Dependencies

Auto-installed on first run:
- `openpyxl` - Excel file creation and formatting
- `python-docx` - Word document generation
- `Pillow` (PIL) - Banner and poster image generation

Each module attempts import, then falls back to `os.system("pip install ...")` if missing.

## Important Implementation Details

### Panelist Validation
- Minimum: 2 panelists
- Maximum: 4 panelists (hardcoded in poster generation with `[:4]` slice)
- Script warns but doesn't fail outside this range

### Date Handling
- Input: `DD_MM_YYYY` format (e.g., `22_10_2025`)
- Folder names: `22_10_2025_-_Topic`
- Display: `datetime.strptime().strftime("%B %d, %Y")` → "October 22, 2025"
- Sheet names: `strftime("%d %b")` → "22 Oct"

### Font Fallbacks
Banner/poster generation attempts to load Arial fonts (`arial.ttf`, `arialbd.ttf`) but falls back to default font if unavailable. On Windows, these fonts are usually present.

### File Naming
- Panelist names are sanitized: `name.replace(' ', '_').replace('.', '')`
- Topics are sanitized: `topic.replace(' ', '_').replace(':', '_')`
- Banner files: `{Name}_Banner_{type}.png`
- Document files: `{Name}_-_Questions.docx` (note the ` -_` separator)

### Error Handling Philosophy
- Validation in `create_panel_event.py` (JSON structure, date format)
- Generation in `enhanced_panel_automation.py` uses try/except with warnings
- Banner generation failures are non-fatal (prints warning, returns None)
- Script continues even if graphics fail to generate

## Working with This Codebase

### Adding New Document Types
1. Create method in `EnhancedPanelEventAutomation` class
2. Use `python-docx` Document API
3. Call from `create_complete_event_package()` in appropriate loop
4. Save to relevant subfolder under `event_path`

### Modifying Banner Designs
- Edit `create_promotional_banner()` or `create_event_poster()`
- Dimensions dict controls sizes
- Brand color: `#1a8a9f` (teal) - change globally
- Text positioning uses `width//2` for centering

### Adding Excel Sheets
- See `add_event_sheet_to_tracker()` for pattern
- Use openpyxl styling classes for consistency
- Headers always in row 2 (row 1 reserved for merged title)

### Testing
No formal test suite. Test by:
1. Editing `event_config.json`
2. Running `python create_panel_event.py`
3. Checking output in `Panel_Events\` folder

## Path Hardcoding

The base path is hardcoded:
```python
def __init__(self, base_folder="C:\\Users\\Bizycorp_Work\\Documents\\CLaude Vet\\Panel_Events"):
```

To use elsewhere, either:
- Pass different `base_folder` when instantiating
- Modify the default in `__init__`
- Use environment variable (would require code changes)

---

## VBI Panel Event Workflow (Full Process)

The current automation system handles **Phase 1 (Recruitment)** document generation only. Below is the complete end-to-end workflow for running a Veterinary Business Institute panel event.

### Key Personnel & Contacts

- **Coordinator**: Chaluka Harsha (Strategic Events and Partnerships Coordinator)
- **Host**: `[Host_Name]` (e.g., Lester) - runs the live event
- **Manager**: `[Manager_Email]` - CC'd on panelist communications
- **Reshani**: `[Reshani_Email]` - CC'd on panelist communications

### Event Variables Required

All text in `[brackets]` represents data that must be substituted for each event:

**Event Details:**
- `[Event_Date]` - Human-readable (e.g., "October 29, 2025")
- `[Event_Time_EST]` - With timezone (e.g., "8:00 PM EST")
- `[Event_Topic]` - Category (e.g., "Veterinary Talent Solutions")
- `[Event_Title]` - Full descriptive title
- `[Event_Registration_Page_Link]` - Public registration URL
- `[Event_Recording_Link]` - Available after event

**Per-Panelist Variables:**
- `[Panelist_Full_Name]`
- `[Panelist_First_Name]`
- `[Panelist_Email]`
- `[Panelist_Unique_Join_Link]` - Private Zoom speaker link
- `[Panelist_Unique_Registration_Link]` - Tracked public registration link

**Assets & Resources:**
- `[Graphics_Folder_Link]` - Google Drive or shared folder with promotional materials
- `[Questions_Document_Link]` - Shared doc with panelist-specific questions
- `[Sponsor_Offer_Link]` - Post-event CTA (e.g., "Free Marketing Strategy Session")
- `[Sponsor_Offer_Name]` - What the offer is called

### Phase 1: Recruitment & Confirmation (E-30 to E-21)

**Current Automation Coverage:** ✅ Partially automated (initial templates generated)

**Task 1.1: Initial Panelist Invitation**
- **Trigger**: Sent manually after identifying potential panelists
- **Template**: Matches `create_invitation_email()` output in `Email_Communications/`
- **From**: Chaluka Harsha
- **Subject**: "Invitation to Share Your Expertise at the Veterinary Business Institute's Expert Panel"
- **Content Highlights**:
  - Introduction to VBI and event topic
  - Event snapshot (date, time, duration, format)
  - Value proposition for panelist (visibility, networking, promotional exposure, client attraction)
- **Sender Email Signature**: Chaluka Harsha, Strategic Events and Partnerships Coordinator, VBI

**Task 1.2: Onboarding Email (After Confirmation)**
- **Trigger**: Panelist replies "yes" to invitation
- **To**: `[Panelist_Email]`
- **Cc**: `[Manager_Email]`, `[Reshani_Email]`
- **Subject**: "Thrilled to Have You on Our Expert Panel Series!"
- **Requests**:
  1. Full Name
  2. Contact Number
  3. Current Position and Organization
  4. Professional Headshot (for graphics)
  5. Short Bio (3-4 sentences)
- **Explains**: Q&A format, VBI handles all marketing/promotions, questions will be shared in advance

### Phase 2: Pre-Panel Preparation & Promotion (E-14 to E-1)

**Current Automation Coverage:** ✅ Graphics and base documents auto-generated

**Task 2.1: Internal Asset Creation (E-14)**
- Finalize all event details
- Create Zoom Webinar with unique panelist join links and tracked registration links
- Create registration landing page
- Generate promotional graphics (already automated via `Banners_Posters/`)
- Draft promotional emails and social captions

**Task 2.2: Promotional Package to Panelists (E-10)**
- **To**: `[Panelist_Email]`
- **Cc**: `[Manager_Email]`, `[Reshani_Email]`
- **Subject**: "Promotional Materials for Upcoming Panel"
- **Includes**:
  - `[Panelist_Unique_Join_Link]` - Their speaker link (may arrive via no-reply@zoom.us)
  - `[Panelist_Unique_Registration_Link]` - For their audience (tracked)
  - `[Graphics_Folder_Link]` - Social media graphics (LinkedIn, Facebook, Instagram)
  - `[Questions_Document_Link]` - Draft questions for their review/approval
- **Request**: Panelist confirms questions or suggests changes

**Task 2.3: Attendee Reminder 1 (E-7)**
- **To**: All current registrants
- **Subject**: "See you next week at the VBI panel: `[Event_Title]`"
- **Content**: Brief reminder with "Add to Calendar" link

**Task 2.4: Last Chance Promotion & Reminder 2 (E-3)**
- **Email 1 (To non-registrants)**: "Last Chance to Register" promotional push
- **Email 2 (To registrants)**: "See you in 3 days!" reminder

**Task 2.5: Final Panelist Check-in (E-1)**
- **To**: `[Panelist_Email]`
- **Cc**: `[Manager_Email]`, `[Reshani_Email]`
- **Subject**: "Final Details for Tomorrow's Panel: `[Event_Title]`"
- **Content**:
  - Event is tomorrow at `[Event_Time_EST]`
  - `[Panelist_Unique_Join_Link]` included again
  - Request to join 10 minutes early for tech check
  - Time to join early: `[Event_Time_EST - 10 mins]`

**Task 2.6: Attendee "Tomorrow" Reminder (E-1)**
- **To**: All registrants
- **Subject**: "`[Event_Title]` is tomorrow!"

### Phase 3: Event Day (E-Day)

**Current Automation Coverage:** ❌ Not automated (requires email automation platform)

**Task 3.1: "1 Hour Before" Reminder**
- **To**: All registrants
- **Subject**: "Starting Soon: `[Event_Title]`"
- **Timing**: E-Day, 1 hour before event

**Task 3.2: "15 Minutes Before" Reminder**
- **To**: All registrants
- **Subject**: "We're starting now! `[Event_Title]`"
- **Timing**: E-Day, 15 minutes before event

**Task 3.3: Internal Backstage Check (10 Minutes Before)**
- `[Host_Name]` starts Zoom Webinar
- Admits panelists using their `[Panelist_Unique_Join_Link]`
- Conducts A/V and tech check with all panelists
- Lets attendees in when ready to start

### Phase 4: Post-Panel Follow-Up (E+1 to E+7)

**Current Automation Coverage:** ❌ Not automated (requires post-event data)

**Task 4.1: Thank You Emails (E+1)**

**Email 1 - To Panelists:**
- **To**: `[Panelist_Email]`
- **Cc**: `[Manager_Email]`, `[Reshani_Email]`
- **Subject**: "Thank you for joining the `[Event_Title]` panel!"
- **Content**:
  - Personal thank you for their contribution
  - Link to registration list (if promised during recruitment)
  - `[Event_Recording_Link]`

**Email 2 - To Attendees:**
- **To**: All who attended live
- **Subject**: "Here's the recording for `[Event_Title]`"
- **Content**:
  - Thank you for attending
  - `[Event_Recording_Link]`
  - `[Sponsor_Offer_Link]`

**Task 4.2: "Sorry We Missed You" Email (E+2)**
- **To**: Registered but did not attend (no-shows)
- **Subject**: "Sorry we missed you at `[Event_Title]`"
- **Content**:
  - Acknowledge they were missed
  - `[Event_Recording_Link]`
  - `[Sponsor_Offer_Link]`

**Task 4.3: Final CTA Email (E+7)**
- **To**: All registrants (attendees + no-shows)
- **Subject**: "A final reminder about your free `[Sponsor_Offer_Name]`"
- **Content**:
  - Final marketing push for `[Sponsor_Offer_Link]`
  - Create urgency ("offer expires soon")

### Current vs. Future Automation

**Currently Automated:**
- ✅ Phase 1: Base email templates (invitation, follow-ups) generated as DOCX
- ✅ Phase 2: Promotional graphics (banners, posters) auto-generated
- ✅ Phase 2: Panel questions document created per panelist
- ✅ Phase 2: Promotional materials document (bio, social posts)
- ✅ Tracking: Master spreadsheet structure

**Not Yet Automated (Opportunities):**
- ❌ Email sending (currently manual via DOCX templates)
- ❌ Zoom webinar creation and link generation
- ❌ Registration landing page creation
- ❌ Attendee reminder emails (requires integration with email platform)
- ❌ Post-event segmentation (attendees vs. no-shows)
- ❌ Recording upload and link distribution

**Integration Considerations for Future Automation:**
- Email platform (e.g., Mailchimp, SendGrid, ActiveCampaign) for scheduled sends
- Zoom API for webinar creation and panelist/attendee link generation
- Landing page builder (e.g., Unbounce, Leadpages) or custom HTML/WordPress
- CRM or Google Sheets integration for attendee tracking and segmentation
