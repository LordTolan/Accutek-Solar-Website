"use client"

import {
  createContext,
  useContext,
} from "react"

import type { HolidayTheme } from "@/config/holidayThemes"
import { getActiveHolidayTheme } from "@/lib/getActiveHolidayTheme"

const HolidayThemeContext =
  createContext<HolidayTheme | undefined>(undefined)

export function HolidayThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const activeTheme =
    getActiveHolidayTheme()

  return (
    <HolidayThemeContext.Provider
      value={activeTheme}
    >
      {children}
    </HolidayThemeContext.Provider>
  )
}

export function useHolidayTheme() {
  return useContext(
    HolidayThemeContext
  )
}
