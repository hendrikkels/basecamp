"use client";

import React, { useEffect, useCallback, useRef, useState } from "react";
import { Box } from "@/components/primitives";
import { Heading } from "@/components/custom/Heading";
import { Text } from "@/components/custom/Text";
import type { HeadingVariant } from "@/components/custom/Heading";
import type { TextSize } from "@/components/custom/Text";
import styles from "./Modal.module.css";

export type ModalTitleVariant = HeadingVariant | TextSize;
export type ModalSize = "default" | "wide";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  titleVariant?: ModalTitleVariant;
  uppercase?: boolean;
  size?: ModalSize;
  children: React.ReactNode;
  className?: string;
}

const headingVariants = new Set<string>(["display-xl", "display-l", "display-m", "display-s", "heading", "subheading"]);

function ModalRoot({ open, onClose, title, titleVariant = "heading", uppercase = false, size = "default", children, className }: ModalProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [scrolledTop, setScrolledTop] = useState(false);
  const [scrolledBottom, setScrolledBottom] = useState(false);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  const updateScrollState = useCallback(() => {
    const el = bodyRef.current;
    if (!el) return;
    setScrolledTop(el.scrollTop > 0);
    setScrolledBottom(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  }, []);

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

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(updateScrollState);
  }, [open, updateScrollState]);

  if (!open) return null;

  const shellClasses = [styles.shell, size === "wide" && styles.wide, className].filter(Boolean).join(" ");
  const titleClasses = [styles.title, uppercase && styles.uppercase].filter(Boolean).join(" ");
  const headerClasses = [styles.header, scrolledTop && styles.headerBorder].filter(Boolean).join(" ");
  const actionsClasses = [styles.actions, scrolledBottom && styles.actionsBorder].filter(Boolean).join(" ");

  const childArray = React.Children.toArray(children);
  const actionsChild = childArray.find(
    (child) => React.isValidElement(child) && (child.type as { displayName?: string }).displayName === "Modal.Actions"
  );
  const body = childArray.filter(
    (child) => !(React.isValidElement(child) && (child.type as { displayName?: string }).displayName === "Modal.Actions")
  );

  const actionsContent = React.isValidElement(actionsChild) ? (actionsChild.props as { children?: React.ReactNode }).children : null;

  return (
    <Box className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <Box className={shellClasses} onClick={(e) => e.stopPropagation()}>
        {title && (
          <Box className={headerClasses}>
            {headingVariants.has(titleVariant)
              ? <Heading variant={titleVariant as HeadingVariant} level={2} className={titleClasses}>{title}</Heading>
              : <Text size={titleVariant as TextSize} className={titleClasses} color="dim">{title}</Text>
            }
          </Box>
        )}
        <Box ref={bodyRef} className={styles.body} onScroll={updateScrollState}>
          {body}
        </Box>
        {actionsContent && (
          <Box className={actionsClasses}>
            {actionsContent}
          </Box>
        )}
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
