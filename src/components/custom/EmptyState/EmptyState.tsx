"use client";

import React from "react";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
  glyph?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState({ glyph, title, description, children, className }, ref) {
    const classes = [styles.empty, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes}>
        {glyph && <div className={styles.glyph}>{glyph}</div>}
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {children && <div className={styles.actions}>{children}</div>}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";
