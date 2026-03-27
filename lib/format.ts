export function formatDisplayDate(
  value?: string | Date,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
): string {
  if (!value) {
    return '';
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return typeof value === 'string' ? value.trim() : String(value);
  }

  return new Intl.DateTimeFormat('en-US', options).format(date);
}
