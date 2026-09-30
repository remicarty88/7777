const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4444;
const ROOT = __dirname;

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
});

app.use(express.static(ROOT, {
  index: false,
  dotfiles: 'ignore',
  maxAge: 0
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(ROOT, 'Моя_ферма_3D.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(ROOT, 'Моя_ферма_3D.html'));
});

app.use((req, res, next) => {
  const encoded = encodeURI(req.path).replace(/%2F/g, '/');
  if (encoded.endsWith('.html') && !req.path.includes('..')) {
    const f = path.join(ROOT, req.path);
    return res.sendFile(f, {}, err => { if (err) next(); });
  }
  if (req.accepts('html')) {
    return res.status(404).sendFile(path.join(ROOT, 'Моя_ферма_3D.html'));
  }
  res.status(404).send('404 Not Found');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🌱 Моя ферма 3D запущена на порту ' + PORT);
  console.log('   http://localhost:' + PORT + '/');
});
