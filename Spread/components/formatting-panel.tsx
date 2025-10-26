"use client"

import { useState } from "react"
import type { Cell, CellStyle } from "@/lib/spreadsheet-types"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface FormattingPanelProps {
  cell: Cell
  onApply: (style: CellStyle) => void
  onClose: () => void
}

export function FormattingPanel({ cell, onApply, onClose }: FormattingPanelProps) {
  const [style, setStyle] = useState<CellStyle>(cell.style || {})

  const handleApply = () => {
    onApply(style)
    onClose()
  }

  return (
    <div className="bg-muted border-b border-border p-3 flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Font:</label>
        <input
          type="number"
          min="8"
          max="72"
          value={style.fontSize || 14}
          onChange={(e) => setStyle({ ...style, fontSize: Number(e.target.value) })}
          className="w-12 px-2 py-1 border border-border rounded text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Color:</label>
        <input
          type="color"
          value={style.fontColor || "#000000"}
          onChange={(e) => setStyle({ ...style, fontColor: e.target.value })}
          className="w-10 h-8 border border-border rounded cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Background:</label>
        <input
          type="color"
          value={style.backgroundColor || "#ffffff"}
          onChange={(e) => setStyle({ ...style, backgroundColor: e.target.value })}
          className="w-10 h-8 border border-border rounded cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant={style.bold ? "default" : "outline"}
          onClick={() => setStyle({ ...style, bold: !style.bold })}
          className="w-8 h-8 p-0"
        >
          B
        </Button>
        <Button
          size="sm"
          variant={style.italic ? "default" : "outline"}
          onClick={() => setStyle({ ...style, italic: !style.italic })}
          className="w-8 h-8 p-0"
        >
          I
        </Button>
        <Button
          size="sm"
          variant={style.underline ? "default" : "outline"}
          onClick={() => setStyle({ ...style, underline: !style.underline })}
          className="w-8 h-8 p-0"
        >
          U
        </Button>
      </div>

      <select
        value={style.textAlign || "left"}
        onChange={(e) => setStyle({ ...style, textAlign: e.target.value as "left" | "center" | "right" })}
        className="px-2 py-1 border border-border rounded text-sm"
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>

      <div className="flex gap-2 ml-auto">
        <Button size="sm" onClick={handleApply}>
          Apply
        </Button>
        <Button size="sm" variant="outline" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
