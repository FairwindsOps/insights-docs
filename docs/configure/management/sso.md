# Single Sign-On [beta]

Fairwinds Insights supports Single Sign-On via a SAML identity provider.

### Identity Provider Setup

ACS URL: `https://insights.fairwinds.com/v0/organizations/$ORG_NAME/auth/saml`
Entity ID: `fairwinds-insights`
Name ID: Email Address
Attributes:
* firstName: User's first name
* lastName: User's Last Name
* isOwner: true if this user should have owner access to the org. False if they should not. Omit this attribute to handle authorization within Insights
* teams: A list of teams to grant the user access to. Defaults to view access to each team but an additional role can be specified as `<team>/<role>`

### Insights Setup

The `https://insights.fairwinds.com/v0/organizations/$ORG_NAME/saml` endpoint can be used to save SAML settings.
You'll need to specify a URL containing your org's metadata, and a list of email domain names that are allowed to access your org.

Some SAML providers, including Google, do not yet support dynamic SAML metadata.
In this case, you'll need to upload the metadata to a public
URL (e.g. a public GitHub repository) where Insights can pull from.
[Learn more](https://en.wikipedia.org/wiki/SAML_metadata#Metadata-driven_interoperability)

To change your SAML settings, you'll need your admin API key from
https://insights.fairwinds.com/orgs/$ORG_NAME/settings/tokens

You should save this token somewhere safe before enabling SSO, as a misconfiguration could prevent you
from logging into the UI. If you get locked out, get in touch with the Fairwinds team and we'll fix it.

```bash
curl -X POST "https://insights.fairwinds.com/v0/organizations/$ORG_NAME/saml" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  --data-binary @- << EOF
{
  "metadataUrl": "https://raw.githubusercontent.com/$ORG_NAME/insights-configuration/main/metadata.xml",
  "domains": [
    {
        "emailDomain": "example.com"
    }
  ]
}
EOF
```

## Logging in
Once your settings have been saved, you can log in via SSO at

`https://insights.fairwinds.com/v0/organizations/$ORG_NAME/auth/saml`

## Strict Mode
You can enable SSO-strict mode, forcing your users to use SSO in order to log in.

```bash
curl -X POST "https://insights.fairwinds.com/v0/organizations/$ORG_NAME/sso-strict" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  --data-binary @- << EOF
{
  "enabled": true
}
EOF
```
