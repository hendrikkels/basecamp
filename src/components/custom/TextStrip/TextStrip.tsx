"use client";

import React from "react";
import { Box, Span } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import styles from "./TextStrip.module.css";

export type TextStripSize = "body-lg" | "body" | "caption" | "micro";
export type TextStripColor = "default" | "muted" | "dim" | "faint" | "primary" | "secondary" | "danger" | "warn" | "info" | "success";

export interface TextStripProps extends PrimitiveProps<"div"> {
  items: string[];
  size?: TextStripSize;
  color?: TextStripColor;
  icon?: React.ReactNode;
}

const sizeClasses: Record<TextStripSize, string> = {
  "body-lg": styles.bodyLg,
  "body": styles.body,
  "caption": styles.caption,
  "micro": styles.micro,
};

const colorClasses: Record<TextStripColor, string> = {
  default: styles.colorDefault,
  muted: styles.colorMuted,
  dim: styles.colorDim,
  faint: styles.colorFaint,
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  danger: styles.colorDanger,
  warn: styles.colorWarn,
  info: styles.colorInfo,
  success: styles.colorSuccess,
};

export const TextStrip = React.forwardRef<HTMLDivElement, TextStripProps>(
  function TextStrip({ items, size = "micro", color = "dim", icon, className, ...props }, ref) {
    const classes = [
      styles.strip,
      sizeClasses[size],
      colorClasses[color],
      className,
    ].filter(Boolean).join(" ");

    return (
      <Box ref={ref} className={classes} {...props}>
        {items.map((item, i) => (
          <Span key={i} className={styles.item}>
            {i > 0 && (icon ?? <Span className={styles.separator}>·</Span>)}
            {item}
          </Span>
        ))}
      </Box>
    );
  }
);

TextStrip.displayName = "TextStrip";
