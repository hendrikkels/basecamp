"use client";

import React from "react";
import { Button as PrimitiveButton } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import { Icon } from "@/components/custom/Icon";
import type { IconName } from "@/components/custom/Icon";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "outline" | "destructive" | "accent1" | "accent2" | "success" | "warn";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends PrimitiveProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary,
  ghost: styles.ghost,
  outline: styles.outline,
  destructive: styles.destructive,
  accent1: styles.accent1,
  accent2: styles.accent2,
  success: styles.success,
  warn: styles.warn,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

const iconSizeMap: Record<ButtonSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", iconOnly = false, iconLeft, iconRight, className, children, ...props },
    ref
  ) {
    const classes = [
      styles.base,
      variantClasses[variant],
      sizeClasses[size],
      iconOnly ? styles.iconOnly : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const iconSize = iconSizeMap[size];

    return (
      <PrimitiveButton ref={ref} className={classes} {...props}>
        {iconLeft && <Icon name={iconLeft} size={iconSize} className={styles.iconInherit} />}
        {children}
        {iconRight && <Icon name={iconRight} size={iconSize} className={styles.iconInherit} />}
      </PrimitiveButton>
    );
  }
);

Button.displayName = "Button";
