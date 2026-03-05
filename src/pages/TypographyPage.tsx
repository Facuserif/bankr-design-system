const typographyScale = [
  { key: "xs", px: "12px", regular: "text-xs", medium: "text-xs-medium", semibold: "text-xs-semibold" },
  { key: "sm", px: "14px", regular: "text-sm", medium: "text-sm-medium", semibold: "text-sm-semibold" },
  { key: "base", px: "16px", regular: "text-base", medium: "text-base-medium", semibold: "text-base-semibold" },
  { key: "md", px: "16px", regular: "text-md", medium: "text-md-medium", semibold: "text-md-semibold" },
  { key: "lg", px: "18px", regular: "text-lg", medium: "text-lg-medium", semibold: "text-lg-semibold" },
  { key: "xl", px: "20px", regular: "text-xl", medium: "text-xl-medium", semibold: "text-xl-semibold" },
  { key: "2xl", px: "24px", regular: "text-2xl", medium: "text-2xl-medium", semibold: "text-2xl-semibold" },
  { key: "3xl", px: "30px", regular: "text-3xl", medium: "text-3xl-medium", semibold: "text-3xl-semibold" },
] as const;

const samples = ["The quick brown fox jumps over the lazy dog", "0123456789 Bankr Design System"] as const;

type WeightRowProps = {
  label: "Regular" | "Medium" | "Semibold";
  className: string;
};

function WeightRow({ label, className }: WeightRowProps) {
  return (
    <div className="rounded-lg border border-border-color-border bg-background-default-color-bg-elevated p-4">
      <p className="text-sm font-medium text-text-color-text-muted">{label}</p>
      <div className="mt-2 space-y-2 text-text-color-text">
        <p className={className}>{samples[0]}</p>
        <p className={className}>{samples[1]}</p>
      </div>
    </div>
  );
}

export function TypographyPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-text-color-text">Typography</h2>
        <p className="mt-1 text-sm text-text-color-text-muted">Typography scale and font weights for the design system.</p>
      </div>

      <div className="space-y-4">
        {typographyScale.map((scale) => (
          <article key={scale.key} className="card space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-text-color-text">
              {scale.key}
              <span className="text-text-color-text-muted"> · {scale.px}</span>
            </h3>
            <div className="grid gap-3 md:grid-cols-3">
              <WeightRow label="Regular" className={scale.regular} />
              <WeightRow label="Medium" className={scale.medium} />
              <WeightRow label="Semibold" className={scale.semibold} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
