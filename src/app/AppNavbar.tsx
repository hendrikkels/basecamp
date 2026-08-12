"use client";

import { usePathname } from "next/navigation";
import { Navbar, ThemeToggle } from "@/components/custom";

const links = [
  { href: "/", label: "Home" },
  { href: "/design-system", label: "Design System" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/sidebar-demo", label: "App Shell" },
];

export function AppNavbar() {
  const pathname = usePathname();

  return (
    <Navbar>
      <Navbar.Brand href="/" meta="v0.1">BaseCamp</Navbar.Brand>
      <Navbar.Actions>
        <ThemeToggle />
      </Navbar.Actions>
      <Navbar.Links>
        {links.map((link) => (
          <Navbar.Link
            key={link.href}
            href={link.href}
            active={link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)}
          >
            {link.label}
          </Navbar.Link>
        ))}
      </Navbar.Links>
    </Navbar>
  );
}
