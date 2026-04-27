# Design Brief

## Direction

**Premium White SaaS** — Clean, refined digital platform with Apple-inspired minimalism, Stripe precision, and Notion editorial elegance. Light-first aesthetic for modern business dashboards.

## Tone

Refined minimalism with subtle depth. Generous whitespace, soft shadows barely visible, modern blue primary with warm gold accents. Trustworthy, premium, approachable.

## Differentiation

Glassmorphism navbar with translucent background and backdrop blur creates sophisticated entry point. Soft shadow system (0 4px 24px rgba(0,0,0,0.06)) grounds UI without visual weight — premium restraint.

## Color Palette

| Token            | OKLCH           | Role                                |
| ---------------- | --------------- | ----------------------------------- |
| background       | 0.99 0 0        | Pure white base                     |
| foreground       | 0.22 0.01 260   | Dark text on light backgrounds      |
| card             | 0.98 0.002 0    | Elevated surfaces, content areas    |
| primary          | 0.45 0.16 264   | Modern indigo-blue, CTAs & links    |
| accent           | 0.62 0.19 60    | Warm gold, highlights & accents     |
| muted            | 0.93 0.01 260   | Secondary UI, disabled states       |
| destructive      | 0.55 0.22 25    | Error, delete, critical actions     |

Dark mode inverts with lighter primary (0.65 0.18 264) and gold (0.72 0.19 60) for readability.

## Typography

- **Display + Body**: Plus Jakarta Sans — modern, friendly, premium SaaS standard
- **Mono**: Geist Mono — code, data, technical content
- **Scale**: Hero `text-5xl md:text-7xl font-bold tracking-tight` | H2 `text-3xl md:text-5xl font-bold` | Label `text-sm font-semibold uppercase tracking-widest` | Body `text-base lg:text-lg`

## Elevation & Depth

Surface hierarchy via background color layers (white, card, secondary) rather than stacked shadows. Soft unified shadow system (0 4px 24px rgba) applied sparingly on hover/interactive states — no ambient shadows.

## Structural Zones

| Zone         | Treatment                        | Border              | Notes                                    |
| ------------ | -------------------------------- | ------------------- | ---------------------------------------- |
| Header       | nav-glass (translucent backdrop) | border-b border     | Sticky navbar with subtle blur           |
| Hero         | gradient-hero background         | —                   | Editorial transition from header         |
| Content      | bg-background (white)            | —                   | Generous whitespace, card grid layout    |
| Card Section | bg-card with surface-elevated    | border subtle       | Product features, dashboard data         |
| Sidebar      | bg-sidebar (white/light)         | border-border       | Navigation, persistent context           |
| Footer       | bg-muted/20 with border-t        | border-top          | Links, copyright, secondary info         |

## Spacing & Rhythm

Section gaps: `gap-16 md:gap-24`. Content grouping: `space-y-8 md:space-y-12`. Micro-spacing: `space-x-2` inline, `gap-4` grid items. Density increases on mobile with tighter rhythm.

## Component Patterns

- **Buttons**: Rounded 8px, primary blue with white text, secondary muted, accent gold, smooth 200ms hover scale (98%) + shadow
- **Cards**: Subtle 1px border, minimal bg difference from background, surface-elevated shadow on hover, rounded 12px
- **Badges**: Pill shape, muted background, dark text, compact spacing
- **Inputs**: 1px border, focus ring uses primary color, minimal visual weight, placeholder muted

## Motion

- **Entrance**: fade-in or slide-up (0.5s ease-out) on route load, card mount
- **Hover**: transition-smooth (200ms) on buttons, links, cards — scale, shadow, color shifts
- **Decorative**: Reserved; subtle pulse on focal interactive elements only

## Constraints

- No decorative full-page gradients; use surface colors only
- No opacity stacking for depth; use distinct background tokens
- Shadows subtle and purpose-driven (hover states, elevation)
- Maintain AA+ contrast in light mode; dark mode optimized separately
- Mobile-first responsive with `sm:`, `md:`, `lg:` breakpoints

## Signature Detail

Glassmorphism navbar with translucent white background and 16px backdrop blur — modern SaaS sophistication that signals premium aesthetic on first load.
