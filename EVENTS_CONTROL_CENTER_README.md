# Events Control Center

A modern, accessible web application for managing event communications and templates. Built with React, TypeScript, Tailwind CSS, and Zustand.

## Features

### 🎯 Three Main Workspaces

1. **Event Checklist** - Embed and interact with Google Sheets for event planning
2. **Panel Events** - Manage date-based event templates with a powerful editor
3. **Event Management Checklist** - Additional Google Sheet integration for management tasks

### 📝 Template Management

- **16 Pre-built Templates** per date group:
  - Invite, Reminder 1, Reminder 2
  - Speaker Brief, Moderator Brief
  - Panel Logistics, Registration emails
  - And more...

- **Rich Text Editor**:
  - HTML and Markdown support
  - Live preview pane
  - Formatting toolbar (bold, italic, headings, lists, links)
  - Merge tags for dynamic content
  - Autosave (1.2s debounce)
  - Split/editor/preview view modes

- **Merge Tags**:
  - `{{EventName}}`, `{{EventDate}}`, `{{StartTime}}`, `{{EndTime}}`
  - `{{Venue}}`, `{{JoinLink}}`, `{{SpeakerName}}`, `{{ModeratorName}}`
  - `{{RSVPLink}}`, `{{ContactEmail}}`, `{{OrganizerName}}`

### 💾 Data Management

- **Export/Import**:
  - Single template export (JSON)
  - Full date group export (JSON)
  - Complete workspace export (JSON)
  - Import with replace or merge modes

- **Copy Functions**:
  - Copy individual templates
  - Copy all 16 templates (with dividers)
  - Download as .txt file
  - Clipboard fallback for restricted environments

- **Persistence**:
  - LocalStorage for all data
  - Survives page refreshes
  - Versioned storage for migrations

### 🎨 User Experience

- **Dark Mode**: System/Light/Dark theme support
- **Keyboard Shortcuts**:
  - `Ctrl/Cmd + K` - Global search
  - `Ctrl/Cmd + S` - Save template
  - `Ctrl/Cmd + B` - Toggle sidebar
  - `F2` - Rename (when focused)
  - `Delete` - Delete (with confirmation)

- **Accessibility**:
  - WCAG 2.1 AA compliant
  - Keyboard-first navigation
  - Screen reader labels
  - Skip to content link
  - Focus indicators
  - Reduced motion support

- **Responsive Design**:
  - Desktop-optimized layout
  - Collapsible sidebar
  - Mobile-friendly (sidebar becomes drawer)

### 🔍 Search

- Global search across all dates, templates, and content
- Keyboard navigable results
- Quick navigation to any item

### 🖨️ Print Support

- Clean print styles
- Page breaks between templates
- Template divider headings

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm or yarn

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Setting Up Google Sheets

1. Navigate to either "Event Checklist" or "Event Management Checklist" tab
2. Click the "Set Sheet URL" button (or gear icon)
3. Enter your Google Sheet URL
4. For embedded viewing, ensure your Google Sheet is:
   - Published to web, OR
   - Shared with "Anyone with the link can view"

**Recommended Google Sheet URL format:**
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit?usp=sharing
```

### Working with Panel Events

1. Click "New Date" in the sidebar
2. Enter a date (e.g., `2025-11-15`)
3. Select the date from the sidebar
4. Choose from 16 pre-filled templates
5. Edit content in the editor
6. Toggle between HTML/Markdown mode
7. Use merge tags for dynamic content
8. Preview updates in real-time
9. Templates autosave after 1.2 seconds

### Organizing Templates

- **Rename**: Double-click tab or right-click date
- **Duplicate**: Right-click date → Duplicate
- **Delete**: Right-click date → Delete (with confirmation)
- **Export**: Right-click date → Export (saves JSON)
- **Import**: Upload JSON to replace or merge templates

### Keyboard Navigation

- Arrow keys to navigate sidebar items
- Tab to move between interactive elements
- Enter to select/activate
- Escape to close modals/dialogs

## Project Structure

```
src/
  main.tsx                 # Entry point
  App.tsx                  # Main app component
  store.ts                 # Zustand store
  index.css                # Global styles

  components/
    Topbar.tsx             # Top navigation bar
    Sidebar.tsx            # Left navigation sidebar
    SheetEmbed.tsx         # Google Sheets iframe
    PanelEvents.tsx        # Panel Events workspace
    TemplateEditor.tsx     # Rich text editor
    PreviewPane.tsx        # Live preview
    MergeTagsPanel.tsx     # Merge tags list
    SearchModal.tsx        # Global search
    Toast.tsx              # Toast notifications
    ConfirmDialog.tsx      # Confirmation dialogs
    ThemeToggle.tsx        # Theme switcher
    SplitPane.tsx          # Resizable split panels

  utils/
    clipboard.ts           # Copy utilities
    download.ts            # Download utilities
    json.ts                # JSON validation
    defaults.ts            # Default templates
```

## Data Storage

All data is stored in browser LocalStorage:

- `ecc:store` - Main application state
- `ecc:eventChecklistSheetUrl` - Event checklist sheet URL
- `ecc:eventManagementSheetUrl` - Management sheet URL
- `ecc:version` - Storage version for migrations

**Note**: Clearing browser data will erase all templates and settings. Export regularly to backup your work.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Customization

### Adding New Merge Tags

Edit `src/components/MergeTagsPanel.tsx`:

```typescript
const MERGE_TAGS = [
  { label: 'Your Label', tag: '{{YourTag}}' },
  // ...
];
```

### Changing Default Templates

Edit `src/utils/defaults.ts`:

```typescript
const DEFAULT_CONTENTS: Record<string, string> = {
  'Template Name': `Your content here`,
  // ...
};
```

### Theme Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --bg: 255 255 255;
  --fg: 15 23 42;
  --accent: 59 130 246;
  /* ... */
}
```

## Troubleshooting

### Google Sheets Not Loading

- Ensure the sheet is shared publicly or with "Anyone with the link"
- Check browser console for iframe errors
- Try using the sheet's "Published to web" URL

### Templates Not Saving

- Check browser console for errors
- Ensure LocalStorage is enabled
- Try clearing browser cache and refreshing

### Dark Mode Not Working

- Check browser compatibility
- Clear LocalStorage and try again
- Ensure system theme detection is supported

## License

MIT License - feel free to use this for any purpose.

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues or questions:
- Check the browser console for errors
- Review this README
- Open an issue on GitHub (if hosted)

---

**Built with** React • TypeScript • Tailwind CSS • Zustand • Lucide Icons

Made with ❤️ for event organizers everywhere.
