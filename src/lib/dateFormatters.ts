export function formatDate(date: string | Date) {
  if (!date) return 'N/A';

  return new Date(date).toLocaleDateString('en-LK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: string | Date) {
  if (!date) return 'N/A';

  return new Date(date).toLocaleString('en-LK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
