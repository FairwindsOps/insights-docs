# Continuous Integration
> This is an **experimental feature**.
>
> To enable the Contiuous Integration beta, open
> your browser console on insights.fairwinds.com and type
> ```
> localStorage.setItem('ci_beta', 'true');
> ```
> Then hit enter and refresh the page. You should see a new tab, `Repositories`, on your organization
> page.

Fairwinds Insights can do more than just scan and audit a live Kubernetes Cluster. It can also
help you spot issues _before_ they make it into production.

By adding Fairwinds Insights into your Continuous Integration process, you can catch image
vulnerabilities and Kubernetes misconfigurations early in the development process. Insights
can scan changes the changes in each pull request, notifying developers or breaking the build
whenever security, efficiency, or reliability issues are found.

# Setup
To get started, visit your organization's **Repositories** tab, and click **Add Repo**

<img :src="$withBase('/img/add-repo.png')" alt="action items">

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
  - ./deploy/test.yaml
  helm:
  - name: prod
    path: ./deploy/chart
    valuesFile: ./deploy/prod
  - name: staging
    path: ./deploy/chart
    values:
      foo: bar
      resources:
        requests:
          memory: 1Gi
```

Note that Docker images can use any environment variables that are available in your CI environment.

Next, you'll need to add the `FAIRWINDS_TOKEN` environment variable to your CI environment. Most
CI platforms provide a way to specify secrets in your environment variables.

Last, you'll need to execute the Insights CI script. You may want to download and store a copy
of the script in your repository.
```
curl https://insights.fairwinds.com/static/insights-ci.sh | bash
```

## fairwinds-insights.yaml
Here's a full list of options available in fairwinds-insights.yaml:

### Options
These are high-level options for the Insights CI integration.
* `options.organization` - the name of your organization in Insights
* `options.setExitCode` - set a non-zero exit code if issues are found. Default `false`
* `options.baseBranch` - the branch to compare results to. Default `master`
* `options.newActionItemThreshold` - the maximum number of new action items that can appear for a passing test. Default `0`
* `options.severityThreshold` - if _any_ action item hits this threshold, the test will fail. Default `danger`
* `options.junitOutput` - if specified, Insights will print JUnit XML results here
* `options.repositoryName` - the name of the repository. Must match the name in GitHub if using the GitHub integration. Defaults to the output of `git remote -v`
* `options.tempFolder` - a temporary directory to store files in. Default `./_insightsTemp/`
* `options.hostname` - the host of the Insights instance to send results to. Default `https://insights.fairwinds.com`

### Images
Specify any images you'd like Insights to scan for vulnerabilities. These images must be available
locally in your CI environment, either through running `docker build` or `docker pull`.

* `images.docker` - an array of image names and tags to scan

Note that you can include environment variables in your image names and tags. This is helpful
if you set your image tag based on things like the current Git branch, tag, or commit SHA.

### Manifests
Specify any YAML or Helm manifests you'd like Insights to scan for configuration issues.
Helm files can be templated using a variables file, or by specifying variables directly
in your fairwinds-insights.yaml

* `manifests.yaml` - an array of directories or files containing Kubernetes YAML manifests to scan
* `manifests.helm` - an array of helm charts to template and scan
* `manifests.helm[0].name` - a name to give this templated chart
* `manifests.helm[0].path` - the path to the directory containing `Chart.yaml`
* `manifests.helm[0].values` - values to pass to the chart when templating
* `manifests.helm[0].valuesFile` - a YAML file containing values to pass to the chart when templating


