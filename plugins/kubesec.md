---
meta:
  - name: title
    content: Fairwinds Insights and Kubesec
  - name: description
    content: Integrated with Fairwinds Insights, Kubesec is an open source tool for assessing the security risk of Kubernetes workloads based on YAML configurations.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, Kubesec, open source
---
# Kubesec
> Note: Kubesec is not installed by default. Its findings overlap heavily with Polaris.
> We recommend using one or the other.

[Kubesec](https://github.com/controlplaneio/kubesec) is an open source tool for assessing
the security risk of Kubernetes workloads based on their YAML configuration.

## Remediation
Remediating Kubesec issues involves editing the Helm chart or YAML for your workloads. This is probably
stored in an infrastructure-as-code repository. Once you've made the necessary changes, you'll need
to redeploy.
