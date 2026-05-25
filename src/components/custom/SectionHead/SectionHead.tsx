"use client";

import React from "react";
import styles from "./SectionHead.module.css";

export interface SectionHeadProps extends React.ComponentPropsWithRef<"div"> {
  number?: string;
  title: string;
  accent?: string;
}

export const SectionHead = React.forwardRef<HTMLDivElement, SectionHeadProps>(
  function SectionHead({ number, title, accent, className, ...props }, ref) {
    const classes = [styles.base, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {number && <span className={styles.number}>{number}</span>}
        <span className={styles.title}>{title}</span>
        {accent && <span className={styles.accent}>{accent}</span>}
      </div>
    );
  }
);

SectionHead.displayName = "SectionHead";
