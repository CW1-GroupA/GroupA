# Group A - CW1: An Investigation into the Bun JavaScript Runtime
> A practical investigation of the Bun runtime, native SQLite integration and high-performance web service development

[![Bun Version](https://img.shields.io/badge/Bun-v1.4.3-fbf0df?style=flat-square&logo=bun&logoColor=black)](https://bun.sh)
[![Course](https://img.shields.io/badge/Course-UWS_Web_Technology-blue?style=flat-square)](https://www.uws.ac.uk)
[![Docs Host](https://img.shields.io/badge/Docs-GitHub_Pages-success?style=flat-square&logo=github)](https://cw1-groupa.github.io/GroupA/)

## 📋 Table of Contents
1. [Executive Summary & Introduction](#executive-summary--introduction)
2. [Key Advantages of Bun](#key-advantages-of-bun)
3. [Practical Demo: Full-Stack URL Shortener](#practical-demo-full-stack-url-shortener)
4. [Performance Comparison: Bun vs Node.js](#performance-comparison-bun-vs-nodejs)
5. [Troubleshooting and Common Pitfalls](#troubleshooting-and-common-pitfalls)
6. [Group Contribution Statement](#group-contribution-statement)

---

## 1. Executive Summary & Introduction
Bun is a modern JavaScript and TypeScript runtime, engineered as a high-performance drop-in alternative to Node.js. Developed in the Zig programming language and built on Apple’s JavaScriptCore engine, Bun is optimised for rapid startup, reduced memory footprint and native execution performance.

### Core Highlights
* ⚡ **Extreme startup speed**: Millisecond-level boot time, significantly faster package installation compared to conventional package managers.
* 🛠️ **Zero-config support**: Native built-in support for TypeScript and JSX, with no additional transpilation tools required.
* 📦 **All-in-one toolchain**: A single binary executable that replaces the Node.js runtime, npm, tsc, esbuild and test runners such as Jest.

---

## 2. Key Advantages of Bun
| Feature | Bun Runtime | Traditional Node.js |
| :--- | :--- | :--- |
| **Engine** | JavaScriptCore | V8 |
| **Implementation Language** | Zig | C++ |
| **TypeScript Support** | Native (Zero Config) | Requires `tsc` or `ts-node` |
| **Built-in Database** | Native `bun:sqlite` | Requires third-party external packages |
| **Package Manager** | Built-in `bun install` | Requires `npm` / `yarn` / `pnpm` |

---

## 3. Practical Demo: Full-Stack URL Shortener
Our team implemented a full-stack URL shortener, using `Bun.serve()` for HTTP request handling and the native `bun:sqlite` module for persistent database storage.
> Note: The random ID generation using `Math.random()` is simplified for demonstration. In production systems, extra validation logic should be implemented to avoid ID collision.

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
---
## 4. Performance Comparison: Bun vs Node.js
We benchmarked both runtimes under identical test conditions, measuring cold startup time, memory consumption and throughput for HTTP requests.
Bun demonstrates substantially faster cold start, as it avoids the heavy initialisation overhead of the V8 engine and Node module system. For simple I/O services such as this URL shortener, Bun can handle more concurrent requests with a smaller memory footprint.
However, Node.js has a larger ecosystem, broader compatibility with third-party libraries and mature production tooling, which remains an advantage for complex enterprise projects.

---
## 5. Troubleshooting and Common Pitfalls
1. **bun:sqlite database file location**: The SQLite database file will be created relative to the working directory where the server is launched, which can lead to missing database files when deployed.
2. **API incompatibility**: Bun implements most Web APIs, but some Node-specific modules are not fully supported. Code written for Node.js may require modification.
3. **Deployment restrictions**: Bun cannot be directly hosted on static hosting platforms such as GitHub Pages, as it requires a server environment to run persistent backend services.
4. **ID collision risk**: The `Math.random()` approach for generating short IDs is simple for demos but is not cryptographically secure and may produce duplicate identifiers.

---
## 6. Group Contribution Statement
Each team member contributed to different parts of this coursework.
- Research: Investigation of Bun features, comparison with Node.js and literature review
- Implementation: Development of the Bun URL shortener backend and embedded frontend interface
- Testing: Benchmark performance testing, bug fixing and validation of database logic
- Documentation: Preparation of this GitHub README page, formatting and coursework write-up
- Presentation: Slides preparation and live demo preparation

All members collaborated to review the final work and ensure the coursework meets the assessment requirements.
