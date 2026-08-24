type ClassValue = string | number | null | boolean | undefined | ClassValue[];

/** Concatena classNames, ignorando valores falsy. */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) out.push(cn(...input));
    else out.push(String(input));
  }
  return out.join(' ');
}
