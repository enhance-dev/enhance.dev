---
title: "Introducing Enhance Image"
image: '/_public/blog/post-assets/cole-enhance-image/enhance-image.jpg'
image_alt: "Two Axols flying in the sky, carrying a large framed picture into view. Two smaller images float on clouds in the background."
category: enhance
description: "Say hello to Enhance Image — a single file component for Enhance that makes creating and implementing responsive images easy!"
author: "Cole Peters"
avatar: "cole.jpg"
mastodon: "@colepeters@mastodon.online"
published: "March 12, 2024"
---

Although we in web development (and certainly those of us at Begin) do a lot of talking about the cost of JavaScript, there’s another type of content on the web that has a huge bearing on performance: images.

In fact, images are by far [the largest contributor to page weight](https://almanac.httparchive.org/en/2022/page-weight#fig-8), while also being in close competition with JavaScript for [the highest number of resource requests per page](https://almanac.httparchive.org/en/2022/page-weight#fig-3). Images have a significant impact on multiple aspects of performance, including [Cumulative Layout Shift](https://web.dev/articles/cls) and [Largest Contentful Paint](https://web.dev/articles/lcp). Furthermore, with [median image payloads hovering around 1MB](https://almanac.httparchive.org/en/2022/page-weight#fig-13), images can also cost end users a lot of data and money to access (and considering that [just over 1 in 5 people in the UK still use Pay As You Go](https://www.ofcom.org.uk/phones-telecoms-and-internet/advice-for-consumers/advice/pay-as-you-go-mobile-use-it-or-lose-it) — and [as of 2020, 2.45 million people in Canada did, too](https://www.statista.com/statistics/460086/total-number-of-prepaid-mobile-subscribers-canada/) — lowering data access requirements is decidedly not just a problem for emerging cellular markets). This makes images an obvious and important target for performance optimization.

In 2024, we’re fortunate to have more options available to us than ever to reduce the negative impacts of using images on the web. Both the Image and Picture elements now have APIs in place for [implementing responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images), which allow web developers to send the most appropriately sized or formatted image to a particular viewport or device. Using these techniques can greatly reduce the overhead of sending oversized images to a multitude of displays (and users).

Unfortunately, the APIs for implementing responsive images can be difficult to wrap your head around. While these techniques are effective, they’re not exactly a breeze to internalize — as evidenced by [this (very good) *ten part* series of articles on responsive images](https://cloudfour.com/thinks/responsive-images-101-definitions/). Meanwhile, preparing multiple variants (based on size, quality, and image format) of every single image on a website can be time consuming at best, and certainly designers and engineers could imagine spending their time on more enjoyable tasks.

With all this in mind, one of the first side projects I spun up for myself after joining Begin in 2022 was to investigate how we could make responsive images easier for users to author in their [Enhance](https://enhance.dev) projects. While by no means revolutionary, the core concept was to make a configurable, standards based, single file component available to users, which would simplify the implementation of responsive images in addition to eliminating the need to generate arbitrary image variants by hand. I (and my colleagues at Begin) went through multiple iterations and proposals for this project, weighing everything from the pros, cons, and most compelling use cases of the Image and Picture elements, to different component signatures, options, and patterns for configuration.

Today, we’re excited to announce that the results of this project are now available in the form of our beta release of [Enhance Image](https://enhance.dev/docs/enhance-ui/image), the first in a suite of standards based UI components we’re calling Enhance UI.

## Simplified authoring

Generally speaking, responsive images solve one of two problems: resolution switching and art direction. ‘Resolution switching’ refers to providing *different resolutions* of a given image to different viewports (for example: sending small images to mobile devices, and large images to external monitors), while ‘art direction’ refers to providing *different aesthetic variants* of an image to different viewports (for example: rendering a landscape crop of an image on a shorter, wider screen, and a portrait crop of an image to a taller, narrower screen).

Enhance Image is built for the former use case: providing different resolutions of the same image to different viewports.

This use case is supported primarily via two attributes of the native Image element — those being the `srcset` and `sizes` attributes. In short, the `srcset` attribute allows an author to declare URLs to multiple different variants of an image, each of which must have its width declared with a width descriptor (effectively the image’s width in pixels followed by the letter `w`). Meanwhile, the `sizes` attribute allows an author to specify various media conditions for the viewport and the width of the content area that the image should occupy under that condition. With this information from the `sizes` attribute, the browser will examine the list of images in the `srcset` attribute and select the image it determines to be the best available option.

Let’s review an example of how this works in practice before demonstrating what Enhance Image brings to the table.

Let’s say we’ve got a nice big hero image we want to render at the top of a web page. We have an asset for this image from our designer all ready to go in our Enhance project. But hero images can be pretty large, and we’d like to render smaller versions of this image on smaller viewports, so as not to send those users more data than needed.

Before implementing this image responsively, our code for our hero section might look something like this:

```html
<section>
  <img
    src="/_public/hero.jpg"
    alt="Axol the axolotl galavanting through the world of Enhance"
  />
</section>
```

To implement this image responsively, we could have our designer carve out multiple variations of this image in different sizes, and then use the `srcset` and `sizes` attributes to provide the browser with the ability to serve the best option to a given display:

```html
<section>
  <img
    src="/_public/hero.jpg"
    srcset="/_public/hero-large.jpg 2400w, /_public/hero-medium.jpg 1200w, /_public/hero-small.jpg 800w"
    sizes="100vw"
    alt="Axol the axolotl galavanting through the world of Enhance"
  />
</section>
```

A few things are going on in the example above: we’re using the `srcset` attribute to declare multiple variants of our image, along with a width descriptor for each; we’re leaving the `src` attribute in place as a fallback for browsers that may not have the `srcset` attribute available; and we’re setting the `sizes` attribute to `100vw` to tell the browser that it should select an image from the options in `srcset` that will be best suited for filling up 100% of the current viewport’s width. Note that the browser will make this determination by factoring in not just the pixel width of the viewport and content areas, but also the display’s pixel density and zoom level, and possibly other factors such as network conditions (these factors can vary between browser vendors).

This implementation works great, but the code is admittedly not necessarily the easiest to follow. If we want to provide a larger number of variants in the `srscset` attribute, things can get gnarly pretty fast (both for authors writing the code and designers creating multiple variants). This is also just a single image on our site — as previously noted, most sites have many more than a single image per page, thus multiplying the amount of work required.

This is where Enhance Image comes in. First, it provides a familiar but simplified component signature — for example, the equivalent of the above code using Enhance Image would look like this:

```html
<section>
  <enhance-image
    src="/_public/hero.jpg"
    alt="Axol the axolotl galavanting through the world of Enhance"
  ></enhance-image>
</section>
```

Where have our `srcset` and `sizes` attributes gone? Well, I’ve been a bit sneaky and previously specified a list of images formatted to Enhance Image’s defaults — that is, Enhance Image will make a 2400px, 1200px, and 800px wide variant available on demand for each source image it’s provided. We also default to `100vw` for the `sizes` attribute, and it can thus be omitted. (The same is true for the native `sizes` attribute, but it was shown previously for clarity).

Thus, using just the default configuration, every image in your Enhance project can now be delivered responsively by swapping out the `img` tag for the `enhance-image` custom element tag.

In the above example, we don’t just deliver the generated variants of your source image in different sizes. By default, we also provide further optimizations by delivering these variants in [`webp` format](https://developers.google.com/speed/webp), at an 80% quality setting. And — like all other Enhance elements — Enhance Image renders its content as HTML on the server, with no client side JavaScript required.

Of course, the defaults that ship with Enhance Image won’t work for everyone — in fact, we strongly encourage you to experiment with these values, which is why we’ve made configuring Enhance Image a breeze.

## Configuration options

Enhance Image’s single file component provides a simple but powerful component primitive for authors, but this is only half the story. Enhance Image itself is powered by a versatile, fully configurable, on demand image transformation service that powers the creation of your source image variants. Here, all credit goes to the brains behind this service, fellow Beginner [Ryan Bethel](https://indieweb.social/@ryanbethel).

Our image transformation service allows authors to request generated variants of a given image using three different configuration options, which need to be set in your project’s [Preflight file](https://enhance.dev/docs/conventions/preflight):

<dl>

<dt><code>widths</code> (optional)</dt>
<dd>

The `widths` option takes an array of pixel widths, specified as unitless integers. A variant of your source image will be generated for every width specified, with a height corresponding to the source image's intrinsic aspect ratio. The default widths are 2400, 1200, and 800.

</dd>

<dt><code>format</code> (optional)</dt>
<dd>

The format option takes one of the following format strings: `webp`, `avif`, `jxl`, `jpeg`, `png`, or `gif`. Generated images will be returned in the given format. `webp` is recommended for compatibility and performance, and is the default option. [Read more about image formats on the web here.](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)

</dd>

<dt><code>quality</code> (optional)</dt>
<dd>

The quality setting takes a number between 0–100. Generated images will be returned at the quality level specified. It's best to choose a quality level that results in the smallest possible file size without significant degradation in image quality — this can vary based on the content of the images being processed, and you may need to experiment a bit to find the best setting based on your content. The quality option defaults to 80.

</dd>
</dl>

For each image passed to the `enhance-image` single file component, our image transformation service will return one generated variant per `width` specified in the configuration, formatted and optimized based on the `format` and `quality` settings. This saves authors from having to manually create and optimize images ahead of deployment, and allows different variants to be iteratively added or removed as your needs change over time.

## Pushing performance further

One important thing to note is that, since Enhance applications don’t have a build step but are rather deployed as cloud functions, the generated variants for each image are created at the time those images are requested by a browser. Each image variant will be cached after its creation; however, you may experience a slight delay when the images are first requested, especially for large or complex images that may take longer to process.

This is why Enhance Image also ships with a cache warming script that can be run either locally or via a CI service like GitHub Actions. This script will recursively scan a directory in your project for image files, and then — based on your configuration options — will make requests for each of your image variants, effectively ‘warming’ their caches before an end user even requests them.

The cache warming script can be run like this:

```shell
npx @enhance/image warm --directory /public/images --domain https://example.org
```

The script takes two arguments:

<dl>
<dt><code>--directory</code></dt>
<dd>

The path to the directory in your project containing the images you’ll be using with Enhance Image, for which you’d like variants (and caches) generated, e.g. `/public/images`. This path **must start with `/public`**. The directory will be scanned recursively, so only the top most directory needs to be provided.

</dd>

<dt><code>--domain</code></dt>
<dd>

The URL of your application’s deployment, e.g. `https://example.org` or `https://image-4ab.begin.app`.

</dd>
</dl>

For further details, see [the Enhance Image docs](https://enhance.dev/docs/enhance-ui/image).

## Beta available today!

We’ve spent a surprisingly long time working to bring Enhance Image to a public beta, and we’re pretty excited about the results. It’s available for you to try today — [check out the docs to get started](https://enhance.dev/docs/enhance-ui/image)! If you have any questions, problems, or other feedback, feel free to [join us on Discord](https://enhance.dev/discord) or [open an issue](https://github.com/enhance-dev/enhance-image/issues)!

Possible breaking changes, however, are in our sights — primarily as concerns the method of providing configuration options, as well as the possibility of using Enhance Image with private S3 buckets (eliminating the need to track image assets in your project’s git repository). While we always aim to make changes additively rather than destructively, we’re not sure how these changes will land once we get to work on them — and it’s for this reason that we’re labelling Enhance Image as a beta release for now.

That said, we’ve been using Enhance Image (first in its alpha form, and more recently in its current beta form) on our own production domains (including this blog) for several weeks now, and we’re confident both in its abilities and its results.

We hope you enjoy using Enhance Image to more easily author responsive images!
