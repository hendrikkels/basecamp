import { type CSSProps, CSS_PROP_KEYS } from "./css";

const CSS_PROP_SET = new Set<string>(CSS_PROP_KEYS);

export function splitCSSProps<P extends object>(
  props: P
): { cssStyles: React.CSSProperties; rest: Omit<P, keyof CSSProps> } {
  const cssStyles: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (CSS_PROP_SET.has(key)) {
      const styleProp = key.slice(1);
      cssStyles[styleProp] = value;
    } else {
      rest[key] = value;
    }
  }

  return { cssStyles: cssStyles as React.CSSProperties, rest: rest as Omit<P, keyof CSSProps> };
}
