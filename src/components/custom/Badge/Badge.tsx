"use client";

import React from "react";
import styles from "./Badge.module.css";

export type BadgeColor =
  | "default"
  | "primary"
  | "primary-soft"
  | "secondary"
  | "secondary-soft"
  | "danger"
  | "danger-soft"
  | "warn"
  | "info"
  | "success"
  | "outline";

export interface BadgeProps extends React.ComponentPropsWithRef<"span"> {
  color?: BadgeColor;
  dot?: boolean;
}

const colorClasses: Record<BadgeColor, string> = {
  default: styles.default,
  primary: styles.primary,
  "primary-soft": styles.primarySoft,
  secondary: styles.secondary,
  "secondary-soft": styles.secondarySoft,
  danger: styles.danger,
  "danger-soft": styles.dangerSoft,
  warn: styles.warn,
  info: styles.info,
  success: styles.success,
  outline: styles.outline,
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge({ color = "default", dot = false, className, children, ...props }, ref) {
    const classes = [styles.base, colorClasses[color], className]
      .filter(Boolean)
      .join(" ");

    return (
      <span ref={ref} className={classes} {...props}>
        {dot && <span className={styles.dot} />}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
