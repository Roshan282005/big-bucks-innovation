# Design Brief

## Direction

**Enterprise Modern Tech** — Sophisticated, credible digital platform that conveys innovation and reliability at scale, avoiding sterile corporate coldness.

## Tone

Refined minimalism with selective depth. Editorial grid layout, measured micro-interactions, entrance animations only. Tech-forward without trendy excess.

## Differentiation

Animated glowing bulb hero (ideas + innovation iconography) paired with IIT Delhi co-branding creates memorable visual identity. Dual-tone surface treatment (alternating card zones with intentional depth) prevents flat layouts.

## Color Palette

| Token            | OKLCH           | Role                                |
| ---------------- | --------------- | ----------------------------------- |
| background       | 0.145 0.014 260 | Dark base (primary)                 |
| foreground       | 0.95 0.01 260   | Text on dark backgrounds            |
| card             | 0.18 0.014 260  | Elevated surfaces, content areas    |
| primary          | 0.75 0.15 190   | Cyan/teal tech accent (dark mode)   |
| accent           | 0.72 0.17 70    | Warm amber for CTAs & highlights    |
| muted            | 0.22 0.02 260   | Secondary UI, disabled states       |
| destructive      | 0.55 0.2 25     | Error, delete, critical actions     |

Light mode inverts L values; C and H stable for harmony.

## Typography

- **Display**: Space Grotesk — bold, confident headlines and hero text
- **Body**: DM Sans — clean, readable UI labels, paragraph text, CRM interface
- **Mono**: Geist Mono — code, data, technical content
- **Scale**: Hero `text-5xl md:text-7xl font-bold tracking-tight` | H2 `text-3xl md:text-5xl font-bold` | Label `text-sm font-semibold uppercase tracking-widest` | Body `text-base lg:text-lg`

## Elevation & Depth

Depth via surface colors (card, muted, background layers) rather than opacity. Subtle shadows on hover/active states; no ambient shadows on every element. Glow effects reserved for interactive focal points.

## Structural Zones

| Zone         | Treatment                      | Border                | Notes                                           |
| ------------ | ------------------------------ | --------------------- | ----------------------------------------------- |
| Header       | card bg with border-b           | border-muted          | Navigation, branding                            |
| Hero         | gradient-hero background       | —                     | Animated bulb, CTA entry point                  |
| Content      | alternating bg-background      | —                     | Editorial grid, 2-3 column responsive           |
| Card Section | bg-card surface-elevated       | border-subtle         | Feature highlights, product showcase, CRM data  |
| Sidebar      | bg-sidebar (darker in dark)    | sidebar-border        | CRM navigation, persistent context              |
| Footer       | bg-muted/40 with border-t      | border-muted          | Links, copyright, secondary content             |

## Spacing & Rhythm

Section gaps: `gap-16 md:gap-24`. Content grouping: `space-y-8 md:space-y-12`. Micro-spacing: `space-x-2` for inline, `gap-4` for grid items. Density tightens on mobile (`space-y-6 sm:space-y-8`).

## Component Patterns

- **Buttons**: Rounded corners, cyan primary (dark) or indigo (light), amber accent for secondary, smooth transitions on hover
- **Cards**: Subtle border, minimal shadow on hover, background color indicates elevation
- **Badges**: Pill shape (`rounded-full`), muted background with foreground text, compact padding
- **Inputs**: Minimal borders, focused ring uses primary color, placeholder text muted

## Motion

- **Entrance**: `fade-in` or `slide-up` (0.5s ease-out) on route load, card mount
- **Hover**: `transition-smooth` on buttons, links, interactive zones
- **Decorative**: `glow-pulse` animation on hero bulb (2s infinite), subtle auto-play entrance only

## Constraints

- No decorative full-page gradients; use surface color layers instead
- No opacity stacking for depth; use dedicated surface token colors
- Animations are entrance/hover only; no constant auto-play beyond hero bulb
- Maintain AA+ WCAG contrast in both light and dark modes
- Mobile-first responsive: `sm:`, `md:`, `lg:` breakpoints

## Signature Detail

Glow-effect animated bulb in hero section with dual-tone background gradient creates premium, innovative impression — the visual anchor that differentiates BIG BUCKS from generic SaaS platforms.
