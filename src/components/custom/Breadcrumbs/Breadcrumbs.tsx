"use client";

import React from "react";
import styles from "./Breadcrumbs.module.css";

export interface BreadcrumbsProps {
  children: React.ReactNode;
  className?: string;
}

function BreadcrumbsRoot({ children, className }: BreadcrumbsProps) {
  const classes = [styles.crumbs, className].filter(Boolean).join(" ");
  const items = React.Children.toArray(children);

  return (
    <nav className={classes} aria-label="Breadcrumb">
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className={styles.separator}>/</span>}
          {child}
        </React.Fragment>
      ))}
    </nav>
  );
}

BreadcrumbsRoot.displayName = "Breadcrumbs";

export interface BreadcrumbsItemProps {
  href?: string;
  current?: boolean;
  children: React.ReactNode;
  className?: string;
}

function BreadcrumbsItem({ href, current = false, children, className }: BreadcrumbsItemProps) {
  if (current || !href) {
    const classes = [styles.current, className].filter(Boolean).join(" ");
    return <span className={classes} aria-current="page">{children}</span>;
  }

  const classes = [styles.link, className].filter(Boolean).join(" ");
  return <a href={href} className={classes}>{children}</a>;
}

BreadcrumbsItem.displayName = "Breadcrumbs.Item";

export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Item: BreadcrumbsItem,
});
