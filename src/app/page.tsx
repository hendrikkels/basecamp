"use client";

import {
  Heading,
  Card,
  Text,
  Button,
  Container,
  Stack,
  Row,
  Navbar,
  ThemeToggle,
  Badge,
  BlockStrip,
  Avatar,
  Ticker,
  Link,
} from "@/components/custom";
import { Box } from "@/components/primitives";
import pageStyles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Navbar>
        <Navbar.Brand href="/" meta="v0.1">basecamp</Navbar.Brand>
        <Navbar.Links>
          <Navbar.Link href="/" active>Home</Navbar.Link>
          <Navbar.Link href="/design-system">Design System</Navbar.Link>
          <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
          <Navbar.Link href="/sidebar-demo">App Shell</Navbar.Link>
        </Navbar.Links>
        <Navbar.Actions>
          <ThemeToggle />
        </Navbar.Actions>
      </Navbar>

      {/* Hero */}
      <Box _position="relative" _overflow="hidden">
        <Box
          _position="absolute"
          _top="-40px"
          _right="-120px"
          _fontFamily="var(--mono)"
          _fontSize="200px"
          _color="var(--surface-1)"
          _letterSpacing="-0.1em"
          _transform="rotate(-12deg)"
          _pointerEvents="none"
          _userSelect="none"
          _opacity="0.6"
          _zIndex="0"
        >
        </Box>
        <Container>
          <Box _padding="80px 0" _position="relative" _zIndex="1">
            <Box className={pageStyles.heroGrid}>
              <Box>
                <Box _display="flex" _alignItems="center" _gap="14px" _marginBottom="32px">
                  <Text size="micro" color="dim">Design System</Text>
                  <BlockStrip filled={4} total={6} />
                </Box>
                <Heading variant="display-xl" level={1}>
                  The room is on<span style={{ display: "inline-block", width: "0.2em", height: "0.2em", background: "var(--acc)", marginLeft: "0.05em", verticalAlign: "0.06em" }} />
                </Heading>
                <Text size="body-lg" color="muted" _marginTop="24px" _maxWidth="44ch">
                  A retro-futurist design system built for creative tools, personal dashboards, and focused workspaces. Block aesthetics meet modern engineering.
                </Text>
                <Stack direction="horizontal" gap="3" _marginTop="32px">
                  <Link href="/design-system" variant="unstyled">
                    <Button variant="primary" size="lg">View Design System</Button>
                  </Link>
                </Stack>
              </Box>

              {/* Hero widget */}
              <Card variant="frost" _alignSelf="stretch" _minHeight="280px" _display="flex" _flexDirection="column">
                <Text size="micro" color="primary" _marginBottom="14px">▰▰ Now</Text>
                <Heading variant="subheading" level={2}>System Status</Heading>
                <Text size="caption" color="muted" _marginBottom="16px">All services operational</Text>
                <Stack gap="2" _marginTop="auto">
                  <Box _display="flex" _justifyContent="space-between" _paddingTop="6px" _borderTop="1px solid var(--hairline)">
                    <Text size="micro" color="dim">Uptime</Text>
                    <Text size="caption" weight="medium">99.94%</Text>
                  </Box>
                  <Box _display="flex" _justifyContent="space-between" _paddingTop="6px" _borderTop="1px solid var(--hairline)">
                    <Text size="micro" color="dim">Latency</Text>
                    <Text size="caption" weight="medium">142ms</Text>
                  </Box>
                  <Box _display="flex" _justifyContent="space-between" _paddingTop="6px" _borderTop="1px solid var(--hairline)">
                    <Text size="micro" color="dim">Components</Text>
                    <Text size="caption" weight="medium" color="primary">34</Text>
                  </Box>
                  <Box _display="flex" _justifyContent="space-between" _paddingTop="6px" _borderTop="1px solid var(--hairline)">
                    <Text size="micro" color="dim">Tokens</Text>
                    <Text size="caption" weight="medium">128</Text>
                  </Box>
                </Stack>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Ticker */}
      <Container>
        <Ticker
          items={[
            { label: "Stack", value: "Next.js 16 · React 19 · TypeScript" },
            { label: "Styling", value: "CSS Modules · Tokens" },
            { label: "Direction", value: "Block / Retro", color: "var(--acc)" },
          ]}
        />
      </Container>

      {/* Section: Features */}
      <Container>
        <Box _padding="96px 0 32px">
          <Box className={pageStyles.sectionGrid}>
            <Heading variant="display-l" level={2} color="default">01</Heading>
            <Box>
              <Heading variant="display-s" level={2}>Built from scratch</Heading>
              <Text size="body-lg" color="muted" _marginTop="8px" _maxWidth="60ch">
                No shadcn, no Chakra, no external UI libraries. Every component is hand-built with full control over behavior and styling.
              </Text>
            </Box>
          </Box>

          <Row columns={3} gap="4">
            <Card variant="block">
              <Heading variant="subheading" level={3} _marginBottom="8px">Primitives</Heading>
              <Text size="caption" color="muted">
                Every HTML element wrapped as a typed React component. Full native prop access with underscore-prefixed CSS-as-props.
              </Text>
              <Box _marginTop="16px"><Badge color="primary-soft">Foundation</Badge></Box>
            </Card>
            <Card variant="block">
              <Heading variant="subheading" level={3} _marginBottom="8px">Custom Components</Heading>
              <Text size="caption" color="muted">
                Opinionated styled components extending primitives. Typed variant props mapped to CSS Module classes using design tokens.
              </Text>
              <Box _marginTop="16px"><Badge color="secondary-soft">34 Components</Badge></Box>
            </Card>
            <Card variant="block">
              <Heading variant="subheading" level={3} _marginBottom="8px">Token System</Heading>
              <Text size="caption" color="muted">
                Single source of truth for colors, spacing, typography. Dark/light mode switches all variables instantly via data-theme.
              </Text>
              <Box _marginTop="16px"><Badge color="success">128 Tokens</Badge></Box>
            </Card>
          </Row>
        </Box>
      </Container>

      {/* Section: Screens */}
      <Container>
        <Box _padding="64px 0">
          <Box className={pageStyles.sectionGrid}>
            <Heading variant="display-l" level={2} color="default">02</Heading>
            <Box>
              <Heading variant="display-s" level={2}>Full-stack screens</Heading>
              <Text size="body-lg" color="muted" _marginTop="8px">
                Complete page layouts built entirely from the component library.
              </Text>
            </Box>
          </Box>

          <Row columns={3} gap="4">
            <Link href="/dashboard" variant="unstyled">
              <Card variant="frost" _cursor="pointer" _height="100%">
                <Text size="micro" color="primary" _marginBottom="8px">Screen</Text>
                <Heading variant="subheading" level={3}>Dashboard</Heading>
                <Text size="caption" color="muted" _marginTop="4px">
                  KPIs, charts, data tables, widgets.
                </Text>
                <Text size="caption" color="primary" _marginTop="16px">→ /dashboard</Text>
              </Card>
            </Link>
            <Link href="/sidebar-demo" variant="unstyled">
              <Card variant="frost" _cursor="pointer" _height="100%">
                <Text size="micro" color="primary" _marginBottom="8px">Screen</Text>
                <Heading variant="subheading" level={3}>App Shell</Heading>
                <Text size="caption" color="muted" _marginTop="4px">
                  Sidebar navigation with content area.
                </Text>
                <Text size="caption" color="primary" _marginTop="16px">→ /sidebar-demo</Text>
              </Card>
            </Link>
            <Link href="/design-system" variant="unstyled">
              <Card variant="frost" _cursor="pointer" _height="100%">
                <Text size="micro" color="primary" _marginBottom="8px">Screen</Text>
                <Heading variant="subheading" level={3}>Design System</Heading>
                <Text size="caption" color="muted" _marginTop="4px">
                  Component showcase and token reference.
                </Text>
                <Text size="caption" color="primary" _marginTop="16px">→ /design-system</Text>
              </Card>
            </Link>
          </Row>
        </Box>
      </Container>

      {/* Footer */}
      <Box _borderTop="1px solid var(--rule)" _marginTop="64px">
        <Container>
          <Box _padding="32px 0" _display="flex" _justifyContent="space-between" _alignItems="center">
            <Box _display="flex" _alignItems="center" _gap="12px">
              <BlockStrip filled={3} total={4} />
              <Text size="caption" color="dim">basecamp · design system · 2026</Text>
            </Box>
            <Stack direction="horizontal" gap="4" align="center">
              <Avatar size="sm" color="primary" round>HV</Avatar>
              <Text size="caption" color="muted">Built by Hendrik</Text>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
