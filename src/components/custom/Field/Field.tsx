"use client";

import React from "react";
import { Box, Span, Label, Input, Textarea } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import { Text } from "@/components/custom/Text";
import styles from "./Field.module.css";

/* ----- Field (wrapper) ----- */
export interface FieldProps {
  children: React.ReactNode;
  className?: string;
}

function FieldRoot({ children, className }: FieldProps) {
  const classes = [styles.field, className].filter(Boolean).join(" ");
  return <Box className={classes}>{children}</Box>;
}

FieldRoot.displayName = "Field";

/* ----- Field.Label ----- */
export interface FieldLabelProps extends PrimitiveProps<"label"> {
  required?: boolean;
}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  function FieldLabel({ required, children, className, ...props }, ref) {
    const classes = [styles.label, className].filter(Boolean).join(" ");
    return (
      <Label ref={ref} className={classes} {...props}>
        <Text size="micro" color="dim">
          {children}
          {required && <Span className={styles.required}>*</Span>}
        </Text>
      </Label>
    );
  }
);

FieldLabel.displayName = "Field.Label";

/* ----- Field.Input ----- */
export interface FieldInputProps extends PrimitiveProps<"input"> {
  error?: boolean;
}

const FieldInput = React.forwardRef<HTMLInputElement, FieldInputProps>(
  function FieldInput({ error, className, ...props }, ref) {
    const classes = [styles.input, error ? styles.inputError : undefined, className]
      .filter(Boolean)
      .join(" ");
    return <Input ref={ref} className={classes} {...props} />;
  }
);

FieldInput.displayName = "Field.Input";

/* ----- Field.Textarea ----- */
export interface FieldTextareaProps extends PrimitiveProps<"textarea"> {
  error?: boolean;
}

const FieldTextarea = React.forwardRef<HTMLTextAreaElement, FieldTextareaProps>(
  function FieldTextarea({ error, className, ...props }, ref) {
    const classes = [styles.textarea, error ? styles.textareaError : undefined, className]
      .filter(Boolean)
      .join(" ");
    return <Textarea ref={ref} className={classes} {...props} />;
  }
);

FieldTextarea.displayName = "Field.Textarea";

/* ----- Field.Hint ----- */
export interface FieldHintProps {
  children: React.ReactNode;
  className?: string;
}

function FieldHint({ children, className }: FieldHintProps) {
  const classes = [styles.hint, className].filter(Boolean).join(" ");
  return <Box className={classes}>{children}</Box>;
}

FieldHint.displayName = "Field.Hint";

/* ----- Field.Error ----- */
export interface FieldErrorProps {
  children: React.ReactNode;
  className?: string;
}

function FieldError({ children, className }: FieldErrorProps) {
  const classes = [styles.error, className].filter(Boolean).join(" ");
  return <Box className={classes}>{children}</Box>;
}

FieldError.displayName = "Field.Error";

/* ----- Compose ----- */
export const Field = Object.assign(FieldRoot, {
  Label: FieldLabel,
  Input: FieldInput,
  Textarea: FieldTextarea,
  Hint: FieldHint,
  Error: FieldError,
});
