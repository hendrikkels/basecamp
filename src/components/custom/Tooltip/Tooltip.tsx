"use client";

import React from "react";
import styles from "./Tooltip.module.css";

export type TooltipPosition = "top" | "bottom";

export interface TooltipProps {
  content: string;
  position?: TooltipPosition;
  children: React.ReactNode;
  className?: string;
}

const positionClasses: Record<TooltipPosition, string> = {
  top: styles.top,
  bottom: styles.bottom,
};

export function Tooltip({ content, position = "top", children, className }: TooltipProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ");
  const tipClasses = [styles.tip, positionClasses[position]].join(" ");

  return (
    <span className={classes}>
      {children}
      <span className={tipClasses} role="tooltip">{content}</span>
    </span>
  );
}

Tooltip.displayName = "Tooltip";
