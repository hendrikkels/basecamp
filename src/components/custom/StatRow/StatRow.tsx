"use client";

import React from "react";
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
      <div ref={ref} className={classes}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--dim)" }}>
          {label}
        </span>
        <span style={{ fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 500, color: colorMap[color] }}>
          {value}
        </span>
      </div>
    );
  }
);

StatRow.displayName = "StatRow";
