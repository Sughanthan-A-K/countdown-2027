export const TARGET_DATE = new Date(2027, 0, 1); // Local Timezone (Midnight)

// Get the actual days remaining from a given date to the target date
export function getDaysRemaining(fromDate) {
  const diffTime = TARGET_DATE.getTime() - fromDate.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

// Format date like "Mon, 23 Sep"
export function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
}

// Add days to a given date
export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function normalizeDate(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function getDiffDays(date1, date2) {
  const diffTime = date1.getTime() - date2.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}
