@app
enhance-dev

@static
fingerprint true
folder public

@http
get /

# Docs
get /docs/*
get /docs # redirects to /docs/

# Waitlist
get /waitlist
post /email/interest/add
get /email/thank

# Tutorial
get /tutorial/*
post /tutorial
post /tutorialrepl

# REPL
get /playground
post /playground
post /repl

get /testtag

@events
repl-secure-sandbox

@plugins
enhance/arc-plugin-styles
arc-plugin-oauth
architect/plugin-bundles

@enhance-styles
filename css/styles.css
config css-config.json

@bundles
api './src/module/data/api.mjs'
worker './src/module/data/worker.mjs'
store './node_modules/@enhance/store/index.mjs'
codemirror './node_modules/@begin/codemirror/dist/index.js'
enhance  './node_modules/@enhance/ssr/index.mjs'
beautify './node_modules/js-beautify/js/index.js'
transform './node_modules/@enhance/enhance-style-transform/src/style-transform.mjs'
hljs './node_modules/highlight.js/lib/core.js'
hljsXML './node_modules/highlight.js/lib/languages/xml.js'

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
