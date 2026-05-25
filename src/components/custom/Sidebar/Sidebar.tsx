"use client";

import React from "react";
import styles from "./Sidebar.module.css";

/* ----- Sidebar (root) ----- */
export interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

function SidebarRoot({ children, className }: SidebarProps) {
  const classes = [styles.sidebar, className].filter(Boolean).join(" ");
  return <aside className={classes}>{children}</aside>;
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
    <div className={classes}>
      {label && (
        <div className={styles.groupLabel}>
          {label}
          {action}
        </div>
      )}
      {children}
    </div>
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
      {icon && <span className={styles.itemIcon}>{icon}</span>}
      {children}
      {badge && <span className={styles.itemBadge}>{badge}</span>}
    </>
  );

  if (href) {
    return <a href={href} className={classes}>{content}</a>;
  }

  return (
    <div className={classes} onClick={onClick} role="button" tabIndex={0}>
      {content}
    </div>
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
  return <div className={classes}>{children}</div>;
}
SidebarFooter.displayName = "Sidebar.Footer";

/* ----- Compose ----- */
export const Sidebar = Object.assign(SidebarRoot, {
  Group: SidebarGroup,
  Item: SidebarItem,
  Footer: SidebarFooter,
});
