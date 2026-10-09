# Design System Master File — QUILAB Software Consortium

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** <quilab.co> (QUILAB)
**Category:** Elite Software Engineering Consortium
**Design Dials:** Variance 4/10 (Clean Precision) | Motion 4/10 (Dynamic / Reactive Canvas) | Density 3/10 (Spacious & Architectural)

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary / Midnight Navy | `#0B192C` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary / Slate Dark | `#1E293B` | `--color-secondary` |
| On Secondary | `#F8FAFC` | `--color-on-secondary` |
| Tech Accent / Cyan Sky | `#0284C7` | `--color-accent` |
| Accent Light / Glow | `#38BDF8` | `--color-accent-light` |
| Background (Light) | `#F8FAFC` | `--color-background` |
| Foreground (Ink) | `#0B192C` | `--color-foreground` |
| Card | `#FFFFFF` | `--color-card` |
| Card Foreground | `#0B192C` | `--color-card-foreground` |
| Muted Surface | `#F1F5F9` | `--color-muted` |
| Muted Foreground | `#64748B` | `--color-muted-foreground` |
| Border | `#E2E8F0` | `--color-border` |
| Ink Hero / Dark Section | `#070F1E` | `--color-ink` |
| Ring | `#0284C7` | `--color-ring` |

---

### Typography

- **Heading Font:** Plus Jakarta Sans (`'Plus Jakarta Sans', sans-serif`)
- **Body Font:** Inter (`'Inter', sans-serif`)
- **Mono / Tech Font:** JetBrains Mono (`'JetBrains Mono', monospace`)
- **Brand Symbol:** `<quilab.co>` (Dynamic interactive code brackets)
- **Mood:** High-end engineering consortium, minimalist, architectural, technical precision, forward-looking

---

## Interactive Components & Motion

1. **Interactive `<quilab.co>` Logo**:
   - Code brackets `<` and `>` expand and illuminate with subtle neon cyan glow upon hover.
   - Status pill with pulsing green indicator for active lab status.

2. **Parametric Reactive Canvas (Hero)**:
   - High-performance 60fps HTML5 Canvas tracking mouse cursor coordinates with smooth dampening.
   - Subtle connecting lines and luminous data nodes simulating distributed computing nodes.

3. **Software Pods & Capabilities**:
   - Monospace index markers (`01 // ARCHITECTURE`, `02 // CLOUD`).
   - Clean slate cards with subtle borders and 200ms smooth elevation transitions.
