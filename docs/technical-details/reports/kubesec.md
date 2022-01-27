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

## Sample Report 
kubesec reports contain a list of Namespaces, Deployments, StatefulSets, and DaemonSets,
as well as any potential configuration issues discovered.
```json
{
    "namespaces": {
        "my-app": {
            "daemonsets": [],
            "statefulsets": [],
            "deployments": [
                {
                    "name": "my-app",
                    "namespace": "my-app",
                    "results": [
                        {
                            "message": "Passed with a score of 4 points",
                            "object": "Deployment/my-app.my-app",
                            "score": 4,
                            "scoring": {
                                "advise": [
                                    {
                                        "points": 3,
                                        "reason": "Well defined AppArmor policies may provide greater protection from unknown threats. WARNING: NOT PRODUCTION READY",
                                        "selector": ".metadata .annotations .\"container.apparmor.security.beta.kubernetes.io/nginx\""
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
}
```