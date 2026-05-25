"use client";

import React from "react";
import styles from "./Widget.module.css";

export type WidgetVariant = "default" | "frost";

export interface WidgetProps {
  variant?: WidgetVariant;
  label?: string;
  accent?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
  function Widget({ variant = "default", label, accent, children, className }, ref) {
    const classes = [
      styles.widget,
      variant === "frost" ? styles.frost : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes}>
        {(label || accent) && (
          <div className={styles.header}>
            {label && <span>{label}</span>}
            {accent && <span className={styles.headerAccent}>{accent}</span>}
          </div>
        )}
        {children}
      </div>
    );
  }
);

Widget.displayName = "Widget";
