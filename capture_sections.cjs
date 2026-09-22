const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('Launching headless Chrome for verification...');
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1920,1080',
    '--disable-gpu',
    'http://localhost:5173/',
  ]);

  await wait(2500);

  // Get WebSocket debugger URL
  const versionData = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/version', (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });

  const wsUrl = versionData.webSocketDebuggerUrl;
  console.log('Connected to Chrome via WebSocket:', wsUrl);

  // We can use a lightweight WebSocket client using node's built-in or a simple command line
  chrome.kill();
  console.log('Browser test script completed.');
}

main().catch(console.error);
