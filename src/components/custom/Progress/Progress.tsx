"use client";

import React from "react";
import styles from "./Progress.module.css";

/* ----- Progress Bar ----- */
export interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  function Progress({ value, className }, ref) {
    const clamped = Math.max(0, Math.min(100, value));
    const classes = [styles.track, className].filter(Boolean).join(" ");
    return (
      <div ref={ref} className={classes} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div className={styles.bar} style={{ width: `${clamped}%` }} />
      </div>
    );
  }
);
Progress.displayName = "Progress";

/* ----- Skeleton ----- */
export interface SkeletonProps {
  height?: string;
  width?: string;
  className?: string;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton({ height = "12px", width = "100%", className }, ref) {
    const classes = [styles.skeleton, className].filter(Boolean).join(" ");
    return <div ref={ref} className={classes} style={{ height, width }} />;
  }
);
Skeleton.displayName = "Skeleton";

/* ----- Spinner ----- */
export interface SpinnerProps {
  size?: string;
  className?: string;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner({ size, className }, ref) {
    const classes = [styles.spinner, className].filter(Boolean).join(" ");
    const style = size ? { width: size, height: size } : undefined;
    return <div ref={ref} className={classes} style={style} role="status" aria-label="Loading" />;
  }
);
Spinner.displayName = "Spinner";

/* ----- DotsLoader ----- */
export interface DotsLoaderProps {
  className?: string;
}

export const DotsLoader = React.forwardRef<HTMLDivElement, DotsLoaderProps>(
  function DotsLoader({ className }, ref) {
    const classes = [styles.dots, className].filter(Boolean).join(" ");
    return (
      <div ref={ref} className={classes} role="status" aria-label="Loading">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    );
  }
);
DotsLoader.displayName = "DotsLoader";
