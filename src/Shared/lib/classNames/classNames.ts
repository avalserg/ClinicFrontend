// key - string value - boolean|string
export type Mods = Record<string, boolean | string | undefined>;

// add classes to HTML
export function classNames(
  cls: string,
  mods: Mods = {},
  additional: Array<string | undefined> = [],
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    // get keys and values mods -> if value === true ->map keys
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(" ");
}
