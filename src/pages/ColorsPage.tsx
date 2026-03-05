import { useState } from "react";
import { colorModeLabel, tokenColors } from "../data/tokens";

type SwatchProps = {
  mode: "light" | "dark";
  hex: string;
  alphaPercent: number | null;
};

function Swatch({ mode, hex, alphaPercent }: SwatchProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-lg border border-border-color-border bg-background-default-color-bg p-3">
      <div className="mb-2 flex items-center justify-between gap-2 text-xs text-text-color-text-muted">
        <span>{colorModeLabel(mode)}</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-text-color-text">
            {hex}
            {alphaPercent !== null ? (
              <span className="ml-1 text-text-color-text-muted">{`(${alphaPercent}%)`}</span>
            ) : null}
          </span>
          <button
            type="button"
            onClick={onCopy}
            className="rounded-md border border-border-color-border px-2 py-0.5 text-xs text-text-color-text transition-colors hover:bg-background-default-color-bg-subtle"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div className="h-14 rounded-md border border-border-color-border" style={{ backgroundColor: hex }} />
    </div>
  );
}

export function ColorsPage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Color Tokens</h2>
        <p className="mt-1 text-sm text-text-color-text-muted">
          Semantic tokens rendered with Light and Dark HEX values from exported Figma tokens (with globals.css fallback).
        </p>
      </div>

      <div className="grid gap-4">
        {tokenColors.map((token) => (
          <article key={token.key} className="card space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold">{token.tokenName}</h3>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Swatch mode="light" hex={token.lightHex} alphaPercent={token.lightAlphaPercent} />
              <Swatch mode="dark" hex={token.darkHex} alphaPercent={token.darkAlphaPercent} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
