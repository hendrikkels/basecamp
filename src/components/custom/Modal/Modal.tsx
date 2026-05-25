"use client";

import React, { useEffect, useCallback } from "react";
import { Box, H2 } from "@/components/primitives";
import styles from "./Modal.module.css";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

function ModalRoot({ open, onClose, children, className }: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEscape);
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open, handleEscape]);

  if (!open) return null;

  const shellClasses = [styles.shell, className].filter(Boolean).join(" ");

  return (
    <Box className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <Box className={shellClasses} onClick={(e) => e.stopPropagation()}>
        {children}
      </Box>
    </Box>
  );
}

ModalRoot.displayName = "Modal";

export interface ModalTitleProps {
  children: React.ReactNode;
}

function ModalTitle({ children }: ModalTitleProps) {
  return <H2 className={styles.title}>{children}</H2>;
}
ModalTitle.displayName = "Modal.Title";

export interface ModalDescriptionProps {
  children: React.ReactNode;
}

function ModalDescription({ children }: ModalDescriptionProps) {
  return <Box className={styles.description}>{children}</Box>;
}
ModalDescription.displayName = "Modal.Description";

export interface ModalActionsProps {
  children: React.ReactNode;
}

function ModalActions({ children }: ModalActionsProps) {
  return <Box className={styles.actions}>{children}</Box>;
}
ModalActions.displayName = "Modal.Actions";

export const Modal = Object.assign(ModalRoot, {
  Title: ModalTitle,
  Description: ModalDescription,
  Actions: ModalActions,
});
