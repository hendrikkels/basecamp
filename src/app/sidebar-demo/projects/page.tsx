"use client";

import {
  Heading,
  Text,
  Stack,
  Badge,
  DataTable,
} from "@/components/custom";

export default function ProjectsPage() {
  return (
    <Stack gap="6">
      <Stack gap="2">
        <Text size="micro" color="dim">Navigation / Projects</Text>
        <Heading variant="heading" level={1}>Projects</Heading>
      </Stack>
      <DataTable>
        <DataTable.Head>
          <DataTable.Row>
            <DataTable.Th>Project</DataTable.Th>
            <DataTable.Th>Status</DataTable.Th>
            <DataTable.Th numeric>Progress</DataTable.Th>
          </DataTable.Row>
        </DataTable.Head>
        <DataTable.Body>
          <DataTable.Row>
            <DataTable.Td>Design System</DataTable.Td>
            <DataTable.Td><Badge color="success" dot>Active</Badge></DataTable.Td>
            <DataTable.Td numeric>92%</DataTable.Td>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Td>API v2</DataTable.Td>
            <DataTable.Td><Badge color="primary-soft" dot>In Progress</Badge></DataTable.Td>
            <DataTable.Td numeric>64%</DataTable.Td>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Td>Mobile App</DataTable.Td>
            <DataTable.Td><Badge color="warn" dot>Planning</Badge></DataTable.Td>
            <DataTable.Td numeric>12%</DataTable.Td>
          </DataTable.Row>
        </DataTable.Body>
      </DataTable>
    </Stack>
  );
}
