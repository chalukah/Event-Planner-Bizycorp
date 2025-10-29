# VBI Output Style Guide

## Overview
A custom output style has been created specifically for your VBI Panel Event Management workspace. This style ensures consistent, professional, and highly organized responses across all agent interactions.

## Activating the Output Style

### Step 1: View Available Output Styles
In Claude Code, you can view available output styles using the slash command system or settings.

### Step 2: Select VBI Output Style
The output style is located at:
```
.claude/output-styles/vbi-panel-event.md
```

### Step 3: Apply to Conversations
The output style can be applied to ensure all agent responses follow VBI-specific formatting conventions.

## Key Features of VBI Output Style

### 1. Event-Focused Structure
All responses are organized around panel event lifecycle phases (E-30 to E+30):
```
📅 PANEL EVENT: [Event Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 EVENT DETAILS
• Date: [Full date]
• Time: [Time EST]
• Phase: [Current phase] (E-[X])
```

### 2. Visual Status Indicators
Clear status tracking with icons:
- ✅ Complete/Valid/Success
- 🔄 In Progress/Processing
- ⏳ Pending/Scheduled
- ⚠️  Warning/Needs Attention
- ❌ Blocked/Failed/Invalid

### 3. Numbered User Choices
All options are presented as numbered lists:
```
Please select an option:

1. Generate all emails → `*generate-all`
2. Generate specific email → `*generate-email`
3. Preview variables → `*preview-variables`

💡 Type the number to select
```

### 4. Structured Data Presentation
Metrics and analytics with clear visual hierarchy:
```
📊 REGISTRATION ANALYTICS DASHBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 REGISTRATION METRICS

Total Registrations:        [XXX]
├─ ICP Registrations:       [XXX] ([XX]%)
└─ Non-ICP Registrations:   [XXX] ([XX]%)

Target ICP Rate: 40-60%
Current Performance: [Status]
```

### 5. Action-Oriented Responses
Every response includes next steps:
```
🎯 NEXT ACTIONS
1. [First action with specific command]
2. [Second action with specific command]
3. [Third action with specific command]

💡 TIP: [Helpful suggestion]
```

## Icon Reference

### Context Icons
- 📅 Events and dates
- 📧 Emails and communications
- 👥 Panelists and people
- 📊 Analytics and metrics
- 🎨 Graphics and creative work
- 🔌 Integrations and APIs
- 📁 Files and folders
- 💼 Business and conversions

### Status Icons
- ✅ Completed/Success
- 🔄 In Progress
- ⏳ Pending/Waiting
- ⚠️  Warning/Attention Needed
- ❌ Error/Failed/Blocked

### Action Icons
- 🎯 Next actions/Recommendations
- 💡 Tips/Suggestions
- 🚀 Launch/Start operations

## Visual Separators

### Major Section Separator
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Subsection Separator
```
────────────────────────────────────────────
```

### Hierarchical Data
```
Total: [XXX]
├─ Category A: [XX]
├─ Category B: [XX]
└─ Category C: [XX]
```

### Progress Bars
```
PHASE 1: PLANNING [█████████░] 90% Complete
PHASE 2: RECRUITMENT [█████░░░░░] 50% Complete
PHASE 3: PREPARATION [░░░░░░░░░░] 0% Complete
```

## Response Templates

### 1. Agent Introduction
```
[ICON] [AGENT NAME] ([Agent Persona Name])
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hello! I'm [Name], your [Agent Title]. I specialize in [brief description].

📋 CURRENT CONTEXT
[Context information]

💡 AVAILABLE COMMANDS
[Command table]

🎯 RECOMMENDED NEXT STEP
[Suggestion]
```

### 2. Data Validation Results
```
✅ VALIDATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ PASSED: [X] items
⚠️  WARNINGS: [Y] items
❌ FAILED: [Z] items

[Detailed breakdown]

🎯 NEXT ACTIONS
[Recommendations]
```

### 3. Import/Export Operations
```
📤 [OPERATION] COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Processed: [X] items
✅ Imported/Exported: [Y] items
⚠️  Warnings: [Z] items
❌ Errors: [W] items

[Detailed summary]

📁 LOCATION: [Path]

🎯 NEXT STEPS
[Actions]
```

### 4. Analytics Dashboard
```
📊 [DASHBOARD NAME]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Event/Context info]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 [METRIC CATEGORY]

[Metrics with visual hierarchy]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 RECOMMENDATIONS
[Data-driven suggestions]
```

### 5. Error/Warning Messages
```
⚠️  WARNING: [Issue Title]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Issue: [Description]
Impact: [What this affects]

Affected Items:
• [Item 1]
• [Item 2]

🎯 RECOMMENDED ACTIONS
1. [Action 1]
2. [Action 2]

💡 Would you like me to:
1. [Option 1]
2. [Option 2]
3. [Option 3]
```

## Tone and Style Guidelines

### Professional but Friendly
- Use conversational language while maintaining expertise
- Balance technical accuracy with accessibility
- Be encouraging and supportive

### Action-Oriented
- Always provide clear next steps
- Include specific commands with syntax
- Offer multiple options when applicable

### Event-Phase Aware
- Reference E-timeline naturally (E-22, E-10, E+1)
- Show countdown timers for deadlines
- Indicate current phase context

### Concise Yet Complete
- Get to the point quickly
- Provide all necessary information
- Use visual organization to reduce text density

### Specific and Quantitative
- Use exact numbers, not vague terms
- Show percentages alongside raw numbers
- Compare to targets/benchmarks

## Formatting Rules

### 1. Commands
Always show with * prefix and in backticks:
```
Use `*generate-all` to create all emails
```

### 2. File Paths
Show complete paths:
```
📁 LOCATION: Panel_Events/Oct_29_2025_Workforce_Crisis/
```

### 3. Dates and Times
Be specific with format:
```
• Event Date: Tuesday, October 29, 2025
• Event Time: 8:00 PM EST
• Phase: E-8 (8 days before event)
```

### 4. Metrics
Show both count and percentage:
```
ICP Registrations: 45 (62%)
```

### 5. Lists
Use bullets (•) for items, numbers for choices:
```
Event Details:
• Title: [...]
• Date: [...]

Select an option:
1. Option A
2. Option B
```

### 6. Tables
Use box drawing characters:
```
┌────────────────┬────────────────────────┐
│ Command        │ Description            │
├────────────────┼────────────────────────┤
│ *help          │ Show help              │
│ *exit          │ Return to orchestrator │
└────────────────┴────────────────────────┘
```

## Agent-Specific Variations

### VBI Orchestrator
- Broader scope, system-level view
- Heavy use of agent delegation language
- Workflow-focused responses

### Email Manager (Emma)
- Template-focused language
- Variable replacement details
- Timeline awareness

### Panelist Coordinator (Sarah)
- Data validation emphasis
- Import/export details
- Profile completeness tracking

### Event Orchestrator (Marcus)
- Checklist-centric responses
- Phase transition language
- Deadline awareness

### Analytics Specialist (David)
- Metrics-heavy responses
- Comparison to benchmarks
- Segmentation details

### Graphics Specialist (Alex)
- Visual specifications
- Brand guideline references
- File format details

### Integration Hub (Jordan)
- API-focused language
- Authentication flows
- Automation workflow descriptions

## Examples by Use Case

### Example 1: Creating New Event
```
📅 EVENT CREATION WIZARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Let's create your new panel event! I'll guide you through each step.

STEP 1 OF 4: Event Metadata

Please provide the following information:

1. Internal Event Name (e.g., "Oct 2025 Workforce Crisis Panel")
   →

2. Event Date (YYYY-MM-DD format)
   →

3. Event Time (include timezone, e.g., "8:00 PM EST")
   →

💡 TIP: Choose a date at least 30 days in advance for optimal preparation time
```

### Example 2: Import Validation
```
✅ PANELIST IMPORT VALIDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Source: panelists.csv
Rows Processed: 3

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Dr. Sarah Johnson ✅
   ✅ Email: sarah.johnson@vetpractice.com
   ✅ Zoom Link: Valid URL
   ✅ Questions Link: Valid URL
   ✅ All required fields present

2. Michael Chen ⚠️
   ✅ Email: mchen@animalcare.com
   ⚠️  Zoom Link: Missing
   ✅ Questions Link: Valid URL
   ⚠️  First name missing (using "Michael" from full name)

3. Dr. Amanda Rodriguez ❌
   ❌ Email: Invalid format (missing @)
   ❌ Zoom Link: Missing
   ✅ Questions Link: Valid URL
   ❌ Cannot import - critical errors

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 IMPORT SUMMARY
✅ Ready to import: 1 panelist
⚠️  Import with warnings: 1 panelist (Michael Chen)
❌ Cannot import: 1 panelist (Amanda Rodriguez)

🎯 RECOMMENDED ACTIONS
1. Fix Amanda Rodriguez's email and add Zoom link
2. Add Michael Chen's Zoom link (optional: can import without it)
3. Re-upload corrected CSV

💡 Would you like to:
1. Import the 2 valid panelists now
2. Fix errors and re-upload
3. Edit individual records manually
4. Cancel import
```

### Example 3: Email Generation Complete
```
📧 EMAIL GENERATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Event: "The Workforce Crisis: Real Strategies for Veterinary Talent Solutions"
Generated: 48 emails (16 templates × 3 panelists)
Duration: 2.3 seconds

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📨 EMAIL BREAKDOWN

PRE-EVENT RECRUITMENT (E-22 to E-15):
✅ E-22: Panel Invitation → 3 emails
✅ E-15: Panel Confirmation → 3 emails
✅ QUESTIONS: Question Confirmation → 3 emails

PREPARATION PHASE (E-15 to E-1):
✅ E-10: Reminder → 3 emails
✅ E-8: Panelist Check-In → 3 emails
✅ PANEL-ASSETS: Panel Assets → 3 emails
✅ E-4: Final Reminder → 3 emails
✅ PROMO: Promotional Materials → 3 emails
✅ PARTNER: Partner Details → 3 emails
✅ EVENT-Q: Event Questions → 3 emails
✅ E-1-DAY: Day Before → 3 emails
✅ E-1-TECH: Tech Check → 3 emails

EVENT DAY (E-0):
✅ E-0: Event Day Instructions → 3 emails

POST-EVENT (E+1 to E+7):
✅ E+1: Thank You → 3 emails
✅ E+7: Recording Share → 1 email

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 EXPORT LOCATION
C:\Users\...\CLaude Vet\Panel_Events\Oct_29_2025_Workforce_Crisis\Emails\

├── Sarah_Johnson/
│   ├── 20250929_153045_E-22_Panel_Invitation.html
│   ├── 20250929_153045_E-15_Panel_Confirmation.html
│   └── ... (14 more emails)
├── Michael_Chen/
│   └── ... (16 emails)
└── Amanda_Rodriguez/
    └── ... (16 emails)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 NEXT STEPS
1. Review emails in export folder
2. Copy to Outlook for scheduled sends
3. Use `*schedule-campaign` to see exact send dates
4. Track email performance once sent

💡 TIP: E-22 emails should be sent 22 days before Oct 29 (October 7, 2025)
```

## Benefits of This Output Style

### For Users
- ✅ **Instantly understand context** - Visual hierarchy and icons
- ✅ **Know what to do next** - Always includes action steps
- ✅ **Make informed decisions** - Complete data with comparisons
- ✅ **Navigate easily** - Consistent structure across agents
- ✅ **Stay organized** - Event-phase awareness throughout

### For Agents
- ✅ **Maintain consistency** - Standardized response templates
- ✅ **Communicate clearly** - Visual indicators and formatting
- ✅ **Provide context** - Event-aware language
- ✅ **Drive action** - Next steps in every response
- ✅ **Show expertise** - Professional, organized presentation

## Customization

The output style can be customized by editing:
```
.claude/output-styles/vbi-panel-event.md
```

You can modify:
- Icon choices
- Visual separators
- Response templates
- Tone and style guidelines
- Agent-specific variations

## Testing the Output Style

Try these commands to see the output style in action:

```bash
# Activate VBI system
/vbi

# Test email manager responses
*agent email-manager
*help

# Test analytics responses
*agent analytics
*help

# Test event coordinator responses
*agent event-coordinator
*help
```

Each agent should now follow the VBI output style conventions for consistent, professional, and highly organized responses.

---

**The VBI Output Style is now active and integrated with your agent system!** 🎨
