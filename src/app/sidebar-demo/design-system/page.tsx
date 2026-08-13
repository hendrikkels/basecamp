"use client";

import {
  Heading,
  Text,
  Stack,
  Card,
  Progress,
  Divider,
} from "@/components/custom";

export default function DesignSystemPage() {
  return (
    <Stack gap="6">
      <Stack gap="2">
        <Text size="micro" color="dim">Workspace / Design System</Text>
        <Heading variant="heading" level={1}>Design System</Heading>
      </Stack>
      <Card variant="default" title="Component library progress" titleVariant="subheading">
        <Divider spacing="sm" />
        <Stack gap="3">
          <Text size="caption" color="dim">34 of 37 components complete</Text>
                    <Progress value={92} />
        </Stack>
      </Card>
    </Stack>
  );
}
