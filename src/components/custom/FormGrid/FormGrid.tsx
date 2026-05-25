"use client";

import React from "react";
import styles from "./FormGrid.module.css";

/* ----- FormGrid (root) ----- */
export interface FormGridProps {
  children: React.ReactNode;
  className?: string;
}

function FormGridRoot({ children, className }: FormGridProps) {
  const classes = [styles.grid, className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
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
      <div className={styles.sectionLabel}>
        {number && <span className={styles.sectionNumber}>{number}</span>}
        {title}
        {description && <span className={styles.sectionDescription}>{description}</span>}
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </>
  );
}
FormGridSection.displayName = "FormGrid.Section";

/* ----- Compose ----- */
export const FormGrid = Object.assign(FormGridRoot, {
  Section: FormGridSection,
});
