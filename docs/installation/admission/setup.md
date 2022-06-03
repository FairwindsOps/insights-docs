---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to set up the Admission controller"
---
# Setup
### Requirements
The default installation requires [cert-manager](https://cert-manager.io/docs/installation/kubernetes/)
v1.0 or greater.

If you don't have cert-manager or if you'd like to provide your own certificate for the webhook, you can use the
`caBundle` and `secretName` parameters to pass a CA Bundle and the location of a TLS certificate
stored in your cluster.

> The Admission Controller listens on port 8443 by default, so a firewall rule or a security group may need to be configured to allow the master nodes to send traffic to the worker nodes on that port.

### Installation
To use the Admission Controller and install it on your cluster, navigate to the [Install Hub](/configure/agent/install-hub) and click the `Quick Add` button on the `Admission Controller` report. Once the report has been added, re-install the Insights Agent using the Helm chart in your cluster.

The Admission Controller is installed in `Passive Mode` by default. This means the Admission Controller will monitor all activities, but not yet deny any deployments.

In order to disable Passive Mode and block deployments with high severity issues:
1. In `Install Hub`, click on the `Admission Controller` report
2. In the `Configure` tab, toggle the `Passive Mode` option to disabled


Once `Passive Mode` is disabled, you can test it out by creating a deployment that creates a high level severity Action Item
by allowing privilege escalation:

**bad-config.yaml**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: busybox-deployment
  namespace: testing
spec:
  replicas: 1
  selector:
    matchLabels:
      app: busybox
  template:
    metadata:
      labels:
        app: busybox
    spec:
      containers:
      - name: busybox
        image: busybox:1.32
        securityContext:
          allowPrivilegeEscalation: true
```

```bash
kubectl create ns testing
kubectl apply -f bad-config.yaml
```

You should see a message saying:
```
Error from server (Privilege escalation should not be allowed: Failure: true): error when creating "STDIN": admission webhook "insights.fairwinds.com" denied the request: Privilege escalation should not be allowed: Failure: true
```


For further tuning please refer to [Configuration documentation](/configure/admission/configuration)