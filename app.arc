@app
enhance-dev

@plugins
enhance/arc-plugin-enhance

@enhance-styles
filename css/styles.css
config css-config.json

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
