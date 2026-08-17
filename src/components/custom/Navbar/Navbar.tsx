"use client";

import React, { useState } from "react";
import { Nav, Box, Anchor, Span } from "@/components/primitives";
import { Text } from "@/components/custom/Text";
import { MenuToggle } from "@/components/custom/MenuToggle";
import styles from "./Navbar.module.css";

/* ----- Navbar (root) ----- */
export interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

function NavbarRoot({ children, className }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = [styles.nav, className].filter(Boolean).join(" ");

  const linksChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === NavbarLinks
  ) as React.ReactElement<NavbarLinksProps> | undefined;

  return (
    <Nav className={classes}>
      <Box className={styles.inner}>
        {children}
        <MenuToggle open={mobileOpen} onClick={() => setMobileOpen((p) => !p)} />
      </Box>
      {linksChild && (
        <Box className={`${styles.mobileLinks} ${!mobileOpen ? styles.mobileLinksHidden : ""}`}>
          {linksChild.props.children}
        </Box>
      )}
    </Nav>
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
    <Anchor href={href} className={classes}>
      {/* <Span className={styles.brandBlock} /> */}
      {children}
      {meta && <Text size="micro" color="dim"  className={styles.brandMeta}>{meta}</Text>}
    </Anchor>
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
  return <Box className={classes}>{children}</Box>;
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
    <Anchor href={href} className={classes}>
      {index && <Span className={styles.linkIndex}>{index}</Span>}
      {children}
    </Anchor>
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
  return <Box className={classes}>{children}</Box>;
}

NavbarActions.displayName = "Navbar.Actions";

/* ----- Compose compound component ----- */
export const Navbar = Object.assign(NavbarRoot, {
  Brand: NavbarBrand,
  Links: NavbarLinks,
  Link: NavbarLink,
  Actions: NavbarActions,
});
