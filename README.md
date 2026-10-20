# ⚡ Group A - Bun Web Technology Tutorial (CW1)

> A practical guide on Bun runtime, native SQLite database integration, and high-performance web service development.

[![Bun Version](https://img.shields.io/badge/Bun-v1.4.3-fbf0df?style=flat-square&logo=bun&logoColor=black)](https://bun.sh)
[![Course](https://img.shields.io/badge/Course-UWS_Web_Technology-blue?style=flat-square)](https://www.uws.ac.uk)
[![Deployment](https://img.shields.io/badge/Deployment-GitHub_Pages-success?style=flat-square&logo=github)](https://cw1-groupa.github.io/GroupA/)

---

## 📋 Table of Contents
1. [Executive Summary & Introduction](#1-executive-summary--introduction)
2. [Key Advantages of Bun](#2-key-advantages-of-bun)
3. [Environment Setup & Installation](#3-environment-setup--installation)
4. [Practical Live Demo: Full-Stack URL Shortener](#4-practical-live-demo-full-stack-url-shortener)
5. [Performance Architecture: Bun vs Node.js](#5-performance-architecture-bun-vs-nodejs)
6. [Troubleshooting & Common Pitfalls](#6-troubleshooting--common-pitfalls)
7. [Group Contribution & Hard Work](#7-group-contribution--hard-work)

---

## 1. Executive Summary & Introduction

Bun is a modern JavaScript and TypeScript runtime designed as a high-performance, drop-in replacement for Node.js.

Built using Apple's JavaScriptCore engine and written in the Zig programming language, Bun delivers ultra-fast startup times, low memory overhead, and native execution efficiency.

### Core Highlights
* ⚡ **Extreme Speed**: Starts up in milliseconds and installs packages drastically faster than standard managers.
* 🛠️ **Zero Configuration**: Native out-of-the-box support for TypeScript and JSX files.
* 📦 **All-in-One Toolchain**: Replaces Node, npm, tsc, esbuild, and Jest within a single binary executable.

---

## 2. Key Advantages of Bun

| Feature | Bun Runtime | Traditional Node.js |
| :--- | :--- | :--- |
| **Engine** | JavaScriptCore | V8 |
| **Language** | Zig | C++ |
| **TypeScript Support** | Native (Zero Config) | Requires `tsc` or `ts-node` |
| **Built-in Database** | Native `bun:sqlite` | Requires external packages |
| **Package Manager** | Built-in `bun install` | Requires `npm` / `yarn` / `pnpm` |

---

## 3. Environment Setup & Installation

Run the appropriate command in your terminal depending on your operating system:

### Windows (PowerShell)
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
