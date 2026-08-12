"use client";

import React from "react";
import { Box, Span } from "@/components/primitives";
import styles from "./StatusStrip.module.css";

export type StatusStripAlign = "left" | "center" | "right" | "between" | "evenly";

export interface StatusStripItem {
  label: string;
  value?: string;
  values?: string[];
  color?: string;
}

export interface StatusStripProps {
  items: StatusStripItem[];
  align?: StatusStripAlign;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
}

const alignClasses: Record<StatusStripAlign, string> = {
  left: styles.left,
  center: styles.center,
  right: styles.right,
  between: styles.between,
  evenly: styles.evenly,
};

export const StatusStrip = React.forwardRef<HTMLDivElement, StatusStripProps>(
  function StatusStrip({ items, align = "left", leading, trailing, className }, ref) {
    const classes = [styles.strip, alignClasses[align], className].filter(Boolean).join(" ");

    return (
      <Box ref={ref} className={classes}>
        {leading}
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Span className={styles.separator}>◆</Span>}
            <Box className={styles.item}>
              <Span className={styles.label}>{item.label}</Span>
              <Span style={{ color: item.color || "var(--text)", fontFeatureSettings: '"tnum"' }}>
                {item.values
                  ? item.values.map((v, vi) => (
                      <React.Fragment key={vi}>
                        {vi > 0 && <Span className={styles.valueSeparator}> · </Span>}
                        {v}
                      </React.Fragment>
                    ))
                  : item.value}
              </Span>
            </Box>
          </React.Fragment>
        ))}
        {trailing && <Box className={styles.trailing}>{trailing}</Box>}
      </Box>
    );
  }
);

StatusStrip.displayName = "StatusStrip";
