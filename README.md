# VBI Panel Email Generator

Purpose-built control center for the Veterinary Business Institute (VBI) to automate panel-event communications, streamline task execution, and maintain a single source of truth for event operations.

> Built with React, TypeScript, Vite, Tailwind CSS, and Zustand state management.

---

## Why It Matters

- Replace error-prone manual email prep with a library of 16 production-ready templates.
- Personalize messaging instantly with 30+ event and panelist variables.
- Coordinate logistics at scale through the Event Checklist and Panel Tracker spreadsheets.
- Produce Outlook-ready HTML and downloadable archives in one click.
- Maintain institutional knowledge with a curated documentation hub for panel teams.

---

## Architecture At A Glance

- **Frontend:** React 18 + TypeScript running on the Vite toolchain for fast local feedback.
- **State Management:** Zustand store (`src/panelStore.ts`) orchestrates event, panelist, and template state.
- **Template Engine:** `src/utils/templateEngine.ts` resolves merge fields and conditional content logic.
- **Data Utilities:** CSV imports, Google Sheets integration, clipboard helpers, and download utilities live under `src/utils/`.
- **Styling:** Tailwind CSS with PostCSS and Autoprefixer, plus inline styles optimized for email clients.
- **Build & Quality:** TypeScript for static typing, ESLint for code quality, and Vite bundling for production.

---

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

```bash
npm install
npm run dev
```

Open http://localhost:5173 to launch the development server.

### Production Build & Verification

```bash
npm run build   # Type checks and builds the production bundle
npm run preview # Serves the built assets locally
npm run lint    # Static analysis for TS/TSX files
```

---

## Operating Workflow

1. **Create an Event:** Use `PanelEventCreator` to define event metadata, agendas, and key links.
2. **Import Panelists:** Upload CSV files or connect Google Sheets through `PanelistImporter` for enriched panelist data.
3. **Review Templates:** Preview all 16 emails, edit contextual details, and confirm conditional sections before distribution.
4. **Generate Output:** Copy HTML directly into Outlook, download bundled packages, or export for archival needs.
5. **Track Outcomes:** Capture registration counts, MSM conversions, and post-event insights within the Post Event suite.

Tip: Reset the demo data via the browser console (`localStorage.clear()`) before walking through the included OCT 29 sample event.

---

## Spreadsheet Toolkit

- **Event Checklist Tab:** Manage 140+ operational tasks across five lifecycle stages, track owners and due dates, and surface blockers early.
- **Panel Tracker Tab:** Monitor confirmations, ICP fit, customer status, and conversion metrics in real time.

Detailed setup and maintenance instructions live in `SPREADSHEET_INTEGRATION_GUIDE.md`.

---

## Project Structure

```text
CLaude Vet/
|-- src/
|   |-- App.tsx
|   |-- index.css
|   |-- panelStore.ts
|   |-- types.ts
|   |-- components/
|   |   |-- PanelEventCreator.tsx
|   |   |-- PanelistImporter.tsx
|   |   |-- PanelEventsList.tsx
|   |   |-- EmailGenerator.tsx
|   |   |-- EmailViewer.tsx
|   |   |-- PostEventDataEditor.tsx
|   |-- data/
|   |   |-- emailTemplates.ts
|   |   |-- testData/
|   |       |-- oct29EventData.ts
|   |-- utils/
|       |-- templateEngine.ts
|       |-- csvImport.ts
|       |-- googleSheetsAPI.ts
|       |-- clipboard.ts
|       |-- download.ts
|-- Documents/                 # Program playbooks and historical references
|-- Templates/                 # Source email templates and legacy assets
|-- package.json
|-- vite.config.ts
|-- README.md
```

---

## Reference Documentation

| File | Focus |
| ---- | ----- |
| `VBI_PANEL_EMAIL_GENERATOR_GUIDE.md` | Product walkthrough, admin workflows, and feature deep dives |
| `IMPLEMENTATION_STATUS.md` | Technical design decisions, outstanding work, and release notes |
| `AUTO_FILL_FEATURE_GUIDE.md` | Intelligent variable mapping and automation coverage |
| `SPREADSHEET_INTEGRATION_GUIDE.md` | Spreadsheet tooling, imports, and data hygiene practices |
| `FINAL_SUMMARY.md` | Executive-level summary for stakeholders |
| `EXAMPLE_COMPONENT_USAGE.tsx` | Implementation patterns and UI composition examples |

---

## Quality & Maintenance

- **Static Analysis:** `npm run lint`
- **Type Safety:** Enforced through TypeScript and strict tsconfig defaults.
- **Configuration:** ESLint, Tailwind, PostCSS, and Vite configs live at the repository root.
- **Documentation:** Keep reference files in `Documents/` and `Templates/` synchronized with production operations.

---

## Roadmap Candidates

- Automated email scheduling and calendar invitations
- In-app template editor with real-time preview
- Zoom API synchronization for panel logistics
- Analytics dashboard for funnel performance
- Multi-event reporting and historical comparisons

---

## Support & Ownership

- Start with the documentation table above for workflow-specific guidance.
- Reference `OCT 29 Panel Event/` for a fully scripted sample engagement.
- Reach out to the VBI panel operations team for escalations or feature requests.

---

## License

Internal use only for the Veterinary Business Institute. Redistribution or external publication requires prior approval.

---

Crafted to empower VBI coordinators with a reliable, repeatable panel-event engine.
