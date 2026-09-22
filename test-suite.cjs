const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function run() {
  console.log('Testing Chrome DevTools connection...');

  // Launch Chrome with remote debugging
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    'http://localhost:5173/',
  ]);

  // Wait for remote debugging endpoint
  await new Promise((r) => setTimeout(r, 2000));

  // Get active targets
  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', (c) => (data += c));
    res.on('end', () => {
      try {
        const targets = JSON.parse(data);
        console.log('Found targets:', targets.length);
      } catch (e) {
        console.log('Error parsing targets:', e.message);
      }
      chrome.kill();
    });
  }).on('error', (err) => {
    console.log('HTTP error:', err.message);
    chrome.kill();
  });
}

run();
