"use client";

import React from "react";
import styles from "./StatusStrip.module.css";

export interface StatusStripItem {
  label: string;
  value: string;
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
      <div ref={ref} className={classes}>
        {leading}
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className={styles.separator} />}
            <div className={styles.item}>
              <span className={styles.label}>{item.label}</span>
              <span style={{ color: item.color || "var(--text)", fontFeatureSettings: '"tnum"' }}>
                {item.value}
              </span>
            </div>
          </React.Fragment>
        ))}
        {trailing && <div style={{ marginLeft: "auto" }}>{trailing}</div>}
      </div>
    );
  }
);

StatusStrip.displayName = "StatusStrip";
