@app
enhance-dev

@static
fingerprint true
folder public

@http
get /
get /waitlist 
post /email/interest/add
get /email/thank

@plugins
arc-plugin-oauth
plugin-importmap

@importmap
api './src/components/data/api.mjs'
worker './src/components/data/worker.mjs'
socket './src/components/data/socket.mjs'
store './node_modules/@enhance/store/index.mjs'
#codemirror 
#enhance 
#parse5 
#prism
#beautify_js
#beautify_html
#beautify_css

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