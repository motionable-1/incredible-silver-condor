import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    page.on('console', msg => {
      console.log('PAGE LOG:', msg.text());
    });
    
    page.on('pageerror', error => {
      console.log('PAGE ERROR:', error.message);
    });

    await page.goto('file:///home/user/project/composition/index.html');
    
    // Check if timeline is loaded
    const timelines = await page.evaluate(() => {
      return {
        hasTimelines: !!window.__timelines,
        keys: window.__timelines ? Object.keys(window.__timelines) : [],
        hasMain: window.__timelines && !!window.__timelines.Main
      };
    });
    console.log('Timelines state:', timelines);
    
    await browser.close();
  } catch (err) {
    console.error('Test error:', err);
  }
})();
