import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const searchBarVariants = cva(
  "flex h-12 w-full items-center gap-1.5 overflow-hidden rounded-full border p-3 transition-[background-color,border-color]",
  {
    variants: {
      state: {
        default:
          "border-border-color-border-input bg-background-default-color-bg-surface hover:border-border-color-border-hover hover:bg-background-default-color-bg-elevated focus-within:border-border-color-border-focus-ring focus-within:bg-background-default-color-bg-surface focus-within:hover:border-border-color-border-focus-ring focus-within:hover:bg-background-default-color-bg-surface",

        disabled:
          "border-border-color-border-disabled bg-background-default-color-bg-disabled",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

type SearchBarProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof searchBarVariants> & {
    showSearchIcon?: boolean;
    containerClassName?: string;
  };

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, containerClassName, state, showSearchIcon = true, disabled, ...props }, ref) => {
    const resolvedState = disabled ? "disabled" : state ?? "default";

    return (
      <div className={cn(searchBarVariants({ state: resolvedState }), containerClassName)}>
        {showSearchIcon ? (
          <span
            className={cn(
              "inline-flex size-6 shrink-0 items-center justify-center",
              disabled ? "text-icon-color-icon-disabled" : "text-icon-color-icon-muted"
            )}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-[18px]">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        ) : null}

        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full bg-transparent text-sm font-normal leading-5 text-text-color-text placeholder:text-text-color-text-placeholder focus:outline-none",
            disabled && "cursor-not-allowed text-text-color-text-disabled placeholder:text-text-color-text-disabled",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
