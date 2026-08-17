"use client";

import React from "react";
import { Box } from "@/components/primitives";
import { Text } from "@/components/custom/Text";
import type { TextColor, TextSize } from "@/components/custom/Text";
import styles from "./TextStrip.module.css";

/* ----- Context ----- */
interface TextStripContext {
  size: TextSize;
  color: TextColor;
}

const Ctx = React.createContext<TextStripContext>({ size: "micro", color: "dim" });

/* ----- TextStrip (root) ----- */
export interface TextStripProps {
  size?: TextSize;
  color?: TextColor;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function TextStripRoot({ size = "micro", color = "dim", icon, children, className, ...props }: TextStripProps & Record<string, unknown>) {
  const classes = [styles.strip, className].filter(Boolean).join(" ");
  const items = React.Children.toArray(children);

  return (
    <Ctx value={{ size, color }}>
      <Box className={classes} {...props}>
        {items.map((child, i) => (
          <React.Fragment key={i}>
            {i > 0 && (icon ?? <Text size={size} color="dim" className={styles.separator}>·</Text>)}
            {child}
          </React.Fragment>
        ))}
      </Box>
    </Ctx>
  );
}

TextStripRoot.displayName = "TextStrip";

/* ----- TextStrip.Item ----- */
export interface TextStripItemProps {
  color?: TextColor;
  children: React.ReactNode;
  className?: string;
}

function TextStripItem({ color, children, className }: TextStripItemProps) {
  const ctx = React.useContext(Ctx);
  return (
    <Text size={ctx.size} color={color ?? ctx.color} className={className}>{children}</Text>
  );
}

TextStripItem.displayName = "TextStrip.Item";

/* ----- Compose ----- */
export const TextStrip = Object.assign(TextStripRoot, {
  Item: TextStripItem,
});
