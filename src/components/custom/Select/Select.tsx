"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { Box, Button, Span } from "@/components/primitives";
import styles from "./Select.module.css";

/* ===================================================================
   SINGLE SELECT
   =================================================================== */

interface SelectContextValue {
  value: string;
  select: (value: string, label: string, icon?: React.ReactNode) => void;
  syncLabel: (label: string, icon?: React.ReactNode) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  children: React.ReactNode;
  className?: string;
}

function SelectRoot({
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  error = false,
  children,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [displayLabel, setDisplayLabel] = useState("");
  const [displayIcon, setDisplayIcon] = useState<React.ReactNode | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const syncLabel = useCallback(
    (label: string, icon?: React.ReactNode) => {
      setDisplayLabel(label);
      setDisplayIcon(icon ?? null);
    },
    []
  );

  const select = useCallback(
    (val: string, label: string, icon?: React.ReactNode) => {
      onChange(val);
      setDisplayLabel(label);
      setDisplayIcon(icon ?? null);
      setOpen(false);
    },
    [onChange]
  );

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const triggerClasses = [
    styles.trigger,
    open ? styles.triggerOpen : undefined,
    error ? styles.triggerError : undefined,
    disabled ? styles.triggerDisabled : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <SelectContext.Provider value={{ value, select, syncLabel }}>
      <Box ref={wrapperRef} className={[styles.wrapper, className].filter(Boolean).join(" ")}>
        <Button
          type="button"
          className={triggerClasses}
          onClick={() => { if (!disabled) setOpen((p) => !p); }}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          {displayIcon && <Span className={styles.selectedIcon}>{displayIcon}</Span>}
          {value ? (
            <Span>{displayLabel || value}</Span>
          ) : (
            <Span className={styles.placeholder}>{placeholder}</Span>
          )}
          <Span className={styles.chevron} />
        </Button>
        {open && (
          <Box className={styles.dropdown} role="listbox">
            {children}
          </Box>
        )}
      </Box>
    </SelectContext.Provider>
  );
}

SelectRoot.displayName = "Select";

/* ----- Select.Option ----- */
export interface SelectOptionProps {
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

function SelectOption({ value, icon, disabled = false, children, className }: SelectOptionProps) {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Select.Option must be used within Select");

  const isSelected = ctx.value === value;
  const label = typeof children === "string" ? children : String(children);

  useEffect(() => {
    if (isSelected) {
      ctx.syncLabel(label, icon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = [
    styles.option,
    isSelected ? styles.optionSelected : undefined,
    disabled ? styles.optionDisabled : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Box
      className={classes}
      onClick={() => {
        if (!disabled) ctx.select(value, label, icon);
      }}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
    >
      {icon && <Span className={styles.optionIcon}>{icon}</Span>}
      {children}
    </Box>
  );
}

SelectOption.displayName = "Select.Option";

/* ----- Select.Group ----- */
export interface SelectGroupProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

function SelectGroup({ label, children, className }: SelectGroupProps) {
  return (
    <Box className={className}>
      <Box className={styles.groupSeparator} />
      <Box className={styles.groupLabel}>{label}</Box>
      {children}
    </Box>
  );
}

SelectGroup.displayName = "Select.Group";

/* ----- Compose ----- */
export const Select = Object.assign(SelectRoot, {
  Option: SelectOption,
  Group: SelectGroup,
});

/* ===================================================================
   MULTI SELECT
   =================================================================== */

interface MultiSelectContextValue {
  value: string[];
  toggle: (val: string, label: string) => void;
}

const MultiSelectContext = createContext<MultiSelectContextValue | null>(null);

export interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  children: React.ReactNode;
  className?: string;
}

function MultiSelectRoot({
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  error = false,
  children,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState<Map<string, string>>(new Map());
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(
    (val: string, label: string) => {
      const next = value.includes(val)
        ? value.filter((v) => v !== val)
        : [...value, val];
      onChange(next);
      setLabels((prev) => {
        const updated = new Map(prev);
        updated.set(val, label);
        return updated;
      });
    },
    [value, onChange]
  );

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const displayValue = (() => {
    if (value.length === 0) return null;
    if (value.length <= 2) {
      return value.map((v) => labels.get(v) || v).join(", ");
    }
    return `${value.length} selected`;
  })();

  const triggerClasses = [
    styles.trigger,
    open ? styles.triggerOpen : undefined,
    error ? styles.triggerError : undefined,
    disabled ? styles.triggerDisabled : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <MultiSelectContext.Provider value={{ value, toggle }}>
      <Box ref={wrapperRef} className={[styles.wrapper, className].filter(Boolean).join(" ")}>
        <Button
          type="button"
          className={triggerClasses}
          onMouseDown={(e) => {
            e.preventDefault();
            if (!disabled) setOpen((p) => !p);
          }}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          {displayValue ? (
            <Span>{displayValue}</Span>
          ) : (
            <Span className={styles.placeholder}>{placeholder}</Span>
          )}
          <Span className={styles.chevron} />
        </Button>
        {open && (
          <Box className={styles.dropdown} role="listbox" aria-multiselectable>
            {children}
          </Box>
        )}
      </Box>
    </MultiSelectContext.Provider>
  );
}

MultiSelectRoot.displayName = "MultiSelect";

/* ----- MultiSelect.Option ----- */
export interface MultiSelectOptionProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

function MultiSelectOption({ value, disabled = false, children, className }: MultiSelectOptionProps) {
  const ctx = useContext(MultiSelectContext);
  if (!ctx) throw new Error("MultiSelect.Option must be used within MultiSelect");

  const isSelected = ctx.value.includes(value);
  const label = typeof children === "string" ? children : String(children);

  const classes = [
    styles.option,
    isSelected ? styles.optionSelected : undefined,
    disabled ? styles.optionDisabled : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Box
      className={classes}
      onClick={() => { if (!disabled) ctx.toggle(value, label); }}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
    >
      <Span className={`${styles.checkbox} ${isSelected ? styles.checkboxChecked : ""}`}>
        {isSelected && <Span className={styles.checkmark}>✓</Span>}
      </Span>
      {children}
    </Box>
  );
}

MultiSelectOption.displayName = "MultiSelect.Option";

/* ----- Compose ----- */
export const MultiSelect = Object.assign(MultiSelectRoot, {
  Option: MultiSelectOption,
  Group: SelectGroup,
});
