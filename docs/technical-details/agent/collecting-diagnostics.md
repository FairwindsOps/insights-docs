# Collecting Diagnostics

## Send Agent Logs to Fairwinds Support Using Shell Script

This will require cluster access via `kubectl` and the appropriate role bindings (if applicable, permissions to list, retrieve, describe pods and jobs, also to obtain pod logs via kubectl logs)

* Download `insights_collect.sh` from [here](https://raw.githubusercontent.com/FairwindsOps/insights-plugins/main/scripts/insights_collect.sh)

* Run `insights_collect.sh` . This will simply get all pod and job statuses in the insights-agent namespace, as well as the logs for all pods in the namespace. This will assist Fairwinds in debugging any potential issues with the insights agent in your cluster.

The script will write all of its output to a file that looks something like `insights_collect_1698788297.log` , where `1698788297` is the unix timestamp. This can be sent as an email attachment to support.
