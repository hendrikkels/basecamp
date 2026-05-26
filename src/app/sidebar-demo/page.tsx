"use client";

import { useState } from "react";
import {
  Navbar,
  ThemeToggle,
  Sidebar,
  Badge,
  Avatar,
  Heading,
  Text,
  Card,
  Stack,
  Row,
  KpiTile,
  Button,
  Icon,
  Chart,
  DataTable,
  EmptyState,
  Divider,
  Progress,
  MenuToggle,
} from "@/components/custom";
import { Box } from "@/components/primitives";
import sidebarStyles from "./sidebar-demo.module.css";

type Page = "dashboard" | "projects" | "analytics" | "reports" | "design-system" | "api" | "docs" | "preferences" | "team";

export default function SidebarDemo() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box _display="flex" _flexDirection="column" _height="100vh" _overflow="hidden">
      <Navbar>
        <Navbar.Brand href="/" meta="v0.1">BaseCamp</Navbar.Brand>
        <Navbar.Links>
          <Navbar.Link href="/">Home</Navbar.Link>
          <Navbar.Link href="/design-system">Design System</Navbar.Link>
          <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
          <Navbar.Link href="/sidebar-demo" active>App Shell</Navbar.Link>
        </Navbar.Links>
        <Navbar.Actions>
          <ThemeToggle />
        </Navbar.Actions>
      </Navbar>

      <Box _display="flex" _flex="1" _minHeight="0">
        {sidebarOpen && <Box className={sidebarStyles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />}
        <Box className={`${sidebarStyles.sidebar} ${sidebarOpen ? sidebarStyles.sidebarOpen : ""}`}>
          <Sidebar>
            <Sidebar.Group label="Navigation">
              <Sidebar.Item icon={<Icon name="diamondFill" />} active={activePage === "dashboard"} onClick={() => setActivePage("dashboard")}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item icon={<Icon name="diamond" />} active={activePage === "projects"} onClick={() => setActivePage("projects")} badge={<Badge color="primary-soft">3</Badge>}>
                Projects
              </Sidebar.Item>
              <Sidebar.Item icon={<Icon name="triangle" />} active={activePage === "analytics"} onClick={() => setActivePage("analytics")}>
                Analytics
              </Sidebar.Item>
              <Sidebar.Item icon={<Icon name="circle" />} active={activePage === "reports"} onClick={() => setActivePage("reports")}>
                Reports
              </Sidebar.Item>
            </Sidebar.Group>

            <Sidebar.Group label="Workspace" action={<Icon name="plus" color="muted" size="sm" />}>
              <Sidebar.Item icon={<Icon name="block" />} active={activePage === "design-system"} onClick={() => setActivePage("design-system")}>
                Design System
              </Sidebar.Item>
              <Sidebar.Item icon={<Icon name="block" />} active={activePage === "api"} onClick={() => setActivePage("api")} badge={<Badge color="warn" dot>2</Badge>}>
                API Integration
              </Sidebar.Item>
              <Sidebar.Item icon={<Icon name="block" />} active={activePage === "docs"} onClick={() => setActivePage("docs")}>
                Documentation
              </Sidebar.Item>
            </Sidebar.Group>

            <Sidebar.Group label="Settings">
              <Sidebar.Item icon={<Icon name="gear" />} active={activePage === "preferences"} onClick={() => setActivePage("preferences")}>
                Preferences
              </Sidebar.Item>
              <Sidebar.Item icon={<Icon name="circleFill" />} active={activePage === "team"} onClick={() => setActivePage("team")}>
                Team
              </Sidebar.Item>
            </Sidebar.Group>

            <Sidebar.Footer>
              <Box
                _display="flex"
                _alignItems="center"
                _gap="10px"
                _padding="10px 12px"
                _background="var(--surface-1)"
                _borderRadius="var(--r-xs)"
                _cursor="pointer"
              >
                <Avatar size="sm" color="primary" round>HV</Avatar>
                <Box>
                  <Text size="caption" color="default">Hendrik</Text>
                  <Text size="caption" color="dim">Engineer</Text>
                </Box>
              </Box>
            </Sidebar.Footer>
          </Sidebar>
        </Box>

        <Box _flex="1" _overflow="auto" _padding="32px">
          <PageContent page={activePage} />
        </Box>
        <MenuToggle variant="fab" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar" />
      </Box>
    </Box>
  );
}

function PageContent({ page }: { page: Page }) {
  switch (page) {
    case "dashboard":
      return (
        <Stack gap="6">
          <Stack gap="2">
            <Text size="micro" color="dim">Navigation / Dashboard</Text>
            <Heading variant="heading" level={1}>Overview</Heading>
          </Stack>
          <Row columns={3} gap="4">
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

    case "projects":
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

    case "analytics":
      return (
        <Stack gap="6">
          <Stack gap="2">
            <Text size="micro" color="dim">Navigation / Analytics</Text>
            <Heading variant="heading" level={1}>Analytics</Heading>
          </Stack>
          <Row columns={2} gap="4">
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

    case "reports":
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

    case "design-system":
      return (
        <Stack gap="6">
          <Stack gap="2">
            <Text size="micro" color="dim">Workspace / Design System</Text>
            <Heading variant="heading" level={1}>Design System</Heading>
          </Stack>
          <Card variant="default">
            <Stack gap="3">
              <Text size="body" color="muted">Component library progress</Text>
              <Progress value={92} />
              <Text size="caption" color="dim">34 of 37 components complete</Text>
            </Stack>
          </Card>
        </Stack>
      );

    case "api":
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

    case "docs":
      return (
        <Stack gap="6">
          <Stack gap="2">
            <Text size="micro" color="dim">Workspace / Documentation</Text>
            <Heading variant="heading" level={1}>Documentation</Heading>
          </Stack>
          <Card variant="default">
            <Text size="body" color="muted">
              Documentation pages are built from the component library. Each component includes usage examples, prop tables, and accessibility notes.
            </Text>
          </Card>
        </Stack>
      );

    case "preferences":
      return (
        <Stack gap="6">
          <Stack gap="2">
            <Text size="micro" color="dim">Settings / Preferences</Text>
            <Heading variant="heading" level={1}>Preferences</Heading>
          </Stack>
          <Card variant="default">
            <Text size="body" color="muted">
              Application preferences and configuration options would live here.
            </Text>
          </Card>
        </Stack>
      );

    case "team":
      return (
        <Stack gap="6">
          <Stack gap="2">
            <Text size="micro" color="dim">Settings / Team</Text>
            <Heading variant="heading" level={1}>Team</Heading>
          </Stack>
          <Row columns={3} gap="3">
            <Card variant="default" padding="sm">
              <Stack gap="2" align="center">
                <Avatar color="primary" round>HV</Avatar>
                <Text size="caption" weight="medium">Hendrik</Text>
                <Text size="caption" color="dim">Engineer</Text>
              </Stack>
            </Card>
            <Card variant="default" padding="sm">
              <Stack gap="2" align="center">
                <Avatar color="secondary" round>AB</Avatar>
                <Text size="caption" weight="medium">Alice</Text>
                <Text size="caption" color="dim">Designer</Text>
              </Stack>
            </Card>
            <Card variant="default" padding="sm">
              <Stack gap="2" align="center">
                <Avatar round>CD</Avatar>
                <Text size="caption" weight="medium">Charlie</Text>
                <Text size="caption" color="dim">Product</Text>
              </Stack>
            </Card>
          </Row>
        </Stack>
      );
  }
}
