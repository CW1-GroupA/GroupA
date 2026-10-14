# Bun Quickstart Tutorial

> A comprehensive quickstart guide to **Bun** — a fast, all-in-one JavaScript runtime, package manager, test runner, and bundler.

---

## 📋 Table of Contents
- [1. Introduction to Bun](#1-introduction-to-bun)
- [2. Why Choose Bun?](#2-why-choose-bun)
- [3. Installation Guide](#3-installation-guide)
- [4. Quickstart: Building a Simple Web Server](#4-quickstart-building-a-simple-web-server)
- [5. Bun vs Node.js Comparison](#5-bun-vs-nodejs-comparison)
- [6. Useful Commands](#6-useful-commands)

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
// server.js
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

Open your browser and navigate to `http://localhost:3000` to see your running server!

---

## 5. Bun vs Node.js Comparison

| Feature | Bun | Node.js |
| :--- | :--- | :--- |
| **Engine** | JavaScriptCore | V8 |
| **Language** | Zig | C++ |
| **TypeScript Support** | Native (Zero Config) | Requires Transpiler (`tsc` / `ts-node`) |
| **Package Manager** | Built-in (`bun install`) | External (`npm` / `yarn` / `pnpm`) |

---

## 6. Useful Commands

| Task | Bun Command | Equivalent npm Command |
| :--- | :--- | :--- |
| **Install packages** | `bun install` | `npm install` |
| **Add a package** | `bun add <pkg>` | `npm install <pkg>` |
| **Run a script** | `bun run index.ts` | `npx ts-node index.ts` |
| **Run tests** | `bun test` | `npm test` |

---

*Created by **CW1 Group A** for Academic Presentation & Demonstration.*
