"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  Badge,
  Avatar,
  Text,
  Icon,
  MenuToggle,
} from "@/components/custom";
import { Box } from "@/components/primitives";
import sidebarStyles from "./sidebar-demo.module.css";

export default function SidebarDemoLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === `/sidebar-demo/${path}`;

  return (
    <Box _display="flex" _flex="1">
      {sidebarOpen && <Box className={sidebarStyles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />}
      <Box className={`${sidebarStyles.sidebar} ${sidebarOpen ? sidebarStyles.sidebarOpen : ""}`}>
        <Sidebar>
            <Sidebar.Group label="Navigation">
              <Sidebar.Item icon={<Icon name="diamondFill" />} active={isActive("dashboard")} href="/sidebar-demo/dashboard">
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item icon={<Icon name="diamond" />} active={isActive("projects")} href="/sidebar-demo/projects" badge={<Badge color="primary-soft">3</Badge>}>
                Projects
              </Sidebar.Item>
              <Sidebar.Item icon={<Icon name="triangle" />} active={isActive("analytics")} href="/sidebar-demo/analytics">
                Analytics
              </Sidebar.Item>
              <Sidebar.Item icon={<Icon name="circle" />} active={isActive("reports")} href="/sidebar-demo/reports">
                Reports
              </Sidebar.Item>
            </Sidebar.Group>

            <Sidebar.Group label="Workspace" action={<Icon name="plus" color="muted" size="sm" />}>
              <Sidebar.Item icon={<Icon name="block" />} active={isActive("open-issues")} href="/sidebar-demo/open-issues">
                Open Issues
              </Sidebar.Item>
              <Sidebar.Item icon={<Icon name="block" />} active={isActive("api")} href="/sidebar-demo/api" badge={<Badge color="warn" dot>2</Badge>}>
                API Integration
              </Sidebar.Item>
              <Sidebar.Item icon={<Icon name="block" />} active={isActive("docs")} href="/sidebar-demo/docs">
                Documentation
              </Sidebar.Item>
            </Sidebar.Group>

            <Sidebar.Group label="Settings">
              <Sidebar.Item icon={<Icon name="gear" />} active={isActive("preferences")} href="/sidebar-demo/preferences">
                Preferences
              </Sidebar.Item>
              <Sidebar.Item icon={<Icon name="circleFill" />} active={isActive("team")} href="/sidebar-demo/team">
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
                  <Text>Hendrik</Text>
                  <Text color="dim">Engineer</Text>
                </Box>
              </Box>
            </Sidebar.Footer>
          </Sidebar>
      </Box>

      <Box _flex="1" _overflow="auto" _padding="32px">
        {children}
      </Box>
      <MenuToggle variant="fab" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar" />
    </Box>
  );
}
