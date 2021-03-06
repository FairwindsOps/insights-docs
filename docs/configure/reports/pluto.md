---
meta:
  - name: title
    content: Pluto Integration with Fairwinds Insights
  - name: description
    content: Pluto, by Fairwinds, is an open source tool for detecting deprecated Kubernetes resources
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, Pluto, open source, deprecation
---
# Pluto

[Pluto](https://github.com/FairwindsOps/pluto) is an open source utility for
detecting Kubernetes resources that have been deprecated or removed.

Pluto works best in CI/CD, working on Infrastructure-as-Code files. But Pluto can
also detect in-cluster resources that have been deployed using Helm. See the
[FAQ](https://github.com/FairwindsOps/pluto#frequently-asked-questions) to learn
more about why this is.

## Remeidation
To remediate Pluto findings, you'll need to update the `apiVersion` field in your
Kubernetes manifests. You may also need to edit the body of the manifest to match
the most recent `apiVersion`.
