"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  function ThemeToggle({ className }, ref) {
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    useEffect(() => {
      const stored = document.documentElement.dataset.theme as "dark" | "light" | undefined;
      setTheme(stored === "light" ? "light" : "dark");
    }, []);

    const toggle = useCallback(() => {
      const next = theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
      setTheme(next);
    }, [theme]);

    const classes = [styles.toggle, className].filter(Boolean).join(" ");

    return (
      <button ref={ref} className={classes} onClick={toggle} type="button" aria-label="Toggle theme">
        <span className={styles.indicator} />
        {theme === "dark" ? "Dark" : "Light"}
      </button>
    );
  }
);

ThemeToggle.displayName = "ThemeToggle";
