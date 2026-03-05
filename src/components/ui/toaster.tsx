import * as React from "react";
import { cn } from "../../lib/utils";
import { useToast } from "./use-toast";
import { Toast, ToastAction, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast";

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
      <rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M5 15V5a1 1 0 0 1 1-1h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <path d="M8 12.5L10.5 15L16 9.5" stroke="rgb(var(--background-default-color-bg))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <path d="M9 9L15 15M15 9L9 15" stroke="rgb(var(--background-default-color-bg))" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <path d="M12 10V16" stroke="rgb(var(--background-default-color-bg))" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="7.5" r="1.2" fill="rgb(var(--background-default-color-bg))" />
    </svg>
  );
}

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant = "default", theme = "light", ...props }) => {
        const resolvedVariant = (variant ?? "default") as "default" | "success" | "error" | "info";
        const resolvedTheme = (theme ?? "light") as "light" | "dark";
        const isStatus = resolvedVariant === "success" || resolvedVariant === "error";
        const actionNode = action ? (
          <ToastPrimitivesActionWrapper variant={resolvedVariant} altText={action.props.altText}>
            {action.props.children}
          </ToastPrimitivesActionWrapper>
        ) : null;

        return (
          <Toast key={id} variant={resolvedVariant} theme={resolvedTheme} className={cn(resolvedVariant === "default" ? "w-fit" : "w-full")} {...props}>
            {resolvedVariant === "default" ? (
              <div className="flex items-center gap-2">
                <span className="text-icon-color-icon">
                  <CopyIcon />
                </span>
                {title ? <ToastTitle className="text-[16px] font-normal leading-6 text-text-color-text">{title}</ToastTitle> : null}
              </div>
            ) : null}

            {resolvedVariant === "success" ? (
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="text-text-color-text-success">
                  <SuccessIcon />
                </span>
                {title ? <ToastTitle className="truncate text-[16px] font-normal leading-6 text-text-color-text-success">{title}</ToastTitle> : null}
              </div>
            ) : null}

            {resolvedVariant === "error" ? (
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="text-text-color-text-error">
                  <ErrorIcon />
                </span>
                {title ? <ToastTitle className="truncate text-[16px] font-normal leading-6 text-text-color-text-error">{title}</ToastTitle> : null}
              </div>
            ) : null}

            {resolvedVariant === "info" ? (
              <div className="flex min-w-0 flex-1 flex-col items-start justify-center">
                <div className="flex h-6 items-center gap-2">
                  <span className="text-text-color-text-magic">
                    <InfoIcon />
                  </span>
                  {title ? <ToastTitle className="text-[16px] font-semibold leading-6 text-text-color-text-magic">{title}</ToastTitle> : null}
                </div>
                {description ? (
                  <ToastDescription className="text-[14px] font-normal leading-5 text-text-color-text-muted">{description}</ToastDescription>
                ) : null}
              </div>
            ) : null}

            {actionNode ? (
              isStatus ? (
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "h-[21px] w-px",
                      resolvedVariant === "success" ? "bg-border-color-border-success" : "bg-border-color-border-error-muted"
                    )}
                  />
                  {actionNode}
                </div>
              ) : (
                actionNode
              )
            ) : null}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

function ToastPrimitivesActionWrapper({
  variant,
  altText,
  children,
}: {
  variant: "default" | "success" | "error" | "info";
  altText?: string;
  children: React.ReactNode;
}) {
  const className =
    variant === "success" || variant === "error"
      ? "h-auto bg-transparent p-0 text-[14px] font-medium leading-5 text-text-color-text hover:underline"
      : variant === "info"
        ? "h-8 rounded-[8px] bg-background-color-bg-secondary px-4 py-2 text-[12px] font-medium leading-4 text-text-color-text hover:bg-background-color-bg-secondary-hover"
        : "";

  return (
    <ToastAction altText={altText || "View"} className={className}>
      {children}
    </ToastAction>
  );
}
