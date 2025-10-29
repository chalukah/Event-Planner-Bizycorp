# Panel Event Data Import Guide

## Overview
Stop typing event details manually! The VBI Panel Event Management system supports **automatic data import** from text files, allowing you to prepare event details in advance and import them instantly.

---

## 🚀 Quick Start

### Step 1: Download Template
1. Open the web app at http://localhost:3000
2. Click "Create New Event"
3. Look for the **"Download Template"** buttons
4. Click **"Download .txt Template"**

### Step 2: Fill In Template
1. Open the downloaded `panel_event_template.txt` file
2. Replace the placeholder text with your event details
3. Save the file

### Step 3: Import
1. In the "Create New Event" screen
2. Click **"Upload Event Data File"** button
3. Select your filled template file
4. **Boom!** All fields auto-filled instantly

### Step 4: Review & Create
1. Review the auto-filled data
2. Make any adjustments if needed
3. Click "Create Event"
4. Done! 🎉

---

## 📄 Supported File Formats

### 1. Structured Text Format (.txt)
**Best for**: When you want clear, labeled fields

```
Event Name: October 2025 Workforce Crisis Panel
Panel Title: Veterinary Talent Solutions Panel
Panel Subtitle: Real Strategies to Recruit, Retain, and Rebuild
Panel Purpose: This webinar is designed to help veterinary practice owners...
Event Date: 2025-10-29
Event Date Full: Tuesday, October 29, 2025
Event Date Short: Oct 29
Event Date Minus 1: October 28, 2025
Brief Topic Description: Join us for an expert panel discussion...
Discussion Point 1: How to attract top veterinary talent
Discussion Point 2: Proven retention strategies beyond compensation
Discussion Point 3: Building a positive workplace culture
Discussion Point 4: Effective onboarding processes
Discussion Point 5: Leveraging technology and flexible work arrangements
```

**Features**:
✅ Clear field labels
✅ Easy to read and edit
✅ Comments supported (lines starting with #)
✅ 100% reliable parsing

---

### 2. Unstructured Text Format (.txt)
**Best for**: Copy-pasting from emails, briefs, or documents

```
Hey team,

I'm planning our next panel event for December 10, 2025.

Topic: Financial Management for Veterinary Practices

This webinar is designed to help veterinary practice owners master
strategic financial planning and make data-driven decisions.

What You'll Learn:
- Understanding key financial metrics
- Cash flow optimization strategies
- Profitability analysis techniques
- Strategic pricing approaches
- Financial forecasting for growth
```

**Features**:
✅ Copy text from anywhere (emails, docs, Slack)
✅ Smart parser extracts key information
✅ Works with natural language
✅ May require manual review for ambiguous fields

---

### 3. CSV Format (.csv)
**Best for**: Batch processing or spreadsheet workflows

```csv
Field,Value
Event Name,October 2025 Workforce Crisis Panel
Panel Title,Veterinary Talent Solutions Panel
Panel Subtitle,Real Strategies to Recruit Retain and Rebuild
Panel Purpose,This webinar is designed to help...
Event Date,2025-10-29
...
```

**Features**:
✅ Spreadsheet compatible
✅ Easy to generate programmatically
✅ Good for bulk operations

---

## 📋 Field Reference

### Required Fields

| Field Name | Format | Example | Description |
|------------|--------|---------|-------------|
| **Event Name** | Text | "October 2025 Workforce Crisis Panel" | Internal name for the event |
| **Panel Title** | Text | "Veterinary Talent Solutions Panel" | Main event title (used in emails) |
| **Panel Subtitle** | Text | "Real Strategies to Recruit, Retain..." | Tagline or subtitle |
| **Panel Purpose** | Text (2-3 sentences) | "This webinar is designed to help..." | What attendees will learn |
| **Event Date** | YYYY-MM-DD | "2025-10-29" | ISO format date |
| **Event Date Full** | Full date | "Tuesday, October 29, 2025" | Full date with day of week |
| **Event Date Short** | Short date | "Oct 29" | Abbreviated date |
| **Event Date Minus 1** | Full date | "October 28, 2025" | Day before event (for Sri Lanka timezone) |
| **Brief Topic Description** | Text (1 sentence) | "Join us for an expert panel..." | Short promotional description |
| **Discussion Point 1-5** | Text | "How to attract top talent..." | Exactly 5 discussion points required |

---

## 💡 Template Files Provided

We've created **4 ready-to-use templates** in the `Templates/` folder:

### 1. `PANEL_EVENT_TEMPLATE.txt` ⭐
**The main template with detailed instructions**
- All fields clearly labeled
- Includes helpful comments and notes
- Best for first-time users

### 2. `PANEL_EVENT_EXAMPLE_NOVEMBER.txt`
**Complete example with real data**
- November 2025 Marketing Excellence Panel
- Shows exactly how to fill each field
- Copy and modify for your own event

### 3. `PANEL_EVENT_QUICK_FORMAT.txt`
**Minimal template for speed**
- Just the essentials
- No extra comments
- Best for experienced users

### 4. `PANEL_EVENT_UNSTRUCTURED_EXAMPLE.txt`
**Example of casual format**
- Shows how unstructured text is parsed
- Copy-paste friendly
- Good for extracting from emails

---

## 🎯 Smart Parsing Features

### Automatic Date Extraction
The parser automatically handles:
- ISO dates (2025-10-29)
- Full dates (Tuesday, October 29, 2025)
- Partial dates (Oct 29, October 29)
- Dates in sentences ("The event is on October 29, 2025")

### Flexible Field Matching
Works with variations like:
- "Topic:" or "Webinar Topic:" or "Panel Topic:"
- "Date:" or "Event Date:" or "Date & Time:"
- "What You'll Learn" or "Key Takeaways" or "Discussion Points"

### Bullet Point Recognition
Automatically extracts bullet points as discussion points:
```
What You'll Learn:
- First point here
- Second point here
▪️ Third point here (emoji bullets work!)
• Fourth point here
- Fifth point here
```

---

## 🔄 Import Methods

### Method 1: File Upload (Recommended)
1. Click "Upload Event Data File" button
2. Select your .txt or .csv file
3. Data auto-fills instantly
4. Review and create

**Pros**: ✅ Fast, ✅ Reliable, ✅ No copy-paste errors

---

### Method 2: Paste Text
1. Look for "Or paste event details" section
2. Copy text from email/doc/brief
3. Paste into the text area
4. Click "Parse & Fill Form"
5. Review extracted data

**Pros**: ✅ No file needed, ✅ Works with any source text

---

### Method 3: Manual Entry
1. Fill each field by hand
2. Use the form like normal

**Pros**: ✅ Maximum control

**Cons**: ❌ Time-consuming, ❌ Repetitive

---

## 📝 Best Practices

### Creating Templates

1. **Use Descriptive Names**
   ```
   ✅ Event Name: October 2025 Workforce Crisis Panel
   ❌ Event Name: Panel 1
   ```

2. **Write Clear Panel Purposes**
   ```
   ✅ "This webinar is designed to help veterinary practice owners overcome workforce challenges by learning proven recruitment strategies..."
   ❌ "About recruitment stuff"
   ```

3. **Make Discussion Points Specific**
   ```
   ✅ "How to attract top veterinary talent in a competitive market"
   ❌ "Talent stuff"
   ```

4. **Include Full Date Information**
   ```
   ✅ Event Date Full: Tuesday, October 29, 2025
   ❌ Event Date Full: 10/29/25
   ```

---

### Organizing Templates

**Create a template library**:
```
Templates/
├── Panel_Events/
│   ├── 2025_Q4_Workforce_Crisis.txt
│   ├── 2025_Q4_Marketing_Excellence.txt
│   ├── 2025_Q4_Financial_Mastery.txt
│   └── 2025_Q4_Leadership_Development.txt
```

**Benefits**:
- Reuse successful event structures
- Maintain consistency
- Plan events in advance
- Share templates with team

---

## ⚠️ Common Issues & Solutions

### Issue: "File validation errors"

**Cause**: Missing required fields

**Solution**:
1. Check the error message for specific missing fields
2. Add the missing information
3. Re-upload

**Example**:
```
❌ Error: "Missing: Panel Title, Event Date"
✅ Fix: Add these lines to your template:
   Panel Title: [Your Title Here]
   Event Date: 2025-10-29
```

---

### Issue: "Could not identify enough details"

**Cause**: Unstructured text doesn't have recognizable patterns

**Solution**:
1. Add clear labels like "Topic:", "Date:", "Discussion Points:"
2. OR use the structured template format instead
3. OR manually fill missing fields after import

**Example**:
```
❌ Ambiguous:
   "We're doing a panel about workforce stuff sometime in October"

✅ Clear:
   "Topic: Veterinary Workforce Crisis
    Date: October 29, 2025
    Discussion Points:
    - Recruitment strategies
    - Retention techniques"
```

---

### Issue: Discussion points not extracted

**Cause**: Bullet points not recognized or less than 5 points

**Solution**:
```
✅ Use clear bullet format:
   Discussion Point 1: First point
   Discussion Point 2: Second point
   Discussion Point 3: Third point
   Discussion Point 4: Fourth point
   Discussion Point 5: Fifth point

OR

What You'll Learn:
- First point
- Second point
- Third point
- Fourth point
- Fifth point
```

---

## 🎓 Advanced Tips

### Tip 1: Reuse Past Events
1. Export an existing event (if feature available)
2. Modify dates and details
3. Import as new event
4. Save time on similar events

### Tip 2: Batch Preparation
1. Create 4-5 event templates in advance
2. Store in Templates folder
3. Import one per week/month
4. Streamline your workflow

### Tip 3: Team Collaboration
1. Share template files via Google Drive/Dropbox
2. Team members can prep event details
3. You import and finalize
4. Parallel workflow = faster execution

### Tip 4: Version Control
```
Templates/
├── Workforce_Crisis_v1.txt (original)
├── Workforce_Crisis_v2.txt (updated dates)
├── Workforce_Crisis_FINAL.txt (approved)
```

---

## 📊 Template Field Quick Reference

```
# Copy this checklist when creating templates

Event Metadata:
[ ] Event Name
[ ] Panel Title
[ ] Panel Subtitle
[ ] Panel Purpose

Dates:
[ ] Event Date (YYYY-MM-DD)
[ ] Event Date Full (Day, Month DD, YYYY)
[ ] Event Date Short (Mon DD)
[ ] Event Date Minus 1 (Month DD, YYYY)

Content:
[ ] Brief Topic Description
[ ] Discussion Point 1
[ ] Discussion Point 2
[ ] Discussion Point 3
[ ] Discussion Point 4
[ ] Discussion Point 5
```

---

## 🔗 Related Features

After importing event data, you'll typically:

1. **Import Panelists** (separate CSV import)
2. **Generate Emails** (16 templates auto-generated)
3. **Create Graphics** (banners and posters)
4. **Track Checklist** (140+ tasks)
5. **Monitor Registrations** (ICP classification)

Each of these has its own import/automation features!

---

## 💬 Need Help?

### In the App
- Click the **"i"** icon next to field labels for hints
- Hover over buttons for tooltips
- Check validation messages for specific requirements

### Templates Provided
- Located in `Templates/` folder
- 4 examples covering different use cases
- Copy, modify, and reuse

### Documentation
- This guide: `Documents/EVENT_DATA_IMPORT_GUIDE.md`
- Main README: `README.md`
- VBI Guide: `Documents/VBI_Panel_Complete_Automation_Guide.md`

---

## 🎉 Success Story

**Before**: Creating a new panel event took 15-20 minutes of typing, with frequent typos in dates and discussion points.

**After**: With template import:
1. Fill template in 5 minutes ✅
2. Upload file (2 seconds) ✅
3. Review and create (30 seconds) ✅

**Total time: ~6 minutes** (60% time savings!)

**Bonus**: No typos, consistent formatting, reusable templates.

---

## 📅 Workflow Example

### Week 1: Plan Q4 Events
```bash
# Create templates for all Q4 events
Templates/2025_Q4_Workforce_Crisis.txt
Templates/2025_Q4_Marketing_Excellence.txt
Templates/2025_Q4_Financial_Mastery.txt
Templates/2025_Q4_Leadership_Development.txt
```

### Week 4: Launch October Event
```bash
# Import October event
1. Open app → Create New Event
2. Upload: 2025_Q4_Workforce_Crisis.txt
3. Review → Create Event
4. Import panelists CSV
5. Generate all emails
6. Done in 10 minutes!
```

### Week 8: Launch November Event
```bash
# Import November event
1. Upload: 2025_Q4_Marketing_Excellence.txt
2. Repeat process
3. Muscle memory kicks in = even faster!
```

---

## ✅ Checklist: Your First Import

Follow this checklist for your first successful import:

- [ ] Downloaded a template from the app OR copied from `Templates/` folder
- [ ] Filled in all required fields
- [ ] Verified dates are in correct formats
- [ ] Added exactly 5 discussion points
- [ ] Saved the file with a descriptive name
- [ ] Opened the Create New Event screen
- [ ] Clicked "Upload Event Data File"
- [ ] Selected your filled template
- [ ] Reviewed the auto-filled data (looks good!)
- [ ] Fixed any missing/incorrect fields
- [ ] Clicked "Create Event"
- [ ] 🎉 Success! Event created!

---

## 🚀 Next Steps

Now that you can import event data instantly:

1. **Import Panelists**: Use the CSV import for panelist data
2. **Generate Emails**: One click to generate all 16 emails
3. **Create Graphics**: Auto-generate banners and posters
4. **Use VBI Agents**: Try `/vbi` for intelligent guidance

**You're now equipped to create panel events 10x faster!** 🎯
