import { createClient } from '@supabase/supabase-js';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:sughanthan.a.k@example.com',
  process.env.VITE_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

function getDaysRemaining() {
  const TARGET_DATE = new Date(2027, 0, 1);
  const today = new Date();
  // Adjust for IST manually since Vercel runs in UTC
  today.setHours(today.getHours() + 5);
  today.setMinutes(today.getMinutes() + 30);
  today.setHours(0,0,0,0);
  const diffTime = TARGET_DATE.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

const positiveMessages = [
  "Vidu macha paathukalam innum {days} days iruku... nallathe nadakkum free ah vidu dude!",
  "It's OK Bro, innum {days} days irukku chill panni pannuvom!",
  "Every day is a fresh start da! Innum {days} days to go... rock pannu!",
  "Nee nenaikurathu kandippa nadakkum... Innum {days} days thaan irukku, keep pushing!",
  "Kavala padatha macha, you are doing great! {days} days remaining for 2027!",
  "Take a deep breath. Innaiku ungalukku thevaiyana rest eduthukkonga. {days} days to 2027, time irukku.",
  "Enna boss kalaila elunthuttom la? Athuve oru periya success thaan! {days} days to go, kalakkungaa!",
  "Naalaiki enna aagum nu yosikkama, innaiku kedaicha naala enjoy pannunga. Just {days} days remaining!"
];

export default async function handler(req, res) {
  // Check Vercel Cron Secret (if configured)
  if (process.env.CRON_SECRET && req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const { data: subs, error } = await supabase.from('push_subscriptions').select('*');
  
  if (error) return res.status(500).json({ error: error.message });
  if (!subs || subs.length === 0) return res.status(200).json({ success: true, message: 'No subs' });
  
  const days = getDaysRemaining();
  const randomMsg = positiveMessages[Math.floor(Math.random() * positiveMessages.length)].replace('{days}', days);
  
  const payload = JSON.stringify({
    title: 'Countdown 2027',
    body: randomMsg,
    icon: '/favicon.svg'
  });
  
  const promises = subs.map(sub => {
    const pushSub = { endpoint: sub.endpoint, keys: sub.keys };
    return webpush.sendNotification(pushSub, payload).catch(async (e) => {
      if (e.statusCode === 410 || e.statusCode === 404) {
        await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
      }
    });
  });
  
  await Promise.all(promises);
  return res.status(200).json({ success: true, pushedTo: subs.length });
}
