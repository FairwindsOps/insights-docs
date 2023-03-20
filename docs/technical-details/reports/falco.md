# Falco

Falco is a tool for runtime detection of security events. It monitors every machine in your cluster for suspicious events like system files being accessed, network connections, shells being opened, etc.

## Rules
All system level events are seen by Falco, basically anything that can happen on a node.
This is a huge firehose of data. But rather than reporting the whole firehose,
Falco uses rules to define patterns of events that should be bubbled up.

For example, we don't want an alert every time a file is opened,
but Falco could define a rule to watch specifically for someone opening
`/etc/passwd` and alert on that.

Falco comes with a predefined list of about 200 rules. Each rule has a severity level.
Some are critical, like the rule `Detect outbound connections to common miner pool ports`.
Some are less severe, like an attempt to run interactive commands by a system
(i.e. non-login) user.

## Setup
### Install Falco
First, you'll need to install Falco in your cluster. We recommend using these values when installing
via the [Helm chart](https://github.com/falcosecurity/charts/tree/master/falco):
```yaml
resources:
  requests:
    cpu: 100m
    memory: 256Mi
  limits:
    cpu: 200m
    memory: 512Mi
falco:
  jsonOutput: true
ebpf:
  enabled: false # You can enable this on newer nodes that support eBPF
falcosidekick:
  enabled: true
  fullfqdn: true
  config:
    webhook:
      address: "http://falco-agent.insights-agent:3031/data"
```

### Insights
To enable Falco in the insights-agent, add this to your values.yaml:
```yaml
falco:
  enabled: true
```

Once enabled, every Falco event that gets triggered will generate an Action Item.
Many of these events will be expected as part of normal behavior.

Therefore, we recommend running Falco for about 24 hours to accumulate a
baseline set of expected events. After 24 hours,
you should look at all the Falco Action Items, verify that they are indeed expected
and mark them as `Working as Intended`.

Once this baseline has been established, you should keep a close eye on new findings above that baseline.
These will appear as new Action Items.

In order to better track these, we recommend creating:
* A Query List with the filter `Resolution=None AND ReportType=falco`
* An automation rule to send Slack alerts (or create tickets) in response to new Falco Action Items

### Automation Rule
```js
if (ActionItem.ReportType === 'falco' && ActionItem.IsNew) {
    sendSlackNotification("security-notifications", "There's a new falco finding! :scream:\n\n" + ActionItem.Title);
}
```

## Caveats
### System level Events
Many Insights setups are configured to ignore findings in system-level namespaces
like `kube-system`. We recommend creating an exception for `falco` as these namespaces
could be targeted by an attacker.

### Noise
If you're installing Falco on a development cluster where new ephemeral applications are
regularly being deployed with different names, there will likely be a lot of noise. You
should configure Automation Rules to automatically resolve expected Falco findings
based on the Event Type and patterns of namespace and resource names.

#### Example
```js
if (ActionItem.EventType === 'write_below_etc' && ActionItem.ResourceName.indexOf('app-dashboard') === 0) {
  ActionItem.Resolution = WORKING_AS_INTENDED_RESOLUTION;
}
```

### Cost
Falco runs as a DaemonSet which means that it runs one Pod per Node. By default, we request
50m CPU and 128Mi of memory, which usually amounts to about $1-2 per Node in actual costs.
