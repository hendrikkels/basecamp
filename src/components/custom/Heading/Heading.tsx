"use client";

import React from "react";
import { H1, H2, H3, H4, H5, H6 } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import styles from "./Heading.module.css";

export type HeadingVariant =
  | "display-xl"
  | "display-l"
  | "display-m"
  | "display-s"
  | "heading"
  | "subheading";

export type HeadingColor =
  | "default"
  | "primary"
  | "secondary"
  | "danger"
  | "warn"
  | "info"
  | "success"
  | "muted";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends PrimitiveProps<"h1"> {
  variant?: HeadingVariant;
  color?: HeadingColor;
  level?: HeadingLevel;
}

const variantClasses: Record<HeadingVariant, string> = {
  "display-xl": styles.displayXl,
  "display-l": styles.displayL,
  "display-m": styles.displayM,
  "display-s": styles.displayS,
  "heading": styles.heading,
  "subheading": styles.subheading,
};

const colorClasses: Record<HeadingColor, string> = {
  "default": styles.colorDefault,
  "primary": styles.colorPrimary,
  "secondary": styles.colorSecondary,
  "danger": styles.colorDanger,
  "warn": styles.colorWarn,
  "info": styles.colorInfo,
  "success": styles.colorSuccess,
  "muted": styles.colorMuted,
};

const primitiveMap = { 1: H1, 2: H2, 3: H3, 4: H4, 5: H5, 6: H6 } as const;

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ variant = "heading", color, level = 2, className, ...props }, ref) {
    const Component = primitiveMap[level];
    const classes = [
      styles.base,
      variantClasses[variant],
      color ? colorClasses[color] : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <Component ref={ref} className={classes} {...props} />;
  }
);

Heading.displayName = "Heading";
