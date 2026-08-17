"use client";

import {
  Heading,
  Stack,
  Button,
  EmptyState,
  Breadcrumbs,
} from "@/components/custom";

export default function ReportsPage() {
  return (
    <Stack gap="6">
      <Stack gap="3">
        <Breadcrumbs>
          <Breadcrumbs.Item href="/sidebar-demo">Navigation</Breadcrumbs.Item>
          <Breadcrumbs.Item current>Reports</Breadcrumbs.Item>
        </Breadcrumbs>
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
