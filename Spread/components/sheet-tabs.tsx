"use client"

import { useState } from "react"
import type { SpreadsheetStore } from "@/lib/spreadsheet-store"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

interface SheetTabsProps {
  store: SpreadsheetStore
  onRefresh: () => void
}

export function SheetTabs({ store, onRefresh }: SheetTabsProps) {
  const workbook = store.getWorkbook()
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [newName, setNewName] = useState("")

  const handleAddSheet = () => {
    const newId = store.addSheet(`Sheet${workbook.sheets.size + 1}`)
    store.setActiveSheet(newId)
    onRefresh()
  }

  const handleDeleteSheet = (sheetId: string) => {
    store.deleteSheet(sheetId)
    onRefresh()
  }

  const handleRename = (sheetId: string, currentName: string) => {
    setRenamingId(sheetId)
    setNewName(currentName)
  }

  const handleSaveRename = (sheetId: string) => {
    if (newName.trim()) {
      store.renameSheet(sheetId, newName)
    }
    setRenamingId(null)
    onRefresh()
  }

  return (
    <div className="flex items-center gap-1 bg-muted p-2 border-t border-border overflow-x-auto">
      {Array.from(workbook.sheets.values()).map((sheet) => (
        <div
          key={sheet.id}
          className={`flex items-center gap-1 px-3 py-1 rounded cursor-pointer ${
            workbook.activeSheetId === sheet.id
              ? "bg-background text-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
          onClick={() => {
            store.setActiveSheet(sheet.id)
            onRefresh()
          }}
        >
          {renamingId === sheet.id ? (
            <input
              autoFocus
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={() => handleSaveRename(sheet.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveRename(sheet.id)
                if (e.key === "Escape") setRenamingId(null)
              }}
              className="px-1 py-0 text-sm border border-border rounded"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className="text-sm"
              onDoubleClick={(e) => {
                e.stopPropagation()
                handleRename(sheet.id, sheet.name)
              }}
            >
              {sheet.name}
            </span>
          )}
          {workbook.sheets.size > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteSheet(sheet.id)
              }}
              className="p-0 hover:bg-destructive/10 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <Button size="sm" variant="ghost" onClick={handleAddSheet} className="gap-1">
        <Plus className="w-4 h-4" />
        Add
      </Button>
    </div>
  )
}
