"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import type { SpreadsheetStore } from "@/lib/spreadsheet-store"
import { CellEditor } from "./cell-editor"
import { FormattingPanel } from "./formatting-panel"
import { ContextMenu } from "./context-menu"

const ROW_HEIGHT = 32
const COL_WIDTH = 100
const HEADER_HEIGHT = 32
const ROW_HEADER_WIDTH = 50

interface SpreadsheetGridProps {
  store: SpreadsheetStore
  onRefresh: () => void
}

export function SpreadsheetGrid({ store, onRefresh }: SpreadsheetGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null)
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [showFormatting, setShowFormatting] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; row: number; col: number } | null>(null)

  const sheet = store.getActiveSheet()
  const visibleRows = Math.ceil((containerRef.current?.clientHeight || 600) / ROW_HEIGHT) + 2
  const visibleCols = Math.ceil((containerRef.current?.clientWidth || 800) / COL_WIDTH) + 2
  const startRow = Math.floor(scrollTop / ROW_HEIGHT)
  const startCol = Math.floor(scrollLeft / COL_WIDTH)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return

      // Ctrl+C or Cmd+C - Copy
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault()
        const cell = store.getCell(selectedCell.row, selectedCell.col)
        navigator.clipboard.writeText(String(cell.value || ""))
      }

      // Ctrl+X or Cmd+X - Cut
      if ((e.ctrlKey || e.metaKey) && e.key === "x") {
        e.preventDefault()
        const cell = store.getCell(selectedCell.row, selectedCell.col)
        navigator.clipboard.writeText(String(cell.value || ""))
        store.clearCell(selectedCell.row, selectedCell.col)
        onRefresh()
      }

      // Ctrl+V or Cmd+V - Paste
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        e.preventDefault()
        navigator.clipboard.readText().then((text) => {
          store.setCellValue(selectedCell.row, selectedCell.col, text)
          onRefresh()
        })
      }

      // Ctrl+Z or Cmd+Z - Undo
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault()
        store.undo()
        onRefresh()
      }

      // Ctrl+Y or Cmd+Y - Redo
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault()
        store.redo()
        onRefresh()
      }

      // Delete - Clear cell
      if (e.key === "Delete") {
        e.preventDefault()
        store.clearCell(selectedCell.row, selectedCell.col)
        onRefresh()
      }

      // Arrow keys - Navigate
      if (e.key === "ArrowUp" && selectedCell.row > 0) {
        e.preventDefault()
        setSelectedCell({ row: selectedCell.row - 1, col: selectedCell.col })
        store.setActiveCell(selectedCell.row - 1, selectedCell.col)
      }
      if (e.key === "ArrowDown" && selectedCell.row < sheet.rowCount - 1) {
        e.preventDefault()
        setSelectedCell({ row: selectedCell.row + 1, col: selectedCell.col })
        store.setActiveCell(selectedCell.row + 1, selectedCell.col)
      }
      if (e.key === "ArrowLeft" && selectedCell.col > 0) {
        e.preventDefault()
        setSelectedCell({ row: selectedCell.row, col: selectedCell.col - 1 })
        store.setActiveCell(selectedCell.row, selectedCell.col - 1)
      }
      if (e.key === "ArrowRight" && selectedCell.col < sheet.colCount - 1) {
        e.preventDefault()
        setSelectedCell({ row: selectedCell.row, col: selectedCell.col + 1 })
        store.setActiveCell(selectedCell.row, selectedCell.col + 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedCell, store, onRefresh, sheet])

  // Render grid to canvas
  const renderGrid = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)

    // Draw column headers
    ctx.fillStyle = "#f3f4f6"
    ctx.fillRect(0, 0, width, HEADER_HEIGHT)
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    for (let i = 0; i < visibleCols; i++) {
      const col = startCol + i
      const x = ROW_HEADER_WIDTH + i * COL_WIDTH
      ctx.strokeRect(x, 0, COL_WIDTH, HEADER_HEIGHT)
      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(String.fromCharCode(65 + col), x + COL_WIDTH / 2, HEADER_HEIGHT / 2 + 4)
    }

    // Draw row headers
    ctx.fillStyle = "#f3f4f6"
    ctx.fillRect(0, HEADER_HEIGHT, ROW_HEADER_WIDTH, height - HEADER_HEIGHT)

    for (let i = 0; i < visibleRows; i++) {
      const row = startRow + i
      const y = HEADER_HEIGHT + i * ROW_HEIGHT
      ctx.strokeRect(0, y, ROW_HEADER_WIDTH, ROW_HEIGHT)
      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(String(row + 1), ROW_HEADER_WIDTH / 2, y + ROW_HEIGHT / 2 + 4)
    }

    // Draw cells
    ctx.fillStyle = "white"
    for (let i = 0; i < visibleRows; i++) {
      for (let j = 0; j < visibleCols; j++) {
        const row = startRow + i
        const col = startCol + j
        const x = ROW_HEADER_WIDTH + j * COL_WIDTH
        const y = HEADER_HEIGHT + i * ROW_HEIGHT

        if (row >= sheet.rowCount || col >= sheet.colCount) continue

        const cell = store.getCell(row, col)
        const isSelected = selectedCell?.row === row && selectedCell?.col === col

        const style = cell.style || {}
        ctx.fillStyle = style.backgroundColor || (isSelected ? "#dbeafe" : "white")
        ctx.fillRect(x, y, COL_WIDTH, ROW_HEIGHT)

        // Draw cell border
        ctx.strokeStyle = "#e5e7eb"
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, COL_WIDTH, ROW_HEIGHT)

        // Draw cell text with formatting
        const displayValue = cell.formatted !== undefined ? cell.formatted : cell.value
        if (displayValue !== null) {
          let fontStyle = "14px"
          if (style.bold) fontStyle = "bold " + fontStyle
          if (style.italic) fontStyle = "italic " + fontStyle
          ctx.font = fontStyle + " sans-serif"
          ctx.fillStyle = style.fontColor || "#1f2937"
          ctx.textAlign = (style.textAlign as CanvasTextAlign) || "left"
          const textX =
            style.textAlign === "center" ? x + COL_WIDTH / 2 : style.textAlign === "right" ? x + COL_WIDTH - 4 : x + 4
          ctx.fillText(String(displayValue).substring(0, 20), textX, y + ROW_HEIGHT / 2 + 4)
        }
      }
    }
  }, [startRow, startCol, visibleRows, visibleCols, selectedCell, sheet])

  useEffect(() => {
    renderGrid()
  }, [renderGrid])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (x < ROW_HEADER_WIDTH || y < HEADER_HEIGHT) return

    const col = startCol + Math.floor((x - ROW_HEADER_WIDTH) / COL_WIDTH)
    const row = startRow + Math.floor((y - HEADER_HEIGHT) / ROW_HEIGHT)

    if (row < sheet.rowCount && col < sheet.colCount) {
      setSelectedCell({ row, col })
      store.setActiveCell(row, col)
    }
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (x < ROW_HEADER_WIDTH || y < HEADER_HEIGHT) return

    const col = startCol + Math.floor((x - ROW_HEADER_WIDTH) / COL_WIDTH)
    const row = startRow + Math.floor((y - HEADER_HEIGHT) / ROW_HEIGHT)

    if (row < sheet.rowCount && col < sheet.colCount) {
      setEditingCell({ row, col })
    }
  }

  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (x < ROW_HEADER_WIDTH || y < HEADER_HEIGHT) return

    const col = startCol + Math.floor((x - ROW_HEADER_WIDTH) / COL_WIDTH)
    const row = startRow + Math.floor((y - HEADER_HEIGHT) / ROW_HEIGHT)

    if (row < sheet.rowCount && col < sheet.colCount) {
      setContextMenu({ x: e.clientX, y: e.clientY, row, col })
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    setScrollTop(target.scrollTop)
    setScrollLeft(target.scrollLeft)
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {showFormatting && selectedCell && (
        <FormattingPanel
          cell={store.getCell(selectedCell.row, selectedCell.col)}
          onApply={(style) => {
            store.setCell(selectedCell.row, selectedCell.col, { style })
            onRefresh()
          }}
          onClose={() => setShowFormatting(false)}
        />
      )}
      <div ref={containerRef} className="flex-1 overflow-auto bg-white" onScroll={handleScroll}>
        <div
          style={{
            width: ROW_HEADER_WIDTH + sheet.colCount * COL_WIDTH,
            height: HEADER_HEIGHT + sheet.rowCount * ROW_HEIGHT,
          }}
        >
          <canvas
            ref={canvasRef}
            width={containerRef.current?.clientWidth || 800}
            height={containerRef.current?.clientHeight || 600}
            onClick={handleCanvasClick}
            onDoubleClick={handleDoubleClick}
            onContextMenu={handleContextMenu}
            className="cursor-cell"
          />
        </div>
      </div>

      {editingCell && (
        <CellEditor
          row={editingCell.row}
          col={editingCell.col}
          cell={store.getCell(editingCell.row, editingCell.col)}
          store={store}
          onClose={() => {
            setEditingCell(null)
            onRefresh()
          }}
          onOpenFormatting={() => setShowFormatting(true)}
        />
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          row={contextMenu.row}
          col={contextMenu.col}
          store={store}
          onClose={() => setContextMenu(null)}
          onRefresh={onRefresh}
          onEdit={() => {
            setEditingCell({ row: contextMenu.row, col: contextMenu.col })
            setContextMenu(null)
          }}
          onFormat={() => {
            setSelectedCell({ row: contextMenu.row, col: contextMenu.col })
            setShowFormatting(true)
            setContextMenu(null)
          }}
        />
      )}
    </div>
  )
}
