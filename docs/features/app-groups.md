---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: About the App Groups."
---

# App Groups

App Groups are user-defined collections of Kubernetes resources.  You can match on any Kubernetes metadata, such as namespace, kind, workload name, etc.  For example, a user may want to create an App Group for system resources, individual teams or a business unit. App Groups are also multi-cluster and multi-repository, meaning you can select resources across one or many clusters or repositories attached to your Insights organization.

## AppGroup Examples

### Selects all resources
```yaml
type: AppGroup
name: match-all
spec: {}
```

### Matching a very strict workload by every available option

```yaml
type: AppGroup
name: match-strict
spec:
  match:
    -
      clusters: ["store-*"] # starts with "store-"
      containers: [api]
      kinds: [Deployment, StatefulSet, Pod] # select "Deployment", "StatefulSet" and "Pod"
      names: [api]
      namespaces: [prod]
      labels:
        - app: api
      namespaceLabels:
        - business_unit: store
```

### Same as above but we want to target all `kinds` expect `StatefulSet`

```yaml
type: AppGroup
name: match-strict-expect-stateful-set
spec:
  match:
    -
      clusters: ["store-*"]
      containers: [api]
      names: [api]
      namespaces: [prod]
      labels:
        - app: api
      namespaceLabels:
        - business_unit: store
  exclude:
    -
      kind: [StatefulSet] 
```

## Managing App Groups

You can manage App Groups "as code" via the Insights CLI, or through the Insights UI.
- For managing App Groups via CLI, refer to [Insights CLI - App Groups](/features/insights-cli#app-groups).
- For managing App Groups via the Insights UI, you must have an `Owner` role. Select the "App Groups" navigation link to add, edit, or delete your App Group configurations.