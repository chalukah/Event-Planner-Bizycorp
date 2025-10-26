"use client"

import { useEffect, useRef } from "react"
import type { SpreadsheetStore } from "@/lib/spreadsheet-store"
import { Trash2, Edit2, Palette, Copy } from "lucide-react"

interface ContextMenuProps {
  x: number
  y: number
  row: number
  col: number
  store: SpreadsheetStore
  onClose: () => void
  onRefresh: () => void
  onEdit: () => void
  onFormat: () => void
}

export function ContextMenu({ x, y, row, col, store, onClose, onRefresh, onEdit, onFormat }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const handleCopy = () => {
    const cell = store.getCell(row, col)
    navigator.clipboard.writeText(String(cell.value || ""))
    onClose()
  }

  const handleDelete = () => {
    store.clearCell(row, col)
    onRefresh()
    onClose()
  }

  return (
    <div
      ref={menuRef}
      className="fixed bg-background border border-border rounded shadow-lg z-50"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <button onClick={onEdit} className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted text-sm text-left">
        <Edit2 className="w-4 h-4" />
        Edit
      </button>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted text-sm text-left"
      >
        <Copy className="w-4 h-4" />
        Copy
      </button>
      <button onClick={onFormat} className="flex items-center gap-2 w-full px-3 py-2 hover:bg-muted text-sm text-left">
        <Palette className="w-4 h-4" />
        Format
      </button>
      <div className="border-t border-border" />
      <button
        onClick={handleDelete}
        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-destructive/10 text-sm text-left text-destructive"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </div>
  )
}
