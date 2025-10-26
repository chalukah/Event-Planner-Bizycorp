# VET Panel Event Automation System - User Guide

**Version:** 1.0
**Created:** October 21, 2025
**Author:** Mary (Business Analyst AI)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [What Gets Created](#what-gets-created)
3. [Quick Start Guide](#quick-start-guide)
4. [Configuration Guide](#configuration-guide)
5. [File Formats & Quality](#file-formats--quality)
6. [Workflow Integration](#workflow-integration)
7. [Troubleshooting](#troubleshooting)
8. [System Architecture](#system-architecture)

---

## Overview

This automation system creates **complete VET panel event packages** in under 60 seconds, generating:

- ✅ **5+ Word documents** (questions, promotional materials, partner details)
- ✅ **1 Excel tracking spreadsheet** (2 sheets with complete event data)
- ✅ **1 PowerPoint presentation template** (10 slides ready for photos)
- ✅ **Proper folder structure** matching VET standards
- ✅ **Panelist subfolders** ready for Canva graphics

**What it does NOT create:**
- ❌ Promotional graphics/banners (you'll use Canva MCP for these)
- ❌ Photos/images (you'll add these manually to PowerPoint)

---

## What Gets Created

### 📂 Folder Structure

```
C:\Users\Bizycorp_Work\Documents\VET\
└── 22nd Oct - Veterinary Technology & Innovation Panel - [Full Title]\
    ├── 22_10_2025 - Veterinary Technology & Innovation Panel.xlsx
    ├── Oct 22.pptx
    ├── Rhonda Bell - Questions.docx
    ├── Amanda Landis-Hanna - Questions.docx
    ├── Rhonda Bell - Promotional Materials_.docx
    ├── Amanda Landis-Hanna - Promotional Materials_.docx
    ├── Partner Details_Zoom landing page details_.docx
    └── 22nd Oct\
        ├── Rhonda\  (for Canva graphics)
        └── Amanda\  (for Canva graphics)
```

### 📄 Document Details

| Document Type | Count | Purpose | Formatting |
|---------------|-------|---------|------------|
| **Questions** | One per panelist | Panel questions sent in advance | Georgia 13pt, hanging indent |
| **Promotional Materials** | One per panelist | Social posts, bios, Zoom links | Georgia 11pt, multiple sections |
| **Partner Details** | 1 | Zoom and landing page details | Georgia 11pt, organized sections |
| **Excel Tracker** | 1 (2 sheets) | Event info + process workflow | Merriweather, colored headers |
| **PowerPoint** | 1 (10 slides) | Presentation template | 16:9, VBI brand colors |

---

## Quick Start Guide

### Step 1: Edit Configuration

Open `vet_event_config.json` and fill in your event details:

```json
{
  "event_metadata": {
    "event_date": "2025-10-29",
    "event_time_est": "8:00 PM EST",
    "duration": "60 minutes",
    "category": "Veterinary Talent Solutions Panel",
    "full_title": "The Workforce Crisis: Real Strategies to Recruit, Retain, and Rebuild"
  },
  "panelists": [
    {
      "full_name": "John Smith",
      "first_name": "John",
      "title": "Veterinary HR Consultant",
      ...
    }
  ]
}
```

### Step 2: Run the Automation

**Option A:** Double-click `RUN_VET_EVENT_AUTOMATION.bat`

**Option B:** Run from command line:
```bash
cd "C:\Users\Bizycorp_Work\Documents\CLaude Vet"
python create_vet_panel_event.py
```

### Step 3: Verify Output

Check the newly created folder in `C:\Users\Bizycorp_Work\Documents\VET\`

### Step 4: Manual Steps

1. **Create graphics in Canva** (using Canva MCP)
2. **Save graphics** to panelist subfolders
3. **Add photos** to PowerPoint (moderator, panelists, sponsor logo, QR code)
4. **Upload to Google Drive**

---

## Configuration Guide

### Required Fields

#### Event Metadata
```json
"event_metadata": {
  "event_date": "YYYY-MM-DD",           // ISO format
  "event_time_est": "8:00 PM EST",      // With timezone
  "duration": "60 minutes",             // Duration string
  "category": "Panel Category",         // Used in folder name
  "full_title": "Full Event Title"      // Main title
}
```

#### Event Details
```json
"event_details": {
  "description": "Short description",
  "target_audience": "Who should attend",
  "key_topics": ["Topic 1", "Topic 2"],  // 3-5 recommended
  "registration_link": "https://...",
  "zoom_webinar_id": "123-456-789",
  "zoom_join_link": "https://zoom.us/..."
}
```

#### Moderator
```json
"moderator": {
  "full_name": "Full Name",
  "title": "Job Title",
  "company": "Company Name",
  "email": "email@example.com",
  "bio": "3-4 sentence bio",
  "headshot_path": ""  // Leave empty, add photo manually
}
```

#### Panelists (2-4 recommended)
```json
"panelists": [
  {
    "full_name": "Dr. Jane Doe",
    "first_name": "Jane",
    "title": "Chief Veterinary Officer",
    "company": "VetCorp Inc.",
    "email": "jane@vetcorp.com",
    "phone": "+1-555-0123",
    "bio": "Full professional bio (3-4 sentences)",
    "linkedin": "https://linkedin.com/in/janedoe",
    "website": "https://vetcorp.com",
    "headshot_path": "",  // Leave empty
    "unique_registration_link": "https://...?ref=jane",
    "unique_zoom_join_link": "https://zoom.us/...?pwd=jane123",
    "questions": [
      "Question 1 for this panelist",
      "Question 2 for this panelist",
      "Question 3 for this panelist",
      "Question 4 for this panelist",
      "Question 5 for this panelist"
    ]
  }
]
```

#### Sponsor Info
```json
"sponsor_info": {
  "sponsor_name": "Ekwa Marketing",
  "sponsor_offer": "Free Marketing Strategy Session",
  "sponsor_offer_value": "$900",
  "sponsor_offer_link": "https://...",
  "sponsor_logo_path": ""  // Leave empty, add to PPT manually
}
```

#### VBI Contacts
```json
"vbi_contacts": {
  "coordinator": {
    "name": "Chaluka Harsha",
    "title": "Strategic Events and Partnerships Coordinator",
    "email": "chaluka@vbi.example.com"
  },
  "manager_email": "manager@vbi.example.com",
  "reshani_email": "reshani@vbi.example.com"
}
```

---

## File Formats & Quality

### Word Documents

**Formatting Standards:**
- **Questions**: Georgia 13pt, hanging indent (0.5" left, -0.25" first line)
- **Promotional Materials**: Georgia 10-11pt, multiple sections
- **Partner Details**: Georgia 11pt, organized by section

**Quality Features:**
- ✅ Exact font matching (Georgia, Arial)
- ✅ Proper spacing (12pt before/after paragraphs)
- ✅ Professional formatting (bold headers, consistent styles)
- ✅ Complete content (bios, links, questions, social posts)

### Excel Spreadsheet

**Sheet 1: Event Information**
- 2-column layout (labels + values)
- Yellow label cells (#FFF2CC) with Merriweather 12pt bold
- Dark green headers (#274E13)
- Auto-populated from config

**Sheet 2: Process Sheet**
- 6-column workflow template
- Panelist details with bios
- Step-by-step event execution checklist
- Pre-formatted for easy use

### PowerPoint Presentation

**10 Slides:**
1. Title/Welcome
2. Sponsor acknowledgment
3. Podcast promotion
4. Event title card
5. Moderator introduction
6-N. Panelist slides (one per panelist)
N+1. Discussion points
N+2. Call to action (sponsor offer + QR code)
N+3. Thank you

**Features:**
- 16:9 format (10" x 5.625")
- VBI brand colors (Teal #1a8a9f)
- Detailed speaker notes on ALL slides
- Placeholders for photos/logos

---

## Workflow Integration

This automation handles **Phase 1 (Recruitment)** of the VBI panel workflow:

### Current Automation Coverage

| Phase | Task | Status |
|-------|------|--------|
| **Phase 1: Recruitment** | Initial email templates | ✅ Generated |
| | Panel questions documents | ✅ Generated |
| | Promotional materials | ✅ Generated |
| | Partner details | ✅ Generated |
| **Phase 2: Promotion** | Graphics/banners | ⚠️ Use Canva MCP |
| | Excel tracking | ✅ Generated |
| | PowerPoint template | ✅ Generated |
| **Phase 3: Event Day** | Email reminders | ❌ Manual/email platform |
| **Phase 4: Follow-up** | Thank you emails | ❌ Manual/email platform |

### Complete Workflow Steps

**Pre-Automation (Manual):**
1. Identify event topic and date
2. Recruit panelists (via email)
3. Collect panelist details (name, bio, headshot, etc.)
4. Create Zoom webinar and get unique links

**Automation (This System):**
5. Edit `vet_event_config.json`
6. Run automation script
7. Verify generated documents

**Post-Automation (Manual):**
8. Create promotional graphics in Canva
9. Save graphics to panelist subfolders
10. Add photos to PowerPoint
11. Send promotional packages to panelists (E-10)
12. Execute email campaign (reminders, thank you, etc.)
13. Upload final package to Google Drive

---

## Troubleshooting

### Common Issues

**Problem:** "Configuration file not found"
**Solution:** Ensure `vet_event_config.json` is in the same folder as `create_vet_panel_event.py`

**Problem:** "KeyError: 'some_field'"
**Solution:** Check your JSON file has all required fields (see Configuration Guide)

**Problem:** "UnicodeEncodeError" on Windows
**Solution:** Already fixed with encoding handling in the script

**Problem:** Folder already exists
**Solution:** The script will create new files in the existing folder (safe to re-run)

**Problem:** Missing panelist questions
**Solution:** Ensure each panelist has exactly 5 questions in their `questions` array

**Problem:** PowerPoint slides missing photos
**Solution:** Photos must be added manually - automation creates placeholders only

### Validation Checklist

Before running, verify your config has:
- ✅ Valid date format (YYYY-MM-DD)
- ✅ 1-4 panelists
- ✅ All required email addresses
- ✅ All Zoom links
- ✅ 5 questions per panelist
- ✅ Complete bios for moderator and panelists

---

## System Architecture

### File Structure

```
C:\Users\Bizycorp_Work\Documents\CLaude Vet\
├── vet_event_config.json              # Configuration file (EDIT THIS)
├── create_vet_panel_event.py          # Main automation script
├── vet_word_generator.py              # Word document generator
├── vet_excel_generator.py             # Excel spreadsheet generator
├── vet_powerpoint_generator.py        # PowerPoint template generator
├── RUN_VET_EVENT_AUTOMATION.bat       # Quick run batch file
└── VET_AUTOMATION_USER_GUIDE.md       # This file
```

### Analysis Files (Reference Only)

These files contain the detailed analysis used to build the automation:

```
├── ANALYSIS_README.md
├── ANALYSIS_SUMMARY.md
├── DOCUMENT_STRUCTURE_GUIDE.md
├── FORMATTING_QUICK_REFERENCE.md
├── EXCEL_STRUCTURE_GUIDE.md
├── POWERPOINT_STRUCTURE_GUIDE.md
├── document_structures.json
├── spreadsheet_structure.json
├── presentation_structure.json
└── [various analysis scripts...]
```

You generally won't need these unless you're modifying the automation system.

### Dependencies

**Required Python Packages:**
- `python-docx` - Word document generation
- `openpyxl` - Excel spreadsheet generation
- `python-pptx` - PowerPoint presentation generation

**Auto-installation:** Packages are automatically installed on first run.

### Output Location

All event packages are created in:
```
C:\Users\Bizycorp_Work\Documents\VET\
```

To change this, edit `output_settings.base_folder` in `vet_event_config.json`.

---

## Next Steps

### For Your Next Event

1. **Copy `vet_event_config.json`** to a new file (e.g., `nov_5_event_config.json`)
2. **Edit the new file** with your event details
3. **Run:** `python create_vet_panel_event.py` (it will use `vet_event_config.json` by default)
   - OR modify the script to accept a command-line argument for config file

### Future Enhancements

Potential improvements for later:

- ✨ Command-line arguments for config file selection
- ✨ Interactive mode (prompts for event details instead of JSON)
- ✨ Email automation integration (SendGrid, Mailchimp)
- ✨ Zoom API integration (auto-create webinars)
- ✨ Image handling (auto-insert photos if paths provided)
- ✨ Canva API integration (auto-generate graphics)
- ✨ Google Drive upload automation

---

## Support & Credits

**Created by:** Mary (Business Analyst AI)
**Date:** October 21, 2025
**Based on:** VET folder structure analysis and VBI panel workflow

**For Issues:**
- Check this guide's Troubleshooting section
- Verify your JSON configuration
- Review the analysis documentation files

**Remember:** This system automates document generation only. The complete VBI panel workflow still requires manual steps for graphics, photos, emails, and Google Drive upload.

---

**Happy Automating! 🎉**
