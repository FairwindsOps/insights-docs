# Authentication

Fairwinds Insights provides a REST API, so you can interact with your Insights data
programmatically.

Authentication tokens are scoped to a particular organization. Using an organization's
access token, you can create new clusters, view report data, export Action Items, and more.

To find your authentication token, go to your cluster's settings page, and click "Show token":

<img :src="$withBase('/img/api-authentication.png')" alt="api authentication">

Your token can be used as a `Bearer` token in the `Authorization` header of an HTTP request.
For example, using cURL:
```bash
curl https://insights.fairwinds.com/v0/organizations/acme-co \
  -H "Authorization: Bearer $YOUR_TOKEN"
```

