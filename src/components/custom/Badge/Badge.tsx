"use client";

import React from "react";
import { Span } from "@/components/primitives";
import { Text } from "@/components/custom/Text";
import { Icon } from "@/components/custom/Icon";
import styles from "./Badge.module.css";

export type BadgeColor =
  | "default"
  | "default-soft"
  | "primary"
  | "primary-soft"
  | "secondary"
  | "secondary-soft"
  | "danger"
  | "danger-soft"
  | "warn"
  | "warn-soft"
  | "info"
  | "info-soft"
  | "success"
  | "success-soft";

export interface BadgeProps {
  color?: BadgeColor;
  dot?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const colorClasses: Record<BadgeColor, string> = {
  default: styles.default,
  "default-soft": styles.defaultSoft,
  primary: styles.primary,
  "primary-soft": styles.primarySoft,
  secondary: styles.secondary,
  "secondary-soft": styles.secondarySoft,
  danger: styles.danger,
  "danger-soft": styles.dangerSoft,
  warn: styles.warn,
  "warn-soft": styles.warnSoft,
  info: styles.info,
  "info-soft": styles.infoSoft,
  success: styles.success,
  "success-soft": styles.successSoft,
};

export function Badge({ color = "default-soft", dot = false, className, children }: BadgeProps) {
  const classes = [styles.base, colorClasses[color], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Span className={classes}>
      {dot && <Icon name="dot" size="sm" className={styles.dot} />}
      <Text size="micro" _color="inherit">{children}</Text>
    </Span>
  );
}
