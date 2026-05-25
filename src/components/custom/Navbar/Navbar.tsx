"use client";

import React from "react";
import styles from "./Navbar.module.css";

/* ----- Navbar (root) ----- */
export interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

function NavbarRoot({ children, className }: NavbarProps) {
  const classes = [styles.nav, className].filter(Boolean).join(" ");
  return (
    <nav className={classes}>
      <div className={styles.inner}>{children}</div>
    </nav>
  );
}

NavbarRoot.displayName = "Navbar";

/* ----- Navbar.Brand ----- */
export interface NavbarBrandProps {
  href?: string;
  children: React.ReactNode;
  meta?: string;
  className?: string;
}

function NavbarBrand({ href = "/", children, meta, className }: NavbarBrandProps) {
  const classes = [styles.brand, className].filter(Boolean).join(" ");
  return (
    <a href={href} className={classes}>
      <span className={styles.brandBlock} />
      {children}
      {meta && <small className={styles.brandMeta}>{meta}</small>}
    </a>
  );
}

NavbarBrand.displayName = "Navbar.Brand";

/* ----- Navbar.Links ----- */
export interface NavbarLinksProps {
  children: React.ReactNode;
  className?: string;
}

function NavbarLinks({ children, className }: NavbarLinksProps) {
  const classes = [styles.links, className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}

NavbarLinks.displayName = "Navbar.Links";

/* ----- Navbar.Link ----- */
export interface NavbarLinkProps {
  href: string;
  active?: boolean;
  index?: string;
  children: React.ReactNode;
  className?: string;
}

function NavbarLink({ href, active = false, index, children, className }: NavbarLinkProps) {
  const classes = [
    styles.link,
    active ? styles.linkActive : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={classes}>
      {index && <span className={styles.linkIndex}>{index}</span>}
      {children}
    </a>
  );
}

NavbarLink.displayName = "Navbar.Link";

/* ----- Navbar.Actions ----- */
export interface NavbarActionsProps {
  children: React.ReactNode;
  className?: string;
}

function NavbarActions({ children, className }: NavbarActionsProps) {
  const classes = [styles.actions, className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}

NavbarActions.displayName = "Navbar.Actions";

/* ----- Compose compound component ----- */
export const Navbar = Object.assign(NavbarRoot, {
  Brand: NavbarBrand,
  Links: NavbarLinks,
  Link: NavbarLink,
  Actions: NavbarActions,
});
