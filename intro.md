# Fairwinds Insights Documentation

:book: Welcome to the documentation for [Fairwinds Insights](https://fairwinds.com/insights)!

Fairwinds Insights is a Kubernetes auditing platform. We integrate several different
open source auditing tools, and aggregate their results. This helps Kubernetes
administrators understand any risks to security, reliablity, and efficiency
lurking in their clusters. Findings are automatically ranked by severity, and can
be assigned, annotated, or closed.

Fairwinds Insights currently supports the following Kubernetes auditing tools:
* [Fairwinds Polaris](https://github.com/FairwindsOps/polaris) - checks best practices in workload configuration
* [Goldilocks](https://github.com/FairwindsOps/goldilocks) - recommends resource limits and requests based on actual resource usage
* [Trivy](https://github.com/aquasecurity/trivy) - scans Docker images for known vulnerabilities
* [Kubesec](https://github.com/controlplaneio/kubesec) - checks workload configuration for security issues
* [Kube-hunter](https://github.com/aquasecurity/kube-hunter) - checks for cluster- and node-level security vulnerabilities
* Release Watcher - checks for updates to Helm 3 charts
* RBAC Reporter - uploads metadata about RBAC profiles
* Workload Reporter - uploads metadata about workloads

