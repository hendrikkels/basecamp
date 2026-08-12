"use client";

import React, { createContext, useContext } from "react";
import { Box, Span } from "@/components/primitives";
import styles from "./RadioGroup.module.css";

/* ----- Context ----- */
interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/* ----- RadioGroup (root) ----- */
export type RadioGroupDirection = "vertical" | "horizontal";
export type RadioGroupGap = "1" | "2" | "3" | "4" | "5" | "6";

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  name?: string;
  direction?: RadioGroupDirection;
  gap?: RadioGroupGap;
  children: React.ReactNode;
  className?: string;
}

const directionClasses: Record<RadioGroupDirection, string> = {
  vertical: styles.vertical,
  horizontal: styles.horizontal,
};

const gapClasses: Record<RadioGroupGap, string> = {
  "1": styles.gap1,
  "2": styles.gap2,
  "3": styles.gap3,
  "4": styles.gap4,
  "5": styles.gap5,
  "6": styles.gap6,
};

function RadioGroupRoot({
  value,
  onChange,
  disabled = false,
  name,
  direction = "vertical",
  gap = "3",
  children,
  className,
}: RadioGroupProps) {
  const classes = [styles.group, directionClasses[direction], gapClasses[gap], className]
    .filter(Boolean)
    .join(" ");

  return (
    <RadioGroupContext.Provider value={{ value, onChange, disabled, name }}>
      <Box className={classes} role="radiogroup">
        {children}
      </Box>
    </RadioGroupContext.Provider>
  );
}

RadioGroupRoot.displayName = "RadioGroup";

/* ----- RadioGroup.Item ----- */
export interface RadioGroupItemProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

function RadioGroupItem({ value, disabled: itemDisabled, children, className }: RadioGroupItemProps) {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error("RadioGroup.Item must be used within RadioGroup");

  const isDisabled = itemDisabled ?? ctx.disabled;
  const isChecked = ctx.value === value;

  const handleClick = () => {
    if (!isDisabled) ctx.onChange(value);
  };

  const classes = [
    styles.item,
    isChecked ? styles.checked : undefined,
    isDisabled ? styles.disabled : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Box className={classes}>
      <Span
        className={styles.dot}
        onClick={handleClick}
        role="radio"
        aria-checked={isChecked}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") { e.preventDefault(); handleClick(); }
        }}
      >
        {isChecked && <Span className={styles.inner} />}
      </Span>
      {children}
    </Box>
  );
}

RadioGroupItem.displayName = "RadioGroup.Item";

/* ----- Compose ----- */
export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});
