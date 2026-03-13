import { Badge } from "../../components/ui/badge";
import { DepositDialog } from "../../patterns/deposit-dialog";

export function DepositDialogPatternPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs text-text-color-text-muted">Patterns / Deposit dialog</p>
        <h2 className="text-2xl font-semibold text-text-color-text">Deposit dialog</h2>
        <p className="mt-1 text-sm text-text-color-text-muted">
          A task-oriented flow for funding a wallet using existing Bankr design system components.
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
          This demo keeps the dialog visible by default so the full deposit flow and hierarchy can be reviewed in context.
        </p>
        <DepositDialog />
      </article>
    </section>
  );
}
