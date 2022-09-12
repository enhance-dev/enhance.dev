@app
enhance-dev

@http
#Custom Routes not in api or pages
/docs/* #Catchall for docs
  method get
  src custom-routes/get-docs-catchall

@plugins
enhance/arc-plugin-enhance
@enhance-styles
filename css/styles.css
config css-config.json

@aws
runtime nodejs16.x
architecture arm64
region us-west-2
profile smallwins
