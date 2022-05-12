---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Setting up continuous integration. "
---
# Setup
To get started with integrating Fairwinds Insights into your CI/CD pipelines:
1. Visit your organization's **Repositories** page, and click **Add Repository**
2. Click on "Connect Manually"
3. Follow the on-screen instruction. You will need to add a `fairwinds-insights.yaml` configuration to the base
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

Last, you'll need to execute the Insights CI script within your CI pipeline. The latest copy of the script and the commands needed can be found in https://insights.fairwinds.com/orgs/acme-co/repositories (be sure to replace acme-co with your organization's name in the URL). If you click the add repo button a pop up appears, and the commands and the latest script version are located at the bottom.
You may want to download, inspect, and store a copy of the script in your repository.
The in-app instructions will also provide a SHA which can be checked to verify the integrity of the script.

Your repository will show up in the Insights UI once that script has been successfully run.
