# Email
Email can be sent via AWS SES, or by specifying your own SMTP options.

## SES

First, specify the `ses` strategy in _values.yaml_
```yaml
email:
  strategy: ses
```

Then you'll need to specify your base64-encoded AWS credentials, and add them to your
_secrets.yaml_:
```yaml
apiVersion: v1
data:
    aws_access_key_id: aGVsbG93b3JsZA==
    aws_secret_access_key: aGVsbG93b3JsZA==
kind: Secret
metadata:
    name: fwinsights-secrets
type: Opaque
```

Note that if you're using other AWS integrations (like S3 above) they will use the same AWS credentials.

## SMTP
You can follow
[these instructions](https://kinsta.com/knowledgebase/free-smtp-server/#step-2-send-mail-as-google-smtp)
for using a Gmail account with SMTP.

_values.yaml_
```yaml
email:
  strategy: smtp
  smtpHost: smtp.gmail.com
  smtpUsername: you@gmail.com
  smtpPort: "465"
```

You'll need to put the password in your _secrets.yaml_
```yaml
apiVersion: v1
data:
    smtp_password: aGVsbG93b3JsZA==
kind: Secret
metadata:
    name: fwinsights-secrets
type: Opaque
```

