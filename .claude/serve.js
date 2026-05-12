const http = require('http');
const fs   = require('fs');
const path = require('path');
const dir  = path.join(__dirname, '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
};

http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  const file = path.join(dir, urlPath === '/' ? 'index.html' : urlPath);
  if (!file.startsWith(dir)) { res.writeHead(403); res.end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(file);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8080, () => console.log('Serving ' + dir + ' on :8080'));
