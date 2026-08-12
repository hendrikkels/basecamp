"use client";

import {
  Heading,
  Text,
  Stack,
  Row,
  Chart,
} from "@/components/custom";

export default function AnalyticsPage() {
  return (
    <Stack gap="6">
      <Stack gap="2">
        <Text size="micro" color="dim">Navigation / Analytics</Text>
        <Heading variant="heading" level={1}>Analytics</Heading>
      </Stack>
      <Row columns="2" gap="4">
        <Chart
          variant="line"
          title="User Growth"
          height={160}
          data={[
            { name: "Jan", users: 120 },
            { name: "Feb", users: 180 },
            { name: "Mar", users: 240 },
            { name: "Apr", users: 320 },
            { name: "May", users: 480 },
          ]}
          datasets={[{ key: "users", name: "Users" }]}
        />
        <Chart
          variant="bar"
          title="Revenue by Quarter"
          height={160}
          data={[
            { name: "Q1", revenue: 4200 },
            { name: "Q2", revenue: 5800 },
            { name: "Q3", revenue: 4900 },
            { name: "Q4", revenue: 7200 },
          ]}
          datasets={[{ key: "revenue", name: "Revenue" }]}
        />
      </Row>
    </Stack>
  );
}
