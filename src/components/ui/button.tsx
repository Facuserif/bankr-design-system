import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

type ButtonVisualState = "default" | "hover" | "focused" | "disabled";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border border-transparent font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        outline: "",
        ghost: "",
        brand: "",
      },
      size: {
        sm: "h-8 px-4 py-2 text-[12px] leading-4",
        md: "h-10 px-4 py-2 text-[14px] leading-5",
        lg: "h-11 px-4 py-2 text-[16px] leading-6",
        xl: "h-12 px-4 py-2 text-[16px] leading-6",
      },
      state: {
        default: "",
        hover: "",
        focused: "ring-1 ring-border-color-border-focus-ring ring-offset-2 ring-offset-background-default-color-bg",
        disabled: "pointer-events-none",
      },
      iconOnly: {
        true: "px-0",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        state: "default",
        className:
          "bg-background-color-bg-primary text-text-color-text-on-color hover:bg-background-color-bg-primary-hover active:bg-background-color-bg-primary-active",
      },
      {
        variant: "primary",
        state: "hover",
        className: "bg-background-color-bg-primary-hover text-text-color-text-on-color",
      },
      {
        variant: "primary",
        state: "focused",
        className: "bg-background-color-bg-primary text-text-color-text-on-color",
      },
      {
        variant: "primary",
        state: "disabled",
        className: "bg-background-default-color-bg-disabled text-text-color-text-disabled",
      },
      {
        variant: "secondary",
        state: "default",
        className:
          "bg-background-color-bg-secondary text-text-color-text hover:bg-background-color-bg-secondary-hover active:bg-background-color-bg-secondary-active",
      },
      {
        variant: "secondary",
        state: "hover",
        className: "bg-background-color-bg-secondary-hover text-text-color-text",
      },
      {
        variant: "secondary",
        state: "focused",
        className: "bg-background-color-bg-secondary text-text-color-text",
      },
      {
        variant: "secondary",
        state: "disabled",
        className: "bg-background-default-color-bg-disabled text-text-color-text-disabled",
      },
      {
        variant: "outline",
        state: "default",
        className:
          "border-border-color-border bg-background-default-color-bg text-text-color-text hover:border-border-color-border-hover hover:bg-background-default-color-bg-subtle active:bg-background-default-color-bg-elevated",
      },
      {
        variant: "outline",
        state: "hover",
        className: "border-border-color-border-hover bg-background-default-color-bg-subtle text-text-color-text",
      },
      {
        variant: "outline",
        state: "focused",
        className: "border-border-color-border bg-background-default-color-bg text-text-color-text",
      },
      {
        variant: "outline",
        state: "disabled",
        className:
          "border-border-color-border-disabled bg-background-default-color-bg text-text-color-text-disabled",
      },
      {
        variant: "ghost",
        state: "default",
        className: "bg-transparent text-text-color-text hover:bg-background-default-color-bg-subtle active:bg-background-default-color-bg-elevated",
      },
      {
        variant: "ghost",
        state: "hover",
        className: "bg-background-default-color-bg-subtle text-text-color-text",
      },
      {
        variant: "ghost",
        state: "focused",
        className: "bg-transparent text-text-color-text",
      },
      {
        variant: "ghost",
        state: "disabled",
        className: "bg-transparent text-text-color-text-disabled",
      },
      {
        variant: "brand",
        state: "default",
        className:
          "bg-background-magic-color-bg-magic text-text-color-text-on-color hover:bg-background-magic-color-bg-magic-hover active:bg-background-magic-color-bg-magic-active",
      },
      {
        variant: "brand",
        state: "hover",
        className: "bg-background-magic-color-bg-magic-hover text-text-color-text-on-color",
      },
      {
        variant: "brand",
        state: "focused",
        className: "bg-background-magic-color-bg-magic text-text-color-text-on-color",
      },
      {
        variant: "brand",
        state: "disabled",
        className: "bg-background-default-color-bg-disabled text-text-color-text-disabled",
      },
      { size: "sm", iconOnly: true, className: "w-8" },
      { size: "md", iconOnly: true, className: "w-10" },
      { size: "lg", iconOnly: true, className: "w-11" },
      { size: "xl", iconOnly: true, className: "w-12" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      state: "default",
      iconOnly: false,
    },
  }
);

function iconSizeClass(size: NonNullable<ButtonProps["size"]>) {
  return size === "sm" ? "size-4" : "size-5";
}

function renderIcon(icon: React.ReactNode, sizeClass: string) {
  if (!icon) {
    return null;
  }

  if (React.isValidElement<{ className?: string }>(icon)) {
    return (
      <span className={cn("inline-flex shrink-0 items-center justify-center", sizeClass)}>
        {React.cloneElement(icon, {
          className: cn("size-full", icon.props.className),
        })}
      </span>
    );
  }

  return <span className={cn("inline-flex shrink-0 items-center justify-center", sizeClass)}>{icon}</span>;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, "state"> {
  asChild?: boolean;
  state?: Exclude<ButtonVisualState, "disabled">;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      state = "default",
      iconOnly = false,
      disabled,
      asChild = false,
      leadingIcon,
      trailingIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const resolvedState: ButtonVisualState = disabled ? "disabled" : state;
    const iconClass = iconSizeClass(size);
    const iconOnlyContent = leadingIcon ?? trailingIcon;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, state: resolvedState, iconOnly, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {iconOnly ? (
          renderIcon(iconOnlyContent, iconClass)
        ) : (
          <>
            {renderIcon(leadingIcon, iconClass)}
            {children}
            {renderIcon(trailingIcon, iconClass)}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
