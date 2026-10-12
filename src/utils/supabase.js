import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ffuiifgzdeoujmxwddiy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xUD7PuoHACSgSP2xhw4ZsA__Va5oL-j';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
