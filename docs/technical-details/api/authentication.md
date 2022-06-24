---
meta:
  - name: title
    content: Fairwinds Insights | API
  - name: description
    content: Fairwinds Insights provides a REST API, so you can interact with your Insights data programmatically.
  - name: keywords
    content: Fairwinds Insights, Kubernetes Audit, Kubernetes configuration validation
---
# API
## Authentication Token
Fairwinds Insights provides a REST API so you can interact with your Insights data
programmatically.

Authentication tokens are scoped to a particular organization. Using an organization's
access token, you can create new clusters, view report data, export Action Items and more.

To find your organizations' authentication token:
1. Visit your organization's `Settings` page
2. Navigate to the `Tokens` page
3. Click the `Show Tokens` button

Your token can be used as a `Bearer` token in the `Authorization` header of an HTTP request.
For example, using cURL:
```bash
curl https://insights.fairwinds.com/v0/organizations/$YOUR_ORG \
  -H "Authorization: Bearer $YOUR_TOKEN"
```

## List of APIs
For all available Insights APIs, check out [https://insights.fairwinds.com/swagger](https://insights.fairwinds.com/swagger)
