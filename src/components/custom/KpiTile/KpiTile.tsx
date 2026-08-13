"use client";

import React from "react";
import { Box, Span } from "@/components/primitives";
import { Text } from "@/components/custom/Text";
import styles from "./KpiTile.module.css";

export interface KpiTileProps {
  label: string;
  qualifier?: string;
  value: string;
  unit?: string;
  delta?: string;
  deltaDirection?: "up" | "down";
  meta?: string;
  children?: React.ReactNode;
  className?: string;
}

export const KpiTile = React.forwardRef<HTMLDivElement, KpiTileProps>(
  function KpiTile({ label, qualifier, value, unit, delta, deltaDirection = "up", meta, children, className }, ref) {
    const classes = [styles.kpi, className].filter(Boolean).join(" ");

    return (
      <Box ref={ref} className={classes}>
        <Text size="micro" color="dim" transform="uppercase">
          {label}
          {qualifier && <Span className={styles.qualifier}> · {qualifier}</Span>}
        </Text>
        <Span className={styles.value}>
          {value}
          {unit && <Span className={styles.unit}>{unit}</Span>}
        </Span>
        {delta && (
          <Text size="micro" color={deltaDirection === "up" ? "success" : "danger"} className={styles.delta}>
            {deltaDirection === "up" ? "▲" : "▼"} {delta}
          </Text>
        )}
        {children}
        {meta && <Text size="micro" color="muted" className={styles.meta}>{meta}</Text>}
      </Box>
    );
  }
);

KpiTile.displayName = "KpiTile";
