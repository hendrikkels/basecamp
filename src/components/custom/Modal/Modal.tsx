"use client";

import React, { useEffect, useCallback } from "react";
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
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={shellClasses} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

ModalRoot.displayName = "Modal";

export interface ModalTitleProps {
  children: React.ReactNode;
}

function ModalTitle({ children }: ModalTitleProps) {
  return <h2 className={styles.title}>{children}</h2>;
}
ModalTitle.displayName = "Modal.Title";

export interface ModalDescriptionProps {
  children: React.ReactNode;
}

function ModalDescription({ children }: ModalDescriptionProps) {
  return <p className={styles.description}>{children}</p>;
}
ModalDescription.displayName = "Modal.Description";

export interface ModalActionsProps {
  children: React.ReactNode;
}

function ModalActions({ children }: ModalActionsProps) {
  return <div className={styles.actions}>{children}</div>;
}
ModalActions.displayName = "Modal.Actions";

export const Modal = Object.assign(ModalRoot, {
  Title: ModalTitle,
  Description: ModalDescription,
  Actions: ModalActions,
});
