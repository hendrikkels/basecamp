"use client";

import {
  Heading,
  Stack,
  Row,
  KpiTile,
  Chart,
  Breadcrumbs,
} from "@/components/custom";

export default function DashboardPage() {
  return (
    <Stack gap="6">
      <Stack gap="3">
        <Breadcrumbs uppercase>
          <Breadcrumbs.Item href="/sidebar-demo">Navigation</Breadcrumbs.Item>
          <Breadcrumbs.Item current>Dashboard</Breadcrumbs.Item>
        </Breadcrumbs>
        <Heading variant="heading" level={1}>Overview</Heading>
      </Stack>
      <Row columns="3" gap="4">
        <KpiTile label="Revenue" value="$42.8" unit="k" delta="+12.4%" deltaDirection="up" />
        <KpiTile label="Active Users" value="1,284" delta="-3.2%" deltaDirection="down" />
        <KpiTile label="Uptime" value="99.9" unit="%" delta="+0.1%" deltaDirection="up" />
      </Row>
      <Chart
        variant="area"
        title="Weekly Traffic"
        height={180}
        data={[
          { name: "Mon", visits: 420 },
          { name: "Tue", visits: 580 },
          { name: "Wed", visits: 520 },
          { name: "Thu", visits: 690 },
          { name: "Fri", visits: 750 },
          { name: "Sat", visits: 380 },
          { name: "Sun", visits: 290 },
        ]}
        datasets={[{ key: "visits", name: "Visits" }]}
      />
    </Stack>
  );
}
