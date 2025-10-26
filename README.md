# VBI Panel Email Generator

**A specialized web application for automating Veterinary Business Institute panel event emails**

**Last Updated:** October 24, 2025

---

## Overview

The VBI Panel Email Generator is a React-based web application that automates the creation of personalized emails for VBI panel events. This system replaces the manual email creation process with an intelligent, template-based generator that handles variable replacement, conditional content, and multi-panelist support.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open http://localhost:5173 in your browser.

### NEW: Spreadsheet Integration

The app now includes **Event Checklist** and **Event Panel Tracker** tabs in the sidebar:

- **Event Checklist:** Upload and manage 140+ tasks across 5 event phases
- **Event Panel Tracker:** Track registrations, ICP status, and MSM conversions

See `SPREADSHEET_INTEGRATION_GUIDE.md` for complete documentation.

---

## 📁 PROJECT STRUCTURE

```
CLaude Vet/
├── src/                                  # Application source code
│   ├── components/                       # React UI components
│   │   ├── PanelEventCreator.tsx        # Create new panel events
│   │   ├── PanelistImporter.tsx         # Import panelists from CSV/Sheets
│   │   ├── PanelEventsList.tsx          # Sidebar list of events
│   │   ├── EmailGenerator.tsx           # Generate emails UI
│   │   ├── EmailsList.tsx               # List of generated emails
│   │   ├── EmailViewer.tsx              # View/edit/copy emails
│   │   └── PostEventDataEditor.tsx      # Add post-event data
│   ├── data/
│   │   └── emailTemplates.ts            # All 16 email templates
│   ├── utils/
│   │   ├── templateEngine.ts            # Variable replacement logic
│   │   ├── csvImport.ts                 # CSV parsing
│   │   ├── googleSheetsAPI.ts           # Google Sheets integration
│   │   ├── clipboard.ts                 # Copy utilities
│   │   └── download.ts                  # Download utilities
│   ├── testData/
│   │   └── oct29EventData.ts            # OCT 29 test data
│   ├── types.ts                         # TypeScript definitions
│   ├── panelStore.ts                    # State management
│   ├── App.tsx                          # Main application
│   └── index.css                        # Global styles
├── Documents/                            # Reference documentation
│   ├── Everything_about_panels.md       # Original templates
│   ├── VBI_Panel_Complete_Automation_Guide.md
│   └── [Other reference files]
├── PANEL EMAIL TEMPLATES/               # Original email templates
├── OCT 29 Panel Event/                  # Reference event example
├── package.json                         # Dependencies
├── vite.config.ts                       # Vite configuration
└── README.md                            # This file
```

---

## Key Features

### 16 Automated Email Templates

The system includes all VBI panel email templates:

1. **E-22** - Initial Invitation
2. **E-20** - Follow-up
3. **E-13** - Confirmation
4. **E-10** - Promo Materials
5. **E-10** - Questions (5 custom per panelist)
6. **E-6** - Boost Registrations
7. **E-5** - Help Reach More
8. **E-4** - 3 Days Reminder
9. **E-2** - Tomorrow Panel
10. **E-1** - Today is Day
11. **E-DAY** - Starting in 2 Hours
12. **E-DAY** - Starting Now
13. **E+1** - Thank You (with conditional sections)
14. **POST** - Lead Report
15. **POST** - Thank You to Panelists
16. **POST** - Thank You to Registrants

### Smart Variable Replacement

All `[VARIABLES]` in templates are automatically replaced:
- `[PANEL_TITLE]` → Actual panel title
- `[PANELIST_FIRST_NAME]` → Panelist's first name
- `[QUESTION_1]` through `[QUESTION_5]` → Custom questions
- `[REGISTRATION_COUNT]` → Actual registration count
- `[RECORDING_LINK]` → Post-event recording URL
- And 30+ more variables

### Conditional Content

E+1 Thank You emails automatically include/exclude sections:
- **10+ registrations** → Includes attendee list link
- **25+ registrations** → Includes podcast qualification message

### Multi-Panelist Support

Works with any number of panelists (2, 3, 4+):
- Each panelist gets personalized emails
- Unique Zoom links, tracking links, questions
- Bulk generate all emails with one click

### Copy to Outlook

One-click copy of formatted HTML:
- Preserves all formatting
- Paste directly into Outlook (Ctrl+V)
- No manual editing needed

## Workflow

### 1. Create Panel Event

Click "New Panel Event" and enter:
- Event name and panel title
- Panel subtitle and purpose
- Event dates (full date, short date, minus 1)
- 5 discussion points
- Brief topic description

### 2. Import Panelists

Choose your import method:

**Option A: CSV Upload**
1. Download CSV template
2. Fill in: first name, full name, email, zoom link, tracking link, promo link, banner link, 5 questions
3. Upload the CSV file

**Option B: Google Sheets**
1. Set up Google Sheets API credentials (see in-app instructions)
2. Create spreadsheet with same structure as CSV
3. Paste Google Sheets URL and import

### 3. Generate Emails

Click "Generate Emails" to:
- Create all 16 templates for each panelist
- Replace all variables automatically
- Preview total email count

### 4. View and Send Emails

For each email:
- Click to view in preview or HTML source mode
- Edit HTML if needed
- Click "Copy HTML for Outlook"
- Open Outlook, create new email
- Paste (Ctrl+V) - formatting preserved
- Add recipients and send

### 5. Add Post-Event Data (Optional)

After the panel:
1. Click "Post-Event Data" button
2. Add recording link
3. Enter registration counts per panelist
4. Add attendee list links (for 10+ registrations)
5. Write contribution summaries
6. Click "Save and Regenerate Thank You Emails"

System will automatically regenerate E+1 emails with conditional sections.

---

## Technology Stack

- **React 18.2.0** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive styling with dark mode
- **Zustand** for state management with localStorage persistence
- **Lucide React** for beautiful icons
- **react-markdown** with remark-gfm for markdown rendering

## Data Persistence

All data is saved automatically to browser localStorage:
- Panel events
- Panelists
- Generated emails
- Post-event data

Data persists across browser sessions.

## Test Data

The app includes complete test data from OCT 29 Panel Event:

**Event:** Veterinary Talent Solutions Panel - "The Workforce Crisis"

**Panelists:**
- Keith True (47 registrations - podcast qualified)
- Charlotte Weir (32 registrations - gets attendee list)

To use test data:
1. Open browser console
2. Run: `localStorage.clear()` to reset
3. Restart the app
4. Create new event and import panelists using test data

## Browser Support

Tested and supported:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

WCAG 2.1 AA compliant:
- Full keyboard navigation
- Screen reader support
- Proper ARIA labels
- Focus indicators
- Skip to main content link

## Dark Mode

Three theme modes available:
- System (follows OS preference)
- Light
- Dark

Toggle via button in top-right corner.

## Documentation

| File | Purpose |
|------|---------|
| `README.md` | This file - quick start and overview |
| `VBI_PANEL_EMAIL_GENERATOR_GUIDE.md` | Detailed user guide |
| `IMPLEMENTATION_STATUS.md` | Technical implementation details |
| `FINAL_SUMMARY.md` | Executive summary |
| `EXAMPLE_COMPONENT_USAGE.tsx` | Code examples |

## Common Tasks

### Adding a New Email Template

1. Open `src/data/emailTemplates.ts`
2. Add new template object to `EMAIL_TEMPLATES` array
3. Include all required fields (id, code, name, sender, timing, perPanelist, template)
4. Use `[VARIABLE]` syntax for replaceable content

### Adding a New Variable

1. Open `src/utils/templateEngine.ts`
2. Add variable to `replaceVariables()` function
3. Map to appropriate event or panelist data
4. Document in user guide

### Customizing Email Styles

1. Edit HTML in `src/data/emailTemplates.ts`
2. Use inline styles for email client compatibility
3. Test in preview mode

## Troubleshooting

**Emails not generating:**
- Check that panelists are imported
- Verify event data is complete
- Check browser console for errors

**Variables not replaced:**
- Ensure variable name matches exactly (case-sensitive)
- Check spelling in template
- Verify data exists in event/panelist object

**Copy to Outlook not working:**
- Try HTML source mode instead of preview
- Check clipboard permissions in browser
- Use download option as fallback

**Google Sheets import fails:**
- Verify API credentials are configured
- Check spreadsheet URL is correct
- Ensure spreadsheet is shared publicly or with your account
- Use CSV import as alternative

## Future Enhancements

Potential features for development:
- Email scheduling system
- Bulk send integration
- Analytics dashboard
- Email template editor UI
- Export to PDF
- Multi-client preview
- Automated registration tracking
- Integration with Zoom API
- Email performance metrics

## Support

For questions or issues:
- Review documentation files listed above
- Check OCT 29 Panel Event folder for examples
- Contact VBI email team

## License

Internal use for Veterinary Business Institute (VBI).

---

**Built for VBI panel event coordinators to simplify email generation and improve efficiency.**
#   E v e n t - P l a n n e r - B i z y c o r p  
 