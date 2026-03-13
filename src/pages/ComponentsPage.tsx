import { type SVGProps, useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Combobox } from "../components/ui/combobox";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooterPrimaryAction,
  DialogFooterSecondaryAction,
  DialogFooter,
  DialogHeader,
  DialogMutedText,
  DialogSeparator,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
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
import { Input } from "../components/ui/input";
import { SearchBar } from "../components/ui/search-bar";
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
import { cn } from "../lib/utils";

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

function NetworkBaseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 text-icon-color-icon" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 14.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="space-y-0.5">
      <h3 className="text-[18px] font-semibold leading-[30px] text-text-color-text">{title}</h3>
      <p className="text-sm leading-5 text-text-color-text-muted">{subtitle}</p>
    </div>
  );
}

function SubsectionTitle({ children }: { children: string }) {
  return <p className="text-sm leading-5 text-text-color-text-disabled">{children}</p>;
}

function RowLabel({ children }: { children: string }) {
  return <span className="w-20 text-xs-semibold leading-4 text-text-color-text-disabled">{children}</span>;
}

export function ComponentsPage() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  const [showShortcuts, setShowShortcuts] = useState(true);
  const [view, setView] = useState("compact");
  const [inputValue, setInputValue] = useState("");
  const [inputHasError, setInputHasError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [interactiveComboboxOpen, setInteractiveComboboxOpen] = useState(false);
  const [interactiveComboboxSelectedIndex, setInteractiveComboboxSelectedIndex] = useState<number | null>(null);
  const infoDescription = "Crypto ipsum bitcoin ethereum dogecoin litecoin. Elrond BitTorrent neo.";
  const isDarkTheme = activeTheme === "dark";

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => {
      setActiveTheme(root.classList.contains("dark") ? "dark" : "light");
    };

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

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

  const themedToasts = triggerToastSet(activeTheme);
  const comboboxOptions = ["Base", "Base", "Base", "Base", "Base"];
  const interactiveComboboxValue =
    interactiveComboboxSelectedIndex !== null ? comboboxOptions[interactiveComboboxSelectedIndex] : undefined;

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
            <SubsectionTitle>All Variants × Sizes (default)</SubsectionTitle>
            {buttonVariants.map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-3">
                <RowLabel>{variant}</RowLabel>
                {buttonSizes.map((size) => (
                  <Button key={`${variant}-${size}`} variant={variant} size={size}>
                    {size}
                  </Button>
                ))}
              </div>
            ))}
          </div>

          <div className="space-y-4 border-t border-border-color-border pt-6">
            <SubsectionTitle>All Variants × States (md)</SubsectionTitle>
            {buttonVariants.map((variant) => (
              <div key={`${variant}-states`} className="flex flex-wrap items-center gap-3">
                <RowLabel>{variant}</RowLabel>
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

          <div className="space-y-4 border-t border-border-color-border pt-6">
            <SubsectionTitle>Icon Placements + Icon-Only (primary)</SubsectionTitle>
            {buttonSizes.map((size) => (
              <div key={`icons-${size}`} className="flex flex-wrap items-center gap-3">
                <RowLabel>{size}</RowLabel>
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

        <div className="card space-y-6">
          <SectionTitle title="TextField / Input" subtitle="Interactive + disabled demos using the Figma-aligned field behavior." />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <SubsectionTitle>Interactive example</SubsectionTitle>
              <label className="flex items-center gap-2 text-xs leading-4 text-text-color-text-disabled">
                <span>Error</span>
                <Switch checked={inputHasError} onCheckedChange={setInputHasError} size="sm" />
              </label>
            </div>
            <Input
              placeholder="Input text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              hasError={inputHasError}
              aria-label="Interactive text field"
            />
          </div>

          <div className="space-y-3 border-t border-border-color-border pt-6">
            <SubsectionTitle>Disabled</SubsectionTitle>
            <Input placeholder="Input text" disabled aria-label="Disabled text field" />
          </div>

          <div className="space-y-4 border-t border-border-color-border pt-6">
            <SubsectionTitle>State matrix</SubsectionTitle>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Default</p>
                <Input placeholder="Input text" aria-label="Input default state" />
              </div>
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Hover</p>
                <Input className="border-border-color-border-hover" placeholder="Input text" aria-label="Input hover state" />
              </div>
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Focused</p>
                <Input
                  className="border-border-color-border-focus-ring bg-background-default-color-bg-surface"
                  placeholder="Input text"
                  aria-label="Input focused state"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Filled</p>
                <Input filled value="Input text" readOnly aria-label="Input filled state" />
              </div>
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Error</p>
                <Input hasError value="Input text" readOnly aria-label="Input error state" />
              </div>
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Disabled</p>
                <Input placeholder="Input text" disabled aria-label="Input disabled state" />
              </div>
            </div>
          </div>
        </div>

        <div className="card space-y-6">
          <SectionTitle title="Search Bar" subtitle="Search input with leading icon and pill container." />
          <div className="space-y-3">
            <SubsectionTitle>Interactive example</SubsectionTitle>
            <SearchBar placeholder="Text" containerClassName="w-full" aria-label="Search" />
          </div>
          <div className="space-y-4 border-t border-border-color-border pt-6">
            <SubsectionTitle>State matrix</SubsectionTitle>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Default</p>
                <SearchBar placeholder="Text" containerClassName="w-full" aria-label="Search default state" />
              </div>
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Hover</p>
                <SearchBar placeholder="Text" containerClassName="w-full border-border-color-border-hover" aria-label="Search hover state" />
              </div>
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Focused</p>
                <SearchBar
                  placeholder="Text"
                  containerClassName="w-full border-border-color-border-focus-ring bg-background-default-color-bg-surface"
                  aria-label="Search focused state"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Disabled</p>
                <SearchBar placeholder="Text" containerClassName="w-full" disabled aria-label="Search disabled state" />
              </div>
            </div>
          </div>
        </div>

        <div className="card space-y-6">
          <SectionTitle title="Combobox" subtitle="Chain selector trigger with leading icon and expand indicator." />
          <div className="space-y-4">
            <SubsectionTitle>Interactive example</SubsectionTitle>
            <Combobox
              value={interactiveComboboxValue}
              placeholder="Base"
              visualState={interactiveComboboxOpen ? "open" : "default"}
              open={interactiveComboboxOpen}
              selectedOptionIndex={interactiveComboboxSelectedIndex}
              options={comboboxOptions}
              leadingIcon={<NetworkBaseIcon />}
              className="max-w-[320px]"
              aria-label="Interactive combobox"
              onClick={() => setInteractiveComboboxOpen((prev) => !prev)}
              onOptionSelect={(index) => {
                setInteractiveComboboxSelectedIndex(index);
                setInteractiveComboboxOpen(false);
              }}
            />
          </div>
          <div className="space-y-4 border-t border-border-color-border pt-6">
            <SubsectionTitle>State matrix</SubsectionTitle>
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Default / closed</p>
                <Combobox value="Base" visualState="default" leadingIcon={<NetworkBaseIcon />} className="max-w-[320px]" aria-label="Combobox default" />
              </div>
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Hover</p>
                <Combobox value="Base" visualState="hover" leadingIcon={<NetworkBaseIcon />} className="max-w-[320px]" aria-label="Combobox hover" />
              </div>
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Focused</p>
                <Combobox value="Base" visualState="focus" leadingIcon={<NetworkBaseIcon />} className="max-w-[320px]" aria-label="Combobox focused" />
              </div>
              <div className="space-y-2">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Disabled</p>
                <Combobox value="Base" disabled leadingIcon={<NetworkBaseIcon />} className="max-w-[320px]" aria-label="Combobox disabled" />
              </div>
              <div className="space-y-2 pb-64">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Open</p>
                <Combobox
                  value="Base"
                  visualState="open"
                  open
                  selectedOptionIndex={null}
                  options={["Base", "Base", "Base", "Base", "Base"]}
                  leadingIcon={<NetworkBaseIcon />}
                  className="max-w-[320px]"
                  aria-label="Combobox open"
                />
              </div>
              <div className="space-y-2 pb-64">
                <p className="text-xs-semibold leading-4 text-text-color-text-disabled">Open + selected option</p>
                <Combobox
                  value="Base"
                  visualState="open"
                  open
                  selectedOptionIndex={1}
                  options={["Base", "Base", "Base", "Base", "Base"]}
                  leadingIcon={<NetworkBaseIcon />}
                  className="max-w-[320px]"
                  aria-label="Combobox open selected"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card space-y-6">
          <SectionTitle title="Tabs" subtitle="Theme-aware Figma parity preview for the active page theme." />
          <SubsectionTitle>{isDarkTheme ? "Dark surface" : "Light surface"}</SubsectionTitle>
          <Tabs defaultValue="tab-1" className="w-full">
            <TabsList className="w-full">
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

        <div className="card space-y-6">
          <SectionTitle title="Dropdown Menu" subtitle="Menu items, checkbox items, and radio groups using Radix." />
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

        <div className="card space-y-6">
          <SectionTitle title="Dialog" subtitle="Theme-aware modal with header, content, divider, and footer actions." />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog title</DialogTitle>
                <DialogClose
                  className="inline-flex size-8 items-center justify-center rounded-[8px] border border-border-color-border p-2 text-icon-color-icon-muted transition-colors hover:border-border-color-border-hover hover:bg-background-default-color-bg-subtle"
                  aria-label="Close dialog"
                >
                  <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
                    <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </DialogClose>
              </DialogHeader>
              <DialogBody>
                <DialogDescription>Dialog subtitle</DialogDescription>
                <DialogMutedText>
                  Crypto ipsum bitcoin ethereum dogecoin litecoin. Shiba-inu XRP ethereum tezos uniswap serum horizen.
                </DialogMutedText>
              </DialogBody>
              <DialogSeparator />
              <DialogFooter>
                <DialogClose asChild>
                  <DialogFooterSecondaryAction>Button</DialogFooterSecondaryAction>
                </DialogClose>
                <DialogFooterPrimaryAction onClick={() => setDialogOpen(false)}>Button</DialogFooterPrimaryAction>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="card space-y-6">
          <SectionTitle title="Switch" subtitle="Figma parity tiles for size, state, and label composition." />

          <div className="space-y-3">
            <SubsectionTitle>Size</SubsectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              {switchSizes.map((size) => (
                <div key={`size-${size}`} className="flex items-center gap-3">
                  <RowLabel>{size}</RowLabel>
                  <Switch size={size} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-border-color-border pt-6">
            <SubsectionTitle>With label</SubsectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Switch size="md" />
                <span className="text-[14px] font-medium leading-5 text-text-color-text">Label</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch size="md" checked />
                <span className="text-[14px] font-medium leading-5 text-text-color-text">Label</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card space-y-6">
          <SectionTitle title="Badge" subtitle="Figma matrix: text-only Size × Variant × Color." />
          <div className="space-y-4">
            <SubsectionTitle>Text-only (no icon)</SubsectionTitle>
            {badgeSizes.map((size, index) => (
              <div key={`no-icon-${size}`} className={cn("space-y-3", index > 0 && "border-t border-border-color-border pt-6")}>
                {badgeVariantDefs.map(({ variant, colors }) => (
                  <div key={`no-icon-${size}-${variant}`} className="flex flex-wrap items-center gap-2">
                    <RowLabel>{`${size} ${variant}`}</RowLabel>
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
          <SectionTitle title="Tooltip" subtitle="Theme-aware demo with top/center placement and 4px offset." />
          <div className="flex items-center justify-center py-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline">
                  Hover
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" sideOffset={4} arrow>
                Add to library
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="card space-y-4">
          <SectionTitle title="Toast" subtitle="Interactive toast triggers for the active page theme." />
          <p className="text-xs font-semibold uppercase tracking-wide text-text-color-text-muted">{isDarkTheme ? "Dark surface" : "Light surface"}</p>
          <div className="flex flex-wrap gap-3">
            <Button size="sm" variant="outline" onClick={themedToasts.copy}>
              Show: Copied
            </Button>
            <Button size="sm" variant="outline" onClick={themedToasts.success}>
              Show: Success task
            </Button>
            <Button size="sm" variant="outline" onClick={themedToasts.error}>
              Show: Error task
            </Button>
            <Button size="sm" variant="outline" onClick={themedToasts.info}>
              Show: Some info
            </Button>
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
