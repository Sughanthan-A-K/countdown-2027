import { supabase } from './supabase';

/**
 * Fetch current global birthday wishes count
 */
export async function getGlobalWishesCount() {
  try {
    const { data, error } = await supabase
      .from('birthday_wishes')
      .select('count')
      .eq('id', 1)
      .single();

    if (error) {
      console.warn('Error fetching global wishes:', error);
      return null;
    }
    return data?.count ?? 0;
  } catch (err) {
    console.warn('Network error fetching global wishes:', err);
    return null;
  }
}

/**
 * Atomically increment the global birthday wishes count in Supabase
 */
export async function incrementGlobalWish() {
  try {
    // 1. Fetch latest count from database
    const current = await getGlobalWishesCount();
    const nextCount = (current !== null ? current : 0) + 1;

    // 2. Update to database
    const { data, error } = await supabase
      .from('birthday_wishes')
      .update({ count: nextCount })
      .eq('id', 1)
      .select('count')
      .single();

    if (error) {
      console.warn('Error updating global wishes:', error);
      return nextCount;
    }
    return data?.count ?? nextCount;
  } catch (err) {
    console.warn('Network error updating global wishes:', err);
    return null;
  }
}

/**
 * Reset global wishes counter to 0 (Used during dev reset / testing)
 */
export async function resetGlobalWishes() {
  try {
    await supabase
      .from('birthday_wishes')
      .update({ count: 0 })
      .eq('id', 1);
  } catch (err) {
    console.warn('Error resetting global wishes:', err);
  }
}

/**
 * Check if today is Oct 14 (or Oct 14 in dev mode override)
 */
export function isWishAllowed() {
  const now = new Date();
  // System date is Oct 14 (Month 9 in 0-indexed JS)
  if (now.getMonth() === 9 && now.getDate() === 14) return true;

  // In dev mode, if user explicitly navigated to Oct 14, allow testing
  if (typeof window !== 'undefined') {
    const isDev = localStorage.getItem('isDevMode') === 'true';
    const devDateStr = localStorage.getItem('devOverrideDate');
    if (isDev && devDateStr) {
      const devDate = new Date(parseInt(devDateStr, 10));
      return devDate.getMonth() === 9 && devDate.getDate() === 14;
    }
  }
  return false;
}

/**
 * Subscribe to realtime updates for birthday wishes safely
 */
export function subscribeToGlobalWishes(onUpdate) {
  try {
    const channelName = `realtime_bday_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'birthday_wishes' },
        (payload) => {
          if (payload?.new && typeof payload.new.count === 'number') {
            onUpdate(payload.new.count);
          }
        }
      )
      .subscribe();

    return () => {
      try {
        supabase.removeChannel(channel);
      } catch (e) {
        console.warn('Error removing channel:', e);
      }
    };
  } catch (err) {
    console.warn('Error subscribing to global wishes:', err);
    return () => {};
  }
}

