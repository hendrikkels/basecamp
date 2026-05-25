# CLAUDE.md

You are an expert software engineer working on this codebase.

Your job is to build a high-quality web application using modern best practices, clean architecture, simple design, and maintainable code. Prioritize correctness, readability, modularity, testability, accessibility, security, and long-term maintainability.

## Project Overview

This is a Next.js 16 monolith application (frontend + backend in one repo) with a custom component architecture built from scratch. No external UI libraries (no shadcn, no Chakra, no MUI). We built our own layered component system.

## Component Architecture (Critical)

The project uses a two-layer component system:

### Layer 1: Primitives (`src/components/primitives/`)

Thin wrappers around every HTML element. Created via `createPrimitive(element, name)` factory.

- Expose ALL native HTML attributes for the underlying element
- Expose ALL CSS properties as typed props with `_` underscore prefix
- CSS props are applied as inline styles at runtime (prefix stripped)
- No opinions, no styling, no variants — just typed wrappers

```tsx
// Usage — underscore prefix for CSS props
<Box _display="flex" _gap="12px" _padding="24px" />
<Button onClick={fn} disabled _opacity={0.5} />
```

**Rules:**
- Every CSS-as-prop MUST use the `_` prefix (`_padding`, `_color`, `_marginTop`)
- The prefix is stripped at runtime before applying to the style attribute
- Native HTML props (onClick, disabled, id, className, aria-*, etc.) have NO prefix

### Layer 2: Custom Components (`src/components/custom/`)

Styled, opinionated components that extend primitives. These are the components used in page-level code.

- Accept typed props (variant, size, color, etc.) that map to CSS Module classes
- CSS Modules reference global CSS variables (tokens) — never hardcoded values
- Extend a primitive component internally
- Follow the same file pattern: `ComponentName.tsx`, `ComponentName.module.css`, `index.ts`

```tsx
// Usage — clean typed props, no var() in page code
<Heading variant="display-m" color="primary" level={1}>Title</Heading>
<Button variant="primary" size="md">Click</Button>
<Text size="body" color="muted" weight="medium">Hello</Text>
<Card variant="frost" padding="md">Content</Card>
```

**Rules:**
- Custom component typed props use semantic names that DON'T collide with HTML/CSS attributes
- Consumer code NEVER writes `var(--token)` — that's internal to CSS modules
- CSS module classes reference tokens: `color: var(--muted)`, never `color: #9a9aa1`
- Any style that maps to a design token MUST use the CSS variable
- Abstract/one-off styling (like specific px values for layout) can be hardcoded in component CSS
- Custom components can still accept `_` prefixed props for one-off layout overrides

### Compound Components

Complex components use dot-notation sub-components (see Navbar pattern):
```tsx
<Navbar>
  <Navbar.Brand href="/" meta="v0.1">basecamp</Navbar.Brand>
  <Navbar.Links>
    <Navbar.Link href="/" active>Dashboard</Navbar.Link>
  </Navbar.Links>
  <Navbar.Actions>{/* buttons */}</Navbar.Actions>
</Navbar>
```

## Design Token System (`src/styles/tokens.css`)

Single source of truth for all design values. Loaded globally via `globals.css`.

- Dark mode (default): `html[data-theme="dark"]` or `html:not([data-theme])`
- Light mode: `html[data-theme="light"]`
- Tokens: colors, surfaces, spacing (--sp-1 through --sp-9), radii, typography, z-index, easing, durations
- Typography: JetBrains Mono (body/UI), Arial Black (display headings)
- Accent colors: primary (--acc), secondary (--acc-2), danger, warn, info, success

**Critical rule:** If a CSS value corresponds to a token, it MUST use the CSS variable. Never hardcode token values in component CSS.

## Tailwind CSS

Tailwind v4 is installed and available but NOT used for component styling. It coexists for potential page-level utility use. Be aware that Tailwind's reset can interfere with `backdrop-filter` — set `--tw-backdrop-blur` and `--tw-backdrop-saturate` CSS variables alongside explicit `backdrop-filter` declarations.

## Implemented Custom Components

| Component | Variants/Props | File |
|-----------|---------------|------|
| Heading | variant (display-xl/l/m/s, heading, subheading), color, level | `custom/Heading/` |
| Text | size (body-lg/body/caption/micro), color, weight, align, transform | `custom/Text/` |
| Button | variant (primary/secondary/ghost/outline/destructive/accent2), size (sm/md/lg), iconOnly | `custom/Button/` |
| Card | variant (default/frost/block), padding (none/sm/md/lg) | `custom/Card/` |
| Container | size (narrow/default/full) | `custom/Container/` |
| Stack | direction (vertical/horizontal), gap (1-9), align, wrap | `custom/Stack/` |
| Row | columns (2-6), gap (1-6), responsive collapse | `custom/Row/` |
| Navbar | Compound: Brand, Links, Link (active, index), Actions | `custom/Navbar/` |
| ThemeToggle | Self-contained dark/light toggle with localStorage persistence | `custom/ThemeToggle/` |
| Field | Compound: Label (required), Input (error), Textarea (error), Hint, Error | `custom/Field/` |
| Badge | color (default/primary/primary-soft/secondary/secondary-soft/danger/danger-soft/warn/info/success/outline), dot | `custom/Badge/` |
| Divider | variant (default/thick), spacing (sm/md/lg) | `custom/Divider/` |
| SectionHead | number, title, accent | `custom/SectionHead/` |
| Checkbox | checked, onChange, disabled | `custom/Checkbox/` |
| Radio | checked, onChange, disabled | `custom/Radio/` |
| Switch | checked, onChange, disabled | `custom/Switch/` |
| RadioGroup | Compound: value, onChange, direction, gap. Item: value, disabled | `custom/RadioGroup/` |
| CheckboxGroup | Compound: value[], onChange, direction, gap. Item: value, disabled | `custom/CheckboxGroup/` |
| Tabs | Compound: value, onChange. List, Tab (value, count), Panel (value) | `custom/Tabs/` |
| Alert | severity (default/info/warn/danger/success), title, icon, dismissible | `custom/Alert/` |
| Avatar | size (sm/md/lg/xl), color (default/primary/secondary), round, presence | `custom/Avatar/` |
| Select | Compound: value, onChange, placeholder, error. Option (value, icon, disabled), Group (label) | `custom/Select/` |
| MultiSelect | Compound: value[], onChange, placeholder. Option (value, disabled), Group (label) | `custom/Select/` |
| Breadcrumbs | Compound: Item (href, current) — auto-inserts separators | `custom/Breadcrumbs/` |
| Progress | value (0-100) — animated bar | `custom/Progress/` |
| Skeleton | height, width — shimmer animation | `custom/Progress/` |
| Spinner | size — rotating border circle | `custom/Progress/` |
| DotsLoader | 3 pulsing dots | `custom/Progress/` |
| DataTable | Compound: Head, Body, Row (selected), Th (numeric), Td (numeric) | `custom/DataTable/` |
| Tooltip | content, position (top/bottom) — CSS-only hover | `custom/Tooltip/` |
| Modal | Compound: open, onClose. Title, Description, Actions — overlay with Escape/click-outside | `custom/Modal/` |
| KpiTile | label, value, unit, delta, deltaDirection (up/down), meta | `custom/KpiTile/` |
| EmptyState | glyph, title, description, children (actions) | `custom/EmptyState/` |
| FormGrid | Compound: Section (number, title, description) — two-column responsive form layout | `custom/FormGrid/` |
| BlockStrip | filled, total — decorative block-character motif | `custom/BlockStrip/` |
| Chart | variant (line/bar/area), data[], datasets[], xAxis, height, title, showGrid/Legend/Tooltip | `custom/Chart/` |
| Sidebar | Compound: Group (label, action), Item (icon, badge, active, onClick, href), Footer | `custom/Sidebar/` |
| AlertProvider | Global: wraps app. useAlert() hook with severity, title, message, persistent, duration | `custom/AlertProvider/` |
| Icon | name (30+ named glyphs), size (sm/md/lg/xl), color (default/text/primary/secondary/muted/danger/success/warn/info) | `custom/Icon/` |
| StatRow | label, value, color, bordered — horizontal key-value pair | `custom/StatRow/` |
| Link | href, variant (default/unstyled), external — Next.js Link wrapper | `custom/Link/` |
| Widget | variant (default/frost), label, accent (ReactNode) — card with header | `custom/Widget/` |
| StatusStrip | items[] (label, value, color), leading, trailing — horizontal status bar | `custom/StatusStrip/` |
| CalendarStrip | days[] (date, label, isToday, dots) — 7-day week view | `custom/CalendarStrip/` |
| HabitGrid | cells[] ("empty"/"partial"/"filled") — colored grid | `custom/HabitGrid/` |
| Ticker | items[] (label, value, color) — horizontal data strip with separators | `custom/Ticker/` |

## Project Structure

```
src/
├── app/                     Next.js App Router
│   ├── api/health/          Health check endpoint
│   ├── dashboard/           Dashboard page (KPIs, charts, widgets)
│   ├── design-system/       Component showcase page
│   ├── sidebar-demo/        Interactive app shell page
│   ├── globals.css          Global styles + token import
│   ├── layout.tsx           Root layout (Geist fonts, Providers)
│   ├── providers.tsx        Client providers (AlertProvider)
│   └── page.tsx             Marketing landing page
├── components/
│   ├── primitives/          Raw HTML element wrappers
│   │   ├── utils/           createPrimitive factory + CSS prop types
│   │   ├── Box.tsx, Button.tsx, etc.
│   │   └── index.ts         Barrel export
│   └── custom/              Styled components (what you use in pages)
│       ├── Alert/           Each has .tsx + .module.css + index.ts
│       ├── Avatar/
│       ├── Badge/
│       ├── BlockStrip/
│       ├── Breadcrumbs/
│       ├── Button/
│       ├── Card/
│       ├── Chart/
│       ├── Checkbox/
│       ├── CheckboxGroup/
│       ├── Container/
│       ├── DataTable/
│       ├── Divider/
│       ├── EmptyState/
│       ├── Field/
│       ├── FormGrid/
│       ├── Heading/
│       ├── KpiTile/
│       ├── Modal/
│       ├── Navbar/
│       ├── Progress/        (Progress, Skeleton, Spinner, DotsLoader)
│       ├── Radio/
│       ├── RadioGroup/
│       ├── Row/
│       ├── SectionHead/
│       ├── Select/          (Select + MultiSelect)
│       ├── Sidebar/
│       ├── Stack/
│       ├── StatRow/
│       ├── StatusStrip/
│       ├── Switch/
│       ├── Tabs/
│       ├── Text/
│       ├── ThemeToggle/
│       ├── Ticker/
│       ├── Tooltip/
│       ├── Widget/
│       ├── AlertProvider/
│       ├── CalendarStrip/
│       ├── HabitGrid/
│       ├── Icon/
│       ├── Link/
│       └── index.ts         Barrel export
├── styles/
│   └── tokens.css           Design token variables (dark/light)
├── config/                  App configuration
├── hooks/                   Custom React hooks
├── lib/                     Business logic, API client, DB, validators
└── types/                   Shared TypeScript types
```

## Core Principles

- Build the simplest correct solution.
- Prefer clear, boring, maintainable code over clever abstractions.
- Keep files, functions, components, and modules small and focused.
- Avoid premature optimization, but do not ignore obvious performance issues.
- Reuse existing patterns in the codebase before introducing new ones.
- Do not duplicate logic. Extract reusable utilities, hooks, services, or components when it improves clarity.
- Favor explicitness over magic.
- Write code that another senior engineer can understand quickly.

## Follow Official Documentation

When using any framework, library, SDK, API, or tool:

- Follow the official documentation and recommended patterns as closely as possible.
- Do not invent custom patterns when the documented approach is sufficient.
- Prefer stable, idiomatic APIs over experimental or obscure features.
- Check existing project dependencies before adding new ones.
- Do not add a dependency unless it clearly improves the solution.

## Development Workflow

Before coding:

1. Understand the existing architecture.
2. Inspect relevant files and patterns.
3. Identify the smallest safe change.
4. Plan the implementation briefly.
5. Consider edge cases, failure modes, accessibility, and tests.

While coding:

- Make focused, incremental changes.
- Preserve existing behavior unless explicitly asked to change it.
- Keep public interfaces stable where possible.
- Update related types, tests, docs, and examples.

After coding:

- Run `npm run build` and `npm run lint` — fix all errors.
- Summarize what changed, why, and how it was verified.

## Adding a New Custom Component (Pattern)

1. Create `src/components/custom/ComponentName/` directory
2. Create `ComponentName.module.css` — styles using token variables only
3. Create `ComponentName.tsx` — extends a primitive, maps typed props to CSS classes
4. Create `index.ts` — exports component and types
5. Add to `src/components/custom/index.ts` barrel

Component template:
```tsx
"use client";
import React from "react";
import { Box } from "@/components/primitives";
import type { PrimitiveProps } from "@/components/primitives";
import styles from "./ComponentName.module.css";

export interface ComponentNameProps extends PrimitiveProps<"div"> {
  variant?: "default" | "other";
}

const variantClasses: Record<string, string> = {
  default: styles.default,
  other: styles.other,
};

export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  function ComponentName({ variant = "default", className, children, ...props }, ref) {
    const classes = [styles.base, variantClasses[variant], className]
      .filter(Boolean).join(" ");
    return <Box ref={ref} className={classes} {...props}>{children}</Box>;
  }
);
ComponentName.displayName = "ComponentName";
```

## Code Quality Standards

- Use strong typing. Avoid `any`.
- Use descriptive names for variables, functions, components.
- Keep functions short and single-purpose.
- Prefer early returns over deeply nested conditionals.
- Never leave dead code, debug logs, or TODOs.

## Git and Change Hygiene

- Keep changes scoped to the task.
- Do not reformat unrelated files.
- Do not introduce unrelated refactors.
- Make the diff easy to review.

## Design Reference

The `basecamp/` folder contains the design system reference:
- `tokens.css` — source of truth for all CSS variable definitions
- `tokens.json` — structured token definitions with descriptions
- `components.css` — reference CSS for all component patterns
- HTML files — example implementations of pages and components

Use these as the source of truth when implementing new components.
