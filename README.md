mport { Database } from "bun:sqlite";
const db = new Database("urls.sqlite");
db.run("CREATE TABLE IF NOT EXISTS urls (id TEXT PRIMARY KEY, originalUrl TEXT)");
Bun.serve({
port: 3000,
async fetch(req) {
const url = new URL(req.url);
if (req.method === "POST" && url.pathname === "/shorten") {
const { originalUrl } = await req.json();
if (!originalUrl) return Response.json({ error: "URL is required" }, { status: 400 });

const id = Math.random().toString(36).substring(2, 8);
db.run("INSERT INTO urls (id, originalUrl) VALUES (?, ?)", [id, originalUrl]);
return Response.json({ shortUrl: `http://localhost:3000/s/${id}` });
}
if (url.pathname.startsWith("/s/")) {
const id = url.pathname.split("/s/")[1];
const row = db.query("SELECT originalUrl FROM urls WHERE id = ?").get(id);
if (row) return Response.redirect(row.originalUrl, 302);
return new Response("URL Not Found", { status: 404 });
}
const html = `

    
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
</style>
</head>
<body>
<div class="card">
<h1>⚡ Bun Shortener <span class="badge">SQLite Inside</span></h1>
<p>Built natively with Bun runtime and SQLite database.</p>
<div class="input-group">
<input type="url" id="longUrl" placeholder="[https://example.com/very-long-url](https://example.com/very-long-url)" required>
<button onclick="shorten()">Shorten</button>
</div>
<div id="result">Short URL: <a id="shortLink" href="#" target="_blank"></a></div>
</div>
<script>
async function shorten() {
const url = document.getElementById('longUrl').value;
if(!url) return alert('Please enter a URL');
const res = await fetch('/shorten', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ originalUrl: url }) });
const data = await res.json();
if(data.shortUrl) {
const link = document.getElementById('shortLink');
link.href = data.shortUrl;
link.innerText = data.shortUrl;
document.getElementById('result').style.display = 'block';
}
}
</script>
</body>
</html>
`;
return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });},
});
console.log("🚀 URL Shortener running at [http://localhost:3000](http://localhost:3000)");
