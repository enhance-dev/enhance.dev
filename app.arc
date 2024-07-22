@app
enhance-dev

@static
fingerprint true
prune true

@plugins
architect/plugin-bundles
enhance/arc-image-plugin
enhance/arc-plugin-enhance
enhance/arc-plugin-styles
create-post-metadata
create-series-metadata
create-rss-feed

@enhance-styles
filename css/styles.css
config styleguide.json

@bundles
mux-player 'node_modules/@mux/mux-player'
docsearch-js 'node_modules/@docsearch/js'
docsearch-css 'node_modules/@docsearch/css/dist/style.css'

@aws
runtime nodejs20.x
architecture arm64
region us-west-2
profile smallwins
