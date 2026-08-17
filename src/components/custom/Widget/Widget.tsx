"use client";

import React from "react";
import { Box } from "@/components/primitives";
import { Text } from "@/components/custom/Text";
import styles from "./Widget.module.css";

export type WidgetVariant = "default" | "frost";

export interface WidgetProps {
  variant?: WidgetVariant;
  label?: string;
  accent?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
  function Widget({ variant = "default", label, accent, children, className }, ref) {
    const classes = [
      styles.widget,
      variant === "frost" ? styles.frost : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Box ref={ref} className={classes}>
        {(label || accent) && (
          <Box className={styles.header}>
            {label && <Text size="micro" color="dim" className={styles.label}>{label}</Text>}
            {accent && <Text size="micro" color="primary" className={styles.label}>{accent}</Text>}
          </Box>
        )}
        {children}
      </Box>
    );
  }
);

Widget.displayName = "Widget";
