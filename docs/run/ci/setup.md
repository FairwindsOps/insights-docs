---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Setting up continuous integration. "
---
# Setup
To get started, visit your organization's **Repositories** tab, and click **Add Repo**

<img :src="$withBase('/img/add-repo.png')" alt="Adding a repository">

Following the instructions there, add a `fairwinds-insights.yaml` configuration to the base
of your repository. Here's a minimal example:

> Be sure to replace `acme-co` with your organization's name in Insights.
```yaml
options:
  setExitCode: true
  organization: acme-co

images:
  docker:
  - nginx:1.18-alpine
  - quay.io/acme-co/my-app:$CI_HASH

manifests:
  yaml:
  - ./deploy/mainfests/
  - ./main.deployment.yaml
  helm:
  - name: prod
    path: ./deploy/chart
    values:
      foo: bar
```

Next, you'll need to add the `FAIRWINDS_TOKEN` environment variable to your CI environment. This
token can be found in the CI instructions in Insights, or on your organization's settings page. Note that
most CI platforms provide a way to specify secrets in your environment variables.

Last, you'll need to execute the Insights CI script within your CI pipeline.
You may want to download, inspect, and store a copy of the script in your repository.
The in-app instructions will also provide a SHA which can be checked to verify the integrity of the script.

Your repository will show up in the Insights UI once that script has been successfully run.
