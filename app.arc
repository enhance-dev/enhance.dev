@app
enhance-dev

@static
fingerprint true

@plugins
enhance/arc-plugin-enhance

@enhance-styles
filename css/styles.css
config styleguide.json

@bundles
mux-player 'node_modules/@mux/mux-player'
docsearch-js 'node_modules/@docsearch/js'
docsearch-css 'node_modules/@docsearch/css/dist/style.css'

@aws
runtime nodejs16.x
architecture arm64
region us-west-2
profile smallwins
