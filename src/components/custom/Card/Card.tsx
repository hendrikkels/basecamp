"use client";

import React from "react";
import { Box } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import { Heading } from "@/components/custom/Heading";
import { Text } from "@/components/custom/Text";
import type { HeadingVariant } from "@/components/custom/Heading";
import type { TextSize } from "@/components/custom/Text";
import styles from "./Card.module.css";

export type CardVariant = "default" | "frost" | "block";
export type CardPadding = "none" | "sm" | "md" | "lg";
export type CardTitleVariant = "display-xl" | "display-l" | "display-m" | "display-s" | "heading" | "subheading" | "body-lg" | "body" | "micro";

export interface CardProps extends PrimitiveProps<"div"> {
  variant?: CardVariant;
  padding?: CardPadding;
  title?: string;
  titleVariant?: CardTitleVariant;
  uppercase?: boolean;
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

const headingVariants = new Set<string>(["display-xl", "display-l", "display-m", "display-s", "heading", "subheading"]);

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card({ variant = "default", padding = "md", title, titleVariant = "heading", uppercase, className, children, ...props }, ref) {
    const isUppercase = uppercase ?? !headingVariants.has(titleVariant);
    const classes = [
      styles.base,
      variantClasses[variant],
      paddingClasses[padding],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const titleClasses = [styles.title, isUppercase && styles.uppercase].filter(Boolean).join(" ");

    return (
      <Box ref={ref} className={classes} {...props}>
        {title && (
          headingVariants.has(titleVariant)
            ? <Heading variant={titleVariant as HeadingVariant} level={3} className={titleClasses}>{title}</Heading>
            : <Text size={titleVariant as TextSize} color="dim" className={titleClasses}>{title}</Text>
        )}
        {children}
      </Box>
    );
  }
);

Card.displayName = "Card";
