---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: About the Admission Controller. Reject resources from entering your cluster if they don't comply with policies"
---

# Admission Controller
## About
Fairwinds Insights can run as an Admission Controller. This means it will reject any Kubernetes resources from entering your cluster
if they don't conform to your organization's policies.

Insights will run the following report types in Admission Controller:
* Polaris (configuration validation for best practices)
* OPA (run custom policies)

## Installation
### Requirements
The default installation requires [cert-manager](https://cert-manager.io/docs/installation/kubernetes/)
v1.0 or greater.

If you don't have cert-manager or if you'd like to provide your own certificate for the webhook, you can use the
`caBundle` and `secretName` parameters to pass a CA Bundle and the location of a TLS certificate
stored in your cluster.

> The Admission Controller listens on port 8443 by default, so a firewall rule or a security group may need to be configured to allow the master nodes to send traffic to the worker nodes on that port.

### Setup
To use the Admission Controller and install it on your cluster:
1. Visit your organization's `Clusters` page
2. After selecting a cluster, go to the `Install Hub` page
3. Hover over the `Admission Controller` report and click the `Quick Add` button 

Once the report has been added, re-install the Insights Agent using the Helm chart in your cluster.

> The Admission Controller is installed in `Passive Mode` by default. This means the Admission Controller will monitor all activities, but not yet deny any deployments.

In order to disable Passive Mode and block deployments with high severity issues:
1. In `Install Hub`, click on the `Admission Controller` report
2. In the `Configure` tab, toggle the `Passive Mode` option to disabled


### Testing
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


## Configuration
### Helm
The Admission Controller can be further configured using Helm. To see the full list of options,
check out the [Insights Admission Helm chart](https://github.com/FairwindsOps/charts/tree/master/stable/insights-admission)

### Resources
By default, the Admission Controller will monitor the following resources:
* `apps/(v1|v1beta1|v1beta2)`
  * Deployments
  * DaemonSets
  * StatefulSets
* `batch/(v1|v1beta1)`
  * Jobs
  * CronJobs
* `core/v1`
  * Pods
  * ReplicationControllers

If you'd like to add additional resources, you can use the `rules`
setting on the Helm chart. Adding this to the `values.yaml` when installing the Insights Agent:
```yaml
insights-admission:
  webhookConfig:
    rules:
    - apiGroups:
      - custom
      apiVersions:
      - v1
      operations:
      - CREATE
      - UPDATE
      resources:
      - customResource
      scope: Namespaced
```

### Report Types
The Admission Controller currently runs the following report types:
* Polaris - checks for security and best practices
* [OPA](/features/policies) - apply custom policies to resources
* Pluto - detects Kubernetes resources that have been deprecated or removed

To enable or disable a particular report:
1. Visit your organization's `Clusters` page
2. After selecting a cluster, go to the `Install Hub` page
3. Click the `Admission Controller` report and navigate to `Configure`
4. Use the toggle to enable or disable a report and click `Update`

<img :src="$withBase('/img/admission-reports.png')" alt="enable reports">

### Customize Policies
To customize the severity or whether a Policy should block an admission request, you can use the
[Policy Configuration](/features/policies) feature.

To create more fine-grained enforcement, learn about [Policy Enforcement best practices](/first-steps/policy-enforcement).


### Using Polaris custom checks with Insights Admission:
For more information about Polaris custom checks, check out:
[Polaris Custom Checks](https://polaris.docs.fairwinds.com/customization/custom-checks/#custom-checks)

You can use polaris custom checks with Insights Admission for either Admission and Mutations.
For accomplishing that add the custom check to your values.yaml, following the example below:

```yaml
insights-admission:
  enabled: true
  webhookConfig:
    mutating:
      enable: true
  polaris:
    config:
      mutations:
        - addMissingLabels 
      checks:
        addMissingLabels: warning
      customChecks:
        addMissingLabels:
          successMessage: labels are correct
          failureMessage: missing labels
          category: Efficiency
          target: app/Deployment
          schema:
            '$schema': http://json-schema.org/draft-07/schema
            type: object
            properties:
              metadata:
                type: object
                required:
                  - labels
                properties:
                  labels:
                    type: object
                    required:
                      - my-required-label
                    properties:
                      tmy-required-label:
                        type: string
          mutations:
            - op: add
              path: "/spec/template/metadata/labels/test3"
              value: "my-value"
```              
## Using Insights Admission Controller with GKE
Insights webhook may intercept resources in the kube-system namespace which may lead to some issues on upgrades and nodes being managed by Google.
We recommend to exclude the kube-system namespace from Insights Admission when running on GKE.

```yaml
insights-admission:
  enabled: true
  webhookConfig:
    namespaceSelector:
      matchExpressions:
        - key: kubernetes.io/metadata.name
          operator: NotIn
          values: ["kube-system"]
```

## Troubleshooting
To troubleshoot the Admission Controller, you can
* View the logs in the admission pods
* View the history of admission requests in the Insights UI by visiting Clusters -> Cluster -> Admission
