import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent font-medium transition-colors",
  {
    variants: {
      size: {
        sm: "h-5 gap-1 px-2 py-0.5 text-xs leading-4",
        md: "h-7 gap-1 px-3 py-1 text-sm leading-5",
        lg: "h-8 gap-1.5 px-3 py-1.5 text-sm leading-5",
      },
      variant: {
        solid: "",
        soft: "",
        outline: "",
        surface: "",
      },
      color: {
        primary: "",
        brand: "",
        green: "",
        red: "",
        yellow: "",
      },
    },
    compoundVariants: [
      // ── Solid ──
      { variant: "solid", color: "primary", className: "bg-background-color-bg-primary text-text-color-text-on-color" },
      { variant: "solid", color: "brand", className: "bg-background-magic-color-bg-magic text-text-color-text-on-color shadow-sm" },
      { variant: "solid", color: "green", className: "bg-background-success-color-bg-success-strong text-text-color-text-on-color shadow-sm" },
      { variant: "solid", color: "red", className: "bg-background-error-color-bg-error-strong text-text-color-text-on-color shadow-sm" },

      // ── Soft ──
      { variant: "soft", color: "primary", className: "bg-background-color-bg-secondary text-text-color-text" },
      { variant: "soft", color: "brand", className: "bg-background-magic-color-bg-magic-muted text-text-color-text-magic" },
      { variant: "soft", color: "green", className: "bg-background-success-color-bg-success-muted text-text-color-text-success" },
      { variant: "soft", color: "red", className: "bg-background-error-color-bg-error-muted text-text-color-text-error" },

      // ── Outline ──
      { variant: "outline", color: "primary", className: "border-border-color-border text-text-color-text-muted" },
      { variant: "outline", color: "brand", className: "border-border-color-border-magic-muted text-text-color-text-magic" },
      { variant: "outline", color: "green", className: "border-border-color-border-success text-text-color-text-success" },
      { variant: "outline", color: "red", className: "border-border-color-border-error-muted text-text-color-text-error" },

      // ── Surface ──
      { variant: "surface", color: "primary", className: "bg-background-default-color-bg-elevated border-border-color-border-hover text-text-color-text-muted" },
      { variant: "surface", color: "brand", className: "bg-background-magic-color-bg-magic-muted border-border-color-border-magic-muted text-text-color-text-magic" },
      { variant: "surface", color: "green", className: "bg-background-success-color-bg-success-muted border-border-color-border-success text-text-color-text-success" },
      { variant: "surface", color: "red", className: "bg-background-error-color-bg-error-muted border-border-color-border-error-muted text-text-color-text-error" },
      { variant: "surface", color: "yellow", className: "bg-background-warning-color-bg-warning-muted border-border-color-border-warning text-text-color-text-warning" },
    ],
    defaultVariants: {
      size: "md",
      variant: "solid",
      color: "primary",
    },
  }
);

function iconSizeClass(size: NonNullable<BadgeProps["size"]>) {
  return size === "sm" ? "size-3" : "size-3.5";
}

function renderIcon(icon: React.ReactNode, sizeClass: string) {
  if (!icon) return null;

  if (React.isValidElement<{ className?: string }>(icon)) {
    return React.cloneElement(icon, { className: cn(sizeClass, icon.props.className) });
  }

  return <span className={sizeClass}>{icon}</span>;
}

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({ className, size = "md", variant, color, icon, children, ...props }: BadgeProps) {
  const resolvedSize = size ?? "md";
  return (
    <div className={cn(badgeVariants({ size: resolvedSize, variant, color }), className)} {...props}>
      {renderIcon(icon, iconSizeClass(resolvedSize))}
      <span>{children}</span>
    </div>
  );
}

export { Badge, badgeVariants };
