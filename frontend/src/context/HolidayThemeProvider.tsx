"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react"

import type { HolidayTheme } from "@/config/holidayThemes"
import { holidayThemes } from "@/config/holidayThemes"
import { getActiveHolidayTheme } from "@/lib/getActiveHolidayTheme"
import { api } from "@/lib/api"

const HolidayThemeContext =
  createContext<HolidayTheme | undefined>(undefined)

export function HolidayThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const dateTheme = getActiveHolidayTheme()
  const [activeTheme, setActiveTheme] =
    useState<HolidayTheme | undefined>(dateTheme)

  useEffect(() => {
    // Check backend for admin override
    api
      .getHolidayTheme()
      .then((res) => {
        if (res.active && res.theme_name) {
          // Admin forced a theme on — find it from config
          const forced = holidayThemes.find(
            (t) => t.name === res.theme_name
          )
          if (forced) setActiveTheme(forced)
        }
        // If no override, keep date-based theme (or undefined)
      })
      .catch(() => {
        // Backend unavailable — fall back to date-based
      })
  }, [])

  return (
    <HolidayThemeContext.Provider
      value={activeTheme}
    >
      {children}
    </HolidayThemeContext.Provider>
  )
}

export function useHolidayTheme() {
  return useContext(HolidayThemeContext)
}
