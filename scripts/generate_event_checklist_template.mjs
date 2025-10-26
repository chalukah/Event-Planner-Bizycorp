import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import XLSX from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_FILENAME = 'Event Management - Checklists for Panels (1).xlsx';
const altFilenames = [
  DEFAULT_FILENAME,
  'Events_ PANELS_filled.xlsx',
  'Event Management - Checklists.xlsx'
];

const baseDir = path.resolve(__dirname, '../Event_Panel_Checklist');

const workbookPath = altFilenames
  .map((filename) => path.join(baseDir, filename))
  .find((fullPath) => fs.existsSync(fullPath));

if (!workbookPath) {
  console.error('Could not find checklist workbook in', baseDir);
  process.exit(1);
}

const workbook = XLSX.readFile(workbookPath, { cellDates: true });
const preferredSheets = [
  'Event Checklist - Panel',
  'Panel Template',
  'Template'
];

const sheetNameCandidate =
  preferredSheets.find((name) =>
    workbook.SheetNames.some((sheet) => sheet.toLowerCase() === name.toLowerCase())
  ) ??
  workbook.SheetNames.find((name) =>
    preferredSheets.some((target) => name.toLowerCase().includes(target.toLowerCase()))
  ) ??
  workbook.SheetNames[0];

const actualSheetName = workbook.SheetNames.find(
  (name) => name.toLowerCase() === sheetNameCandidate?.toLowerCase()
) ?? workbook.SheetNames[0];

if (!actualSheetName) {
  console.error('No worksheets found in workbook');
  process.exit(1);
}

const worksheet = workbook.Sheets[actualSheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, blankrows: false });
const getCell = (rowIndex, colIndex) => {
  const value = data[rowIndex]?.[colIndex];
  if (value === undefined || value === null) return '';
  return value.toString().trim();
};

const eventChecklist = {
  id: 'template-default',
  eventType: getCell(10, 1),
  eventTopic: getCell(11, 1),
  eventPresenter: getCell(12, 1),
  eventDate: getCell(16, 2),
  eventTime: getCell(16, 3),
  allocatedAE: getCell(18, 1),
  numberOfSpeakers: Number.parseInt(getCell(19, 1) || '1', 10) || 1,
  teamMember: getCell(20, 1),
  teamLead: getCell(21, 1),
  tasks: [],
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z'
};

const phases = [
  { start: 8, end: 22, name: 'Phase 1' },
  { start: 24, end: 90, name: 'Phase 2' },
  { start: 77, end: 91, name: 'Phase 3' },
  { start: 92, end: 108, name: 'Phase 4' },
  { start: 109, end: 129, name: 'Phase 5 - Post Event' },
  { start: 130, end: 141, name: 'Phase 5 - Promotions' }
];

let taskCounter = 1;

const toTaskId = () => `template-task-${taskCounter.toString().padStart(3, '0')}`;

function parseTasks(startRow, endRow, phaseName) {
  for (let row = startRow; row <= endRow; row += 1) {
    const raw = data[row];
    if (!raw || raw.length === 0) continue;
    const taskName = raw[0]?.toString().trim();
    if (!taskName) continue;
    if (taskName.toLowerCase().includes('phase') || taskName.toLowerCase().includes('task breakdown')) {
      continue;
    }

    const countdownCell = raw[4];
    let countdown = 0;
    if (typeof countdownCell === 'number') {
      countdown = countdownCell;
    } else if (typeof countdownCell === 'string') {
      const parsed = Number.parseInt(countdownCell.replace(/[^\d-]/g, '') || '0', 10);
      countdown = Number.isNaN(parsed) ? 0 : parsed;
    }
    const deadline = raw[5]?.toString()?.trim() || '';
    const dateCompleted = raw[6]?.toString()?.trim() || '';
    const sampleLinks = raw[7]?.toString()?.trim();
    const actualLinks = raw[8]?.toString()?.trim();
    const status = raw[9]?.toString()?.trim() || 'Please Select';

    const task = {
      id: toTaskId(),
      phase: phaseName,
      taskName,
      countdownDays: countdown,
      deadline,
      status
    };

    if (dateCompleted) task.dateCompleted = dateCompleted;
    if (sampleLinks) task.sampleLinks = sampleLinks;
    if (actualLinks) task.actualLinks = actualLinks;

    eventChecklist.tasks.push(task);
    taskCounter += 1;
  }
}

phases.forEach(({ start, end, name }) => parseTasks(start, end, name));

const templateChecklist = eventChecklist;

const oct22Checklist = {
  ...templateChecklist,
  id: 'oct-22-event-checklist',
  eventType: 'Webinar - Panel Discussion with Q&A',
  eventTopic: 'When Tech Helps - and When It Hurts - the Human-Animal Connection',
  eventPresenter: 'Chehara Bandara',
  eventDate: 'October 22, 2025',
  eventTime: '8:00 PM - 9:00 PM EST',
  numberOfSpeakers: 2,
  teamMember: 'Liyanna Faith',
  teamLead: 'Chehara Bandara',
  tasks: templateChecklist.tasks.map((task, index) => ({
    ...task,
    id: `oct22-task-${String(index + 1).padStart(3, '0')}`,
    dateCompleted: undefined,
    actualLinks: undefined,
    status: 'Please Select'
  })),
  createdAt: '2025-10-01T00:00:00.000Z',
  updatedAt: '2025-10-01T00:00:00.000Z'
};

const outputPath = path.resolve(__dirname, '../src/data/eventChecklistTemplate.ts');
const banner = `/**
 * Auto-generated from ${path.relative(path.resolve(__dirname, '..'), workbookPath)}
 * Run \`node scripts/generate_event_checklist_template.mjs\` to regenerate.
 */
import type { EventChecklist } from '../types';

export const EVENT_PLAN_CHECKLIST_TEMPLATE: EventChecklist = ${JSON.stringify(templateChecklist, null, 2)};

export const DEFAULT_EVENT_CHECKLIST = EVENT_PLAN_CHECKLIST_TEMPLATE;

export const OCT22_EVENT_CHECKLIST: EventChecklist = ${JSON.stringify(oct22Checklist, null, 2)};

export const EVENT_CHECKLIST_SEEDS: EventChecklist[] = [
  EVENT_PLAN_CHECKLIST_TEMPLATE,
  OCT22_EVENT_CHECKLIST
];
`;

fs.writeFileSync(outputPath, banner, 'utf8');

console.log(
  `Generated checklist seeds with ${templateChecklist.tasks.length} tasks at ${outputPath}`
);
