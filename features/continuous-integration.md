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
    values:
      foo: bar
      resources:
        requests:
          memory: 1Gi
```

Next, you'll need to add the `FAIRWINDS_TOKEN` environment variable to your CI environment. This
token can be found in the CI instructions in Insights, or on your organization's settings page. Note that
most CI platforms provide a way to specify secrets in your environment variables.

Last, you'll need to execute the Insights CI script within your CI pipeline.
You may want to download, inspect, and store a copy of the script in your repository.
```
curl https://insights.fairwinds.com/static/insights-ci.sh | bash
```

Your repository will show up in the Insights UI once that script has been successfully run.

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
* `images.folder` - path to a folder containing exported docker images as .tgz files. Helpful if your images are in an alternative daemon like podman or cri-o (if you are, let us know!)

Note that you can include environment variables in your image names and tags. This is helpful
if you set your image tag based on things like the current Git branch, tag, or commit SHA.

### Manifests
Specify any YAML or Helm manifests you'd like Insights to scan for configuration issues.
Helm files can be templated using a variables file, or by specifying variables directly
in your fairwinds-insights.yaml

* `manifests.yaml` - an array of directories or files containing Kubernetes YAML manifests to scan
* `manifests.helm` - an array of helm charts to template and scan
* `manifests.helm[].name` - a name to give this templated chart
* `manifests.helm[].path` - the path to the directory containing `Chart.yaml`
* `manifests.helm[].values` - values to pass to the chart when templating
* `manifests.helm[].valuesFile` - a YAML file containing values to pass to the chart when templating

## Connect to GitHub
> Using Gitlab, Bitbucket, or another Git host? Let us know!

Connecting Insights to your GitHub repository will help you get the most out of the CI integration.
To get started, click the **Install Now** link on your organization's repositories tab.

Then, in the GitHub UI, choose which repositories you'd like to link to Insights:
<img :src="$withBase('/img/github-add-repo.png')" alt="action items">

Once your repository is linked, you'll start seeing a Fairwinds Insights status on each of your
pull requests.
<img :src="$withBase('/img/github-status.png')" alt="action items">

We recommend setting `options.setExitCode: false` in your fairwinds-insights.yaml, since
this check will now fail in place of your CI pipeline.

## Viewing the Results
The **Repositories** tab will show you a list of all repositories that have been connected to Insights.
Next to each repo, you can see the number of `danger` and `warning` items currently found in the main
branch.
<img :src="$withBase('/img/repos-list.png')" alt="action items">

When you click on a particular repository, the first thing you'll see is a list of action items
affecting the main branch.
<img :src="$withBase('/img/repo-main-branch.png')" alt="action items">

Below that, you'll see a section for each branch, along with a list of action items that have
been created or fixed in that branch.

For example, here's a branch that creates some security issues in `passing.yaml`:
<img :src="$withBase('/img/repo-failing-branch.png')" alt="action items">

And here's a branch that fixes some security issues in `failing.yaml`:
<img :src="$withBase('/img/repo-passing-branch.png')" alt="action items">

