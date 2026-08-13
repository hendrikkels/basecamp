"use client";

import React from "react";
import { Span } from "@/components/primitives";
import styles from "./Icon.module.css";

const ICONS = {
  // Arrows & navigation
  arrow: "▸",
  arrowLeft: "◂",
  arrowUp: "▴",
  arrowDown: "▾",
  arrowRight: "→",
  arrowTopRight: "↗",
  arrowBottomRight: "↘",
  arrowBack: "←",
  chevronDown: "▾",
  chevronRight: "›",
  chevronLeft: "‹",
  chevronUp: "ˆ",
  return: "⏎",
  refresh: "↺",
  swap: "⇄",

  // Actions
  plus: "+",
  minus: "−",
  close: "✕",
  check: "✓",
  edit: "✎",
  trash: "␡",
  search: "⌕",
  link: "↗",
  pin: "⌃",
  copy: "⧉",
  power: "⏻",
  eject: "⏏",
  download: "↓",
  upload: "↑",
  expand: "⊞",
  collapse: "⊟",
  filter: "⊳",
  sort: "⇅",

  // Shapes & indicators
  diamond: "◇",
  diamondFill: "◆",
  square: "□",
  squareFill: "■",
  squareCheck: "▣",
  circle: "○",
  circleFill: "●",
  circleTarget: "◎",
  triangle: "△",
  triangleFill: "▲",
  triangleDown: "▽",
  triangleDownFill: "▼",
  star: "★",
  starEmpty: "☆",
  dot: "●",
  ring: "○",
  block: "▰",
  blockEmpty: "▱",

  // Status & feedback
  warning: "⚠",
  info: "ℹ",
  prohibited: "⊘",
  null: "∅",
  success: "✓",
  error: "✕",
  bolt: "⚡",

  // Media
  play: "▶",
  pause: "⏸",
  stop: "■",
  record: "●",
  forward: "⏩",
  backward: "⏪",

  // UI / System
  gear: "⚙",
  command: "⌘",
  option: "⌥",
  shift: "⇧",
  backspace: "⌫",
  hash: "#",
  menu: "⋯",
  menuVertical: "⋮",
  grip: "⠿",
  clock: "⏱",
  separator: "◆",

  // Data & structure
  list: "≡",
  grid: "⊞",
  stack: "☰",
  inbox: "⌸",
  folder: "⊡",
  file: "⎔",
  database: "⌗",
  terminal: "⏵",
  code: "⟨⟩",
  branch: "⑂",

  // Communication
  mail: "✉",
  at: "@",
  broadcast: "◉",

  // Box drawing (decorative)
  cornerTL: "┌",
  cornerTR: "┐",
  cornerBL: "└",
  cornerBR: "┘",
  lineH: "─",
  lineV: "│",
  cross: "╳",
  teeRight: "├",
  teeLeft: "┤",
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
