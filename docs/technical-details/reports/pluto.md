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

Pluto works best in CI/CD, working on Infrastructure-as-Code files. Pluto can
also detect in-cluster resources that have been deployed using Helm.

## Remediation
To remediate Pluto findings, you'll need to update the `apiVersion` field in your
Kubernetes manifests. You may also need to edit the body of the manifest to match
the most recent `apiVersion`.

## Sample Report 
Pluto reports contain a list of resources that have deprecated API versions
```json
{
    "items": [
        {
            "name": "cert-manager/cert-manager-webhook",
            "api": {
                "version": "admissionregistration.k8s.io/v1beta1",
                "kind": "MutatingWebhookConfiguration",
                "deprecated-in": "v1.16.0",
                "removed-in": "v1.19.0",
                "replacement-api": "admissionregistration.k8s.io/v1"
            },
            "deprecated": true,
            "removed": false
        }
    ]
}