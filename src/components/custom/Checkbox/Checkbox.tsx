"use client";

import React from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  function Checkbox({ checked = false, onChange, disabled = false, children, className }, ref) {
    const classes = [
      styles.wrapper,
      checked ? styles.checked : undefined,
      disabled ? styles.disabled : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleClick = () => {
      if (!disabled && onChange) onChange(!checked);
    };

    return (
      <div
        ref={ref}
        className={classes}
        onClick={handleClick}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); handleClick(); } }}
      >
        <span className={styles.box}>
          {checked && <span className={styles.checkmark}>✓</span>}
        </span>
        {children}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
