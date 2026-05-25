"use client";

import React from "react";
import { Box } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import styles from "./Container.module.css";

export type ContainerSize = "narrow" | "default" | "full";

export interface ContainerProps extends PrimitiveProps<"div"> {
  size?: ContainerSize;
}

const sizeClasses: Record<ContainerSize, string> = {
  narrow: styles.narrow,
  default: styles.default,
  full: styles.full,
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ size = "default", className, children, ...props }, ref) {
    const classes = [styles.base, sizeClasses[size], className]
      .filter(Boolean)
      .join(" ");

    return (
      <Box ref={ref} className={classes} {...props}>
        {children}
      </Box>
    );
  }
);

Container.displayName = "Container";
