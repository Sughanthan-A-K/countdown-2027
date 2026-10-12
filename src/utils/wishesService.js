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
 * Subscribe to realtime updates for birthday wishes
 */
export function subscribeToGlobalWishes(onUpdate) {
  const channel = supabase
    .channel('realtime_birthday_wishes')
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
    supabase.removeChannel(channel);
  };
}
