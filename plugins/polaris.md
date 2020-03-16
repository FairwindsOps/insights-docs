# Polaris
[Polaris](https://github.com/FairwindsOps/polaris) is an open source tool for
checking workload configurations against a set of best-practices. It can
be configured and fine-tuned for each organization that uses it, and custom
checks can be written using JSON Schema.

Polaris validation checks fall into several different categories:

* Health Checks
* Images
* Networking
* Resources
* Security

## Remediation
Remediating Polaris issues involves editing the Helm chart or YAML for your workloads. This is probably
stored in an infrastructure-as-code repository. Once you've made the necessary changes, you'll need
to redeploy.
