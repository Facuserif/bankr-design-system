# Design Token Mapping

Source: resolved Figma semantic color tokens (Light + Dark), including confirmed Dark patches from Variables UI.

## Mapping Table

| Figma token | CSS variable | Tailwind color key | Example utility |
|---|---|---|---|
| `Background/color-bg` | `--background-color-bg` | `background-color-bg` | `bg-background-color-bg` |
| `Background/color-bg-primary` | `--background-color-bg-primary` | `background-color-bg-primary` | `bg-background-color-bg-primary` |
| `Background/color-bg-primary-hover` | `--background-color-bg-primary-hover` | `background-color-bg-primary-hover` | `bg-background-color-bg-primary-hover` |
| `Background/color-bg-primary-active` | `--background-color-bg-primary-active` | `background-color-bg-primary-active` | `bg-background-color-bg-primary-active` |
| `Background/color-bg-secondary` | `--background-color-bg-secondary` | `background-color-bg-secondary` | `bg-background-color-bg-secondary` |
| `Background/color-bg-secondary-hover` | `--background-color-bg-secondary-hover` | `background-color-bg-secondary-hover` | `bg-background-color-bg-secondary-hover` |
| `Background/color-bg-secondary-active` | `--background-color-bg-secondary-active` | `background-color-bg-secondary-active` | `bg-background-color-bg-secondary-active` |
| `Background/Default/color-bg` | `--background-default-color-bg` | `background-default-color-bg` | `bg-background-default-color-bg` |
| `Background/Default/color-bg-surface` | `--background-default-color-bg-surface` | `background-default-color-bg-surface` | `bg-background-default-color-bg-surface` |
| `Background/Default/color-bg-subtle` | `--background-default-color-bg-subtle` | `background-default-color-bg-subtle` | `bg-background-default-color-bg-subtle` |
| `Background/Default/color-bg-elevated` | `--background-default-color-bg-elevated` | `background-default-color-bg-elevated` | `bg-background-default-color-bg-elevated` |
| `Background/Default/color-bg-strong` | `--background-default-color-bg-strong` | `background-default-color-bg-strong` | `bg-background-default-color-bg-strong` |
| `Background/Default/color-bg-disabled` | `--background-default-color-bg-disabled` | `background-default-color-bg-disabled` | `bg-background-default-color-bg-disabled` |
| `Background/Magic/color-bg-magic` | `--background-magic-color-bg-magic` | `background-magic-color-bg-magic` | `bg-background-magic-color-bg-magic` |
| `Background/Magic/color-bg-magic-hover` | `--background-magic-color-bg-magic-hover` | `background-magic-color-bg-magic-hover` | `bg-background-magic-color-bg-magic-hover` |
| `Background/Magic/color-bg-magic-active` | `--background-magic-color-bg-magic-active` | `background-magic-color-bg-magic-active` | `bg-background-magic-color-bg-magic-active` |
| `Background/Success/color-bg-success-muted` | `--background-success-color-bg-success-muted` | `background-success-color-bg-success-muted` | `bg-background-success-color-bg-success-muted` |
| `Border/color-border` | `--border-color-border` | `border-color-border` | `border-border-color-border` |
| `Border/color-border-hover` | `--border-color-border-hover` | `border-color-border-hover` | `border-border-color-border-hover` |
| `Border/color-border-disabled` | `--border-color-border-disabled` | `border-color-border-disabled` | `border-border-color-border-disabled` |
| `Border/color-border-focusRing` | `--border-color-border-focus-ring` | `border-color-border-focus-ring` | `border-border-color-border-focus-ring` |
| `Border/color-border-onColor` | `--border-color-border-on-color` | `border-color-border-on-color` | `border-border-color-border-on-color` |
| `Border/color-border-input` | `--border-color-border-input` | `border-color-border-input` | `border-border-color-border-input` |
| `Border/color-border-input-hover` | `--border-color-border-input-hover` | `border-color-border-input-hover` | `border-border-color-border-input-hover` |
| `Border/color-border-success` | `--border-color-border-success` | `border-color-border-success` | `border-border-color-border-success` |
| `Text/color-text` | `--text-color-text` | `text-color-text` | `text-text-color-text` |
| `Text/color-text-onColor` | `--text-color-text-on-color` | `text-color-text-on-color` | `text-text-color-text-on-color` |
| `Text/color-text-disabled` | `--text-color-text-disabled` | `text-color-text-disabled` | `text-text-color-text-disabled` |
| `Text/color-text-muted` | `--text-color-text-muted` | `text-color-text-muted` | `text-text-color-text-muted` |
| `Text/color-text-magic` | `--text-color-text-magic` | `text-color-text-magic` | `text-text-color-text-magic` |
| `Text/color-text-magic-strong` | `--text-color-text-magic-strong` | `text-color-text-magic-strong` | `text-text-color-text-magic-strong` |
| `Text/color-text-success` | `--text-color-text-success` | `text-color-text-success` | `text-text-color-text-success` |
| `Text/color-text-placeholder` | `--text-color-text-placeholder` | `text-color-text-placeholder` | `text-text-color-text-placeholder` |
| `Icon/color-icon` | `--icon-color-icon` | `icon-color-icon` | `text-icon-color-icon` |
| `Icon/color-icon-onColor` | `--icon-color-icon-on-color` | `icon-color-icon-on-color` | `text-icon-color-icon-on-color` |
| `Icon/color-icon-disabled` | `--icon-color-icon-disabled` | `icon-color-icon-disabled` | `text-icon-color-icon-disabled` |
| `Icon/color-icon-muted` | `--icon-color-icon-muted` | `icon-color-icon-muted` | `text-icon-color-icon-muted` |

## Notes

- Hover alpha from Figma is preserved for `Background/color-bg-primary-hover` via fixed `0.9` in `tailwind-preset.ts`.
- Tokens are exposed as RGB channel variables and consumed as `rgb(var(--token) / <alpha-value>)`.
