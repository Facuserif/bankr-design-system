import { useMemo, useState, type SVGProps } from "react";
import { Badge } from "../../components/ui/badge";
import { Combobox } from "../../components/ui/combobox";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogFooterPrimaryAction,
  DialogFooterSecondaryAction,
  DialogHeader,
  DialogMutedText,
  DialogSeparator,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Switch } from "../../components/ui/switch";

const networkOptions = ["Base", "Ethereum", "Solana", "Polygon"] as const;
const categoryOptions = ["Meme", "Utility", "Governance", "GameFi"] as const;

function NetworkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 14.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TokenCreationDialogPatternPage() {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [tokenName, setTokenName] = useState("Bankr Token");
  const [ticker, setTicker] = useState("BNKR");
  const [description, setDescription] = useState("");
  const [autoLiquidity, setAutoLiquidity] = useState(true);
  const [enableTrading, setEnableTrading] = useState(false);
  const [networkOpen, setNetworkOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedNetworkIndex, setSelectedNetworkIndex] = useState<number | null>(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(1);

  const selectedNetwork = useMemo(
    () => (selectedNetworkIndex !== null ? networkOptions[selectedNetworkIndex] : undefined),
    [selectedNetworkIndex]
  );
  const selectedCategory = useMemo(
    () => (selectedCategoryIndex !== null ? categoryOptions[selectedCategoryIndex] : undefined),
    [selectedCategoryIndex]
  );

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs text-text-color-text-muted">Patterns / Token creation dialog</p>
        <h2 className="text-2xl font-semibold text-text-color-text">Token creation dialog</h2>
        <p className="mt-1 text-sm text-text-color-text-muted">
          A composed flow for creating a token using existing Bankr design system components.
        </p>
      </div>

      <article className="card space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-color-text">Interactive demo</h3>
          <Badge variant="surface" color="brand" size="sm">
            Composed pattern
          </Badge>
        </div>
        <p className="text-sm text-text-color-text-muted">
          This demo intentionally keeps the dialog visible by default so the full token-creation structure is immediately inspectable.
        </p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {!dialogOpen ? (
            <DialogTrigger asChild>
              <DialogFooterPrimaryAction>Open token creation dialog</DialogFooterPrimaryAction>
            </DialogTrigger>
          ) : null}
          <DialogContent className="sm:max-w-[640px]">
            <DialogHeader>
              <DialogTitle>Create token</DialogTitle>
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
            <DialogBody className="space-y-8 p-6">
              <div className="space-y-2">
                <DialogDescription>Create your token metadata and launch settings.</DialogDescription>
                <DialogMutedText className="max-w-none">
                  Use this flow to configure naming, network, category, and optional launch controls.
                </DialogMutedText>
              </div>

              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs text-text-color-text-disabled">Token name</span>
                    <Input filled value={tokenName} onChange={(event) => setTokenName(event.target.value)} placeholder="My token" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-xs text-text-color-text-disabled">Ticker</span>
                    <Input filled value={ticker} onChange={(event) => setTicker(event.target.value.toUpperCase())} placeholder="TICK" />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-text-color-text-disabled">Network</span>
                    <Combobox
                      value={selectedNetwork}
                      open={networkOpen}
                      selectedOptionIndex={selectedNetworkIndex}
                      options={[...networkOptions]}
                      visualState={networkOpen ? "open" : "default"}
                      leadingIcon={<NetworkIcon className="size-5 text-icon-color-icon" />}
                      onClick={() => setNetworkOpen((prev) => !prev)}
                      onOptionSelect={(index) => {
                        setSelectedNetworkIndex(index);
                        setNetworkOpen(false);
                      }}
                      aria-label="Token network"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-text-color-text-disabled">Category</span>
                    <Combobox
                      value={selectedCategory}
                      open={categoryOpen}
                      selectedOptionIndex={selectedCategoryIndex}
                      options={[...categoryOptions]}
                      visualState={categoryOpen ? "open" : "default"}
                      onClick={() => setCategoryOpen((prev) => !prev)}
                      onOptionSelect={(index) => {
                        setSelectedCategoryIndex(index);
                        setCategoryOpen(false);
                      }}
                      aria-label="Token category"
                    />
                  </div>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-xs text-text-color-text-disabled">Description (optional)</span>
                  <Input
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="What is this token for?"
                  />
                </label>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-color-text">Auto liquidity</span>
                    <Switch checked={autoLiquidity} onCheckedChange={setAutoLiquidity} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-color-text">Enable trading on launch</span>
                    <Switch checked={enableTrading} onCheckedChange={setEnableTrading} />
                  </div>
                </div>
              </div>
            </DialogBody>
            <DialogSeparator />
            <DialogFooter>
              <DialogClose asChild>
                <DialogFooterSecondaryAction>Cancel</DialogFooterSecondaryAction>
              </DialogClose>
              <DialogFooterPrimaryAction>Create token</DialogFooterPrimaryAction>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </article>
    </section>
  );
}
