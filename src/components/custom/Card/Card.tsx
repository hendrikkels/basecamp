"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Box } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import { Heading } from "@/components/custom/Heading";
import { Text } from "@/components/custom/Text";
import type { HeadingVariant } from "@/components/custom/Heading";
import type { TextSize } from "@/components/custom/Text";
import styles from "./Card.module.css";

export type CardVariant = "default" | "frost" | "block";
export type CardPadding = "none" | "sm" | "md" | "lg";
export type CardTitleVariant = HeadingVariant | TextSize;

export interface CardProps extends PrimitiveProps<"div"> {
  variant?: CardVariant;
  padding?: CardPadding;
  title?: string;
  titleVariant?: CardTitleVariant;
  uppercase?: boolean;
  maxHeight?: string;
}

const variantClasses: Record<CardVariant, string> = {
  default: styles.default,
  frost: styles.frost,
  block: styles.block,
};

const paddingClasses: Record<CardPadding, string> = {
  none: styles.padNone,
  sm: styles.padSm,
  md: styles.padMd,
  lg: styles.padLg,
};

const headingVariants = new Set<string>(["display-xl", "display-l", "display-m", "display-s", "heading", "subheading"]);

function CardRoot({ variant = "default", padding = "md", title, titleVariant = "heading", uppercase = false, maxHeight, className, children, ...props }: CardProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [scrolledTop, setScrolledTop] = useState(false);
  const [scrolledBottom, setScrolledBottom] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = bodyRef.current;
    if (!el) return;
    setScrolledTop(el.scrollTop > 0);
    setScrolledBottom(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  }, []);

  useEffect(() => {
    if (!maxHeight) return;
    requestAnimationFrame(updateScrollState);
  }, [maxHeight, updateScrollState]);

  const childArray = React.Children.toArray(children);
  const headerChild = childArray.find(
    (child) => React.isValidElement(child) && (child.type as { displayName?: string }).displayName === "Card.Header"
  );
  const footerChild = childArray.find(
    (child) => React.isValidElement(child) && (child.type as { displayName?: string }).displayName === "Card.Footer"
  );
  const body = childArray.filter(
    (child) =>
      !(React.isValidElement(child) &&
        ((child.type as { displayName?: string }).displayName === "Card.Header" ||
          (child.type as { displayName?: string }).displayName === "Card.Footer"))
  );

  const hasStructure = !!(headerChild || footerChild || maxHeight);

  const classes = [
    styles.base,
    variantClasses[variant],
    hasStructure ? styles.scrollable : paddingClasses[padding],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const titleClasses = [styles.title, uppercase && styles.uppercase].filter(Boolean).join(" ");

  // Simple mode — no header/footer/maxHeight, backward compatible
  if (!hasStructure) {
    return (
      <Box ref={ref} className={classes} {...props}>
        {title && (
          headingVariants.has(titleVariant)
            ? <Heading variant={titleVariant as HeadingVariant} level={3} className={titleClasses}>{title}</Heading>
            : <Text size={titleVariant as TextSize} className={titleClasses} color="dim">{title}</Text>
        )}
        {children}
      </Box>
    );
  }

  // Structured mode — header/footer with scroll-aware borders
  const headerContent = React.isValidElement(headerChild)
    ? (headerChild.props as CardHeaderProps).children
    : null;
  const headerTitle = React.isValidElement(headerChild)
    ? (headerChild.props as CardHeaderProps).title
    : title;
  const headerTitleVariant = React.isValidElement(headerChild)
    ? (headerChild.props as CardHeaderProps).titleVariant ?? titleVariant
    : titleVariant;
  const headerUppercase = React.isValidElement(headerChild)
    ? (headerChild.props as CardHeaderProps).uppercase ?? uppercase
    : uppercase;

  const footerContent = React.isValidElement(footerChild)
    ? (footerChild.props as CardFooterProps).children
    : null;

  const headerPadding = React.isValidElement(headerChild)
    ? (headerChild.props as CardHeaderProps).padding ?? (padding === "none" ? "md" : padding)
    : (padding === "none" ? "md" : padding);
  const footerPadding = React.isValidElement(footerChild)
    ? (footerChild.props as CardFooterProps).padding ?? (padding === "none" ? "md" : padding)
    : (padding === "none" ? "md" : padding);

  const hasHeader = !!(headerTitle || headerContent);
  const hasFooter = !!footerContent;

  const headerClasses = [styles.header, styles[`headerPad${capitalize(headerPadding)}`], scrolledTop && styles.headerBorder].filter(Boolean).join(" ");
  const bodyClasses = [
    styles.body,
    styles[`bodyPad${capitalize(padding)}`],
    !hasHeader && styles[`bodyTop${capitalize(padding)}`],
    !hasFooter && styles[`bodyBottom${capitalize(padding)}`],
  ].filter(Boolean).join(" ");
  const footerClasses = [styles.footer, styles[`footerPad${capitalize(footerPadding)}`], scrolledBottom && styles.footerBorder].filter(Boolean).join(" ");

  const headerTitleClasses = [styles.title, headerUppercase && styles.uppercase].filter(Boolean).join(" ");

  return (
    <Box ref={ref} className={classes} style={maxHeight ? { maxHeight } : undefined} {...props}>
      {(headerTitle || headerContent) && (
        <Box className={headerClasses}>
          {headerTitle && (
            headingVariants.has(headerTitleVariant)
              ? <Heading variant={headerTitleVariant as HeadingVariant} level={3} className={headerTitleClasses}>{headerTitle}</Heading>
              : <Text size={headerTitleVariant as TextSize} className={headerTitleClasses} color="dim">{headerTitle}</Text>
          )}
          {headerContent}
        </Box>
      )}
      <Box ref={bodyRef} className={bodyClasses} onScroll={updateScrollState}>
        {body}
      </Box>
      {footerContent && (
        <Box className={footerClasses}>
          {footerContent}
        </Box>
      )}
    </Box>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const CardComponent = React.forwardRef<HTMLDivElement, CardProps>(CardRoot);
CardComponent.displayName = "Card";

/* ----- Card.Header ----- */
export interface CardHeaderProps {
  title?: string;
  titleVariant?: CardTitleVariant;
  uppercase?: boolean;
  padding?: CardPadding;
  children?: React.ReactNode;
}

function CardHeader({ children: _c, title: _t, titleVariant: _tv, uppercase: _u, padding: _p }: CardHeaderProps) {
  void _c; void _t; void _tv; void _u; void _p;
  return null;
}
CardHeader.displayName = "Card.Header";

/* ----- Card.Footer ----- */
export interface CardFooterProps {
  padding?: CardPadding;
  children: React.ReactNode;
}

function CardFooter({ children: _c, padding: _p }: CardFooterProps) {
  void _c; void _p;
  return null;
}
CardFooter.displayName = "Card.Footer";

/* ----- Compose ----- */
export const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Footer: CardFooter,
});
