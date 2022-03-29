# Single Sign-On

Fairwinds Insights supports Single Sign-On via a SAML identity provider.

## Identity Provider Setup

* ACS URL: `https://insights.fairwinds.com/v0/organizations/$ORG_NAME/auth/saml`
* Entity ID: `fairwinds-insights`
* Name ID: Email Address
* Attributes:
  * firstName: User's first name
  * lastName: User's Last Name
  * isOwner: true if this user should have owner access to the org. False if they should not. Omit this attribute to handle authorization within Insights
  * teams: A list of teams to grant the user access to. Defaults to view access to each team but an additional role can be specified as `$team/$role`

Your identity provider should then provide a URL to retrieve SAML metadata,
which contains a public key that can be shared with Insights.

Some SAML providers, including Google, do not yet support dynamic SAML metadata.
In this case, you'll need to upload the metadata to a public
URL (e.g. a public GitHub repository) where Insights can pull from.
[Learn more](https://en.wikipedia.org/wiki/SAML_metadata#Metadata-driven_interoperability)

### Example metadata
Your metadata should look something like this:
```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="https://accounts.google.com/o/saml2?idpid=C0420sfkv" validUntil="2024-03-10T21:16:30.000Z">
  <md:IDPSSODescriptor WantAuthnRequestsSigned="false" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <md:KeyDescriptor use="signing">
      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
        <ds:X509Data>
          <ds:X509Certificate>MIIDdDCCAlygAwI.../4sHx/F4XI8vO+qD+i3zR</ds:X509Certificate>
        </ds:X509Data>
      </ds:KeyInfo>
    </md:KeyDescriptor>
    <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat>
    <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://accounts.google.com/o/saml2/idp?idpid=C0420sfkv"/>
    <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://accounts.google.com/o/saml2/idp?idpid=C0420sfkv"/>
  </md:IDPSSODescriptor>
</md:EntityDescriptor>
```

### Example Attributes
```xml
<samlp:Response xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" ID="_8e8dc5f69a98cc4c1ff3427e5ce34606fd672f91e6" Version="2.0" IssueInstant="2014-07-17T01:01:48Z" Destination="http://sp.example.com/demo1/index.php?acs" InResponseTo="ONELOGIN_4fee3b046395c4e751011e97f8900b5273d56685">
  <saml:Assertion xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" ID="_d71a3a8e9fcc45c9e9d248ef7049393fc8f04e5f75" Version="2.0" IssueInstant="2014-07-17T01:01:48Z">
    <saml:AttributeStatement>
      <saml:Attribute Name="uid" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
        <saml:AttributeValue xsi:type="xs:string">test</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="mail" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
        <saml:AttributeValue xsi:type="xs:string">test@example.com</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="eduPersonAffiliation" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
        <saml:AttributeValue xsi:type="xs:string">users</saml:AttributeValue>
        <saml:AttributeValue xsi:type="xs:string">examplerole1</saml:AttributeValue>
      </saml:Attribute>
    </saml:AttributeStatement>
  </saml:Assertion>
</samlp:Response>
```

## Insights Setup

The `https://insights.fairwinds.com/v0/organizations/$ORG_NAME/saml` endpoint can be used to save SAML settings.
You'll need to specify a URL containing your org's metadata (namely, a public key),
and a list of email domain names that are allowed to access your org.

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
