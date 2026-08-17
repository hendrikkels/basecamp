"use client";

import React from "react";
import { Nav, Span, Anchor } from "@/components/primitives";
import styles from "./Breadcrumbs.module.css";

export interface BreadcrumbsProps {
  uppercase?: boolean;
  children: React.ReactNode;
  className?: string;
}

function BreadcrumbsRoot({ uppercase = false, children, className }: BreadcrumbsProps) {
  const classes = [styles.crumbs, uppercase ? styles.uppercase : undefined, className].filter(Boolean).join(" ");
  const items = React.Children.toArray(children);

  return (
    <Nav className={classes} aria-label="Breadcrumb">
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Span className={styles.separator}>/</Span>}
          {child}
        </React.Fragment>
      ))}
    </Nav>
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
    return <Span className={classes} aria-current="page">{children}</Span>;
  }

  const classes = [styles.link, className].filter(Boolean).join(" ");
  return <Anchor href={href} className={classes}>{children}</Anchor>;
}

BreadcrumbsItem.displayName = "Breadcrumbs.Item";

export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Item: BreadcrumbsItem,
});
