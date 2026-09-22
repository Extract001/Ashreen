const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runMobileTest() {
  console.log('--- STARTING MOBILE COMPREHENSIVE VALIDATION ---');

  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=390,844',
    '--disable-gpu',
    '--hide-scrollbars',
    'about:blank',
  ]);

  await wait(2500);

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/list', (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });

  const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let idCounter = 1;
  const pending = new Map();
  const consoleErrors = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      if (msg.error) {
        pending.get(msg.id)(null);
      } else {
        pending.get(msg.id)(msg.result);
      }
      pending.delete(msg.id);
    }
    if (msg.method === 'Console.messageAdded' && msg.params.message.level === 'error') {
      consoleErrors.push(msg.params.message.text);
    }
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      const args = msg.params.args.map((a) => a.value || a.description).join(' ');
      consoleErrors.push(args);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = idCounter++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise((r) => (ws.onopen = r));
  console.log('Connected to Chrome DevTools for mobile...');

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Console.enable');

  // Configure mobile device metrics
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
    hasTouch: true,
  });

  console.log('Navigating to http://localhost:5173/ ...');
  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await wait(3500);

  // 1. Mobile Hero
  console.log('1. Capturing Mobile Hero with 3D Mandala & Shimmer text...');
  const heroShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Al-am\\Ashreen_project\\mobile_hero_new.png', Buffer.from(heroShot.data, 'base64'));

  // 2. Click Surya Kundan Colorway on mobile
  console.log('2. Tapping Surya Kundan finish on mobile...');
  await send('Runtime.evaluate', {
    expression: `
      const btns = Array.from(document.querySelectorAll('button'));
      const suryaBtn = btns.find(b => b.textContent && b.textContent.includes('Surya'));
      if (suryaBtn) suryaBtn.click();
    `,
  });
  await wait(1500);
  const finishShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Al-am\\Ashreen_project\\mobile_surya_finish.png', Buffer.from(finishShot.data, 'base64'));

  // 3. Scroll to Featured Runway Lookbook
  console.log('3. Scrolling to Mobile Runway Lookbook...');
  await send('Runtime.evaluate', {
    expression: `document.getElementById('featured').scrollIntoView({ behavior: 'instant' });`,
  });
  await wait(1500);
  const lookbookShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Al-am\\Ashreen_project\\mobile_runway_lookbook.png', Buffer.from(lookbookShot.data, 'base64'));

  // 4. Test Mobile Bottom Dock & Tap Add to Bag on a card
  console.log('4. Tapping Add to Bag for tactile feedback...');
  await send('Runtime.evaluate', {
    expression: `
      const addBtn = document.querySelector('button[aria-label="Add to Bag"]');
      if (addBtn) addBtn.click();
    `,
  });
  await wait(800);
  const dockShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Al-am\\Ashreen_project\\mobile_dock_and_toast.png', Buffer.from(dockShot.data, 'base64'));

  // 5. Open Mobile Navigation Menu
  console.log('5. Tapping Mobile Hamburger Menu...');
  await send('Runtime.evaluate', {
    expression: `
      window.scrollTo(0, 0);
      const menuBtn = document.querySelector('button[aria-label="Toggle Menu"]');
      if (menuBtn) menuBtn.click();
    `,
  });
  await wait(1200);
  const menuShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Al-am\\Ashreen_project\\mobile_luxury_menu.png', Buffer.from(menuShot.data, 'base64'));

  console.log('--- VALIDATION SUMMARY ---');
  console.log('Total Console Errors Recorded:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console Errors:', consoleErrors);
  }

  ws.close();
  chrome.kill();
  console.log('Mobile browser test completed successfully!');
}

runMobileTest().catch((err) => {
  console.error('Mobile test failed:', err);
  process.exit(1);
});
