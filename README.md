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

[Fairwinds Insights](https://fairwinds.com/insights) is a configuration validation platform that enables engineering and DevOps teams to run Kubernetes workloads securely, efficiently, and reliably. The platform integrates trusted open source tools that proactively monitor Kubernetes and container configurations, recommending improvements that help avoid problems before they arise. Recommendations are stored in a single location which enables teams to track and prioritize issues, collaborate across teams, and apply best practices as applications move from development to production. 

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

