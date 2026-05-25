"use client";

import React from "react";
import { Box, H3 } from "@/components/primitives";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
  glyph?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState({ glyph, title, description, children, className }, ref) {
    const classes = [styles.empty, className].filter(Boolean).join(" ");

    return (
      <Box ref={ref} className={classes}>
        {glyph && <Box className={styles.glyph}>{glyph}</Box>}
        <H3 className={styles.title}>{title}</H3>
        {description && <Box className={styles.description}>{description}</Box>}
        {children && <Box className={styles.actions}>{children}</Box>}
      </Box>
    );
  }
);

EmptyState.displayName = "EmptyState";
