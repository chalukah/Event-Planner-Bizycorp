// Import/Export utilities for CSV and Excel formats

import type { Workbook, Sheet } from "./spreadsheet-types"
import { cellToAddress } from "./spreadsheet-types"

export function exportToCSV(sheet: Sheet, sheetName: string): string {
  const rows: string[] = []

  for (let row = 0; row < sheet.rowCount; row++) {
    const cells: string[] = []
    for (let col = 0; col < sheet.colCount; col++) {
      const address = cellToAddress(row, col)
      const cell = sheet.cells.get(address)
      const value = cell?.formatted !== undefined ? cell.formatted : cell?.value
      cells.push(String(value || "").replace(/"/g, '""'))
    }
    rows.push(cells.map((c) => `"${c}"`).join(","))
  }

  return rows.join("\n")
}

export function exportToJSON(workbook: Workbook): string {
  const data: Record<string, Record<string, unknown>> = {}

  for (const [, sheet] of workbook.sheets) {
    const sheetData: Record<string, unknown> = {}

    for (const [address, cell] of sheet.cells) {
      sheetData[address] = {
        value: cell.value,
        formula: cell.formula,
        style: cell.style,
      }
    }

    data[sheet.name] = sheetData
  }

  return JSON.stringify(data, null, 2)
}

export function importFromCSV(csv: string, sheet: Sheet): void {
  const lines = csv.split("\n")

  for (let row = 0; row < lines.length; row++) {
    const line = lines[row]
    const cells = parseCSVLine(line)

    for (let col = 0; col < cells.length; col++) {
      const address = cellToAddress(row, col)
      const value = cells[col]

      if (value !== "") {
        sheet.cells.set(address, {
          value: isNaN(Number(value)) ? value : Number(value),
        })
      }
    }
  }
}

export function importFromJSON(json: string, workbook: Workbook): void {
  try {
    const data = JSON.parse(json)

    for (const [sheetName, sheetData] of Object.entries(data)) {
      const sheet = Array.from(workbook.sheets.values()).find((s) => s.name === sheetName)
      if (!sheet) continue

      for (const [address, cellData] of Object.entries(sheetData as Record<string, unknown>)) {
        const data = cellData as Record<string, unknown>
        sheet.cells.set(address, {
          value: data.value as string | number | boolean | null,
          formula: data.formula as string | undefined,
          style: data.style as Record<string, unknown> | undefined,
        })
      }
    }
  } catch (error) {
    console.error("Failed to import JSON:", error)
  }
}

function parseCSVLine(line: string): string[] {
  const cells: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === "," && !inQuotes) {
      cells.push(current)
      current = ""
    } else {
      current += char
    }
  }

  cells.push(current)
  return cells
}

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function uploadFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      resolve(content)
    }
    reader.onerror = reject
    reader.readAsText(file)
  })
}
