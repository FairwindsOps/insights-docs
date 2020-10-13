---
meta:
  - name: title
    content: Fairwinds Insights Documentation
  - name: description
    content: Fairwinds Insights is a Kubernetes config validation platform. View the documentation on how to install and learn about features and supported plugins.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
---
# Fairwinds Insights Documentation
<blockquote class="github-only">
<p>
You're currently viewing the documenation on GitHub. Links, images,
and other features will not work properly.
</p>
<p>
To view the full docs, visit
<a href="http://insights.docs.fairwinds.com">insights.docs.fairwinds.com</a>
</p>
</blockquote>

[Fairwinds Insights](https://fairwinds.com/insights) is a policy-driven Configuration Validation platform that integrates an extensible framework of trusted open source that runs across the entire development lifecycle. The platform enables DevOps teams to find and prevent configuration problems as applications move from development to production. It provides out-of-the-box [integrations into CI/CD workflows](https://insights.docs.fairwinds.com/features/continuous-integration/), an [admission controller](https://insights.docs.fairwinds.com/features/admission-controller/) for enforcing custom policies (using Open Policy Agent) at pre-deployment, and automation for running [Kubernetes auditing tools](https://insights.docs.fairwinds.com/installation/insights-agent/). Findings and recommendations are stored in a single location, enabling operators to gain visibility and control over multiple Kubernetes clusters, track and prioritize issues, and monitor the security and cost of Kubernetes workloads.

Learn more about [installing Fairwinds Insights](https://insights.docs.fairwinds.com/installation/getting-started), features like [Slack notifications](https://insights.docs.fairwinds.com/features/slack/), and our supported plugins below:

* [Fairwinds Polaris](https://github.com/FairwindsOps/polaris) - checks best practices in workload configuration
* [Fairwinds Goldilocks](https://github.com/FairwindsOps/goldilocks) - recommends resource limits and requests based on actual resource usage
* [Trivy](https://github.com/aquasecurity/trivy) - scans Docker images for known vulnerabilities
* [OPA](https://www.openpolicyagent.org/) - specify custom checks for Kubernetes resources
* [Kubesec](https://github.com/controlplaneio/kubesec) - checks workload configuration for security issues
* [Kube-hunter](https://github.com/aquasecurity/kube-hunter) - checks for cluster- and node-level security vulnerabilities
* [kube-bench](https://github.com/aquasecurity/kube-bench) - checks the cluster against the CIS Benchmark
* Release Watcher - checks for updates to Helm 3 charts (exclusive to Fairwinds Insights)
* [RBAC Reporter](https://github.com/FairwindsOps/insights-plugins/tree/master/rbac-reporter) - uploads metadata about RBAC profiles (exclusive to Fairwinds Insights)
* [Workload Reporter](https://github.com/FairwindsOps/insights-plugins/tree/master/workload) - uploads high-level metadata about running workloads (exclusive to Fairwinds Insights)

