"use client";

import {
  Heading,
  Card,
  Text,
  Button,
  Container,
  Stack,
  Row,
  Badge,
  BlockStrip,
  Avatar,
  Ticker,
  Link,
  TextStrip,
} from "@/components/custom";
import { Box } from "@/components/primitives";
import pageStyles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Box _position="relative" _overflow="hidden">
        <Box
          _position="absolute"
          _top="-40px"
          _right="-120px"
          _fontFamily="var(--mono)"
          _fontSize="200px"
          _color="var(--surface-1)"
          _letterSpacing="var(--ls-xx-tight)"
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
                <Heading variant="display-xl" level={1}>
                  Build Something <span style={{ color: "var(--acc)" }}>Great</span>
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
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Ticker */}
      <Container>
        <Ticker
          items={[
            { label: "Stack", values: ["Next.js 16", "React 19", "TypeScript"] },
            { label: "Styling", values: ["CSS Modules", "Tokens"] },
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

          <Row columns="3" gap="4">
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

          <Row columns="3" gap="4">
            <Card variant="frost" _height="100%">
              <Text size="micro" color="primary" _marginBottom="8px">Screen</Text>
              <Heading variant="subheading" level={3}>Dashboard</Heading>
              <Text size="caption" color="muted" _marginTop="4px">
                KPIs, charts, data tables, widgets.
              </Text>
              <Text size="caption" _marginTop="16px"><Link href="/dashboard" variant="muted" arrow>/dashboard</Link></Text>
            </Card>
            <Card variant="frost" _height="100%">
              <Text size="micro" color="primary" _marginBottom="8px">Screen</Text>
              <Heading variant="subheading" level={3}>App Shell</Heading>
              <Text size="caption" color="muted" _marginTop="4px">
                Sidebar navigation with content area.
              </Text>
              <Text size="caption" _marginTop="16px"><Link href="/sidebar-demo" variant="muted" arrow>/sidebar-demo</Link></Text>
            </Card>
            <Card variant="frost" _height="100%">
              <Text size="micro" color="primary" _marginBottom="8px">Screen</Text>
              <Heading variant="subheading" level={3}>Design System</Heading>
              <Text size="caption" color="muted" _marginTop="4px">
                Component showcase and token reference.
              </Text>
              <Text size="caption" _marginTop="16px"><Link href="/design-system" variant="muted" arrow>/design-system</Link></Text>
            </Card>
          </Row>
        </Box>
      </Container>

      {/* Footer */}
      <Box _borderTop="1px solid var(--rule)" _marginTop="64px">
        <Container>
          <Box _padding="32px 0" _display="flex" _justifyContent="space-between" _alignItems="center">
            <Box _display="flex" _alignItems="center" _gap="12px">
              <TextStrip items={["BaseCamp", "design system", "2026"]} />
            </Box>
            <Stack direction="horizontal" gap="4" align="center">
              <Avatar size="sm" color="primary" round>HV</Avatar>
              <Text size="caption" color="muted">Hendrik van Heerden</Text>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
