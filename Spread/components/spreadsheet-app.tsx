"use client"

import { useState, useCallback, useRef } from "react"
import { SpreadsheetStore } from "@/lib/spreadsheet-store"
import { SpreadsheetGrid } from "./spreadsheet-grid"
import { SheetTabs } from "./sheet-tabs"
import { Toolbar } from "./toolbar"

export function SpreadsheetApp() {
  const storeRef = useRef(new SpreadsheetStore())
  const [, setRefresh] = useState(0)

  const forceRefresh = useCallback(() => {
    setRefresh((r) => r + 1)
  }, [])

  const store = storeRef.current

  return (
    <div className="flex flex-col h-full bg-background">
      <Toolbar store={store} onRefresh={forceRefresh} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SpreadsheetGrid store={store} onRefresh={forceRefresh} />
      </div>
      <SheetTabs store={store} onRefresh={forceRefresh} />
    </div>
  )
}
