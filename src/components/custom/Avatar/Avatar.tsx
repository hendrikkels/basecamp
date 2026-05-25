"use client";

import React from "react";
import styles from "./Avatar.module.css";

export type AvatarSize = "sm" | "md" | "lg" | "xl";
export type AvatarColor = "default" | "primary" | "secondary";

export interface AvatarProps {
  size?: AvatarSize;
  color?: AvatarColor;
  round?: boolean;
  presence?: boolean;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
};

const colorClasses: Record<AvatarColor, string> = {
  default: styles.colorDefault,
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar({ size = "md", color = "default", round = false, presence = false, children, className }, ref) {
    const classes = [
      styles.base,
      sizeClasses[size],
      colorClasses[color],
      round ? styles.round : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes}>
        {children}
        {presence && <span className={styles.presence} />}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
