"use client";

import React from "react";
import styles from "./Alert.module.css";

export type AlertSeverity = "default" | "info" | "warn" | "danger" | "success";

export interface AlertProps {
  severity?: AlertSeverity;
  title?: string;
  icon?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
  className?: string;
}

const defaultIcons: Record<AlertSeverity, string> = {
  default: "◆",
  info: "ℹ",
  warn: "⚠",
  danger: "✕",
  success: "✓",
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(
    { severity = "default", title, icon, dismissible = false, onDismiss, children, className },
    ref
  ) {
    const classes = [styles.base, styles[severity], className]
      .filter(Boolean)
      .join(" ");

    const displayIcon = icon ?? defaultIcons[severity];

    return (
      <div ref={ref} className={classes} role="alert">
        <span className={styles.icon}>{displayIcon}</span>
        <div className={styles.body}>
          {title && <p className={styles.title}>{title}</p>}
          <p className={styles.message}>{children}</p>
        </div>
        {dismissible && (
          <button className={styles.dismiss} onClick={onDismiss} type="button" aria-label="Dismiss">
            ✕
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";
