"use client";

import {
  Navbar,
  ThemeToggle,
  Badge,
  Heading,
  Text,
  Card,
  Stack,
  Row,
  KpiTile,
  Button,
  Chart,
  DataTable,
  Divider,
  BlockStrip,
  Container,
  StatusStrip,
  Widget,
  CalendarStrip,
  HabitGrid,
  StatRow,
  Icon,
} from "@/components/custom";
import { Box } from "@/components/primitives";
import dashStyles from "./dashboard.module.css";

const visitData = [
  { name: "May 1", visits: 1420, unique: 980 },
  { name: "May 5", visits: 1680, unique: 1120 },
  { name: "May 9", visits: 1540, unique: 1040 },
  { name: "May 13", visits: 2100, unique: 1480 },
  { name: "May 17", visits: 1890, unique: 1320 },
  { name: "May 20", visits: 2340, unique: 1640 },
  { name: "May 24", visits: 2680, unique: 1890 },
];

const revenueData = [
  { name: "Jan", revenue: 4200, costs: 2800 },
  { name: "Feb", revenue: 3800, costs: 2400 },
  { name: "Mar", revenue: 5100, costs: 3100 },
  { name: "Apr", revenue: 4700, costs: 2900 },
  { name: "May", revenue: 6200, costs: 3400 },
];

export default function Dashboard() {
  return (
    <>
      <Navbar>
        <Navbar.Brand href="/" meta="v0.1">basecamp</Navbar.Brand>
        <Navbar.Links>
          <Navbar.Link href="/">Home</Navbar.Link>
          <Navbar.Link href="/design-system">Design System</Navbar.Link>
          <Navbar.Link href="/dashboard" active>Dashboard</Navbar.Link>
          <Navbar.Link href="/sidebar-demo">App Shell</Navbar.Link>
        </Navbar.Links>
        <Navbar.Actions>
          <ThemeToggle />
        </Navbar.Actions>
      </Navbar>

      <Container>
        <Stack gap="6" _paddingTop="32px" _paddingBottom="80px">
          {/* Hero header */}
          <Box _display="flex" _justifyContent="space-between" _alignItems="flex-end" _paddingBottom="24px" _marginBottom="28px" _borderBottom="1px solid var(--rule)">
            <Box>
              <Box _display="flex" _alignItems="center" _gap="12px" _marginBottom="12px">
                <BlockStrip filled={3} total={4} />
                <Text size="micro" color="dim">Sunday · May 24, 2026 · 04:18 PM · New York</Text>
              </Box>
              <Heading variant="display-m" level={1}>
                Good evening, <span style={{ color: "var(--muted)" }}>Hendrik.</span>
              </Heading>
            </Box>
            <Stack direction="horizontal" gap="3" align="center">
              <Button variant="secondary" size="sm"><Icon name="link" size="sm" /> Export</Button>
            </Stack>
          </Box>

          {/* Status strip */}
          <StatusStrip
            leading={<BlockStrip filled={3} total={4} />}
            items={[
              { label: "Online", value: "Yes", color: "var(--success)" },
              { label: "Uptime", value: "99.94%" },
              { label: "P95", value: "142ms" },
              { label: "Last Deploy", value: "a72f01 · T-04:18" },
            ]}
            trailing={<Text size="caption" color="primary" _cursor="pointer">View Logs →</Text>}
          />

          {/* KPI Row */}
          <Row columns={4} gap="4">
            <KpiTile label="Visitors · 7d" value="12,840" delta="+18.4%" deltaDirection="up" />
            <KpiTile label="Posts · YTD" value="047" delta="+34%" deltaDirection="up" />
            <KpiTile label="Avg Read" value="4:18" unit="m" delta="+8%" deltaDirection="up" />
            <KpiTile label="Subscribers" value="1,284" delta="+12%" deltaDirection="up" />
          </Row>

          <Divider spacing="lg" />

          {/* Main grid: chart + side widgets */}
          <Box className={dashStyles.dashGrid}>
            {/* Left column */}
            <Stack gap="6">
              {/* Featured chart */}
              <Chart
                variant="area"
                title="Visits · last 30 days"
                height={220}
                data={visitData}
                datasets={[
                  { key: "visits", name: "Total Visits" },
                  { key: "unique", name: "Unique", color: "var(--acc-2)" },
                ]}
                showLegend
              />

              {/* Revenue chart */}
              <Chart
                variant="bar"
                title="Revenue vs Costs"
                height={180}
                data={revenueData}
                datasets={[
                  { key: "revenue", name: "Revenue" },
                  { key: "costs", name: "Costs", color: "var(--surface-4)" },
                ]}
                showLegend
              />

              {/* Activity table */}
              <Card variant="default" padding="none">
                <Box _padding="16px 20px" _borderBottom="1px solid var(--hairline)" _display="flex" _alignItems="center" _gap="12px">
                  <Heading variant="subheading" level={3}>Recent Activity</Heading>
                </Box>
                <DataTable>
                  <DataTable.Head>
                    <DataTable.Row>
                      <DataTable.Th>Title</DataTable.Th>
                      <DataTable.Th>Type</DataTable.Th>
                      <DataTable.Th>Status</DataTable.Th>
                      <DataTable.Th numeric>Views</DataTable.Th>
                    </DataTable.Row>
                  </DataTable.Head>
                  <DataTable.Body>
                    <DataTable.Row>
                      <DataTable.Td>Building a Design System</DataTable.Td>
                      <DataTable.Td><Badge>Post</Badge></DataTable.Td>
                      <DataTable.Td><Badge color="success" dot>Published</Badge></DataTable.Td>
                      <DataTable.Td numeric>2,841</DataTable.Td>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Td>Component Architecture Notes</DataTable.Td>
                      <DataTable.Td><Badge>Note</Badge></DataTable.Td>
                      <DataTable.Td><Badge color="primary-soft" dot>Draft</Badge></DataTable.Td>
                      <DataTable.Td numeric>—</DataTable.Td>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Td>Weekly Recap #47</DataTable.Td>
                      <DataTable.Td><Badge>Post</Badge></DataTable.Td>
                      <DataTable.Td><Badge color="success" dot>Published</Badge></DataTable.Td>
                      <DataTable.Td numeric>1,204</DataTable.Td>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Td>API Integration Guide</DataTable.Td>
                      <DataTable.Td><Badge>Post</Badge></DataTable.Td>
                      <DataTable.Td><Badge color="warn" dot>Scheduled</Badge></DataTable.Td>
                      <DataTable.Td numeric>—</DataTable.Td>
                    </DataTable.Row>
                    <DataTable.Row>
                      <DataTable.Td>Token System Changelog</DataTable.Td>
                      <DataTable.Td><Badge>Note</Badge></DataTable.Td>
                      <DataTable.Td><Badge color="success" dot>Published</Badge></DataTable.Td>
                      <DataTable.Td numeric>892</DataTable.Td>
                    </DataTable.Row>
                  </DataTable.Body>
                </DataTable>
              </Card>
            </Stack>

            {/* Right column — widget shelf */}
            <Stack gap="5">
              <Box _display="flex" _alignItems="center" _gap="12px">
                <Heading variant="subheading" level={3}>Widgets</Heading>
                <Text size="micro" color="primary">Live</Text>
              </Box>

              <Widget label="This Week">
                <CalendarStrip
                  days={[
                    { date: 19, label: "M", dots: 2 },
                    { date: 20, label: "T", dots: 1 },
                    { date: 21, label: "W", dots: 3 },
                    { date: 22, label: "T" },
                    { date: 23, label: "F", dots: 1 },
                    { date: 24, label: "S" },
                    { date: 25, label: "S", isToday: true, dots: 1 },
                  ]}
                />
              </Widget>

              <Widget variant="frost" label="Now Playing" accent={<Icon name="play" size="sm" color="primary" />}>
                <Heading variant="subheading" level={4}>Ambient Focus</Heading>
                <Text size="caption" color="muted" _marginTop="4px">Deep work playlist · 2:14:08</Text>
                <Box _display="flex" _gap="10px" _alignItems="center" _marginTop="14px" _padding="8px" _background="var(--surface-2)" _borderRadius="var(--r-xs)">
                  <Icon name="play" size="lg" color="primary" />
                  <Box>
                    <Text size="caption">Brian Eno — Music for Airports</Text>
                    <Text size="caption" color="dim">Ambient 1</Text>
                  </Box>
                </Box>
              </Widget>

              <Widget label="Habits · 30d" accent="92%">
                <HabitGrid
                  cells={[
                    ...Array(22).fill("filled" as const),
                    ...Array(5).fill("partial" as const),
                    ...Array(3).fill("empty" as const),
                  ]}
                />
              </Widget>

              <Widget label="Quick Stats">
                <Stack gap="3">
                  <StatRow label="Words written" value="48,219" />
                  <StatRow label="Streak" value="14 days" color="primary" />
                  <StatRow label="Avg session" value="42m" />
                </Stack>
              </Widget>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
