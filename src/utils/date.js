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
 * - Up to Dec 14: 'full' (10-sheet tearing tutorial + double tap reset)
 * - Dec 15 onwards: 'skip' (Tutorial skipped, direct to today countdown)
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

  const year = target.getFullYear();
  const month = target.getMonth(); // 0 = Jan, 10 = Nov, 11 = Dec
  const day = target.getDate();

  if (year > 2026) return 'skip';

  // Up to Dec 14: Full Onboarding (10 dates tearing tutorial)
  if (month < 11 || (month === 11 && day <= 14)) {
    return 'full';
  }
  // After Dec 14 (Dec 15 onwards): Onboarding skipped completely
  return 'skip';
}

/**
 * Checks if a date corresponds to a special event / festival card
 * where the star key must never appear (Rule 2).
 */
export function isSpecialCardDate(date) {
  if (!date) return false;
  const m = date.getMonth(); // 0-indexed: 9 = Oct, 10 = Nov, 11 = Dec, 0 = Jan
  const d = date.getDate();
  const y = date.getFullYear();

  // Target Date / 2027 New Year
  if (y >= 2027 || (m === 0 && d === 1)) return true;

  // Gandhi Jayanti (Oct 2)
  if (m === 9 && d === 2) return true;

  // Birthday (Oct 14)
  if (m === 9 && d === 14) return true;

  // Ayutha Pooja (Oct 19)
  if (m === 9 && d === 19) return true;

  // Vijayadashami (Oct 20)
  if (m === 9 && d === 20) return true;

  // Diwali (Nov 8)
  if (m === 10 && d === 8) return true;

  // Avengers: Doomsday (Dec 18)
  if (m === 11 && d === 18) return true;

  // Christmas (Dec 25)
  if (m === 11 && d === 25) return true;

  return false;
}

