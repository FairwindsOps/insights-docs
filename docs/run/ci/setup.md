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

## Git Information
The CI script needs access to the `git` command-line interface, and expects to be run in a
fully cloned Git repository. Sometimes this is not feasible - in that case we allow users
to manually specify the Git information that Insights needs via environment variables.

We suggest specifying _all_ of the following environment variables if your CI environment
is not able to provide access to the Git client:

* `ORIGIN_URL` - the location of the remote Git repository
* `BRANCH_NAME` - the name of the branch currently being scanned
* `CURRENT_HASH` the hash of the commit currently being scanned
* `MASTER_HASH` - the hash of the commit that should be diffed against
* `COMMIT_MESSAGE` - the message associated with the commit currently being scanned
