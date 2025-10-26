// Formula engine using HyperFormula

import { HyperFormula, type IHyperFormula } from "hyperformula"

let hfInstance: IHyperFormula | null = null

export async function initializeHyperFormula() {
  if (hfInstance) return hfInstance

  hfInstance = await HyperFormula.buildFromSheets({
    MySheet: [[]],
  })

  return hfInstance
}

export function getHyperFormula(): IHyperFormula {
  if (!hfInstance) {
    throw new Error("HyperFormula not initialized. Call initializeHyperFormula first.")
  }
  return hfInstance
}

export function evaluateFormula(formula: string, sheetName = "MySheet"): string | number | boolean | null {
  try {
    const hf = getHyperFormula()
    const result = hf.calculateFormula(formula, hf.getSheetId(sheetName))
    return result.value
  } catch (error) {
    return `#ERROR: ${error instanceof Error ? error.message : "Unknown error"}`
  }
}

export function setCellFormula(
  sheetId: number,
  row: number,
  col: number,
  formula: string,
): string | number | boolean | null {
  try {
    const hf = getHyperFormula()
    hf.setCellContents({ sheet: sheetId, row, col }, formula)
    const cell = hf.getSheetSerialized(sheetId)[row]?.[col]
    return cell?.value || null
  } catch (error) {
    return `#ERROR: ${error instanceof Error ? error.message : "Unknown error"}`
  }
}

export function getCellValue(sheetId: number, row: number, col: number): string | number | boolean | null {
  try {
    const hf = getHyperFormula()
    const cell = hf.getSheetSerialized(sheetId)[row]?.[col]
    return cell?.value || null
  } catch (error) {
    return null
  }
}
