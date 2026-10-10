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
    // Check URL override or localStorage override first (useful for testing and admin preview)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const themeParam = params.get("theme")
      if (themeParam) {
        if (themeParam === "none" || themeParam === "off") {
          setActiveTheme(undefined)
          return
        }
        const matched = holidayThemes.find((t) => t.name === themeParam)
        if (matched) {
          setActiveTheme(matched)
          return
        }
      }

      const storedOverride = localStorage.getItem("accutek_holiday_theme_override")
      if (storedOverride) {
        if (storedOverride === "none" || storedOverride === "off") {
          setActiveTheme(undefined)
          return
        }
        const matched = holidayThemes.find((t) => t.name === storedOverride)
        if (matched) {
          setActiveTheme(matched)
          return
        }
      }
    }

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
