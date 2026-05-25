"use client";

import React from "react";
import styles from "./Field.module.css";

/* ----- Field (wrapper) ----- */
export interface FieldProps {
  children: React.ReactNode;
  className?: string;
}

function FieldRoot({ children, className }: FieldProps) {
  const classes = [styles.field, className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}

FieldRoot.displayName = "Field";

/* ----- Field.Label ----- */
export interface FieldLabelProps extends React.ComponentPropsWithRef<"label"> {
  required?: boolean;
}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  function FieldLabel({ required, children, className, ...props }, ref) {
    const classes = [styles.label, className].filter(Boolean).join(" ");
    return (
      <label ref={ref} className={classes} {...props}>
        {children}
        {required && <span className={styles.required}>*</span>}
      </label>
    );
  }
);

FieldLabel.displayName = "Field.Label";

/* ----- Field.Input ----- */
export interface FieldInputProps extends React.ComponentPropsWithRef<"input"> {
  error?: boolean;
}

const FieldInput = React.forwardRef<HTMLInputElement, FieldInputProps>(
  function FieldInput({ error, className, ...props }, ref) {
    const classes = [styles.input, error ? styles.inputError : undefined, className]
      .filter(Boolean)
      .join(" ");
    return <input ref={ref} className={classes} {...props} />;
  }
);

FieldInput.displayName = "Field.Input";

/* ----- Field.Textarea ----- */
export interface FieldTextareaProps extends React.ComponentPropsWithRef<"textarea"> {
  error?: boolean;
}

const FieldTextarea = React.forwardRef<HTMLTextAreaElement, FieldTextareaProps>(
  function FieldTextarea({ error, className, ...props }, ref) {
    const classes = [styles.textarea, error ? styles.textareaError : undefined, className]
      .filter(Boolean)
      .join(" ");
    return <textarea ref={ref} className={classes} {...props} />;
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
  return <p className={classes}>{children}</p>;
}

FieldHint.displayName = "Field.Hint";

/* ----- Field.Error ----- */
export interface FieldErrorProps {
  children: React.ReactNode;
  className?: string;
}

function FieldError({ children, className }: FieldErrorProps) {
  const classes = [styles.error, className].filter(Boolean).join(" ");
  return <p className={classes}>{children}</p>;
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
