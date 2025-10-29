# VBI Panel Event Management Agent System

## Overview
This is a specialized agent system for managing VBI (Veterinary Business Institute) panel events, built on the BMAD™ Core framework. The system provides task-specific agents that automate and streamline the complete panel event lifecycle from planning to post-event follow-up.

## Quick Start

### 1. Activate the VBI Orchestrator
```
/vbi
```

This launches the VBI Orchestrator, which will:
- Greet you and explain its capabilities
- Show available specialist agents
- Display available workflows
- Wait for your commands

### 2. Use Specialist Agents
Transform into any specialist agent using:
```
*agent [agent-name]
```

For example:
```
*agent email-manager
*agent panelist
*agent event-coordinator
```

### 3. Get Help Anytime
```
*help
```

## Available Agents

### 1. VBI Orchestrator (`vbi-orchestrator`)
**Icon**: 🎯
**Command**: `/vbi` or `*agent vbi-orchestrator`
**When to use**: Master coordinator for all VBI operations, workflow guidance, agent delegation

**Key Commands**:
- `*help` - Show all available agents and workflows
- `*agent [name]` - Transform into specialist agent
- `*workflow [name]` - Start specific workflow
- `*quick-start` - Interactive wizard for new panel event
- `*status` - Show current panel event context

### 2. Email Campaign Manager (`email-manager`)
**Icon**: 📧
**Agent**: Emma
**Command**: `*agent email-manager`
**When to use**: Generate, schedule, and manage all 16 panel event email templates

**Key Commands**:
- `*generate-all` - Generate all 16 emails for current event
- `*generate-email` - Generate specific email by code (E-22, E+1, etc.)
- `*preview-variables` - Show all available variables
- `*validate-event` - Check if event has required data
- `*schedule-campaign` - Create email send schedule with dates
- `*export-emails` - Export generated emails to files

**Capabilities**:
- Variable replacement (30+ dynamic variables)
- Conditional content logic
- Multi-panelist support (2-4 panelists)
- HTML optimization for Outlook
- Post-event data integration

### 3. Panelist Coordinator (`panelist-coordinator`)
**Icon**: 👥
**Agent**: Sarah
**Command**: `*agent panelist`
**When to use**: Import, validate, and manage panelist data

**Key Commands**:
- `*import-csv` - Import panelists from CSV file
- `*import-sheets` - Import from Google Sheets
- `*add-panelist` - Manually add single panelist
- `*validate-all` - Run validation on all panelists
- `*check-duplicates` - Detect duplicate panelists
- `*update-post-event` - Update with post-event data

**Capabilities**:
- CSV/Excel file parsing
- Google Sheets API integration
- Comprehensive data validation
- Duplicate detection
- Profile completeness tracking

### 4. Event Orchestrator (`event-coordinator`)
**Icon**: 📅
**Agent**: Marcus
**Command**: `*agent event-coordinator`
**When to use**: Create events, manage lifecycle, track 140+ checklist tasks

**Key Commands**:
- `*create-event` - Create new panel event with wizard
- `*duplicate-event` - Duplicate existing event as template
- `*manage-checklist` - Open event checklist manager
- `*phase-transition` - Move event to next phase
- `*post-event-capture` - Capture post-event data
- `*view-timeline` - Show event timeline with key dates

**Capabilities**:
- 5-phase lifecycle management
- 140+ task checklist with deadlines
- Countdown and deadline calculation
- Task dependency tracking
- Progress visualization

### 5. Registration Analytics Specialist (`analytics-specialist`)
**Icon**: 📊
**Agent**: David
**Command**: `*agent analytics`
**When to use**: Track registrations, ICP classification, conversion metrics

**Key Commands**:
- `*import-zoom-registration` - Import Zoom registration CSV
- `*import-zoom-attendee` - Import Zoom attendee CSV
- `*classify-icp` - Run ICP classification algorithm
- `*generate-dashboard` - Create analytics dashboard
- `*segment-leads` - Generate lead segmentation report
- `*track-msm` - Update MSM conversion status

**Capabilities**:
- ICP (Ideal Customer Profile) classification
- Zoom report parsing
- Real-time metrics calculation
- Lead segmentation
- MSM conversion tracking
- Predictive attendance modeling

### 6. Graphics Production Specialist (`graphics-specialist`)
**Icon**: 🎨
**Agent**: Alex
**Command**: `*agent graphics`
**When to use**: Generate promotional banners, posters, social media assets

**Key Commands**:
- `*generate-all-banners` - Generate 3 banner sizes for all panelists
- `*generate-poster` - Generate event poster
- `*generate-social-assets` - Create social media asset pack
- `*brand-check` - Validate graphics against brand guidelines
- `*canva-integration` - Set up Canva MCP integration

**Capabilities**:
- Promotional banner generation (webinar, social, email sizes)
- Event poster creation (1920x1080)
- Multi-panelist layout composition
- VBI brand consistency (#1a8a9f teal)
- Python Pillow integration
- Canva MCP integration

### 7. Integration Hub Manager (`integration-hub`)
**Icon**: 🔌
**Agent**: Jordan
**Command**: `*agent integration`
**When to use**: Connect Zoom, CRM, email platforms, Google Sheets

**Key Commands**:
- `*setup-zoom` - Configure Zoom API integration
- `*setup-google-sheets` - Configure Google Sheets API
- `*setup-crm` - Configure CRM integration (Salesforce, HubSpot)
- `*setup-email-platform` - Configure email platform
- `*test-connection` - Test API connection
- `*automation-builder` - Create workflow automation

**Capabilities**:
- Zoom API (webinar creation, registration tracking)
- Google Sheets bidirectional sync
- CRM integration (lead capture, pipeline tracking)
- Email platform connectivity
- Webhook configuration
- Workflow automation

## Common Workflows

### Workflow 1: Create New Panel Event
```
/vbi
*quick-start
```
OR
```
*agent event-coordinator
*create-event
```

This will guide you through:
1. Setting event metadata (date, time, title)
2. Defining panel details and discussion points
3. Creating event checklist (140+ tasks)
4. Prompting next steps (import panelists, generate emails)

### Workflow 2: Import Panelists and Generate Emails
```
*agent panelist
*import-csv
[Upload panelists.csv]

*agent email-manager
*generate-all
*export-emails
```

### Workflow 3: Post-Event Data Processing
```
*agent analytics
*import-zoom-registration
*import-zoom-attendee
*classify-icp
*generate-dashboard

*agent event-coordinator
*post-event-capture
[Enter recording link and panelist data]

*agent email-manager
*generate-all
[Regenerates E+1 and E+7 emails with post-event data]
```

### Workflow 4: Generate Complete Graphics Package
```
*agent graphics
*generate-all-banners
[Creates 3 sizes × N panelists]
*generate-poster
*brand-check
*export-package
```

## Panel Event Lifecycle

### Phase 1: Planning (E-30 to E-22)
- Define panel topic and objectives
- Recruit 2-4 panelists
- Create event in system

### Phase 2: Recruitment (E-22 to E-15)
- Send E-22 invitations
- Send E-15 confirmations
- Collect panelist questions

### Phase 3: Preparation (E-15 to E-1)
- Generate promotional graphics
- Set up Zoom webinar
- Send reminders (E-10, E-8, E-4, E-1)
- Monitor registrations

### Phase 4: Execution (E-0)
- Host panel event
- Record session
- Capture attendance data

### Phase 5: Follow-Up (E+1 to E+30)
- Process Zoom reports
- Classify ICP leads
- Send thank you emails (E+1)
- Share recording (E+7)
- Track MSM conversions

## Email Templates (16 Total)

| Code | Timing | Audience | Description |
|------|--------|----------|-------------|
| E-22 | 22 days before | Panelists | Initial invitation |
| E-15 | 15 days before | Panelists | Confirmation |
| QUESTIONS | After questions | Panelists | Question confirmation |
| REG-MILESTONE | At milestones | Panelists | Registration updates |
| E-10 | 10 days before | Panelists | Reminder |
| E-8 | 8 days before | Panelists | Check-in |
| PANEL-ASSETS | When ready | Panelists | Graphics shared |
| E-4 | 4 days before | Panelists | Final reminder |
| PROMO | Pre-event | Panelists | Promotional materials |
| PARTNER | Pre-event | Panelists | Partner details |
| EVENT-Q | Pre-event | Panelists | Event questions |
| E-1-DAY | 1 day before | Panelists | Day before |
| E-1-TECH | 1 day before | Panelists | Tech check |
| E-0 | Event day | Panelists | Day of instructions |
| E+1 | 1 day after | Panelists | Thank you |
| E+7 | 7 days after | All | Recording share |

## Data Structures

### Panel Event
Core event metadata including title, date, discussion points, panelists array

### Panelist
Panelist profile with contact info, Zoom links, tracking links, questions, post-event data

### Event Checklist
140+ tasks organized by 5 phases with status tracking

### Event Panel Tracker
Registration and attendance data with ICP classification

### Generated Email
HTML emails with variable replacement and conditional content

## System Integration

### Current Integrations
- **Google Sheets API**: Panelist data import (OAuth 2.0)
- **localStorage**: Browser-based persistence for all event data

### Available Integrations (via Integration Hub Agent)
- **Zoom API**: Webinar creation, registration tracking, report retrieval
- **CRM** (Salesforce, HubSpot): Lead capture, pipeline tracking
- **Email Platforms** (Mailchimp, SendGrid): Scheduled email sends
- **Canva MCP**: Advanced graphics design

## File Structure
```
.claude/commands/VBI/
├── agents/                  # 7 specialized agents
│   ├── vbi-orchestrator.md
│   ├── email-manager.md
│   ├── panelist-coordinator.md
│   ├── event-coordinator.md
│   ├── analytics-specialist.md
│   ├── graphics-specialist.md
│   └── integration-hub.md
├── tasks/                   # Executable task workflows
│   ├── create-panel-event.md
│   ├── generate-campaign-emails.md
│   ├── import-panelists-csv.md
│   └── [more tasks...]
├── templates/               # YAML templates for data structures
│   ├── panel-event-config.yaml
│   ├── email-schedule.yaml
│   └── [more templates...]
├── data/                    # Reference documentation
│   ├── vbi-panel-event-guide.md
│   ├── icp-classification-rules.md
│   └── [more guides...]
└── README.md               # This file
```

## Best Practices

### 1. Start with the Orchestrator
Always begin by activating the VBI Orchestrator (`/vbi`) to get oriented and see available options.

### 2. Use Numbered Lists
All agents present options as numbered lists. Simply type the number to select.

### 3. Complete Data Before Generation
Before generating emails or graphics, ensure all panelist data is complete using `*validate-all`.

### 4. Follow the Timeline
Respect the E-22 to E+7 timeline for email sends to maximize engagement.

### 5. Classify ICP Immediately
Run ICP classification as soon as Zoom registration reports are available.

### 6. Track MSM Conversions
Update MSM conversion status within 30 days post-event for accurate metrics.

## Troubleshooting

### Problem: Agent not responding
**Solution**: Ensure you're using `*` prefix for commands (e.g., `*help`, not `help`)

### Problem: Missing panelist data
**Solution**: Use `*agent panelist` → `*validate-all` to identify missing fields

### Problem: Email variables not replaced
**Solution**: Check event and panelist data completeness before generating

### Problem: ICP classification inaccurate
**Solution**: Review classification rules in `data/icp-classification-rules.md` and manually override edge cases

## Support and Feedback

This agent system is built on BMAD™ Core and integrates with the existing VBI Panel Event Management System codebase.

For questions or issues:
1. Use `*help` in any agent to see available commands
2. Review documentation in `data/` folder
3. Check existing codebase documentation in `Documents/` folder

## Integration with Existing System

This agent system works alongside your existing React + Python system:
- **React App** (`src/`): UI for event management, email generation, checklist tracking
- **Python Scripts** (`scripts/`): Document and graphics generation
- **VBI Agents**: Intelligent automation and guidance layer on top of existing system

Agents can interact with:
- `src/panelStore.ts` - React Zustand store for event data
- `src/utils/templateEngine.ts` - Email variable replacement
- `scripts/generate_panel_sheet.py` - Zoom data processing
- `scripts/enhanced_panel_automation.py` - Event package generation
