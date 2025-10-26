import { useEffect, useMemo, useRef, useState } from 'react';
import { Upload, Download, Save, PanelLeftClose, BookTemplate, ChevronRight, ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { usePanelStore } from '../panelStore';
import type { EventChecklist, EventChecklistTask } from '../types';
import { readExcelFile, parseEventChecklist, exportEventChecklistToExcel, parseCSVFile } from '../utils/excelParser';
import { ChecklistSpreadsheet } from './ChecklistSpreadsheet';
import { ReactSpreadsheetComponent, type SavedTemplate } from './ReactSpreadsheetComponent';

const GOOGLE_TEMPLATE_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSBDiVAgzq_SY4WDohhHxMw2AL0spH9esqI7KGu-Omai8ZQ8riqSxx48IrmLMYexTiDs_VRaNbADLPt/pub?gid=2001194011&single=true&output=csv';

type EventChecklistViewerProps = {
  checklistId?: string;
};

export function EventChecklistViewer({ checklistId }: EventChecklistViewerProps) {
  const eventChecklists = usePanelStore((s) => s.eventChecklists);
  const updateEventChecklist = usePanelStore((s) => s.updateEventChecklist);
  const importEventChecklist = usePanelStore((s) => s.importEventChecklist);
  const showToast = usePanelStore((s) => s.showToast);
  const setSidebarOpen = usePanelStore((s) => s.setSidebarOpen);

  const [selectedChecklist, setSelectedChecklist] = useState<EventChecklist | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
  const [showTemplatePanel, setShowTemplatePanel] = useState(true);
  const [templates, setTemplates] = useState<SavedTemplate[]>(() => {
    const saved = localStorage.getItem('event_tracking_templates');
    return saved ? JSON.parse(saved) : [];
  });

  const clearedRef = useRef(false);

  useEffect(() => {
    if (!clearedRef.current && eventChecklists.length > 0) {
      eventChecklists.forEach((checklist) => {
        if (checklist.tasks.length > 0) {
          updateEventChecklist(checklist.id, { tasks: [] });
        }
      });
      clearedRef.current = true;
    }
  }, [eventChecklists, updateEventChecklist]);

  useEffect(() => {
    if (checklistId) {
      const checklist = eventChecklists.find((c) => c.id === checklistId);
      setSelectedChecklist(checklist || null);
    } else if (eventChecklists.length > 0) {
      setSelectedChecklist(eventChecklists[0]);
    } else {
      setSelectedChecklist(null);
    }
  }, [checklistId, eventChecklists]);

  const checklistOptions = useMemo(
    () =>
      eventChecklists.map((checklist) => ({
        id: checklist.id,
        label: checklist.eventTopic || 'Untitled Checklist'
      })),
    [eventChecklists]
  );

  const handleSelectChecklist = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chosenId = event.target.value;
    const checklist = eventChecklists.find((c) => c.id === chosenId) || null;
    setSelectedChecklist(checklist);
  };

  const handleTasksChange = (tasks: EventChecklistTask[]) => {
    if (!selectedChecklist) return;
    updateEventChecklist(selectedChecklist.id, { tasks });
    setSelectedChecklist((prev) => (prev && prev.id === selectedChecklist.id ? { ...prev, tasks } : prev));
  };

  const handleEventDetailChange = (field: keyof EventChecklist, value: any) => {
    if (!selectedChecklist) return;
    updateEventChecklist(selectedChecklist.id, { [field]: value });
    setSelectedChecklist((prev) => (prev && prev.id === selectedChecklist.id ? { ...prev, [field]: value } : prev));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const workbook = await readExcelFile(file);
        const checklist = parseEventChecklist(workbook);
        importEventChecklist(checklist);
        setSelectedChecklist(checklist);
        showToast('Checklist imported', 'success');
      } else if (file.name.endsWith('.csv')) {
        const result = await parseCSVFile(file);
        if (result && 'tasks' in result) {
          importEventChecklist(result as EventChecklist);
          setSelectedChecklist(result as EventChecklist);
          showToast('Checklist imported', 'success');
        } else {
          showToast('Invalid checklist format', 'error');
        }
      } else {
        showToast('Please upload an Excel (.xlsx) or CSV file', 'error');
      }
    } catch (error) {
      console.error('Error parsing file:', error);
      showToast('Failed to import checklist', 'error');
    } finally {
      setIsUploading(false);
      if (event.target) event.target.value = '';
    }
  };

  const handleExport = () => {
    if (!selectedChecklist) return;
    exportEventChecklistToExcel(selectedChecklist);
  };

  const handleClearSheet = () => {
    if (!selectedChecklist) return;
    const clearedTasks: EventChecklistTask[] = [];
    updateEventChecklist(selectedChecklist.id, { tasks: clearedTasks });
    setSelectedChecklist((prev) => (prev && prev.id === selectedChecklist.id ? { ...prev, tasks: clearedTasks } : prev));
    showToast('Sheet cleared', 'success');
  };

  const handleLoadTemplate = async () => {
    if (!selectedChecklist) return;
    setIsLoadingTemplate(true);
    try {
      const response = await fetch(GOOGLE_TEMPLATE_CSV_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      const rows = parseCsv(text);
      if (!rows.length) throw new Error('Sheet is empty');
      const tasks = csvRowsToTasks(rows);
      updateEventChecklist(selectedChecklist.id, { tasks });
      setSelectedChecklist((prev) => (prev && prev.id === selectedChecklist.id ? { ...prev, tasks } : prev));
      showToast('Template loaded', 'success');
    } catch (error) {
      console.error('Template load error', error);
      showToast('Failed to load template', 'error');
    } finally {
      setIsLoadingTemplate(false);
    }
  };

  const handleSaveTemplate = (template: SavedTemplate) => {
    const updatedTemplates = [...templates, template];
    setTemplates(updatedTemplates);
    localStorage.setItem('event_tracking_templates', JSON.stringify(updatedTemplates));
  };

  const handleLoadSpreadsheetTemplate = (template: SavedTemplate) => {
    // This is just a notification handler - the actual loading is done in ReactSpreadsheetComponent
    console.log('Template loaded:', template.name);
  };

  const handleDeleteTemplate = (templateName: string) => {
    if (!confirm(`Delete template "${templateName}"? This cannot be undone.`)) return;

    const updatedTemplates = templates.filter(t => t.name !== templateName);
    setTemplates(updatedTemplates);
    localStorage.setItem('event_tracking_templates', JSON.stringify(updatedTemplates));
    showToast(`Template "${templateName}" deleted`, 'success');
  };

  if (!selectedChecklist) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold mb-2">No Event Checklist</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Upload an Event Checklist file to get started.
          </p>
          <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            <Upload className="w-5 h-5" />
            Upload Checklist
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex bg-white dark:bg-slate-900">
      {/* Left Template Panel */}
      {showTemplatePanel && (
        <div className="w-64 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookTemplate className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-sm">Templates</h2>
            </div>
            <button
              onClick={() => setShowTemplatePanel(false)}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
              title="Hide template panel"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {templates.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">
                No templates saved yet.<br/>
                Paste data and click "Template" button to save.
              </p>
            ) : (
              templates.map((template, idx) => (
                <div
                  key={idx}
                  className="group bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3 hover:border-blue-400 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-2 break-words">
                        {template.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(template.savedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteTemplate(template.name)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-all flex-shrink-0"
                      title="Delete template"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500">
            Click template buttons in yellow bar to load
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {!showTemplatePanel && (
                <button
                  onClick={() => setShowTemplatePanel(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-blue-500 dark:border-blue-400 rounded-lg text-sm text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                  title="Show template panel"
                >
                  <ChevronRight className="w-4 h-4" />
                  Templates
                </button>
              )}
              <button
                onClick={() => setSidebarOpen(false)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                title="Collapse sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
              <h1 className="text-2xl font-bold">Event Checklist</h1>
              {checklistOptions.length > 1 && (
                <select
                  value={selectedChecklist.id}
                  onChange={handleSelectChecklist}
                  className="px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                >
                  {checklistOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-sm">
                <Upload className="w-4 h-4" />
                Import
                <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
              </label>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={handleLoadTemplate}
                disabled={isLoadingTemplate}
                className="flex items-center gap-2 px-3 py-2 border border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-sm disabled:opacity-60"
              >
                {isLoadingTemplate ? 'Loading...' : 'Load Google Template'}
              </button>
              <button
                onClick={handleClearSheet}
                className="flex items-center gap-2 px-3 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors text-sm"
                type="button"
              >
                Clear Sheet
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm p-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Event Type</label>
            <input
              type="text"
              value={selectedChecklist.eventType}
              onChange={(e) => handleEventDetailChange('eventType', e.target.value)}
              className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Event Topic</label>
            <input
              type="text"
              value={selectedChecklist.eventTopic}
              onChange={(e) => handleEventDetailChange('eventTopic', e.target.value)}
              className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Event Date</label>
            <input
              type="text"
              value={selectedChecklist.eventDate}
              onChange={(e) => handleEventDetailChange('eventDate', e.target.value)}
              className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Event Time</label>
            <input
              type="text"
              value={selectedChecklist.eventTime}
              onChange={(e) => handleEventDetailChange('eventTime', e.target.value)}
              className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-xs"
            />
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-4 bg-slate-50 dark:bg-slate-900">
          <div className="h-full border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
            <ReactSpreadsheetComponent
              onToast={showToast}
              templates={templates}
              onSaveTemplate={handleSaveTemplate}
              onLoadTemplate={handleLoadSpreadsheetTemplate}
              onDeleteTemplate={handleDeleteTemplate}
            />
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-2 bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Save className="w-3 h-3" />
            <span>Changes saved automatically</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let current = '';
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (current || row.length) {
        row.push(current.trim());
        rows.push(row);
        row = [];
        current = '';
      }
      // skip potential \r\n combination
      if (char === '\r' && next === '\n') {
        i += 1;
      }
    } else {
      current += char;
    }
  }

  if (current || row.length) {
    row.push(current.trim());
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell !== ''));
}

function csvRowsToTasks(rows: string[][]): EventChecklistTask[] {
  const [headerRow, ...dataRows] = rows;
  if (!headerRow) return [];

  const headerMap = headerRow.map((header) => header.trim().toLowerCase());
  const findIndex = (matchers: string[]) =>
    headerMap.findIndex((header) => matchers.some((matcher) => header.includes(matcher)));

  const phaseIdx = findIndex(['phase']);
  const taskIdx = findIndex(['task']);
  const countdownIdx = findIndex(['countdown', 'days']);
  const deadlineIdx = findIndex(['deadline']);
  const completedIdx = findIndex(['date completed', 'completed']);
  const statusIdx = findIndex(['status']);
  const sampleIdx = findIndex(['sample']);
  const actualIdx = findIndex(['actual']);

  return dataRows
    .map((row) => row.map((cell) => cell.trim()))
    .filter((row) => row[taskIdx >= 0 ? taskIdx : 0])
    .map((row) => ({
      id: generateId(),
      phase: normalisePhase(phaseIdx >= 0 ? row[phaseIdx] : ''),
      taskName: row[taskIdx >= 0 ? taskIdx : 0] || '',
      countdownDays: normaliseCountdown(row[countdownIdx] ?? ''),
      deadline: deadlineIdx >= 0 ? row[deadlineIdx] : '',
      dateCompleted: completedIdx >= 0 ? (row[completedIdx] || undefined) : undefined,
      status: normaliseStatus(statusIdx >= 0 ? row[statusIdx] : ''),
      sampleLinks: sampleIdx >= 0 ? (row[sampleIdx] || undefined) : undefined,
      actualLinks: actualIdx >= 0 ? (row[actualIdx] || undefined) : undefined
    }));
}

function normalisePhase(value: string): EventChecklistTask['phase'] {
  const normalised = value.trim().toLowerCase();
  const phases: EventChecklistTask['phase'][] = [
    'Phase 1',
    'Phase 2',
    'Phase 3',
    'Phase 4',
    'Phase 5 - Post Event',
    'Phase 5 - Promotions'
  ];

  const matched = phases.find((phase) => phase.toLowerCase() === normalised);
  if (matched) return matched;

  if (normalised.includes('phase 1')) return 'Phase 1';
  if (normalised.includes('phase 2')) return 'Phase 2';
  if (normalised.includes('phase 3')) return 'Phase 3';
  if (normalised.includes('phase 4')) return 'Phase 4';
  if (normalised.includes('post')) return 'Phase 5 - Post Event';
  if (normalised.includes('promo')) return 'Phase 5 - Promotions';
  return 'Phase 1';
}

function normaliseStatus(value: string): EventChecklistTask['status'] {
  const normalised = value.trim().toLowerCase();
  switch (normalised) {
    case 'completed':
      return 'Completed';
    case 'in progress':
    case 'progress':
      return 'In Progress';
    case 'blocked':
      return 'Blocked';
    case 'not applicable':
    case 'na':
    case 'n/a':
      return 'Not Applicable';
    case '':
      return 'Please Select';
    default:
      return 'Please Select';
  }
}

function normaliseCountdown(value: string): number {
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed)) return 0;
  return parsed;
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}
