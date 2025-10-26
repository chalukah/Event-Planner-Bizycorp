import { useState, useCallback, useMemo, memo } from 'react';
import Spreadsheet, { Matrix, CellBase, Selection } from 'react-spreadsheet';
import { Copy, Save, ClipboardPaste, Download, Plus, X, Palette, Undo2 } from 'lucide-react';

// Event tracking cell type with styling support
type EventTrackingCell = CellBase<string> & {
  className?: string;
};

// Props
type ReactSpreadsheetComponentProps = {
  onToast: (message: string, type: 'success' | 'error' | 'info') => void;
  templates: SavedTemplate[];
  onSaveTemplate: (template: SavedTemplate) => void;
  onLoadTemplate: (template: SavedTemplate) => void;
  onDeleteTemplate: (templateName: string) => void;
};

// Ref methods (temporarily disabled)
export type ReactSpreadsheetRef = {
  getCurrentData: () => Matrix<EventTrackingCell>;
  saveAsTemplate: (name: string) => void;
  loadTemplate: (template: SavedTemplate) => void;
  getTemplates: () => SavedTemplate[];
};

// Create empty data
const createInitialData = (): Matrix<EventTrackingCell> => {
  const rows: Matrix<EventTrackingCell> = [];
  for (let i = 0; i < 30; i++) {
    const row: EventTrackingCell[] = [];
    for (let j = 0; j < 27; j++) {
      row.push({ value: '' });
    }
    rows.push(row);
  }
  return rows;
};
const cloneMatrix = (matrix: Matrix<EventTrackingCell>): Matrix<EventTrackingCell> =>
  matrix.map(row => row.map(cell => (cell ? { ...cell } : { value: '' })));


// Storage keys
const TEMPLATES_KEY = 'event_tracking_templates';
const SHEETS_KEY = 'event_tracking_sheets_v2';
const LEGACY_SHEETS_KEY = 'event_tracking_sheets';
const EVENT_PLAN_SHEET_COUNT = 10;
const HIGHLIGHT_CLASSES = ['cell-highlight-yellow', 'cell-highlight-green', 'cell-highlight-blue', 'cell-highlight-red', 'cell-highlight-purple'];
const HIGHLIGHT_CLASS_SET = new Set(HIGHLIGHT_CLASSES);
const MAX_UNDO_STACK = 25;

export type SavedTemplate = {
  name: string;
  data: Matrix<EventTrackingCell>;
  savedAt: string;
};

type Sheet = {
  id: string;
  name: string;
  data: Matrix<EventTrackingCell>;
};

// ICP Guidelines Template - from Google Sheet
const createICPGuidelinesTemplate = (): Matrix<EventTrackingCell> => {
  const rows: Matrix<EventTrackingCell> = [];

  // Row 1: Date Added, Product, Event Name, First Name, Last Name, Email, Phone, Registration Time, Role, Practice Name, Questions, Source Name, Country, LEAD Type, ICP Confirmation, Attendance, Manager Verification, Notes, MSM Conversion Status, MSM Score, MSM Type, MSMs Completed, Ekwa Sales Status, CSM Conversion Status, CSM Type, CSMs Completed, Coaching Sales Status
  const headers = ['Date Added', 'Product', 'Event Name', 'First Name', 'Last Name', 'Email', 'Phone', 'Registration Time', 'Role', 'Practice Name', 'What questions do you have?', 'Source Name', 'Country', 'LEAD Type', 'ICP Confirmation', 'Attendance', 'Manager Verification', 'Notes', 'MSM Conversion Status', 'MSM Score', 'MSM Type', 'MSMs Completed', 'Ekwa Sales Status', 'CSM Conversion Status', 'CSM Type', 'CSMs Completed', 'Coaching Sales Status'];
  rows.push(headers.map(h => ({ value: h, className: 'cell-bold' })));

  // 29 empty data rows ready for input
  for (let i = 0; i < 29; i++) {
    const row: EventTrackingCell[] = [];
    for (let j = 0; j < 27; j++) {
      // ICP Confirmation column defaults to FALSE
      row.push({ value: j === 14 ? 'FALSE' : '' });
    }
    rows.push(row);
  }

  return rows;
};


// Color-coded ICP Dashboard Template (Sheet 2 style)
const createICPDashboardTemplate = (): Matrix<EventTrackingCell> => {
  const padRow = (cells: EventTrackingCell[] = []): EventTrackingCell[] => {
    const totalColumns = 27;
    const row = [...cells];
    while (row.length < totalColumns) {
      row.push({ value: '' });
    }
    return row;
  };

  const rows: Matrix<EventTrackingCell> = [];

  rows.push(padRow([
    { value: 'ICP Guidelines - ICP REGISTRATIONS_ Marketing 01 - panels', className: 'cell-fill-yellow-dark cell-bold' },
    { value: '', className: 'cell-fill-yellow-dark' },
    { value: '', className: 'cell-fill-yellow-dark' },
    { value: '', className: 'cell-fill-yellow-dark' },
    { value: '', className: 'cell-fill-yellow-dark' },
    { value: 'Data Completion Status\n\nNote - Based on the selection of the dropdown, the data entered in rows 3-18 will be automatically be taken for the Dashboard', className: 'cell-wrap cell-small' },
    { value: '', className: '' },
    { value: 'Pending', className: 'cell-fill-red cell-text-white cell-bold cell-center' },
    { value: 'COUNTA of First Name', className: 'cell-fill-grey cell-bold cell-center cell-small' },
    { value: 'Attendance', className: 'cell-fill-grey cell-bold cell-center cell-small' }
  ]));

  rows.push(padRow([
    { value: 'LINK TO THE ATTENDEE LIST', className: 'cell-bold' },
    { value: '', className: 'cell-fill-grey' },
    { value: '', className: '' },
    { value: '', className: '' },
    { value: '', className: '' },
    { value: '', className: '' },
    { value: '', className: '' },
    { value: '', className: '' },
    { value: 'Source Name', className: 'cell-fill-grey cell-bold cell-center cell-small' },
    { value: '0', className: 'cell-fill-grey cell-bold cell-center' }
  ]));

  rows.push(padRow([
    { value: 'TOTAL ICP and NON ICP REGISTRATIONS', className: 'cell-bold' },
    { value: '0', className: 'cell-fill-grey cell-center cell-bold' },
    { value: 'Date and Time shared the full lead list with Sales\n(Do not send the filtered list)', className: 'cell-wrap cell-small' }
  ]));

  const whiteMetrics = [
    'TOTAL ICP REGISTRATIONS',
    'TOTAL NON ICP REGISTRATIONS',
    'ATTENDEES - ICP/NON ICPs',
    'ATTENDEES - ICPs',
    'ATTENDEES - Non ICP Attendees'
  ];

  whiteMetrics.forEach(metric => {
    rows.push(padRow([
      { value: metric, className: 'cell-bold' },
      { value: '0', className: 'cell-fill-grey cell-center cell-bold' }
    ]));
  });

  rows.push(padRow([
    { value: 'TOTAL DIRECT REGISTRATIONS', className: 'cell-fill-yellow-light cell-bold' },
    { value: '0', className: 'cell-fill-grey cell-center cell-bold' },
    { value: 'Date - EST', className: 'cell-fill-yellow-light cell-center cell-bold' },
    { value: 'To be added', className: 'cell-fill-yellow-light cell-center' }
  ]));

  rows.push(padRow([
    { value: 'TOTAL PARTNER REGISTRATIONS', className: 'cell-bold' },
    { value: '0', className: 'cell-fill-grey cell-center cell-bold' },
    { value: 'Time - EST', className: 'cell-fill-yellow-light cell-center cell-bold' },
    { value: 'To be added', className: 'cell-fill-yellow-light cell-center' }
  ]));

  const msmMetrics = [
    'Direct MSMs Booked',
    'Direct ICP MSMs Booked',
    'BDR Booked MSMs',
    'BDR ICP MSMs Booked',
    'Direct Completed MSMs',
    'BDR Completed MSMs',
    'Total ICP MSMs Booked',
    'Total ICP MSMs Completed'
  ];

  msmMetrics.forEach(metric => {
    rows.push(padRow([
      { value: metric, className: 'cell-fill-green cell-bold' },
      { value: '0', className: 'cell-fill-green cell-center cell-bold' }
    ]));
  });

  rows.push(padRow());

  const tableHeaders = [
    'Date Added',
    'Product',
    'Event Name',
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Registration Time',
    'Role',
    'Practice Name',
    'What questions do you have?',
    'Source Name',
    'Country',
    'LEAD Type',
    'ICP Confirmation',
    'Attendance',
    'Manager Verification',
    'Notes',
    'MSM Conversion Status',
    'MSM Score',
    'MSM Type',
    'MSMs Completed',
    'Ekwa Sales Status',
    'CSM Conversion Status',
    'CSM Type',
    'CSMs Completed',
    'Coaching Sales Status'
  ];

  rows.push(padRow(
    tableHeaders.map(header => ({
      value: header,
      className: 'cell-fill-dark-green cell-text-white cell-bold cell-center cell-small cell-wrap'
    }))
  ));

  for (let i = 0; i < 20; i++) {
    rows.push(padRow());
  }

  return rows;
};

const mergeWithTemplate = (template: Matrix<EventTrackingCell>, data?: Matrix<EventTrackingCell>): Matrix<EventTrackingCell> => {
  const totalRows = Math.max(template.length, data?.length ?? 0);
  let totalColumns = template[0]?.length ?? 0;
  if (data) {
    for (const row of data) {
      if (row && row.length > totalColumns) {
        totalColumns = row.length;
      }
    }
  }
  const merged: Matrix<EventTrackingCell> = [];
  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    const templateRow = template[rowIndex] ?? [];
    const dataRow = data?.[rowIndex] ?? [];
    const mergedRow: EventTrackingCell[] = [];
    const columnsForRow = Math.max(templateRow.length, dataRow.length, totalColumns);
    for (let columnIndex = 0; columnIndex < columnsForRow; columnIndex++) {
      const templateCell = templateRow[columnIndex];
      const dataCell = dataRow[columnIndex];
      const baseCell: EventTrackingCell = templateCell ? { ...templateCell } : { value: '' };
      const classSet = new Set<string>((baseCell.className || '').split(/\s+/).filter(Boolean));
      if (dataCell) {
        const { className: dataClassName, value: dataValue, ...rest } = dataCell;
        if (dataValue !== undefined) {
          baseCell.value = dataValue;
        } else if (baseCell.value === undefined) {
          baseCell.value = '';
        }
        Object.assign(baseCell, rest);
        if (dataClassName) {
          dataClassName.split(/\s+/).filter(Boolean).forEach(cls => classSet.add(cls));
        }
      } else if (baseCell.value === undefined) {
        baseCell.value = '';
      }
      const className = Array.from(classSet).filter(Boolean).join(' ');
      if (className) {
        baseCell.className = className;
      } else {
        delete baseCell.className;
      }
      mergedRow.push(baseCell);
    }
    merged.push(mergedRow);
  }
  return merged;
};

const createEventPlanSheet = (index: number, existing?: Sheet): Sheet => ({
  id: existing?.id ?? 'sheet-' + (index + 1),
  name: existing?.name ?? 'Event Plan Checklist - Sheet ' + (index + 1),
  data: mergeWithTemplate(createICPDashboardTemplate(), existing?.data),
});

const buildDefaultEventSheets = (existing?: Sheet[]): Sheet[] =>
  Array.from({ length: EVENT_PLAN_SHEET_COUNT }, (_, index) => createEventPlanSheet(index, existing?.[index]));

// Default built-in templates
const BUILTIN_TEMPLATES: SavedTemplate[] = [
  {
    name: 'Event Plan Checklist Template',
    data: createICPDashboardTemplate(),
    savedAt: new Date().toISOString()
  },
  {
    name: '22 Oct Veet - ICP Guidelines',
    data: createICPGuidelinesTemplate(),
    savedAt: new Date().toISOString()
  }
];

const ReactSpreadsheetComponent = memo(({ onToast, templates, onSaveTemplate, onLoadTemplate, onDeleteTemplate }: ReactSpreadsheetComponentProps) => {
  const [sheets, setSheets] = useState<Sheet[]>(() => {
    if (typeof window === 'undefined') {
      return buildDefaultEventSheets();
    }

    const parseSheets = (raw: string | null): Sheet[] | null => {
      if (!raw) return null;
      try {
        return JSON.parse(raw) as Sheet[];
      } catch {
        return null;
      }
    };

    const saved = parseSheets(window.localStorage.getItem(SHEETS_KEY));
    if (saved) {
      const normalized = buildDefaultEventSheets(saved);
      window.localStorage.setItem(SHEETS_KEY, JSON.stringify(normalized));
      return normalized;
    }

    const legacy = parseSheets(window.localStorage.getItem(LEGACY_SHEETS_KEY));
    if (legacy) {
      const normalized = buildDefaultEventSheets(legacy);
      window.localStorage.setItem(SHEETS_KEY, JSON.stringify(normalized));
      window.localStorage.removeItem(LEGACY_SHEETS_KEY);
      return normalized;
    }

    const defaults = buildDefaultEventSheets();
    window.localStorage.setItem(SHEETS_KEY, JSON.stringify(defaults));
    return defaults;
  });

  const [activeSheetId, setActiveSheetId] = useState<string>('sheet-1');
  const [selectedCellColor, setSelectedCellColor] = useState<string>('');
  const [undoHistory, setUndoHistory] = useState<Record<string, Matrix<EventTrackingCell>[]>>({});

  const activeSheet = sheets.find(s => s.id === activeSheetId);
  const data = activeSheet?.data || createICPDashboardTemplate();

  const pushUndoSnapshot = useCallback((sheetId: string, snapshot: Matrix<EventTrackingCell>) => {
    setUndoHistory(prev => {
      const history = prev[sheetId] ?? [];
      const updatedHistory = [...history, cloneMatrix(snapshot)];
      if (updatedHistory.length > MAX_UNDO_STACK) {
        updatedHistory.shift();
      }
      return { ...prev, [sheetId]: updatedHistory };
    });
  }, []);

  const saveSheets = useCallback((newSheets: Sheet[]) => {
    setSheets(newSheets);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SHEETS_KEY, JSON.stringify(newSheets));
    }
  }, []);

  const handleChange = useCallback((newData: Matrix<EventTrackingCell>) => {
    const newSheets = sheets.map(sheet =>
      sheet.id === activeSheetId ? { ...sheet, data: newData } : sheet
    );
    saveSheets(newSheets);
  }, [activeSheetId, sheets, saveSheets]);

  const handleAddNewSheet = useCallback(() => {
    const sheetNumber = sheets.length + 1;
    const newSheet: Sheet = {
      id: `sheet-${Date.now()}`,
      name: `Event Plan Checklist - Sheet ${sheetNumber}`,
      data: createICPDashboardTemplate()
    };
    const newSheets = [...sheets, newSheet];
    saveSheets(newSheets);
    setUndoHistory(prev => ({ ...prev, [newSheet.id]: [] }));
    setActiveSheetId(newSheet.id);
    onToast(`New sheet "${newSheet.name}" created!`, 'success');
  }, [sheets, saveSheets, onToast]);

  const handleDeleteSheet = useCallback(() => {
    if (sheets.length === 1) {
      onToast('Cannot delete the last sheet', 'error');
      return;
    }
    if (!confirm(`Delete "${activeSheet?.name}"? This cannot be undone.`)) return;

    const newSheets = sheets.filter(s => s.id !== activeSheetId);
    saveSheets(newSheets);
    setUndoHistory(prev => {
      const next = { ...prev };
      delete next[activeSheetId];
      return next;
    });
    setActiveSheetId(newSheets[0].id);
    onToast('Sheet deleted', 'success');
  }, [sheets, activeSheetId, activeSheet, saveSheets, onToast]);

  const handleRenameSheet = useCallback(() => {
    if (!activeSheet) return;
    const newName = prompt('Enter new sheet name:', activeSheet.name);
    if (!newName) return;

    const newSheets = sheets.map(s =>
      s.id === activeSheetId ? { ...s, name: newName } : s
    );
    saveSheets(newSheets);
  }, [activeSheet, sheets, activeSheetId, saveSheets]);

  const handleSave = useCallback(() => {
    saveSheets(sheets);
    onToast('All sheets saved!', 'success');
  }, [sheets, saveSheets, onToast]);

  const handleSaveAsTemplate = useCallback(() => {
    const templateName = prompt('Enter template name:');
    if (!templateName) return;

    const newTemplate: SavedTemplate = {
      name: templateName,
      data: data,
      savedAt: new Date().toISOString()
    };

    onSaveTemplate(newTemplate);
    onToast(`Template "${templateName}" saved!`, 'success');
  }, [data, onSaveTemplate, onToast]);

  const handleLoadTemplateInternal = useCallback((template: SavedTemplate) => {
    pushUndoSnapshot(activeSheetId, data);
    const newSheets = sheets.map(sheet =>
      sheet.id === activeSheetId ? { ...sheet, data: template.data, name: template.name } : sheet
    );
    saveSheets(newSheets);
    onLoadTemplate(template);
    onToast(`Template "${template.name}" loaded!`, 'success');
  }, [activeSheetId, sheets, saveSheets, onLoadTemplate, onToast, pushUndoSnapshot, data]);

  const handleUndo = useCallback(() => {
    const history = undoHistory[activeSheetId];
    if (!history?.length) {
      return;
    }

    const newHistory = history.slice(0, -1);
    const snapshot = history[history.length - 1];
    const newSheets = sheets.map(sheet =>
      sheet.id === activeSheetId ? { ...sheet, data: cloneMatrix(snapshot) } : sheet
    );
    saveSheets(newSheets);
    setUndoHistory(prev => ({ ...prev, [activeSheetId]: newHistory }));
  }, [activeSheetId, undoHistory, sheets, saveSheets]);

  const handleSelect = useCallback((selection: Selection) => {
    if (!selection || !selectedCellColor) {
      return;
    }

    const range = selection.toRange(data);
    if (!range) {
      return;
    }

    const points = Array.from(range);
    if (!points.length) {
      return;
    }

    const pointKeys = new Set(points.map(point => `${point.row}-${point.column}`));
    let modified = false;

    const newData = data.map((row, rowIndex) =>
      row.map((cell, columnIndex) => {
        if (!pointKeys.has(`${rowIndex}-${columnIndex}`)) {
          return cell;
        }

        const updatedCell: EventTrackingCell = cell ? { ...cell } : { value: '' };
        const existingClasses = (updatedCell.className || '').split(/\s+/).filter(Boolean);
        const hadSelectedColor = existingClasses.includes(selectedCellColor);
        const filteredClasses = existingClasses.filter(cls => !HIGHLIGHT_CLASS_SET.has(cls));
        if (!hadSelectedColor) {
          filteredClasses.push(selectedCellColor);
        }
        const newClassName = filteredClasses.join(' ');
        if (newClassName !== updatedCell.className) {
          updatedCell.className = newClassName;
          modified = true;
        }
        if (!updatedCell.className) {
          delete updatedCell.className;
        }
        return updatedCell;
      })
    );

    if (modified) {
      pushUndoSnapshot(activeSheetId, data);
      const newSheets = sheets.map(sheet =>
        sheet.id === activeSheetId ? { ...sheet, data: newData } : sheet
      );
      saveSheets(newSheets);
    }
  }, [selectedCellColor, data, sheets, activeSheetId, saveSheets, pushUndoSnapshot]);


  const handleCopyAll = useCallback(async () => {
    try {
      const tsv = data.map(row => row.map(cell => cell?.value || '').join('\t')).join('\n');
      await navigator.clipboard.writeText(tsv);
      onToast('Data copied!', 'success');
    } catch (error) {
      onToast('Failed to copy', 'error');
    }
  }, [data, onToast]);

  const handlePasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        onToast('No data in clipboard', 'error');
        return;
      }

      pushUndoSnapshot(activeSheetId, data);

      const rows = text.split('\n').map(row =>
        row.includes('\t') ? row.split('\t') : row.split(',')
      );

      const newData: Matrix<EventTrackingCell> = [];
      for (let i = 0; i < Math.max(rows.length, 30); i++) {
        const row: EventTrackingCell[] = [];
        for (let j = 0; j < 27; j++) {
          const value = rows[i]?.[j]?.trim() || '';
          row.push({ value });
        }
        newData.push(row);
      }

      const newSheets = sheets.map(sheet =>
        sheet.id === activeSheetId ? { ...sheet, data: newData } : sheet
      );
      saveSheets(newSheets);
      onToast(`? Pasted ${rows.length} rows instantly!`, 'success');
    } catch (error) {
      onToast('Failed to paste', 'error');
    }
  }, [activeSheetId, sheets, saveSheets, onToast, pushUndoSnapshot, data]);

  const handleClearSheet = useCallback(() => {
    if (!confirm('Clear this sheet? Cannot be undone.')) return;
    pushUndoSnapshot(activeSheetId, data);
    const newSheets = sheets.map(sheet =>
      sheet.id === activeSheetId ? { ...sheet, data: createICPDashboardTemplate() } : sheet
    );
    saveSheets(newSheets);
    onToast('Sheet reset to template', 'success');
  }, [activeSheetId, data, sheets, saveSheets, onToast, pushUndoSnapshot]);

  const undoAvailable = (undoHistory[activeSheetId]?.length ?? 0) > 0;

  const stats = useMemo(() => {
    let totalRegistrations = 0, totalICP = 0, totalNonICP = 0, attendeesTotal = 0, attendeesICP = 0;

    data.forEach(row => {
      if (row && row[0]?.value) {
        totalRegistrations++;
        const icpConfirmation = row[14]?.value || '';
        const attendance = row[15]?.value || '';

        if (icpConfirmation.toLowerCase().includes('yes') || icpConfirmation.toLowerCase() === 'true') {
          totalICP++;
          if (attendance.toLowerCase().includes('attended') || attendance.toLowerCase() === 'yes') {
            attendeesICP++;
          }
        } else if (icpConfirmation) {
          totalNonICP++;
        }

        if (attendance.toLowerCase().includes('attended') || attendance.toLowerCase() === 'yes') {
          attendeesTotal++;
        }
      }
    });

    return { totalRegistrations, totalICP, totalNonICP, attendeesTotal, attendeesICP, attendeesNonICP: attendeesTotal - attendeesICP };
  }, [data]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', overflow: 'hidden', backgroundColor: '#fff' }}>
      <style>{`
        .Spreadsheet { min-width: 3500px; width: max-content; }
        .Spreadsheet__table { border-collapse: collapse; }
        .Spreadsheet__cell { min-width: 120px; max-width: 300px; padding: 4px 8px; }
        .cell-highlight-yellow { background-color: #fef08a !important; }
        .cell-highlight-green { background-color: #bbf7d0 !important; }
        .cell-highlight-blue { background-color: #bfdbfe !important; }
        .cell-highlight-red { background-color: #fecaca !important; }
        .cell-highlight-purple { background-color: #e9d5ff !important; }
        .cell-bold { font-weight: 700 !important; }
        .cell-fill-yellow-dark { background-color: #ffd966 !important; }
        .cell-fill-yellow-light { background-color: #fff2cc !important; }
        .cell-fill-grey { background-color: #d9d9d9 !important; }
        .cell-fill-green { background-color: #e2efda !important; }
        .cell-fill-dark-green { background-color: #1f4e34 !important; }
        .cell-fill-red { background-color: #c00000 !important; }
        .cell-text-white { color: #ffffff !important; }
        .cell-center { text-align: center !important; }
        .cell-wrap { white-space: pre-line !important; }
        .cell-small { font-size: 11px !important; }
      `}</style>

      {/* Toolbar */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #dadce0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Event Tracking</h3>

          {/* Sheet Dropdown */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <select
              value={activeSheetId}
              onChange={(e) => setActiveSheetId(e.target.value)}
              style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', backgroundColor: '#fff', cursor: 'pointer' }}
            >
              {sheets.map(sheet => (
                <option key={sheet.id} value={sheet.id}>{sheet.name}</option>
              ))}
            </select>
            <button onClick={handleAddNewSheet} style={{ padding: '6px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Add new sheet">
              <Plus size={16} />
            </button>
            <button onClick={handleRenameSheet} style={{ padding: '4px 8px', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '10px', cursor: 'pointer' }}>
              Rename
            </button>
            <button onClick={handleDeleteSheet} style={{ padding: '4px 8px', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', color: '#dc2626' }}>
              Delete
            </button>
          </div>

          <div style={{ fontSize: '11px', color: '#6b7280' }}>
            Total: {stats.totalRegistrations} | ICP: {stats.totalICP} | Attendees: {stats.attendeesTotal}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button onClick={handlePasteFromClipboard} style={{ padding: '6px 10px', backgroundColor: '#9333ea', color: 'white', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ClipboardPaste size={13} />Paste
          </button>
          <button onClick={handleSaveAsTemplate} style={{ padding: '6px 10px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Download size={13} />Template
          </button>
          <button onClick={handleUndo} disabled={!undoAvailable} style={{ padding: '6px 10px', backgroundColor: '#4b5563', color: 'white', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: undoAvailable ? 'pointer' : 'not-allowed', opacity: undoAvailable ? 1 : 0.6, display: 'flex', alignItems: 'center', gap: '4px' }} title={undoAvailable ? 'Undo last change' : 'Nothing to undo'}>
            <Undo2 size={13} />Undo
          </button>
          <button onClick={handleClearSheet} style={{ padding: '6px 10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <X size={13} />Clear
          </button>
          <button onClick={handleSave} style={{ padding: '6px 10px', backgroundColor: '#34a853', color: 'white', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Save size={13} />Save
          </button>
          <button onClick={handleCopyAll} style={{ padding: '6px 10px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Copy size={13} />Copy
          </button>
        </div>
      </div>

      {/* Color Palette */}
      <div style={{ padding: '8px 16px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
        <Palette size={14} style={{ color: '#6b7280' }} />
        <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>Cell Colors:</span>
        {[
          { name: 'Yellow', class: 'cell-highlight-yellow', bg: '#fef08a' },
          { name: 'Green', class: 'cell-highlight-green', bg: '#bbf7d0' },
          { name: 'Blue', class: 'cell-highlight-blue', bg: '#bfdbfe' },
          { name: 'Red', class: 'cell-highlight-red', bg: '#fecaca' },
          { name: 'Purple', class: 'cell-highlight-purple', bg: '#e9d5ff' }
        ].map(color => (
          <button
            key={color.class}
            onClick={() => setSelectedCellColor(selectedCellColor === color.class ? '' : color.class)}
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: color.bg,
              border: selectedCellColor === color.class ? '2px solid #374151' : '1px solid #d1d5db',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            title={`${color.name} highlight - Click to select, then click cells to apply`}
          />
        ))}
        <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: '8px' }}>
          {selectedCellColor ? 'Click cells to apply color' : 'Select a color first'}
        </span>
      </div>

      {/* Templates */}
      {templates.length > 0 && (
        <div style={{ padding: '6px 16px', backgroundColor: '#fef3c7', borderBottom: '1px solid #fbbf24', fontSize: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
          <strong>?? Templates:</strong>
          {templates.map((template, idx) => (
            <button key={idx} onClick={() => handleLoadTemplateInternal(template)} style={{ padding: '3px 6px', backgroundColor: '#fff', border: '1px solid #fbbf24', borderRadius: '3px', fontSize: '10px', cursor: 'pointer' }}>
              {template.name}
            </button>
          ))}
        </div>
      )}

      {/* Spreadsheet */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        overflowX: 'scroll',
        overflowY: 'auto',
        minHeight: 0,
        position: 'relative',
        WebkitOverflowScrolling: 'touch'
      }}>
        <div style={{
          padding: '16px',
          minWidth: '3500px',
          width: 'max-content'
        }}>
          <Spreadsheet
            data={data}
            onChange={handleChange}
            onSelect={handleSelect}
            darkMode={false}
          />
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '6px 16px', borderTop: '1px solid #dadce0', backgroundColor: '#f8f9fa', flexShrink: 0 }}>
        <p style={{ margin: 0, fontSize: '10px', color: '#6b7280' }}>
          ? <strong>Paste Data</strong> ? Click orange <strong>"Template"</strong> button ? Enter name ? Saved! •
          ?? {sheets.length} Sheets • ?? Color Cells • ? ? Scroll horizontally for all 27 columns
        </p>
      </div>
    </div>
  );
});

ReactSpreadsheetComponent.displayName = 'ReactSpreadsheetComponent';

export { ReactSpreadsheetComponent };



















