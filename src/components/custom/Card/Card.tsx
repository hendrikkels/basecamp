"use client";

import React from "react";
import { Box } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import styles from "./Card.module.css";

export type CardVariant = "default" | "frost" | "block";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends PrimitiveProps<"div"> {
  variant?: CardVariant;
  padding?: CardPadding;
}

const variantClasses: Record<CardVariant, string> = {
  default: styles.default,
  frost: styles.frost,
  block: styles.block,
};

const paddingClasses: Record<CardPadding, string> = {
  none: styles.padNone,
  sm: styles.padSm,
  md: styles.padMd,
  lg: styles.padLg,
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card({ variant = "default", padding = "md", className, children, ...props }, ref) {
    const classes = [
      styles.base,
      variantClasses[variant],
      paddingClasses[padding],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Box ref={ref} className={classes} {...props}>
        {children}
      </Box>
    );
  }
);

Card.displayName = "Card";
