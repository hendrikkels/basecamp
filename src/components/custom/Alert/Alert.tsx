"use client";

import React from "react";
import { Box, Button } from "@/components/primitives";
import styles from "./Alert.module.css";
import { Icon } from "../Icon";
import { Text } from "../Text";

export type AlertSeverity = "default" | "info" | "warn" | "danger" | "success";

export interface AlertProps {
  severity?: AlertSeverity;
  title?: string;
  icon?: IconName;
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
  className?: string;
}

import type { IconName, IconColor } from "../Icon";

const defaultIcons: Record<AlertSeverity, IconName> = {
  default: "diamondFill",
  info: "info",
  warn: "warning",
  danger: "error",
  success: "success",
};

const severityColors: Record<AlertSeverity, IconColor> = {
  default: "default",
  info: "info",
  warn: "warn",
  danger: "danger",
  success: "success",
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
        <Icon name={displayIcon} color={severityColors[severity]} className={styles.icon} />
        <Box className={styles.body}>
          {title && <Text size="body" weight="semibold" className={styles.title}>{title}</Text>}
          <Text size="body" color="muted">{children}</Text>
        </Box>
        {dismissible && (
          <Button className={styles.dismiss} onClick={onDismiss} type="button" aria-label="Dismiss">
            <Icon name="close" size="md" />
          </Button>
        )}
      </Box>
    );
  }
);

Alert.displayName = "Alert";
