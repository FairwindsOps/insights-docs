---
meta:
  - name: title
    content: Fairwinds Insights Agent
  - name: description
    content: The Insights Agent runs inside your cluster, and sends back data to Fairwinds Insights. Read the documentation.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
---
# About

> Installing the agent in many different clusters? Check out the
> [fleet installation](/run/agent/installation#fleet-installation) docs.

The Insights Agent runs inside your Cluster, and sends back data to Fairwinds Insights.

The Insights Agent comes with several different open source reporting tools, each of which can be
configured independently using the Report Hub.
To read more about the different report types, see the [Reports Section](/run/agent/configuration).

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
