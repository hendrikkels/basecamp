"use client";

import React from "react";
import { Box } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import styles from "./Row.module.css";

export type RowColumns = 2 | 3 | 4 | 5 | 6;
export type RowGap = "1" | "2" | "3" | "4" | "5" | "6";

export interface RowProps extends PrimitiveProps<"div"> {
  columns?: RowColumns;
  gap?: RowGap;
}

const columnClasses: Record<RowColumns, string> = {
  2: styles.col2,
  3: styles.col3,
  4: styles.col4,
  5: styles.col5,
  6: styles.col6,
};

const gapClasses: Record<RowGap, string> = {
  "1": styles.gap1,
  "2": styles.gap2,
  "3": styles.gap3,
  "4": styles.gap4,
  "5": styles.gap5,
  "6": styles.gap6,
};

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  function Row({ columns = 3, gap = "4", className, children, ...props }, ref) {
    const classes = [
      styles.base,
      columnClasses[columns],
      gapClasses[gap],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Box ref={ref} className={classes} {...props}>
        {children}
      </Box>
    );
  }
);

Row.displayName = "Row";
