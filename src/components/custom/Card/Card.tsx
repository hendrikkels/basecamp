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
export type CardTitleVariant = "display-xl" | "display-l" | "display-m" | "display-s" | "heading" | "subheading" | "body-lg" | "body" | "caption" | "micro";

export interface CardProps extends PrimitiveProps<"div"> {
  variant?: CardVariant;
  padding?: CardPadding;
  title?: string;
  titleVariant?: CardTitleVariant;
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

function CardTitle({ variant, title }: { variant: CardTitleVariant; title: string }) {
  if (headingVariants.has(variant)) {
    return (
      <Heading variant={variant as HeadingVariant} level={3} className={styles.title}>
        {title}
      </Heading>
    );
  }
  return (
    <Text size={variant as TextSize} className={styles.title}>
      {title}
    </Text>
  );
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card({ variant = "default", padding = "md", title, titleVariant = "heading", className, children, ...props }, ref) {
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
        {title && <CardTitle variant={titleVariant} title={title} />}
        {children}
      </Box>
    );
  }
);

Card.displayName = "Card";
