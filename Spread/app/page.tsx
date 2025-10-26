"use client"

import { SpreadsheetApp } from "@/components/spreadsheet-app"

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-background">
      <SpreadsheetApp />
    </main>
  )
}
