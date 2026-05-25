"use client";

import React from "react";
import styles from "./Divider.module.css";

export type DividerVariant = "default" | "thick";
export type DividerSpacing = "sm" | "md" | "lg";

export interface DividerProps extends React.ComponentPropsWithRef<"hr"> {
  variant?: DividerVariant;
  spacing?: DividerSpacing;
}

const variantClasses: Record<DividerVariant, string> = {
  default: styles.default,
  thick: styles.thick,
};

const spacingClasses: Record<DividerSpacing, string> = {
  sm: styles.spacingSm,
  md: styles.spacingMd,
  lg: styles.spacingLg,
};

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  function Divider({ variant = "default", spacing = "md", className, ...props }, ref) {
    const classes = [styles.base, variantClasses[variant], spacingClasses[spacing], className]
      .filter(Boolean)
      .join(" ");

    return <hr ref={ref} className={classes} {...props} />;
  }
);

Divider.displayName = "Divider";
