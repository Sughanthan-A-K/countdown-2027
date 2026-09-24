import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  
  const subscription = req.body;
  if (!subscription || !subscription.endpoint) return res.status(400).json({ error: 'Invalid subscription' });
  
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  
  const { error } = await supabase
    .from('push_subscriptions')
    .upsert({
      endpoint: subscription.endpoint,
      keys: subscription.keys
    }, { onConflict: 'endpoint' });
    
  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: 'Database error' });
  }
  
  return res.status(200).json({ success: true });
}
