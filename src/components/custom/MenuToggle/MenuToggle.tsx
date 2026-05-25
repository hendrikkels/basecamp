"use client";

import React from "react";
import { Button } from "@/components/primitives";
import styles from "./MenuToggle.module.css";

export interface MenuToggleProps {
  variant?: "default" | "fab";
  open?: boolean;
  onClick: () => void;
  "aria-label"?: string;
}

export const MenuToggle = React.forwardRef<HTMLButtonElement, MenuToggleProps>(
  function MenuToggle({ variant = "default", open = false, onClick, "aria-label": ariaLabel }, ref) {
    const classes = [styles.base, styles[variant]].join(" ");
    return (
      <Button
        ref={ref}
        className={classes}
        onClick={onClick}
        type="button"
        aria-label={ariaLabel ?? "Toggle menu"}
      >
        {open ? "✕" : "☰"}
        {variant === "fab" && <>{open ? " Close" : " Menu"}</>}
      </Button>
    );
  }
);

MenuToggle.displayName = "MenuToggle";
