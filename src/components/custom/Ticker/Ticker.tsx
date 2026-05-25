"use client";

import React from "react";
import { Box, Span } from "@/components/primitives";
import styles from "./Ticker.module.css";

export interface TickerItem {
  label: string;
  value: string;
  color?: string;
}

export interface TickerProps {
  items: TickerItem[];
  className?: string;
}

export const Ticker = React.forwardRef<HTMLDivElement, TickerProps>(
  function Ticker({ items, className }, ref) {
    const classes = [styles.ticker, className].filter(Boolean).join(" ");

    return (
      <Box ref={ref} className={classes}>
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Span className={styles.separator}>◆</Span>}
            <Span className={styles.item}>
              <Span className={styles.label}>{item.label}</Span>
              <Span style={{ color: item.color || "var(--text)", fontWeight: 500, fontFeatureSettings: '"tnum"' }}>
                {item.value}
              </Span>
            </Span>
          </React.Fragment>
        ))}
      </Box>
    );
  }
);

Ticker.displayName = "Ticker";
