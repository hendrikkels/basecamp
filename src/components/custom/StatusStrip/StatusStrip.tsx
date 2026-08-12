"use client";

import React from "react";
import { Box, Span } from "@/components/primitives";
import styles from "./StatusStrip.module.css";

export interface StatusStripItem {
  label: string;
  value?: string;
  values?: string[];
  color?: string;
}

export interface StatusStripProps {
  items: StatusStripItem[];
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
}

export const StatusStrip = React.forwardRef<HTMLDivElement, StatusStripProps>(
  function StatusStrip({ items, leading, trailing, className }, ref) {
    const classes = [styles.strip, className].filter(Boolean).join(" ");

    return (
      <Box ref={ref} className={classes}>
        {leading}
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Box className={styles.separator} />}
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
        {trailing && <Box style={{ marginLeft: "auto" }}>{trailing}</Box>}
      </Box>
    );
  }
);

StatusStrip.displayName = "StatusStrip";
