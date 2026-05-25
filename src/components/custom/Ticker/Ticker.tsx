"use client";

import React from "react";
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
      <div ref={ref} className={classes}>
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className={styles.separator}>◆</span>}
            <span className={styles.item}>
              <span className={styles.label}>{item.label}</span>
              <span style={{ color: item.color || "var(--text)", fontWeight: 500, fontFeatureSettings: '"tnum"' }}>
                {item.value}
              </span>
            </span>
          </React.Fragment>
        ))}
      </div>
    );
  }
);

Ticker.displayName = "Ticker";
