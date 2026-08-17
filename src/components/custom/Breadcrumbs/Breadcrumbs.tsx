"use client";

import React from "react";
import { Nav, Anchor } from "@/components/primitives";
import { Text } from "@/components/custom/Text";
import styles from "./Breadcrumbs.module.css";

export interface BreadcrumbsProps {
  children: React.ReactNode;
  className?: string;
}

function BreadcrumbsRoot({ children, className }: BreadcrumbsProps) {
  const classes = [styles.crumbs, className].filter(Boolean).join(" ");
  const items = React.Children.toArray(children);

  return (
    <Nav className={classes} aria-label="Breadcrumb">
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Text size="micro" color="faint">/</Text>}
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
  if (current) {
    return (
      <Text size="micro" color="primary" className={className} aria-current="page">
        {children}
      </Text>
    );
  }

  return (
    <Anchor href={href} className={[styles.link, className].filter(Boolean).join(" ")}>
      <Text size="micro" color="muted">{children}</Text>
    </Anchor>
  );
}

BreadcrumbsItem.displayName = "Breadcrumbs.Item";

export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Item: BreadcrumbsItem,
});
