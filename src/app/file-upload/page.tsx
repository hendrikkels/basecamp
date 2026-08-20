"use client";

import { useState } from "react";
import { Box } from "@/components/primitives";
import {
  Container,
  Stack,
  Heading,
  SectionHead,
  Card,
  Text,
  Field,
  Divider,
} from "@/components/custom";
import { FileInput } from "@/components/custom/FileInput";
import { FileUpload } from "@/components/custom/FileUpload";
import type { UploadFile } from "@/components/custom/FileUpload";

export default function FileUploadPage() {
  const [basicFiles, setBasicFiles] = useState<File[]>([]);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  return (
    <Container>
      <Stack gap="6" _paddingTop="32px" _paddingBottom="80px">
        <Box _paddingBottom="24px" _borderBottom="1px solid var(--rule)">
          <Heading variant="heading" level={1}>
            File Upload
          </Heading>
          <Text size="body-lg" color="muted" _marginTop="8px">
            Drag-and-drop file input with upload progress tracking.
          </Text>
        </Box>

        <SectionHead number="01" title="FileInput" accent="standalone" uppercase />
        <Card>
          <Stack gap="4">
            <Field>
              <Field.Label>Upload documents</Field.Label>
              <FileInput
                accept=".pdf,.doc,.docx,.txt"
                multiple
                maxSize={10 * 1024 * 1024}
                onChange={setBasicFiles}
              />
              <Field.Hint>Accepts PDF, DOC, TXT — max 10 MB per file</Field.Hint>
            </Field>
            {basicFiles.length > 0 && (
              <Text size="micro" color="dim">
                Selected: {basicFiles.map((f) => f.name).join(", ")}
              </Text>
            )}
          </Stack>
        </Card>

        <Divider />

        <SectionHead number="02" title="FileUpload" accent="with progress table" uppercase />
        <Card>
          <Stack gap="3">
            <Text size="body-sm" color="dim">
              Upload files and track progress. Cancel in-flight uploads or remove completed ones.
            </Text>
            <FileUpload
              accept="image/*,.pdf,.zip,.txt"
              multiple
              maxSize={25 * 1024 * 1024}
              onFilesChange={setUploadFiles}
            />
          </Stack>
        </Card>

        {uploadFiles.length > 0 && (
          <Text size="micro" color="dim">
            Total: {uploadFiles.length} | Uploading:{" "}
            {uploadFiles.filter((f) => f.status === "uploading").length} | Completed:{" "}
            {uploadFiles.filter((f) => f.status === "completed").length}
          </Text>
        )}
      </Stack>
    </Container>
  );
}
