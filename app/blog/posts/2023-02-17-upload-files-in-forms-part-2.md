---
title: "Uploading files with HTML forms: Part 2"
image: "/_public/blog/post-assets/taking-photo-2.jpeg"
image_alt: Taking a Photo
image_site: Unsplash
image_site_url: https://unsplash.com/s/photos/taking-photo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
photographer: Dominik Dancs
photographer_url: "https://unsplash.com/es/@dodancs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
category: enhance, webdev, webcomponents
description: "Uploading files from the browser. Part 2 shows enhancements with a small amount of client side JavaScript."
author: "Ryan Bethel"
avatar: "ryanbethel.png"
twitter: "ryanbethel"
mastodon: "@ryanbethel@indieweb.social"
published: "February 17, 2023"
---

In [Part 1](/blog/posts/2023-02-08-upload-files-in-forms-part-1) of this post we built a form and backend code to accept files and images uploaded from a browser.
If you missed that post you should read it first and then come back here.
We built it with an HTML first approach so that it will work with no client side JavaScript.
Here in Part 2 we will add some improvement using a little JavaScript.

## Preprocessing image on the client using `<canvas>`

In [Part 1](/blog/posts/2023-02-08-upload-files-in-forms-part-1) images were reduced on the server so that large images did not waste space, but more importantly so that we did not have to serve those large images back as part of displaying the user profile.

The problem with the server side processing for scaling the image is that you have already sent a larger than necessary image to the server to throw away most of those bits.
It would be better to only send what you need.
Another problem is that the AWS lambda request has a payload limit of 6 MB maximum.
Large images can easily exceed this, and the request will fail before your server sees it.
It also adds a significant delay to the response when submitting to wait for the server to process it.

A better solution is resizing it in the browser before sending it over the network.
So with our non-JavaScript solution in place, we will add our first client side JavaScript enhancement.

There are many ways to scale an image in a browser. One good solution might be to send the `wasm-vips` library to the client and use it inside a worker to run the same scaling in the browser.
The pros are the symmetry between the client side result or the server side result.
One downside is the extra dependency and having to ship that code for the library to the client in the first place.

In this example, we will use the browser itself, specifically the `<canvas>` element to do the image scaling.
With no added dependencies!
You can read more about using the canvas element for this purpose here ([https://imagekit.io/blog/how-to-resize-image-in-javascript/](https://imagekit.io/blog/how-to-resize-image-in-javascript/)).

The code here is encapsulated in a custom element using an [Enhance single file component](https://enhance.dev/docs/learn/concepts/single-file-components).
First, we add a hidden image tag at the end of the form that will eventually be a preview of the scaled image.
The code at the bottom has a resize method that uses the FileReader API to read the image the user selects from disk and assign it as the src of an image we created.
When that image is loaded, we define the scaling parameters and then redraw the image in a canvas element with the new size.
We then create a data URL with that scaled image.
And finally, we assign that data URL to our preview image and change it from hidden to visible.

<begin-code filename="/app/pages/profiles/new.mjs">

```javascript

export default function Html ({ html, state }) {
  return html`
    <main class="container">
      <article>
      <h1>New Profile</h1>
      <form action="/profiles/new" method="POST" enctype=multipart/form-data>
        <label>First Name
          <input type="text" name="firstname" />
        </label>
        <label>First Name
          <input type="text" name="lastname" />
        </label>
        <label>
          Profile Picture
          <input type="file" autocomplete="off" name="picture" />
        </label>
        <img class="hidden" id="profile-preview" alt="profile picture preview"/>
        <button type=submit >Save</button>
    </form>
      </article>
  </main>

  <script type=module >
    class PageProfilesNew extends HTMLElement {
      constructor() {
        super()
        this.form = this.querySelector('form')
        this.imageInput = this.querySelector('input[name=picture]')
        this.imagePreview = this.querySelector('#profile-preview')

        this.resize = this.resize.bind(this)
        this.dataURLtoBlob = this.dataURLtoBlob.bind(this)

        this.imageInput.addEventListener('change', (e)=>this.resize(e))
      }

      resize(e) {
        if (!e.target.files.length) return; // for input file null
        if (e.target.files) {
          let imageFile = e.target.files[0]
          const reader = new FileReader()
          reader.onload =  (e)=>{
            let image = document.createElement("img")
            image.onload = (event) => {

              const size = 350
              const width = image.width
              const height = image.height
              const widthScale = size/width
              const heightScale = size/height
              const outputScale = Math.min(widthScale,heightScale)
              const outWidth = outputScale*width
              const outHeight= outputScale*height

              const canvas = document.createElement("canvas")
              canvas.width = outWidth
              canvas.height = outHeight
              const context = canvas.getContext("2d")
              context.drawImage(image, 0, 0, outWidth, outHeight)

              const dataurl = canvas.toDataURL(imageFile.type)

              this.imagePreview.src = dataurl
              this.imagePreview.classList.remove("hidden")
            }
            image.src = e.target.result
          }
          reader.readAsDataURL(imageFile)
        }
      }
    }

    customElements.define("page-profiles-new", PageProfilesNew)
  </script>

  `
}
```

</begin-code>

We now have a scaled image created on the client that we can send to the server instead of the larger raw version of that image.


## To Fetch or Not to Fetch

The question is, now that we have a transformed image in the canvas, how should we send that image to the server.
There are two options, each with their own trade-offs.
We can stay in JavaScript and send the new file with a fetch request, or we can push the new image back into the `<form>` to be sent with the built-in form submission.

Fetch is probably the most common choice in this situation, so let's briefly cover how to do that.
The advantage is that we don’t have to push the new file back into the form's original form state (which is a little complicated).
The disadvantage is we have to pull the rest of the form data over into JavaScript and then handle the response, including error handling and redirect after success, with JavaScript.
The basic code for fetch submit is:


```javascript
const form = document.querySelector('form')
const formData = new FormData(form)

formData.set('picture', processedFile)

fetch('/profiles/new', {
  method: 'POST',
  body: formData,
})
```

Any error handling and redirect on success would then need to be added.

One important caveat is for this to work with multipart encoding, you **cannot set `Content-Type` headers for this fetch request ( [https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/](https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/))**.
Letting the browser set them automatically will work, but if you set them here, it will fail.

Our previous HTML and server solution allowed for handling errors on the server, setting session, and redirecting following the POST request.
With fetch, we have to replicate all that behavior in JavaScript.
For this reason, and because it is the less common approach that might be useful to demonstrate here, we will submit the form with HTML instead.

## Using JavaScript to populate a form `<input type=file/>`

You cannot programmatically add a file to an `<input>` from the user's disk because of the browser's security model.
But you can create a file in memory and use the browser's DataTransfer API to add that to the input.
This code is added below after the data URL (a data URL is a base 64 encoded string of binary data) is added to the preview image.

First, the data URL is converted back into a blob (a Binary Large Object) which is passed to the File constructor.
This file is then wrapped with the `DataTransfer` constructor and added to a new `<input type=file name=processed-picture/>`.
Now we need to set the original file input to null so we don’t send the original image when we submit.


<begin-code filename="/app/pages/profiles/new.mjs">

```javascript

export default function Html ({ html, state }) {
  return html`
    <main class="container">
      <article>
      <form action="/profiles/new" method="POST"
        enctype=multipart/form-data>
        <label>First Name
          <input type="text" name="firstname"/>
        </label>
        <label>First Name
          <input type="text" name="lastname"/>
        </label>
        <label>
          Profile Picture
          <input type="file" autocomplete="off" name="picture" />
        </label>
        <img class="hidden" id="profile-preview" alt="profile picture preview"/>
        <input type=file name="processed-picture" class="hidden"/>
        <button type="submit" >Save</button>
    </form>
      </article>
  </main>

  <script type="module">
    class PageProfilesNew extends HTMLElement {
      constructor() {
        super()
        this.form = this.querySelector('form')
        this.imageInput = this.querySelector('input[name=picture]')
        this.imagePreview = this.querySelector('#profile-preview')
        this.scaledImageInput = this.querySelector('input[name=processed-picture]')

        this.resize = this.resize.bind(this)
        this.dataURLtoBlob = this.dataURLtoBlob.bind(this)

        this.imageInput.addEventListener('change', (e)=>this.resize(e))
      }

      resize(e) {
        if (!e.target.files.length) return; // for when input type=file is set to null
        if (e.target.files) {
          let imageFile = e.target.files[0]
          const reader = new FileReader()
          reader.onload =  (e)=>{
            let image = document.createElement("img")
            image.onload = (event) => {

              const size = 350
              const width = image.width
              const height = image.height
              const widthScale = size/width
              const heightScale = size/height
              const outputScale = Math.min(widthScale,heightScale)
              const outWidth = outputScale*width
              const outHeight= outputScale*height

              const canvas = document.createElement("canvas")
              canvas.width = outWidth
              canvas.height = outHeight
              const context = canvas.getContext("2d")
              context.drawImage(image, 0, 0, outWidth, outHeight)

              const dataurl = canvas.toDataURL(imageFile.type)

              this.imagePreview.src = dataurl
              this.imagePreview.classList.remove("hidden")

              const fileName = 'scaled-image'
              const blob = this.dataURLtoBlob(dataurl)
              const file = new File([blob], fileName,
                {type:blob.type, lastModified:new Date().getTime()}, 'utf-8')
              const container = new DataTransfer()
              container.items.add(file)
              this.scaledImageInput.files = container.files
              this.imageInput.value = null
            }
            image.src = e.target.result
          }
          reader.readAsDataURL(imageFile)
        }
      }

      dataURLtoBlob(dataurl) {
        let dataUrlParts = dataurl.split(',')
        const mime = dataUrlParts[0].match(/:(.*?);/)[1]
        const binary = atob(dataUrlParts[1])
        let n = binary.length
        const binaryArray = new Uint8Array(n);
        while(n--){
          binaryArray[n] = binary.charCodeAt(n);
        }
        return new Blob([binaryArray], {type:mime});
      }
    }

    customElements.define("page-profiles-new", PageProfilesNew)
  </script>

  `
}

```

</begin-code>

Now we add logic to the server side handler so that if we send a processed image it doesn't get resized again on the server.


<begin-code filename="/app/api/profiles/new.mjs">

```javascript
...

const preprocessed = parsedForm.files?.find(file=>
  file.fieldname==='processed-picture')
const unprocessed = parsedForm.files?.find(file=>
  file.fieldname==='picture')

const picture = preprocessed || unprocessed
const pictureBuffer = picture.content
const profilePicture = preprocessed ? pictureBuffer : await resize(pictureBuffer, 350)

  ...
```
</begin-code>


## Avoiding a Double Submit

If a user accidentally clicks submit multiple times the browser will happily send multiple `POST`s.
This is the double submit problem we discussed in depth in [part 1](/blog/posts/2023-02-08-upload-files-in-forms-part-1).

We built a working solution without the need for client side JavaScript.
With just a sprinkle of JavaScript we can make it even better by making sure the extra `POST` is not sent rather than handling it after the fact.

To prevent a double submit we disable the submit button after it’s clicked.
We could also display a “submitting” message on the button or another visual indication for the user.

<begin-code filename="/app/pages/profiles/new.mjs">

```javascript
...
  <script type=module >
    class PageProfilesNew extends HTMLElement {
      constructor() {
        super()
        this.form = this.querySelector('form')
        this.submitButton = this.querySelector('button[type=submit]')
        this.tempDisableSubmit = this.tempDisableSubmit.bind(this)
        this.form.addEventListener('submit', this.tempDisableSubmit)
      }

      tempDisableSubmit() {
        this.submitButton.disabled = true
        setTimeout(() => {this.submitButton.disabled = false }, 5000)
      }

    }

    customElements.define("page-profiles-new", PageProfilesNew)
  </script>
...
```

</begin-code>

We add an event listener to the submit and call a `tempSubmitDisable()` method.
This method disables the submit button for 5 seconds.
The reason for the timer is in case the request does fail for some reason the user can try to submit again after a short delay.

This is a clean concise solution to the double submit problem, but it does require JavaScript.
My goal is for this example is an acceptable HTML first solution.
Avoiding a double submit is really a must have feature for a functional site so we will look for a reasonable solution without JavaScript.


## Summary

In [Part 1](/blog/posts/2023-02-08-upload-files-in-forms-part-1) of this series we covered the HTML first solution to uploading files.
In this we have made some small improvements with JavaScript.
The full example repository with the code in this post can be found here: [https://github.com/ryanbethel/thumbnail-upload-example](https://github.com/ryanbethel/thumbnail-upload-example).
Try out [enhance.dev](https://enhance.dev/) for your next project.
It has pretty much everything you need to build a functional web app.

