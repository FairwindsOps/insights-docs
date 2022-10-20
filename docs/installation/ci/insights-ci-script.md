---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Executing the Insights CI script"
---
# Insights Continuous Integration (CI)

## Step 1: Setup Insights CI
To get started with integrating Fairwinds Insights into your CI/CD pipelines:
1. Visit your organization's `Repositories` page and click `Add Repository`
2. Click on `Connect Manually`
3. Select your CI provider from the dropdown. If your CI provider is not listed, select 'Other'. 
4. The example configurations will automatically refresh. Proceed to Step 2 below to create your initial `fairwinds-insights.yaml` configuration file.

## Step 2: Creating your initial fairwinds-insights.yaml configuration file
You will need to add a `fairwinds-insights.yaml` configuration file to the root
of your repository containing infrastructure as code files. Here's a minimal example:

```yaml
options:
  # This is your Insights Organization ID
  organization: <insights_organization> 
  # Return a non-zero exit code if findings violate policy
  setExitCode: true
  # Your git repo details
  baseBranch: master
  repositoryName: acme-co/my-app

# Specific docker images to scan 
images:
  docker:
  - nginx:1.18-alpine
  - quay.io/acme-co/my-app:$CI_HASH

# Location of IaC manifests to scan
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

## Step 3: Run the Insights CI script for the first time
Last, you'll need to execute the Insights CI script within your CI pipeline.

To access the CI script, please do the following:
1. Navigate to the `Repositories` page in Fairwinds Insights
2. Click on `Add Repository`
3. Click `Connect Manually`
4. Select your CI provider from the dropdown. If your CI provider is not listed, select 'Other'
5. Copy the textbox at the bottom of the window (labeled Step 3 and includes a `curl` command)

You may want to download, inspect and store a copy of the script in your repository.

The in-app instructions will also provide a SHA which can be checked to verify the integrity of the script.

Your repository will show up in the Insights UI once the script has been successfully run.

## Step 4: Add a FAIRWINDS_TOKEN environment variable 
You will need to store a unique Fairwinds Insights' token as an environment variable in your CI provider. This token is used for uploading results to Fairwinds Insights afte ra scan is complete.


1. In Fairwinds Insights, navigate to the `Settings > Tokens` page to generate a CI token. Copy the token.
2. In your CI provider, please create a `FAIRWINDS_TOKEN` environment variable and paste the token.


> Most CI platforms provide a way to specify secrets in your environment variables. Please reach out to your CI provider or Fairwinds if you have any issues. 


## Troubleshooting Insights CI
Please see the [Configure > Infrastructure-as-Code Scanning > Insights CI Integration](/configure/ci/configuration/#troubleshooting-insights-ci) page for troubleshooting information.

