"use client"

import { useState, useRef } from "react"
import { SpreadsheetStore } from "@/lib/spreadsheet-store"
import { SpreadsheetAPI } from "@/lib/spreadsheet-api"
import { Button } from "@/components/ui/button"

export default function DebugPage() {
  const storeRef = useRef(new SpreadsheetStore())
  const [output, setOutput] = useState<string>("")
  const [apiCode, setApiCode] = useState(`// Example: Set cell values
api.setCellValue("A1", "Product")
api.setCellValue("B1", "Price")
api.setCellValue("A2", "Laptop")
api.setCellValue("B2", 999)

// Example: Set formula
api.setCellFormula("B3", "=SUM(B2:B2)")

// Example: Get values
const value = api.getCellValue("A1")
console.log(value)`)

  const store = storeRef.current
  const api = new SpreadsheetAPI(store)

  const runDemo = () => {
    try {
      setOutput("Running demo...\n")

      // Populate with sample data
      api.setCellValue("A1", "Product")
      api.setCellValue("B1", "Price")
      api.setCellValue("C1", "Quantity")
      api.setCellValue("D1", "Total")

      api.setCellValue("A2", "Laptop")
      api.setCellValue("B2", 999)
      api.setCellValue("C2", 2)

      api.setCellValue("A3", "Mouse")
      api.setCellValue("B3", 25)
      api.setCellValue("C3", 5)

      api.setCellValue("A4", "Keyboard")
      api.setCellValue("B4", 75)
      api.setCellValue("C4", 3)

      // Add formulas
      api.setCellFormula("D2", "=B2*C2")
      api.setCellFormula("D3", "=B3*C3")
      api.setCellFormula("D4", "=B4*C4")

      api.setCellFormula("B5", "=SUM(B2:B4)")
      api.setCellFormula("C5", "=SUM(C2:C4)")
      api.setCellFormula("D5", "=SUM(D2:D4)")

      api.setCellValue("A5", "Total")

      setOutput((prev) => prev + "✓ Demo data loaded successfully!\n")
      setOutput((prev) => prev + `✓ Active sheet: ${api.getActiveSheetName()}\n`)
      setOutput((prev) => prev + `✓ Sheets: ${api.getSheetNames().join(", ")}\n`)
      setOutput((prev) => prev + `✓ Cell A1 value: ${api.getCellValue("A1")}\n`)
    } catch (error) {
      setOutput((prev) => prev + `✗ Error: ${error instanceof Error ? error.message : "Unknown error"}\n`)
    }
  }

  const runCustomCode = () => {
    try {
      setOutput("Executing custom code...\n")
      // eslint-disable-next-line no-eval
      eval(apiCode)
      setOutput((prev) => prev + "✓ Code executed successfully!\n")
    } catch (error) {
      setOutput((prev) => prev + `✗ Error: ${error instanceof Error ? error.message : "Unknown error"}\n`)
    }
  }

  const clearOutput = () => {
    setOutput("")
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Spreadsheet API Debug Page</h1>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Quick Demo</h2>
            <Button onClick={runDemo} className="w-full">
              Load Demo Data
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Loads sample product data with formulas into the spreadsheet.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">API Reference</h2>
            <div className="bg-muted p-3 rounded text-sm font-mono space-y-1">
              <div>api.getCellValue(address)</div>
              <div>api.setCellValue(address, value)</div>
              <div>api.setCellFormula(address, formula)</div>
              <div>api.getRangeValues(start, end)</div>
              <div>api.setRangeValues(start, values)</div>
              <div>api.getSheetNames()</div>
              <div>api.addSheet(name)</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Custom Code</h2>
          <textarea
            value={apiCode}
            onChange={(e) => setApiCode(e.target.value)}
            className="w-full h-40 p-3 border border-border rounded font-mono text-sm bg-background"
            placeholder="Enter JavaScript code using the api object..."
          />
          <div className="flex gap-2 mt-2">
            <Button onClick={runCustomCode}>Run Code</Button>
            <Button variant="outline" onClick={clearOutput}>
              Clear Output
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Output</h2>
          <div className="bg-muted p-4 rounded font-mono text-sm h-40 overflow-y-auto whitespace-pre-wrap">
            {output || "Output will appear here..."}
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted rounded">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Click "Load Demo Data" to populate the spreadsheet with sample data</li>
            <li>Use the Custom Code section to test the SpreadsheetAPI</li>
            <li>The api object is available in the code execution context</li>
            <li>Check the main spreadsheet page to see your changes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
