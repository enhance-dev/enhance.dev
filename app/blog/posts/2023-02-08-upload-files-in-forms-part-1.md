---
title: "Uploading files with HTML forms: Part 1"
image: "/_public/blog/post-assets/taking-photo.jpeg"
image_alt: Taking a Photo
image_site: Unsplash
image_site_url: https://unsplash.com/s/photos/taking-photo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
photographer: Kenny Eliason
photographer_url: https://unsplash.com/@neonbrand?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
category: enhance, webdev, webcomponents
description: "Sending files and images from the browser to the server is less common but still critical for many useful applications."
author: 'Ryan Bethel'
avatar: 'ryanbethel.png'
twitter: "ryanbethel"
mastodon: "@ryanbethel@indieweb.social"
published: "February 8, 2023"
---

Most websites send images, data and files from the server to the user's browser.
Sending files and images from the browser to the server is less common but still critical for many useful applications.

In this post, we will cover what you need to know to upload images to the server from the browser using an HTML first approach.
HTML first to me means: Make it work with HTML (and CSS) and then make it better with JavaScript.
This is similar to what people used to call [Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) although most people confuse that for [Graceful Degradation](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation) which is completely different.
So we will start with the simplest approach that could possibly work and then tackle some of the most common problems to make it more robust.
This post will be in two parts.
The first covers how to make it work without client side JavaScript.
The second [part](/blog/posts/2023-02-17-upload-files-in-forms-part-2) will add improvements with some client side code.

Most of this will work for any website hosted anywhere.
Some of the details, specifically where and how to store and serve the images, is specific to hosting an [Enhance](enhance.dev) project on [Begin.com](/).

## Start with a real `<form>`
Building sites today many people skip right over platform features like HTML `<form>`s.
That is a mistake.
Forms are battle-tested, and if you are looking for the simplest thing that could possibly work you should not rebuild form handling from scratch with JavaScript and `fetch`.
The `<input type="file"/>` was added to HTML in the late 90s.
Adding this one tag to an HTML form will allow someone to pick a file from their computer or mobile device to upload.

To send that binary data for the file along with other form fields the encoding type must be set correctly with: `<form ...  enctype="multipart/form-data">`.

The example here demonstrates creating a user profile that includes first name, last name, and an uploaded profile picture.
The basic form is shown below.

<begin-code filename="app/pages/profiles/new.html">

```html
<h1>New Profile</h1>
<form action="/profiles/new" method="POST" enctype="multipart/form-data">
  <label>First Name
    <input type="text" name="firstname"/>
  </label>
  <label>Last Name
    <input type="text" name="lastname"/>
  </label>
  <label>Profile Picture
    <input type="file" name="picture"/>
  </label>
  <button type="submit">Save</button>
</form>
```

</begin-code>


With this we have a working solution. Now we need a place for those files to go.


## Decoding the multipart form-data

The form data and file will arrive at the server encoded in a combined payload.
We now need to decode that payload.
There are many parsers that will handle multipart data for node.
We will use the `lambda-multipart-parser` that is specifically for use in AWS Lambda.


```bash
npm install lambda-multipart-parser
```


Architect does some preprocessing of the request body, but in this case, the multipart parser expects to receive the raw body.
When you pass the request to the parser, you can substitute `rawBody` for body as shown below in line 5.

<begin-code filename="app/api/profiles/new.mjs">

```javascript
import multipart from 'lambda-multipart-parser'

export async function post (req) {
  // the body property needs to be swapped out for rawBody
  const form = await multipart.parse({...req, body:req.rawBody})
  const { firstName, lastName } = form
  const buffer = form.files[0].content

  // Do something with it
  return { /* redirect */  }
}
```

</begin-code>

After decoding the content property holds the file itself as a buffer (an in memory binary chunk of data that represents a file).


## Storing Files on the Server

This section is specific to hosting an [Enhance](enhance.dev) project on [Begin.com](/).
This will also work for [Architect](arc.codes) to deploy directly to AWS.
[Architect](arc.codes) and [Begin.com](/) provision an S3 bucket for each project deployed.
This is where static assets like CSS files and images placed in the `/public` folder of the project end up.
These assets are then served with a special URL directly from this bucket.
We will store the uploaded images directly in this bucket when received without using the public folder locally.

The code below identifies the S3 bucket with `process.env.ARC_STATIC_BUCKET`.
It writes the image using the S3 client in the AWS SDK.
For local development, it writes the file to a temporary folder instead.
The code for local development uses dynamic imports so that importing these dependencies doesn’t slow down the project once deployed.

Begin-data is a thin wrapper for DynamoDB.
We will use it (`@begin/data`) as a database to store the other form data.
We generate a UUID as a random filename for the image and then put the reference to that filename in the database as well.

<begin-code filename="app/api/profiles/new.mjs">

```javascript
import multipart from 'lambda-multipart-parser'
import crypto from 'crypto'
import data from '@begin/data'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const env = process.env.ARC_ENV
const isLocal = env === 'testing'
const staticDir = process.env.ARC_STATIC_BUCKET
const imageFolder = '.uploaded-images'
const REGION = process.env.AWS_REGION

export async function post (req) {
  // the body property needs to be swapped out for rawBody
  const parsedForm = await multipart.parse({...req, body:req.rawBody})
  const { firstName, lastName } = parsedForm
  const profilePicture = parsedForm.files[0].content

  // Save the image to S3 bucket (or temp folder for local dev)
  const filename = crypto.randomUUID()
  if (isLocal) {
    const {writeFileSync,mkdirSync} = await import('fs')
    const {join} = await import('path')
    const {default:url} = await import('url')
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const imageDir = join(__dirname,'..','..','..',imageFolder)
    try { mkdirSync(imageDir) } catch(e){ }
    writeFileSync(join(imageDir,filename),profilePicture)
  }
  else {
    const client = new S3Client({ region: REGION });
    const command = new PutObjectCommand({ Bucket:staticDir,
      Key:`${imageFolder}/${filename}`, Body: profilePicture})
    await client.send(command)
  }
  await data.set({table:'profile', firstName, lastName, filename)
  return {
    location: '/profiles'
  }
}

```

</begin-code>

To avoid the possibility of uploaded files being accidentally pruned the following line should be added to the `.arc` file.

<begin-code filename=".arc">

```arc
@static
ignore .uploaded-images
```

Again this approach is specific to [Architect](arc.codes) and [Begin.com](/) projects.
It works even with free accounts since the S3 bucket for static asserts is available to any project.


## Caveats

Using this S3 bucket for uploaded images comes with a few caveats.
It is configured as a public bucket since its primary purpose is to serve public assets.
This makes it a good choice for something like profile pictures that are shown as the public part of a user's account.
Using a random filename (UUID, for instance) gives only minimal security through obscurity for these files.
But it is safest to assume that anything stored here could be accessed.
Again good for public profile pictures and bad for tax documents.

There are many other ways to store files on the backend.
With [Architect](arc.codes) by itself there is a plugin available to provision a [private bucket](https://www.npmjs.com/package/@architect/plugin-storage-private) that can put these files behind whatever authentication you use for the rest of your app.
The private bucket plugin is not currently supported on [begin.com](/) but stay tuned.


## Serving Uploaded Images

Architect has built-in handlers for serving assets in the public S3 bucket, but since we are using this bucket indirectly, we need to build a handler to serve them correctly.
First, we will host this API handler in `/app/api/image/$image.mjs`.
With Enhance's file-based routing, any request to `/image/my-picture.jpeg` will access these images with the filename as the last part of the path.
The `$image.mjs` is a catchall for that route.

This handler uses the `@architect/asap` package to serve the images from the S3 bucket.
It modifies the request path to point to the correct path inside the bucket.
This package helps set headers properly based on content type etc. For local development, it serves files from the same temporary folder we used in the other handler.
Again the local development dependencies are only imported when it runs locally.
One crucial detail is that here the `cache-control` header is set to the max length, which effectively tells the browser or CDN these files can be cached for a long time.
This is appropriate because we stored them with a UUID, so every one will be unique even if the same image is modified by the user and uploaded again.
If this is not true for your implementation (i.e. if users can edit the images and store them again with the same name) this cache setting can be changed.

<begin-code filename="app/api/image/$image.mjs">

```javascript
import asap from '@architect/asap'
const env = process.env.ARC_ENV
const isLocal = env === 'testing'

function escapeRegex (string) { return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }

const uploadFolderName = '.uploaded-images'
const pathPrefix = '/image' // partial path to remove

export async function get (req) {
  try {
    if (isLocal){
      const {join} = await import('path')
      const {readFileSync} = await import('fs')
      const {default:url} = await import('url')
      const {fileTypeFromBuffer} = await import('file-type')
      const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
      const rootDir = join(__dirname,'..','..','..')
      const imageDir = join(rootDir,uploadFolderName)
      const imageFilename = req.params.image

      const buffer = readFileSync(join(imageDir,imageFilename))
      const mime = fileTypeFromBuffer(buffer)
      return { statusCode: 200,
        headers: {
         'cache-control': 'max-age=31536000',
         'content-type': `${mime}; charset=utf8`,
        },
        isBase64Encoded: true,
        body: buffer.toString('base64')
      }

    }
    else {
      const config = {
        assets: {},
        cacheControl: 'max-age=31536000',
      }
      req.rawPath = req.rawPath.replace(escapeRegex(pathPrefix), uploadFolderName)
      return asap(config)(req)
    }
  }
  catch(e) {
    return {
      statusCode:404
    }
  }

}
```

</begin-code>

## Back button confusion

The browser's security model has safeguards around accessing files in the user's disk.
This can result in an unexpected behavior if you are used to dealing with forms in other contexts.
If you fill out a form, navigate away from the page, and then use the back button to return to that page, the form state that you left is usually restored.
But with files selected from the file system, this is not true.
The filename will sometimes still be populated, giving the impression that a file is selected, but if you submit the form, the actual file is null.
If you set `autocomplete="off"` on that input the filename field will not be populated when you hit back, which makes it more apparent that no file is selected.
Note that the `bfcache` (back/forward cache) can interfere with this `autocomplete` setting.
This fix works for Enhance/Begin/Architect projects because they set the `Cache-Control:no-store` header for HTML content which blocks the `bfcache`.



<begin-code filename="app/pages/profiles/new.html">

```html
<h1>New Profile</h1>
<form action="/profiles/new" method="POST" enctype="multipart/form-data">
  <label>First Name
    <input type="text" name="firstname"/>
  </label>
  <label>Last Name
    <input type="text" name="lastname"/>
  </label>
  <label>Profile Picture
    <input type="file" autocomplete="off" name="picture" />
  </label>
  <button type="submit">Save</button>
</form>
```

</begin-code>


## Preprocessing Images

Processing images before storing them is not strictly necessary, but almost.
You can (and probably should) avoid that complexity initially for a small app or website until you need it.
But you don’t have to become Facebook sized before it becomes a problem worth solving.
The real problem is not storing the images because disk space is cheap.
But if every user who loads that profile thumbnail has to download the 5 MB image, that is a much bigger problem.
With smartphone cameras increasing in resolution every year, raw images are enormous relative to what is needed in most web applications.

The easiest way to solve this problem is to process images on the server to scale them down before storing them.
This is also the only solution that does not require JavaScript on the client.
In [Part 2](/blog/posts/2023-02-17-upload-files-in-forms-part-2) of this post we will add a client side solution that does not add any dependencies using a `<canvas>` element.

For this example, we will scale the received image down to 350 pixels max in height or width.
And we will use the `wasm-vips` library to do it.
The library is web assembly bindings for the Vips image library.
Because it is web assembly it can be used in the AWS lambda node runtime without needing a custom native binary like some other image tools (i.e. ImageMagick).

The code below adds the `wasm-vips` library and a resize function that scales the image down before storing it.


<begin-code filename="app/api/profiles/new.mjs">

```javascript
import multipart from 'lambda-multipart-parser'
import crypto from 'crypto'
import data from '@begin/data'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import Vips from 'wasm-vips'

const env = process.env.ARC_ENV
const isLocal = env === 'testing'
const staticDir = process.env.ARC_STATIC_BUCKET
const imageFolder = '.uploaded-images'
const REGION = process.env.AWS_REGION
async function resize(buffer, size){
  const vips = await Vips()
  const image = vips.Image.newFromBuffer(buffer)
  const heightIn = image.height
  const widthIn = image.width
  const output = image.resize(Math.min(size/heightIn,size/widthIn))
  return output.writeToBuffer('.jpeg')
}

export async function post (req) {
  // the body property needs to be swapped out for rawBody
  const form = await multipart.parse({...req, body:req.rawBody})
  const { firstName, lastName } = form
  const buffer = form.files[0].content

  // Save the image to S3 bucket (or temp folder for local dev)
  const filename = crypto.randomUUID()
  if (isLocal) {
    const {writeFileSync,mkdirSync} = await import('fs')
    const {join} = await import('path')
    const {default:url} = await import('url')
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const imageDir = join(__dirname,'..','..','..',imageFolder)
    try {
      mkdirSync(imageDir)
    } catch(e){ }
    writeFileSync(join(imageDir,filename),profilePicture)
  }
  else {
    const client = new S3Client({ region: REGION });
    const command = new PutObjectCommand({ Bucket:staticDir,
      Key:`${imageFolder}/${filename}`,
      Body: await resize(pictureBuffer, 350)})
    await client.send(command)
  }
  await data.set({table:'profile', firstName, lastName, filename)
  return {
    location: '/profiles'
  }
}
```

</begin-code>

As mentioned this is the simplest solution and it requires no changes to the HTML.

## Avoiding a Double Submit

HTML forms typically send data to the server as a POST request.
The browser can send multiple POST requests before a response is received.
In this example, that could mean two identical profiles are created in the database, and two copies of the same image are stored in the S3 bucket.
If your server responds fast enough, it minimizes the time for these multiple erroneous submissions.
The double-click double submit is the hardest to catch because it can be very fast.
Users often double-click the submit because they are conditioned to double-click in other contexts.

This problem is more pronounced because the time to upload a large file and process it on the server can be multiple seconds.
During this time, the user might have no indication of what is happening and a very natural response is to assume the message was not sent and to click again until something happens.

If users edit a record, a double submit could be detected by comparing the IDs.
When creating a new record, you don’t have an ID to compare.

The easiest solution to the double submit is to disable the submit button after it’s clicked once.
But we need JavaScript to do that so we will wait for [Part 2](/blog/posts/2023-02-17-upload-files-in-forms-part-2) to do that.


## Using a Submit Token to avoid Double Submit

The only real way to avoid the double submit without JavaScript is to have the server handle it.
The key is to detect if one client tries to make multiple POSTs in rapid succession.
Enhance, and Architect have built-in sessions that make this easier.
There is no real magic behind sessions.
It's done by setting an HttpOnly cookie when a response is sent and detecting that cookie when a request is received.
For details, check out this [Brian Leroux post](/blog/posts/2023-02-03-bulletproof-sessions-with-httponly-cookies).

We will create a unique submit token for every GET request to the `/profiles/new` route.
Then we check that token for every POST request received.
If multiple posts are made with the same token, they can be assumed to be duplicates.
This is a simple concept, but the bookkeeping to make it happen gets a little tricky.

The double click is the worst-case scenario to catch since the two requests could be received with as little as 100 ms delay.
This is fast enough that the first request will probably not be completed before a second is received by another lambda.
The process is:

1. Set unique submit token in the session on GET requests to `/profiles/new`
2. For each POST to `/profiles/new` check token table to see if the submit token has been used
3. If the token has been used:
    - Redirect (while keeping that same submit token on the session) to the `/profiles` list page.
    - At the `/profiles` page check the profiles to see if the profile with that submit token has been entered.
    - If it has been received, respond with the list of profiles OR if not wait for a short delay (~2 sec), check again and return the list of profiles.
4. If the token has not been used:
    - Record that token in the tokens table so that it can’t be used again.
    - Record the new profile in the database and save the file to S3.
    - Clear the submit token and forward the response to `/profiles`
5. Also note that when users hit the back button they make a new GET request and new submit token

Below the API handler for the GET and POST requests is added with the submit token handling.

<begin-code filename="app/api/profiles/new.mjs">

```javascript
import multipart from 'lambda-multipart-parser'
import crypto from 'crypto'
import Vips from 'wasm-vips'
import data from '@begin/data'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
const env = process.env.ARC_ENV
const isLocal = env === 'testing'
const staticDir = process.env.ARC_STATIC_BUCKET
const imageFolder = '.uploaded-images'
const REGION = process.env.AWS_REGION


export async function get (req) {
  const newToken = crypto.randomUUID()
  return {
    session:{...req.session, profileSubmitToken:newToken},
  }
}

export async function post (req) {
  const {profileSubmitToken, ...newSession} = req.session
  const submitting = await data.get({table:'token', key:profileSubmitToken})
  if (submitting) {
    return {
      // session will continue unless reset. If reset the submit token needs to be added to pass on
      // session:{...req.session, profileSubmitToken},
      location: '/profiles'
    }
  }

  const ttl = (Date.now() / 1000) + (60 * 60 * 24 * 1) // One day
  await data.set({table:'token', key:profileSubmitToken, ttl})

  const parsedForm = await multipart.parse({...req, body:req.rawBody})

  const firstname = parsedForm?.firstname
  const lastname = parsedForm?.lastname

  // Get uploaded image
  const unprocessed = parsedForm.files?.find(file=>file.fieldname==='picture')
  const profilePicture = unprocessed.content

  // Save the image to S3 bucket (or temp folder for local dev)
  const filename = crypto.randomUUID()
  if (isLocal) {
    const {writeFileSync,mkdirSync} = await import('fs')
    const {join} = await import('path')
    const {default:url} = await import('url')
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const imageDir = join(__dirname,'..','..','..',imageFolder)
    try {
      mkdirSync(imageDir)
    } catch(e){ }
    writeFileSync(join(imageDir,filename),profilePicture)
  }
  else {
    const client = new S3Client({ region: REGION });
    const command = new PutObjectCommand({ Bucket:staticDir, Key:`${imageFolder}/${filename}`, Body: profilePicture})
    await client.send(command)
  }

  // Store profile and redirect to profiles list view
  await data.set({table:'profile', firstname, lastname, filename, submitToken:profileSubmitToken})
  return {
    session: {...newSession}, // submit token is removed before continuing
    location: '/profiles'
  }
}

async function resize(buffer, size){
  const vips = await Vips()
  const image = vips.Image.newFromBuffer(buffer)
  const heightIn = image.height
  const widthIn = image.width
  const output = image.resize(Math.min(size/heightIn,size/widthIn))
  return output.writeToBuffer('.jpeg')
}
```

</begin-code>

Below is the API for the `/profiles` route checking for the submit token.

<begin-code filename="app/api/profiles.mjs">

```javascript
import data from '@begin/data'

export async function get (req) {
  const {profileSubmitToken, ...newSession} = req.session
  let profiles = await data.get({table:'profile'})
  if (profileSubmitToken) {
    const newProfile = profiles.find(p=>p.submitToken===profileSubmitToken)
    if (!newProfile) {
      await new Promise(resolve => setTimeout(resolve, 2000)) // wait 2sec
      profiles = await data.get({table:'profile'})
    }
  }
  return {
    session:newSession,
    json:{profiles}
  }
}
```

</begin-code>



## Summary

Uploading files from a website to a server can be done simply with an input of `type="file"`.
If you are building an MVP just start there and don’t over complicate it.
You can incrementally solve problems as they arise including scaling images, and avoiding double submits, etc.
Validation is a critical feature of well built forms.
But it is not unique to upload forms so we did not cover it here.
Check out Simon MacDonald’s excellent post on [form submission problems](/blog/posts/2022-08-25-progressively-enhancing-form-submissions-with-web-components) for more on that.
The full example repository with the code for the example in this post can be found on [GitHub](https://github.com/ryanbethel/thumbnail-upload-example).
Try out [enhance.dev](https://enhance.dev/) for your next project.
It has pretty much everything you need to build a functional web app.

[Part 2](/blog/posts/2023-02-17-upload-files-in-forms-part-2) of this post will cover improvements that can be made with a little client side JavaScript.
