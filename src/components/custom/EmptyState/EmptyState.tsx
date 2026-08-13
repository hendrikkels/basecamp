"use client";

import React from "react";
import { Box, H3 } from "@/components/primitives";
import styles from "./EmptyState.module.css";
import { Text } from "@/components/custom";

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
        <Text size="body-lg">{title}</Text>
        {description && <Box className={styles.description}>{description}</Box>}
        {children && <Box className={styles.actions}>{children}</Box>}
      </Box>
    );
  }
);

EmptyState.displayName = "EmptyState";
