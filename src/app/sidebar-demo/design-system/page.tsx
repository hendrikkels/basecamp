"use client";

import {
  Heading,
  Text,
  Stack,
  Card,
  Progress,
} from "@/components/custom";

export default function DesignSystemPage() {
  return (
    <Stack gap="6">
      <Stack gap="2">
        <Text size="micro" color="dim">Workspace / Design System</Text>
        <Heading variant="heading" level={1}>Design System</Heading>
      </Stack>
      <Card variant="default">
        <Stack gap="3">
          <Text size="body" color="muted">Component library progress</Text>
          <Progress value={92} />
          <Text size="caption" color="dim">34 of 37 components complete</Text>
        </Stack>
      </Card>
    </Stack>
  );
}
