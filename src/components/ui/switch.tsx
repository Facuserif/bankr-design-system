import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const switchVariants = cva(
  // TODO(tokens): replace `bg-text-color-text-success` with `bg-background-success-color-bg-success-strong`
  // when that semantic background token is available in globals.css / tailwind-preset.
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-color-border-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-default-color-bg disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-background-default-color-bg-strong data-[state=checked]:bg-text-color-text-success",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const switchThumbVariants = cva("pointer-events-none block shrink-0 rounded-full bg-background-default-color-bg", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, size = "md", ...props }, ref) => (
    <SwitchPrimitives.Root className={cn(switchVariants({ size }), "data-[state=checked]:justify-end", className)} {...props} ref={ref}>
      <SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))} />
    </SwitchPrimitives.Root>
  )
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, switchVariants };
