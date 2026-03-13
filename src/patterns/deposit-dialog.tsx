import { useMemo, useState, type SVGProps } from "react";
import { Button } from "../components/ui/button";
import { Combobox } from "../components/ui/combobox";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const chainOptions = ["Base", "Ethereum", "Solana", "Polygon"] as const;

function ChainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 14.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="4.8" r="0.8" fill="currentColor" />
    </svg>
  );
}

function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <rect x="5" y="3" width="8" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 3V2.5C11 1.67 10.33 1 9.5 1H3.5C2.67 1 2 1.67 2 2.5V10.5C2 11.33 2.67 12 3.5 12H4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type DepositDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function DepositDialog({ open = true, onOpenChange }: DepositDialogProps) {
  const [internalOpen, setInternalOpen] = useState(open);
  const [chainOpen, setChainOpen] = useState(false);
  const [selectedChainIndex, setSelectedChainIndex] = useState<number | null>(0);

  const resolvedOpen = onOpenChange ? open : internalOpen;
  const setOpen = (nextOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(nextOpen);
      return;
    }
    setInternalOpen(nextOpen);
  };

  const selectedChain = useMemo(
    () => (selectedChainIndex !== null ? chainOptions[selectedChainIndex] : undefined),
    [selectedChainIndex]
  );

  return (
    <Dialog open={resolvedOpen} onOpenChange={setOpen}>
      {!resolvedOpen ? (
        <DialogTrigger asChild>
          <Button variant="outline">Open deposit dialog</Button>
        </DialogTrigger>
      ) : null}
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
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

        <DialogBody className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm-medium text-text-color-text">Select a chain to receive your funds</p>
              <Combobox
                value={selectedChain}
                open={chainOpen}
                selectedOptionIndex={selectedChainIndex}
                options={[...chainOptions]}
                visualState={chainOpen ? "open" : "default"}
                leadingIcon={<ChainIcon className="size-5 text-icon-color-icon" />}
                onClick={() => setChainOpen((prev) => !prev)}
                onOptionSelect={(index) => {
                  setSelectedChainIndex(index);
                  setChainOpen(false);
                }}
                aria-label="Select chain"
              />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm-medium text-text-color-text">Choose how you'd like to fund your trading wallet.</p>
              <div className="flex items-start gap-2 rounded-[8px] bg-background-default-color-bg-subtle px-3 py-2">
                <InfoIcon className="mt-0.5 size-4 shrink-0 text-icon-color-icon-muted" />
                <p className="text-sm text-text-color-text-muted">
                  You can send coins directly to your trading wallet on supported networks. Copy your address below.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-[8px] bg-background-default-color-bg-subtle px-3 py-2">
                <span className="text-sm text-text-color-text-muted">Balance</span>
                <span className="text-sm-medium text-text-color-text">$65.8692</span>
              </div>
              <div className="flex items-center justify-between rounded-[8px] bg-background-default-color-bg-subtle px-3 py-2">
                <span className="text-sm text-text-color-text-muted">Trading wallet</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm-medium text-text-color-text">0x087...7deafe</span>
                  <button
                    type="button"
                    className="inline-flex size-6 items-center justify-center rounded-[6px] text-icon-color-icon-muted transition-colors hover:bg-background-default-color-bg-elevated hover:text-icon-color-icon"
                    aria-label="Copy trading wallet"
                  >
                    <CopyIcon className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-sm-medium text-text-color-text">Credit or Debit Card</p>
              <div className="rounded-[8px] bg-background-default-color-bg-subtle px-3 py-2">
                <p className="text-sm text-text-color-text-muted">
                  No KYC required, US only - deposit up to $500/week (debit card recommended)
                </p>
              </div>
              <Button variant="brand" size="md" className="w-full">
                Continue
              </Button>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
