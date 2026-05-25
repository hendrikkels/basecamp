"use client";

import React from "react";
import { Button as PrimitiveButton } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "destructive" | "accent2";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends PrimitiveProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  outline: styles.outline,
  destructive: styles.destructive,
  accent2: styles.accent2,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", iconOnly = false, className, children, ...props },
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

    return (
      <PrimitiveButton ref={ref} className={classes} {...props}>
        {children}
      </PrimitiveButton>
    );
  }
);

Button.displayName = "Button";
