"use client";

import React from "react";
import styles from "./HabitGrid.module.css";

export type HabitCellState = "empty" | "partial" | "filled";

export interface HabitGridProps {
  cells: HabitCellState[];
  className?: string;
}

export const HabitGrid = React.forwardRef<HTMLDivElement, HabitGridProps>(
  function HabitGrid({ cells, className }, ref) {
    const classes = [styles.grid, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes}>
        {cells.map((state, i) => (
          <div
            key={i}
            className={`${styles.cell} ${state === "filled" ? styles.filled : state === "partial" ? styles.partial : ""}`}
          />
        ))}
      </div>
    );
  }
);

HabitGrid.displayName = "HabitGrid";
