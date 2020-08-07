# RBAC requirements
Each Fairwinds Insights plugin requires a unique set of permissions in order to do its job.
Here we provide a list of permissions requested by each plugin - you can also review
the [helm chart](https://github.com/FairwindsOps/charts/tree/master/stable/insights-agent) to
see the exact RBAC configurations for each plugin.

Notably, some plugins require **read access to secrets**. This is because they examine Helm 3
releases, which store metadata inside of a `Secret` object.

If a particular plugin requires permissions that you're uncomfortable with, you can disable it
in the Helm chart by adding `--set $plugin.enabled=false`.

## Permission List
| Plugin          | View Secrets       | View Resources (non-secrets) | Other/Notes |
|-----------------|:------------------:|:----------------------------:|-------------- |
| kube-bench      |                    |                              |   |
| kube-hunter     |                    |                              |   |
| Polaris         |                    | :white_check_mark:           |   |
| Kubesec         |                    | :white_check_mark:           |   |
| RBAC reporter   |                    | :white_check_mark:           |   |
| Trivy           |                    | :white_check_mark:           |   |
| Workloads       |                    | :white_check_mark:           |   |
| Goldilocks      |                    | :white_check_mark:           | Create/Delete VPAs |
| Release Watcher | :white_check_mark: | :white_check_mark:           | Needs secrets to view Helm releases |
| Pluto           | :white_check_mark: | :white_check_mark:           | Needs secrets to view Helm releases |
