"use client";

import React from "react";
import { Box } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import styles from "./Stack.module.css";

export type StackDirection = "vertical" | "horizontal";
export type StackGap = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type StackAlign = "start" | "center" | "end" | "stretch";

export interface StackProps extends PrimitiveProps<"div"> {
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  wrap?: boolean;
}

const directionClasses: Record<StackDirection, string> = {
  vertical: styles.vertical,
  horizontal: styles.horizontal,
};

const gapClasses: Record<StackGap, string> = {
  "1": styles.gap1,
  "2": styles.gap2,
  "3": styles.gap3,
  "4": styles.gap4,
  "5": styles.gap5,
  "6": styles.gap6,
  "7": styles.gap7,
  "8": styles.gap8,
  "9": styles.gap9,
};

const alignClasses: Record<StackAlign, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch,
};

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  function Stack(
    { direction = "vertical", gap = "3", align, wrap = false, className, children, ...props },
    ref
  ) {
    const classes = [
      styles.base,
      directionClasses[direction],
      gapClasses[gap],
      align ? alignClasses[align] : undefined,
      wrap ? styles.wrap : undefined,
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

Stack.displayName = "Stack";
