import * as React from "react"
import { DayPicker } from "react-day-picker"
import { de } from "date-fns/locale"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={de}
      showOutsideDays={showOutsideDays}
      className={cn("p-4 bg-white font-sans", className)}
      style={{
        "--rdp-accent-color": "#7d3a2a",
        "--rdp-accent-background-color": "#f8f3f2",
        "--rdp-day-height": "42px",
        "--rdp-day-width": "42px",
        "--rdp-day_button-border-radius": "100%",
      } as React.CSSProperties}
      classNames={{
        caption_label: "text-lg font-serif tracking-wider uppercase",
        nav_button: "bg-stone-50 hover:bg-stone-100 transition-colors rounded-full p-2 border border-stone-200",
        weekday: "text-stone-400 capitalize font-medium text-[0.7rem] pb-4 tracking-widest",
        today: "font-bold text-[#7d3a2a]",
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
