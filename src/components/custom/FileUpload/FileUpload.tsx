"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Box } from "@/components/primitives";
import { FileInput } from "@/components/custom/FileInput";
import { DataTable } from "@/components/custom/DataTable";
import { Progress } from "@/components/custom/Progress";
import { Button } from "@/components/custom/Button";
import { Badge } from "@/components/custom/Badge";
import { Text } from "@/components/custom/Text";
import { Icon } from "@/components/custom/Icon";
import styles from "./FileUpload.module.css";

export type FileStatus = "uploading" | "completed" | "error";

export interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: FileStatus;
}

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  onFilesChange?: (files: UploadFile[]) => void;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  function FileUpload(
    { accept, multiple = true, maxSize, disabled = false, onFilesChange, className },
    ref
  ) {
    const [files, setFiles] = useState<UploadFile[]>([]);
    const intervalsRef = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());
    const onFilesChangeRef = useRef(onFilesChange);
    onFilesChangeRef.current = onFilesChange;

    useEffect(() => {
      onFilesChangeRef.current?.(files);
    }, [files]);

    useEffect(() => {
      return () => {
        intervalsRef.current.forEach((interval) => clearInterval(interval));
      };
    }, []);

    const simulateUpload = useCallback((uploadFile: UploadFile) => {
      const interval = setInterval(() => {
        setFiles((prev) => {
          const updated = prev.map((f) => {
            if (f.id !== uploadFile.id) return f;
            if (f.status !== "uploading") return f;
            const increment = Math.random() * 15 + 5;
            const newProgress = Math.min(f.progress + increment, 100);
            if (newProgress >= 100) {
              clearInterval(intervalsRef.current.get(f.id)!);
              intervalsRef.current.delete(f.id);
              return { ...f, progress: 100, status: "completed" as FileStatus };
            }
            return { ...f, progress: newProgress };
          });
          return updated;
        });
      }, 300);
      intervalsRef.current.set(uploadFile.id, interval);
    }, []);

    const handleFilesSelected = useCallback(
      (selectedFiles: File[]) => {
        const newFiles: UploadFile[] = selectedFiles.map((file) => ({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file,
          progress: 0,
          status: "uploading" as FileStatus,
        }));

        setFiles((prev) => [...prev, ...newFiles]);
        newFiles.forEach(simulateUpload);
      },
      [simulateUpload]
    );

    const handleCancel = useCallback((id: string) => {
      const interval = intervalsRef.current.get(id);
      if (interval) {
        clearInterval(interval);
        intervalsRef.current.delete(id);
      }
      setFiles((prev) => prev.filter((f) => f.id !== id));
    }, []);

    const handleRemove = useCallback((id: string) => {
      setFiles((prev) => prev.filter((f) => f.id !== id));
    }, []);

    const classes = [styles.wrapper, className].filter(Boolean).join(" ");

    return (
      <Box ref={ref} className={classes}>
        <Box className={styles.container}>
          <FileInput
            accept={accept}
            multiple={multiple}
            maxSize={maxSize}
            disabled={disabled}
            onChange={handleFilesSelected}
          />

          {files.length > 0 && (
            <DataTable className={styles.tableWrapper}>
              <DataTable.Head>
                <DataTable.Row>
                  <DataTable.Th>Name</DataTable.Th>
                  <DataTable.Th>Size</DataTable.Th>
                  <DataTable.Th>Status</DataTable.Th>
                  <DataTable.Th>Progress</DataTable.Th>
                  <DataTable.Th>Actions</DataTable.Th>
                </DataTable.Row>
              </DataTable.Head>
              <DataTable.Body>
                {files.map((f) => (
                  <DataTable.Row key={f.id}>
                    <DataTable.Td>
                      <Box className={styles.fileName}>
                        <Icon name="file" size="sm" color="muted" />
                        <Text size="body-sm" className={styles.fileNameText}>
                          {f.file.name}
                        </Text>
                      </Box>
                    </DataTable.Td>
                    <DataTable.Td>
                      <Text size="body-sm" color="dim">
                        {formatBytes(f.file.size)}
                      </Text>
                    </DataTable.Td>
                    <DataTable.Td>
                      {f.status === "uploading" && <Badge color="info-soft">Uploading</Badge>}
                      {f.status === "completed" && <Badge color="success-soft">Complete</Badge>}
                      {f.status === "error" && <Badge color="danger-soft">Error</Badge>}
                    </DataTable.Td>
                    <DataTable.Td>
                      <Box className={styles.progressCell}>
                        <Progress value={f.progress} className={styles.progressBar} />
                        <Text size="micro" color="dim">
                          {Math.round(f.progress)}%
                        </Text>
                      </Box>
                    </DataTable.Td>
                    <DataTable.Td>
                      <Box className={styles.actions}>
                        {f.status === "uploading" && (
                          <Button
                            variant="tertiary"
                            size="sm"
                            iconOnly
                            iconLeft="close"
                            onClick={() => handleCancel(f.id)}
                            aria-label="Cancel upload"
                          />
                        )}
                        {f.status === "completed" && (
                          <Button
                            variant="tertiary"
                            size="sm"
                            iconOnly
                            iconLeft="trash"
                            onClick={() => handleRemove(f.id)}
                            aria-label="Remove file"
                          />
                        )}
                        {f.status === "error" && (
                          <Button
                            variant="tertiary"
                            size="sm"
                            iconOnly
                            iconLeft="trash"
                            onClick={() => handleRemove(f.id)}
                            aria-label="Remove file"
                          />
                        )}
                      </Box>
                    </DataTable.Td>
                  </DataTable.Row>
                ))}
              </DataTable.Body>
            </DataTable>
          )}
        </Box>
      </Box>
    );
  }
);

FileUpload.displayName = "FileUpload";
