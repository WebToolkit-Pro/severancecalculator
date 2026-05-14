---
name: Severance Calculator
colors:
  primary: "#10b981"
  primary-dark: "#059669"
  primary-container: "#064e3b"
  on-primary: "#ffffff"
  secondary: "#fbbf24"
  secondary-light: "rgba(251, 191, 36, 0.05)"
  secondary-mid: "rgba(251, 191, 36, 0.4)"
  background: "#0f172a"
  surface: "#1e293b"
  surface-lowest: "#020617"
  on-surface: "#f1f5f9"
  on-surface-variant: "#94a3b8"
  outline: "#334155"
  outline-variant: "rgba(16, 185, 129, 0.2)"

typography:
  headline-lg:
    fontFamily: Outfit
    fontSize: 56px
    fontWeight: "800"
    lineHeight: "1.1"
    letterSpacing: "-0.02em"
  headline-md:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: "700"
    lineHeight: "1.2"
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "700"
    letterSpacing: "0.05em"
    textTransform: uppercase

rounded:
  md: 12px
  lg: 16px
  full: 99px

spacing:
  unit: 8px
  card-padding: 32px
  section-gap: 80px
  input-padding: 12px 16px

components:
  calculator-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-padding}"
    border: "1px solid {colors.outline}"
  result-hero:
    background: "linear-gradient(to bottom right, {colors.primary-container}, #065f46)"
    rounded: "{rounded.lg}"
    padding: 48px 24px
  input-field:
    backgroundColor: "{colors.background}"
    border: "2px solid {colors.outline}"
    rounded: "{rounded.md}"
    typography: "{typography.body-md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    typography: "{typography.label-sm}"
---

# Severance Calculator Design System

A high-authority, financial-grade design system engineered for the Severance Calculator ecosystem. The aesthetic balances the gravity of financial transition with the clarity of modern engineering tools, creating a "Modern Fintech" experience that feels both secure and sophisticated.

## Visual Identity: Authoritative Dark Mode
The design system deliberately moves away from the "clinical" look of traditional financial software. By utilizing a deep Slate-based dark mode, we create a high-contrast environment where critical data points can "pop" through vibrant semantic accents.

- **Atmosphere**: The interface uses a deep background (`#0f172a`) to minimize visual noise, allowing the user to focus entirely on the calculation inputs.
- **Surface Strategy**: Cards and containers use a slightly lighter Slate (`#1e293b`) to establish a clear hierarchy. This layering is reinforced by 1px solid borders rather than heavy shadows, maintaining a crisp, architectural feel.
- **Glassmorphism**: Subtle backdrop blurs are applied to navigation and sticky elements, adding a layer of depth that suggests a sophisticated, modern tech stack.

## Typography & Clarity
Data integrity is paramount in financial tools. Our typography strategy reflects this by using two distinct typefaces that serve specific roles.

- **Branding & Hierarchy (Outfit)**: Used for all headers. Its geometric structure provides a clean, confident personality that establishes authority.
- **Functional Data (Inter)**: Used for all labels, inputs, and descriptions. Inter's neutral tone ensures that complex numbers and legal descriptions remain exceptionally legible across all devices.
- **Fluid Mechanics**: Typography scales dynamically based on viewport width, ensuring that a "Hero" result on a 30-inch monitor feels just as impactful as it does on a smartphone.

## Semantic Coloring
Color is used with surgical precision to guide the user's attention and provide instant feedback.

- **The Emerald Path**: Primary actions and "success" states use Emerald Green (`#10b981`). This color represents growth and resolution, subconsciously reassuring the user during a stressful life event like job transition.
- **The Amber Highlight**: Financial results and "Bottom Line" figures are highlighted in Amber (`#fbbf24`). This creates a secondary focal point that is distinct from interactive elements, ensuring the final calculated amount is the most visible piece of information on the screen.

## Motion & Interaction
Interactions are designed to be "snappy" and rewarding.

- **Elevation Change**: Interactive cards and guide elements feature a subtle `-8px` vertical translation on hover, coupled with a shadow expansion. This micro-animation provides clear feedback that the element is "active."
- **Progressive Disclosure**: Results are revealed with a smooth `fadeIn` animation, creating a moment of "reveal" that adds weight to the calculated outcome.
- **Focus Rings**: All inputs utilize a high-visibility focus state with a 4px ring in the primary Emerald color, preventing user error during data entry.

## Architectural Elements
- **Soft Geometry**: We use a `16px` (lg) radius for major containers and `12px` (md) for buttons/inputs. This "softened tech" look makes the tool feel approachable rather than intimidating.
- **Breakdown Grids**: Complex financial breakdowns are organized into nested grids with muted backgrounds, allowing the user to scan individual components of their severance package without being overwhelmed by a wall of text.
