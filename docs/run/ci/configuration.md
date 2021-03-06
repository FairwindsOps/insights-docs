# Configuration
Configuration of the CI integration happens mainly in fairwinds-insights.yaml,
which should be checked into the root of your infrastructure-as-code repository.

You can also see the [automation rules documentation](/configure/policy/rules) for further
customization options.

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

### Exemptions
You can tell Insights that certain files or checks should be excluded from the CI scan.
Insights will look for Action Items that match _all_ of the provided fields, and mark them as exempt.

It's a good practice to include the `reason` field for future reference.

* `exemptions[].filename` - the name of the file to exempt
* `exemptions[].image` - the name of the image to exempt for a Trivy scan
* `exemptions[].report` - the name of the report type (e.g. `polaris`, `pluto`, `trivy`, or `opa`)
* `exemptions[].checks[]` - an array of check IDs to skip (e.g. `runAsNonRoot`)
* `exemptions[].reason` - a human-readable description of why this exemption is necessary


