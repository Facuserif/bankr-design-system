import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
  arrow?: boolean;
  inverted?: boolean;
};

const TooltipContent = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps>(
  ({ className, side = "top", sideOffset = 0, alignOffset = 0, children, arrow = false, inverted = false, ...props }, ref) => {
  const isHorizontal = side === "left" || side === "right";
  const arrowWidth = isHorizontal ? 7 : 12;
  const arrowHeight = isHorizontal ? 12 : 7;
  const surfaceClass = inverted ? "bg-background-default-color-bg text-text-color-text" : "bg-background-color-bg-primary text-text-color-text-on-color";
  const arrowClass = inverted ? "fill-background-default-color-bg" : "fill-background-color-bg-primary";

  return (
    <TooltipPrimitive.Content
      ref={ref}
      side={side}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      className={cn(
        "z-50 overflow-hidden whitespace-nowrap rounded-[6px] px-3 py-1.5 text-[12px] font-medium leading-4",
        surfaceClass,
        className
      )}
      {...props}
    >
      {children}
      {arrow ? (
        <TooltipPrimitive.Arrow
          width={arrowWidth}
          height={arrowHeight}
          className={arrowClass}
        />
      ) : null}
    </TooltipPrimitive.Content>
  );
  }
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
