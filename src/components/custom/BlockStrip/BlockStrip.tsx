"use client";

import React from "react";
import { Box, Span } from "@/components/primitives";
import styles from "./BlockStrip.module.css";

export interface BlockStripProps {
  filled?: number;
  total?: number;
  className?: string;
}

export const BlockStrip = React.forwardRef<HTMLDivElement, BlockStripProps>(
  function BlockStrip({ filled = 5, total = 10, className }, ref) {
    const classes = [styles.strip, className].filter(Boolean).join(" ");
    const blocks = Array.from({ length: total }, (_, i) => i < filled);

    return (
      <Box ref={ref} className={classes}>
        {blocks.map((isFilled, i) => (
          <Span key={i} className={isFilled ? undefined : styles.empty}>
            █
          </Span>
        ))}
      </Box>
    );
  }
);

BlockStrip.displayName = "BlockStrip";
