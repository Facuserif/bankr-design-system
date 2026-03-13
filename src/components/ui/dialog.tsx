import * as React from "react";
import { createPortal } from "react-dom";
import { Slot } from "@radix-ui/react-slot";
import { Button, type ButtonProps } from "./button";
import { cn } from "../../lib/utils";

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within <Dialog>");
  }
  return context;
}

type DialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

function Dialog({ open, defaultOpen = false, onOpenChange, children }: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  return <DialogContext.Provider value={{ open: resolvedOpen, setOpen }}>{children}</DialogContext.Provider>;
}

type DialogTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(({ asChild = false, onClick, ...props }, ref) => {
  const { setOpen } = useDialogContext();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(true);
        }
      }}
      {...props}
    />
  );
});
DialogTrigger.displayName = "DialogTrigger";

type DialogCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(({ asChild = false, onClick, ...props }, ref) => {
  const { setOpen } = useDialogContext();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
      {...props}
    />
  );
});
DialogClose.displayName = "DialogClose";

type DialogOverlayProps = React.HTMLAttributes<HTMLDivElement>;

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-background-color-bg-primary/35 backdrop-blur-[6px] dark:bg-background-color-bg/80",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

type DialogContentProps = React.HTMLAttributes<HTMLDivElement>;

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(({ className, children, ...props }, ref) => {
  const { open, setOpen } = useDialogContext();

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <DialogOverlay onClick={() => setOpen(false)} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-[51] w-full max-w-[327px] overflow-hidden rounded-[16px] border border-border-color-border bg-background-default-color-bg-surface",
          className
        )}
        onClick={(event) => event.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  );
});
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center justify-between gap-4 p-4", className)} {...props} />
));
DialogHeader.displayName = "DialogHeader";

const DialogBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2 px-4 pb-4", className)} {...props} />
));
DialogBody.displayName = "DialogBody";

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("m-0 text-md font-semibold leading-6 tracking-normal text-text-color-text", className)} {...props} />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("m-0 text-md font-normal leading-6 tracking-normal text-text-color-text", className)} {...props} />
));
DialogDescription.displayName = "DialogDescription";

const DialogMutedText = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("m-0 max-w-[295px] text-md font-normal leading-6 tracking-normal text-text-color-text-muted", className)} {...props} />
));
DialogMutedText.displayName = "DialogMutedText";

const DialogSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("h-px w-full bg-border-color-border", className)} {...props} />
));
DialogSeparator.displayName = "DialogSeparator";

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center justify-end gap-2 p-4", className)} {...props} />
));
DialogFooter.displayName = "DialogFooter";

type DialogFooterActionProps = Omit<ButtonProps, "variant">;

const DialogFooterSecondaryAction = React.forwardRef<HTMLButtonElement, DialogFooterActionProps>(
  ({ size = "md", ...props }, ref) => <Button ref={ref} variant="secondary" size={size} {...props} />
);
DialogFooterSecondaryAction.displayName = "DialogFooterSecondaryAction";

const DialogFooterPrimaryAction = React.forwardRef<HTMLButtonElement, DialogFooterActionProps>(
  ({ size = "md", ...props }, ref) => <Button ref={ref} variant="brand" size={size} {...props} />
);
DialogFooterPrimaryAction.displayName = "DialogFooterPrimaryAction";

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogMutedText,
  DialogOverlay,
  DialogFooterPrimaryAction,
  DialogFooterSecondaryAction,
  DialogSeparator,
  DialogTitle,
  DialogTrigger,
};
