/**
 * Excel File Parsing Utilities
 * Handles reading and parsing Excel files (.xlsx) for Event Checklist and Event Panel Tracker
 */

import * as XLSX from 'xlsx';
import type {
  EventChecklist,
  EventChecklistTask,
  EventPanelTracker,
  PanelRegistration,
} from '../types';

/**
 * Read an Excel file and return workbook
 */
export async function readExcelFile(file: File): Promise<XLSX.WorkBook> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        resolve(workbook);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
}

/**
 * Parse Event Checklist from Excel file
 * Based on "Event Management - Checklists for Panels"
 */
export function parseEventChecklist(workbook: XLSX.WorkBook): EventChecklist {
  const sheetName = workbook.SheetNames[0]; // Assuming first sheet
  const worksheet = workbook.Sheets[sheetName];
  const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Extract event details from specific rows
  const eventType = data[10]?.[1] || '';
  const eventTopic = data[11]?.[1] || '';
  const eventPresenter = data[12]?.[1] || '';
  const eventDate = data[16]?.[2] || '';
  const eventTime = data[16]?.[3] || '';
  const allocatedAE = data[18]?.[1] || '';
  const numberOfSpeakers = parseInt(data[19]?.[1]) || 1;
  const teamMember = data[20]?.[1] || '';
  const teamLead = data[21]?.[1] || '';

  const tasks: EventChecklistTask[] = [];

  // Parse Phase 1 tasks (rows 8-22)
  parseTasksFromRows(data, 8, 22, 'Phase 1', tasks);

  // Parse Phase 2 tasks (rows 24-90)
  parseTasksFromRows(data, 24, 90, 'Phase 2', tasks);

  // Parse Phase 3 tasks (rows 77-91)
  parseTasksFromRows(data, 77, 91, 'Phase 3', tasks);

  // Parse Phase 4 tasks (rows 92-108)
  parseTasksFromRows(data, 92, 108, 'Phase 4', tasks);

  // Parse Phase 5 - Post Event tasks (rows 109-129)
  parseTasksFromRows(data, 109, 129, 'Phase 5 - Post Event', tasks);

  // Parse Phase 5 - Promotions tasks (rows 130-141)
  parseTasksFromRows(data, 130, 141, 'Phase 5 - Promotions', tasks);

  return {
    id: crypto.randomUUID(),
    eventType,
    eventTopic,
    eventPresenter,
    eventDate,
    eventTime,
    allocatedAE,
    numberOfSpeakers,
    teamMember,
    teamLead,
    tasks,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Helper function to parse tasks from specific row range
 */
function parseTasksFromRows(
  data: any[][],
  startRow: number,
  endRow: number,
  phase: EventChecklistTask['phase'],
  tasks: EventChecklistTask[]
): void {
  for (let i = startRow; i <= endRow; i++) {
    const row = data[i];
    if (!row || !row[0]) continue; // Skip empty rows

    const taskName = row[0]?.toString() || '';
    if (!taskName || taskName.includes('Phase') || taskName.includes('Task Breakdown')) {
      continue; // Skip header rows
    }

    tasks.push({
      id: crypto.randomUUID(),
      phase,
      taskName,
      countdownDays: parseInt(row[4]) || 0,
      deadline: row[5]?.toString() || '',
      dateCompleted: row[6]?.toString() || undefined,
      sampleLinks: row[7]?.toString() || undefined,
      actualLinks: row[8]?.toString() || undefined,
      status: (row[9]?.toString() as any) || 'Please Select',
    });
  }
}

/**
 * Parse Event Panel Tracker from Excel file
 * Based on "Events_ PANELS"
 */
export function parseEventPanelTracker(workbook: XLSX.WorkBook): EventPanelTracker {
  const sheetName = workbook.SheetNames[0]; // Assuming first sheet
  const worksheet = workbook.Sheets[sheetName];
  const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Extract summary metrics from top rows
  const totalRegistrations = parseInt(data[5]?.[1]) || 0;
  const totalIcpRegistrations = parseInt(data[7]?.[1]) || 0;
  const totalNonIcpRegistrations = parseInt(data[8]?.[1]) || 0;
  const totalAttendees = parseInt(data[9]?.[1]) || 0;
  const icpAttendees = parseInt(data[10]?.[1]) || 0;
  const nonIcpAttendees = parseInt(data[11]?.[1]) || 0;
  const directRegistrations = parseInt(data[12]?.[1]) || 0;
  const partnerRegistrations = parseInt(data[13]?.[1]) || 0;
  const directMsmsBooked = parseInt(data[14]?.[1]) || 0;
  const directIcpMsmsBooked = parseInt(data[15]?.[1]) || 0;
  const bdrMsmsBooked = parseInt(data[16]?.[1]) || 0;
  const bdrIcpMsmsBooked = parseInt(data[17]?.[1]) || 0;
  const directMsmsCompleted = parseInt(data[18]?.[1]) || 0;
  const bdrMsmsCompleted = parseInt(data[19]?.[1]) || 0;
  const totalIcpMsmsBooked = parseInt(data[20]?.[1]) || 0;
  const totalIcpMsmsCompleted = parseInt(data[21]?.[1]) || 0;

  const attendeeListLink = data[4]?.[1]?.toString() || undefined;
  const leadListSharedWithSales = data[5]?.[3]?.toString() || undefined;

  // Parse registration data (starts from row 23)
  const registrations: PanelRegistration[] = [];
  const headerRow = 23;

  for (let i = headerRow + 1; i < data.length; i++) {
    const row = data[i];
    if (!row || !row[3] || !row[4]) continue; // Skip if no first/last name

    registrations.push({
      id: crypto.randomUUID(),
      dateAdded: row[0]?.toString() || '',
      product: (row[1]?.toString() as any) || 'VET',
      eventName: row[2]?.toString() || '',
      firstName: row[3]?.toString() || '',
      lastName: row[4]?.toString() || '',
      email: row[5]?.toString() || '',
      phone: row[6]?.toString() || undefined,
      registrationTime: row[7]?.toString() || '',
      role: row[8]?.toString() || undefined,
      practiceName: row[9]?.toString() || undefined,
      questions: row[10]?.toString() || undefined,
      sourceName: row[11]?.toString() || '',
      country: row[12]?.toString() || '',
      leadType: (row[13]?.toString() as any) || 'Partner',
      icpConfirmation: (row[14]?.toString() as any) || '',
      attendance: row[15]?.toString()?.toUpperCase() === 'TRUE' || false,
      managerVerification: row[16]?.toString()?.toUpperCase() === 'TRUE' || false,
      notes: row[17]?.toString() || undefined,
      msmConversionStatus: (row[18]?.toString() as any) || undefined,
      msmScore: parseInt(row[19]) || undefined,
      msmType: (row[20]?.toString() as any) || undefined,
      msmsCompleted: parseInt(row[21]) || undefined,
      ekwaSalesStatus: (row[22]?.toString() as any) || undefined,
      csmConversionStatus: (row[23]?.toString() as any) || undefined,
      csmType: row[24]?.toString() || undefined,
      csmsCompleted: parseInt(row[25]) || undefined,
      coachingSalesStatus: row[26]?.toString() || undefined,
    });
  }

  const eventName = registrations[0]?.eventName || '';
  const product = registrations[0]?.product || 'VET';
  const eventDate = data[12]?.[3]?.toString() || '';

  return {
    id: crypto.randomUUID(),
    eventName,
    eventDate,
    product,
    totalRegistrations,
    totalIcpRegistrations,
    totalNonIcpRegistrations,
    totalAttendees,
    icpAttendees,
    nonIcpAttendees,
    directRegistrations,
    partnerRegistrations,
    directMsmsBooked,
    directIcpMsmsBooked,
    bdrMsmsBooked,
    bdrIcpMsmsBooked,
    directMsmsCompleted,
    bdrMsmsCompleted,
    totalIcpMsmsBooked,
    totalIcpMsmsCompleted,
    attendeeListLink,
    leadListSharedWithSales,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    registrations,
  };
}

/**
 * Parse CSV file and detect type (Checklist vs Tracker)
 */
export async function parseCSVFile(file: File): Promise<EventChecklist | EventPanelTracker | null> {
  const text = await file.text();
  const lines = text.split('\n');

  // Detect file type by checking headers
  if (text.includes('GENERAL EVENT GUIDELINE') || text.includes('Phase 1: Pre-Event Planning')) {
    // It's an Event Checklist
    const workbook = XLSX.read(text, { type: 'string' });
    return parseEventChecklist(workbook);
  } else if (text.includes('ICP Guidelines') || text.includes('ICP REGISTRATIONS')) {
    // It's an Event Panel Tracker
    const workbook = XLSX.read(text, { type: 'string' });
    return parseEventPanelTracker(workbook);
  }

  return null;
}

/**
 * Export Event Checklist to Excel
 */
export function buildEventChecklistSheetData(checklist: EventChecklist): (string | number)[][] {
  const wsData: (string | number)[][] = [
    ['GENERAL EVENT GUIDELINE'],
    [],
    ['Event Details', '', '', '', 'Count down and Deadline', '', 'Date Completed', 'Sample Links', 'Actual Links', 'Status'],
    ['Event Type', checklist.eventType],
    ['Event Topic', checklist.eventTopic],
    ['Event Presenter', checklist.eventPresenter],
    ['Event Date', '', checklist.eventDate],
    ['Event Time', '', checklist.eventTime],
    ['Allocated AE', checklist.allocatedAE],
    ['Number of speakers', checklist.numberOfSpeakers],
    ['Team Member', checklist.teamMember],
    ['Team Lead', checklist.teamLead],
    [],
  ];

  // Group tasks by phase
  const phases = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5 - Post Event', 'Phase 5 - Promotions'];

  phases.forEach((phase) => {
    wsData.push([phase]);
    wsData.push(['Task Breakdown', '', '', '', 'Count down and Deadline', '', 'Date Completed', 'Sample Links', 'Actual Links', 'Status']);

    const phaseTasks = checklist.tasks.filter((t) => t.phase === phase);
    phaseTasks.forEach((task) => {
      wsData.push([
        task.taskName,
        '',
        '',
        '',
        task.countdownDays,
        task.deadline,
        task.dateCompleted || '',
        task.sampleLinks || '',
        task.actualLinks || '',
        task.status,
      ]);
    });
    wsData.push([]);
  });

  return wsData;
}

export function exportEventChecklistToExcel(checklist: EventChecklist): void {
  const wb = XLSX.utils.book_new();
  const wsData = buildEventChecklistSheetData(checklist);
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, 'Event Checklist');

  // Download
  XLSX.writeFile(wb, `Event_Checklist_${checklist.eventTopic}_${new Date().toISOString().split('T')[0]}.xlsx`);
}

/**
 * Export Event Panel Tracker to Excel
 */
export function exportEventPanelTrackerToExcel(tracker: EventPanelTracker): void {
  const wb = XLSX.utils.book_new();

  // Create header rows with metrics
  const wsData: any[][] = [
    ['ICP Guidelines - ICP REGISTRATIONS_ Marketing 01 - panels'],
    [],
    [],
    ['LINK TO THE ATTENDEE LIST', tracker.attendeeListLink || ''],
    ['TOTAL ICP and NON ICP REGISTRATIONS', tracker.totalRegistrations, 'Date and Time shared with Sales', tracker.leadListSharedWithSales],
    [],
    ['TOTAL ICP REGISTRATIONS', tracker.totalIcpRegistrations],
    ['TOTAL NON ICP REGISTRATIONS', tracker.totalNonIcpRegistrations],
    ['ATTENDEES - ICP/NON ICPs', tracker.totalAttendees],
    ['ATTENDEES - ICPs', tracker.icpAttendees],
    ['ATTENDEES - Non ICP Attendees', tracker.nonIcpAttendees],
    ['TOTAL DIRECT REGISTRATIONS', tracker.directRegistrations],
    ['TOTAL PARTNER REGISTRATIONS', tracker.partnerRegistrations],
    ['Direct MSMs Booked', tracker.directMsmsBooked],
    ['Direct ICP MSMs Booked', tracker.directIcpMsmsBooked],
    ['BDR Booked MSMs', tracker.bdrMsmsBooked],
    ['BDR ICP MSMs Booked', tracker.bdrIcpMsmsBooked],
    ['Direct Completed MSMs', tracker.directMsmsCompleted],
    ['BDR Completed MSMs', tracker.bdrMsmsCompleted],
    ['Total ICP MSMs Booked', tracker.totalIcpMsmsBooked],
    ['Total ICP MSMs Completed', tracker.totalIcpMsmsCompleted],
    [],
    ['Date Added', 'Product', 'Event Name', 'First Name', 'Last Name', 'Email', 'Phone', 'Registration Time', 'Role', 'Practice Name', 'Questions', 'Source Name', 'Country', 'LEAD Type', 'ICP Confirmation', 'Attendance', 'Manager Verification', 'Notes', 'MSM Conversion Status', 'MSM Score', 'MSM Type', 'MSMs Completed', 'Ekwa Sales Status', 'CSM Conversion Status', 'CSM Type', 'CSMs Completed', 'Coaching Sales Status'],
  ];

  // Add registration data
  tracker.registrations.forEach((reg) => {
    wsData.push([
      reg.dateAdded,
      reg.product,
      reg.eventName,
      reg.firstName,
      reg.lastName,
      reg.email,
      reg.phone || '',
      reg.registrationTime,
      reg.role || '',
      reg.practiceName || '',
      reg.questions || '',
      reg.sourceName,
      reg.country,
      reg.leadType,
      reg.icpConfirmation,
      reg.attendance ? 'TRUE' : '',
      reg.managerVerification ? 'TRUE' : '',
      reg.notes || '',
      reg.msmConversionStatus || '',
      reg.msmScore || '',
      reg.msmType || '',
      reg.msmsCompleted || '',
      reg.ekwaSalesStatus || '',
      reg.csmConversionStatus || '',
      reg.csmType || '',
      reg.csmsCompleted || '',
      reg.coachingSalesStatus || '',
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, tracker.product);

  // Download
  XLSX.writeFile(wb, `Event_Panel_Tracker_${tracker.eventName}_${new Date().toISOString().split('T')[0]}.xlsx`);
}
