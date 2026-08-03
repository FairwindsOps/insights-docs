# Network Observability

Network Observability provides continuous visibility into network traffic across your cluster — connections, DNS queries, and per-workload bandwidth — using [eBPF](https://ebpf.io/) via [Inspektor Gadget](https://www.inspektor-gadget.io/).

It is composed of two components:

- **Agent** (`network-flow`) — a DaemonSet running on every node. It attaches eBPF programs to the kernel to capture TCP connections, traffic volumes, and DNS activity, then streams events to the aggregator.
- **Aggregator** (`network-flow-aggregator`) — a Deployment that enriches raw events with Kubernetes metadata (pod, namespace, workload owner), buffers them, and forwards the data to Insights.

## Requirements

### Linux nodes with eBPF support

The agent requires Linux nodes with `bpf` and `debugfs` filesystems available. Windows nodes are not supported.

### Elevated permissions

Because the agent uses eBPF, it requires a set of elevated Linux capabilities and host filesystem mounts. These are configured automatically by the chart, but your cluster must permit them (e.g. PodSecurity policies or admission webhooks must allow the required capabilities):

| Requirement | Value |
|---|---|
| Linux capabilities | `SYS_ADMIN`, `SYSLOG`, `SYS_PTRACE`, `SYS_RESOURCE`, `IPC_LOCK`, `NET_RAW`, `NET_ADMIN` |
| AppArmor | `unconfined` |
| SELinux type | `super_t` |
| Host mounts | `/sys/fs/bpf`, `/sys/kernel/debug`, `/sys/fs/cgroup`, plus several paths under `/host` |

The aggregator runs with no elevated privileges.

## Setup

Add the following to your `insights-agent` `values.yaml`:

```yaml
network-observability:
  enabled: true
```

This is the minimum configuration needed. The agent will discover the in-cluster aggregator automatically, and the aggregator will forward enriched flow data to Insights using the token already configured for the agent.

## Architecture

Agents on each node capture flow events via eBPF and stream them to the aggregator, which enriches them with Kubernetes metadata and forwards them to Insights.

## Configuration

The full values reference is in the [chart README](https://github.com/FairwindsOps/charts/blob/master/stable/insights-agent/README.md). The most relevant options are listed below.

### Agent

```yaml
network-observability:
  agent:
    collectorAddr: ""       # default: in-cluster aggregator service; override to point elsewhere
    batchSize: 5000         # events per gRPC batch sent to the aggregator
    maxPendingEvents: 25000 # max events queued before dropping; reduce if OOMing
    flushInterval: 5s       # how often to flush pending events
    logLevel: info
    ig:
      hookMode: auto        # eBPF attach mode; set to 'cgroup' on kernels that need it
      eventsBufferLength: 32768
```

### Aggregator

```yaml
network-observability:
  aggregator:
    replicas: 1
    maxEvents: 100000       # max events held in memory across all nodes
    maxAge: 15m             # evict events older than this
    upstream:
      enabled: true
      batchSize: 10000
      flushInterval: 10s
```

## Caveats

### Cost

The agent runs as a DaemonSet — one pod per node. Default resource requests are `50m` CPU / `128Mi` memory. On large clusters with high network activity, raise `maxPendingEvents` or `resources.limits` before raising the buffer to avoid OOM restarts.

### Admission webhook compatibility

If your cluster enforces Pod Security Standards at `restricted` or `baseline` level, the agent pod will be rejected because it requires `SYS_ADMIN` and other capabilities. You will need to exempt the `insights-agent` namespace or create a policy exception for the `network-flow` DaemonSet.

### Kernel version

Older kernels (pre-4.18) may not support all eBPF program types used by Inspektor Gadget. If you see the agent crashing at startup, check `ig.hookMode`; setting it to `cgroup` can help on certain distributions.
