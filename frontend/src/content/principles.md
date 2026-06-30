---
title: "Engineering Principles"
subtitle: "What guides my architecture and decision-making"
---

# Engineering Principles

These are the core tenets that dictate how I write software, architect systems, and collaborate with teams.

---

### 1. Build to Learn, Learn to Build
Reading theory provides structure, but execution reveals the truth. I build small-scale implementations of complex systems (like message queues, compilers, or container runtimes) to understand the mechanical sympathy needed to run them at scale.

### 2. Simple is Better than Clever
The best code is the code that requires the least cognitive load to debug at 3 AM. Prefer explicit logic over implicit state, keep components focused, and avoid micro-optimizations until telemetry proves they are necessary.

### 3. Strict Dependency Control
Every third-party library is a liability. Keep dependency graphs lean to minimize security surface areas, build times, and runtime bloat. If a task can be accomplished with a simple, standard library implementation, build it yourself.

### 4. Fast Telemetry Loops
A system without comprehensive logging and metrics is a black box. Design systems with built-in instrumentation from day one, allowing you to debug bottlenecks using real data rather than intuition.
