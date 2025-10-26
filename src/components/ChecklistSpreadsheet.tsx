import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SpreadsheetGrid } from "../spreadsheet/components/spreadsheet-grid";
import { Toolbar } from "../spreadsheet/components/toolbar";
import { SheetTabs } from "../spreadsheet/components/sheet-tabs";
import { SpreadsheetStore } from "../spreadsheet/lib/spreadsheet-store";
import type { EventChecklistTask } from "../types";
import { cellToAddress } from "../spreadsheet/lib/spreadsheet-types";

type ChecklistSpreadsheetProps = {
  tasks: EventChecklistTask[];
  onTasksChange: (tasks: EventChecklistTask[]) => void;
};

const HEADERS = [
  "Phase",
  "Task",
  "Countdown Days",
  "Deadline",
  "Date Completed",
  "Status",
  "Sample Links",
  "Actual Links",
] as const;

export function ChecklistSpreadsheet({ tasks, onTasksChange }: ChecklistSpreadsheetProps) {
  const storeRef = useRef<SpreadsheetStore>();
  if (!storeRef.current) {
    storeRef.current = new SpreadsheetStore();
  }
  const store = storeRef.current;
  const tasksRef = useRef<EventChecklistTask[]>(tasks);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  useEffect(() => {
    loadTasksIntoStore(store, tasks);
    setRefreshKey((key) => key + 1);
  }, [store, tasks]);

  const handleRefresh = useCallback(() => {
    setRefreshKey((key) => key + 1);
    const updated = extractTasksFromStore(store, tasksRef.current);
    tasksRef.current = updated;
    onTasksChange(updated);
  }, [store, onTasksChange]);

  const memoizedStore = useMemo(() => store, [store]);

  return (
    <div className="flex flex-col h-full bg-background">
      <Toolbar store={memoizedStore} onRefresh={handleRefresh} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SpreadsheetGrid key={refreshKey} store={memoizedStore} onRefresh={handleRefresh} />
      </div>
      <SheetTabs store={memoizedStore} onRefresh={handleRefresh} />
    </div>
  );
}

function loadTasksIntoStore(store: SpreadsheetStore, tasks: EventChecklistTask[]) {
  const sheet = store.getActiveSheet();

  sheet.cells.clear();

  HEADERS.forEach((header, col) => {
    sheet.cells.set(cellToAddress(0, col), { value: header, style: { bold: true } });
  });

  tasks.forEach((task, index) => {
    const row = index + 1;
    sheet.cells.set(cellToAddress(row, 0), { value: task.phase });
    sheet.cells.set(cellToAddress(row, 1), { value: task.taskName });
    sheet.cells.set(cellToAddress(row, 2), { value: task.countdownDays ?? 0 });
    sheet.cells.set(cellToAddress(row, 3), { value: task.deadline ?? "" });
    sheet.cells.set(cellToAddress(row, 4), { value: task.dateCompleted ?? "" });
    sheet.cells.set(cellToAddress(row, 5), { value: task.status ?? "Please Select" });
    sheet.cells.set(cellToAddress(row, 6), { value: task.sampleLinks ?? "" });
    sheet.cells.set(cellToAddress(row, 7), { value: task.actualLinks ?? "" });
  });

  store.clearSelection();
}

function extractTasksFromStore(store: SpreadsheetStore, previous: EventChecklistTask[]): EventChecklistTask[] {
  const sheet = store.getActiveSheet();
  const results: EventChecklistTask[] = [];
  const maxRows = Math.max(previous.length + 5, 50);

  for (let row = 1; row < maxRows; row++) {
    const phase = String(store.getCell(row, 0).value ?? "").trim();
    const taskName = String(store.getCell(row, 1).value ?? "").trim();
    const countdownValue = String(store.getCell(row, 2).value ?? "").trim();
    const deadline = String(store.getCell(row, 3).value ?? "").trim();
    const dateCompleted = String(store.getCell(row, 4).value ?? "").trim();
    const statusValue = String(store.getCell(row, 5).value ?? "").trim();
    const sampleLinks = String(store.getCell(row, 6).value ?? "").trim();
    const actualLinks = String(store.getCell(row, 7).value ?? "").trim();

    const isBlank =
      !phase && !taskName && !countdownValue && !deadline && !dateCompleted && !statusValue && !sampleLinks && !actualLinks;

    if (isBlank) {
      if (row > previous.length) {
        continue;
      }
      if (row > previous.length && results.length === previous.length) {
        continue;
      }
    }

    const prevTask = previous[row - 1];
    const countdown = Number.parseInt(countdownValue, 10);

    results.push({
      id: prevTask?.id ?? generateId(),
      phase: normalisePhase(phase || prevTask?.phase || "Phase 1"),
      taskName: taskName || prevTask?.taskName || "",
      countdownDays: Number.isNaN(countdown) ? prevTask?.countdownDays ?? 0 : countdown,
      deadline: deadline || prevTask?.deadline || "",
      dateCompleted: dateCompleted || prevTask?.dateCompleted || undefined,
      status: normaliseStatus(statusValue || prevTask?.status || "Please Select"),
      sampleLinks: sampleLinks || prevTask?.sampleLinks || undefined,
      actualLinks: actualLinks || prevTask?.actualLinks || undefined,
    });
  }

  return results;
}

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

function normaliseStatus(value: string): EventChecklistTask["status"] {
  const normalised = value.trim().toLowerCase();
  switch (normalised) {
    case "completed":
      return "Completed";
    case "in progress":
    case "progress":
      return "In Progress";
    case "blocked":
      return "Blocked";
    case "not applicable":
    case "na":
    case "n/a":
      return "Not Applicable";
    case "":
      return "Please Select";
    default:
      return "Please Select";
  }
}

function normalisePhase(value: string): EventChecklistTask["phase"] {
  const normalised = value.trim().toLowerCase();
  if (normalised.includes("phase 1")) return "Phase 1";
  if (normalised.includes("phase 2")) return "Phase 2";
  if (normalised.includes("phase 3")) return "Phase 3";
  if (normalised.includes("phase 4")) return "Phase 4";
  if (normalised.includes("post")) return "Phase 5 - Post Event";
  if (normalised.includes("promo")) return "Phase 5 - Promotions";
  return "Phase 1";
}
