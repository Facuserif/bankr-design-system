import { colorModeLabel, cssColor, tokenColors } from "../data/tokens";

type SwatchProps = {
  mode: "light" | "dark";
  rgb: string;
};

function Swatch({ mode, rgb }: SwatchProps) {
  return (
    <div className="rounded-lg border border-border-color-border bg-background-default-color-bg p-3">
      <div className="mb-2 flex items-center justify-between text-xs text-text-color-text-muted">
        <span>{colorModeLabel(mode)}</span>
        <span className="font-mono">{rgb}</span>
      </div>
      <div className="h-14 rounded-md border border-border-color-border" style={{ backgroundColor: cssColor(rgb) }} />
    </div>
  );
}

export function ColorsPage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Color Tokens</h2>
        <p className="mt-1 text-sm text-text-color-text-muted">
          Semantic tokens rendered with Light and Dark values from <span className="font-mono">globals.css</span>.
        </p>
      </div>

      <div className="grid gap-4">
        {tokenColors.map((token) => (
          <article key={token.key} className="card space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold">{token.tokenName}</h3>
              <span className="token-code">{token.cssVar}</span>
              <span className="token-code">{token.utility}</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Swatch mode="light" rgb={token.lightRgb} />
              <Swatch mode="dark" rgb={token.darkRgb} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
