# Container Security

One of the easiest ways for vulnerabilities to sneak into your cluster is via
a Docker image. Even if you're scanning images as part of CI/CD or your registry,
Common Vulnerabilities and Exposures (CVE) could be announced at any time, even after the image has made it into your cluster.
So it's critical to proactively scan the images that are running in your cluster.

Fairwinds Insights employs Trivy, an open source container scanning solution, to create
Action Items for any image with known vulnerabilities.

To get started with Trivy, you can filter for action items that come from its reports:

<div class="mini-img">
<img :src="$withBase('/img/filter-trivy.png')" alt="Filter for Trivy items">
</div>

You may also want to filter for particular namespaces. For instance, it's good to start with
namespaces for your own applications, rather than core or add-on namespaces like `kube-system` or `metrics-server`.

<div class="mini-img">
<img :src="$withBase('/img/filter-namespaces.png')" alt="Filter namespaces">
</div>

If you've got several vulnerable containers, you can expand them to see details for the individual
packages that are affected, as well as the severity level for each package. Be on the lookout for
packages that you know your applications are using, like PHP or cURL.

<img :src="$withBase('/img/trivy-details.png')" alt="Trivy details">

Once you've identified a vulnerable image that you'd like to fix, you have a few different options:

## Images you own
If you own the Dockerfile that generated this image, you have a couple options at your disposal.

The first option is to upgrade your base image - this solves the vast majority of vulnerabilities.
For instance, your Dockerfile might start like this:

```dockerfile
FROM alpine:3.10.0
```

By updating to the latest version, you can usually patch up any CVEs that were included in that image:
```dockerfile
FROM alpine 3.10.5
```

Even better, many Docker images are published using semver, so you can remove the patch version
to automatically pull in new patches:
```dockerfile
FROM alpine 3.10
```

If upgrading the base image doesn't solve your problem, you can try using apt-get or cURL in your Dockerfile
to install the latest version of a particular application. For instance, maybe you were installing NodeJS
via an install URL:
```dockerfile
FROM alpine 3.10
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash
```

Updating the specified version might fix any vulnerabilities with that particular application. Here
we upgrade to Node 14.x:
```dockerfile
FROM alpine 3.10
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
```

## Images you consume
Many, if not most, of the images in your cluster will be published by third-parties. For example,
every add-on like nginx-ingress and cert-manager comes with its own Docker images. When these images
contain vulnerabilities, it can be a bit harder to remediate.

The first step is to make sure you're on the latest version. If you're using Helm to install these
add-ons, you can check the **Add-ons** tab to see if there are any updates available:

<img :src="$withBase('/img/add-ons.png')" alt="add-ons tab">

If you're already on the latest version of the Helm chart, or if you're not using Helm,
you can check the image registry to see if the downstream image has been updated.

<img :src="$withBase('/img/repo-history.png')" alt="add-ons tab">

As a last resort, you can try filing an issue with the maintainers of the image or Helm chart.
Let them know that one of the images they're publishing contains a vulnerability, and hopefully
they'll be able to publish a fix.
