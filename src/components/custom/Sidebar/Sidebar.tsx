"use client";

import React from "react";
import { Aside, Box, Span, Anchor } from "@/components/primitives";
import { Text } from "@/components/custom/Text";
import styles from "./Sidebar.module.css";

/* ----- Sidebar (root) ----- */
export interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

function SidebarRoot({ children, className }: SidebarProps) {
  const classes = [styles.sidebar, className].filter(Boolean).join(" ");
  return <Aside className={classes}>{children}</Aside>;
}
SidebarRoot.displayName = "Sidebar";

/* ----- Sidebar.Group ----- */
export interface SidebarGroupProps {
  label?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function SidebarGroup({ label, action, children, className }: SidebarGroupProps) {
  const classes = [styles.group, className].filter(Boolean).join(" ");
  return (
    <Box className={classes}>
      {label && (
        <Box className={styles.groupLabel}>
          <Text size="micro" color="dim" className={styles.groupLabelText}>{label}</Text>
          {action}
        </Box>
      )}
      {children}
    </Box>
  );
}
SidebarGroup.displayName = "Sidebar.Group";

/* ----- Sidebar.Item ----- */
export interface SidebarItemProps {
  href?: string;
  active?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

function SidebarItem({ href, active = false, icon, badge, onClick, children, className }: SidebarItemProps) {
  const classes = [
    styles.item,
    active ? styles.itemActive : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && <Span className={styles.itemIcon}>{icon}</Span>}
      {children}
      {badge && <Span className={styles.itemBadge}>{badge}</Span>}
    </>
  );

  if (href) {
    return <Anchor href={href} className={classes}>{content}</Anchor>;
  }

  return (
    <Box className={classes} onClick={onClick} role="button" tabIndex={0}>
      {content}
    </Box>
  );
}
SidebarItem.displayName = "Sidebar.Item";

/* ----- Sidebar.Footer ----- */
export interface SidebarFooterProps {
  children: React.ReactNode;
  className?: string;
}

function SidebarFooter({ children, className }: SidebarFooterProps) {
  const classes = [styles.footer, className].filter(Boolean).join(" ");
  return <Box className={classes}>{children}</Box>;
}
SidebarFooter.displayName = "Sidebar.Footer";

/* ----- Compose ----- */
export const Sidebar = Object.assign(SidebarRoot, {
  Group: SidebarGroup,
  Item: SidebarItem,
  Footer: SidebarFooter,
});
