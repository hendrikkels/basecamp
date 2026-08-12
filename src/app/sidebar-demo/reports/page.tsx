"use client";

import {
  Heading,
  Text,
  Stack,
  Button,
  EmptyState,
} from "@/components/custom";

export default function ReportsPage() {
  return (
    <Stack gap="6">
      <Stack gap="2">
        <Text size="micro" color="dim">Navigation / Reports</Text>
        <Heading variant="heading" level={1}>Reports</Heading>
      </Stack>
      <EmptyState
        glyph="[ ◇ ]"
        title="No reports generated"
        description="Generate your first report to see data insights here."
      >
        <Button variant="primary" size="sm">Generate Report</Button>
      </EmptyState>
    </Stack>
  );
}
