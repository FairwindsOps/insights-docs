---
meta:
  - name: title
    content: Kube-bench and Fairwinds Insights
  - name: description
    content: Kube-bench checks Kubernetes clusters against the CIS Kubernetes Benchmark
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, open source, Kube-hunter, CIS Benchmark
---
# Kube-bench

[Kube-bench](https://github.com/aquasecurity/kube-bench/) checks your Kubernetes cluster against the
[CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes/), which
is aimed at keeping clusters secure.

See the [project's README](https://github.com/aquasecurity/kube-bench/) for notes and caveats.

Kube-bench can run in two different modes:
* `cronjob` will run kube-bench on a single node
* `daemonset` will run kube-bench on all nodes

If you're confident that your nodes are all using the same configuration, `cronjob` mode should
suffice. But if you want to be certain, `daemonset` mode will check every node in your cluster
against the CIS benchmark.

