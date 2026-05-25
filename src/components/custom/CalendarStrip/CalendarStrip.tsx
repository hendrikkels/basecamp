"use client";

import React from "react";
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
      <div ref={ref} className={classes}>
        {days.map((day, i) => (
          <div key={i} className={`${styles.day} ${day.isToday ? styles.today : ""}`}>
            <span className={styles.dayNumber}>{day.date}</span>
            {day.label}
            {day.dots && day.dots > 0 && (
              <div>
                {Array.from({ length: day.dots }, (_, j) => (
                  <span key={j} className={styles.dot} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
);

CalendarStrip.displayName = "CalendarStrip";
