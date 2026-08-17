"use client";

import { useState } from "react";
import {
  Heading,
  Text,
  Stack,
  Card,
  Tabs,
  Field,
  Switch,
  RadioGroup,
  Badge,
  Breadcrumbs,
} from "@/components/custom";

export default function PreferencesPage() {
  const [tab, setTab] = useState("general");
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(false);
  const [theme, setTheme] = useState("dark");

  return (
    <Stack gap="6">
      <Stack gap="3">
        <Breadcrumbs uppercase>
          <Breadcrumbs.Item href="/sidebar-demo">Settings</Breadcrumbs.Item>
          <Breadcrumbs.Item current>Preferences</Breadcrumbs.Item>
        </Breadcrumbs>
        <Heading variant="heading" level={1}>Preferences</Heading>
      </Stack>

      <Tabs value={tab} onChange={setTab}>
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="notifications" count="3">Notifications</Tabs.Tab>
          <Tabs.Tab value="appearance">Appearance</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general">
          <Card>
            <Stack gap="5">
              <Stack gap="2">
                <Text size="body-lg">Language</Text>
                <Text size="body" color="muted">Select your preferred display language.</Text>
              </Stack>
              <Field>
                <Field.Input placeholder="English (US)" />
              </Field>
              <Stack gap="2">
                <Text size="body-lg">Timezone</Text>
                <Text size="body" color="muted">Used for scheduling and date display.</Text>
              </Stack>
              <Field>
                <Field.Input placeholder="UTC+2 (Africa/Johannesburg)" />
              </Field>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="notifications">
          <Card>
            <Stack gap="5">
              <Stack direction="horizontal" gap="4" align="center">
                <Stack gap="1" _flex="1">
                  <Text size="body-lg">Push notifications</Text>
                  <Text size="body" color="muted">Receive alerts for important updates.</Text>
                </Stack>
                <Switch checked={notifications} onChange={setNotifications} />
              </Stack>
              <Stack direction="horizontal" gap="4" align="center">
                <Stack gap="1" _flex="1">
                  <Text size="body-lg">Sound effects</Text>
                  <Text size="body" color="muted">Play sounds for notifications and actions.</Text>
                </Stack>
                <Switch checked={sounds} onChange={setSounds} />
              </Stack>
              <Stack direction="horizontal" gap="4" align="center">
                <Stack gap="1" _flex="1">
                  <Text size="body-lg">Email digest</Text>
                  <Text size="body" color="muted">Weekly summary of activity.</Text>
                </Stack>
                <Badge color="info">Coming soon</Badge>
              </Stack>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="appearance">
          <Card>
            <Stack gap="5">
              <Stack gap="2">
                <Text size="body-lg">Theme</Text>
                <Text size="body" color="muted">Choose your preferred color scheme.</Text>
              </Stack>
              <RadioGroup value={theme} onChange={setTheme} direction="horizontal">
                <RadioGroup.Item value="dark">Dark</RadioGroup.Item>
                <RadioGroup.Item value="light">Light</RadioGroup.Item>
                <RadioGroup.Item value="system">System</RadioGroup.Item>
              </RadioGroup>
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
