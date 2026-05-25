"use client";

import React from "react";
import { Box, Span } from "@/components/primitives";
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
      <Box ref={ref} className={classes}>
        <Span className={styles.label}>{label}</Span>
        <Span className={styles.value}>
          {value}
          {unit && <Span className={styles.unit}>{unit}</Span>}
        </Span>
        {delta && (
          <Span className={deltaClasses}>
            {deltaDirection === "up" ? "▲" : "▼"} {delta}
          </Span>
        )}
        {children}
        {meta && <Box className={styles.meta}>{meta}</Box>}
      </Box>
    );
  }
);

KpiTile.displayName = "KpiTile";
