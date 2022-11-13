---
title: Migrating to or from Architect
links:
  - "arc.codes": https://arc.codes
---

Enhance uses [Architect](https://arc.codes) under the hood for local development and deployment. It is possible to migrate between a typical Architect project structure and the Enhance file based routing. It is also possible to mix the two approaches together in the same app. They are incrementally adoptable in both directions.

## How are they different
Enhance uses file based routing so that a route handler responds based on its file name and the folder it is in. Architect apps use the .arc manifest folder to specify the connection between route and handler.

Enhance project routes are in effect an Architect route handler with the data API and HTML response split into two files. Enhance also includes the Enhance SSR renderer for expanding Custom Elements on the server.

## Shared code (shared, views, models, and app)
If you are familiar with Architect apps they use the convention of a `src/views` and `src/shared` folder to share code between handlers. View code is available only to `GET` routes and shared is available to all handlers. Enhance renames these folders so that views becomes `/app` and shared becomes `/models`.



## Convert routes from Architect and Enhance
An Architect route is defined in the `app.arc` manifest.

<doc-code filename="app.arc">

```arc
@app
myapp

@http
get /notes
```
</doc-code>

A typical handler for this route looks like the following. By convention it is located at `src/http/get-notes/index.mjs`.

<doc-code filename="src/http/get-notes/index.mjs">

```javascript
// Architect route handler
import arc from '@architect/functions'
import enhance from '@enhance/enhance-ssr'
import notesPage from './notes-page.mjs'

async function notes(req) {
  const data = { note: "A note" }
  const html = enhance({
    initialState:data,
    elements:{'notes-page':notesPage}
  })

  return {
    html: html`<notes-page>${data.note}</notes-page>`
  }
}

export const handler = arc.http.async(notes)
```
</doc-code>

This example shows Enhance SSR explicitly added to the Architect handler.

Enhance uses the filename and folder location to match the handler to the route. It also splits the data wrangling into an `app/api` folder tree as shown below. This is roughly equivalent to the first part of the Architect handler shown above.

<doc-code filename="app/api/notes.mjs">

```javascript
export default function get(req) {
  const data = { note: "A note" }

  return {
    json: data
  }
}
```
</doc-code>

The final step of rendering the view is split into the `/app/pages` folder. These should be pure functions that can receive data from the API route and render that using Enhance SSR. The Enhance boilerplate shown in the Architect handler is hidden. Custom Elements to be used in your HTML are placed in `/app/elements` folder.

<doc-code filename="app/pages/notes.mjs">

```javascript
export default function Notes({ html, state }) {
  const { store } = state
  const { note='' } = store

  return html`<notes-page>${note}</notes-page>`
}
```
</doc-code>

## Full Migration Architect to Enhance
This approach is the fastest way to convert a full Architect App to an Enhance App. This can result in data loss and outages so take care validating the outcome before serving production workloads. And as always, backup any data you cannot afford to lose.

1. Set `autocreate` to false. As you move and combine or break up handlers it is common to remove the handler and accidentally leave the `config` line in the app.arc manifest. This will create a boilerplate handler if `autocreate` is set to true.

<doc-code filename="prefs.arc" highlight="2-add">

```arc
@create
autocreate false
```
</doc-code>

2. If Begin Data is used the table definition should be removed before the Enhance plugin is added. Begin data is included with Enhance and defining these tables in two places can cause problems. This step will result in the loss of all database. If the app has previously been deployed it should be redeployed at this point so that the changes will be pushed up to the cloud.

<doc-code filename="app.arc" highlight="8:12-delete">

```arc
@app
myapp

@http
get /notes
get /books

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
```
</doc-code>

3. Install the Enhance plugin: `npm i @enhance/arc-plugin-enhance`
4. Add the plugin to enhance.

<doc-code filename="app.arc" highlight="4:5-add">

```arc
@app
myapp

@plugins
enhance/arc-plugin-enhance

@http
get /notes
get /books
```
</doc-code>

5. Move each handler into the file base routing `app/api` and `app/pages` folders and then remove the corresponding route definition in the arc file.

A route that is defined in both the @http pragma and the file based routing will be handled by the @http handler. Do not remove all @http routes until after the plugin has been added. This could result in the address for the deployed app changing which would break the DNS settings for the app.

<doc-code filename="app.arc" highlight="7:9-delete">

```arc
@app
myapp

@plugins
enhance/arc-plugin-enhance

@http
get /notes
get /books
```
</doc-code>


## Caveats

- Enhance takes over the root catchall. Enhance uses `get /*` for its file based routing. If you combine both Architect routes with Enhance routes you cannot define a new root catchall in the .arc manifest or none of the Enhance routes will work.
- If you remove all @http routes before adding the enhance plugin the app DNS address will be released and DNS setting will need to be updated.
- Begin data is included in the Enhance plugin. It may cause problems and potential data loss if the enhance plugin is added to an app that is already using begin data. Backup all data to avoid critical data loss.

## Which is better?

There are reasons to choose either. There is no need to convert or transition a working app from one to the other. Both approaches will be maintained and updated moving forward. That being said many developers will likely find it extremely fast and convenient to start a greenfield project with Enhances file based routing.

If you have an existing app that you want to use Enhances SSR with it you can add the enhance-ssr package inside any route handler.

Even if you start with Enhances project structure to take advantage of many of the DX improvements as your app grows there will likely come a time when one route grows large or needs to be customized in some way. At that point the best option is to create an Architect style handler for just that route out.

