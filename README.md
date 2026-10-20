import { Database } from "bun:sqlite";

// 初始化数据库
const db = new Database("urls.sqlite");
db.run(`CREATE TABLE IF NOT EXISTS urls (
    id TEXT PRIMARY KEY,
    originalUrl TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

/** 生成更安全的随机6位短ID，替代Math.random */
function generateShortId() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  const array = new Uint32Array(6);
  crypto.getRandomValues(array);
  for (const v of array) {
    id += chars[v % chars.length];
  }
  return id;
}

/** 简单校验URL格式 */
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

const PORT = 3000;

Bun.serve({
  port: PORT,
  async fetch(req) {
    const urlObj = new URL(req.url);

    // 创建短链接接口
    if (req.method === "POST" && urlObj.pathname === "/shorten") {
      try {
        const { originalUrl } = await req.json();

        if (!originalUrl) {
          return Response.json({ error: "URL is required" }, { status: 400 });
        }
        if (!isValidUrl(originalUrl)) {
          return Response.json({ error: "Please enter a valid full URL" }, { status: 400 });
        }

        let shortId;
        // 避免ID冲突：循环直到拿到数据库不存在的id
        while (true) {
          shortId = generateShortId();
          const exists = db.query("SELECT id FROM urls WHERE id = ?").get(shortId);
          if (!exists) break;
        }

        db.run("INSERT INTO urls (id, originalUrl) VALUES (?, ?)", [shortId, originalUrl]);
        const shortUrl = `${urlObj.origin}/s/${shortId}`;
        return Response.json({ shortUrl });

      } catch (err) {
        return Response.json({ error: "Server error processing request" }, { status: 500 });
      }
    }

    // 短链接跳转路由
    if (urlObj.pathname.startsWith("/s/")) {
      const shortId = urlObj.pathname.split("/s/")[1];
      try {
        const row = db.query("SELECT originalUrl FROM urls WHERE id = ?").get(shortId);
        if (row) {
          return Response.redirect(row.originalUrl, 302);
        }
        return new Response("Short URL Not Found", { status: 404 });
      } catch {
        return new Response("Database error", { status: 500 });
      }
    }

    // 首页HTML页面，修复placeholder乱码
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bun URL Shortener Demo</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
    .card { background: #1e293b; padding: 2.5rem; border-radius: 16px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); width: 100%; max-width: 480px; border: 1px solid #334155; }
    h1 { margin: 0 0 0.5rem 0; font-size: 1.75rem; color: #fbbf24; display: flex; align-items: center; gap: 8px; }
    p { color: #94a3b8; font-size: 0.95rem; margin-bottom: 1.5rem; }
    .input-group { display: flex; gap: 8px; margin-bottom: 1rem; }
    input { flex: 1; padding: 12px 16px; border-radius: 8px; border: 1px solid #475569; background: #0f172a; color: #fff; font-size: 0.95rem; outline: none; }
    input:focus { border-color: #fbbf24; }
    button { padding: 12px 20px; border-radius: 8px; border: none; background: #fbbf24; color: #0f172a; font-weight: bold; cursor: pointer; transition: background 0.2s; }
    button:hover { background: #f59e0b; }
    #result { margin-top: 1rem; padding: 12px; background: #0f172a; border-radius: 8px; border: 1px dashed #475569; display: none; word-break: break-all; }
    #result a { color: #38bdf8; text-decoration: none; font-weight: bold; }
    .badge { background: #334155; color: #fbbf24; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-left: 8px; }
    .error-text { color:#f87171; margin-top:8px; display:none; }
  </style>
</head>
<body>
  <div class="card">
    <h1>⚡ Bun Shortener <span class="badge">SQLite Inside</span></h1>
    <p>Built natively with Bun runtime and SQLite database.</p>
    <div class="input-group">
      <input type="url" id="longUrl" placeholder="https://example.com/very-long-url" required>
      <button onclick="shorten()">Shorten</button>
    </div>
    <div class="error-text" id="errMsg"></div>
    <div id="result">Short URL: <a id="shortLink" href="#" target="_blank"></a></div>
  </div>
  <script>
    async function shorten() {
      const errEl = document.getElementById("errMsg");
      const resultEl = document.getElementById("result");
      errEl.style.display = "none";
      resultEl.style.display = "none";

      const urlVal = document.getElementById('longUrl').value.trim();
      if (!urlVal) {
        errEl.innerText = "Please enter a URL";
        errEl.style.display = "block";
        return;
      }

      try {
        const res = await fetch('/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ originalUrl: urlVal })
        });
        const data = await res.json();
        if (!res.ok) {
          errEl.innerText = data.error || "Request failed";
          errEl.style.display = "block";
          return;
        }
        const link = document.getElementById('shortLink');
        link.href = data.shortUrl;
        link.innerText = data.shortUrl;
        resultEl.style.display = "block";
      } catch (e) {
        errEl.innerText = "Network error, cannot connect to server";
        errEl.style.display = "block";
      }
    }
  </script>
</body>
</html>
`;
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  },
});

console.log(`🚀 URL Shortener running at http://localhost:${PORT}`);
