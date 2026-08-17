"use client";

import React from "react";
import { Box } from "@/components/primitives";
import { Text } from "@/components/custom/Text";
import type { TextColor } from "@/components/custom/Text";
import { Icon } from "@/components/custom/Icon";
import styles from "./StatusStrip.module.css";

/* ----- StatusStrip (root) ----- */
export type StatusStripAlign = "left" | "center" | "right" | "between" | "evenly";

export interface StatusStripProps {
  align?: StatusStripAlign;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const alignClasses: Record<StatusStripAlign, string> = {
  left: styles.left,
  center: styles.center,
  right: styles.right,
  between: styles.between,
  evenly: styles.evenly,
};

function StatusStripRoot({ align = "left", leading, trailing, children, className }: StatusStripProps) {
  const classes = [styles.strip, alignClasses[align], className].filter(Boolean).join(" ");
  const items = React.Children.toArray(children);

  return (
    <Box className={classes}>
      {leading}
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon name="separator" size="sm" className={styles.separator} />}
          {child}
        </React.Fragment>
      ))}
      {trailing && <Box className={styles.trailing}>{trailing}</Box>}
    </Box>
  );
}

StatusStripRoot.displayName = "StatusStrip";

/* ----- StatusStrip.Item ----- */
export interface StatusStripItemProps {
  label: string;
  color?: TextColor;
  children: React.ReactNode;
  className?: string;
}

function StatusStripItem({ label, color = "default", children, className }: StatusStripItemProps) {
  const classes = [styles.item, className].filter(Boolean).join(" ");

  return (
    <Box className={classes}>
      <Text size="micro" color="dim" className={styles.label}>{label}</Text>
      <Text size="micro" color={color}>{children}</Text>
    </Box>
  );
}

StatusStripItem.displayName = "StatusStrip.Item";

/* ----- Compose ----- */
export const StatusStrip = Object.assign(StatusStripRoot, {
  Item: StatusStripItem,
});
