@app
enhance-dev

@static
fingerprint true
folder public

@http
get /  #Landing page
get /components/* #Fingerprinted Modules and components

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

@aws
runtime nodejs14.x
region us-east-1
profile enhance-dev