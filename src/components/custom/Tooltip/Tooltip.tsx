"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { Span } from "@/components/primitives";
import styles from "./Tooltip.module.css";

export type TooltipPosition = "top" | "bottom";

export interface TooltipProps {
  content: string;
  position?: TooltipPosition;
  children: React.ReactNode;
  className?: string;
}

function getPortalContainer() {
  let container = document.getElementById("tooltip-portal");
  if (!container) {
    container = document.createElement("div");
    container.id = "tooltip-portal";
    document.body.appendChild(container);
  }
  return container;
}

export function Tooltip({ content, position = "top", children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const show = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const top = position === "top" ? rect.top - 6 : rect.bottom + 6;
    const left = rect.left + rect.width / 2;
    setCoords({ top, left });
    setVisible(true);
  }, [position]);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const classes = [styles.wrapper, className].filter(Boolean).join(" ");
  const tipClasses = [styles.tip, visible ? styles.visible : undefined, position === "top" ? styles.top : styles.bottom]
    .filter(Boolean).join(" ");

  return (
    <>
      <Span
        ref={triggerRef}
        className={classes}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </Span>
      {mounted &&
        createPortal(
          <Span
            className={tipClasses}
            role="tooltip"
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
          >
            {content}
          </Span>,
          getPortalContainer()
        )}
    </>
  );
}

Tooltip.displayName = "Tooltip";
