import {
  cellToAddress,
  type Cell,
  type CellPosition,
  type SelectionState,
  type Sheet,
  type Workbook
} from "./spreadsheet-types"

const DEFAULT_ROWS = 1000
const DEFAULT_COLS = 26

export class SpreadsheetStore {
  private workbook: Workbook
  private selection: SelectionState = {
    active: null,
    ranges: []
  }
  private history: Workbook[] = []
  private historyIndex = -1

  constructor() {
    const initialSheet = this.createSheet("Sheet1", DEFAULT_ROWS, DEFAULT_COLS)
    this.workbook = {
      id: "workbook-1",
      name: "Workbook",
      sheets: new Map([[initialSheet.id, initialSheet]]),
      activeSheetId: initialSheet.id
    }
  }

  // Workbook operations --------------------------------------------------
  getWorkbook(): Workbook {
    return this.workbook
  }

  getActiveSheet(): Sheet {
    const sheet = this.workbook.sheets.get(this.workbook.activeSheetId)
    if (!sheet) {
      throw new Error("Active sheet not found")
    }
    return sheet
  }

  setActiveSheet(sheetId: string): void {
    if (!this.workbook.sheets.has(sheetId)) return
    this.workbook.activeSheetId = sheetId
    this.clearSelection()
  }

  addSheet(name: string): string {
    const sheet = this.createSheet(name, DEFAULT_ROWS, DEFAULT_COLS)
    this.workbook.sheets.set(sheet.id, sheet)
    this.saveHistory()
    return sheet.id
  }

  deleteSheet(sheetId: string): void {
    if (this.workbook.sheets.size <= 1) return
    this.workbook.sheets.delete(sheetId)
    if (this.workbook.activeSheetId === sheetId) {
      const first = this.workbook.sheets.keys().next()
      if (!first.done) {
        this.workbook.activeSheetId = first.value
      }
    }
    this.clearSelection()
    this.saveHistory()
  }

  renameSheet(sheetId: string, newName: string): void {
    const sheet = this.workbook.sheets.get(sheetId)
    if (!sheet) return
    sheet.name = newName
    this.saveHistory()
  }

  // Cell operations ------------------------------------------------------
  getCell(row: number, col: number): Cell {
    const sheet = this.getActiveSheet()
    const address = cellToAddress(row, col)
    const existing = sheet.cells.get(address)
    if (!existing) {
      return { value: null }
    }
    return existing
  }

  setCell(row: number, col: number, cell: Partial<Cell>): void {
    const sheet = this.getActiveSheet()
    const address = cellToAddress(row, col)
    const existing: Cell = sheet.cells.get(address) ?? { value: null }
    const merged: Cell = {
      ...existing,
      ...cell,
      value: cell.value ?? existing.value ?? null
    }

    if (
      merged.value === null ||
      (typeof merged.value === "string" && merged.value.trim() === "") ||
      (typeof merged.value === "number" && Number.isNaN(merged.value))
    ) {
      // remove empty cells to keep map small
      sheet.cells.delete(address)
    } else {
      sheet.cells.set(address, merged)
    }

    this.saveHistory()
  }

  setCellValue(row: number, col: number, value: string | number | boolean | null): void {
    this.setCell(row, col, { value })
  }

  clearCell(row: number, col: number): void {
    const sheet = this.getActiveSheet()
    const address = cellToAddress(row, col)
    sheet.cells.delete(address)
    this.saveHistory()
  }

  // Selection ------------------------------------------------------------
  getSelection(): SelectionState {
    return this.selection
  }

  setActiveCell(row: number, col: number): void {
    this.selection.active = { row, col }
    this.selection.ranges = []
  }

  selectRange(start: CellPosition, end: CellPosition): void {
    this.selection.active = start
    this.selection.ranges = [{ start, end }]
  }

  clearSelection(): void {
    this.selection.active = null
    this.selection.ranges = []
  }

  // History --------------------------------------------------------------
  undo(): void {
    if (this.historyIndex <= 0) return
    this.historyIndex -= 1
    this.workbook = cloneWorkbook(this.history[this.historyIndex])
  }

  redo(): void {
    if (this.historyIndex >= this.history.length - 1) return
    this.historyIndex += 1
    this.workbook = cloneWorkbook(this.history[this.historyIndex])
  }

  private saveHistory(): void {
    // trim future states
    this.history = this.history.slice(0, this.historyIndex + 1)
    this.history.push(cloneWorkbook(this.workbook))
    this.historyIndex = this.history.length - 1
  }

  // Helpers --------------------------------------------------------------
  private createSheet(name: string, rows: number, cols: number): Sheet {
    return {
      id: `sheet-${Math.random().toString(36).slice(2)}`,
      name,
      cells: new Map(),
      rowCount: rows,
      colCount: cols
    }
  }
}

function cloneWorkbook(workbook: Workbook): Workbook {
  const sheets = new Map<string, Sheet>()
  workbook.sheets.forEach((sheet, id) => {
    const cells = new Map<string, Cell>()
    sheet.cells.forEach((cell, address) => {
      cells.set(address, { ...cell, style: cell.style ? { ...cell.style } : undefined })
    })
    sheets.set(id, {
      id: sheet.id,
      name: sheet.name,
      cells,
      rowCount: sheet.rowCount,
      colCount: sheet.colCount
    })
  })

  return {
    id: workbook.id,
    name: workbook.name,
    sheets,
    activeSheetId: workbook.activeSheetId
  }
}
