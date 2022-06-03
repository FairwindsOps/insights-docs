---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to install the Insights Agent"
---
# Setup
### Install the Agent Through Install Hub
When you create a cluster, you'll be taken to the `Install Hub` page for the cluster. To install the Insights Agent:
1. Decide which reports you would like to run in your cluster
2. Hover over each of the desired reports, then click the `Quick Add` button at the bottom of the report
3. Click the `Ready to Install` icon located in the top right corner of the page

Follow the instructions to install the Insights Agent with Helm. If you'd like to view the Kubernetes
manifests first, you can use `helm template` to generate the YAML files.

### Fleet Installation
To better serve customers with a large number of clusters,
we've created a flow that allows you to easily deploy the Insights Agent across your fleet.

You can use the following commands to install the insights-agent in many clusters,
changing `insights.cluster` to a unique identifier for each cluster (e.g. generated using
your kube context).
```
kubectl delete job --all -n insights-agent
helm upgrade --install insights-agent fairwinds-stable/insights-agent \
  --namespace insights-agent \
  --create-namespace \
  --set fleetInstall=true  \
  --set insights.organization="$YOUR_ORGANIZATION" \
  --set insights.cluster="$CLUSTER_IDENTIFIER" \
  --set insights.tokenSecretName=insights-token \
  --set insights.apiToken="$YOUR_API_TOKEN"
```

With these flags set, the Helm chart will create a new cluster in the Insights UI with the specified name
(unless a cluster with that name already exists) before installing the agent.

Here's a description of the flags above:
* `fleetInstall` - specify if this install is using the fleet install flow
* `insights.organization` - the name your organization in Insights
* `insights.cluster` - the name you want to give this cluster in the Insights UI. You may want to auto-generate this from your kubectl context
* `insights.tokenSecretName` - the name of the secret where Insights will store your cluster's token. We recommend `insights-token`
* `insights.apiToken` - the admin token from your organization's `Settings` page

You'll also want to set `$report.enabled` for each of the reports you want to run,
as well as any other [chart options](https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent)

Here is an example of installing the Insights Agent with the `Polaris` and `Trivy` reports inside a cluster named `test-cluster` within the `test-org` organization:
```
kubectl delete job --all -n insights-agent
helm upgrade --install insights-agent fairwinds-stable/insights-agent \
  --namespace insights-agent \
  --create-namespace \
  --set fleetInstall=true  \
  --set insights.organization="test-org" \
  --set insights.cluster="test-cluster" \
  --set insights.tokenSecretName=insights-token \
  --set insights.apiToken="thisIsTheTestOrgAdminToken1234567"
```

When reinstalling the Agent in the same cluster, you can omit `apiToken` and `fleetInstall`,
and simply specify `tokenSecretName`.
This allows you to hand off control of the Agent to other teams without sharing your
organization's apiToken.
