export const THEME_KEY = "bankr-docs-theme";

export type Theme = "light" | "dark";

export function getInitialTheme(): Theme {
  const persisted = window.localStorage.getItem(THEME_KEY);
  if (persisted === "light" || persisted === "dark") {
    return persisted;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem(THEME_KEY, theme);
}
