@app
enhance-dev

@static
fingerprint true
folder public

@http
get /  #Landing page
get /components/* #Fingerprinted Modules and components
post /email/interest/add
get /email/thank

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

@aws
runtime nodejs14.x
region us-west-2
profile smallwins