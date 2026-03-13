import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Toaster } from "./ui/toaster";

const navItems = [
  { to: "/colors", label: "Colors" },
  { to: "/typography", label: "Typography" },
  { to: "/components", label: "Components" },
];

const patternItems = [
  { to: "/patterns/token-creation-dialog", label: "Token creation dialog" },
  { to: "/patterns/deposit-dialog", label: "Deposit dialog" },
];

export function Layout() {
  const location = useLocation();
  const patternsGroupActive = location.pathname.startsWith("/patterns");
  const [patternsExpanded, setPatternsExpanded] = useState(patternsGroupActive);

  useEffect(() => {
    if (patternsGroupActive) {
      setPatternsExpanded(true);
    }
  }, [patternsGroupActive]);

  return (
    <div className="min-h-screen bg-background-default-color-bg text-text-color-text">
      <header className="sticky top-0 z-10 border-b border-border-color-border bg-background-default-color-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-color-text-muted">Bankr</p>
            <h1 className="text-lg font-semibold">Design System Docs</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[230px_1fr]">
        <aside className="card h-fit lg:sticky lg:top-24">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "block rounded-md px-3 py-2 text-sm transition",
                    isActive
                      ? "bg-background-magic-color-bg-magic text-text-color-text-on-color"
                      : "text-text-color-text-muted hover:bg-background-default-color-bg-subtle hover:text-text-color-text",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="pt-2">
              <button
                type="button"
                aria-expanded={patternsExpanded}
                className={[
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs-semibold transition",
                  patternsGroupActive
                    ? "text-text-color-text"
                    : "text-text-color-text-muted hover:bg-background-default-color-bg-subtle hover:text-text-color-text",
                ].join(" ")}
                onClick={() => {
                  if (!patternsGroupActive) {
                    setPatternsExpanded((prev) => !prev);
                  }
                }}
              >
                <span>Patterns</span>
                <span className="text-xs">{patternsExpanded ? "−" : "+"}</span>
              </button>
              {patternsExpanded ? (
                <div className="mt-1 space-y-1">
                  {patternItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        [
                          "block rounded-md px-3 py-2 pl-5 text-sm transition",
                          isActive
                            ? "bg-background-magic-color-bg-magic text-text-color-text-on-color"
                            : "text-text-color-text-muted hover:bg-background-default-color-bg-subtle hover:text-text-color-text",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>
        </aside>

        <main className="space-y-6">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
