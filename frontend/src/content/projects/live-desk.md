---
id: "live-desk"
name: "LiveDesk"
tag: "Distributed"
metrics: "150k active messages/sec"
techStack: ["WebSockets", "Go", "React", "Docker"]
featured: true
githubUrl: "https://github.com/AyShakya/LiveDesk"
liveDemoUrl: "https://example.com"
---

# LiveDesk: Collaborative Remote Infrastructure Manager

Collaborative real-time remote infrastructure manager allowing full virtual desktop control from the browser.

---

## 1. Executive Summary
LiveDesk enables developers to manage remote Linux development environments directly from a WebGL-accelerated web terminal and desktop emulator.

## 2. Motivation
Standard screen-sharing systems exhibit high packet loss and high latency overhead in constrained network grids.

## 3. Goals
- Stream frame buffers at 60 FPS under sub-50ms latency.
- Handle multiple simultaneous sessions using a Go connection broker.
- Secure terminal sessions using isolated Docker sandboxes.

## 4. Product Design
A dashboard connecting to user instances showing a live console and canvas stream.

## 5. Architecture
High-performance websocket-based connection broker coordinating frame-buffer diffs via optimized Golang relays.

```
[Browser Canvas] <-> [Go WebSockets Relay] <-> [Isolated Docker Sandbox (VNC/X11)]
```

## 6. Engineering Decisions
- **Go Concurrency Model**: Utilized Go's light weight goroutines and channels to handle high throughput frame multiplexing.
- **Custom Buffer Diffs**: Engineered a proprietary frame diffing algorithm that streams only updated screen sectors, cutting network usage by 70%.
