"use client";

import React from "react";
import { Box, Span } from "@/components/primitives";
import styles from "./StatRow.module.css";

export interface StatRowProps {
  label: string;
  value: string;
  color?: "default" | "primary" | "success" | "danger" | "warn" | "info" | "muted";
  bordered?: boolean;
  className?: string;
}

const colorMap: Record<string, string> = {
  default: "var(--text)",
  primary: "var(--acc)",
  success: "var(--success)",
  danger: "var(--danger)",
  warn: "var(--warn)",
  info: "var(--info)",
  muted: "var(--muted)",
};

export const StatRow = React.forwardRef<HTMLDivElement, StatRowProps>(
  function StatRow({ label, value, color = "default", bordered = false, className }, ref) {
    const classes = [styles.row, bordered ? styles.bordered : undefined, className]
      .filter(Boolean)
      .join(" ");

    return (
      <Box ref={ref} className={classes}>
        <Span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "var(--ls-wide)", textTransform: "uppercase", color: "var(--dim)" }}>
          {label}
        </Span>
        <Span style={{ fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 500, color: colorMap[color] }}>
          {value}
        </Span>
      </Box>
    );
  }
);

StatRow.displayName = "StatRow";
