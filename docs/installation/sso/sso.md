---
meta:
  - name: description
    content: "Fairwinds Insights | Documentation: How to setup Single Sign-On (SSO)"
---
# Setup
Fairwinds Insights supports Single Sign-On (SSO) via a SAML identity provider.

## Identity Provider
* ACS URL: `https://insights.fairwinds.com/v0/organizations/$ORG_NAME/auth/saml`
* Entity ID: `fairwinds-insights`
* Name ID: Email Address
* Attributes:
  * firstName: User's first name
  * lastName: User's last name
  * isOwner: `true` if this user should have `Owner` access to the organization. `false` if they should not. Omit this attribute to handle authorization within Insights
  * teams: A list of teams to grant the user access to. Defaults to `view` access to each team but an additional role can be specified as `<team>/<role>`

Your identity provider should then provide a URL to retrieve SAML metadata
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
      <saml:Attribute Name="firstName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
        <saml:AttributeValue xsi:type="xs:string">John</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="lastName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
        <saml:AttributeValue xsi:type="xs:string">Doe</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="isOwner" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
        <saml:AttributeValue xsi:type="xs:string">true</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="teams" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
        <saml:AttributeValue xsi:type="xs:string">Full Access/viewer</saml:AttributeValue>
        <saml:AttributeValue xsi:type="xs:string">API Team/admin</saml:AttributeValue>
      </saml:Attribute>
    </saml:AttributeStatement>
  </saml:Assertion>
</samlp:Response>
```

## Insights Setup
Before enabling SSO, save your organization's `admin` token from the Insights `Settings > Tokens` page somewhere safe as a
misconfiguration could prevent you from logging into Insights. If you get locked out, get in touch with the
Fairwinds team and we'll fix it.

1. Go to the `Settings > SSO` page on Insights
2. For the `Metadata URL` field, specify a URL containing your organization's metadata (namely a public key)
3. For the `Email Domain` field, specify a list of email domain names that are allowed to access your organization
4. Click `Update SSO`

### Verifying SSO Setup
Once your settings have been saved:
1. Log out of Insights 
2. On the `Log In` screen, click on the `Log in with SSO` option at the bottom

If the `Log in with SSO` button does not show up, you can log in via SSO at:
`https://insights.fairwinds.com/v0/organizations/$ORG_NAME/auth/saml`

### SSO Strict Mode
You can enable SSO strict mode, forcing your users to use SSO in order to log in. Before enabling SSO strict mode,
verify the SSO setup is working and then:
1. Go to the `Settings > SSO` page on Insights
2. Click the `Enable strict provisioning` checkbox
3. Click `Update SSO`
