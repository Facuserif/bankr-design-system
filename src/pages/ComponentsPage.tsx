import { type SVGProps, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { TextField } from "../components/ui/text-field";
import { Switch } from "../components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ToastAction } from "../components/ui/toast";
import { toast } from "../components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";

const buttonVariants = ["primary", "secondary", "outline", "ghost", "brand"] as const;
const buttonSizes = ["sm", "md", "lg", "xl"] as const;
const buttonStates = ["default", "hover", "focused", "disabled"] as const;
const switchSizes = ["sm", "md"] as const;
const badgeSizes = ["sm", "md", "lg"] as const;
const badgeVariantDefs = [
  { variant: "solid", colors: ["primary", "brand", "green", "red"] },
  { variant: "soft", colors: ["primary", "brand", "green", "red"] },
  { variant: "outline", colors: ["primary", "brand", "green", "red"] },
  { variant: "surface", colors: ["primary", "brand", "green", "red", "yellow"] },
] as const;

function DemoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-3">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-text-color-text-muted">{subtitle}</p>
    </div>
  );
}

export function ComponentsPage() {
  const [showShortcuts, setShowShortcuts] = useState(true);
  const [view, setView] = useState("compact");
  const [inputValue, setInputValue] = useState("");
  const [inputHasError, setInputHasError] = useState(false);
  const infoDescription = "Crypto ipsum bitcoin ethereum dogecoin litecoin. Elrond BitTorrent neo.";

  const triggerToastSet = (theme: "light" | "dark") => {
    return {
      copy: () =>
        toast({
          title: "Copied to clipboard",
          variant: "default",
          theme,
        }),
      success: () =>
        toast({
          title: "Success task",
          variant: "success",
          theme,
          action: <ToastAction altText="View">View</ToastAction>,
        }),
      error: () =>
        toast({
          title: "Error task",
          variant: "error",
          theme,
          action: <ToastAction altText="View">View</ToastAction>,
        }),
      info: () =>
        toast({
          title: "Some info",
          description: infoDescription,
          variant: "info",
          theme,
          action: <ToastAction altText="View">View</ToastAction>,
        }),
    };
  };

  const lightToasts = triggerToastSet("light");
  const darkToasts = triggerToastSet("dark");

  return (
    <TooltipProvider>
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Components</h2>
          <p className="mt-1 text-sm text-text-color-text-muted">
            Token-driven component primitives built with shadcn/ui patterns and Tailwind.
          </p>
        </div>

        <div className="card space-y-6">
          <SectionTitle title="Button" subtitle="Complete Type × Size × State plus icon placements and icon-only." />

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-color-text-muted">All Variants × Sizes (default)</p>
            {buttonVariants.map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-3">
                <span className="w-20 text-xs uppercase tracking-wide text-text-color-text-muted">{variant}</span>
                {buttonSizes.map((size) => (
                  <Button key={`${variant}-${size}`} variant={variant} size={size}>
                    {size}
                  </Button>
                ))}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-color-text-muted">All Variants × States (md)</p>
            {buttonVariants.map((variant) => (
              <div key={`${variant}-states`} className="flex flex-wrap items-center gap-3">
                <span className="w-20 text-xs uppercase tracking-wide text-text-color-text-muted">{variant}</span>
                {buttonStates.map((state) => (
                  <Button
                    key={`${variant}-${state}`}
                    variant={variant}
                    size="md"
                    state={state === "disabled" ? "default" : state}
                    disabled={state === "disabled"}
                  >
                    {state}
                  </Button>
                ))}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-color-text-muted">Icon Placements + Icon-Only (primary)</p>
            {buttonSizes.map((size) => (
              <div key={`icons-${size}`} className="flex flex-wrap items-center gap-3">
                <span className="w-20 text-xs uppercase tracking-wide text-text-color-text-muted">{size}</span>
                <Button variant="primary" size={size} leadingIcon={<DemoIcon />}>
                  Leading
                </Button>
                <Button variant="primary" size={size} trailingIcon={<DemoIcon />}>
                  Trailing
                </Button>
                <Button variant="primary" size={size} leadingIcon={<DemoIcon />} trailingIcon={<DemoIcon />}>
                  Both
                </Button>
                <Button variant="primary" size={size} iconOnly leadingIcon={<DemoIcon />} aria-label={`Icon-only ${size}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="card space-y-4">
          <SectionTitle title="TextField / Input" subtitle="Interactive + disabled demos using the Figma-aligned field behavior." />

          <div className="rounded-lg border border-border-color-border bg-background-default-color-bg p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-color-text-muted">Interactive</p>
              <label className="flex items-center gap-2 text-sm text-text-color-text-muted">
                <span>Error</span>
                <Switch checked={inputHasError} onCheckedChange={setInputHasError} size="sm" />
              </label>
            </div>
            <TextField
              label="Label"
              placeholder="Input text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              filled={true}
              hasError={inputHasError}
              errorText="This field has an error."
              helperText="Helper text"
              aria-label="Interactive text field"
            />
          </div>

          <div className="rounded-lg border border-border-color-border bg-background-default-color-bg p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-color-text-muted">Disabled</p>
            <TextField label="Label" placeholder="Input text" disabled aria-label="Disabled text field" />
          </div>
        </div>

        <div className="card space-y-4">
          <SectionTitle title="Tabs" subtitle="Figma parity preview on both surfaces (light and dark)." />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-border-color-border bg-background-default-color-bg p-4">
              <p className="mb-3 text-xs uppercase tracking-wide text-text-color-text-muted">Light surface</p>
              <Tabs defaultValue="tab-1" className="w-full">
                <TabsList className="w-auto">
                  <TabsTrigger value="tab-1">Label</TabsTrigger>
                  <TabsTrigger value="tab-2">Label</TabsTrigger>
                  <TabsTrigger value="tab-3">Label</TabsTrigger>
                  <TabsTrigger value="tab-4" disabled>
                    Label
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="tab-1">Active tab content</TabsContent>
                <TabsContent value="tab-2">Tab content</TabsContent>
                <TabsContent value="tab-3">Tab content</TabsContent>
                <TabsContent value="tab-4">Tab content</TabsContent>
              </Tabs>
            </div>

            <div className="dark rounded-xl border border-border-color-border bg-background-color-bg p-4">
              <p className="mb-3 text-xs uppercase tracking-wide text-text-color-text-muted">Dark surface</p>
              <Tabs defaultValue="tab-1" className="w-full">
                <TabsList className="w-auto">
                  <TabsTrigger value="tab-1">Label</TabsTrigger>
                  <TabsTrigger value="tab-2">Label</TabsTrigger>
                  <TabsTrigger value="tab-3">Label</TabsTrigger>
                  <TabsTrigger value="tab-4" disabled>
                    Label
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="tab-1">Active tab content</TabsContent>
                <TabsContent value="tab-2">Tab content</TabsContent>
                <TabsContent value="tab-3">Tab content</TabsContent>
                <TabsContent value="tab-4">Tab content</TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="card">
          <SectionTitle title="DropdownMenu" subtitle="Menu items, checkbox items, and radio groups using Radix." />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Preferences</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={showShortcuts} onCheckedChange={(checked) => setShowShortcuts(Boolean(checked))}>
                Show shortcuts
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={view} onValueChange={setView}>
                <DropdownMenuRadioItem value="compact">Compact view</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="comfortable">Comfortable view</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="card space-y-4">
          <SectionTitle title="Switch" subtitle="Figma parity tiles for size, state, and label composition." />

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-color-text-muted">Size</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {switchSizes.map((size) => (
                <div key={`size-${size}`} className="rounded-lg border border-border-color-border bg-background-default-color-bg p-6">
                  <div className="mb-3 text-center text-xs uppercase tracking-wide text-text-color-text-muted">{size}</div>
                  <div className="flex items-center justify-center">
                    <Switch size={size} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-color-text-muted">State</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border-color-border bg-background-default-color-bg p-6">
                <div className="mb-3 text-center text-xs uppercase tracking-wide text-text-color-text-muted">Off</div>
                <div className="flex items-center justify-center">
                  <Switch size="md" />
                </div>
              </div>
              <div className="rounded-lg border border-border-color-border bg-background-default-color-bg p-6">
                <div className="mb-3 text-center text-xs uppercase tracking-wide text-text-color-text-muted">On</div>
                <div className="flex items-center justify-center">
                  <Switch size="md" checked />
                </div>
              </div>
              <div className="rounded-lg border border-border-color-border bg-background-default-color-bg p-6">
                <div className="mb-3 text-center text-xs uppercase tracking-wide text-text-color-text-muted">Disabled</div>
                <div className="flex items-center justify-center">
                  <Switch size="md" disabled />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-color-text-muted">With label</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border-color-border bg-background-default-color-bg p-6">
                <div className="mb-3 text-center text-xs uppercase tracking-wide text-text-color-text-muted">Light</div>
                <div className="flex items-center justify-center gap-2">
                  <Switch size="md" />
                  <span className="text-[14px] font-medium leading-5 text-text-color-text">Label</span>
                </div>
              </div>
              <div className="rounded-lg border border-border-color-border bg-background-default-color-bg p-6 dark">
                <div className="mb-3 text-center text-xs uppercase tracking-wide text-text-color-text-muted">Dark</div>
                <div className="flex items-center justify-center gap-2">
                  <Switch size="md" checked />
                  <span className="text-[14px] font-medium leading-5 text-text-color-text">Label</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card space-y-6">
          <SectionTitle title="Badge" subtitle="Figma matrix: Size × Variant × Color with optional icon." />
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-color-text-muted">With icon</p>
            {badgeSizes.map((size) => (
              <div key={size} className="space-y-3">
                <p className="text-xs text-text-color-text-muted">Size {size}</p>
                {badgeVariantDefs.map(({ variant, colors }) => (
                  <div key={`${size}-${variant}`} className="flex flex-wrap items-center gap-2">
                    <span className="w-16 text-xs uppercase tracking-wide text-text-color-text-muted">{variant}</span>
                    {colors.map((color) => (
                      <Badge key={`${size}-${variant}-${color}`} size={size} variant={variant} color={color} icon={<DemoIcon />}>
                        {color}
                      </Badge>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-color-text-muted">Text-only (no icon)</p>
            {badgeSizes.map((size) => (
              <div key={`no-icon-${size}`} className="space-y-3">
                <p className="text-xs text-text-color-text-muted">Size {size}</p>
                {badgeVariantDefs.map(({ variant, colors }) => (
                  <div key={`no-icon-${size}-${variant}`} className="flex flex-wrap items-center gap-2">
                    <span className="w-16 text-xs uppercase tracking-wide text-text-color-text-muted">{variant}</span>
                    {colors.map((color) => (
                      <Badge key={`no-icon-${size}-${variant}-${color}`} size={size} variant={variant} color={color}>
                        {color}
                      </Badge>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="card space-y-4">
          <SectionTitle title="Tooltip" subtitle="Light and dark surface demos with top/center placement and 4px offset." />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border-color-border bg-background-default-color-bg p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-color-text-muted">Light surface</p>
              <div className="flex items-center justify-center py-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="rounded-md border border-border-color-border bg-background-default-color-bg-elevated px-3 py-1 text-xs text-text-color-text-muted"
                    >
                      Hover
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" sideOffset={4} arrow>
                    Add to library
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="rounded-xl border border-border-color-border bg-background-color-bg-primary p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-color-text-on-color">Dark surface</p>
              <div className="flex items-center justify-center py-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="rounded-md border border-border-color-border-on-color bg-background-default-color-bg-elevated px-3 py-1 text-xs text-text-color-text"
                    >
                      Hover
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" sideOffset={4} arrow inverted>
                    Add to library
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <div className="card space-y-4">
          <SectionTitle title="Toast" subtitle="Interactive Figma matrix triggers for light and dark themes." />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border-color-border bg-background-default-color-bg p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-color-text-muted">Light surface</p>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" variant="outline" onClick={lightToasts.copy}>
                  Show: Copied
                </Button>
                <Button size="sm" variant="outline" onClick={lightToasts.success}>
                  Show: Success task
                </Button>
                <Button size="sm" variant="outline" onClick={lightToasts.error}>
                  Show: Error task
                </Button>
                <Button size="sm" variant="outline" onClick={lightToasts.info}>
                  Show: Some info
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border-color-border bg-background-color-bg-primary p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-color-text-on-color">Dark surface</p>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" variant="outline" onClick={darkToasts.copy}>
                  Show: Copied
                </Button>
                <Button size="sm" variant="outline" onClick={darkToasts.success}>
                  Show: Success task
                </Button>
                <Button size="sm" variant="outline" onClick={darkToasts.error}>
                  Show: Error task
                </Button>
                <Button size="sm" variant="outline" onClick={darkToasts.info}>
                  Show: Some info
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <SectionTitle title="Table" subtitle="Structured data table using semantic borders and surfaces." />
          <Table>
            <TableCaption>Recent invoices</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>INV-001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>INV-002</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>Bank transfer</TableCell>
                <TableCell className="text-right">$145.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>INV-003</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Card</TableCell>
                <TableCell className="text-right">$520.00</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$915.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </section>
    </TooltipProvider>
  );
}
