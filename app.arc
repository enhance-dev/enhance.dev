@app
enhance-dev

@http
/discord 
  method get
  src custom-routes/get-discord

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
