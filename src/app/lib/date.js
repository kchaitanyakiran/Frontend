const parseDateValue = (value) => {
  if (!value) {
    return null;
  }

  const normalized =
    typeof value === 'string' && !value.includes('T') ? `${value}T00:00:00` : value;
  const parsed = new Date(normalized);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const formatDisplayDate = (value) => {
  const parsed = parseDateValue(value);

  if (!parsed) {
    return 'Date unavailable';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
};

export const formatDisplayDateTime = (value) => {
  const parsed = parseDateValue(value);

  if (!parsed) {
    return 'Time unavailable';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(parsed);
};
