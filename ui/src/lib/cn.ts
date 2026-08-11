/** className を結合するユーティリティ。falsy 値は除外する。 */
export function cn(
  ...classes: ReadonlyArray<string | undefined | null | false>
): string {
  return classes.filter(Boolean).join(" ");
}
