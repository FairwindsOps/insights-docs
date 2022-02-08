---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to install the in-cluster Agent. "
---
# Setup
To get started with the agent, create a new cluster in the Insights UI.

<div class="mini-img">
  <img :src="$withBase('/img/new-cluster.png')" alt="new cluster">
</div>

## Install the Agent

When you create the cluster, you'll be prompted to install the Insights Agent.
You'll need to use [Helm](https://helm.sh/) to install - if you'd like to view the Kubernetes
manifests first, you can use `helm template` to generate the YAML files.


## Install Hub
We recommend using the [Install Hub](/configure/agent/install-hub) to configure the Insights Agent.
Making changes in the Install Hub will change the provided installation command by setting new
Helm parameters.

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

## Debugging
If you suspect something is wrong with the Insights Agent, you can use `kubectl` to
debug the problem.

After the agent runs, `kubectl get pods` should show something like this:
```
$ kubectl get pods -n insights-agent
NAME                                                    READY   STATUS      RESTARTS   AGE
goldilocks-5sh8s                                        0/2     Completed   0          18m
goldilocks-7pgp6                                        0/2     Completed   0          19m
insights-agent-goldilocks-controller-5b6b45d678-vgbrk   1/1     Running     0          19m
insights-agent-goldilocks-vpa-install-566h8             0/1     Completed   0          19m
kube-bench-dpvbz                                        0/2     Completed   0          18m
kube-hunter-tnmsw                                       0/2     Completed   0          18m
polaris-zk4px                                           0/2     Completed   0          18m
rbac-reporter-1583952600-kwmfz                          0/2     Completed   0          105s
rbac-reporter-sf9cz                                     0/2     Completed   0          18m
release-watcher-6lhm7                                   0/2     Completed   0          18m
trivy-8nw9d                                             0/2     Completed   0          18m
workloads-1583951700-dj6wb                              0/2     Completed   0          16m
workloads-q6gzt                                         0/2     Completed   0          18m
```

If any of the pods there show an error, you can look at the logs. There are typically two containers
per pod in the Insights Agent - one to run the auditing tool, and another to upload the results.
For example, here are typical logs for kube-bench:

```bash
$ kubectl logs kube-bench-dpvbz -n insights-agent -c kube-bench
time="2020-03-11T18:32:51Z" level=info msg="Starting:"
time="2020-03-11T18:32:51Z" level=info msg="Updating data."
time="2020-03-11T18:32:54Z" level=info msg="Data updated."
```

If nothing suspicious appears there, you might find an answer in the second container, which uploads the results.
It should end with something like this:
```bash
$ kubectl logs kube-bench-dpvbz -n insights-agent -c insights-uploader
curl -X POST https://staging.insights.fairwinds.com/v0/organizations/acme-co/clusters/staging/data/kube-bench -L -d @/output/kube-bench.json -H 'Authorization: Bearer <REDACTED>' -H 'Content-Type: application/json' -H 'X-Fairwinds-Agent-Version: 0.1.3' -H 'X-Fairwinds-Report-Version: 0.1' -H 'X-Fairwinds-Agent-Chart-Version: 0.15.2' --fail
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  174k  100    16  100  174k     23   254k --:--:-- --:--:-- --:--:--  274k
+ exit 0
{"Success":true}
```

### Common Problems
#### Resource Limits
We have set reasonable resource requests and limits on each of the audits, but some clusters
may push the boundaries of our assumptions. If you're seeing out-of-memory errors or other
resource-related issues, try setting higher resource limits.

If you're using the helm chart, you can do this by adding

```bash
--set $reportType.resources.limits.memory=1Gi
# or
--set $reportType.resources.limits.cpu=1000m
```
to your `helm update --install` command.

#### Timeouts
We have set a reasonable timeout for each of the audits, but again, some clusters may
push the boundaries of our assumptions. If you're seeing timeout issues in the `insights-uploader`
container in one of the report types, you can adjust the timeout by adding:

```bash
--set $reportType.timeout=3600  # 3600s = 5min
```
to your `helm update --install` command.
