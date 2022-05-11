@app
enhance-dev

@static
fingerprint true
folder public

@http
get /

#Waitlist
get /waitlist 
post /email/interest/add
get /email/thank

#REPL
get /playground
post /playground
post /repl

#Docs
get /docs
get /docs/:lang/*
get /docs/*

get /testtag

@events
repl-secure-sandbox


@plugins
arc-plugin-oauth
plugin-importmap

@importmap
api './src/module/data/api.mjs'
worker './src/module/data/worker.mjs'
store './node_modules/@enhance/store/index.mjs'
codemirror './node_modules/@begin/codemirror/dist/index.js'
enhance  './node_modules/@enhance/ssr/index.mjs'
prism './node_modules/prismjs/prism.js'
beautify './node_modules/js-beautify/js/index.js'

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