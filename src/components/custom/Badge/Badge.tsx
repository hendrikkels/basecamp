"use client";

import React from "react";
import { Span } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
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

export interface BadgeProps extends PrimitiveProps<"span"> {
  color?: BadgeColor;
  dot?: boolean;
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

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge({ color = "default-soft", dot = false, className, children, ...props }, ref) {
    const classes = [styles.base, colorClasses[color], className]
      .filter(Boolean)
      .join(" ");

    return (
      <Span ref={ref} className={classes} {...props}>
        {dot && <Span className={styles.dot} />}
        {children}
      </Span>
    );
  }
);

Badge.displayName = "Badge";
