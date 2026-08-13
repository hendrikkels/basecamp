"use client";

import {
  Heading,
  Text,
  Stack,
  Card,
} from "@/components/custom";

export default function PreferencesPage() {
  return (
    <Stack gap="6">
      <Stack gap="2">
        <Text size="micro" color="dim">Settings / Preferences</Text>
        <Heading variant="heading" level={1}>Preferences</Heading>
      </Stack>
      <Card variant="block">
        <Text size="body" color="muted">
          Application preferences and configuration options would live here.
        </Text>
      </Card>
    </Stack>
  );
}
