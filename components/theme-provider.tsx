"use client"
import { ThemeProvider as ThemeProvider2 } from "next-themes"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider2 attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider2>
  )
}
