"use client";

import React from "react";
import { Box, Span } from "@/components/primitives";
import styles from "./FormGrid.module.css";

/* ----- FormGrid (root) ----- */
export interface FormGridProps {
  children: React.ReactNode;
  className?: string;
}

function FormGridRoot({ children, className }: FormGridProps) {
  const classes = [styles.grid, className].filter(Boolean).join(" ");
  return <Box className={classes}>{children}</Box>;
}
FormGridRoot.displayName = "FormGrid";

/* ----- FormGrid.Section ----- */
export interface FormGridSectionProps {
  number?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

function FormGridSection({ number, title, description, children }: FormGridSectionProps) {
  return (
    <>
      <Box className={styles.sectionLabel}>
        {number && <Span className={styles.sectionNumber}>{number}</Span>}
        {title}
        {description && <Span className={styles.sectionDescription}>{description}</Span>}
      </Box>
      <Box className={styles.sectionBody}>{children}</Box>
    </>
  );
}
FormGridSection.displayName = "FormGrid.Section";

/* ----- Compose ----- */
export const FormGrid = Object.assign(FormGridRoot, {
  Section: FormGridSection,
});
