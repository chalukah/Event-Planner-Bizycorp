// State management for the spreadsheet

import {
  type Workbook,
  type Sheet,
  type Cell,
  type CellPosition,
  type SelectionState,
  cellToAddress,
} from "./spreadsheet-types"

export class SpreadsheetStore {
  private workbook: Workbook
  private selection: SelectionState = {
    active: null,
    ranges: [],
  }
  private history: Workbook[] = []
  private historyIndex = -1
  private formulaCache: Map<string, string | number | boolean | null> = new Map()

  constructor() {
    this.workbook = this.createDefaultWorkbook()
  }

  private createDefaultWorkbook(): Workbook {
    const sheet = this.createSheet("Sheet1", 1000, 26)
    return {
      id: "wb-1",
      name: "Workbook",
      sheets: new Map([["sheet-1", sheet]]),
      activeSheetId: "sheet-1",
    }
  }

  private createSheet(name: string, rows: number, cols: number): Sheet {
    return {
      id: `sheet-${Date.now()}`,
      name,
      cells: new Map(),
      rowCount: rows,
      colCount: cols,
    }
  }

  // Workbook operations
  getWorkbook(): Workbook {
    return this.workbook
  }

  getActiveSheet(): Sheet {
    const sheet = this.workbook.sheets.get(this.workbook.activeSheetId)
    if (!sheet) throw new Error("Active sheet not found")
    return sheet
  }

  setActiveSheet(sheetId: string): void {
    if (!this.workbook.sheets.has(sheetId)) {
      throw new Error("Sheet not found")
    }
    this.workbook.activeSheetId = sheetId
    this.clearSelection()
  }

  addSheet(name: string): string {
    const sheet = this.createSheet(name, 1000, 26)
    this.workbook.sheets.set(sheet.id, sheet)
    return sheet.id
  }

  deleteSheet(sheetId: string): void {
    if (this.workbook.sheets.size <= 1) {
      throw new Error("Cannot delete the last sheet")
    }
    this.workbook.sheets.delete(sheetId)
    if (this.workbook.activeSheetId === sheetId) {
      const firstSheetId = this.workbook.sheets.keys().next().value
      this.workbook.activeSheetId = firstSheetId
    }
  }

  renameSheet(sheetId: string, newName: string): void {
    const sheet = this.workbook.sheets.get(sheetId)
    if (!sheet) throw new Error("Sheet not found")
    sheet.name = newName
  }

  // Cell operations
  getCell(row: number, col: number): Cell {
    const sheet = this.getActiveSheet()
    const address = cellToAddress(row, col)
    return sheet.cells.get(address) || { value: null }
  }

  setCell(row: number, col: number, cell: Partial<Cell>): void {
    this.saveHistory()
    const sheet = this.getActiveSheet()
    const address = cellToAddress(row, col)
    const existing = sheet.cells.get(address) || { value: null }

    const finalCell = { ...existing, ...cell }
    if (cell.formula) {
      finalCell.formatted = this.evaluateFormula(cell.formula)
    }

    sheet.cells.set(address, finalCell)
    this.formulaCache.delete(address)
  }

  setCellValue(row: number, col: number, value: string | number | boolean | null): void {
    this.setCell(row, col, { value })
  }

  clearCell(row: number, col: number): void {
    this.saveHistory()
    const sheet = this.getActiveSheet()
    const address = cellToAddress(row, col)
    sheet.cells.delete(address)
  }

  // Selection operations
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

  // History operations
  private saveHistory(): void {
    this.history = this.history.slice(0, this.historyIndex + 1)
    this.history.push(JSON.parse(JSON.stringify(this.workbook)))
    this.historyIndex++
  }

  undo(): void {
    if (this.historyIndex > 0) {
      this.historyIndex--
      this.workbook = JSON.parse(JSON.stringify(this.history[this.historyIndex]))
    }
  }

  redo(): void {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++
      this.workbook = JSON.parse(JSON.stringify(this.history[this.historyIndex]))
    }
  }

  evaluateFormula(formula: string): string | number | boolean | null {
    // Simple formula evaluation without external library for now
    // Supports basic operations: SUM, AVERAGE, COUNT, etc.
    try {
      // Handle SUM formula
      if (formula.startsWith("=SUM(")) {
        const range = formula.slice(5, -1)
        return this.evaluateSumFormula(range)
      }

      // Handle AVERAGE formula
      if (formula.startsWith("=AVERAGE(")) {
        const range = formula.slice(9, -1)
        return this.evaluateAverageFormula(range)
      }

      // Handle COUNT formula
      if (formula.startsWith("=COUNT(")) {
        const range = formula.slice(7, -1)
        return this.evaluateCountFormula(range)
      }

      // Handle simple arithmetic
      if (formula.startsWith("=")) {
        return this.evaluateArithmetic(formula.slice(1))
      }

      return formula
    } catch (error) {
      return `#ERROR`
    }
  }

  private evaluateSumFormula(range: string): number {
    const cells = this.getRangeValues(range)
    return cells.reduce((sum, val) => {
      const num = Number(val)
      return sum + (isNaN(num) ? 0 : num)
    }, 0)
  }

  private evaluateAverageFormula(range: string): number {
    const cells = this.getRangeValues(range)
    const numbers = cells.map(Number).filter((n) => !isNaN(n))
    return numbers.length > 0 ? numbers.reduce((a, b) => a + b, 0) / numbers.length : 0
  }

  private evaluateCountFormula(range: string): number {
    const cells = this.getRangeValues(range)
    return cells.filter((val) => val !== null && val !== "").length
  }

  private evaluateArithmetic(expr: string): number {
    try {
      // Simple arithmetic evaluation (be careful with eval in production)
      return Function('"use strict"; return (' + expr + ")")()
    } catch {
      return 0
    }
  }

  private getRangeValues(range: string): (string | number | null)[] {
    const values: (string | number | null)[] = []
    const parts = range.split(":")

    if (parts.length === 2) {
      const start = this.addressToPosition(parts[0].trim())
      const end = this.addressToPosition(parts[1].trim())

      for (let row = start.row; row <= end.row; row++) {
        for (let col = start.col; col <= end.col; col++) {
          const cell = this.getCell(row, col)
          values.push(cell.value)
        }
      }
    }

    return values
  }

  private addressToPosition(address: string): CellPosition {
    const match = address.match(/^([A-Z]+)(\d+)$/)
    if (!match) throw new Error(`Invalid cell address: ${address}`)

    let col = 0
    for (let i = 0; i < match[1].length; i++) {
      col = col * 26 + (match[1].charCodeAt(i) - 64)
    }

    return {
      row: Number.parseInt(match[2]) - 1,
      col: col - 1,
    }
  }
}
