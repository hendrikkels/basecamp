"use client";

import { useState } from "react";
import {
  Heading,
  Text,
  Stack,
  Row,
  Card,
  Button,
  Badge,
  Divider,
  SectionHead,
  Breadcrumbs,
  Field,
  Select,
  MultiSelect,
  RadioGroup,
  DataTable,
  Modal,
  Alert,
  KpiTile,
  StatusStrip,
  StatRow,
  Progress,
  Tooltip,
  EmptyState,
  useAlert,
  Icon,
} from "@/components/custom";
import { Box } from "@/components/primitives";

const ISSUES = [
  { id: "BC-142", title: "Implement dark mode toggle persistence", priority: "high", status: "in-progress", assignee: "Hendrik", created: "Aug 8" },
  { id: "BC-141", title: "Fix modal backdrop blur on Safari", priority: "critical", status: "open", assignee: "Sarah", created: "Aug 7" },
  { id: "BC-140", title: "Add keyboard navigation to Select", priority: "medium", status: "open", assignee: "Unassigned", created: "Aug 6" },
  { id: "BC-139", title: "Tokenize remaining hardcoded colors", priority: "low", status: "open", assignee: "Hendrik", created: "Aug 5" },
  { id: "BC-138", title: "DataTable sort by column", priority: "medium", status: "in-progress", assignee: "James", created: "Aug 4" },
  { id: "BC-137", title: "Responsive sidebar collapse animation", priority: "high", status: "open", assignee: "Sarah", created: "Aug 3" },
  { id: "BC-136", title: "Add Chart tooltip formatting", priority: "low", status: "closed", assignee: "James", created: "Aug 1" },
];

const PRIORITY_BADGE: Record<string, { color: "danger" | "warn" | "info" | "default"; label: string }> = {
  critical: { color: "danger", label: "Critical" },
  high: { color: "warn", label: "High" },
  medium: { color: "info", label: "Medium" },
  low: { color: "default", label: "Low" },
};

const STATUS_BADGE: Record<string, { color: "success" | "primary" | "default"; label: string }> = {
  open: { color: "primary", label: "Open" },
  "in-progress": { color: "success", label: "In Progress" },
  closed: { color: "default", label: "Closed" },
};

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDesc, setIssueDesc] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [issueType, setIssueType] = useState("feature");
  const alert = useAlert();

  const filteredIssues = ISSUES.filter(
    (issue) =>
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    setModalOpen(false);
    alert.show({ severity: "success", title: "Issue created", message: `"${issueTitle || "Untitled"}" has been added to the backlog.` });
    setIssueTitle("");
    setIssueDesc("");
    setPriority("");
    setAssignee("");
    setLabels([]);
    setIssueType("feature");
  };

  return (
    <Stack gap="6">
      {/* Header */}
      <Stack gap="3">
        <Breadcrumbs>
          <Breadcrumbs.Item href="/sidebar-demo">Workspace</Breadcrumbs.Item>
          <Breadcrumbs.Item current>Open Issues</Breadcrumbs.Item>
        </Breadcrumbs>
        <Heading variant="heading" level={1}>Open Issues</Heading>
        <Text size="body-lg" color="muted" _maxWidth="72ch">
          Track and manage open issues across the project. Search, filter, and create new items from this view.
        </Text>
      </Stack>

      {/* Status strip */}
      <StatusStrip>
        <StatusStrip.Item label="Total">7</StatusStrip.Item>
        <StatusStrip.Item label="Open" color="primary">4</StatusStrip.Item>
        <StatusStrip.Item label="In Progress" color="success">2</StatusStrip.Item>
        <StatusStrip.Item label="Closed" color="dim">1</StatusStrip.Item>
      </StatusStrip>

      {/* KPIs */}
      <Row columns="3" gap="4">
        <KpiTile label="Open Issues" value="4" delta="+2" deltaDirection="up" />
        <KpiTile label="Avg Resolution" value="3.2" unit="d" delta="-18%" deltaDirection="down" />
        <KpiTile label="Sprint Velocity" value="14" unit="pts" delta="+4%" deltaDirection="up" />
      </Row>

      <Divider />

      {/* Open Items Section */}
      <SectionHead size="micro" title="Open Items" accent={`${filteredIssues.length} issues`} uppercase />

      {/* Search + Actions bar */}
      <Box _display="flex" _gap="8px" _alignItems="center" _flexWrap="wrap">
        <Box _flex="1" _minWidth="200px">
          <Field>
            <Field.Input
              placeholder="Search by title or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Field>
        </Box>
        <Button variant="tertiary" iconLeft="search">Search</Button>
        <Button variant="primary" iconLeft="plus" onClick={() => setModalOpen(true)}>New Issue</Button>
      </Box>

      {/* Data Table */}
      <Card variant="default" padding="none">
        {filteredIssues.length > 0 ? (
          <DataTable>
            <DataTable.Head>
              <DataTable.Row>
                <DataTable.Th>ID</DataTable.Th>
                <DataTable.Th>Title</DataTable.Th>
                <DataTable.Th>Priority</DataTable.Th>
                <DataTable.Th>Status</DataTable.Th>
                <DataTable.Th>Assignee</DataTable.Th>
                <DataTable.Th>
                  <Tooltip content="Date the issue was created">Created</Tooltip>
                </DataTable.Th>
              </DataTable.Row>
            </DataTable.Head>
            <DataTable.Body>
              {filteredIssues.map((issue) => (
                <DataTable.Row key={issue.id}>
                  <DataTable.Td>
                    <Text size="micro" color="primary">{issue.id}</Text>
                  </DataTable.Td>
                  <DataTable.Td>{issue.title}</DataTable.Td>
                  <DataTable.Td>
                    <Badge color={PRIORITY_BADGE[issue.priority].color}>
                      {PRIORITY_BADGE[issue.priority].label}
                    </Badge>
                  </DataTable.Td>
                  <DataTable.Td>
                    <Badge color={STATUS_BADGE[issue.status].color}>
                      {STATUS_BADGE[issue.status].label}
                    </Badge>
                  </DataTable.Td>
                  <DataTable.Td>{issue.assignee}</DataTable.Td>
                  <DataTable.Td>
                    <Text size="body-sm" color="dim">{issue.created}</Text>
                  </DataTable.Td>
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable>
        ) : (
          <EmptyState
            glyph="[ ◇ ]"
            title="No issues found"
            description="Try adjusting your search to find what you're looking for."
          />
        )}
      </Card>

      <Divider />

      {/* Sprint Status */}
      <SectionHead size="micro" title="Sprint Progress" accent="Sprint 14" />

      <Alert severity="info" title="Testing ground">
        This page is a living test for the design system. All data shown here is mock data used to validate component rendering and interaction patterns.
      </Alert>

      <Row columns="2" gap="4">
        <Card variant="frost" padding="sm">
          <Card.Header title="Sprint Metrics" titleVariant="subheading" />
          <Stack gap="2">
            <StatRow label="Planned" value="18 pts" />
            <StatRow label="Completed" value="14 pts" color="success" />
            <StatRow label="Carried Over" value="4 pts" color="warn" />
            <StatRow label="Bugs Found" value="3" color="danger" bordered />
            <StatRow label="Days Remaining" value="2" />
          </Stack>
          <Box _marginTop="16px">
            <Text size="micro" color="dim" _marginBottom="6px">Completion</Text>
            <Progress value={78} />
          </Box>
        </Card>

        <Card variant="default" padding="sm">
          <Card.Header title="Team Availability" titleVariant="subheading" />
          <Stack gap="2">
            <StatRow label="Hendrik" value="Available" color="success" />
            <StatRow label="Sarah" value="In Meeting" color="warn" />
            <StatRow label="James" value="Available" color="success" />
            <StatRow label="Alex" value="Out of Office" color="danger" bordered />
          </Stack>
          <Card.Footer>
            <Button variant="tertiary" size="sm" iconLeft="mail" _marginRight="auto">Message All</Button>
            <Button variant="ghost" size="sm" iconOnly><Icon name="refresh" size="sm" /></Button>
          </Card.Footer>
        </Card>
      </Row>

      {/* Create Issue Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create New Issue" size="wide">
        <Modal.Description>
          Fill out the details below to create a new issue. Required fields are marked with an asterisk.
        </Modal.Description>

        <Stack gap="4" _marginTop="16px">
          <Field>
            <Field.Label required htmlFor="issue-title">Title</Field.Label>
            <Field.Input
              id="issue-title"
              placeholder="Brief description of the issue"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
            />
            <Field.Hint>Keep it concise — you can elaborate in the description.</Field.Hint>
          </Field>

          <Field>
            <Field.Label htmlFor="issue-desc">Description</Field.Label>
            <Field.Textarea
              id="issue-desc"
              placeholder="Provide additional context, steps to reproduce, or acceptance criteria..."
              value={issueDesc}
              onChange={(e) => setIssueDesc(e.target.value)}
              rows={4}
            />
          </Field>

          <Row columns="2" gap="4">
            <Field>
              <Field.Label>Priority</Field.Label>
              <Select value={priority} onChange={setPriority} placeholder="Select priority">
                <Select.Option value="critical" icon={<Icon name="dot" size="sm" color="danger" />}>Critical</Select.Option>
                <Select.Option value="high" icon={<Icon name="dot" size="sm" color="warn" />}>High</Select.Option>
                <Select.Option value="medium" icon={<Icon name="dot" size="sm" color="info" />}>Medium</Select.Option>
                <Select.Option value="low">Low</Select.Option>
              </Select>
            </Field>

            <Field>
              <Field.Label>Assignee</Field.Label>
              <Select value={assignee} onChange={setAssignee} placeholder="Assign to...">
                <Select.Group label="Engineering">
                  <Select.Option value="hendrik">Hendrik</Select.Option>
                  <Select.Option value="sarah">Sarah</Select.Option>
                  <Select.Option value="james">James</Select.Option>
                </Select.Group>
                <Select.Group label="Design">
                  <Select.Option value="alex">Alex</Select.Option>
                </Select.Group>
              </Select>
            </Field>
          </Row>

          <Field>
            <Field.Label>Labels</Field.Label>
            <MultiSelect value={labels} onChange={setLabels} placeholder="Add labels...">
              <MultiSelect.Option value="bug">Bug</MultiSelect.Option>
              <MultiSelect.Option value="feature">Feature</MultiSelect.Option>
              <MultiSelect.Option value="enhancement">Enhancement</MultiSelect.Option>
              <MultiSelect.Option value="documentation">Documentation</MultiSelect.Option>
              <MultiSelect.Option value="ui">UI</MultiSelect.Option>
            </MultiSelect>
          </Field>

          <Field>
            <Field.Label>Type</Field.Label>
            <RadioGroup value={issueType} onChange={setIssueType}>
              <RadioGroup.Item value="bug">Bug Report</RadioGroup.Item>
              <RadioGroup.Item value="feature">Feature Request</RadioGroup.Item>
              <RadioGroup.Item value="task">Task</RadioGroup.Item>
            </RadioGroup>
          </Field>

          <Field>
            <Field.Label htmlFor="issue-due">Due Date</Field.Label>
            <Field.Input id="issue-due" type="date" />
            <Field.Hint>Optional — leave blank if no deadline.</Field.Hint>
          </Field>
        </Stack>

        <Modal.Actions>
          <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="primary" iconLeft="check" onClick={handleSubmit}>Create Issue</Button>
        </Modal.Actions>
      </Modal>
    </Stack>
  );
}
