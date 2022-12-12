---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to configure Auto-Scan"
---
# Auto-Scan
## Gating Pull Requests With Github Protected Branches
*Documentation coming soon!*

## Using Auto-Scan to Scan Private Images
You can now scan private container images by setting up docker registries information in Fairwinds Insights via API.
These information will be used to authenticate/authorize against your docker registry and fetch private image container to be scanned.

### Add docker registry
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

### List docker registries
```
curl --location --request GET 'https://insights.fairwinds.com/v0/organizations/{orgName}/ci/docker-registries' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {insightsToken}'
```

### Edit docker registry
```
curl --location --request PUT 'https://insights.fairwinds.com/v0/organizations/{orgName}/ci/docker-registries/{dockerRegistryID}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {insightsToken}' \
--data-raw '{"domain":"docker.io","username":"usernameOrEmail","password":"p4ssw0rd"}'
```

### Delete docker registry
```
curl --location --request PUT 'https://insights.fairwinds.com/v0/organizations/{orgName}/ci/docker-registries/{dockerRegistryID}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {insightsToken}'
```

## Re-Running an Auto-Scan
You can manually re-run an Auto-Scan for specific repository branches. This may be useful if you'd like a refreshed result set, or if you'd like to verify any fixes or changes.

To re-run an Auto-Scan:
- Navigate to the `Repositories` page
- Select a repository that has been enabled with Auto-Scan
- Click the `Re-Run Autoscan` in the upper-right

Re-running an Auto-Scan job usually takes a few minutes. Look for the 'Completed' status to see your latest results.

## Manifests auto-discovery
Unlike Insights CI integration, Auto-Scan does not require users to create a `fairwinds-insights.yaml` configuration file at the base of their GitHub repository. This is because Auto-Scan will automatically crawl and discover YAML manifests, Helm charts, and docker images available for scanning.

### Reports Configuration
When using auto-discovery, all reports are `enabled` by default, if you want to further customize. It is possible to manually configure it via API using CURL:
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

## Customizing Auto-Scan Using Fairwinds-insights.yaml
Sometimes users may want to customize Auto-Scan behaviors for a specific repo. To do this, you can create a `fairwinds-insights.yaml` file at the root of your git repo and customize things like:
- [Configuring specific exemptions](/configure/ci/configuration#managing-exemptions)
- [Resolving Helm chart errors due to missing values](/configure/ci/autoscan#helm-chart-with-invalid-or-missing-values-file)
- [Scanning additional container images not present in your manifests](/configure/ci/configuration#scanning-container-images)
- Enabling/disabling specific scanning tools

> NOTE: When you add a `fairwinds-insights.yaml` file to an Auto-Scan enabled repository, automatic discovery of YAML manifests, Helm charts, and docker images is disabled. You must specify the location of these artifacts within the `fairwinds-insights.yaml` file.

To customize Auto-Scan behavior, please review the [configuration options for `fairwinds-insights.yaml`](/configure/ci/configuration).

## Troubleshooting Auto-Scan
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

- Add a `fairwinds-insights.yaml` to the root of your repository to specify the location of a different values file with the `image.tag` field (or whatever field is not working). Or, you may provide an array of key/value pairs for Insights to use. [Please review this documentation for specifying the location YAML manifests and Helm charts](/configure/ci/configuration#scanning-configuration-manifests). 
>NOTE: When you add a `fairwinds-insights.yaml` file to an Auto-Scan enabled repository, automatic discovery of YAML manifests, Helm charts, and docker images is disabled. This is why you must specify the location of these artifacts within the `fairwinds-insights.yaml` file.