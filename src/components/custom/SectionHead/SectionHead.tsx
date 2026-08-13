"use client";

import React from "react";
import { Box } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import { Heading } from "@/components/custom/Heading";
import { Text } from "@/components/custom/Text";
import type { HeadingVariant } from "@/components/custom/Heading";
import type { TextSize } from "@/components/custom/Text";
import styles from "./SectionHead.module.css";

export type SectionHeadVariant = HeadingVariant | TextSize;

export interface SectionHeadProps extends PrimitiveProps<"div"> {
  number?: string;
  numberVariant?: SectionHeadVariant;
  title: string;
  titleVariant?: SectionHeadVariant;
  accent?: string;
  accentVariant?: SectionHeadVariant;
  uppercase?: boolean;
}

const headingVariants = new Set<string>(["display-xl", "display-l", "display-m", "display-s", "heading", "subheading"]);

export const SectionHead = React.forwardRef<HTMLDivElement, SectionHeadProps>(
  function SectionHead({ number, numberVariant = "body-lg", title, titleVariant = "body-lg", accent, accentVariant = "body-lg", uppercase, className, ...props }, ref) {
    const isUppercase = uppercase ?? !headingVariants.has(titleVariant);
    const classes = [styles.base, isUppercase && styles.uppercase, className].filter(Boolean).join(" ");

    return (
      <Box ref={ref} className={classes} {...props}>
        {number && (
          headingVariants.has(numberVariant)
            ? <Heading variant={numberVariant as HeadingVariant} level={3} className={styles.number}>{number}</Heading>
            : <Text size={numberVariant as TextSize} className={styles.number} color="dim">{number}</Text>
        )}
        {headingVariants.has(titleVariant)
          ? <Heading variant={titleVariant as HeadingVariant} level={3} className={styles.title}>{title}</Heading>
          : <Text size={titleVariant as TextSize} className={styles.title} color="dim">{title}</Text>
        }
        {accent && (
          headingVariants.has(accentVariant)
            ? <Heading variant={accentVariant as HeadingVariant} level={3} className={styles.accent}>{accent}</Heading>
            : <Text size={accentVariant as TextSize} className={styles.accent} color="dim">{accent}</Text>
        )}
      </Box>
    );
  }
);

SectionHead.displayName = "SectionHead";
