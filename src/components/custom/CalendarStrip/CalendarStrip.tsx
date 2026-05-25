"use client";

import React from "react";
import { Box, Span } from "@/components/primitives";
import styles from "./CalendarStrip.module.css";

export interface CalendarDay {
  date: number;
  label: string;
  isToday?: boolean;
  dots?: number;
}

export interface CalendarStripProps {
  days: CalendarDay[];
  className?: string;
}

export const CalendarStrip = React.forwardRef<HTMLDivElement, CalendarStripProps>(
  function CalendarStrip({ days, className }, ref) {
    const classes = [styles.grid, className].filter(Boolean).join(" ");

    return (
      <Box ref={ref} className={classes}>
        {days.map((day, i) => (
          <Box key={i} className={`${styles.day} ${day.isToday ? styles.today : ""}`}>
            <Span className={styles.dayNumber}>{day.date}</Span>
            {day.label}
            {day.dots && day.dots > 0 && (
              <Box>
                {Array.from({ length: day.dots }, (_, j) => (
                  <Span key={j} className={styles.dot} />
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    );
  }
);

CalendarStrip.displayName = "CalendarStrip";
