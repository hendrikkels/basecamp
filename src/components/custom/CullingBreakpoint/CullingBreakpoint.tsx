import React from "react";
import { Box } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import styles from "./CullingBreakpoint.module.css";

type Breakpoint = "sm" | "md" | "lg" | "xl";

export interface CullingBreakpointProps extends PrimitiveProps<"div"> {
  below?: Breakpoint;
  above?: Breakpoint;
}

export const CullingBreakpoint = React.forwardRef<HTMLDivElement, CullingBreakpointProps>(
  function CullingBreakpoint({ below, above, className, children, ...props }, ref) {
    const classes = [
      below ? styles[`below-${below}`] : undefined,
      above ? styles[`above-${above}`] : undefined,
      className,
    ].filter(Boolean).join(" ");

    return (
      <Box ref={ref} className={classes} {...props}>
        {children}
      </Box>
    );
  }
);

CullingBreakpoint.displayName = "CullingBreakpoint";
