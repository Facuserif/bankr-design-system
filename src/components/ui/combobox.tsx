import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const comboboxVariants = cva(
  "inline-flex h-10 w-full items-center gap-1 overflow-hidden rounded-[8px] border px-3 py-2 text-left transition-colors",
  {
    variants: {
      visualState: {
        default:"border-border-color-border bg-background-default-color-bg-surface hover:border-border-color-border-hover hover:bg-background-default-color-bg-elevated",
        hover: "border-border-color-border-hover bg-background-default-color-bg-elevated",
        focus:
          "border-border-color-border-input-hover bg-background-default-color-bg-surface focus-visible:outline-none",
        open:
          "border-border-color-border-input-hover bg-background-default-color-bg-surface",
        disabled:
          "cursor-not-allowed border-border-color-border-disabled bg-transparent",
      },
    },
    defaultVariants: {
      visualState: "default",
    },
  }
);

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={cn("size-5", className)} aria-hidden="true">
      <path d="M6 8L10 4L14 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 12L10 16L14 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeadingIconSlot({ icon }: { icon?: React.ReactNode }) {
  if (!icon) {
    return null;
  }

  return <span className="inline-flex size-6 shrink-0 items-center justify-center">{icon}</span>;
}

export interface ComboboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof comboboxVariants> {
  value?: string;
  placeholder?: string;
  leadingIcon?: React.ReactNode;
  open?: boolean;
  headerLabel?: string;
  options?: string[];
  selectedOptionIndex?: number | null;
  showHeader?: boolean;
  onOptionSelect?: (index: number) => void;
}

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      className,
      visualState,
      disabled,
      value,
      placeholder = "Select",
      leadingIcon,
      open = false,
      headerLabel = "Tokens",
      options = ["Base", "Base", "Base", "Base", "Base"],
      selectedOptionIndex = null,
      showHeader = true,
      onOptionSelect,
      ...props
    },
    ref
  ) => {
    const resolvedVisualState = disabled ? "disabled" : visualState ?? "default";
    const hasValue = Boolean(value);
    const triggerTextClass = disabled
      ? "text-text-color-text-disabled"
      : resolvedVisualState === "default" || resolvedVisualState === "hover"
        ? "text-text-color-text-placeholder"
        : "text-text-color-text";

    return (
      <div className={cn("relative w-full", className)}>
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          className={cn(comboboxVariants({ visualState: resolvedVisualState }), "relative")}
          aria-expanded={open}
          {...props}
        >
          <LeadingIconSlot icon={leadingIcon} />
          <span className={cn("min-w-0 flex-1 truncate text-sm font-normal leading-5", triggerTextClass)}>
            {hasValue ? value : placeholder}
          </span>
          <span className={cn("inline-flex size-5 shrink-0 items-center justify-center", disabled ? "text-icon-color-icon-disabled" : "text-icon-color-icon-muted")}>
            <ExpandIcon />
          </span>
        </button>

        {open ? (
          <div
            className="absolute left-0 top-[calc(100%+2px)] z-50 w-full overflow-hidden rounded-[8px] border border-border-color-border bg-background-default-color-bg-elevated"
            role="listbox"
          >
            {showHeader ? (
              <div className="border-b border-border-color-border px-2 py-1.5" role="presentation">
                <div className="h-8 select-none text-sm font-semibold leading-5 text-text-color-text-muted flex items-center">{headerLabel}</div>
              </div>
            ) : null}
            <div className="p-1">
              {options.map((option, index) => {
                const isSelected = selectedOptionIndex === index;
                return (
                  <button
                    key={`${option}-${index}`}
                    type="button"
                    onClick={() => onOptionSelect?.(index)}
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      "flex h-9 w-full items-center gap-2 rounded-md px-2 py-1.5 text-left outline-none transition-colors focus-visible:ring-1 focus-visible:ring-border-color-border-focus-ring focus-visible:ring-offset-0",
                      isSelected
                        ? "bg-background-default-color-bg-strong"
                        : "hover:bg-background-default-color-bg-subtle focus-visible:bg-background-default-color-bg-subtle"
                    )}
                  >
                    <LeadingIconSlot icon={leadingIcon} />
                    <span className="min-w-0 flex-1 truncate text-sm font-normal leading-5 text-text-color-text">{option}</span>
                    {isSelected ? (
                      <span className="inline-flex size-4 shrink-0 items-center justify-center text-icon-color-icon">
                        <svg viewBox="0 0 16 16" fill="none" className="size-4">
                          <path d="M3.5 8.25L6.5 11.25L12.5 5.25" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

Combobox.displayName = "Combobox";

export { Combobox };
