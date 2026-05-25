"use client";

import React, { createContext, useContext, useCallback } from "react";
import { Box, Button, Span } from "@/components/primitives";
import styles from "./Tabs.module.css";

/* ----- Context ----- */
interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

/* ----- Tabs (root) ----- */
export interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

function TabsRoot({ value, onChange, children, className }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <Box className={className}>{children}</Box>
    </TabsContext.Provider>
  );
}

TabsRoot.displayName = "Tabs";

/* ----- Tabs.List ----- */
export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

function TabsList({ children, className }: TabsListProps) {
  const classes = [styles.tabList, className].filter(Boolean).join(" ");
  return <Box className={classes} role="tablist">{children}</Box>;
}

TabsList.displayName = "Tabs.List";

/* ----- Tabs.Tab ----- */
export interface TabProps {
  value: string;
  count?: string;
  children: React.ReactNode;
  className?: string;
}

function Tab({ value, count, children, className }: TabProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.Tab must be used within Tabs");

  const isActive = ctx.value === value;

  const handleClick = useCallback(() => {
    ctx.onChange(value);
  }, [ctx, value]);

  const classes = [
    styles.tab,
    isActive ? styles.tabActive : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Button
      className={classes}
      onClick={handleClick}
      role="tab"
      aria-selected={isActive}
      type="button"
    >
      {children}
      {count && <Span className={styles.count}>{count}</Span>}
    </Button>
  );
}

Tab.displayName = "Tabs.Tab";

/* ----- Tabs.Panel ----- */
export interface TabsPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

function TabsPanel({ value, children, className }: TabsPanelProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.Panel must be used within Tabs");

  if (ctx.value !== value) return null;

  const classes = [styles.panel, className].filter(Boolean).join(" ");

  return (
    <Box className={classes} role="tabpanel">
      {children}
    </Box>
  );
}

TabsPanel.displayName = "Tabs.Panel";

/* ----- Compose ----- */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabsPanel,
});
