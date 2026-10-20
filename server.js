Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/info") {
      return Response.json({
        status: "success",
        message: "Bun Live Server is up and running!",
        runtime: "Bun " + Bun.version,
        timestamp: new Date().toISOString(),
        author: "Group A - CW1 Team"
      });
    }

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Bun Server Dashboard</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #1a1a1a; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .card { background: #2a2a2a; padding: 2rem; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); border: 1px solid #333; max-width: 500px; width: 100%; }
        h1 { color: #fbf0df; margin-top: 0; font-size: 1.8rem; }
        .tag { background: #fbf0df; color: #000; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8rem; }
        .info-item { margin: 12px 0; font-size: 0.95rem; color: #ccc; }
        .status { color: #4caf50; font-weight: bold; }
        a { color: #fbf0df; text-decoration: none; border-bottom: 1px dashed #fbf0df; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Bun Web Server <span class="tag">Live</span></h1>
        <p class="info-item"><strong>Status:</strong> <span class="status">● Running Smoothly</span></p>
        <p class="info-item"><strong>Runtime:</strong> Bun v${Bun.version}</p>
        <p class="info-item"><strong>Module:</strong> UWS Web Technology (CW1)</p>
        <p class="info-item"><strong>Group:</strong> Group A Project Demo</p>
        <hr style="border: 0; border-top: 1px solid #444; margin: 1.5rem 0;">
        <p class="info-item">💡 Try visiting the JSON Endpoint: <a href="/api/info" target="_blank">/api/info</a></p>
      </div>
    </body>
    </html>
    `;

    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
});

console.log("Listening on http://localhost:3000");
