const LOCALE = 'es-MX';

export function formatMonthYear(iso: string) {
  const d = new Date(iso).toLocaleDateString(LOCALE, { month: 'long', year: 'numeric', timeZone: 'UTC' });
  return d.charAt(0).toUpperCase() + d.slice(1);
}

export function formatLongDate(iso: string) {
  const d = new Date(iso).toLocaleDateString(LOCALE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return d.charAt(0).toUpperCase() + d.slice(1);
}
