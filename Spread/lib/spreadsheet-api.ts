// Public API for programmatic access to the spreadsheet

import type { SpreadsheetStore } from "./spreadsheet-store"
import { cellToAddress, addressToCell } from "./spreadsheet-types"

export class SpreadsheetAPI {
  constructor(private store: SpreadsheetStore) {}

  // Cell operations
  getCellValue(address: string): string | number | boolean | null {
    const pos = addressToCell(address)
    return this.store.getCell(pos.row, pos.col).value
  }

  setCellValue(address: string, value: string | number | boolean | null): void {
    const pos = addressToCell(address)
    this.store.setCellValue(pos.row, pos.col, value)
  }

  setCellFormula(address: string, formula: string): void {
    const pos = addressToCell(address)
    this.store.setCell(pos.row, pos.col, { formula, value: formula })
  }

  clearCell(address: string): void {
    const pos = addressToCell(address)
    this.store.clearCell(pos.row, pos.col)
  }

  // Range operations
  setRangeValues(startAddress: string, values: (string | number | boolean | null)[][]): void {
    const start = addressToCell(startAddress)
    for (let row = 0; row < values.length; row++) {
      for (let col = 0; col < values[row].length; col++) {
        this.store.setCellValue(start.row + row, start.col + col, values[row][col])
      }
    }
  }

  getRangeValues(startAddress: string, endAddress: string): (string | number | boolean | null)[][] {
    const start = addressToCell(startAddress)
    const end = addressToCell(endAddress)
    const values: (string | number | boolean | null)[][] = []

    for (let row = start.row; row <= end.row; row++) {
      const rowValues: (string | number | boolean | null)[] = []
      for (let col = start.col; col <= end.col; col++) {
        rowValues.push(this.store.getCell(row, col).value)
      }
      values.push(rowValues)
    }

    return values
  }

  // Sheet operations
  getActiveSheetName(): string {
    return this.store.getActiveSheet().name
  }

  setActiveSheet(name: string): void {
    const workbook = this.store.getWorkbook()
    const sheet = Array.from(workbook.sheets.values()).find((s) => s.name === name)
    if (sheet) {
      this.store.setActiveSheet(sheet.id)
    }
  }

  getSheetNames(): string[] {
    return Array.from(this.store.getWorkbook().sheets.values()).map((s) => s.name)
  }

  addSheet(name: string): void {
    this.store.addSheet(name)
  }

  deleteSheet(name: string): void {
    const workbook = this.store.getWorkbook()
    const sheet = Array.from(workbook.sheets.values()).find((s) => s.name === name)
    if (sheet) {
      this.store.deleteSheet(sheet.id)
    }
  }

  // History operations
  undo(): void {
    this.store.undo()
  }

  redo(): void {
    this.store.redo()
  }

  // Utility
  addressToCell(address: string) {
    return addressToCell(address)
  }

  cellToAddress(row: number, col: number): string {
    return cellToAddress(row, col)
  }
}
