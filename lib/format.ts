export function formatCurrency(value: number | string, currency = 'GBP') {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(typeof value === 'string' ? Number(value) : value);
}

export function formatDateTime(value: Date | string) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatBookingRef(id: string): string {
  const clean = id.replace(/-/g, '');
  const a = clean.charCodeAt(0) % 26;
  const b = clean.charCodeAt(1) % 26;
  const c = clean.charCodeAt(2) % 26;
  const n = (clean.charCodeAt(3) * 961 + clean.charCodeAt(4) * 31 + clean.charCodeAt(5)) % 1000;
  return (
    'TD' +
    String.fromCharCode(65 + a) +
    String.fromCharCode(65 + b) +
    String.fromCharCode(65 + c) +
    n.toString().padStart(3, '0')
  );
}

export function formatTimeAgo(value: Date | string): string {
  const diff = Date.now() - new Date(value).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
