import { holidayThemes } from "@/config/holidayThemes"

export function getActiveHolidayTheme() {
  const today = new Date()

  return holidayThemes.find((theme) => {
    const start = new Date(theme.start)
    const end = new Date(theme.end)

    return (
      theme.enabled &&
      today >= start &&
      today <= end
    )
  })
}
