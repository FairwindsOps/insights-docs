---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to install the in-cluster Agent. "
---
# Installation
To get started with the agent, create a new cluster in the Insights UI.

<div class="mini-img">
  <img :src="$withBase('/img/new-cluster.png')" alt="new cluster">
</div>

## Install the Agent

When you create the cluster, you'll be prompted to install the Insights Agent.
You'll need to use [Helm](https://helm.sh/) to install - if you'd like to view the Kubernetes
manifests first, you can use `helm template` to generate the YAML files.

[See the Install Hub documentation](/run/agent/report-hub) for next steps.

## Fleet Installation
If you're installing the Insights Agent across a large fleet of clusters,
it can be tedious to use the UI to create each cluster, then copy out the
cluster's access token. To better serve customers with a large number of clusters,
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
  --set insights.organization="$YOUR_ORGANIZATION_ID" \
  --set insights.cluster="$CLUSTER_IDENTIFIER" \
  --set insights.tokenSecretName=insights-token \
  --set insights.apiToken="$YOUR_API_TOKEN"
```

With these flags set, the Helm chart will create a new cluster in the Insights UI with the specified name
(unless a cluster with that name already exists) before installing the agent.

You'll also want to set `$report.enabled` for each of the reports you want to run,
as well as any other [chart options](https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent)

Here's a description of the flags above:
* `fleetInstall=true` - enable this flow
* `insights.apiToken=xyz` - you can get this admin token from your organization's settings page at insights.fairwinds.com
* `insights.tokenSecretName` - the name of the secret where Insights will store your cluster's token. We recommend `insights-token`
* `insights.organization` - the name your organization in Insights
* `insights.cluster` - the name you want to give this cluster in the Insights UI. You might want to auto-generate this from your kubectl context

When reinstalling the agent in the same cluster, you can omit `apiToken` and `fleetInstall`,
and simply specify `tokenSecretName`.
This allows you to hand off control of the agent to other teams without sharing your
organization's apiToken.
