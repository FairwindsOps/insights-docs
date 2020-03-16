# Goldilocks
[Goldilocks](https://github.com/FairwindsOps/goldilocks/) watches your Kubernetes
deployments and makes recommendations for resource requests and limits
based on actual usage.

Goldilocks utilizes the
[vertical-pod-autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler)
in recommendation mode to extract suggested CPU and Memory limits/requests.

## Requirements
Make sure you have
[metrics-server](https://github.com/kubernetes-sigs/metrics-server)
installed in your cluster.

You'll also need
[vertical-pod-autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler).
Goldilocks will install this for you by default, but if you're managing
your own VPA installation, you can `--set goldilocks.installVPA=false`.

## Remediation
Goldilocks Action Items will suggest particular amounts for CPU and Memory limits/requests.
You can copy/paste these recommendations into your workload configuration.

If Goldilocks is making recommendations for a third-party application, you can likely set
its requests/limits using its helm chart, or by editing its installation YAML by hand.
