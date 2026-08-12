"use client";

import {
  Heading,
  Text,
  Stack,
  Card,
  Divider,
} from "@/components/custom";

export default function ApiPage() {
  return (
    <Stack gap="6">
      <Stack gap="2">
        <Text size="micro" color="dim">Workspace / API Integration</Text>
        <Heading variant="heading" level={1}>API Integration</Heading>
      </Stack>
      <Card variant="block">
        <Stack gap="3">
          <Heading variant="subheading" level={3}>2 pending issues</Heading>
          <Text size="caption" color="muted">Rate limiting needs configuration for the new endpoints.</Text>
          <Divider spacing="sm" />
          <Text size="caption" color="muted">Authentication token refresh flow needs testing.</Text>
        </Stack>
      </Card>
    </Stack>
  );
}
