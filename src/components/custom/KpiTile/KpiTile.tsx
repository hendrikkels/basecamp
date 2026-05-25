"use client";

import React from "react";
import styles from "./KpiTile.module.css";

export interface KpiTileProps {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  deltaDirection?: "up" | "down";
  meta?: string;
  children?: React.ReactNode;
  className?: string;
}

export const KpiTile = React.forwardRef<HTMLDivElement, KpiTileProps>(
  function KpiTile({ label, value, unit, delta, deltaDirection = "up", meta, children, className }, ref) {
    const classes = [styles.kpi, className].filter(Boolean).join(" ");
    const deltaClasses = [
      styles.delta,
      deltaDirection === "up" ? styles.deltaUp : styles.deltaDown,
    ].join(" ");

    return (
      <div ref={ref} className={classes}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>
          {value}
          {unit && <span className={styles.unit}>{unit}</span>}
        </span>
        {delta && (
          <span className={deltaClasses}>
            {deltaDirection === "up" ? "▲" : "▼"} {delta}
          </span>
        )}
        {children}
        {meta && <div className={styles.meta}>{meta}</div>}
      </div>
    );
  }
);

KpiTile.displayName = "KpiTile";
