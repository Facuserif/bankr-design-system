import { useEffect, useState } from "react";
import { applyTheme, getInitialTheme, type Theme } from "../lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      className="rounded-md border border-border-color-border bg-background-default-color-bg-elevated px-3 py-2 text-sm font-medium hover:bg-background-default-color-bg-subtle"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "Switch to Dark" : "Switch to Light"}
    </button>
  );
}
