# VBI Panel Email Generator - Spreadsheet Integration Guide

**Complete Documentation for Event Checklist and Event Panel Tracker Integration**

Last Updated: October 24, 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Event Checklist](#event-checklist)
5. [Event Panel Tracker](#event-panel-tracker)
6. [File Upload Process](#file-upload-process)
7. [Data Structures](#data-structures)
8. [Usage Instructions](#usage-instructions)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The VBI Panel Email Generator now includes **two powerful spreadsheet management tools** integrated directly into the application:

1. **Event Checklist** - Comprehensive task management across 5 phases of event planning
2. **Event Panel Tracker** - Registration tracking with ICP classification and conversion metrics

Both tools support Excel (.xlsx) and CSV file import/export, providing seamless integration with existing workflows.

---

## Features

### Event Checklist Features

- **5-Phase Task Management:**
  - Phase 1: Pre-Event Planning (6-8 weeks before)
  - Phase 2: Pre-Webinar/Summit Tasks
  - Phase 3: 1 Week Before Event
  - Phase 4: During the Event
  - Phase 5 - Post Event: Post-event activities
  - Phase 5 - Promotions: Promotional activities

- **Task Tracking:**
  - Task name and description
  - Countdown days to deadline
  - Deadline date
  - Completion date
  - Status dropdown (Please Select, In Progress, Completed, Blocked, Not Applicable)
  - Sample links and actual links
  - Progress bars per phase
  - Completion percentage

- **File Operations:**
  - Import from Excel (.xlsx) or CSV
  - Export to Excel with full formatting
  - Real-time auto-save
  - Event details header (event type, topic, date, time, team members)

### Event Panel Tracker Features

- **Real-Time Metrics Dashboard:**
  - Total Registrations
  - ICP Registrations (Ideal Customer Profile)
  - Non-ICP Registrations
  - Total Attendees
  - ICP Attendees
  - MSMs Completed (Marketing Strategy Meetings)
  - Conversion Rate calculation

- **Registration Tracking:**
  - 26 data fields per registration
  - ICP confirmation workflow
  - Attendance tracking
  - Manager verification system
  - MSM conversion status
  - Sales pipeline tracking
  - Notes and custom fields

- **Filtering and Search:**
  - Filter by ICP status (All, ICP Only, Non-ICP Only)
  - Search by name, email, practice, source
  - Real-time metrics recalculation

- **File Operations:**
  - Import from Excel (.xlsx) or CSV
  - Export to Excel with metrics
  - Auto-save functionality

---

## Architecture

### Technology Stack

- **Excel Parsing:** `xlsx` library (v0.18.5)
- **State Management:** Zustand with localStorage persistence
- **UI Components:** React with TypeScript
- **Styling:** Tailwind CSS

### Data Flow

```
Excel/CSV File Upload
    ↓
File Reader API
    ↓
XLSX Parser (excelParser.ts)
    ↓
Type-Safe Data Structures
    ↓
Zustand Store (panelStore.ts)
    ↓
localStorage Persistence
    ↓
React Components (Viewer Components)
```

### File Structure

```
src/
├── types.ts                              # TypeScript type definitions
├── panelStore.ts                         # State management
├── utils/
│   └── excelParser.ts                   # Excel parsing utilities
└── components/
    ├── EventChecklistViewer.tsx         # Checklist UI
    └── EventPanelTrackerViewer.tsx      # Tracker UI
```

---

## Event Checklist

### File Format

The Event Checklist expects the following structure:

**Header Section (Rows 1-22):**
- Event Type
- Event Topic
- Event Presenter
- Event Date and Time
- Allocated AE
- Number of Speakers
- Team Member and Team Lead

**Task Sections:**
Each phase contains:
- Task Name (Column A)
- Countdown Days (Column E)
- Deadline (Column F)
- Date Completed (Column G)
- Sample Links (Column H)
- Actual Links (Column I)
- Status (Column J)

### Supported Statuses

- **Please Select** - Default, not started
- **In Progress** - Currently working on
- **Completed** - Task finished
- **Blocked** - Waiting on dependencies
- **Not Applicable** - Task not relevant

### Example Task

```
Task: Email Jayani the details to create the zoom registration page
Countdown Days: 27
Deadline: 4 Sep 2025
Date Completed: (empty until done)
Sample Links: https://docs.google.com/document/d/...
Actual Links: (filled when completed)
Status: In Progress
```

### Phase Completion Tracking

The viewer automatically calculates:
- Tasks completed per phase
- Total tasks per phase
- Completion percentage
- Visual progress bars

---

## Event Panel Tracker

### File Format

The Event Panel Tracker expects:

**Metrics Section (Rows 1-21):**
- Total ICP and Non-ICP Registrations
- Total ICP Registrations
- Total Non-ICP Registrations
- Attendees counts
- Direct vs Partner registrations
- MSM booking and completion metrics
- Attendee list link
- Lead list shared date/time

**Registration Data (Row 23+):**
- Date Added
- Product (VET, DENTAL, BOA, LAW, etc.)
- Event Name
- First Name, Last Name, Email
- Phone
- Registration Time
- Role, Practice Name
- Questions
- Source Name (which panelist referred)
- Country
- Lead Type (Direct/Partner)
- ICP Confirmation status
- Attendance (TRUE/FALSE)
- Manager Verification (TRUE/FALSE)
- Notes
- MSM Conversion Status
- MSM Score, Type, Count
- Ekwa Sales Status
- CSM Conversion Status
- Coaching Sales Status

### ICP Confirmation Values

- **ICP Confirmed** - Verified ideal customer
- **Non-ICP** - Not a target customer
- **Pending Review** - Awaiting verification
- **(Empty)** - Not yet reviewed

### MSM Conversion Status

- **Booked** - MSM scheduled
- **Completed** - MSM finished
- **No Show** - Registrant didn't attend
- **Cancelled** - MSM cancelled

### Metrics Calculation

The system automatically recalculates all metrics when registrations are updated:

```typescript
ICP Conversion Rate = (ICP MSMs Completed / Total ICP Registrations) × 100
Attendance Rate = (Total Attendees / Total Registrations) × 100
ICP Attendance Rate = (ICP Attendees / ICP Registrations) × 100
```

---

## File Upload Process

### Upload to Event Checklist

1. Click the **"Checklist"** tab in the sidebar
2. Click **"Upload Checklist"** button in main area
3. Select your Excel (.xlsx) or CSV file
4. System parses the file automatically
5. Data appears immediately in the viewer
6. Edit any field inline
7. Changes auto-save to localStorage

### Upload to Event Panel Tracker

1. Click the **"Tracker"** tab in the sidebar
2. Click **"Upload Tracker"** button in main area
3. Select your Excel (.xlsx) or CSV file
4. System parses and calculates metrics
5. Registration list appears with filters
6. Edit registrations inline
7. Metrics recalculate automatically
8. Changes auto-save to localStorage

### Export Process

**Event Checklist Export:**
1. Open Event Checklist
2. Click **"Export"** button
3. Excel file downloads: `Event_Checklist_[Topic]_[Date].xlsx`
4. Contains all tasks, phases, and event details

**Event Panel Tracker Export:**
1. Open Event Panel Tracker
2. Click **"Export"** button
3. Excel file downloads: `Event_Panel_Tracker_[EventName]_[Date].xlsx`
4. Contains metrics section and full registration list

---

## Data Structures

### EventChecklist Type

```typescript
{
  id: string;
  eventId?: string;              // Link to Panel Event
  eventType: string;
  eventTopic: string;
  eventPresenter: string;
  eventDate: string;
  eventTime: string;
  allocatedAE: string;
  numberOfSpeakers: number;
  teamMember: string;
  teamLead: string;
  tasks: EventChecklistTask[];
  createdAt: string;
  updatedAt: string;
}
```

### EventChecklistTask Type

```typescript
{
  id: string;
  phase: 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Phase 4' | 'Phase 5 - Post Event' | 'Phase 5 - Promotions';
  taskName: string;
  countdownDays: number;
  deadline: string;
  dateCompleted?: string;
  sampleLinks?: string;
  actualLinks?: string;
  status: 'Please Select' | 'In Progress' | 'Completed' | 'Blocked' | 'Not Applicable';
  notes?: string;
}
```

### EventPanelTracker Type

```typescript
{
  id: string;
  eventId?: string;
  eventName: string;
  eventDate: string;
  product: 'VET' | 'DENTAL' | 'BOA' | 'LAW' | 'TD' | 'IU' | 'RIDA' | 'DMS';
  totalRegistrations: number;
  totalIcpRegistrations: number;
  totalNonIcpRegistrations: number;
  totalAttendees: number;
  icpAttendees: number;
  nonIcpAttendees: number;
  directRegistrations: number;
  partnerRegistrations: number;
  directMsmsBooked: number;
  directIcpMsmsBooked: number;
  bdrMsmsBooked: number;
  bdrIcpMsmsBooked: number;
  directMsmsCompleted: number;
  bdrMsmsCompleted: number;
  totalIcpMsmsBooked: number;
  totalIcpMsmsCompleted: number;
  attendeeListLink?: string;
  leadListSharedWithSales?: string;
  createdAt: string;
  updatedAt: string;
  registrations: PanelRegistration[];
}
```

### PanelRegistration Type

```typescript
{
  id: string;
  dateAdded: string;
  product: 'VET' | 'DENTAL' | 'BOA' | 'LAW' | 'TD' | 'IU' | 'RIDA' | 'DMS';
  eventName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  registrationTime: string;
  role?: string;
  practiceName?: string;
  questions?: string;
  sourceName: string;
  country: string;
  leadType: 'Direct' | 'Partner';
  icpConfirmation: 'ICP Confirmed' | 'Non-ICP' | 'Pending Review' | '';
  attendance: boolean;
  managerVerification: boolean;
  notes?: string;
  msmConversionStatus?: 'Booked' | 'Completed' | 'No Show' | 'Cancelled' | '';
  msmScore?: number;
  msmType?: 'Direct' | 'BDR' | '';
  msmsCompleted?: number;
  ekwaSalesStatus?: 'Converted' | 'In Pipeline' | 'Lost' | '';
  csmConversionStatus?: 'Converted' | 'In Pipeline' | 'Lost' | '';
  csmType?: string;
  csmsCompleted?: number;
  coachingSalesStatus?: string;
}
```

---

## Usage Instructions

### Starting the Application

```bash
# Navigate to project directory
cd "C:\Users\Bizycorp_Work\Documents\CLaude Vet"

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Open in browser
# Navigate to http://localhost:5173
```

### Workflow for Event Checklist

1. **Import Existing Checklist:**
   - Click "Checklist" tab
   - Upload your "Event Management - Checklists for Panels.xlsx"
   - Verify all tasks imported correctly

2. **Manage Tasks:**
   - Update status dropdowns as tasks progress
   - Fill in completion dates
   - Add actual links when available
   - Monitor phase completion percentages

3. **Export Updated Checklist:**
   - Click "Export" button
   - Share Excel file with team
   - Use for reporting and archiving

### Workflow for Event Panel Tracker

1. **Import Registration Data:**
   - Click "Tracker" tab
   - Upload your "Events_ PANELS.xlsx"
   - Verify metrics calculated correctly

2. **Review Registrations:**
   - Use search to find specific registrants
   - Filter by ICP status
   - Update ICP confirmation statuses
   - Mark attendance
   - Track MSM conversions

3. **Monitor Metrics:**
   - Check conversion rates
   - Identify high-performing panelists
   - Track ICP vs Non-ICP ratios
   - Share metrics with sales team

4. **Export Tracker:**
   - Click "Export" button
   - Share with sales team
   - Archive for historical tracking

---

## Troubleshooting

### Excel File Won't Upload

**Problem:** File upload fails or shows error

**Solutions:**
1. Verify file is .xlsx or .xls format (not .xlsm with macros)
2. Check file isn't corrupted - open in Excel first
3. Ensure file matches expected structure
4. Try exporting from Excel as ".xlsx (Excel Workbook)"
5. Check browser console for specific error messages

### CSV File Import Issues

**Problem:** CSV import doesn't work correctly

**Solutions:**
1. Ensure CSV is UTF-8 encoded
2. Check for proper comma delimiters
3. Verify headers match expected format
4. Try opening in Excel and saving as .xlsx instead

### Data Not Persisting

**Problem:** Changes disappear after refresh

**Solutions:**
1. Check browser localStorage isn't full
2. Clear browser cache if corrupted
3. Ensure JavaScript is enabled
4. Check browser console for storage errors

### Metrics Not Calculating

**Problem:** Dashboard shows 0 or incorrect values

**Solutions:**
1. Verify ICP Confirmation values are set correctly
2. Check attendance checkboxes are marked
3. Ensure MSM statuses are filled in
4. Re-import file if data seems corrupted

### Export Creates Empty File

**Problem:** Downloaded Excel file is empty or incomplete

**Solutions:**
1. Ensure data is loaded before exporting
2. Check browser allows downloads
3. Try different browser if issue persists
4. Verify JavaScript has permissions to create files

---

## Best Practices

### Event Checklist

1. **Import Early:** Upload checklist as soon as event is scheduled
2. **Update Regularly:** Mark task statuses daily
3. **Use Actual Links:** Always fill in actual links when available
4. **Track Deadlines:** Monitor countdown days and adjust workload
5. **Complete Phases:** Finish one phase before moving to next
6. **Export Weekly:** Create weekly snapshots for team review

### Event Panel Tracker

1. **Import Immediately:** Upload registration data as soon as available
2. **Verify ICP Status:** Review and confirm ICP status within 24 hours
3. **Track Attendance:** Update attendance during or immediately after event
4. **Follow Up MSMs:** Update MSM status weekly
5. **Share with Sales:** Export and share updated tracker daily
6. **Monitor Metrics:** Check dashboard daily for trends

---

## Support

For questions or issues:

1. Check this documentation first
2. Review console errors in browser DevTools
3. Verify file formats match specifications
4. Contact VBI marketing team for assistance

---

**Document Version:** 1.0
**Last Updated:** October 24, 2025
**Author:** Claude (Anthropic AI)
**For:** VBI Marketing Team
