const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTest() {
  console.log('--- STARTING COMPREHENSIVE BROWSER VALIDATION ---');

  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1920,1080',
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
  console.log('Selected Page Target:', pageTarget.title, pageTarget.url);

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let idCounter = 1;
  const pending = new Map();
  const consoleErrors = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      if (msg.error) {
        console.error(`CDP Error for ID ${msg.id}:`, msg.error);
        pending.get(msg.id)(null);
      } else {
        pending.get(msg.id)(msg.result);
      }
      pending.delete(msg.id);
    }
    if (msg.method === 'Console.messageAdded') {
      const text = msg.params.message.text;
      const level = msg.params.message.level;
      if (level === 'error') {
        consoleErrors.push(text);
      }
      console.log(`[Browser Console ${level.toUpperCase()}]: ${text}`);
    }
    if (msg.method === 'Runtime.consoleAPICalled') {
      const type = msg.params.type;
      const args = msg.params.args.map((a) => a.value || a.description).join(' ');
      if (type === 'error') {
        consoleErrors.push(args);
      }
      console.log(`[Browser Console ${type.toUpperCase()}]: ${args}`);
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
  console.log('Connected to Chrome DevTools.');

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Console.enable');

  console.log('Navigating to http://localhost:5173/ ...');
  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await wait(3000);

  // Take hero screenshot
  console.log('Capturing Desktop Hero screenshot...');
  const heroShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Al-am\\Ashreen_project\\desktop_hero.png', Buffer.from(heroShot.data, 'base64'));

  // Test Material Finish Switcher: Click Surya Kundan
  console.log('Testing Material Switcher: Clicking Surya Kundan finish...');
  await send('Runtime.evaluate', {
    expression: `
      const buttons = Array.from(document.querySelectorAll('button'));
      const kundanBtn = buttons.find(b => b.title && (b.title.includes('Surya') || b.title.includes('Kundan')));
      if (kundanBtn) {
        kundanBtn.click();
        'CLICKED_KUNDAN';
      } else {
        'KUNDAN_NOT_FOUND';
      }
    `,
  });
  await wait(1500);

  const solarShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Al-am\\Ashreen_project\\desktop_solar_finish.png', Buffer.from(solarShot.data, 'base64'));

  // Scroll to Featured Products
  console.log('Scrolling to Featured Products...');
  await send('Runtime.evaluate', {
    expression: `document.getElementById('featured').scrollIntoView({ behavior: 'instant' });`,
  });
  await wait(1500);
  const featuredShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Al-am\\Ashreen_project\\desktop_featured.png', Buffer.from(featuredShot.data, 'base64'));

  // Scroll to Showcase / Acoustic Lab
  console.log('Scrolling to Royal Craft Showcase...');
  await send('Runtime.evaluate', {
    expression: `document.getElementById('showcase').scrollIntoView({ behavior: 'instant' });`,
  });
  await wait(1500);
  const showcaseShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Al-am\\Ashreen_project\\desktop_showcase.png', Buffer.from(showcaseShot.data, 'base64'));

  // Scroll to Story & CTA
  console.log('Scrolling to Story & CTA...');
  await send('Runtime.evaluate', {
    expression: `document.getElementById('story').scrollIntoView({ behavior: 'instant' });`,
  });
  await wait(1500);
  const storyShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Al-am\\Ashreen_project\\desktop_story.png', Buffer.from(storyShot.data, 'base64'));

  // Test Opening Interactive 360 Modal
  console.log('Testing 360 Modal: Clicking 360° ATELIER VIEW button...');
  await send('Runtime.evaluate', {
    expression: `
      const inspectBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && (b.textContent.includes('360') || b.textContent.includes('ATELIER')));
      if (inspectBtn) inspectBtn.click();
    `,
  });
  await wait(2000);
  const modalShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Al-am\\Ashreen_project\\desktop_modal.png', Buffer.from(modalShot.data, 'base64'));

  // Close modal with ESC
  console.log('Closing Modal with ESC...');
  await send('Runtime.evaluate', {
    expression: `window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));`,
  });
  await wait(1000);

  // Open Bag / Cart Drawer
  console.log('Testing Cart Drawer: Clicking Bag button...');
  await send('Runtime.evaluate', {
    expression: `
      const bagBtn = document.querySelector('button[aria-label="Shopping Bag"]');
      if (bagBtn) bagBtn.click();
    `,
  });
  await wait(1500);
  const cartShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Al-am\\Ashreen_project\\desktop_cart.png', Buffer.from(cartShot.data, 'base64'));

  // Test Mobile Viewport (390 x 844)
  console.log('Testing Mobile Viewport (390x844)...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await send('Runtime.evaluate', {
    expression: `
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      window.scrollTo(0, 0);
    `,
  });
  await wait(2000);
  const mobileHeroShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Al-am\\Ashreen_project\\mobile_hero_tested.png', Buffer.from(mobileHeroShot.data, 'base64'));

  console.log('--- VALIDATION SUMMARY ---');
  console.log('Total Console Errors Recorded:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console Errors:', consoleErrors);
  }

  ws.close();
  chrome.kill();
  console.log('Browser tests completed successfully!');
}

runTest().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
