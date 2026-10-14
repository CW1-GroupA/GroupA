# Bun Quickstart Tutorial

---

## 📋 Table of Contents
- [1. Introduction to Bun](#1-introduction-to-bun)
- [2. Why Choose Bun?](#2-why-choose-bun)
- [3. Installation Guide](#3-installation-guide)
- [4. Quickstart: Building a Simple Web Server](#4-quickstart-building-a-simple-web-server)
- [5. Package Management with Bun](#5-package-management-with-bun)
- [6. Bun vs Node.js Comparison](#6-bun-vs-nodejs-comparison)
- [7. Troubleshooting & FAQ](#7-troubleshooting--faq)

---

## 1. Introduction to Bun

**Bun** is a modern JavaScript runtime designed as a drop-in replacement for Node.js. Developed using the **Zig** programming language and powered by the **JavaScriptCore** engine, Bun focuses on extreme performance, developer experience, and native TypeScript support out of the box.

---

## 2. Why Choose Bun?

- ⚡ **Speed**: Starts up to 4x faster than Node.js and installs packages drastically faster.
- 🛠️ **All-in-One Tooling**: Replaces `node`, `npm`, `tsc`, `esbuild`, `jest`, and `vite` with a single binary executable.
- 📦 **Native TypeScript & JSX Support**: Executes `.ts`, `.jsx`, and `.tsx` files directly with no extra configuration needed.
- 🔄 **Web Standard APIs**: Supports `fetch`, `WebSocket`, and `ReadableStream` natively.

---

## 3. Installation Guide

Run the appropriate command in your terminal depending on your operating system:

### macOS / Linux
```
curl -fsSL [https://bun.sh/install](https://bun.sh/install) | bash
```

### Windows (PowerShell)
```
powershell -c "irm bun.sh/install.ps1 | iex"
```

### Verify Installation
Check that Bun is properly installed by running:
```
bun --version
```

---

## 4. Quickstart: Building a Simple Web Server

Create a new file named `server.js`:

```
const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("Hello World from Bun Server!");
  },
});

console.log(`Listening on http://localhost:${server.port}`);
```

Run the server directly with Bun:

```
bun run server.js
```

### Expected Terminal Output
```
Listening on http://localhost:3000
```
Open your browser and navigate to `http://localhost:3000` to view the response.

---

## 5. Package Management with Bun

Bun includes a lightning-fast package manager that works seamlessly with `package.json`.

### Install Dependencies
To install a package (e.g., `figlet`):
```
bun add figlet
```

### Run Scripts
Execute your project scripts defined in `package.json`:
```
bun run start
```

---

## 6. Bun vs Node.js Comparison

| Feature | Bun | Node.js |
| :--- | :--- | :--- |
| **Engine** | JavaScriptCore | V8 |
| **Language** | Zig | C++ |
| **TypeScript Support** | Native (Zero Config) | Requires Transpiler (`tsc` / `ts-node`) |
| **Package Manager** | Built-in (`bun install`) | External (`npm` / `yarn` / `pnpm`) |

---

## 7. Troubleshooting & FAQ

**Q: Is Bun fully compatible with Node.js modules?**  
A: Bun implements most Node.js native APIs (such as `fs`, `path`, and `buffer`), making it compatible with the majority of existing npm packages.

**Q: How do I update Bun to the latest version?**  
A: Run `bun upgrade` in your terminal.
