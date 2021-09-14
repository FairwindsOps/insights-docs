---
meta:
  - name: description
    content: "Fairwinds Insights | Workload Configuration Documentation. Read Common Use Cases. "
---
# Workload Configuration

Every workload in Kubernetes comes with a configuration that tells Kubernetes how it should run.
For instance, here's a fairly minimal deployment that runs `nginx`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
```

Can you tell what it's doing wrong? The answer is: just about everything!

Here are a few of the issues that Polaris - one of the default reports in Insights - will find with this
deployment:
* There are no liveness or readiness probes set. Kubernetes won't be able to tell if
this app crashes, or when it's properly scaled up. This makes it much more likely that we'll experience downtime,
either as the result of a bug, or just in the normal course of upgrading.
* There are no resource requests or limits. We haven't given Kubernetes any clue as to how much memory or CPU we
expect nginx to use, so if there's a memory leak, we could end up eating up all the cluster's resources. Or if
other, better-behaved workloads begin to request resources, there's a chance nginx will be killed to make room for them.
* It's using the `latest` tag, which could cause us to pull in unwanted updates. It's always good to pin
the image to a particular tag, so you know what you're running.

And we haven't even gotten to the security issues!

To start uncovering issues with workload configuration, you can visit the Action Items tab
and filter for the `polaris` report:

<div class="mini-img">
<img :src="$withBase('/img/filter-polaris.png')" alt="Filter for Polaris items">
</div>

You may also want to filter for particular namespaces. For instance, it's good to start with
namespaces for your own applications, rather than core or add-on namespaces like `kube-system` or `metrics-server`.

Notice that by default, the Action Items are sorted by severity.
This is a good way to pick out the most important items to fix.

Once you've zeroed in on an item that you'd like to fix, expand it to see a description and
remediation.

<img :src="$withBase('/img/ai-remediation.png')" alt="Action item remediation">

Bonus: if you notice any Action Items that can't or shouldn't be fixed, you can mark it as resolved:

<div class="mini-img">
<img :src="$withBase('/img/ai-resolution.png')" alt="Action item resolution">
</div>

And that's it! By following these steps for each of your workloads, you can ensure your applications
stay secure and reliable.
