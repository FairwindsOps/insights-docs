---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Executing the Insights CI script"
---
# Insights CI Script
## Integrate Insights into CI/CD
To get started with integrating Fairwinds Insights into your CI/CD pipelines:
1. Visit your organization's `Repositories` page and click `Add Repository`
2. Click on `Connect Manually`
3. Follow the on-screen instructions.

## Adding the fairwinds-insights.yaml File
You will need to add a `fairwinds-insights.yaml` configuration file to the root
of your repository. Here's a minimal example:

```yaml
options:
  setExitCode: true
  organization: <insights_organization>

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

## Adding the FAIRWINDS_TOKEN Environment Variable
Next, you'll need to add the `FAIRWINDS_TOKEN` environment variable to your CI environment. This
token can be found in the CI instructions in Insights, or on your organization's `Settings` page. Note that
most CI platforms provide a way to specify secrets in your environment variables.

## Run the Insights CI Script
Last, you'll need to execute the Insights CI script within your CI pipeline.
You may want to download, inspect, and store a copy of the script in your repository.
The in-app instructions will also provide a SHA which can be checked to verify the integrity of the script.

Your repository will show up in the Insights UI once the script has been successfully run.
