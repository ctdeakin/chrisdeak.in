// Load .env if present (local dev only)
try {
  require('fs').readFileSync('.env', 'utf8')
    .split('\n')
    .forEach(line => {
      const [key, ...rest] = line.split('=');
      if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
    });
} catch (e) {}

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'site');
const POSTS_FILE = path.join(__dirname, 'data', 'posts.json');
const AUTH_TOKEN = process.env.AUTH_TOKEN;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.ico': 'image/x-icon',
};

// — Posts —

function loadPosts() {
  try {
    return JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  } catch (e) {
    savePosts([]);
    return [];
  }
}

function savePosts(posts) {
  fs.mkdirSync(path.dirname(POSTS_FILE), { recursive: true });
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// — HTML templates —

function pageShell(title, bodyContent) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div class="container"></div>
  <div id="page-content" style="display:none">
    ${bodyContent}
  </div>
  <script src="/frame.js"></script>
</body>
</html>`;
}

function blogListPage(posts) {
  const items = posts.length
    ? posts.map(p => `<a href="/blog/${p.slug}">${p.title}</a>`).join('\n    ')
    : '<p>No posts yet.</p>';
  return pageShell('Chris — Blog', `${items}\n    <a href="/">←</a>`);
}

function blogPostPage(post, older, newer) {
  const nav = [
    older ? `<a href="/blog/${older.slug}">← ${older.title}</a>` : '',
    newer ? `<a href="/blog/${newer.slug}">${newer.title} →</a>` : '',
    `<a href="/blog">↑ All posts</a>`,
  ].filter(Boolean).join('\n    ');

  const body = post.content
    .split('\n')
    .filter(Boolean)
    .map(line => `<p>${line}</p>`)
    .join('\n    ');

  return pageShell(`Chris — ${post.title}`, `
    <header>${post.title}</header>
    ${body}
    ${nav}
  `);
}

// — Static file serving —

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

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

// — Server —

http.createServer(async (req, res) => {
  const urlPath = req.url.split('?')[0];
  const method = req.method;

  // POST /api/posts — create a post (auth required)
  if (method === 'POST' && urlPath === '/api/posts') {
    const auth = req.headers['authorization'] || '';
    if (!AUTH_TOKEN || auth !== `Bearer ${AUTH_TOKEN}`) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized' }));
      return;
    }
    try {
      const body = JSON.parse(await readBody(req));
      const { title, content } = body;
      if (!title || !content) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'title and content are required' }));
        return;
      }
      const posts = loadPosts();
      const slug = slugify(title);
      if (posts.find(p => p.slug === slug)) {
        res.writeHead(409, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'A post with that title already exists' }));
        return;
      }
      const post = { id: Date.now(), slug, title, content, createdAt: new Date().toISOString() };
      posts.unshift(post);
      savePosts(posts);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(post));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
    return;
  }

  // GET /api/posts — return posts as JSON
  if (method === 'GET' && urlPath === '/api/posts') {
    const posts = loadPosts();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(posts));
    return;
  }

  // GET /blog — list all posts
  if (method === 'GET' && urlPath === '/blog') {
    const posts = loadPosts();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(blogListPage(posts));
    return;
  }

  // GET /blog/:slug — single post with prev/next navigation
  const postMatch = urlPath.match(/^\/blog\/([^/]+)$/);
  if (method === 'GET' && postMatch) {
    const posts = loadPosts();
    const idx = posts.findIndex(p => p.slug === postMatch[1]);
    if (idx === -1) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(pageShell('Not found', '<p>Post not found.</p><a href="/blog">↑ All posts</a>'));
      return;
    }
    // posts are newest-first; idx+1 is older, idx-1 is newer
    const older = posts[idx + 1] || null;
    const newer = posts[idx - 1] || null;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(blogPostPage(posts[idx], older, newer));
    return;
  }

  // Static file fallback
  tryServe(path.join(ROOT, urlPath), res);
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on port ${PORT}`);
});
