export function formatRelative(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

  let str: string;
  if (diffMins < 1) str = 'ahora mismo';
  else if (diffMins < 60) str = rtf.format(-diffMins, 'minute');
  else if (diffHours < 24) str = rtf.format(-diffHours, 'hour');
  else if (diffDays < 7) str = rtf.format(-diffDays, 'day');
  else str = rtf.format(-Math.floor(diffDays / 7), 'week');

  return str.charAt(0).toUpperCase() + str.slice(1);
}
