"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { SpreadsheetStore } from "@/lib/spreadsheet-store"
import { type Cell, cellToAddress } from "@/lib/spreadsheet-types"
import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"

interface CellEditorProps {
  row: number
  col: number
  cell: Cell
  store: SpreadsheetStore
  onClose: () => void
  onOpenFormatting?: () => void
}

export function CellEditor({ row, col, cell, store, onClose, onOpenFormatting }: CellEditorProps) {
  const [value, setValue] = useState(String(cell.value || ""))
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSave = () => {
    if (value.startsWith("=")) {
      store.setCell(row, col, { formula: value, value: value })
    } else {
      store.setCellValue(row, col, value || null)
    }
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-2 flex gap-2">
      <div className="text-sm text-muted-foreground">{cellToAddress(row, col)}</div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        className="flex-1 px-2 py-1 border border-border rounded text-sm"
        placeholder="Enter value or formula (e.g., =SUM(A1:A10))"
      />
      {onOpenFormatting && (
        <Button size="sm" variant="outline" onClick={onOpenFormatting}>
          <Palette className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
