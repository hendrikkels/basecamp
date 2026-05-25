"use client";

import React from "react";
import { Span } from "@/components/primitives";
import styles from "./Icon.module.css";

const ICONS = {
  arrow: "▸",
  diamond: "◇",
  diamondFill: "◆",
  square: "▣",
  star: "★",
  gear: "⚙",
  link: "↗",
  hash: "#",
  clock: "⏱",
  trash: "🗑",
  plus: "+",
  close: "✕",
  check: "✓",
  chevronDown: "▾",
  chevronRight: "›",
  block: "▰",
  blockEmpty: "▱",
  dot: "●",
  circle: "○",
  circleFill: "◎",
  triangle: "△",
  warning: "⚠",
  info: "ℹ",
  play: "▶",
  pause: "⏸",
  search: "⌕",
  command: "⌘",
  pin: "📌",
  edit: "✎",
  menu: "⋯",
  grip: "⠿",
  separator: "◆",
} as const;

export type IconName = keyof typeof ICONS;
export type IconSize = "sm" | "md" | "lg" | "xl";
export type IconColor = "default" | "text" | "primary" | "secondary" | "muted" | "danger" | "success" | "warn" | "info";

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  className?: string;
}

const sizeClasses: Record<IconSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
};

const colorClasses: Record<IconColor, string> = {
  default: styles.colorDefault,
  text: styles.colorText,
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  muted: styles.colorMuted,
  danger: styles.colorDanger,
  success: styles.colorSuccess,
  warn: styles.colorWarn,
  info: styles.colorInfo,
};

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  function Icon({ name, size = "md", color = "default", className }, ref) {
    const classes = [styles.icon, sizeClasses[size], colorClasses[color], className]
      .filter(Boolean)
      .join(" ");

    return (
      <Span ref={ref} className={classes} aria-hidden="true">
        {ICONS[name]}
      </Span>
    );
  }
);

Icon.displayName = "Icon";

export const ICON_NAMES = ICONS;
