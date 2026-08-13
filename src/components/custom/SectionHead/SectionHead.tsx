"use client";

import React from "react";
import { Box } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import { Text } from "@/components/custom/Text";
import type { TextSize } from "@/components/custom/Text";
import styles from "./SectionHead.module.css";

export interface SectionHeadProps extends PrimitiveProps<"div"> {
  number?: string;
  title: string;
  accent?: string;
  size?: TextSize;
  uppercase?: boolean;
}

export const SectionHead = React.forwardRef<HTMLDivElement, SectionHeadProps>(
  function SectionHead({ number, title, accent, size = "body-lg", uppercase = false, className, ...props }, ref) {
    const classes = [styles.base, uppercase && styles.uppercase, className].filter(Boolean).join(" ");

    return (
      <Box ref={ref} className={classes} {...props}>
        {number && <Text size={size} className={styles.number}>{number}</Text>}
        <Text size={size} className={styles.title} color="dim">{title}</Text>
        {accent && <Text size={size} className={styles.accent}>{accent}</Text>}
      </Box>
    );
  }
);

SectionHead.displayName = "SectionHead";
