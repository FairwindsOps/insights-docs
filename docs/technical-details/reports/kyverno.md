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
