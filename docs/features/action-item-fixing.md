---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: Automatically fix Action Items with rule-based fixes, LLM remediation, or external AI agents"
---
# Action Item Fixing

Fairwinds Insights can help you remediate Action Items from Infrastructure-as-Code (IaC) scans by opening a GitHub pull request or delegating work to an external AI agent. Three remediation strategies are available:

| Strategy | How it works | Opens a GitHub PR? |
| -------- | ------------ | ------------------ |
| **Rule-based** | Deterministic fixes using built-in mutation rules (Polaris checks and right-sizing recommendations) | Yes |
| **LLM** | An LLM reads and edits manifest files, then opens a PR with the changes | Yes |
| **Agentic** | An external AI agent (OpenHands, Cursor, CrewAI, Claude, or compatible gateway) applies fixes; you review progress in that provider's dashboard | No — track the run in the agent dashboard |

> Automated pull request fixes require a GitHub-connected repository with [Auto-Scan](/features/infrastructure-as-code-scanning#auto-scan) enabled. The [Manual Insights CI integration](/features/infrastructure-as-code-scanning#manual-scan) does not support Automated Pull Request Fix.

## Prerequisites

Before you can use automated fixing:

1. **Connect GitHub** — Link the repository on the `Repositories` page. The Fairwinds Insights GitHub App needs **Contents** and **Pull requests** read/write access. See [GitHub integration](/features/integrations#github).
2. **Enable Auto-Scan** — Turn on Auto-Scan for the repository in `Repositories > Settings`.
3. **Run a scan** — Open the repository in Insights and select a branch or commit with scan results. Fixable Action Items appear in the scan results table.
4. **Accept terms (LLM and Agentic only)** — An organization owner must accept the LLM & AI Agent Data Processing Terms under `Settings > LLM & Agent Credentials > Terms`.

## Configuration

Navigate to `Settings > LLM & Agent Credentials` in the Insights UI.

### Terms

Organization owners accept the **LLM & AI Agent Data Processing Terms** before LLM credentials, AI agent profiles, or AI remediation can be used. Acceptance applies to the whole organization and supplements your existing Fairwinds Insights Agreement.

When you revoke acceptance, LLM credentials, AI agent profiles, and AI remediation jobs are blocked until an owner accepts the current terms again.

### LLM credentials

On the **LLM credentials** tab, organization owners can store API keys for supported providers:

* OpenAI (including OpenAI-compatible APIs via a custom base URL)
* Anthropic
* Google (Gemini)
* Google Vertex AI
* Azure OpenAI
* AWS Bedrock

Insights maintains a catalog of available models. When creating a pull request with the LLM strategy, you select a stored credential and model from this catalog.

### AI agent profiles

On the **AI agent** tab, organization owners configure profiles for external agent providers:

| Provider | Description |
| -------- | ----------- |
| **OpenHands** | OpenHands Cloud |
| **Cursor Cloud Agents** | Cursor Cloud agent API |
| **Claude** | Anthropic Messages API |
| **CrewAI** | CrewAI Enterprise AMP |
| **Other** | OpenHands-compatible custom gateway |

Each profile stores an HTTPS base URL and API token. Tokens are encrypted and never returned from the API. Base URLs must use HTTPS and cannot point to private or loopback addresses.

## Fixing Action Items

Automated fixing is initiated from a **repository scan**, not from the global Action Items page.

1. Go to `Repositories` and open a GitHub-connected repository.
2. Select a branch or commit to view scan results.
3. Select one or more fixable Action Items in the table, or use the row context menu to pre-select a single item.
4. Click **Create Pull Request**.
5. In the modal, choose a strategy:

### Rule-based

Rule-based fixes use deterministic mutation rules. No LLM credentials or terms acceptance are required.

This strategy supports a fixed set of Polaris configuration checks (for example, missing resource requests, probes, or security context settings) and `prometheus-metrics` right-sizing recommendations (`right_size_container`).

### LLM

The LLM strategy uses your configured credential and model to read and edit the affected manifest files, then opens a GitHub pull request on a separate branch (prefixed `fwinsights_fix_`).

LLM remediation supports Action Items from all standard CI report types, including Polaris, Trivy, OPA, Kyverno, Goldilocks, and others.

Select an **LLM credential** and **Model**, then click **Create Pull Request**. Insights runs the fix job and displays a link to the opened PR when processing completes.

### Agentic

The Agentic strategy delegates remediation to an external AI agent using a saved provider profile. Select a profile, then click **Create Pull Request** to start an agent run.

Insights shows run status in the UI, but the actual fix happens in your agent provider's dashboard. Open the dashboard link to follow progress, review logs, and accept changes.

> Agentic remediation does not open a GitHub pull request through Insights. Review and merge changes through your agent provider's workflow.

## What happens after you submit

For **rule-based** and **LLM** strategies, Insights:

1. Enqueues an automated pull request job.
2. Clones the repository at the scanned branch.
3. Applies fixes to the selected Action Items.
4. Pushes changes to a new branch and opens a GitHub pull request.

You can review the PR before merging. When the fixes land and a rescan confirms the issues are resolved, the corresponding Action Items are marked as fixed.

For **Agentic** runs, Insights sends remediation context (repository name, Action Item titles, descriptions, remediation guidance, and related file paths) to the configured provider. The provider applies fixes on its side; you monitor the run in that provider's dashboard.

## Data sent to third parties

LLM and Agentic remediation send data to the third-party services you configure. That data may include:

* Organization and repository identifiers
* Action Item titles, descriptions, and remediation text
* Affected IaC file paths and related Kubernetes resource metadata

Data is subject to your agreement with each vendor. **Always review AI-generated changes before merging.** Insights does not guarantee that automated or AI-assisted fixes are correct for your environment.

## Permissions and roles

| Action | Required role |
| ------ | --------------- |
| Accept or revoke LLM & AI Agent terms | Organization owner |
| Create, edit, or delete LLM credentials | Organization owner |
| Create, edit, or delete AI agent profiles | Organization owner |
| Start an Agentic agent run | Organization owner or editor |
| Create rule-based or LLM pull requests | User with repository access in Insights |

## Limitations

* **GitHub only** — Automated pull request fixes work only on GitHub-connected repositories with Auto-Scan enabled.
* **IaC context** — The Create Pull Request flow is available from repository scan results. In-cluster Action Items can be viewed and assigned on the Action Items page, but automated PR creation is tied to IaC scans today.
* **Rule-based coverage** — Rule-based fixes cover a subset of Polaris checks and right-sizing recommendations. Use the LLM or Agentic strategy for other report types.
* **Manual CI** — Repositories using the [Manual Insights CI integration](/features/infrastructure-as-code-scanning#manual-scan) can scan in CI but cannot use Automated Pull Request Fix.
* **Human review** — All strategies produce changes that should be reviewed before merge. Automated fixes reduce toil; they do not replace code review.

## Related documentation

* [Infrastructure-as-Code Scanning](/features/infrastructure-as-code-scanning) — Auto-Scan setup and scan configuration
* [GitHub Integration](/features/integrations#github) — Required permissions for Automated Pull Request Fix
* [Policies](/features/policies) — Policy configuration that drives Action Items
* [Workload Configuration](/first-steps/workload-configuration) — Finding and understanding Action Items manually
