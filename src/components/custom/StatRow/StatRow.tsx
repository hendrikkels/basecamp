"use client";

import React from "react";
import { Box } from "@/components/primitives";
import { Text } from "@/components/custom/Text";
import type { TextColor } from "@/components/custom/Text";
import styles from "./StatRow.module.css";

export interface StatRowProps {
  label: string;
  value: string;
  color?: "default" | "primary" | "success" | "danger" | "warn" | "info" | "muted";
  bordered?: boolean;
  className?: string;
}

export const StatRow = React.forwardRef<HTMLDivElement, StatRowProps>(
  function StatRow({ label, value, color = "default", bordered = false, className }, ref) {
    const classes = [styles.row, bordered ? styles.bordered : undefined, className]
      .filter(Boolean)
      .join(" ");

    return (
      <Box ref={ref} className={classes}>
        <Text size="micro" color="dim" className={styles.label}>{label}</Text>
        <Text size="body-sm" color={color as TextColor} weight="medium">{value}</Text>
      </Box>
    );
  }
);

StatRow.displayName = "StatRow";
