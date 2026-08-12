"use client";

import React from "react";
import { Box, Span, H3 } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import styles from "./SectionHead.module.css";

export interface SectionHeadProps extends PrimitiveProps<"div"> {
  number?: string;
  title: string;
  accent?: string;
}

export const SectionHead = React.forwardRef<HTMLDivElement, SectionHeadProps>(
  function SectionHead({ number, title, accent, className, ...props }, ref) {
    const classes = [styles.base, className].filter(Boolean).join(" ");

    return (
      <Box ref={ref} className={classes} {...props}>
        {number && <Span className={styles.number}>{number}</Span>}
        <H3 className={styles.title} _fontWeight={600}>{title}</H3>
        {accent && <Span className={styles.accent}>{accent}</Span>}
      </Box>
    );
  }
);

SectionHead.displayName = "SectionHead";
