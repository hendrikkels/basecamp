"use client";

import React from "react";
import { Box, Span, Button } from "@/components/primitives";
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
      <Box ref={ref} className={classes} role="alert">
        <Span className={styles.icon}>{displayIcon}</Span>
        <Box className={styles.body}>
          {title && <Box className={styles.title}>{title}</Box>}
          <Box className={styles.message}>{children}</Box>
        </Box>
        {dismissible && (
          <Button className={styles.dismiss} onClick={onDismiss} type="button" aria-label="Dismiss">
            ✕
          </Button>
        )}
      </Box>
    );
  }
);

Alert.displayName = "Alert";
