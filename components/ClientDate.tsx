export default function ClientDate({ date, prefix }: { date: string | Date; prefix?: string }) {
  const parsedDate = date instanceof Date ? date : new Date(date);
  const formatted = Number.isNaN(parsedDate.getTime())
    ? String(date)
    : new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(parsedDate);

  return <>{prefix ? `${prefix} ${formatted}` : formatted}</>;
}
