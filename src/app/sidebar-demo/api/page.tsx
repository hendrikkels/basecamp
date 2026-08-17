"use client";

import {
  Heading,
  Stack,
  Card,
  DataTable,
  Badge,
  Breadcrumbs,
} from "@/components/custom";

export default function ApiPage() {
  return (
    <Stack gap="6">
      <Stack gap="3">
        <Breadcrumbs uppercase>
          <Breadcrumbs.Item href="/sidebar-demo">Workspace</Breadcrumbs.Item>
          <Breadcrumbs.Item current>API Integration</Breadcrumbs.Item>
        </Breadcrumbs>
        <Heading variant="heading" level={1}>API Integration</Heading>
      </Stack>
      <Card padding="none" title="2 pending issues" titleVariant="subheading">
        <DataTable>
          <DataTable.Head>
            <DataTable.Row>
              <DataTable.Th>Issue</DataTable.Th>
              <DataTable.Th>Area</DataTable.Th>
              <DataTable.Th>Priority</DataTable.Th>
            </DataTable.Row>
          </DataTable.Head>
          <DataTable.Body>
            <DataTable.Row>
              <DataTable.Td>Rate limiting needs configuration for new endpoints</DataTable.Td>
              <DataTable.Td><Badge color="default">Infrastructure</Badge></DataTable.Td>
              <DataTable.Td><Badge color="danger" dot>High</Badge></DataTable.Td>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Td>Authentication token refresh flow needs testing</DataTable.Td>
              <DataTable.Td><Badge color="default">Auth</Badge></DataTable.Td>
              <DataTable.Td><Badge color="warn" dot>Medium</Badge></DataTable.Td>
            </DataTable.Row>
          </DataTable.Body>
        </DataTable>
      </Card>
    </Stack>
  );
}
