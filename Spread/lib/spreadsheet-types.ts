// Core types for the spreadsheet application

export interface Cell {
  value: string | number | boolean | null
  formula?: string
  formatted?: string
  style?: CellStyle
  validation?: DataValidation
}

export interface CellStyle {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  fontSize?: number
  fontColor?: string
  backgroundColor?: string
  textAlign?: "left" | "center" | "right"
  numberFormat?: string
}

export interface DataValidation {
  type: "list" | "number" | "date" | "text"
  operator?: "between" | "equal" | "greaterThan" | "lessThan"
  value1?: string | number
  value2?: string | number
  showError?: boolean
  errorMessage?: string
}

export interface Sheet {
  id: string
  name: string
  cells: Map<string, Cell>
  rowCount: number
  colCount: number
}

export interface Workbook {
  id: string
  name: string
  sheets: Map<string, Sheet>
  activeSheetId: string
}

export interface CellPosition {
  row: number
  col: number
}

export interface CellRange {
  start: CellPosition
  end: CellPosition
}

export interface SelectionState {
  active: CellPosition | null
  ranges: CellRange[]
  clipboard?: {
    data: Map<string, Cell>
    range: CellRange
    isCut: boolean
  }
}

// Utility functions
export function cellToAddress(row: number, col: number): string {
  let address = ""
  let c = col
  while (c >= 0) {
    address = String.fromCharCode(65 + (c % 26)) + address
    c = Math.floor(c / 26) - 1
  }
  return address + (row + 1)
}

export function addressToCell(address: string): CellPosition {
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
