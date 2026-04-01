const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'site');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.ico': 'image/x-icon',
};

function tryServe(filePath, res) {
  fs.stat(filePath, (err, stat) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else if (stat.isDirectory()) {
      tryServe(path.join(filePath, 'index.html'), res);
    } else {
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    }
  });
}

http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  tryServe(path.join(ROOT, urlPath), res);
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on port ${PORT}`);
});
