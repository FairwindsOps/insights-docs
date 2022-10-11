---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to configure the CI integration"
---
# Configuration File
Configuration of the CI integration happens mainly in `fairwinds-insights.yaml`
which can be checked into the root of your infrastructure-as-code repository.

Below is a full list of options available in `fairwinds-insights.yaml`.

## Options
These are high-level options for the Insights CI integration.
* `options.organization` - String - the name of your organization in Insights
* `options.hostname` - String - the host of the Insights instance to send results to. Default `https://insights.fairwinds.com`
* `options.setExitCode` - Boolean - whether to set a non-zero exit code if issues are found. Default `false`
* `options.baseBranch` - String - the branch to compare results to. Default `master`
* `options.newActionItemThreshold` - Integer - the maximum number of new Action Items that can appear for a passing test. Default `-1` (No limit)
* `options.severityThreshold` - Integer - if _any_ Action Item hits this threshold, the test will fail. Default `0.7` (high severity)
* `options.junitOutput` - String - if specified, Insights will print JUnit XML results here
* `options.repositoryName` - String - the name of the repository. Must match the name in GitHub if using the GitHub integration. Defaults to the output of `git remote -v`
* `options.tempFolder` - String - a temporary directory to store files. Default `./_insightsTemp/`

## Images
Specify any images you'd like Insights to scan for vulnerabilities. These images must be available
locally in your CI environment either through running `docker build` or `docker pull`.

* `images.docker` - Array - an array of image names and tags to scan
* `images.folder` - String - path to a folder containing exported docker images as .tgz files. Helpful if your images are in an alternative daemon like podman or cri-o (if you are, let us know!)

Note that you can include environment variables in your image names and tags. This is helpful
if you set your image tag based on things like the current Git branch, tag, or commit SHA.

## Manifests
Specify any YAML or Helm manifests you'd like Insights to scan for configuration issues.
Helm files can be templated using a variables file, or by specifying variables directly
in your `fairwinds-insights.yaml` file.

* `manifests.yaml` - Array - an array of directories or files containing Kubernetes YAML manifests to scan
* `manifests.helm` - Array - an array of helm charts to template and scan
* `manifests.helm[].name` - String - a name to give this templated chart
* `manifests.helm[].path` - String - the path to the directory containing `Chart.yaml`
* `manifests.helm[].repo` - String - a url for a remote helm repository containing the chart
* `manifests.helm[].chart` - String - if `repo` is specified, the name of the chart to download
* `manifests.helm[].fluxFile` - String - a YAML file containing a Flux HelmRelease CRD (you will still need to specify `repo`)
* `manifests.helm[].values` - values to pass to the chart when templating
* `manifests.helm[].valuesFile` (DEPRECATED) - a YAML file name containing values to pass to the chart when templating
  * Note this is deprecated in favor of the below `manifests.helm[].valuesFiles`.
* `manifests.helm[].valuesFiles` - a list of YAML file names containing values to pass to the chart when templating

If multiple Helm values are specified in `fairwinds-insights.yaml`, the processing order is:
1. Values from the flux file, via `manifests.helm[].fluxFile`
2. Values from the DEPRECATED `manifests.helm[].valuesFile`
3. Values from the `manifests.helm[].valuesFiles`, in the order those files are listed
4. Inline values listed in `manifests.helm[].values`

## Reports
You can control which reports run and pass options to each report type.

* `reports.opa.enabled` - Boolean - set to `false` if you'd like to disable OPA
* `reports.polaris.enabled` - Boolean - set to `false` if you'd like to disable Polaris
* `reports.trivy.enabled` - Boolean - set to `false` if you'd like to disable Trivy
* `reports.trivy.skipManifests` - Boolean - set to `true` if you don't want to scan images discovered in YAML files and Helm charts

## Exemptions
You can tell Insights that certain files or checks should be excluded from the CI scan.
Insights will look for Action Items that match _all_ of the provided fields and mark them as exempt.

It's a good practice to include the `reason` field for future reference.

* `exemptions[].filename` - String - the name of the file to exempt
* `exemptions[].image` - String - the name of the image to exempt for a Trivy scan
* `exemptions[].report` - String - the name of the report type (`polaris`, `pluto`, `trivy` or `opa`)
* `exemptions[].checks[]` - Array - an array of check IDs to skip (e.g. `runAsNonRoot`)
* `exemptions[].reason` - String - a human-readable description of why this exemption is necessary

## Troubleshooting and Advanced Configurations

### Git Checkouts
Insights needs to gather the following information from Git:
* The hash of the current commit
* The hash of the base commit
* The commit message
* The branch name
* The origin URL

Some CI providers only provide a partial checkout of the Git repository
by default, and some (e.g. Google Cloud Build) check out the repository
in "detached HEAD" state, which makes it hard to gather this information.

In these cases you may see an error like:
```bash
time="2022-08-25T16:47:49Z" level=error msg="Error running /usr/bin/git merge-base HEAD main - fatal: Not a valid object name main\n[exit status 128]"
time="2022-08-25T16:47:49Z" level=error msg="Unable to get GIT merge-base"
time="2022-08-25T16:47:49Z" level=fatal msg="Unable to get git details: exit status 128"
```

There are a couple ways to work around this:
* Configure your CI provider to do a "full checkout" of the repository
  * [GitLab example](https://stackoverflow.com/questions/65686740/how-to-fetch-entire-repository-with-gitlab-ci-cd)
  * [Jenkins docs](https://www.jenkins.io/doc/pipeline/steps/workflow-scm-step/)
* Set environment variables for the following values:
  * `MASTER_HASH` - the commit SHA to diff against, typically the tip of your main branch
  * `COMMIT_HASH` - the SHA of the commit being scanned
  * `COMMIT_MESSAGE` - the message associated with this commit
  * `BRANCH_NAME` - the branch associated with this commit
  * `ORIGIN_URL` - the location of the repository

### Monorepo
If you build many different docker images as part of a monorepo, you
may want to only scan the images that have been changed. In this case,
there is a workaround for dynamically generating the `images` section of
the `fairwinds-insights.yaml`:

```
echo "images:" >> fairwinds-insights.yaml
echo "  docker:" >> fairwinds-insights.yaml
for image in "${changedImages[@]}"; do
  echo "    - $image" >> fairwinds-insights.yaml
done
```
