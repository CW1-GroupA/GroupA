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
```bash
curl -fsSL https://bun.sh/install | bash
