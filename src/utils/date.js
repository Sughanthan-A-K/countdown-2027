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

/**
 * Determines the onboarding tutorial tier based on cut-off date:
 * - Till Nov 30: 'full' (10-sheet tearing tutorial + double tap reset)
 * - Dec 1 to Dec 25: 'mini' (2-sheet quick tearing tutorial + double tap reset)
 * - After Dec 25 (Final Week): 'skip' (Tutorial skipped, direct to today countdown)
 */
export function getOnboardingTier(date = null) {
  let target = date;
  if (!target && typeof window !== 'undefined') {
    const isDev = localStorage.getItem('isDevMode') === 'true';
    const devDateStr = localStorage.getItem('devOverrideDate');
    if (isDev && devDateStr) {
      target = new Date(parseInt(devDateStr, 10));
    }
  }
  if (!target) target = new Date();

  const month = target.getMonth(); // 0 = Jan, 10 = Nov, 11 = Dec
  const day = target.getDate();

  // Before December (October, November)
  if (month < 11) return 'full';
  // Dec 1 to Dec 14: Quick mini-tutorial
  if (month === 11 && day <= 14) return 'mini';
  // After Dec 14: Onboarding skipped completely
  return 'skip';
}

