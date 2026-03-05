import mappingMarkdown from "../../docs/mapping.md?raw";
import globalsCss from "../styles/globals.css?raw";

type Mode = "light" | "dark";

type MappingRow = {
  tokenName: string;
  cssVar: string;
  utility: string;
};

export type TokenColorData = {
  tokenName: string;
  key: string;
  cssVar: string;
  utility: string;
  lightRgb: string;
  darkRgb: string;
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
    if (/^\d+\s+\d+\s+\d+$/.test(value)) {
      vars[name] = value;
    }
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
      .map((item) => item.replaceAll("`", ""));

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

export const tokenColors: TokenColorData[] = Object.keys(lightVars)
  .filter((cssVar) => darkVars[cssVar])
  .map((cssVar) => {
    const key = cssVar.replace(/^--/, "");
    const mapping = mappingByCssVar.get(cssVar);
    return {
      tokenName: mapping?.tokenName ?? key,
      key,
      cssVar,
      utility: mapping?.utility ?? deriveUtilityFromKey(key),
      lightRgb: lightVars[cssVar],
      darkRgb: darkVars[cssVar],
    };
  });

function deriveUtilityFromKey(key: string): string {
  if (key.startsWith("background")) {
    return `bg-${key}`;
  }

  if (key.startsWith("border")) {
    return `border-${key}`;
  }

  return `text-${key}`;
}

export function cssColor(rgbChannels: string): string {
  return `rgb(${rgbChannels})`;
}

export function colorModeLabel(mode: Mode): string {
  return mode === "light" ? "Light" : "Dark";
}
