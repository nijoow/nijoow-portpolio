---
name: frontend-design
description: Apply this repo's established visual design system (dark cosmic-purple glassmorphism) when building or restyling any UI in this Next.js portfolio — pages, sections, cards, buttons, nav, forms, empty/loading states. Trigger whenever the user asks to design, redesign, restyle, "make it look better/nicer", add a new section or component, or build any new page — even if they don't use the words "design" or "style" explicitly. Also trigger when reviewing UI code for visual consistency. Do NOT trigger for pure logic/data-fetching work with no visual surface.
---

# Frontend Design — nijoow portfolio

This repo already has an established visual language from the `redesign-v2` effort. Match it — don't invent a new one per component.

## 1. Read the Hard Rules first

Before writing any className, check:
- `docs/frontend-styling.md` §0 — color/spacing must go through `@theme` tokens or default Tailwind utilities, never arbitrary color values (`bg-[#fafafa]`) or repeated arbitrary numbers. One-off decorative/animation geometry (aurora blob sizes, `pb-[56.25%]` ratio hacks) is the only exception.
- `docs/frontend-components.md` §0 — no `any`/`as`/`@ts-ignore`, no imperative DOM (`querySelector`), no new HOCs.

If a change would violate either, redesign the approach instead of bending the rule.

## 2. The visual language

**Palette** — `@theme` tokens in `src/app/globals.css`: `--color-purple-light/medium/regular/dark/darker`, `--color-gray-dark/darker`. Everything reads as dark-mode-only (`forcedTheme="dark"` in `src/context/Theme.tsx`) — don't add light-mode branches.

**Background** — `AmbientBackground` (aurora blobs + dust particles) sits fixed behind everything. New full-page sections should stay transparent/semi-transparent so it shows through, not opaque black panels.

**Glass panels** — the base surface for cards, panels, and info blocks:
```
border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl
```
Prefer wrapping new panels in `src/components/Motion/GlassCard.tsx` rather than hand-rolling this — it already gives a cursor-following purple radial spotlight (`rgba(192,168,235,0.13)`) and a border-highlight-on-hover instead of a flat white overlay. Flat white/10 hover overlays read as "hazy" — avoid them; the spotlight + border approach reads as "premium glass."

**Section headers** — eyebrow label (`text-xs font-bold tracking-widest uppercase text-purple-light/80`) + bold title, via `SubTitle`/`PartTitle`/`PartSubTitle` (`src/components/SubTitle/`, `src/app/works/_container/Part*.tsx`). Reuse these, don't invent a fourth heading style.

**Buttons** — rounded-full glass, never flat gradients:
```
rounded-full border border-purple-light/25 bg-purple-medium/20 backdrop-blur-xl hover:bg-purple-medium/35 transition-colors
```
Nav/filter pills follow the same border+bg-tint-on-active pattern (see `NavListItem.tsx`, `WorkTags.tsx`).

**Motion** — Framer Motion via the `m` import (LazyMotion `domAnimation` is configured at root — don't import `motion` directly in new client components, use `m`). Scroll-in sections use `Reveal` (`src/components/Motion/Reveal.tsx`). Respect `reducedMotion="user"` — don't add animations that ignore it.

**Icons** — `lucide-react`. Prefer an icon + short `title`/tooltip over a text hint sentence for interaction affordances (established pattern: hero drag/right-click hints became icon chips with tooltips, not a caption).

## 3. Before reusing vs. building new

Check for an existing component before writing new markup:
- Glass panel → `GlassCard`
- Section heading → `SubTitle` (page sections) / `PartTitle` + `PartSubTitle` (work detail pages)
- Scroll reveal → `Reveal`
- Work-specific list/tags → `src/app/works/_container/` (`CustomList`, `TechStack`, `WorkTags`)

If none fit, build the new piece to match the patterns above rather than a one-off style.

## 4. Verify visually, not just type-check

Lint and `tsc --noEmit` catch correctness, not whether the design actually looks right. Per this project's working norm: start the dev server, open it in the browser preview tool, and actually look at the change — including hover states (GlassCard spotlight, button hover) and at least one narrow viewport — before calling the work done. A change that type-checks but hasn't been looked at is not verified.
