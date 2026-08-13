"use client";

import React, { useEffect, useCallback } from "react";
import { Box } from "@/components/primitives";
import { Heading } from "@/components/custom/Heading";
import { Text } from "@/components/custom/Text";
import type { HeadingVariant } from "@/components/custom/Heading";
import type { TextSize } from "@/components/custom/Text";
import styles from "./Modal.module.css";

export type ModalTitleVariant = "display-xl" | "display-l" | "display-m" | "display-s" | "heading" | "subheading" | "body-lg" | "body" | "micro";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  titleVariant?: ModalTitleVariant;
  uppercase?: boolean;
  children: React.ReactNode;
  className?: string;
}

const headingVariants = new Set<string>(["display-xl", "display-l", "display-m", "display-s", "heading", "subheading"]);

function ModalRoot({ open, onClose, title, titleVariant = "heading", uppercase, children, className }: ModalProps) {
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

  const isUppercase = uppercase ?? !headingVariants.has(titleVariant);
  const shellClasses = [styles.shell, className].filter(Boolean).join(" ");
  const titleClasses = [styles.title, isUppercase && styles.uppercase].filter(Boolean).join(" ");

  return (
    <Box className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <Box className={shellClasses} onClick={(e) => e.stopPropagation()}>
        {title && (
          headingVariants.has(titleVariant)
            ? <Heading variant={titleVariant as HeadingVariant} level={2} className={titleClasses}>{title}</Heading>
            : <Text size={titleVariant as TextSize} className={titleClasses}>{title}</Text>
        )}
        {children}
      </Box>
    </Box>
  );
}

ModalRoot.displayName = "Modal";

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
  Description: ModalDescription,
  Actions: ModalActions,
});
