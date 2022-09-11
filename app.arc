@app
enhance-dev

@static
fingerprint true
folder public

@http
get /
get /*

# Docs
get /docs/*
get /docs # redirects to /docs/

# Waitlist
get /waitlist
post /email/interest/add
get /email/thank

get /discord

@plugins
enhance/arc-plugin-styles
arc-plugin-oauth

@enhance-styles
filename css/styles.css
config css-config.json

@oauth
use-mock true
allow-list allow.mjs
un-auth-redirect /waitlist

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

@aws
runtime nodejs16.x
architecture arm64
region us-west-2
profile smallwins
