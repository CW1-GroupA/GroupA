# Bun Hands-On Tutorial: Build a URL Shortener API in 15 Minutes

**Web Technology Course · University of the West of Scotland (UWS)**  
**Group Tutorial Document · October 2026**  

---

## Overview

This tutorial guides you through building a lightweight **URL Shortener API** from scratch in **15 minutes** using **Bun**. You will learn how to:

1. Install Bun
2. Create a project and manage dependencies
3. Build an HTTP web server using `Bun.serve()`
4. Persist data using built-in `bun:sqlite`
5. Write and execute tests with `bun test`
6. Compare the developer experience with Node.js

**Prerequisites:** A terminal (macOS/Linux) or PowerShell (Windows). No prior Bun experience required.

---

## Step 1 — Installation (1 Min)

**macOS / Linux:**
```bash
curl -fsSL [https://bun.sh/install](https://bun.sh/install) | bash
