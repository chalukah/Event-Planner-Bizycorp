# VBI Agent System - Quick Start Guide

## 30-Second Start

### 1. Activate VBI Orchestrator
```
/vbi
```

### 2. See what's available
```
*help
```

### 3. Start working with a specialist
```
*agent email-manager
*agent panelist
*agent event-coordinator
*agent analytics
*agent graphics
*agent integration
```

## 5-Minute Workflows

### Create Your First Panel Event
```
/vbi
*agent event-coordinator
*create-event

[Follow the wizard to enter:]
- Event name, date, time
- Panel title, subtitle, purpose
- 5 discussion points

[Event created! Next steps shown automatically]
```

### Import Panelists and Generate Emails
```
*agent panelist
*import-csv
[Upload your panelists.csv file]

*agent email-manager
*generate-all
*export-emails
```

### Process Post-Event Data
```
*agent analytics
*import-zoom-registration
[Upload Zoom registration report CSV]

*import-zoom-attendee
[Upload Zoom attendee report CSV]

*classify-icp
*generate-dashboard
```

## Understanding the System

### 7 Specialist Agents

| Agent | Icon | Command | Purpose |
|-------|------|---------|---------|
| **VBI Orchestrator** | 🎯 | `/vbi` | Master coordinator |
| **Email Manager** | 📧 | `*agent email-manager` | Generate 16 email templates |
| **Panelist Coordinator** | 👥 | `*agent panelist` | Import/manage panelists |
| **Event Orchestrator** | 📅 | `*agent event-coordinator` | Event lifecycle & checklist |
| **Analytics Specialist** | 📊 | `*agent analytics` | ICP classification & metrics |
| **Graphics Specialist** | 🎨 | `*agent graphics` | Banners & posters |
| **Integration Hub** | 🔌 | `*agent integration` | API integrations |

### 5 Event Phases

```
E-30 ────→ E-22 ────→ E-15 ────→ E-1 ────→ E+30
  │          │          │         │         │
Planning  Recruit  Preparation  Execute  Follow-Up
```

### 16 Email Templates

**Pre-Event (Panelist Emails)**:
- E-22: Panel Invitation
- E-15: Panel Confirmation
- QUESTIONS: Question Confirmation
- REG-MILESTONE: Registration Updates
- E-10, E-8, E-4: Reminders
- PANEL-ASSETS, PROMO, PARTNER, EVENT-Q: Materials
- E-1-DAY, E-1-TECH, E-0: Final prep

**Post-Event**:
- E+1: Thank You
- E+7: Recording Share

## Common Tasks

### Task 1: Validate All Panelist Data
```
*agent panelist
*validate-all

[Review validation report]
[Fix any missing/invalid data]
```

### Task 2: Generate Promotional Graphics
```
*agent graphics
*generate-all-banners
[Creates webinar (1920×400), social (1200×630), email (600×200)]

*generate-poster
[Creates 1920×1080 event poster]
```

### Task 3: View Event Checklist Progress
```
*agent event-coordinator
*manage-checklist

[See all 140+ tasks organized by phase]
[Update task statuses]
[Track deadline countdowns]
```

### Task 4: Export ICP Leads for Sales Team
```
*agent analytics
*classify-icp
*segment-leads
*export-icp-list
```

### Task 5: Set Up Zoom Integration
```
*agent integration
*setup-zoom

[Follow OAuth setup wizard]
[Configure automation preferences]
[Test connection]
```

## Command Reference

### Universal Commands (Work in All Agents)
- `*help` - Show available commands for current agent
- `*exit` - Leave current agent, return to VBI Orchestrator
- `*yolo` - Toggle skip confirmations (use with caution!)

### VBI Orchestrator Commands
- `*agent [name]` - Transform into specialist agent
- `*status` - Show current panel event context
- `*quick-start` - Interactive wizard for new event
- `*workflow [name]` - Start specific workflow

### Agent-Specific Commands
Each agent has unique commands. Use `*help` after transforming to see them.

## Tips for Success

### ✅ Do This
- Always start with `/vbi` to activate the orchestrator
- Use `*help` frequently to see available commands
- Validate panelist data before generating emails
- Follow the E-22 to E+7 timeline for email sends
- Classify ICP leads immediately after event

### ❌ Avoid This
- Don't forget the `*` prefix for commands
- Don't skip data validation before email generation
- Don't manually copy data between systems (use integrations)
- Don't ignore the numbered options (they're interactive!)

## Data Flow

```
Create Event → Import Panelists → Generate Emails → Create Graphics
     ↓              ↓                  ↓                ↓
Event Store ←→ Panelist Data ←→ Email Templates ←→ Graphics Assets
     ↓              ↓                  ↓                ↓
Checklist Tracking → Zoom Reports → ICP Classification → CRM Sync
```

## File Locations

### Agent Definitions
`.claude/commands/VBI/agents/*.md`

### Task Workflows
`.claude/commands/VBI/tasks/*.md`

### Reference Data
`.claude/commands/VBI/data/*.md`

### Templates
`.claude/commands/VBI/templates/*.yaml`

### Documentation
`.claude/commands/VBI/README.md` (comprehensive guide)
`.claude/commands/VBI/QUICK_START.md` (this file)

## Troubleshooting

### "Command not recognized"
→ Make sure you're using `*` prefix (e.g., `*help` not `help`)

### "Missing panelist data"
→ Run `*agent panelist` → `*validate-all` to see what's missing

### "Email variables not replaced"
→ Check that event and panelist data is complete before `*generate-all`

### "ICP classification seems wrong"
→ Review `.claude/commands/VBI/data/icp-classification-rules.md`
→ Use manual review for edge cases

### "Agent not responding as expected"
→ Try `*exit` and re-enter the agent
→ Check that you've activated with `/vbi` first

## Next Steps

### For New Users
1. Read the main README: `.claude/commands/VBI/README.md`
2. Review the panel event guide: `.claude/commands/VBI/data/vbi-panel-event-guide.md`
3. Create your first event: `/vbi` → `*agent event-coordinator` → `*create-event`

### For Advanced Users
1. Set up integrations: `*agent integration` → `*setup-zoom`, `*setup-crm`
2. Build custom automations: `*agent integration` → `*automation-builder`
3. Explore all 16 email templates and customize as needed

### For System Administrators
1. Review all agent definitions in `.claude/commands/VBI/agents/`
2. Customize task workflows in `.claude/commands/VBI/tasks/`
3. Update brand guidelines in `.claude/commands/VBI/data/`

## Support

- **In-Agent Help**: Use `*help` in any agent
- **Documentation**: Check `.claude/commands/VBI/README.md`
- **Reference Guides**: Browse `.claude/commands/VBI/data/`
- **Examples**: See `OCT 29 Panel Event/` folder for real implementation

---

**Ready to get started? Type `/vbi` to begin!**
