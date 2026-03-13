const patternEntries = ["Token creation dialog", "Agent configuration", "Settings panel"] as const;

export function PatternsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-text-color-text">Patterns</h2>
        <p className="mt-1 text-sm text-text-color-text-muted">
          Composed UI patterns built from existing design system components and tokens.
        </p>
      </div>

      <article className="card space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-text-color-text">Pattern entries</h3>
        <ul className="space-y-2">
          {patternEntries.map((entry) => (
            <li key={entry} className="rounded-md border border-border-color-border bg-background-default-color-bg px-3 py-2 text-sm text-text-color-text">
              {entry}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
