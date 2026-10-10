const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.text().includes('scheduleNext') || msg.text().includes('setTimeout fired')) {
      console.log('BROWSER LOG:', msg.text());
    }
  });

  await page.goto('http://localhost:5173/');
  
  // Wait for 15 seconds to observe the loop
  await new Promise(r => setTimeout(r, 15000));
  
  await browser.close();
})();
