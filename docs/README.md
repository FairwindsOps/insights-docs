---
meta:
  - name: title
  - name: description
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
---
# Fairwinds Insights
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

[Fairwinds Insights](https://fairwinds.com/insights) is a policy-driven Configuration Validation platform
that integrates an extensible set of trusted open source auditing tools.
Farwinds Insights runs across the entire development lifecycle, from CI to Admission to Production.

The platform enables DevOps teams to find and prevent configuration problems as applications move
from development to production. It provides out-of-the-box
[integrations into CI/CD workflows](/features/continuous-integration),
an [admission controller](/features/admission-controller)
for enforcing custom policies (using Polaris or Open Policy Agent) at pre-deployment,
and automation for running
[Kubernetes auditing tools](/installation/insights-agent).
Findings and recommendations are stored in a single location, enabling operators to gain visibility
and control over multiple Kubernetes clusters, track and prioritize issues,
and monitor the security and cost of Kubernetes workloads.

Learn more about
[installing Fairwinds Insights](/installation/getting-started),
features like [Slack notifications](/integrations/slack),
and our supported plugins below:

* [Fairwinds Polaris](https://github.com/FairwindsOps/polaris) - checks best practices in workload configuration
* [Trivy](https://github.com/aquasecurity/trivy) - scans Docker images for known vulnerabilities
* [Fairwinds Goldilocks](https://github.com/FairwindsOps/goldilocks) - recommends resource limits and requests based on actual resource usage
* [OPA](https://www.openpolicyagent.org/) - specify custom checks for Kubernetes resources
* [kube-bench](https://github.com/aquasecurity/kube-bench) - checks the cluster against the CIS Benchmark
* [Fairwinds Nova](http://github.com/FairwindsOps/nova) - checks for updates to Helm charts
* [Fairwinds Pluto](http://github.com/FairwindsOps/pluto) - checks for resources deployed using deprecated APIs
* [RBAC Reporter](https://github.com/FairwindsOps/insights-plugins/tree/master/rbac-reporter) - uploads metadata about RBAC profiles (exclusive to Fairwinds Insights)
* [Kube-hunter](https://github.com/aquasecurity/kube-hunter) - checks for cluster- and node-level security vulnerabilities
* [Kubesec](https://github.com/controlplaneio/kubesec) - checks workload configuration for security issues
* [Workload Reporter](https://github.com/FairwindsOps/insights-plugins/tree/master/workload) - uploads high-level metadata about running workloads (exclusive to Fairwinds Insights)

