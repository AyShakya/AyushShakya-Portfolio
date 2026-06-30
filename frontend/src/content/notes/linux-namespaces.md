---
id: "linux-namespaces"
title: "Linux process model and namespaces"
category: "Systems & OS"
readTime: "15 min read"
snippet: "A deep dive into clone() flags, PID namespaces, and how modern container runtimes structure isolated userlands."
featured: true
---

# Linux process model and namespaces

A deep dive into clone() flags, PID namespaces, and how modern container runtimes structure isolated userlands.

---

### What are Namespaces?

Namespaces are a feature of the Linux kernel that isolates and virtualizes system resources for a collection of processes. This is the bedrock foundation of container technologies like Docker.

### The Seven Main Namespaces

1. **PID**: Process IDs (processes inside have PID 1, completely unaware of host PID hierarchy).
2. **NET**: Network devices, IP routing tables, port numbers.
3. **MNT**: Mount points (independent file system views).
4. **IPC**: System V IPC, POSIX message queues.
5. **UTS**: Hostname and NIS domain name.
6. **USER**: User and group ID mappings.
7. **CGROUP**: Resource limits (CPU, memory bounds).

### How Container Runtimes Initialize Isolations

At a low level, process creation in Linux uses the `clone()` syscall. By specifying flags, the kernel creates new namespace tables for the spawned process:

```c
int child_pid = clone(child_main, child_stack + 1048576, 
                      CLONE_NEWPID | CLONE_NEWNET | CLONE_NEWNS | SIGCHLD, NULL);
```

This isolates the child process, laying the groundwork for a secure, multi-tenant environment.
