"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { SpreadsheetStore } from "@/lib/spreadsheet-store"
import { Button } from "@/components/ui/button"
import { Undo2, Redo2, Copy, Scissors, Clipboard, Download, Upload } from "lucide-react"
import { exportToCSV, exportToJSON, importFromCSV, importFromJSON, downloadFile, uploadFile } from "@/lib/import-export"

interface ToolbarProps {
  store: SpreadsheetStore
  onRefresh: () => void
}

export function Toolbar({ store, onRefresh }: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [exportFormat, setExportFormat] = useState<"csv" | "json" | null>(null)

  const handleExport = (format: "csv" | "json") => {
    const sheet = store.getActiveSheet()
    const workbook = store.getWorkbook()

    if (format === "csv") {
      const csv = exportToCSV(sheet, sheet.name)
      downloadFile(csv, `${sheet.name}.csv`, "text/csv")
    } else {
      const json = exportToJSON(workbook)
      downloadFile(json, `${workbook.name}.json`, "application/json")
    }
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const content = await uploadFile(file)
      const sheet = store.getActiveSheet()
      const workbook = store.getWorkbook()

      if (file.name.endsWith(".csv")) {
        importFromCSV(content, sheet)
      } else if (file.name.endsWith(".json")) {
        importFromJSON(content, workbook)
      }

      onRefresh()
    } catch (error) {
      console.error("Import failed:", error)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex items-center gap-2 bg-muted p-2 border-b border-border">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          store.undo()
          onRefresh()
        }}
        title="Undo (Ctrl+Z)"
      >
        <Undo2 className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          store.redo()
          onRefresh()
        }}
        title="Redo (Ctrl+Y)"
      >
        <Redo2 className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-border" />
      <Button size="sm" variant="ghost" title="Copy (Ctrl+C)">
        <Copy className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="ghost" title="Cut (Ctrl+X)">
        <Scissors className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="ghost" title="Paste (Ctrl+V)">
        <Clipboard className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-border" />
      <div className="relative">
        <Button size="sm" variant="ghost" onClick={() => setExportFormat(exportFormat ? null : "csv")} title="Export">
          <Download className="w-4 h-4" />
        </Button>
        {exportFormat && (
          <div className="absolute top-full mt-1 bg-background border border-border rounded shadow-lg z-10">
            <button
              onClick={() => {
                handleExport("csv")
                setExportFormat(null)
              }}
              className="block w-full text-left px-3 py-2 hover:bg-muted text-sm"
            >
              Export as CSV
            </button>
            <button
              onClick={() => {
                handleExport("json")
                setExportFormat(null)
              }}
              className="block w-full text-left px-3 py-2 hover:bg-muted text-sm"
            >
              Export as JSON
            </button>
          </div>
        )}
      </div>
      <Button size="sm" variant="ghost" onClick={() => fileInputRef.current?.click()} title="Import">
        <Upload className="w-4 h-4" />
      </Button>
      <input ref={fileInputRef} type="file" accept=".csv,.json" onChange={handleImport} className="hidden" />
    </div>
  )
}
