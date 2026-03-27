import mappingMarkdown from "../../docs/mapping.md?raw";
import globalsCss from "../styles/globals.css?raw";
import colorModeResolved from "./color-mode-resolved.json";
import colorPrimitives from "./color-primitives.json";

type Mode = "light" | "dark";

type MappingRow = {
  tokenName: string;
  cssVar: string;
  utility: string;
};

type PrimitiveColorNode = {
  $type?: string;
  $value?: {
    hex?: string;
  };
  [key: string]: unknown;
};

export type TokenColorData = {
  tokenName: string;
  key: string;
  cssVar: string;
  utility: string;
  lightHex: string;
  darkHex: string;
  lightAlphaPercent: number | null;
  darkAlphaPercent: number | null;
  lightPrimitiveName: string | null;
  darkPrimitiveName: string | null;
};

function parseVarBlock(css: string, selector: ":root" | ".dark"): Record<string, string> {
  const match = css.match(new RegExp(`${selector.replace(".", "\\.")}\\s*\\{([\\s\\S]*?)\\n\\}`));
  if (!match) {
    return {};
  }

  const block = match[1];
  const vars: Record<string, string> = {};

  for (const row of block.split("\n")) {
    const line = row.trim();
    if (!line.startsWith("--")) {
      continue;
    }

    const [name, rawValue] = line.split(":");
    if (!name || !rawValue) {
      continue;
    }

    const value = rawValue.replace(";", "").trim();
    vars[name] = value;
  }

  return vars;
}

function parseMapping(md: string): MappingRow[] {
  const rows = md.split("\n").filter((line) => line.startsWith("| `") && line.includes("--"));

  return rows.map((line) => {
    const cols = line
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => item.replace(/`/g, ""));

    return {
      tokenName: cols[0],
      cssVar: cols[1],
      utility: cols[3],
    };
  });
}

const lightVars = parseVarBlock(globalsCss, ":root");
const darkVars = parseVarBlock(globalsCss, ".dark");
const mappingRows = parseMapping(mappingMarkdown);

const mappingByCssVar = new Map<string, MappingRow>(mappingRows.map((row) => [row.cssVar, row]));
const resolvedColorModeMap = colorModeResolved as Record<string, { lightHex: string; darkHex: string }>;
const primitiveNamesByHex = buildPrimitiveNamesByHex(colorPrimitives as PrimitiveColorNode);

export const tokenColors: TokenColorData[] = Object.keys(lightVars)
  .filter((cssVar) => darkVars[cssVar] && !cssVar.endsWith("-alpha"))
  .flatMap((cssVar) => {
    const key = cssVar.replace(/^--/, "");
    const mapping = mappingByCssVar.get(cssVar);
    const fromColorMode = resolvedColorModeMap[key];
    const fallbackLight = resolveModeHex(cssVar, lightVars);
    const fallbackDark = resolveModeHex(cssVar, darkVars);
    const lightHex = fallbackLight ?? fromColorMode?.lightHex;
    const darkHex = fallbackDark ?? fromColorMode?.darkHex;

    if (!lightHex || !darkHex) {
      return [];
    }

    return [{
      tokenName: mapping?.tokenName ?? key,
      key,
      cssVar,
      utility: mapping?.utility ?? deriveUtilityFromKey(key),
      lightHex: normalizeHex(lightHex),
      darkHex: normalizeHex(darkHex),
      lightAlphaPercent: alphaPercent(lightHex),
      darkAlphaPercent: alphaPercent(darkHex),
      lightPrimitiveName: resolvePrimitiveName(lightHex),
      darkPrimitiveName: resolvePrimitiveName(darkHex),
    }];
  });

function buildPrimitiveNamesByHex(source: PrimitiveColorNode): Map<string, string | null> {
  const byHex = new Map<string, string[]>();

  const visit = (node: PrimitiveColorNode, path: string[] = []) => {
    if (!node || typeof node !== "object") {
      return;
    }

    if (node.$type === "color" && node.$value?.hex) {
      const hex = normalizeHex(node.$value.hex);
      const primitiveName = path.join("/");
      byHex.set(hex, [...(byHex.get(hex) ?? []), primitiveName]);
      return;
    }

    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith("$")) {
        continue;
      }

      visit(value as PrimitiveColorNode, [...path, key]);
    }
  };

  visit(source);

  return new Map(
    [...byHex.entries()].map(([hex, names]) => [hex, names.length === 1 ? names[0] : null]),
  );
}

function resolvePrimitiveName(hex: string): string | null {
  return primitiveNamesByHex.get(stripAlpha(normalizeHex(hex))) ?? null;
}

function stripAlpha(hex: string): string {
  return /^#[0-9A-F]{8}$/i.test(hex) ? hex.slice(0, 7) : hex;
}

function deriveUtilityFromKey(key: string): string {
  if (key.startsWith("background")) {
    return `bg-${key}`;
  }

  if (key.startsWith("border")) {
    return `border-${key}`;
  }

  return `text-${key}`;
}

function resolveModeHex(cssVar: string, vars: Record<string, string>): string | null {
  const value = resolveVarExpression(vars[cssVar], vars);
  if (!value) {
    return null;
  }

  if (value.startsWith("#")) {
    return normalizeHex(value);
  }

  const rgbMatch = value.match(/^(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})$/);
  if (!rgbMatch) {
    return null;
  }

  const [red, green, blue] = rgbMatch.slice(1).map((channel) => Number(channel));
  const alphaValue = resolveVarExpression(vars[`${cssVar}-alpha`], vars);
  return rgbaToHex(
    red,
    green,
    blue,
    alphaValue === undefined ? 1 : Number.parseFloat(alphaValue),
  );
}

function resolveVarExpression(
  value: string | undefined,
  vars: Record<string, string>,
  seen: Set<string> = new Set(),
): string | undefined {
  if (!value) {
    return undefined;
  }

  const match = value.match(/^var\((--[^)]+)\)$/);
  if (!match) {
    return value;
  }

  const varName = match[1];
  if (seen.has(varName)) {
    return undefined;
  }

  seen.add(varName);
  return resolveVarExpression(vars[varName], vars, seen);
}

function rgbaToHex(red: number, green: number, blue: number, alpha: number): string {
  const clampChannel = (channel: number) => Math.max(0, Math.min(255, Math.round(channel)));
  const clampedAlpha = Math.max(0, Math.min(1, Number.isFinite(alpha) ? alpha : 1));
  const toHex = (value: number) => clampChannel(value).toString(16).toUpperCase().padStart(2, "0");
  const alphaHex = toHex(clampedAlpha * 255);
  const rgbHex = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  return alphaHex === "FF" ? rgbHex : `${rgbHex}${alphaHex}`;
}

function normalizeHex(value: string): string {
  return value.trim().toUpperCase();
}

function alphaPercent(hex: string): number | null {
  if (!/^#[0-9A-F]{8}$/i.test(hex)) {
    return null;
  }

  const alphaHex = hex.slice(7, 9);
  const alpha = Number.parseInt(alphaHex, 16) / 255;
  return Math.round(alpha * 100);
}

export function colorModeLabel(mode: Mode): string {
  return mode === "light" ? "Light" : "Dark";
}
