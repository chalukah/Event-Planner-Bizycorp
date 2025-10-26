# Auto-Fill Feature Guide

**Automatically Fill Event Creation Forms from Uploaded Files**

Last Updated: October 24, 2025

---

## Overview

The **Auto-Fill** feature allows you to upload a text file or CSV file containing panel event details, and the system will **automatically populate** all form fields. This saves significant time and reduces typing errors.

## How It Works

### Simple 3-Step Process

1. **Download a template** (text or CSV format)
2. **Fill in your event details** in the template
3. **Upload the file** - form fills automatically!

---

## Using the Auto-Fill Feature

### Step 1: Access the Event Creation Form

1. Click **"New Panel Event"** button
2. You'll see the event creation form
3. At the top, there's a blue **"Auto-Fill from File"** section

### Step 2: Download a Template

Click one of these buttons:

**Option A: Download .txt Template**
- Simple text format
- Easy to edit in Notepad
- Best for quick edits

**Option B: Download .csv Template**
- Spreadsheet format
- Edit in Excel or Google Sheets
- Best for structured data

### Step 3: Fill in the Template

**Text Template Format (.txt):**

```
Event Name: OCT 29 Panel Event
Panel Title: Veterinary Talent Solutions Panel
Panel Subtitle: The Workforce Crisis - Real Strategies...
Panel Purpose: address the workforce crisis in veterinary medicine
Event Date: October 29th
Event Date Full: Tuesday, October 29th, 2025
Event Date Short: 29th
Event Date Minus 1: October 28th
Discussion Point 1: Beyond job postings: creative recruitment strategies
Discussion Point 2: Building a culture that retains top talent
Discussion Point 3: Addressing burnout and building resilience
Discussion Point 4: The role of ownership models in staff retention
Discussion Point 5: Creating sustainable career pathways
Brief Topic Description: recruitment, retention, and rebuilding teams
```

**CSV Template Format (.csv):**

```csv
Field,Value
Event Name,OCT 29 Panel Event
Panel Title,Veterinary Talent Solutions Panel
Panel Subtitle,The Workforce Crisis - Real Strategies...
Panel Purpose,address the workforce crisis in veterinary medicine
Event Date,October 29th
Event Date Full,"Tuesday, October 29th, 2025"
Event Date Short,29th
Event Date Minus 1,October 28th
Discussion Point 1,Beyond job postings: creative recruitment strategies
Discussion Point 2,Building a culture that retains top talent
Discussion Point 3,Addressing burnout and building resilience
Discussion Point 4,The role of ownership models in staff retention
Discussion Point 5,Creating sustainable career pathways
Brief Topic Description,recruitment retention and rebuilding teams
```

### Step 4: Upload Your File

1. Click **"Upload Event Data"** button
2. Select your filled template (.txt or .csv)
3. System validates and auto-fills the form
4. Review the populated fields
5. Click **"Create Panel Event"**

---

## Field Reference

### Required Fields

All these fields MUST be filled:

| Field Name | Example | Description |
|------------|---------|-------------|
| **Event Name** | OCT 29 Panel Event | Internal name for the event |
| **Panel Title** | Veterinary Talent Solutions Panel | Public-facing panel title |
| **Panel Subtitle** | The Workforce Crisis - Real Strategies... | Subtitle explaining the focus |
| **Panel Purpose** | address the workforce crisis in veterinary medicine | Brief purpose statement |
| **Event Date** | October 29th | Simple date (e.g., "October 29th") |
| **Event Date Full** | Tuesday, October 29th, 2025 | Complete date with day and year |
| **Event Date Short** | 29th | Just the day number |
| **Event Date Minus 1** | October 28th | Day before the event |
| **Discussion Point 1-5** | Beyond job postings: creative recruitment strategies | Five key discussion topics |
| **Brief Topic Description** | recruitment, retention, and rebuilding teams | Short summary of topics |

---

## File Format Requirements

### Text File Format (.txt)

**Rules:**
- Each line follows format: `Field Name: Value`
- Colon (`:`) separates field name from value
- Field names are case-insensitive
- Empty lines are ignored
- Comments starting with `#` are ignored

**Example:**
```
# Panel Event Details
Event Name: My Panel Event
Panel Title: Leadership in Veterinary Medicine
...
```

### CSV File Format (.csv)

**Rules:**
- First row is header: `Field,Value`
- Each subsequent row: `Field Name,Field Value`
- Values with commas must be quoted
- Field names are case-insensitive

**Example:**
```csv
Field,Value
Event Name,My Panel Event
Panel Title,Leadership in Veterinary Medicine
Panel Subtitle,"Building Trust, Culture, and Teams"
...
```

---

## Error Handling

### Common Errors and Solutions

**Error: "File validation errors: Event Name is required"**
- **Cause:** Missing required field
- **Solution:** Check template and fill in all required fields

**Error: "Failed to parse file"**
- **Cause:** Incorrect file format
- **Solution:** Use the downloaded template as a starting point

**Error: "5 discussion point(s) are empty"**
- **Cause:** Not all 5 discussion points filled
- **Solution:** Add content for all 5 discussion points

**Error: Missing colon in text file**
- **Cause:** Line doesn't have `:` separator
- **Solution:** Ensure format is `Field Name: Value`

---

## Best Practices

### 1. Always Start with a Template

- Download the official template
- Don't create files from scratch
- Templates have correct field names

### 2. Double-Check Field Names

These field names work (case-insensitive):
- ✅ `Event Name` or `Name`
- ✅ `Panel Title` or `Title`
- ✅ `Event Date Full` or `Full Date`
- ✅ `Discussion Point 1` through `Discussion Point 5`

### 3. Save Templates for Reuse

- Keep filled templates in a folder
- Use as starting point for similar events
- Update dates and details as needed

### 4. Validate Before Upload

- Check all required fields are filled
- Verify dates are correct
- Ensure 5 discussion points exist

---

## Workflow Examples

### Example 1: Quick Event Creation

```
1. Previous panel ended
2. Download .txt template
3. Copy/paste from last event
4. Update dates and discussion points
5. Upload to auto-fill
6. Create event in seconds!
```

### Example 2: Batch Event Planning

```
1. Plan multiple panels in Excel
2. Create CSV with all events
3. For each event:
   - Copy rows to new CSV
   - Upload to create event
   - Add panelists
   - Generate emails
```

### Example 3: Team Collaboration

```
1. Marketing team member fills template
2. Saves to shared drive
3. You download and upload to app
4. Event created with their data
5. No back-and-forth typing needed
```

---

## Technical Details

### What Happens When You Upload

```
1. File uploaded to browser
   ↓
2. JavaScript reads file content
   ↓
3. Parser extracts field values
   ↓
4. Validation checks all required fields
   ↓
5. Form fields populated automatically
   ↓
6. You review and click "Create"
```

**No AI or Claude involved - 100% local processing in your browser!**

### Supported File Types

- ✅ `.txt` - Plain text files
- ✅ `.csv` - Comma-separated values
- ❌ `.xlsx` - Not supported for event data (use CSV instead)
- ❌ `.docx` - Not supported (use plain text)

### File Size Limits

- Maximum: 1 MB (more than enough)
- Typical file: ~1-2 KB

---

## Troubleshooting

### Form Doesn't Fill After Upload

**Check:**
1. File is `.txt` or `.csv` format
2. Field names match template exactly
3. No special characters in field names
4. Browser console for error messages (F12)

### Some Fields Missing After Upload

**Check:**
1. Field names spelled correctly
2. Colon (`:`) or comma (`,`) separator used
3. Values not empty
4. No extra spaces in field names

### Upload Button Doesn't Work

**Check:**
1. File is selected
2. Browser allows file uploads
3. JavaScript is enabled
4. Try different browser

---

## FAQ

**Q: Can I upload Excel files?**
A: No, only `.txt` and `.csv`. Save your Excel file as CSV first.

**Q: Can I reuse templates?**
A: Yes! Save your filled templates and update them for new events.

**Q: What if I make a mistake in the uploaded file?**
A: Just edit the form after upload, or fix the file and re-upload.

**Q: Can I upload partial data?**
A: No, all required fields must be present. Missing fields cause validation errors.

**Q: Does this work offline?**
A: Yes! File processing happens entirely in your browser.

**Q: Are my files stored anywhere?**
A: No, files are read and discarded. Only the extracted data is saved to localStorage.

---

## Quick Reference

### Download Template
- Blue "Auto-Fill from File" section
- Click "Download .txt Template" or "Download .csv Template"

### Upload File
- Click "Upload Event Data"
- Select your filled template
- Review auto-filled form

### File Format
**Text:**
```
Field Name: Value
Field Name: Value
```

**CSV:**
```
Field,Value
Field Name,Value
Field Name,Value
```

---

## Support

For questions:
1. Check this guide first
2. Try the downloaded template
3. Review console errors (F12)
4. Contact your team lead

---

**Feature Status:** ✅ FULLY OPERATIONAL
**Processing:** 100% Local (no AI, no server)
**File Types:** .txt, .csv
**Max Size:** 1 MB

**Save time. Reduce errors. Upload and go!**
