"use client";

import React from "react";
import { Span } from "@/components/primitives";
import styles from "./Icon.module.css";

const VS15 = "︎";

const ICONS = {
  // Arrows & navigation
  arrow: "▸",
  arrowLeft: "◂",
  arrowUp: "▴",
  arrowDown: "▾",
  arrowRight: `→${VS15}`,
  arrowTopRight: `↗${VS15}`,
  arrowBottomRight: `↘${VS15}`,
  arrowBack: `←${VS15}`,
  chevronDown: "▾",
  chevronRight: "›",
  chevronLeft: "‹",
  chevronUp: "ˆ",
  return: `⏎${VS15}`,
  refresh: "↺",
  swap: "⇄",

  // Actions
  plus: "+",
  minus: "−",
  close: "✕",
  check: `✓${VS15}`,
  edit: `✎${VS15}`,
  trash: "␡",
  search: "⌕",
  link: `↗${VS15}`,
  pin: "⌃",
  copy: "⧉",
  power: `⏻${VS15}`,
  eject: `⏏${VS15}`,
  download: `↓${VS15}`,
  upload: `↑${VS15}`,
  expand: "⊞",
  collapse: "⊟",
  filter: "⊳",
  sort: "⇅",

  // Shapes & indicators
  diamond: `◇${VS15}`,
  diamondFill: `◆${VS15}`,
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
  star: `★${VS15}`,
  starEmpty: `☆${VS15}`,
  dot: "●",
  ring: "○",
  block: "▰",
  blockEmpty: "▱",

  // Status & feedback
  warning: `⚠${VS15}`,
  info: `ℹ${VS15}`,
  prohibited: "⊘",
  null: "∅",
  success: `✓${VS15}`,
  error: "✕",
  bolt: `⚡${VS15}`,

  // Media
  play: `▶${VS15}`,
  pause: `⏸${VS15}`,
  stop: "■",
  record: "●",
  forward: `⏩${VS15}`,
  backward: `⏪${VS15}`,

  // UI / System
  gear: `⚙${VS15}`,
  command: "⌘",
  option: "⌥",
  shift: "⇧",
  backspace: "⌫",
  hash: "#",
  menu: "⋯",
  menuVertical: "⋮",
  grip: "⠿",
  clock: `⏱${VS15}`,
  separator: `◆${VS15}`,

  // Data & structure
  list: "≡",
  grid: "⊞",
  stack: `☰${VS15}`,
  inbox: "⌸",
  folder: "⊡",
  file: "⎔",
  database: "⌗",
  terminal: "⏵",
  code: "⟨⟩",
  branch: "⑂",

  // Communication
  mail: `✉${VS15}`,
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
export type IconSize = "sm" | "md" | "lg";
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
