"use client";

import React, { createContext, useContext, useCallback } from "react";
import { Box, Span } from "@/components/primitives";
import styles from "./CheckboxGroup.module.css";

/* ----- Context ----- */
interface CheckboxGroupContextValue {
  value: string[];
  onChange: (value: string[]) => void;
  disabled: boolean;
  name?: string;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

/* ----- CheckboxGroup (root) ----- */
export type CheckboxGroupDirection = "vertical" | "horizontal";
export type CheckboxGroupGap = "1" | "2" | "3" | "4" | "5" | "6";

export interface CheckboxGroupProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  name?: string;
  direction?: CheckboxGroupDirection;
  gap?: CheckboxGroupGap;
  children: React.ReactNode;
  className?: string;
}

const directionClasses: Record<CheckboxGroupDirection, string> = {
  vertical: styles.vertical,
  horizontal: styles.horizontal,
};

const gapClasses: Record<CheckboxGroupGap, string> = {
  "1": styles.gap1,
  "2": styles.gap2,
  "3": styles.gap3,
  "4": styles.gap4,
  "5": styles.gap5,
  "6": styles.gap6,
};

function CheckboxGroupRoot({
  value,
  onChange,
  disabled = false,
  name,
  direction = "vertical",
  gap = "3",
  children,
  className,
}: CheckboxGroupProps) {
  const classes = [styles.group, directionClasses[direction], gapClasses[gap], className]
    .filter(Boolean)
    .join(" ");

  return (
    <CheckboxGroupContext.Provider value={{ value, onChange, disabled, name }}>
      <Box className={classes} role="group">
        {children}
      </Box>
    </CheckboxGroupContext.Provider>
  );
}

CheckboxGroupRoot.displayName = "CheckboxGroup";

/* ----- CheckboxGroup.Item ----- */
export interface CheckboxGroupItemProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

function CheckboxGroupItem({ value, disabled: itemDisabled, children, className }: CheckboxGroupItemProps) {
  const ctx = useContext(CheckboxGroupContext);
  if (!ctx) throw new Error("CheckboxGroup.Item must be used within CheckboxGroup");

  const isDisabled = itemDisabled ?? ctx.disabled;
  const isChecked = ctx.value.includes(value);

  const handleClick = useCallback(() => {
    if (isDisabled) return;
    const next = isChecked
      ? ctx.value.filter((v) => v !== value)
      : [...ctx.value, value];
    ctx.onChange(next);
  }, [isDisabled, isChecked, ctx, value]);

  const classes = [
    styles.item,
    isChecked ? styles.checked : undefined,
    isDisabled ? styles.disabled : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Box
      className={classes}
      onClick={handleClick}
      role="checkbox"
      aria-checked={isChecked}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") { e.preventDefault(); handleClick(); }
      }}
    >
      <Span className={styles.box}>
        {isChecked && <Span className={styles.checkmark}>✓</Span>}
      </Span>
      {children}
    </Box>
  );
}

CheckboxGroupItem.displayName = "CheckboxGroup.Item";

/* ----- Compose ----- */
export const CheckboxGroup = Object.assign(CheckboxGroupRoot, {
  Item: CheckboxGroupItem,
});
