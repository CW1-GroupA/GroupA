import { describe, expect, it } from "bun:test";

describe("URL Shortener Service", () => {
  it("should return short URL and redirect correctly", async () => {
    const server = Bun.serve({
      port: 0,
      fetch: async (req) => {
        const url = new URL(req.url);

        if (url.pathname === "/shorten" && req.method === "POST") {
          return new Response("http://localhost:3000/abc123");
        }

        if (url.pathname === "/abc123") {
          return Response.redirect("https://example.com/", 302);
        }

        return new Response("Not found", { status: 404 });
      },
    });

    const res1 = await fetch(`${server.url}/shorten?url=https://example.com`, {
      method: "POST",
    });
    expect(await res1.text()).toContain("/abc123");

    const res2 = await fetch(`${server.url}/abc123`, {
      redirect: "manual",
    });
    expect(res2.status).toBe(302);
    expect(res2.headers.get("location")).toBe("https://example.com/");

    server.stop();
  });
});
