"use client";

import { useState } from "react";
import styles from "./page.module.css";
import {
  Heading,
  Card,
  Text,
  Button,
  Container,
  Stack,
  Row,
  Badge,
  Divider,
  SectionHead,
  Field,
  Checkbox,
  Radio,
  Switch,
  RadioGroup,
  CheckboxGroup,
  Select,
  MultiSelect,
  Tabs,
  Alert,
  Avatar,
  Breadcrumbs,
  Progress,
  Skeleton,
  Spinner,
  DotsLoader,
  DataTable,
  Tooltip,
  KpiTile,
  EmptyState,
  BlockStrip,
  Chart,
  Modal,
  useAlert,
  Icon,
  TextStrip,
} from "@/components/custom";
import { Box } from "@/components/primitives";

export default function DesignSystem() {
  const [formSelectVal, setFormSelectVal] = useState("");
  const [selectVal, setSelectVal] = useState("");
  const [multiSelectVal, setMultiSelectVal] = useState<string[]>([]);
  const [radioVal, setRadioVal] = useState("a");
  const [checkVals, setCheckVals] = useState(["one"]);
  const [tabVal, setTabVal] = useState("colors");
  const [modalOpen, setModalOpen] = useState(false);
  const [switchA, setSwitchA] = useState(true);
  const [switchB, setSwitchB] = useState(false);
  const [emailVal, setEmailVal] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const alert = useAlert();

  return (
    <>
      <Container>
        <Stack gap="8" _paddingTop="32px" _paddingBottom="80px">
          {/* Hero */}
          <Box _paddingBottom="48px" _borderBottom="1px solid var(--rule)">
            <Box
              _display="flex"
              _alignItems="center"
              _gap="12px"
              _marginBottom="20px"
            >
              <TextStrip items={["Design System", "Block / Retro"]} />
            </Box>
            <Heading variant="display-l" level={1}>
              Component <span style={{ color: "var(--acc)" }}>Library</span>
            </Heading>
            <Text
              size="body-lg"
              color="muted"
              _marginTop="16px"
              _maxWidth="60ch"
            >
              A complete inventory of every primitive and custom component in
              the system. All styles reference design tokens for
              single-source-of-truth theming.
            </Text>
          </Box>

          {/* Colors */}
          <SectionHead number="01" title="Colors" accent="tokens" />
          <Row columns="6" gap="2">
            {[
              {
                name: "bg",
                bg: "var(--bg)",
                color: "var(--text)",
                border: true,
              },
              {
                name: "surface-0",
                bg: "var(--surface-0)",
                color: "var(--text)",
              },
              {
                name: "surface-1",
                bg: "var(--surface-1)",
                color: "var(--text)",
              },
              {
                name: "surface-2",
                bg: "var(--surface-2)",
                color: "var(--text)",
              },
              {
                name: "surface-3",
                bg: "var(--surface-3)",
                color: "var(--text)",
              },
              {
                name: "surface-4",
                bg: "var(--surface-4)",
                color: "var(--text)",
              },
            ].map((s) => (
              <Box
                key={s.name}
                _background={s.bg}
                _color={s.color}
                _height="80px"
                _borderRadius="var(--r-xs)"
                _padding="10px 12px"
                _display="flex"
                _flexDirection="column"
                _justifyContent="space-between"
                _fontSize="10px"
                _border={s.border ? "1px solid var(--hairline)" : undefined}
              >
                <Text size="micro">{s.name}</Text>
              </Box>
            ))}
          </Row>
          <Row columns="6" gap="2">
            {[
              { name: "acc", bg: "var(--acc)", color: "var(--acc-on)" },
              { name: "acc-2", bg: "var(--acc-2)", color: "var(--acc-2-on)" },
              {
                name: "danger",
                bg: "var(--danger)",
                color: "var(--danger-on)",
              },
              { name: "warn", bg: "var(--warn)", color: "var(--warn-on)" },
              { name: "info", bg: "var(--info)", color: "var(--info-on)" },
              {
                name: "success",
                bg: "var(--success)",
                color: "var(--success-on)",
              },
            ].map((s) => (
              <Box
                key={s.name}
                _background={s.bg}
                _color={s.color}
                _height="80px"
                _borderRadius="var(--r-xs)"
                _padding="10px 12px"
                _display="flex"
                _flexDirection="column"
                _justifyContent="space-between"
                _fontSize="10px"
              >
                <Text size="micro" _color="inherit">
                  {s.name}
                </Text>
              </Box>
            ))}
          </Row>

          <Divider />

          {/* Typography */}
          <SectionHead number="02" title="Typography"/>
          <Stack gap="4">
            <Box
              className={`${styles.typographyRow} ${styles.typographyRowBordered}`}
            >
              <Text size="micro" color="dim">
                Display XL
              </Text>
              <Heading variant="display-xl" level={2}>
                Aa
              </Heading>
              <Text size="micro" color="dim" _textAlign="right">
                120px / Bold
              </Text>
            </Box>
            <Box
              className={`${styles.typographyRow} ${styles.typographyRowBordered}`}
            >
              <Text size="micro" color="dim">
                Display L
              </Text>
              <Heading variant="display-l" level={2}>
                BaseCamp
              </Heading>
              <Text size="micro" color="dim" _textAlign="right">
                88px / Bold
              </Text>
            </Box>
            <Box
              className={`${styles.typographyRow} ${styles.typographyRowBordered}`}
            >
              <Text size="micro" color="dim">
                Display M
              </Text>
              <Heading variant="display-m" level={2}>
                Components
              </Heading>
              <Text size="micro" color="dim" _textAlign="right">
                56px / Bold
              </Text>
            </Box>
            <Box
              className={`${styles.typographyRow} ${styles.typographyRowBordered}`}
            >
              <Text size="micro" color="dim">
                Heading
              </Text>
              <Heading variant="heading" level={3}>
                Section heading
              </Heading>
              <Text size="micro" color="dim" _textAlign="right">
                28px / Bold
              </Text>
            </Box>
            <Box
              className={`${styles.typographyRow} ${styles.typographyRowBordered}`}
            >
              <Text size="micro" color="dim">
                Subheading
              </Text>
              <Heading variant="subheading" level={3}>
                Section subheading
              </Heading>
              <Text size="micro" color="dim" _textAlign="right">
                22px / Bold
              </Text>
            </Box>
            <Box
              className={`${styles.typographyRow} ${styles.typographyRowBordered}`}
            >
              <Text size="micro" color="dim">
                Body LG
              </Text>
              <Text size="body-lg">
                The quick brown fox jumps over the lazy dog.
              </Text>
              <Text size="micro" color="dim" _textAlign="right">
                16px / Regular
              </Text>
            </Box>
            <Box
              className={`${styles.typographyRow} ${styles.typographyRowBordered}`}
            >
              <Text size="micro" color="dim">
                Body
              </Text>
              <Text size="body">
                Default body text at 12px with JetBrains Mono.
              </Text>
              <Text size="micro" color="dim" _textAlign="right">
                12px / Regular
              </Text>
            </Box>
            <Box className={styles.typographyRow}>
              <Text size="micro" color="dim">
                Micro
              </Text>
              <Text size="micro">Uppercase tracked label text</Text>
              <Text size="micro" color="dim" _textAlign="right">
                10px / Medium
              </Text>
            </Box>
          </Stack>

          <Divider />

          {/* Buttons */}
          <SectionHead number="03" title="Buttons"/>
          <Stack gap="4">
            <Stack direction="horizontal" gap="3" align="center" wrap>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="accent2">Accent 2</Button>
            </Stack>
            <Stack direction="horizontal" gap="3" align="center" wrap>
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="md">
                Medium
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </Stack>
          </Stack>

          <Divider />

          {/* Badges */}
          <SectionHead number="04" title="Badges"/>
          <Stack direction="horizontal" gap="2" wrap>
            <Badge>Default</Badge>
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="danger" dot>
              Danger
            </Badge>
            <Badge color="warn">Warning</Badge>
            <Badge color="info">Info</Badge>
            <Badge color="success" dot>
              Success
            </Badge>
          </Stack>
          <Stack direction="horizontal" gap="2" wrap>
            <Badge color="default-soft">Default Soft</Badge>
            <Badge color="primary-soft">Primary Soft</Badge>
            <Badge color="secondary-soft">Secondary Soft</Badge>
            <Badge color="danger-soft">Danger Soft</Badge>
            <Badge color="warn-soft">Warn Soft</Badge>
            <Badge color="info-soft">Info Soft</Badge>
            <Badge color="success-soft">Success Soft</Badge>
          </Stack>

          <Divider />

          {/* Cards */}
          <SectionHead number="05" title="Cards"/>
          <Row columns="3" gap="4">
            <Card variant="default" title="Default" titleVariant="heading">
              <Text color="muted">
                Standard surface card.
              </Text>
            </Card>
            <Card variant="frost" title="Frost" titleVariant="heading">
              <Text color="muted">
                Frosted glass backdrop blur.
              </Text>
            </Card>
            <Card variant="block" title="Block" titleVariant="heading">
              <Text color="muted">
                Accent bar indicator.
              </Text>
            </Card>
          </Row>

          <Divider />

          {/* Form Controls */}
          <SectionHead number="06" title="Form Controls"/>
          <Row columns="2" gap="4">
            <Stack gap="4">
              <Field>
                <Field.Label htmlFor="ds-input" required>
                  Input
                </Field.Label>
                <Field.Input id="ds-input" placeholder="Type here..." />
                <Field.Hint>Helper text below input.</Field.Hint>
              </Field>
              <Field>
                <Field.Label htmlFor="ds-email" required>
                  Email
                </Field.Label>
                <Field.Input
                  id="ds-email"
                  type="email"
                  placeholder="you@example.com"
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  error={
                    emailTouched &&
                    emailVal.length > 0 &&
                    !emailVal.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
                  }
                />
                {emailTouched &&
                  emailVal.length > 0 &&
                  !emailVal.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && (
                    <Field.Error>
                      Please enter a valid email address.
                    </Field.Error>
                  )}
              </Field>
              <Field>
                <Field.Label htmlFor="ds-ta">Textarea</Field.Label>
                <Field.Textarea id="ds-ta" placeholder="Multi-line..." />
              </Field>
              <Select
                label="Dropdown"
                value={formSelectVal}
                onChange={setFormSelectVal}
                placeholder="Select option"
              >
                <Select.Option value="one">Option One</Select.Option>
                <Select.Option value="two">Option Two</Select.Option>
                <Select.Option value="three">Option Three</Select.Option>
              </Select>
            </Stack>
            <Stack gap="4">
              <Card variant="default" padding="sm" title="Radiogroup" titleVariant="micro">
                <RadioGroup value={radioVal} onChange={(v) => setRadioVal(v)}>
                  <RadioGroup.Item value="a">Option A</RadioGroup.Item>
                  <RadioGroup.Item value="b">Option B</RadioGroup.Item>
                  <RadioGroup.Item value="c">Option C</RadioGroup.Item>
                </RadioGroup>
              </Card>
              <Card variant="default" padding="sm" title="CheckboxGroup" titleVariant="micro">
                <CheckboxGroup value={checkVals} onChange={setCheckVals}>
                  <CheckboxGroup.Item value="one">Checked</CheckboxGroup.Item>
                  <CheckboxGroup.Item value="two">Unchecked</CheckboxGroup.Item>
                  <CheckboxGroup.Item value="three" disabled>
                    Disabled
                  </CheckboxGroup.Item>
                </CheckboxGroup>
              </Card>
              <Card variant="default" padding="sm" title="Switches" titleVariant="micro">
                <Stack direction="horizontal" gap="4" align="center">
                  <Switch checked={switchA} onChange={setSwitchA}>
                    Enabled
                  </Switch>
                  <Switch
                    disabled={true}
                    checked={switchB}
                    onChange={setSwitchB}
                  >
                    Disabled
                  </Switch>
                </Stack>
              </Card>
            </Stack>
          </Row>

          <Divider />

          {/* Dropdowns */}
          <SectionHead number="07" title="Dropdowns"/>
          <Row columns="2" gap="4">
            <Card variant="default" padding="sm" title="Single Select" titleVariant="micro">
              <Select
                value={selectVal}
                onChange={setSelectVal}
                placeholder="Choose a framework"
              >
                <Select.Option value="next" icon={<Icon name="arrow" />}>
                  Next.js
                </Select.Option>
                <Select.Option value="remix" icon={<Icon name="diamond" />}>
                  Remix
                </Select.Option>
                <Select.Option value="astro" icon={<Icon name="star" />}>
                  Astro
                </Select.Option>
                <Select.Option value="svelte" disabled>
                  SvelteKit (N/A)
                </Select.Option>
              </Select>
              <Text color="dim" _marginTop="8px">
                Selected: {selectVal || "none"}
              </Text>
            </Card>
            <Card variant="default" padding="sm" title="Multi Select" titleVariant="micro">
              <MultiSelect
                value={multiSelectVal}
                onChange={setMultiSelectVal}
                placeholder="Select technologies"
              >
                <MultiSelect.Option value="react">React</MultiSelect.Option>
                <MultiSelect.Option value="typescript">
                  TypeScript
                </MultiSelect.Option>
                <MultiSelect.Option value="tailwind">
                  Tailwind
                </MultiSelect.Option>
                <MultiSelect.Option value="node">Node.js</MultiSelect.Option>
              </MultiSelect>
              <Text color="dim" _marginTop="8px">
                Selected: {multiSelectVal.join(", ") || "none"}
              </Text>
            </Card>
          </Row>

          <Divider />

          {/* Charts */}
          <SectionHead number="08" title="Charts" accent="recharts"/>
          <Stack gap="4">
            <Row columns="2" gap="4">
              <Chart
                variant="line"
                title="Line Chart"
                height={160}
                data={[
                  { name: "Jan", value: 120, secondary: 80 },
                  { name: "Feb", value: 180, secondary: 110 },
                  { name: "Mar", value: 150, secondary: 95 },
                  { name: "Apr", value: 240, secondary: 160 },
                  { name: "May", value: 320, secondary: 200 },
                  { name: "Jun", value: 280, secondary: 180 },
                ]}
                datasets={[
                  { key: "value", name: "Primary" },
                  { key: "secondary", name: "Secondary" },
                ]}
                showLegend
              />
              <Chart
                variant="bar"
                title="Bar Chart"
                height={160}
                data={[
                  { name: "Q1", revenue: 4200, costs: 2800 },
                  { name: "Q2", revenue: 5100, costs: 3100 },
                  { name: "Q3", revenue: 4700, costs: 2900 },
                  { name: "Q4", revenue: 6200, costs: 3400 },
                ]}
                datasets={[
                  { key: "revenue", name: "Revenue" },
                  { key: "costs", name: "Costs", color: "var(--surface-4)" },
                ]}
                showLegend
              />
            </Row>
            <Chart
              variant="area"
              title="Area Chart"
              height={140}
              data={[
                { name: "00:00", load: 12 },
                { name: "04:00", load: 8 },
                { name: "08:00", load: 35 },
                { name: "12:00", load: 62 },
                { name: "16:00", load: 78 },
                { name: "20:00", load: 45 },
                { name: "24:00", load: 15 },
              ]}
              datasets={[{ key: "load", name: "System Load %" }]}
            />
          </Stack>

          <Divider />

          {/* Modal */}
          <SectionHead number="09" title="Modal"/>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setModalOpen(true)}
          >
            Open Modal
          </Button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Confirm Action">
            <Modal.Description>
              This action cannot be undone. Are you sure you want to proceed?
            </Modal.Description>
            <Modal.Actions>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setModalOpen(false)}
              >
                Confirm
              </Button>
            </Modal.Actions>
          </Modal>

          <Divider />

          {/* Alerts */}
          <SectionHead number="10" title="Alerts"/>
          <Stack gap="3">
            <Alert severity="info" title="Information">
              Informational message for the user.
            </Alert>
            <Alert severity="success" title="Success">
              Operation completed successfully.
            </Alert>
            <Alert severity="warn" title="Warning">
              Something needs your attention.
            </Alert>
            <Alert severity="danger" title="Error" dismissible>
              A critical error occurred.
            </Alert>
          </Stack>

          <Text size="micro" color="dim" _marginTop="16px" _marginBottom="8px">
            Notification System (useAlert)
          </Text>
          <Stack direction="horizontal" gap="3" align="center">
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                alert.show({
                  severity: "success",
                  title: "Auto-dismiss",
                  message: "This notification will disappear after 4 seconds.",
                })
              }
            >
              Show Auto-Dismiss Alert
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                alert.show({
                  severity: "warn",
                  title: "Persistent",
                  message: "This notification stays until you dismiss it.",
                  persistent: true,
                })
              }
            >
              Show Persistent Alert
            </Button>
          </Stack>

          <Divider />

          {/* Avatars */}
          <SectionHead number="11" title="Avatars"/>
          <Stack direction="horizontal" gap="3" align="center" wrap>
            <Avatar size="sm">SM</Avatar>
            <Avatar size="md">MD</Avatar>
            <Avatar size="lg">LG</Avatar>
            <Avatar color="primary" round>
              AC
            </Avatar>
            <Avatar color="secondary" round presence>
              ON
            </Avatar>
          </Stack>

          <Divider />

          {/* Progress, Loaders & Empty State */}
          <SectionHead number="12" title="Progress, Loaders & Empty State"/>
          <Stack gap="4">
            <Stack gap="2">
              <Text size="micro" color="dim">
                Loaders
              </Text>
              <Stack direction="horizontal" gap="5" align="center">
                <Spinner />
                <DotsLoader />
                <BlockStrip filled={6} total={10} />
              </Stack>
            </Stack>
            <Stack gap="2">
              <Text size="micro" color="dim">
                Progress
              </Text>
              <Progress value={72} />
            </Stack>
            <Stack gap="2">
              <Text size="micro" color="dim">
                Skeletons
              </Text>
              <Stack direction="horizontal" gap="2">
                <Skeleton height="12px" width="100%" />
                <Skeleton height="12px" width="75%" />
              </Stack>
            </Stack>
            <Stack gap="2">
              <Text size="micro" color="dim">
                Empty state
              </Text>
              <EmptyState
                glyph="[ ? ]"
                title="No results"
                description="Try adjusting your search or filters to find what you're looking for."
              >
                <Button variant="secondary" size="sm">
                  Clear Filters
                </Button>
              </EmptyState>
            </Stack>
          </Stack>

          <Divider />

          {/* Data Table */}
          <SectionHead number="13" title="Data Table"/>
          <DataTable>
            <DataTable.Head>
              <DataTable.Row>
                <DataTable.Th>Component</DataTable.Th>
                <DataTable.Th>Category</DataTable.Th>
                <DataTable.Th>Status</DataTable.Th>
                <DataTable.Th numeric>Props</DataTable.Th>
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              <DataTable.Row>
                <DataTable.Td>Button</DataTable.Td>
                <DataTable.Td>Interactive</DataTable.Td>
                <DataTable.Td>
                  <Badge color="success" dot>
                    Complete
                  </Badge>
                </DataTable.Td>
                <DataTable.Td numeric>3</DataTable.Td>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Td>Select</DataTable.Td>
                <DataTable.Td>Form</DataTable.Td>
                <DataTable.Td>
                  <Badge color="success" dot>
                    Complete
                  </Badge>
                </DataTable.Td>
                <DataTable.Td numeric>7</DataTable.Td>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Td>Chart</DataTable.Td>
                <DataTable.Td>Data Viz</DataTable.Td>
                <DataTable.Td>
                  <Badge color="success" dot>
                    Complete
                  </Badge>
                </DataTable.Td>
                <DataTable.Td numeric>9</DataTable.Td>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Td>Modal</DataTable.Td>
                <DataTable.Td>Overlay</DataTable.Td>
                <DataTable.Td>
                  <Badge color="success" dot>
                    Complete
                  </Badge>
                </DataTable.Td>
                <DataTable.Td numeric>4</DataTable.Td>
              </DataTable.Row>
            </DataTable.Body>
          </DataTable>

          <Divider />

          {/* Tooltip & Breadcrumbs */}
          <SectionHead number="14" title="Navigation"/>
          <Stack gap="4">
            <Breadcrumbs>
              <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
              <Breadcrumbs.Item href="/design-system">
                Design System
              </Breadcrumbs.Item>
              <Breadcrumbs.Item current>Components</Breadcrumbs.Item>
            </Breadcrumbs>
            <Stack direction="horizontal" gap="4" align="center">
              <Tooltip content="Top tooltip">
                <Button variant="secondary" size="sm">
                  Tooltip (top)
                </Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" position="bottom">
                <Button variant="outline" size="sm">
                  Tooltip (bottom)
                </Button>
              </Tooltip>
            </Stack>
          </Stack>

          <Divider />

          {/* KPI */}
          <SectionHead number="15" title="KPI"/>
          <Row columns="3" gap="4">
            <KpiTile
              label="Revenue"
              value="$42.8"
              unit="k"
              delta="+12%"
              deltaDirection="up"
            />
            <KpiTile
              label="Users"
              value="1,284"
              delta="-3%"
              deltaDirection="down"
            />
            <KpiTile
              label="Uptime"
              value="99.9"
              unit="%"
              delta="+0.1%"
              deltaDirection="up"
            />
          </Row>
        </Stack>
      </Container>
    </>
  );
}
