"use client";

import React from "react";
import { Text as PrimitiveText } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import styles from "./Text.module.css";

export type TextSize = "body-lg" | "body" | "body-sm" | "micro" | "nano";
export type TextWeight = "light" | "regular" | "medium" | "semibold" | "bold";
export type TextColor = "default" | "muted" | "dim" | "faint" | "primary" | "secondary" | "danger" | "warn" | "info" | "success";
export type TextAlign = "left" | "center" | "right";
export type TextTransform = "none" | "uppercase";

export interface TextProps extends Omit<PrimitiveProps<"p">, "color"> {
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  transform?: TextTransform;
}

const sizeClasses: Record<TextSize, string> = {
  "body-lg": styles.bodyLg,
  "body": styles.body,
  "body-sm": styles.bodySm,
  "micro": styles.micro,
  "nano": styles.nano,
};

const colorClasses: Record<TextColor, string> = {
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

const weightClasses: Record<TextWeight, string> = {
  light: styles.weightLight,
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  semibold: styles.weightSemibold,
  bold: styles.weightBold,
};

const alignClasses: Record<TextAlign, string> = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
};

const transformClasses: Record<TextTransform, string> = {
  none: styles.transformNone,
  uppercase: styles.transformUppercase,
};

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  function Text(
    { size = "body", weight, color = "default", align, transform, className, ...props },
    ref
  ) {
    const classes = [
      styles.base,
      sizeClasses[size],
      colorClasses[color],
      weight ? weightClasses[weight] : undefined,
      align ? alignClasses[align] : undefined,
      transform ? transformClasses[transform] : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <PrimitiveText ref={ref} className={classes} {...props} />;
  }
);

Text.displayName = "Text";
