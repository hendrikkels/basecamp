"use client";

import React from "react";
import NextLink from "next/link";
import { Anchor } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import styles from "./Link.module.css";

export type LinkVariant = "default" | "unstyled";

export interface LinkProps extends Omit<PrimitiveProps<"a">, "href"> {
  href: string;
  variant?: LinkVariant;
  external?: boolean;
}

const variantClasses: Record<LinkVariant, string> = {
  default: styles.link,
  unstyled: styles.unstyled,
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link({ href, variant = "default", external = false, className, children, ...props }, ref) {
    const classes = [variantClasses[variant], className].filter(Boolean).join(" ");

    if (external) {
      return (
        <Anchor ref={ref} href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </Anchor>
      );
    }

    return (
      <NextLink ref={ref} href={href} className={classes} {...props}>
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";
