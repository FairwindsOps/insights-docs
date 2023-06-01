---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Integrate into the CI process for infrastructure-as-code, helping spot issues before they make it into production"
---
# Infrastructure-as-Code Scanning
## About
Fairwinds Insights offers integrations into popular Git and CI/CD tools to enable
Infrastructure-as-Code scanning in your development process.
Scans can be initiated on every pull request and commit on any repository,
enabling organizations to "shift left" and help catch image vulnerabilities and Kubernetes
misconfigurations _before_ they make it into production.

Insights will run the following report types in CI:
* Polaris (configuration validation for best practices)
* Trivy (scan Docker images for vulnerabilities)
* OPA (run custom policies)
* Pluto (detect deprecated resources)
* tfsec (scan Terraform files for configuration issues)

### Choosing Insights CI or Auto-Scan

There are two options for this feature:
- **Auto-Scan**: The easiest option is using our Auto-Scan feature. Auto-Scan uses a GitHub integration to enable infrastructure-as-code scanning across multiple repositories without having to configure individual CI pipelines. This option will use the Fairwinds Insights SaaS infrastructure to run the checks and is recommended for organizations using Github.
- **Manual Scan**: Recommended for organizations not using Github, this option involves executing our Insights CI script as part of your CI/CD pipelines.

|                                                       | **Auto-Scan**                                                                                                    | **Insights CI Integration**                                                                                                      |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Key Differences**                                   | Requires GitHub. Enables IaC scanning on multiple repos in minutes.                                              | Works with popular CI/CD systems. Integrates into individual CI pipelines.                                                       |
| **Target Use Case**                                   | DevOps Leaders adopting GitOps who need Infrastructure-as-Code scanning across multiple teams and repos quickly  | DevOps Leaders with a few infrastructure repos, or who need scanning to be done on their CI/CD infrastructure   |
| **Main Value Proposition**                            | Add infrastructure-as-code scanning to multiple repos in minutes<br />- Reduce cost of fixing issues             | Reduce cost of fixing issues                                                                                                     |
| **GitHub Integration**                                | Required                                                                                                         | Optional                                                                                                                         |
| **Where scans are run**                               | Fairwinds Insights SaaS infrastructure                                                                           | Your CI/CD platform                                                                                                              |
| **Automatic discovery of YAML/Helm charts in a repo** | Yes                                                                                                              | No - manually specify in `fairwinds-insights.yaml`                                                                               |
| **Publish scan results as a GitHub Comment**          | Yes                                                                                                              | Yes (only if GitHub is integrated)                                                                                         |
| **Publish GitHub commit status**                      | Yes                                                                                                              | Yes (only if GitHub is integrated)
| **Automated Pull Request Fix**                        | Yes                                                                                                              | Yes (only if GitHub is integrated)                                                                                                   |
| **Scan Container Images?**                            | Yes - Public and Private images                                                                                                    | Yes - Public and Private images                                                                                                                     |
| **How do I get started?**                             | Navigate to: `Repositories > Add Repository > Connect GitHub`                                              | Navigate to: `Repositories > Add Repository > Connect Manually`

## Installation
### Auto-Scan
Auto-Scan enables organizations using GitHub to enable infrastructure-as-code scanning across multiple repositories without
having to configure individual CI pipelines. Scans will use the Fairwinds Insights SaaS infrastructure to run the checks.

This eliminates the need to configure individual CI pipelines, allows organizations to save on compute resources and turns
on "shift left" infrastructure-as-code testing in minutes.

This feature requires you to first connect Fairwinds Insights to GitHub. Fairwinds Insights will
request the following permissions:
* **Read access to code and metadata:** These permissions allow Fairwinds Insights to identify relevant infrastructure-as-code
files, such as YAML and Helm Charts that can be scanned for security, efficiency and reliability best practices.
* **Read and write access to commit statuses, issues and repository hooks:** These permissions allow Fairwinds Insights
to create issues within a repository (as part of Create Ticket workflows), post scan findings as comments on pull requests
and update commit statuses with a summary of scan results. The repository hooks that Fairwinds Insights monitors
are `push` and `pull request`.

#### Step 1: Connect Insights to GitHub
Connecting Insights to your GitHub repository will help you get the most out of the CI integration.
To get started:
1. Visit your organization's `Repositories` page and click `Add Repository`
2. Click on `Connect GitHub`
3. Follow the on-screen instructions to authorize Fairwinds Insights access to GitHub

Once you authorize GitHub, you can choose which repositories you'd like to add to Insights:
<img :src="$withBase('/img/github-add-repo.png')" alt="Add repo in GitHub">

#### Step 2: Configure Auto-Scan on Specific Repositories
Once you have connected Fairwinds Insights to GitHub, you will need to intentionally enable Auto-Scan for specific repositories. This is done within Fairwinds Insights

1. Visit your organization's `Repositories` page
2. Click on `Settings` in the upper-right of the page
3. A modal will appear for configuring Auto-Scan and GitHub Issue creation for each repository. Toggle the `Auto-Scan`
option to enable/disable Auto-Scan for that specific repository.

#### Step 3: Running Your First Scan
For the repositories you've enable Auto-Scan on, Fairwinds Insights will crawl those repositories and scan any YAML and Helm charts on your next pull request.

### Manual Scan
#### Step 1: Setup Insights CI
To get started with integrating Fairwinds Insights into your CI/CD pipelines:
1. Visit your organization's `Repositories` page and click `Add Repository`
2. Click on `Connect Manually`
3. Select your CI provider from the dropdown. If your CI provider is not listed, select 'Other'.
4. The example configurations will automatically refresh. Proceed to Step 2 below to create your initial `fairwinds-insights.yaml` configuration file.

#### Step 2: Creating Your Initial Fairwinds-insights.yaml Configuration File
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

#### Step 3: Run the Insights CI Script for the First Time
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

#### Step 4: Add a FAIRWINDS_TOKEN Environment Variable
You will need to store a unique Fairwinds Insights' token as an environment variable in your CI provider. This token is used for uploading results to Fairwinds Insights afte ra scan is complete.


1. In Fairwinds Insights, navigate to the `Settings > Tokens` page to generate a CI token. Copy the token.
2. In your CI provider, please create a `FAIRWINDS_TOKEN` environment variable and paste the token.


> Most CI platforms provide a way to specify secrets in your environment variables. Please reach out to your CI provider or Fairwinds if you have any issues. 

## Configuration

The Insights CI integration relies on the `fairwinds-insights.yaml` configuration file in the root of your infrastructure-as-code repository to understand exactly what needs to be scan.

Specifically, the `fairwinds-insights.yaml` file must provide the location of configuration files and images you would like to scan.

> If you are looking to setup Insights CI for the first time, please visit our [Insights CI Installation documentation](/features/infrastructure-as-code-scanning).


### Configuration Options for fairwinds-insights.yaml
Below is a full list of options available in `fairwinds-insights.yaml`.

* `options.organization` - String - the name of your organization in Insights
* `options.hostname` - String - the host of the Insights instance to send results to. Default `https://insights.fairwinds.com`
* `options.setExitCode` - Boolean - whether to set a non-zero exit code if issues are found. Default `false`
* `options.baseBranch` - String - the branch to compare results to. Default `master`
* `options.newActionItemThreshold` - Integer - the maximum number of new Action Items that can appear for a passing test. Default `-1` (No limit)
* `options.severityThreshold` - Integer - if _any_ Action Item hits this threshold, the test will fail. Default `0.7` (high severity)
* `options.junitOutput` - String - if specified, Insights will print JUnit XML results here
* `options.repositoryName` - String - the name of the repository. Must match the name in GitHub if using the GitHub integration. Defaults to the output of `git remote -v`
* `options.tempFolder` - String - a temporary directory to store files. Default `./_insightsTemp/`

#### Gating Pull Requests
You can configure the Insights CI integration to exit with a non-zero exit code, thus allowing you to fail a pipeline job if specific issues are found in a scan. 

When `options.setExitCode` is set to `true`, there are two reasons why an Action Item may cause a CI job to fail:
- The severity of that Action Item exceeds the value in `options.severityThreshold`. Every Action Item has a severity value between 0 and 1, with 1 being "Critical". By default, an Action Item must have a severity of at least 0.7 ("High").
- The Policy is configured to "always fail" when the Action Item is detected in a scan, regardless of that Action Item's severity. Learn more about this in the [Policy Configuration](/features/policies#configuration) section. 

Here is an example:
```
options:
  severityThreshold: 0.7
  setExitCode: true
```

#### Scanning Container Images
Specify any images you'd like Insights to scan for vulnerabilities. These images must be available
locally in your CI environment either through running `docker build` or `docker pull`.

* `images.docker` - Array - an array of image names and tags to scan
* `images.folder` - String - path to a folder containing exported docker images as .tgz files. Helpful if your images are in an alternative daemon like podman or cri-o (if you are, let us know!)

Note that you can include environment variables in your image names and tags. This is helpful
if you set your image tag based on things like the current Git branch, tag, or commit SHA.

Here is an example:
```
images:
  docker:
    - 123456.ecr.us-east-1.amazonaws.com/shopping-cart-app:$CI_SHA1
    - 123456.ecr.us-east-1.amazonaws.com/search-app:$CI_SHA1
```

#### Scanning Configuration Manifests
Specify any YAML or Helm manifests you'd like Insights to scan for configuration issues.
Helm files can be templated using a variables file, or by specifying variables directly
in your `fairwinds-insights.yaml` file.

* `manifests.yaml` - Array - an array of directories or files containing Kubernetes YAML manifests to scan
* `manifests.helm` - Array - an array of helm charts to template and scan
* `manifests.helm[].name` - String - a name to give this templated chart
* `manifests.helm[].path` - String - the path to the directory containing `Chart.yaml`
* `manifests.helm[].repo` - String - a url for a remote helm repository containing the chart
* `manifests.helm[].chart` - String - if `repo` is specified, the name of the chart to download
* `manifests.helm[].version` - String - if `repo` is specified, the version of the chart to download (defaults to latest)
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

Here is an example:
```
manifests:
  yaml:
    - ./path/to/yaml
    - ./my-yaml-file.yaml
  helm:
    - name: prod-app
      path: ./deploy/chart
      valuesFiles: [./deploy/prod-app.yaml]
      values:
        image.tag: 1.1
```

#### Scanning Flux Files
Fairwinds Insights also supports scanning YAML files that container Flux HelmRelease CRDs. 

Here is an example:
```
manifests:
  helm:
    - name: nginx-fluxfile
      fluxFile: ./nginx-flux-file.yaml
      repo: https://helm.nginx.com/stable
```

#### Managing Exemptions
There may be scenarios where certain container images cannot be updated, or you want to suppress certain checks. 

You can tell Insights that certain files or checks should be excluded from the CI scan.
Insights will look for Action Items that match _all_ of the provided fields and mark them as exempt.

It's a good practice to include the `reason` field for future reference.

* `exemptions[].filename` - String - the name of the file to exempt
* `exemptions[].image` - String - the name of the image to exempt for a Trivy scan
* `exemptions[].report` - String - the name of the report type (`polaris`, `pluto`, `trivy` or `opa`)
* `exemptions[].checks[]` - Array - an array of check IDs to skip (e.g. `runAsNonRoot`)
* `exemptions[].reason` - String - a human-readable description of why this exemption is necessary

Here is an example:
```
exemptions:
  - filename: ./my-yaml-file.yaml
  - image: 123456.ecr.us-east-1.amazonaws.com/search-app
    reason: "Soon to be EOL"
  - report: pluto
    reason: "Monitored by Fairwinds Agent"
  - checks: [runAsRootAllowed, tlsSettingsMissing]
```

#### Enable/Disable Scanning Tools
You can control which scan tools (known as 'reports') are run as part of an Insights CI job. By default, all reports are enabled.

* `reports.opa.enabled` - Boolean - set to `false` if you'd like to disable OPA
* `reports.polaris.enabled` - Boolean - set to `false` if you'd like to disable Polaris
* `reports.trivy.enabled` - Boolean - set to `false` if you'd like to disable Trivy
* `reports.tfsec.enabled` - Boolean - set to `false` if you'd like to disable tfsec Terraform file scanning
* `reports.trivy.skipManifests` - Boolean - set to `true` if you don't want to scan images discovered in YAML files and Helm charts

### Auto-Scan
#### Using Auto-Scan to Scan Private Images
You can now scan private container images by setting up docker registries information in Fairwinds Insights via API.
This information will be used to authenticate/authorize against your docker registry and fetch the private image container to be scanned.

##### Add docker registry
```
curl --location --request POST 'https://insights.fairwinds.com/v0/organizations/{orgName}/ci/docker-registries' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {insightsToken}' \
--data-raw '{"domain":"docker.io","username":"usernameOrEmail","password":"p4ssw0rd"}'
```
You can also use `token` instead of `username:password` to authorize against your docker registry. When token is used the `username` field should be `<token>` and the `token` must be provided using the `password` field, i.e:
```
{"domain":"docker.io","username":"<token>","password":"t0k3nV4lu3"}
```

The field `password` is safely encrypted before being persisted on Fairwinds Insights databases.

##### List docker registries
```
curl --location --request GET 'https://insights.fairwinds.com/v0/organizations/{orgName}/ci/docker-registries' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {insightsToken}'
```

##### Edit docker registry
```
curl --location --request PUT 'https://insights.fairwinds.com/v0/organizations/{orgName}/ci/docker-registries/{dockerRegistryID}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {insightsToken}' \
--data-raw '{"domain":"docker.io","username":"usernameOrEmail","password":"p4ssw0rd"}'
```

##### Delete docker registry
```
curl --location --request PUT 'https://insights.fairwinds.com/v0/organizations/{orgName}/ci/docker-registries/{dockerRegistryID}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {insightsToken}'
```

#### Manifests auto-discovery
Unlike Insights CI integration, Auto-Scan does not require users to create a `fairwinds-insights.yaml` configuration file at the base of their GitHub repository. This is because Auto-Scan will automatically crawl and discover YAML manifests, Helm charts, and docker images available for scanning.

#### Reports Configuration
When using auto-discovery, all reports are enabled by default. To customize this, you can manually configure via API using CURL:
```
curl --location --request POST 'https://insights.fairwinds.com/v0/organizations/{orgName}/ci/repositories/{repositoryID}/reports-config' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {adminToken}' \
--data-raw '{
  "autoScan": {
    "polaris": { "enabledOnAutoDiscovery": false },
    "tfsec": { "enabledOnAutoDiscovery": false }
  }
}'
```
This configuration disables `polaris` and `tfsec` when using auto-discovery

Possible report types are: `polaris`, `opa`, `pluto`, `trivy`, `tfsec`

To fetch your current configuration using CURL:
```
curl --location --request GET 'https://insights.fairwinds.com/v0/organizations/{orgName}/ci/repositories/{repositoryID}/reports-config' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {adminToken}'
```

#### CI plugin version override
When not explicitly set, auto-scan will run on a sensible default version set by Fairwinds. However, you may want to configure the CI plugin version to a different one on your repository.

To customize this, you can manually configure via API using CURL:
```
curl --location --request PUT 'https://insights.fairwinds.com/v0/organizations/{orgName}/ci/repositories/{repositoryID}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {adminToken}' \
--data-raw '{
  "CIPluginVersion": "X.Y.Z"
}'
```
Make sure the provide version is [SemVer](https://semver.org/) compliant

#### Customizing Auto-Scan Using fairwinds-insights.yaml
Sometimes users may want to customize Auto-Scan behaviors for a specific repo. To do this, you can create a `fairwinds-insights.yaml` file at the root of your git repo and customize things like:
- [Configuring specific exemptions](/features/infrastructure-as-code-scanning#managing-exemptions)
- [Resolving Helm chart errors due to missing values](/features/infrastructure-as-code-scanning#helm-chart-with-invalid-or-missing-values-file)
- [Scanning additional container images not present in your manifests](/features/infrastructure-as-code-scanning#scanning-container-images)
- Enabling/disabling specific scanning tools

> NOTE: When you add a `fairwinds-insights.yaml` file to an Auto-Scan enabled repository, automatic discovery of YAML manifests, Helm charts, and docker images is disabled. You must specify the location of these artifacts within the `fairwinds-insights.yaml` file.

To customize Auto-Scan behavior, please review the [configuration options for `fairwinds-insights.yaml`](/features/infrastructure-as-code-scanning).

## Troubleshooting

### GitHub Checkout Errors
Insights needs to gather the following information from GitHub:
* The hash of the current commit
* The hash of the base commit
* The commit message
* The branch name
* The origin URL

Some CI providers only provide a partial checkout of the GitHub repository
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

### Monorepos
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


### Re-Running an Auto-Scan
You can manually re-run an Auto-Scan for specific repository branches. This may be useful if you'd like a refreshed result set, or if you'd like to verify any fixes or changes.

To re-run an Auto-Scan:
- Navigate to the `Repositories` page
- Select a repository that has been enabled with Auto-Scan
- Click the `Re-Run Autoscan` in the upper-right

Re-running an Auto-Scan job usually takes a few minutes. Look for the 'Completed' status to see your latest results.

### Reviewing Auto-Scan Logs
Occassionally, you may run an Auto-Scan and it will return an error. You will see an error status like this when you navigate to the `Repositories` page and click on a repository.
<img :src="$withBase('/img/autoscan-error.png')" alt="An Auto-Scan that has reported an error">

If you see this error, you can scroll to the bottom of the page and get detailed logs about the issue. 
<img :src="$withBase('/img/autoscan-logs.png')" alt="Auto-Scan logs provide details about errors generated during the scan">

### Helm Chart With Invalid or Missing Values File
A common error encountered during CI scanning is invalid default values for a Helm chart. If your repository contains a Helm chart, you may see an error message like this:

```
time="2022-10-20T14:57:16Z" level=info msg="Updating dependencies for my-app"
time="2022-10-20T14:57:16Z" level=info msg="Templating: my-app"
time="2022-10-20T14:57:16Z" level=error msg="Error running /usr/local/bin/helm template my-app /app/repository/my-app/deploy/helm/my-app --output-dir /app/repository/tmp/_insightsTemp//configuration/my-app -f /app/repository/my-app/deploy/helm/my-app/values.yaml - Error: execution error at (my-app/templates/api_deployment.yaml:32:20): image.tag must be specified\n\nUse --debug flag to render out invalid YAML\n[exit status 1]"
time="2022-10-20T14:57:16Z" level=fatal msg="Error processing repository: Error while processing helm templates: exit status 1"
```

This message indicates that the Helm chart expected the `image.tag` value to be set, but no value was set in the default `values.yaml` supplied with the chart. 

There are two ways to fix this problem:

- **RECOMMENDED:** Change your default `values.yaml` to include `image.tag` (or whatever field is not working)

OR

- Add a `fairwinds-insights.yaml` to the root of your repository to specify the location of a different values file with the `image.tag` field (or whatever field is not working). Or, you may provide an array of key/value pairs for Insights to use. [Please review this documentation for specifying the location YAML manifests and Helm charts](/features/infrastructure-as-code-scanning#scanning-configuration-manifests). 
>NOTE: When you add a `fairwinds-insights.yaml` file to an Auto-Scan enabled repository, automatic discovery of YAML manifests, Helm charts, and docker images is disabled. This is why you must specify the location of these artifacts within the `fairwinds-insights.yaml` file.

