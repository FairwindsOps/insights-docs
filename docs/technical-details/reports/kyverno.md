---
meta:
  - name: title
    content: Kyverno and Fairwinds Insights
---
# Kyverno
Refer to the [Kyverno documentation](https://kyverno.io/docs/) for using Kyverno in your project. Make sure you have [installed Kyverno](https://kyverno.io/docs/installation/) with the accompanying CRDs before proceeding.

## Setup
Here is an example of installing Kyverno with the `test-org` organization and `prod` cluster:

### Install `insights-agent` with helm and enable Kyverno plugin
```yaml
insights:
  organization: "test-org"
  cluster: "prod"
kyverno:
  enabled: true
```

```bash
kubectx kind-kind
helm repo update
helm upgrade --install insights-agent fairwinds-stable/insights-agent -f values.yaml \
  --version "2.23.*" \
  --create-namespace \
  --namespace insights-agent \
  --wait \
  --atomic
```

### Create Kyverno Policies

We'll create some test policies provided from the Kyverno documentation:

```bash
# pods should have resource requests and limits
kubectl apply -f https://raw.githubusercontent.com/kyverno/policies/main/best-practices/require-pod-requests-limits/require-pod-requests-limits.yaml
# pods should have a readiness or liveness probe configured
kubectl apply -f https://raw.githubusercontent.com/kyverno/policies/main/best-practices/require-probes/require-probes.yaml
# pod containers should not use the `latest` tag
kubectl apply -f https://raw.githubusercontent.com/kyverno/policies/main/best-practices/disallow-latest-tag/disallow-latest-tag.yaml
```

#### Note on Mapping Kyverno Policies to Action Items in Insights

If you inspect one of the example policies provided in the Kyverno documentation, you'll see that the following annotations are set:

```
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-latest-tag
  annotations:
    policies.kyverno.io/title: Disallow Latest Tag
    policies.kyverno.io/category: Best Practices
    policies.kyverno.io/minversion: 1.6.0
    policies.kyverno.io/severity: medium
    policies.kyverno.io/subject: Pod
    policies.kyverno.io/description: >-
      The ':latest' tag is mutable and can lead to unexpected errors if the
      image changes. A best practice is to use an immutable tag that maps to
      a specific version of an application Pod. This policy validates that the image
      specifies a tag and that it is not called `latest`.
```

These annotations are mapped to the corresponding action item when a Kyverno report is sent to Insights in the following way:

* `policies.kyverno.io/title:`, `title`
* `policies.kyverno.io/category` and an Insights `category` are used in different ways. While `policies.kyverno.io/category` can be set to anything, there are only three categories currently supported by Insights. Those are `Efficiency`, `Reliability` and `Security`. If the annotation is not set to any of the categories supported by insights, it will fall back to `Security`
* Similar to `category`, `policies.kyverno.io/severity` should be set to one of the severeties defined in Insights. Those values are `Critical`, `High`, `Medium`, `Low` and `None`. These are not case-sensitive.
* `policies.kyverno.io/description` will correspond to the Insights Action Item description

At minimum, you should try to set `policies.kyverno.io/title` when creating a new `policy`/`clusterpolicy` so your Action Items are easy to identify and resolve.

### Create `deployment`

```bash
kubectl -n default apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
EOF
```

Note how this Deployment:

* Has no resource requests or limits

* Has no readiness or liveness probe

* Uses the `latest` tag

These should all now be picked up by our new Kyverno policies. After a minute or so, we should see new `PolicyReport` objects in our cluster. We can either wait for the Kyverno insights plugin to run again, or trigger the job manually:

```
kubectl -n insights-agent create job --from=cronjob/kyverno kyverno-test-job
```

Once this runs, we should see corresponding Action Items in the Insights UI.

### Check `PolicyReport` status
```bash
kubectl get policyreport -A
```

### Remediate

Let's fix the findings

```bash
# fix requests/limits
kubectl -n default patch deployment nginx-deployment --patch '{"spec":{"template":{"spec":{"containers":[{"name":"nginx","resources":{"requests":{"memory":"64Mi","cpu":"250m"},"limits":{"memory":"128Mi","cpu":"500m"}}}]}}}}'
# fix pod probes
kubectl -n default patch deployment nginx-deployment --patch '{"spec":{"template":{"spec":{"containers":[{"image":"nginx","imagePullPolicy":"IfNotPresent","name":"nginx","resources":{},"ports":[{"containerPort":80}],"readinessProbe":{"httpGet":{"path":"/","port":80}}}]}}}}'
# fix latest tag
kubectl -n default patch deployment nginx-deployment --type JSON -p '[{"op":"replace","path":"/spec/template/spec/containers/0/image","value":"nginx:1.14.2"}]'
```

You should see `PolicyReport`s with each `Policy` name. Under the displayed column with status `fail`, you should see that those are now resolved. The corresponding Action Items should also be resolved after the `kyverno` insights job runs again.
