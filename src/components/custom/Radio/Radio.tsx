"use client";

import React from "react";
import { Box, Span } from "@/components/primitives";
import styles from "./Radio.module.css";

export interface RadioProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
  function Radio({ checked = false, onChange, disabled = false, children, className }, ref) {
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
      <Box ref={ref} className={classes}>
        <Span
          className={styles.dot}
          onClick={handleClick}
          role="radio"
          aria-checked={checked}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); handleClick(); } }}
        >
          {checked && <Span className={styles.inner} />}
        </Span>
        {children}
      </Box>
    );
  }
);

Radio.displayName = "Radio";
