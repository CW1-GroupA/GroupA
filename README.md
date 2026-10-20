# ⚡ Group A - Bun Web Technology Tutorial (CW1)
> A practical guide on Bun runtime, native SQLite database integration, and high-performance web service development.
[![Bun Version](https://img.shields.io/badge/Bun-v1.4.3-fbf0df?style=flat-square&logo=bun&logoColor=black)](https://bun.sh)
[![Course](https://img.shields.io/badge/Course-UWS_Web_Technology-blue?style=flat-square)](https://www.uws.ac.uk)
[![Deployment](https://img.shields.io/badge/Deployment-GitHub_Pages-success?style=flat-square&logo=github)](https://cw1-groupa.github.io/GroupA/)
---
## 📋 Table of Contents
1. [Executive Summary & Introduction](#1-executive-summary--introduction)
2. [Key Advantages of Bun](#2-key-advantages-of-bun)
3. [Practical Live Demo: Full-Stack URL Shortener](#3-practical-live-demo-full-stack-url-shortener)
4. [Performance Architecture: Bun vs Node.js](#4-performance-architecture-bun-vs-nodejs)
5. [Troubleshooting & Common Pitfalls](#5-troubleshooting--common-pitfalls)
6. [Group Contribution & Hard Work](#6-group-contribution--hard-work)
---
## 3. Practical Live Demo: Full-Stack URL Shortener
Our team built a full-stack URL Shortener leveraging `Bun.serve()` for HTTP handling and `bun:sqlite` for native database persistence.
### Source Code (`server.js`)
```javascript
import { Database } from "bun:sqlite";
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
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Bun URL Shortener Demo</title>
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 30px 15px; }
        .card { background: #1e293b; padding: 2.5rem; border-radius: 16px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); width: 100%; max-width: 700px; margin: 0 auto; border: 1px solid #334155; }
        h1 { margin: 0 0 0.5rem 0; font-size: 1.75rem; color: #fbbf24; }
        h2 { color:#fbbf24; font-size:1.2rem; margin-top:24px; margin-bottom:8px; }
        p { color: #94a3b8; font-size: 0.95rem; line-height:1.6; margin:0 0 12px 0; }
        .input-group { display: flex; gap: 8px; margin-top:30px; margin-bottom: 1rem; }
        input { flex: 1; padding: 12px 16px; border-radius: 8px; border: 1px solid #475569; background: #0f172a; color: #fff; font-size: 0.95rem; outline: none; }
        input:focus { border-color: #fbbf24; }
        button { padding: 12px 20px; border-radius: 8px; border: none; background: #fbbf24; color: #0f172a; font-weight: bold; cursor: pointer; transition: background 0.2s; }
        button:hover { background: #f59e0b; }
        #result { margin-top: 1rem; padding: 12px; background: #0f172a; border-radius: 8px; border: 1px dashed #475569; display: none; word-break: break-all; }
        #result a { color: #38bdf8; text-decoration: none; font-weight: bold; }
        .divider { margin:24px 0; border-bottom:1px solid #475569; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>⚡ Group A - Bun Web Technology Tutorial (CW1)</h1>
        <p>A practical guide on Bun runtime, native SQLite database integration, and high-performance web service development.</p>
        <div class="divider"></div>

        <h2>1. Executive Summary & Introduction</h2>
        <p>Bun is a modern JavaScript and TypeScript runtime designed as a high-performance, drop-in replacement for Node.js. Built using Apple's JavaScriptCore engine and written in the Zig programming language, Bun delivers ultra-fast startup times, low memory overhead, and native execution efficiency.</p>

        <h2>2. Key Advantages of Bun</h2>
        <p>Bun supports TypeScript natively, includes built-in SQLite database and package manager. It removes many extra dependencies and configuration steps compared with Node.js.</p>

        <h2>3. Practical Live Demo: Full-Stack URL Shortener</h2>
        <p>Our team built a full-stack URL Shortener leveraging Bun.serve() for HTTP handling and bun:sqlite for native database persistence.</p>

        <h2>4. Performance Architecture: Bun vs Node.js</h2>
        <p>Bun uses the JavaScriptCore engine written in Zig. Node.js relies on Google’s V8 engine and libuv for event loop. Bun has faster cold startup speed and better I/O throughput for web services.</p>

        <h2>5. Troubleshooting & Common Pitfalls</h2>
        <p>After pressing Ctrl+C to stop Bun, localhost:3000 cannot be accessed. Port conflicts and needing server restart after HTML edits are common issues.</p>

        <h2>6. Group Contribution & Hard Work</h2>
        <p>Group members researched Bun, implemented the URL shortener, tested server behaviour, compared Bun and Node.js, and finished this tutorial.</p>

        <div class="divider"></div>
        <div class="input-group">
          <input type="url" id="longUrl" placeholder="https://example.com/very-long-url" required>
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
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  },
});
console.log("🚀 URL Shortener running at http://localhost:3000");
