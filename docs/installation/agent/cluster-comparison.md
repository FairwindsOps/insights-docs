---
meta:
  - name: title
    content: Fairwinds Insights cluster comparison feature
  - name: description
    content: If you have the Insights Agent installed on multiple Kubernetes clusters, you can use Fairwinds Insights to compare the workloads. Read the documentation.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation, cluster comparison
---
# Cluster Comparison
If you have the Insights Agent installed on multiple Kubernetes clusters, you
can use Fairwinds Insights to compare the workloads in those clusters.
This is particularly useful if you have **staging** and **production** clusters,
or multiple clusters that are meant to mirror one another.

You can also compare two namespaces within the same cluster.

In the example below, we examine the differences in the `kube-system` namespace
between a production cluster and a staging cluster:

<img :src="$withBase('/img/compare-namespace.png')" alt="compare kube-system namespace">

We can see that `vpa-admission-controller` and `vpa-updater` are in `staging`, but not `production`.
This could be a mistake - typically we want production and staging to be aligned.

We can also see when the images or resources of a particular workload have changed.
In the example below, we can see that the `oauth2-proxy` deployment doesn't have
resource requests or limits set in production, though it does in staging.

<img :src="$withBase('/img/compare-resources.png')" alt="compare kube-system namespace">
