"use client";

import React, { useState, useRef, useCallback } from "react";
import { Box, Input } from "@/components/primitives";
import { Icon } from "@/components/custom/Icon";
import { Text } from "@/components/custom/Text";
import styles from "./FileInput.module.css";

export interface FileInputProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  error?: boolean;
  onChange?: (files: File[]) => void;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const FileInput = React.forwardRef<HTMLDivElement, FileInputProps>(
  function FileInput(
    { accept, multiple = false, maxSize, disabled = false, error = false, onChange, className },
    ref
  ) {
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback(
      (fileList: FileList | null) => {
        if (!fileList || !onChange) return;
        let files = Array.from(fileList);
        if (maxSize) {
          files = files.filter((f) => f.size <= maxSize);
        }
        if (files.length > 0) {
          onChange(files);
        }
      },
      [onChange, maxSize]
    );

    const handleClick = () => {
      if (!disabled) inputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (!disabled) handleFiles(e.dataTransfer.files);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      if (inputRef.current) inputRef.current.value = "";
    };

    const classes = [
      styles.dropzone,
      dragOver && styles.dragOver,
      error && styles.error,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Box
        ref={ref}
        className={classes}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <Box className={styles.inner}>
          <Icon name="upload" size="lg" className={styles.icon} />
          <Text size="body-sm" color="dim">
            Click or drag files here
          </Text>
          {maxSize && (
            <Text size="micro" color="dim">
              Max {formatBytes(maxSize)} per file
            </Text>
          )}
        </Box>
        <Input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className={styles.hiddenInput}
          onChange={handleInputChange}
          tabIndex={-1}
          aria-hidden="true"
        />
      </Box>
    );
  }
);

FileInput.displayName = "FileInput";
