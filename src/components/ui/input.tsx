import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  "flex h-10 w-full rounded-[8px] border px-3 py-2.5 text-[14px] font-normal leading-5 transition-colors focus-visible:outline-none",
  {
    variants: {
      visual: {
        default:
          "border-border-color-border-input bg-background-default-color-bg-subtle text-text-color-text placeholder:text-text-color-text-placeholder hover:border-border-color-border-hover focus-visible:border-border-color-border-input-hover focus-visible:ring-2 focus-visible:ring-border-color-border-focus-ring focus-visible:ring-offset-0",
        filled:
          "border-border-color-border-input bg-background-default-color-bg-subtle text-text-color-text placeholder:text-text-color-text-placeholder hover:border-border-color-border-hover focus-visible:border-border-color-border-input-hover focus-visible:ring-2 focus-visible:ring-border-color-border-focus-ring focus-visible:ring-offset-0",
        error:
          "border-border-color-border-error-muted bg-background-error-color-bg-error-muted text-text-color-text-error placeholder:text-text-color-text-error focus-visible:border-border-color-border-error-muted focus-visible:ring-2 focus-visible:ring-border-color-border-error-muted focus-visible:ring-offset-0",
        disabled:
          "cursor-not-allowed border-border-color-border-input bg-background-default-color-bg-disabled text-text-color-text-disabled placeholder:text-text-color-text-disabled",
      },
    },
    defaultVariants: {
      visual: "default",
    },
  }
);

export interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  hasError?: boolean;
  filled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError = false, filled = false, disabled = false, ...props }, ref) => {
    const visual = disabled ? "disabled" : hasError ? "error" : filled ? "filled" : "default";

    return <input ref={ref} disabled={disabled} className={cn(inputVariants({ visual }), className)} {...props} />;
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
