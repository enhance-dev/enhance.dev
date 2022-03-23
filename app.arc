@app
enhance-dev

@static
fingerprint true
folder public

@http
get /
get /waitlist 
get /components/* #Fingerprinted Modules and components
post /email/interest/add
get /email/thank

@plugins
arc-plugin-oauth

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
runtime nodejs14.x
region us-west-2
profile smallwins