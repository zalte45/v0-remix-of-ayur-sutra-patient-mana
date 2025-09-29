"use client"

import * as React from "react"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "light",
  enableSystem = false,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  React.useEffect(() => {
    // Set default theme
    if (defaultTheme === "light") {
      document.documentElement.classList.remove("dark")
    } else if (defaultTheme === "dark") {
      document.documentElement.classList.add("dark")
    }
  }, [defaultTheme])

  return <>{children}</>
}
