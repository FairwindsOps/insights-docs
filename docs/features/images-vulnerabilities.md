---
meta:
  - name: title
    content: Fairwinds Insights Agent
  - name: description
    content: "Fairwinds Insights | Documentation: The Insights Agent runs inside your Cluster, and sends back data to Fairwinds Insights"
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
---
# Images & Vulnerabilities

---

## 1. Vulnerabilities → All Images Page

### Overview
This page provides a high‑level summary of container images deployed across all Kubernetes clusters, their associated vulnerabilities, and quick‑action widgets for remediation planning.
This page is powered by the `Trivy` report.

---
### 1.1. Key Metrics Widgets

| Widget                     | Description                                                                                          |
|----------------------------|------------------------------------------------------------------------------------------------------|
| **Top Impacted Images**    | Horizontal bar chart showing images with the highest vulnerability counts.                           |
| **Severity Breakdown**     | Pie chart showing distribution of vulnerabilities by severity (Low / Medium / High / Critical).       |
| **Top Impacted Packages**  | Vertical bar chart listing the most‑common vulnerable packages across all images.                    |

<img :src="$withBase('/img/vulnerabilities-all-vulns-top.png')" alt="All Vulnerabilities Top Cards">

---
### 1.2. Images Table

A paginated, searchable table listing all container images:

| Column               | Description                                                                                         |
|----------------------|-----------------------------------------------------------------------------------------------------|
| **☐**                | Row selection checkbox                                                                              |
| **Title**            | Image name & tag (e.g. `quay.io/fairwinds/postgres‑partman:16.0`)                                    |
| **Severity**         | Highest-severity hit for that image.                   |
| **Vulnerabilities**  | Total number of CVEs detected in that image.                                                       |
| **Clusters**         | Number of clusters where this image is running.                                                    |
| **Workloads**        | Number of workloads (Pods/Deployments) using this image.                                           |
| **Recommended Tag**  | Suggestion for an upgraded image tag (if available).                                               |
| **Risk Reduction**   | Percentage of risk reduction if upgraded to recommended tag.                                        |
| **Ticket**           | Quick‑create ticket to your issue tracker (e.g. Jira, Azure).                                       |
| **Last Scanned**     | Timestamp of the last security scan.                                                                |
| **Resource Labels**  | Kubernetes labels on the running workloads.                                                         |
| **Namespace Labels** | Kubernetes namespace labels.                                                                        |

- **Search & Filters** above table:  
- Free‑text **Search**  
- Column‑specific **Filter** dropdowns  
- Toggle Filters: **Show Resolved Only**, **Show Critical and High Only**

<img :src="$withBase('/img/vulnerabilities-all-vulns-table.png')" alt="All Vulnerabilities Table">

---
### 1.3. Export & Bulk Actions

- **Export** menu - Export all images or filtered images to CSV  
- **Bulk Actions** (with selected rows):  
  - Create Ticket  
  - Set resolution
  - Set assignee  

---

## 2. Vulnerabilities → Image Detail Page

When clicking any image in the “All Images” table, you land on its **Image Detail** page:

---
### 2.1. Header

- **Last Scanned** indicator

---
### 2.2. Impacted Workloads

A table listing every workload consuming this image:

| Column     | Description                                     |
|------------|-------------------------------------------------|
| **Cluster**| Kubernetes cluster name (e.g. `production`)   |
| **Namespace** | Namespace (e.g. `fwinsights`)                |
| **Name**   | Workload name (e.g. `insights‑postgresql`)      |
| **Container** | Container name inside the Pod / Deployment    |
| **Kind**   | Kubernetes kind (e.g. `StatefulSet`, `Deployment`) |

<img :src="$withBase('/img/vulnerabilities-image-details-impacted-workloads.png')" alt="Impacted Workloads">

---
### 2.3. Impacted Repositories

- **List of repositories** where this image is used/referenced.

<img :src="$withBase('/img/vulnerabilities-image-details-impacted-repos.png')" alt="Impacted Repositories">

---
### 2.4. Image Metadata

| Field             | Details                                  |
|-------------------|------------------------------------------|
| **SHA**           | `sha256:013a…`                            |
| **OS / Arch**     | e.g. `linux/arm64`                       |
| **Current Tag**   | e.g. `16.0`                              |
| **Vulnerabilities** | Total count (e.g. `895`)               |
| **Recommended Tag** | Suggested upgrade (e.g. `N/A`)         |
| **Risk Reduction**  | Numeric & percentage (e.g. `0%`)       |

<img :src="$withBase('/img/vulnerabilities-image-details-metadata.png')" alt="Image Metadata">

---
### 2.5. CVE Details Table

Complete list of CVEs found in this image:

| Column        | Description                                                                        |
|---------------|------------------------------------------------------------------------------------|
| **CVE ID**    | Identifier (e.g. `CVE‑2020‑4756`)                                                  |
| **Title**     | Short description/title of the vulnerability                                       |
| **Severity**  | Severity badge (Low / Medium / High / Critical)                                    |
| **Package**   | Affected package name (e.g. `libc6`)                                               |
| **Source**    | OS or language distro & version (e.g. `debian 12.6`)                               |
| **Installed** | Version currently installed in image (e.g. `2.36‑9+deb11u4`)                       |
| **Fixed**     | Version where CVE is resolved (if available) or `Unavailable`                      |

- **Filter**, **Search**, and **Column Picker** controls above the table.
- **Paginated** (show 25 / 50 / 100) with free‑text **Search** bar.

<img :src="$withBase('/img/vulnerabilities-image-details-table.png')" alt="Image CVEs table">

---
## 3. Context Menu – Image Detail Actions

From the **Image Detail** page, click the `...` (More) icon in the top‑right to reveal **Additional Actions**:

| Action                | Description                                                                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| **Create Ticket**     | Open a ticket in your configured issue tracker (Jira, Azure Boards, etc.) using a customizable template including image name and CVE list. |
| **Resolve** ▶        | Mark all or select CVEs as “Resolved” (i.e. false positive, accepted risk), with option to set expiration.                                  |
| **Assign** ▶         | Delegate this image or specific CVEs to a team or individual for remediation tracking.                                                      |
| **Trigger Image Scan** | Kick off an on‑demand vulnerability scan of this image (e.g. after patching).                                                              |


<img :src="$withBase('/img/vulnerabilities-image-details-context.png')" alt="Context Menu Actions">

---

## 4. Best Practices & Tips

1. **Filter Early**  
 - Use **Show Critical and High Only** to focus on the riskiest images.
2. **Leverage Widgets**  
 - Identify “Top Impacted Packages” to prioritize OS patching across images.
3. **Automate Ticket Creation**  
 - Integrate with Jira/Azure for faster triage and remediation workflows.
4. **On‑Demand Scans**  
 - After applying patches or rebuilding images, use **Trigger Image Scan** to refresh vulnerability data immediately.

---