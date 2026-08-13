"use client";

import {
  Heading,
  Text,
  Stack,
  Row,
  Card,
  Avatar,
} from "@/components/custom";

export default function TeamPage() {
  return (
    <Stack gap="6">
      <Stack gap="2">
        <Text size="micro" color="dim">Settings / Team</Text>
        <Heading variant="heading" level={1}>Team</Heading>
      </Stack>
      <Row columns="3" gap="3">
        <Card variant="default" padding="sm">
          <Stack gap="2" align="center">
            <Avatar color="primary" round>HV</Avatar>
            <Text weight="medium">Hendrik</Text>
            <Text color="dim">Engineer</Text>
          </Stack>
        </Card>
        <Card variant="default" padding="sm">
          <Stack gap="2" align="center">
            <Avatar color="secondary" round>AB</Avatar>
            <Text weight="medium">Alice</Text>
            <Text color="dim">Designer</Text>
          </Stack>
        </Card>
        <Card variant="default" padding="sm">
          <Stack gap="2" align="center">
            <Avatar round>CD</Avatar>
            <Text weight="medium">Charlie</Text>
            <Text color="dim">Product</Text>
          </Stack>
        </Card>
      </Row>
    </Stack>
  );
}
