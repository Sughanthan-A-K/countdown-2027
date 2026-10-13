import { createClient } from '@supabase/supabase-js';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:sughanthan.a.k@example.com',
  process.env.VITE_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

function getISTDate() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istOffset = 5.5 * 60 * 60000; // IST is UTC+5:30
  return new Date(utc + istOffset);
}

function getDaysRemaining(todayIST) {
  const TARGET_DATE = new Date(2027, 0, 1);
  const today = new Date(todayIST);
  today.setHours(0, 0, 0, 0);
  const diffTime = TARGET_DATE.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

function getSpecialMessage(istDate, language, daysRemaining) {
  const month = istDate.getMonth(); // 0-indexed: 9 = Oct, 10 = Nov, 11 = Dec, 0 = Jan
  const date = istDate.getDate();
  const year = istDate.getFullYear();

  // 1. Oct 14: Birthday
  if (month === 9 && date === 14) {
    return language === 'english'
      ? "Hey, It's Sughanthan's (This Calendar Developer's) Birthday! 🎂 Drop a wish in the app!"
      : "Hey, Innaiku Sughanthan-oda (Intha Calendar Developer) Birthday! 🎂 Drop a wish in the app!";
  }

  // 2. Oct 19: Ayutha Pooja
  if (month === 9 && date === 19) {
    return language === 'english'
      ? "Happy Ayutha Pooja to you and your family! 🪔✨"
      : "Ungalukkum unga kudumbathirkum Iniya Ayutha Pooja Nalvazhthukkal! 🪔✨";
  }

  // 3. Oct 20: Vijayadashami
  if (month === 9 && date === 20) {
    return language === 'english'
      ? "Happy Vijayadashami! May this day bring success and victory! 🏹✨"
      : "Iniya Vijayadashami Nalvazhthukkal! Vetriyodu start pannunga! 🏹✨";
  }

  // 4. Nov 8: Diwali
  if (month === 10 && date === 8) {
    return language === 'english'
      ? "Happy Diwali to you & your family! 🪔💥"
      : "Ungalukkum unga kudumbathirkum Iniya Deepavali Nalvazhthukkal! 🪔💥";
  }

  // 5. Dec 18: Avengers: Doomsday
  if (month === 11 && date === 18) {
    return language === 'english'
      ? "Avengers.... Assemble.... Victor Von Doom is here! It's Doomsday today! 🎭💚"
      : "Avengers.... Assemble.... Victor Von Doom vandhuttan! Innaiku Doomsday! 🎭💚";
  }

  // 6. Dec 25: Christmas
  if (month === 11 && date === 25) {
    return language === 'english'
      ? "Merry Christmas to you and your family! 🎄🎅"
      : "Ungalukkum unga kudumbathirkum Iniya Christmas Nalvazhthukkal! 🎄🎅";
  }

  // 7. Dec 26 to Dec 31: Year-End Final Days
  if (month === 11 && date >= 26) {
    const yearEndEnglish = [
      "Final days of 2026... Let's wrap up this year on a happy note! Relax & get ready for 2027! ⏳✨",
      "The year is almost ending... Cherish the good memories and chill! Just {days} days to 2027! ⏳✨",
      "Almost there! You've come a long way this year... Relax & look forward to 2027! ⏳✨"
    ];
    const yearEndTanglish = [
      "2026-oda last days... Intha varushatha happy-ah mudipom! Relax & look forward to 2027! ⏳✨",
      "Intha varusham mudiyapoguthu... Good memories ellam recall pannitu chill pannunga! Just {days} days to 2027! ⏳✨",
      "Almost there! Intha year evalo learn pannom la... Relax & look forward to 2027! ⏳✨"
    ];
    const list = language === 'english' ? yearEndEnglish : yearEndTanglish;
    return list[Math.floor(Math.random() * list.length)].replace('{days}', daysRemaining);
  }

  // 8. Jan 1: New Year
  if (year >= 2027 || (month === 0 && date === 1)) {
    return "WELCOME TO 2027! 🎆 You made it!";
  }

  return null;
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

const englishMessages = [
  "Let it go man, we'll see... {days} days left... good things will happen chill dude!",
  "It's OK Bro, {days} days left, let's chill and do it!",
  "Every day is a fresh start da! Just {days} days to go... rock it!",
  "What you wish for will definitely happen... Only {days} days left, keep pushing!",
  "Don't worry man, you are doing great! {days} days remaining for 2027!",
  "Take a deep breath. Take the rest you need today. {days} days to 2027, you have time.",
  "Hey boss, we woke up this morning right? That itself is a big success! {days} days to go, rock on!",
  "Don't think about what will happen tomorrow, enjoy the day you got today. Just {days} days remaining!"
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
  
  const istDate = getISTDate();
  const days = getDaysRemaining(istDate);
  
  const promises = subs.map(sub => {
    const specialMsg = getSpecialMessage(istDate, sub.language, days);
    let msgBody;

    if (specialMsg) {
      msgBody = specialMsg;
    } else {
      const msgList = sub.language === 'english' ? englishMessages : positiveMessages;
      msgBody = msgList[Math.floor(Math.random() * msgList.length)].replace('{days}', days);
    }
    
    const payload = JSON.stringify({
      title: 'Countdown 2027',
      body: msgBody,
      icon: '/favicon.svg'
    });
    
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
