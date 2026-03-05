import { NavLink, Outlet } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Toaster } from "./ui/toaster";

const navItems = [
  { to: "/colors", label: "Colors" },
  { to: "/typography", label: "Typography" },
  { to: "/components", label: "Components" },
];

export function Layout() {
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
