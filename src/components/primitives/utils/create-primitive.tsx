"use client";

import React from "react";
import type { CSSProps } from "./css";
import { splitCSSProps } from "./css-props";

export type PrimitiveProps<E extends keyof React.JSX.IntrinsicElements> =
  CSSProps & React.ComponentPropsWithRef<E>;

export function createPrimitive<
  E extends keyof React.JSX.IntrinsicElements,
>(element: E, displayName: string) {
  const Component = React.forwardRef<unknown, PrimitiveProps<E>>(
    function PrimitiveComponent(props, ref) {
      const { cssStyles, rest } = splitCSSProps(props);

      const existingStyle =
        typeof (rest as Record<string, unknown>).style === "object"
          ? ((rest as Record<string, unknown>).style as React.CSSProperties)
          : {};

      const mergedStyle: React.CSSProperties = {
        ...cssStyles,
        ...existingStyle,
      };

      const elementProps = {
        ...rest,
        ref,
        style: Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined,
      };

      return React.createElement(element, elementProps as never);
    }
  );

  Component.displayName = displayName;
  return Component as React.ForwardRefExoticComponent<PrimitiveProps<E>>;
}
