import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex w-full items-stretch justify-start border-b border-border-color-border",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    // TODO(tokens): replace `border-text-color-text-magic` with `border-color-border-magic` when that semantic border token exists.
    className={cn(
      "relative -mb-px inline-flex h-14 items-center justify-center whitespace-nowrap border-b border-transparent px-3 py-4 text-[16px] font-normal leading-6 text-text-color-text-muted transition-colors hover:text-text-color-text focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-color-border-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-default-color-bg disabled:pointer-events-none disabled:text-text-color-text-disabled data-[state=active]:border-b-2 data-[state=active]:border-text-color-text-magic data-[state=active]:font-semibold data-[state=active]:text-text-color-text-magic",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "pt-4 text-sm text-text-color-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-color-border-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-default-color-bg",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
