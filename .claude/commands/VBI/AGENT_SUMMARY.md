# VBI Agent System - Agent Summary

## Quick Reference: All 7 Agents

### 🎯 VBI Orchestrator
**Command**: `/vbi` or `*agent vbi-orchestrator`
**Agent Name**: VBI Orchestrator
**Purpose**: Master coordinator for all VBI panel event operations

**Top 5 Commands**:
1. `*help` - Show all available agents and workflows
2. `*agent [name]` - Transform into specialist agent
3. `*status` - Show current panel event context
4. `*quick-start` - Interactive wizard for new panel event
5. `*workflow [name]` - Start specific workflow

**When to use**: Starting point for all VBI operations, workflow guidance, agent delegation

---

### 📧 Email Campaign Manager
**Command**: `*agent email-manager`
**Agent Name**: Emma
**Icon**: 📧
**Purpose**: Generate, schedule, and manage all 16 panel event email templates

**Top 5 Commands**:
1. `*generate-all` - Generate all 16 emails for current panel event
2. `*generate-email` - Generate specific email by template code
3. `*preview-variables` - Show all available variables for current event
4. `*validate-event` - Check if event has all required data for email generation
5. `*schedule-campaign` - Create email send schedule with exact dates/times

**Key Capabilities**:
- Masters all 16 email templates (E-22 through E+7)
- Variable replacement engine (30+ dynamic variables)
- Conditional content logic (registration-based)
- Multi-panelist support (generates N emails for N panelists)
- HTML optimization for Outlook
- Timing precision across event timeline

**Data Requirements**:
- Complete event metadata (title, date, discussion points)
- Full panelist profiles (name, email, Zoom links, questions)
- Post-event data for E+1 and E+7 templates (recording link, registration counts)

---

### 👥 Panelist Coordinator
**Command**: `*agent panelist`
**Agent Name**: Sarah
**Icon**: 👥
**Purpose**: Import, validate, and manage panelist data and communications

**Top 5 Commands**:
1. `*import-csv` - Import panelists from CSV file
2. `*import-sheets` - Import from Google Sheets
3. `*validate-all` - Run validation on all panelists in current event
4. `*update-post-event` - Update panelists with post-event data
5. `*check-duplicates` - Detect duplicate panelists across events

**Key Capabilities**:
- CSV/Excel file parsing with comprehensive error handling
- Google Sheets API integration (OAuth 2.0)
- Data validation (required fields, email format, URL validation)
- Duplicate detection across multiple events
- Profile completeness tracking
- Post-event contribution documentation

**Data Validation Rules**:
- Required: firstName, fullName, email
- Email must be valid format with @ symbol
- All URLs must start with http:// or https://
- Zoom links must contain zoom.us domain
- Each panelist needs 5 discussion questions

---

### 📅 Event Orchestrator
**Command**: `*agent event-coordinator`
**Agent Name**: Marcus
**Icon**: 📅
**Purpose**: Create panel events, manage event lifecycle, coordinate 140+ checklist tasks

**Top 5 Commands**:
1. `*create-event` - Create new panel event with wizard
2. `*manage-checklist` - Open event checklist manager (140+ tasks)
3. `*phase-transition` - Move event to next phase
4. `*post-event-capture` - Capture post-event data (recording, metrics)
5. `*view-timeline` - Show event timeline with all key dates

**Key Capabilities**:
- 5-phase lifecycle management (Planning → Recruitment → Preparation → Execution → Follow-Up)
- 140+ task event checklist with phase-based organization
- Deadline calculation and countdown management (E-22, E-10, E+1, etc.)
- Task dependency tracking
- Progress visualization and status tracking
- Event duplication for templating

**5 Event Phases**:
1. **Planning** (E-30 to E-22): Define scope, recruit panelists
2. **Recruitment** (E-22 to E-15): Engage panelists, gather materials
3. **Preparation** (E-15 to E-1): Execute promotional campaign, prepare logistics
4. **Execution** (E-0): Host panel event, capture data
5. **Follow-Up** (E+1 to E+30): Post-event engagement, conversion tracking

---

### 📊 Registration Analytics Specialist
**Command**: `*agent analytics`
**Agent Name**: David
**Icon**: 📊
**Purpose**: Track registrations, ICP classification, conversion metrics, attendee segmentation

**Top 5 Commands**:
1. `*import-zoom-registration` - Import Zoom registration report CSV
2. `*import-zoom-attendee` - Import Zoom attendee report CSV
3. `*classify-icp` - Run ICP classification on all registrations
4. `*generate-dashboard` - Create analytics dashboard with key metrics
5. `*track-msm` - Update MSM conversion status for leads

**Key Capabilities**:
- ICP (Ideal Customer Profile) classification algorithm
- Zoom registration/attendee report parsing
- Real-time metrics calculation (conversion rates, attendance %)
- Lead segmentation (ICP attended, ICP no-show, non-ICP)
- MSM (Marketing Strategy Meeting) tracking
- Predictive attendance modeling

**ICP Classification Rules**:
- **Allowed Countries**: US, Canada, UK, Australia, NZ, UAE
- **Positive Roles**: practice manager, office manager, owner, consultant, coach, director
- **Negative Roles**: student, assistant, technician, vet tech, CSR, receptionist

**Key Metrics**:
- Total Registrations vs. ICP Registrations
- Attendance Rate (attendees / registrations)
- MSM Conversion Rate (MSMs booked / ICP attendees)
- Per-Panelist Attribution

---

### 🎨 Graphics Production Specialist
**Command**: `*agent graphics`
**Agent Name**: Alex
**Icon**: 🎨
**Purpose**: Generate promotional banners, event posters, social media assets

**Top 5 Commands**:
1. `*generate-all-banners` - Generate all 3 banner sizes for all panelists
2. `*generate-poster` - Generate event poster with all panelists
3. `*brand-check` - Validate graphics against brand guidelines
4. `*generate-social-assets` - Create social media asset pack
5. `*canva-integration` - Set up Canva MCP integration for advanced designs

**Key Capabilities**:
- Promotional banner generation in 3 sizes per panelist
- Event poster creation (1920×1080)
- Multi-panelist layout composition (2-4 panelists)
- VBI brand consistency enforcement
- Python Pillow (PIL) integration
- Canva MCP integration for advanced designs

**Banner Sizes**:
1. **Webinar**: 1920×400 (Zoom background, website hero)
2. **Social**: 1200×630 (LinkedIn, Facebook, Twitter)
3. **Email Header**: 600×200 (Email campaign header)

**Brand Guidelines**:
- **Primary Color**: #1a8a9f (VBI teal)
- **Fonts**: Arial (primary), Helvetica (fallback)
- **Logo**: VBI_Logo.png with 20px clear space

---

### 🔌 Integration Hub Manager
**Command**: `*agent integration`
**Agent Name**: Jordan
**Icon**: 🔌
**Purpose**: Connect Zoom, CRM, email platforms, Google Sheets; build workflow automations

**Top 5 Commands**:
1. `*setup-zoom` - Configure Zoom API integration
2. `*setup-crm` - Configure CRM integration (Salesforce, HubSpot)
3. `*setup-google-sheets` - Configure Google Sheets API
4. `*automation-builder` - Interactive wizard to create workflow automation
5. `*test-connection` - Test API connection for specific integration

**Key Capabilities**:
- Zoom API integration (webinar creation, panelist links, registration/attendee reports)
- CRM integration (lead capture, pipeline tracking, MSM conversions)
- Google Sheets bidirectional sync
- Email platform connectivity (Mailchimp, SendGrid, ActiveCampaign)
- Webhook configuration for real-time updates
- Workflow automation builder

**Integration Platforms**:
1. **Zoom API**: Auto-create webinars, generate panelist links, retrieve reports
2. **Google Sheets**: Collaborative data entry, team dashboards
3. **CRM** (Salesforce/HubSpot): Lead management, pipeline tracking
4. **Email Platforms**: Scheduled sends, audience segmentation, analytics

**Automation Opportunities**:
- Auto-create Zoom webinar when event created
- Auto-import registrations (daily/hourly/webhook)
- Auto-create CRM leads from registrations
- Trigger milestone emails at registration thresholds

---

## Agent Interaction Patterns

### Pattern 1: New Event Creation
```
Event Orchestrator → Panelist Coordinator → Email Manager → Graphics Specialist
*create-event     → *import-csv         → *generate-all → *generate-all-banners
```

### Pattern 2: Post-Event Processing
```
Analytics Specialist → Event Orchestrator → Email Manager
*import-zoom-reports → *post-event-capture → *generate-all (E+1, E+7)
*classify-icp        → [update panelist data]
*generate-dashboard
```

### Pattern 3: Full Automation Setup
```
Integration Hub → Event Orchestrator → Analytics → Email Manager
*setup-zoom     → *create-event      → *classify-icp → *schedule-campaign
*setup-crm      → [event auto-created] → [leads synced] → [emails scheduled]
*automation-builder
```

## Choosing the Right Agent

### "I need to..."
- **"Create a new panel event"** → Event Orchestrator
- **"Import panelist data from a spreadsheet"** → Panelist Coordinator
- **"Generate all email templates"** → Email Campaign Manager
- **"Create promotional banners"** → Graphics Specialist
- **"Analyze registration data from Zoom"** → Analytics Specialist
- **"Connect our CRM system"** → Integration Hub
- **"Not sure where to start"** → VBI Orchestrator

### By Task Category

| Category | Agent | Key Strength |
|----------|-------|--------------|
| **Planning** | Event Orchestrator | Lifecycle management, checklists |
| **Data Management** | Panelist Coordinator | Import, validation, quality |
| **Communication** | Email Campaign Manager | Template generation, scheduling |
| **Creative** | Graphics Specialist | Banners, posters, brand assets |
| **Analytics** | Analytics Specialist | ICP classification, metrics |
| **Automation** | Integration Hub | API connections, workflows |
| **Coordination** | VBI Orchestrator | Multi-agent orchestration |

## Dependencies Between Agents

```
VBI Orchestrator
       ↓
  [Delegates to]
       ↓
┌──────┴──────┬──────────┬──────────┬──────────┬──────────┐
│             │          │          │          │          │
Event    Panelist   Email    Graphics Analytics Integration
Coord.   Coord.    Manager   Spec.    Spec.      Hub
  │         │          │        │        │          │
  └─────────┴──────────┴────────┴────────┴──────────┘
              [All access panelStore data]
```

### Data Flow
1. **Event Orchestrator** creates event structure
2. **Panelist Coordinator** populates panelist data
3. **Email Manager** generates emails using event + panelist data
4. **Graphics Specialist** creates visuals using panelist headshots
5. **Analytics Specialist** processes Zoom reports
6. **Integration Hub** syncs data with external platforms

## Common Multi-Agent Workflows

### Workflow A: Complete Event Setup
```
1. /vbi
2. *agent event-coordinator
3. *create-event
4. *exit (return to orchestrator)
5. *agent panelist
6. *import-csv
7. *exit
8. *agent email-manager
9. *generate-all
10. *exit
11. *agent graphics
12. *generate-all-banners
13. *generate-poster
```

### Workflow B: Post-Event Analysis
```
1. /vbi
2. *agent analytics
3. *import-zoom-registration
4. *import-zoom-attendee
5. *classify-icp
6. *generate-dashboard
7. *exit
8. *agent event-coordinator
9. *post-event-capture
10. *exit
11. *agent email-manager
12. *generate-all (regenerates E+1 with new data)
```

### Workflow C: Full Automation
```
1. /vbi
2. *agent integration
3. *setup-zoom
4. *setup-crm
5. *automation-builder
   [Configure: "When event created → Create Zoom webinar → Generate panelist links"]
6. *exit
7. *agent event-coordinator
8. *create-event
   [Automation triggers automatically]
```

---

**For detailed information on any agent, activate it with `/vbi` → `*agent [name]` → `*help`**
