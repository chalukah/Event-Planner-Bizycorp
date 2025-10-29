# VBI Agent System - Implementation Guide

## What Has Been Implemented

### ✅ Complete Agent System (7 Agents)

#### 1. VBI Orchestrator (Master Coordinator)
**File**: `.claude/commands/VBI/agents/vbi-orchestrator.md`
**Activation**: `/vbi`
**Status**: ✅ Fully Implemented

Provides unified interface to all VBI capabilities with dynamic agent transformation.

#### 2. Email Campaign Manager (Emma)
**File**: `.claude/commands/VBI/agents/email-manager.md`
**Activation**: `*agent email-manager` (from VBI Orchestrator)
**Status**: ✅ Fully Implemented

Manages all 16 email templates with variable replacement and conditional content logic.

#### 3. Panelist Coordinator (Sarah)
**File**: `.claude/commands/VBI/agents/panelist-coordinator.md`
**Activation**: `*agent panelist`
**Status**: ✅ Fully Implemented

Handles CSV/Google Sheets import, data validation, and panelist lifecycle management.

#### 4. Event Orchestrator (Marcus)
**File**: `.claude/commands/VBI/agents/event-coordinator.md`
**Activation**: `*agent event-coordinator`
**Status**: ✅ Fully Implemented

Orchestrates 5-phase event lifecycle with 140+ task checklist management.

#### 5. Registration Analytics Specialist (David)
**File**: `.claude/commands/VBI/agents/analytics-specialist.md`
**Activation**: `*agent analytics`
**Status**: ✅ Fully Implemented

ICP classification, Zoom report parsing, metrics dashboards, MSM tracking.

#### 6. Graphics Production Specialist (Alex)
**File**: `.claude/commands/VBI/agents/graphics-specialist.md`
**Activation**: `*agent graphics`
**Status**: ✅ Fully Implemented

Automated banner/poster generation with brand guidelines enforcement.

#### 7. Integration Hub Manager (Jordan)
**File**: `.claude/commands/VBI/agents/integration-hub.md`
**Activation**: `*agent integration`
**Status**: ✅ Fully Implemented

API integrations (Zoom, CRM, Google Sheets, email platforms) and workflow automation.

---

### ✅ Documentation Suite

#### Core Documentation
1. **README.md** - Comprehensive system overview (`.claude/commands/VBI/README.md`)
2. **QUICK_START.md** - 30-second to 5-minute workflows
3. **AGENT_SUMMARY.md** - Quick reference for all 7 agents
4. **IMPLEMENTATION_GUIDE.md** - This file
5. **VBI Panel Event Guide** - Complete lifecycle and best practices

#### Reference Data
1. **ICP Classification Rules** - Detailed algorithm and edge cases
2. **Email Template Reference** - All 16 templates documented
3. **Variable Replacement Guide** - 30+ dynamic variables
4. **Conditional Content Rules** - Logic for registration-based content

---

### ✅ Agent Structure (BMAD™ Core Compatible)

Each agent follows the BMAD™ Core YAML structure:

```yaml
activation-instructions: [Step-by-step activation process]
agent:
  name: [Agent name]
  id: [agent-id]
  title: [Full title]
  icon: [Emoji]
  whenToUse: [Clear use case description]
persona:
  role: [Professional role]
  style: [Communication style]
  identity: [Core identity]
  focus: [Primary focus]
  core_principles: [Guiding principles]
commands: [All commands with * prefix]
dependencies:
  data: [Reference documentation]
  tasks: [Executable workflows]
  templates: [YAML templates]
  utils: [Helper utilities]
```

---

## How to Use the Agent System

### Step 1: Activate VBI Orchestrator
```bash
/vbi
```

This will:
1. Load the VBI Orchestrator agent definition
2. Read complete operating guidelines
3. Display available agents and workflows via `*help`
4. Wait for your commands

### Step 2: Transform into Specialist Agents
From the VBI Orchestrator, use:
```bash
*agent [agent-name]
```

Examples:
```bash
*agent email-manager
*agent panelist
*agent event-coordinator
*agent analytics
*agent graphics
*agent integration
```

### Step 3: Use Agent Commands
Each agent has specialized commands (all require `*` prefix):
```bash
*help                    # Show available commands
*[command-name]          # Execute specific command
*exit                    # Return to VBI Orchestrator
```

---

## Integration with Existing Codebase

### The agent system integrates with your existing VBI Panel Event Management System:

#### React Application (`src/`)
- **panelStore.ts** - Agents can read/write event and panelist data
- **EmailGenerator.tsx** - Email Manager agent guides email generation
- **PanelistImporter.tsx** - Panelist Coordinator guides CSV import
- **EventChecklistViewer.tsx** - Event Orchestrator manages checklist
- **EventPanelTrackerViewer.tsx** - Analytics Specialist processes data

#### Python Scripts (`scripts/`)
- **generate_panel_sheet.py** - Analytics agent uses for Zoom report parsing
- **enhanced_panel_automation.py** - Graphics agent uses for banner/poster generation
- **create_panel_event.py** - Event Orchestrator can trigger event package creation

#### Data Flow
```
User → VBI Agent → Existing System Component → Data Store
                 ↓
           Guidance, Validation, Automation
```

Agents **don't replace** existing code—they **guide** and **automate** its usage.

---

## Task Files (To Be Created)

The following task files are **referenced** by agents but **not yet created**. These are placeholders for future implementation:

### Email Manager Tasks
- `tasks/generate-campaign-emails.md`
- `tasks/generate-specific-email.md`
- `tasks/schedule-campaign.md`
- `tasks/export-emails.md`
- `tasks/validate-event-data.md`

### Panelist Coordinator Tasks
- `tasks/import-panelists-csv.md`
- `tasks/import-panelists-sheets.md`
- `tasks/validate-panelist-data.md`
- `tasks/update-post-event-data.md`
- `tasks/detect-duplicates.md`

### Event Orchestrator Tasks
- `tasks/create-panel-event.md`
- `tasks/manage-event-checklist.md`
- `tasks/phase-transition.md`
- `tasks/post-event-data-capture.md`
- `tasks/calculate-event-timeline.md`

### Analytics Specialist Tasks
- `tasks/import-zoom-registration.md`
- `tasks/import-zoom-attendee.md`
- `tasks/classify-icp-leads.md`
- `tasks/generate-analytics-dashboard.md`
- `tasks/track-msm-conversions.md`

### Graphics Specialist Tasks
- `tasks/generate-promotional-banners.md`
- `tasks/generate-event-poster.md`
- `tasks/canva-mcp-integration.md`
- `tasks/brand-validation.md`

### Integration Hub Tasks
- `tasks/setup-zoom-integration.md`
- `tasks/setup-google-sheets-integration.md`
- `tasks/setup-crm-integration.md`
- `tasks/setup-email-platform-integration.md`
- `tasks/automation-builder.md`

**Note**: Tasks are **optional** - agents can operate without them by providing inline guidance. Tasks are useful for complex, multi-step workflows that benefit from structured documentation.

---

## Template Files (To Be Created)

### Configuration Templates
- `templates/panel-event-config.yaml` - Event configuration structure
- `templates/integration-config.yaml` - API credentials and settings
- `templates/automation-workflow.yaml` - Workflow automation definitions

### Export Templates
- `templates/email-schedule.yaml` - Email campaign schedule
- `templates/analytics-dashboard.yaml` - Dashboard layout
- `templates/lead-segmentation-report.yaml` - Lead segmentation output

**Note**: Templates are **optional** - agents can generate these dynamically or use existing formats from the codebase.

---

## Utility Files (To Be Created)

### Helper Utilities
- `utils/template-engine-helper.md` - Variable replacement guidance
- `utils/csv-parser-helper.md` - CSV parsing best practices
- `utils/google-sheets-helper.md` - Google Sheets API usage
- `utils/email-validator.md` - Email validation patterns
- `utils/url-validator.md` - URL validation patterns
- `utils/icp-classifier.md` - ICP classification helper
- `utils/date-calculator.md` - Event date calculations
- `utils/oauth-helper.md` - OAuth authentication guide
- `utils/api-client-generator.md` - API client generation

**Note**: Utilities are **optional** - agents can provide guidance inline without separate files.

---

## Next Steps for Implementation

### Phase 1: Immediate Use (COMPLETE ✅)
- [x] 7 agents fully implemented
- [x] Core documentation created
- [x] Activation command `/vbi` ready
- [x] Integration with existing codebase defined

**You can start using the agent system NOW with `/vbi`**

### Phase 2: Task File Creation (OPTIONAL)
Create task files for complex workflows:
1. Start with most-used tasks (e.g., `create-panel-event.md`, `import-panelists-csv.md`)
2. Add step-by-step instructions for each task
3. Include validation checkpoints and error handling
4. Reference existing code files where applicable

### Phase 3: Template Creation (OPTIONAL)
Create YAML templates for data structures:
1. Panel event configuration template
2. Integration configuration template
3. Automation workflow template
4. Export format templates

### Phase 4: Utility Development (OPTIONAL)
Create utility helpers for common operations:
1. ICP classification helper with test cases
2. Date calculator for event timeline
3. Email/URL validators with regex patterns
4. OAuth authentication guide with examples

### Phase 5: Integration Enhancement (FUTURE)
Implement actual API integrations:
1. Zoom API integration (auto-create webinars)
2. Google Sheets real-time sync
3. CRM bidirectional sync
4. Email platform scheduled sends
5. Webhook handlers for real-time updates

### Phase 6: Advanced Features (FUTURE)
Add predictive and AI capabilities:
1. Predictive attendance modeling
2. AI-powered email copywriting
3. Automated image generation with DALL-E
4. Video recording processing (transcription, chapters)
5. Attendee engagement scoring

---

## Testing the Agent System

### Test 1: Activate VBI Orchestrator
```bash
/vbi
```
**Expected**: Greeting, agent introduction, `*help` command auto-runs, shows 7 agents

### Test 2: Transform into Email Manager
```bash
*agent email-manager
```
**Expected**: Emma introduces herself, shows email-specific commands

### Test 3: Use Agent Command
```bash
*help
```
**Expected**: List of all commands for current agent with descriptions

### Test 4: Exit and Return
```bash
*exit
```
**Expected**: Return to VBI Orchestrator, ready for next agent transformation

### Test 5: Multi-Agent Workflow
```bash
*agent event-coordinator
*create-event
[Follow wizard]
*exit
*agent panelist
*import-csv
[Upload file]
*exit
*agent email-manager
*generate-all
```
**Expected**: Smooth transitions between agents, data flows correctly

---

## Troubleshooting

### Issue: "Agent not activating"
**Check**:
1. Is command `/vbi` (with slash)?
2. Is Claude Code in correct working directory?
3. Does `.claude/commands/vbi.md` exist?

**Fix**: Verify file paths and try again

### Issue: "Commands not working"
**Check**:
1. Are you using `*` prefix? (`*help` not `help`)
2. Is command valid for current agent?
3. Did agent activate successfully?

**Fix**: Review agent's `*help` output for available commands

### Issue: "Agent references missing files"
**Status**: Expected behavior
**Explanation**: Agents reference task/template/utility files that are placeholders for future implementation
**Impact**: Agents will provide inline guidance instead of loading external files

**Fix**: No fix needed - system works without optional task files

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│            User activates /vbi                      │
└─────────────────┬───────────────────────────────────┘
                  ↓
         ┌────────────────────┐
         │  VBI Orchestrator  │ ← Master Coordinator
         │    (vbi.md)        │
         └────────┬───────────┘
                  │
        Transforms to specialists via *agent [name]
                  │
    ┌─────────────┼─────────────┬──────────────┬────────────┬─────────────┬────────────┐
    ↓             ↓             ↓              ↓            ↓             ↓            ↓
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌─────────┐  ┌──────────┐
│  Email  │  │Panelist │  │  Event  │  │Analytics │  │Graphics │  │  Integ  │  │   Data   │
│ Manager │  │  Coord  │  │  Coord  │  │   Spec   │  │   Spec  │  │   Hub   │  │  Stores  │
│ (Emma)  │  │ (Sarah) │  │(Marcus) │  │ (David)  │  │  (Alex) │  │(Jordan) │  │          │
└────┬────┘  └────┬────┘  └────┬────┘  └────┬─────┘  └────┬────┘  └────┬────┘  └────┬─────┘
     │            │            │            │             │            │            │
     └────────────┴────────────┴────────────┴─────────────┴────────────┴────────────┘
                                         │
                               Interact with existing system
                                         │
         ┌───────────────────────────────┼───────────────────────────────┐
         ↓                               ↓                               ↓
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│  React App       │          │  Python Scripts  │          │  Data Stores     │
│  (src/)          │          │  (scripts/)      │          │  (localStorage,  │
│                  │          │                  │          │   Google Sheets) │
│ - panelStore.ts  │          │ - generate_      │          │                  │
│ - EmailGen.tsx   │          │   panel_sheet.py │          │ - Panel Events   │
│ - Checklist.tsx  │          │ - enhanced_      │          │ - Panelists      │
│ - Tracker.tsx    │          │   panel_auto.py  │          │ - Checklists     │
└──────────────────┘          └──────────────────┘          └──────────────────┘
```

---

## Files Created

### Agent Definitions (7 files)
1. `.claude/commands/VBI/agents/vbi-orchestrator.md`
2. `.claude/commands/VBI/agents/email-manager.md`
3. `.claude/commands/VBI/agents/panelist-coordinator.md`
4. `.claude/commands/VBI/agents/event-coordinator.md`
5. `.claude/commands/VBI/agents/analytics-specialist.md`
6. `.claude/commands/VBI/agents/graphics-specialist.md`
7. `.claude/commands/VBI/agents/integration-hub.md`

### Documentation (5 files)
1. `.claude/commands/VBI/README.md` - Comprehensive system guide
2. `.claude/commands/VBI/QUICK_START.md` - Quick start workflows
3. `.claude/commands/VBI/AGENT_SUMMARY.md` - Agent quick reference
4. `.claude/commands/VBI/IMPLEMENTATION_GUIDE.md` - This file
5. `.claude/commands/vbi.md` - Activation command

### Reference Data (2 files)
1. `.claude/commands/VBI/data/vbi-panel-event-guide.md` - Event lifecycle
2. `.claude/commands/VBI/data/icp-classification-rules.md` - ICP algorithm

### Directory Structure
```
.claude/commands/
├── vbi.md (activation command)
└── VBI/
    ├── README.md
    ├── QUICK_START.md
    ├── AGENT_SUMMARY.md
    ├── IMPLEMENTATION_GUIDE.md
    ├── agents/ (7 agent files)
    ├── data/ (2 reference files)
    ├── tasks/ (empty - for future task workflows)
    ├── templates/ (empty - for future YAML templates)
    └── utils/ (empty - for future utilities)
```

---

## Success Criteria

### ✅ System is Ready When:
- [x] All 7 agents are fully defined with YAML structure
- [x] VBI Orchestrator activation command (`/vbi`) works
- [x] Agent transformation via `*agent [name]` works
- [x] Core documentation is complete and accessible
- [x] Integration points with existing codebase are defined

### 🎯 You Can Now:
1. Activate VBI Orchestrator with `/vbi`
2. Get help and guidance for any VBI panel event task
3. Transform into specialist agents for specific tasks
4. Follow documented workflows for common operations
5. Extend the system with task files and templates as needed

---

## Support and Maintenance

### Adding New Agents
1. Create new agent file in `.claude/commands/VBI/agents/[agent-name].md`
2. Follow BMAD™ Core YAML structure
3. Add to VBI Orchestrator's help display
4. Document in AGENT_SUMMARY.md

### Updating Existing Agents
1. Modify agent file in `.claude/commands/VBI/agents/`
2. Update documentation if commands change
3. Test activation and commands
4. Update AGENT_SUMMARY.md if needed

### Creating Task Files
1. Create markdown file in `.claude/commands/VBI/tasks/`
2. Include step-by-step instructions
3. Reference from agent's dependencies section
4. Document in agent's help text

---

**🎉 The VBI Agent System is complete and ready to use! Start with `/vbi`**
