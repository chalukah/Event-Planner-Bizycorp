# 🚀 Enhanced Panel Event Automation System
## With Promotional Banner & Poster Generation

---

## 📍 LOCATION
Everything is saved in: `C:\Users\Bizycorp_Work\Documents\CLaude Vet`

---

## ⚡ QUICK START (3 Steps)

### 1️⃣ Edit Your Event Details

Open `event_config.json` in Notepad or any text editor and fill in:
- Event date (format: DD_MM_YYYY, e.g., 22_10_2025)
- Panel topic and type
- 2-4 panelists with their information

### 2️⃣ Run the Creator

**Option A:** Double-click `RUN_ME.bat`

**Option B:** Open Command Prompt in this folder and run:
```
python create_panel_event.py
```

### 3️⃣ Done!

Your complete event package will be created in:
```
Panel_Events\[Date]_-_[Your_Panel_Topic]\
```

---

## 📦 WHAT GETS CREATED

### Complete Folder Structure:
```
Panel_Events\
├── Master_Panel_Tracker.xlsx          ← Tracking spreadsheet
│
└── 22_10_2025_-_Your_Panel_Topic\
    │
    ├── Banners_Posters\               ← NEW! Promotional graphics
    │   ├── Event_Poster_Oct_22_2025.png
    │   ├── Panelist_1_Banner_webinar.png
    │   ├── Panelist_1_Banner_social.png
    │   ├── Panelist_1_Banner_email_header.png
    │   └── ... (3 banners per panelist)
    │
    ├── Email_Communications\
    │   ├── Invitation_Email_Template.docx
    │   ├── 1st_Followup_Email.docx
    │   └── 2nd_Followup_Email.docx
    │
    ├── Promotional_Materials\
    │   ├── Panelist_1_Promotional_Materials.docx
    │   └── Panelist_2_Promotional_Materials.docx
    │
    ├── Panel_Questions\
    │   ├── Panelist_1_Questions.docx
    │   └── Panelist_2_Questions.docx
    │
    ├── Partner_Details\
    │   └── Partner_Details_Zoom_Landing_Page.docx
    │
    ├── Presentations\               ← For your PowerPoint files
    │
    └── Reports\
```

---

## 🎨 NEW FEATURES

### Promotional Banners (3 sizes per panelist):
- ✅ **Webinar Banner** (1920x400) - For event registration pages
- ✅ **Social Media** (1200x630) - For LinkedIn, Twitter, Facebook
- ✅ **Email Header** (600x200) - For email campaigns

### Main Event Poster:
- ✅ Full event poster with all panelists
- ✅ Professional design with event details
- ✅ Ready for social media and print

---

## 📋 CONFIG FILE FORMAT

Your `event_config.json` should look like this:

```json
{
  "event_date": "22_10_2025",           ← DD_MM_YYYY format
  "panel_topic": "Your Panel Title",     ← Full title
  "panel_type": "Technology",            ← Panel category
  
  "panelists": [                         ← 2-4 panelists
    {
      "name": "Full Name",
      "first_name": "First",
      "email": "email@example.com",
      "phone": "555-1234",
      "role": "Professional Title",
      "company": "Company Name",
      "website": "https://website.com",
      "linkedin": "https://linkedin.com/in/profile",
      "linkedin_followers": 5000,
      "expertise": "Area of expertise",
      "bio": "Professional bio paragraph..."
    }
  ],
  
  "event_details": {
    "time": "2:00 PM EST",
    "duration": "60 minutes",
    "description": "Event description...",
    "key_topics": "• Topic 1\n• Topic 2",
    "takeaways": "• Takeaway 1\n• Takeaway 2",
    "questions": [
      "Question 1?",
      "Question 2?",
      "Question 3?",
      "Question 4?",
      "Question 5?"
    ]
  }
}
```

---

## 🔧 REQUIREMENTS

### Python Packages (auto-installed):
- openpyxl (for Excel files)
- python-docx (for Word documents)
- Pillow (for banner generation)

The script will automatically install these if missing.

---

## 📤 UPLOAD TO GOOGLE DRIVE

After generation:

1. **Open Google Drive** (drive.google.com)
2. **Navigate to your VET folder**
3. **Drag and drop** the event folder from:
   ```
   C:\Users\Bizycorp_Work\Documents\CLaude Vet\Panel_Events\[Event Folder]
   ```
4. **Upload** to your online drive structure

### For the Spreadsheet:
1. Upload `Master_Panel_Tracker.xlsx` to Google Drive
2. Right-click → "Open with" → "Google Sheets"
3. Now you can edit online and share with team

---

## 💡 TIPS

### Creating Multiple Events:
1. Edit `event_config.json` with new event details
2. Run the script again
3. Each event gets its own folder!

### Customizing Banners:
- Generated banners are PNG images
- Edit them in Photoshop, Canva, or any image editor
- Original teal color (#1a8a9f) matches your brand

### Panelist Count:
- **Minimum:** 2 panelists
- **Maximum:** 4 panelists (recommended)
- More than 4 will work but may look crowded

---

## 🆘 TROUBLESHOOTING

### "python is not recognized"
→ Install Python from python.org
→ Make sure to check "Add Python to PATH"

### "No module named..."
→ The script auto-installs packages
→ Or manually run: `pip install openpyxl python-docx Pillow`

### Banner Generation Failed
→ Banners require Pillow library
→ Run: `pip install Pillow`

### Date Format Error
→ Use DD_MM_YYYY format (e.g., 22_10_2025)
→ NOT: 22-10-2025 or 10/22/2025

---

## 📊 TIME SAVED

**Manual Method:** ~3 hours per event  
**Automated Method:** ~10 minutes per event  
**Time Saved:** ~2 hours 50 minutes per event!

---

## 🔒 PRIVACY

✅ Everything runs **locally** on your computer  
✅ **No data uploaded** anywhere automatically  
✅ **You control** what goes to Google Drive  
✅ Completely **private and secure**  

---

## 📞 FILES IN THIS FOLDER

- **enhanced_panel_automation.py** - Main automation engine
- **create_panel_event.py** - Easy runner script
- **event_config.json** - Your event data (edit this!)
- **RUN_ME.bat** - Quick launcher (double-click)
- **README.md** - This file

---

## ✨ WHAT'S NEW

### vs. Basic Version:
- ✅ Promotional banner generation (3 sizes)
- ✅ Main event poster with all panelists
- ✅ Banners_Posters subfolder
- ✅ Works directly in your Windows path
- ✅ MCP filesystem integration

---

## 🎉 YOU'RE READY!

1. Edit `event_config.json`
2. Double-click `RUN_ME.bat` (or run `python create_panel_event.py`)
3. Find your complete event package in `Panel_Events\`
4. Upload to Google Drive when ready

**Happy Automating! 🚀**

---

*Location: C:\Users\Bizycorp_Work\Documents\CLaude Vet*
