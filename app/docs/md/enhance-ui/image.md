---
title: '@enhance/image'
---

<doc-callout mark="🧑‍🔬">

**Enhance Image is currently in beta!** We anticipate introducing some minor changes to the [configuration options](#configuration) and [cache warming](#cache-warming) before launching the stable version of this component.

</doc-callout>

Enhance Image is a Single File Component (SFC) that makes authoring responsive images easy, by providing a simple component API backed by an on-demand image transformation service.

Responsive images are an important aspect of responsive web design and development. They offer major performance improvements by delivering appropriately sized images to a range of device resolutions and viewport sizes so that, for example, a mobile phone doesn't waste time and bandwidth downloading an image sized for a widescreen monitor.

Implementing responsive images, however, can be challenging. Preparing multiple variants of images can be tedious and time consuming, and the web platform APIs for using responsive images in the browser can be tough to wrap your head around. This is where Enhance Image comes in. By combining a simple custom element interface with an on-demand image transformer, it saves time on image preparation and reduces the overhead of implementing responsive images correctly.

## Usage

### Installation

Install Enhance Image by running the following command in your Enhance project:
```shell
npm install @enhance/image
```

Then, add `enhance/arc-image-plugin` to your project’s `.arc` file, under the `@plugins` pragma:

```.arc
@plugins
enhance/arc-image-plugin
```

This enables Enhance Image’s image transformation service (which is used by the component).

### Configuration

The image transformation service works by taking a source image from your project and generating new variants of it by applying transformations based on size, image format, and image quality.

These configuration options can be specified in [your project's Preflight file](https://enhance.dev/docs/conventions/preflight), under the `plugins` key. For example:

```javascript
// app/preflight.mjs
export default async function Preflight ({ req }) {
  return {
    plugins: {
      '@enhance/image': {
        transform: {
          widths: [2400, 1200, 800],
          format: 'webp',
          quality: 80,
        },
      }
    }
  }
}
```

The above configuration will tell the image transformation service that, for every source image passed to the Enhance Image component, it should generate three variants: one at 2400px wide, one at 1200px wide, and one at 800px wide (while preserving your images' intrinsic aspect ratios). Each of those variants will be generated in the webp format, at a quality setting of 80%.

(Coincidentally, the above configuration is the default for the image transformation service, and may be omitted from your Preflight file if this works well enough for you.)

In more detail:

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

### Single File Component

To use the SFC, first import it from the package, and then re-export it to make it available to your app:

```js
// app/elements/enhance-image.mjs
import EnhanceImage from '@enhance/image'
export default EnhanceImage
```

You can then use the SFC in your pages and other elements, for example:

```html
<h1>My Favourite Dog</h1>
<enhance-image src="/_public/images/dog.jpg" alt="My favourite dog"></enhance-image>
```

The SFC accepts the following attributes, which are proxies for [the same named attributes of the Image element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes):

<dl>

<dt><code>src</code></dt>
<dd>

The path to the source image in your project.

</dd>

<dt><code>alt</code></dt>
<dd>

A description of the image. For images that are purely decorative, this can be an empty string.

</dd>

<dt><code>sizes</code> (optional)</dt>
<dd>

A comma separated list of source size descriptors, plus a fallback value.

Each source size descriptor contains:

- a media condition (e.g. `(min-width: 48em)`) followed by a space, and
- a source size value (a length describing *the width of the content area the image should occupy*), e.g. `50vw`.

The fallback value should **not** contain a media condition. Source size values can be expressed in `vw` units, or absolute lengths (`px`, `rem`, `em`, etc.)

The browser uses the `sizes` attribute to determine which of your images (generated by the transformation service) to select and use for the current media condition.

For example, the value `(min-width: 40em) 50vw, 100vw` will propose that for viewports of at least 40em wide, an image with a width suitable for occupying 50% of the viewport width is preferred; for all other viewports, an image with a width suitable to occupy the full viewport width should be used.

There are a few important caveats to keep in mind when using the `sizes` attribute — see the [usage notes](#usage-notes).

The `sizes` attribute has a default value of `100vw`.

</dd>

<dt><code>width</code> and <code>height</code> (optional)</dt>
<dd>

Each of these attributes takes a unitless length which describes the intrinsic (not the rendered) width and height of your source image. The browser will use this to compute the aspect ratio of your image, which will help to avoid [Cumulative Layout Shift](https://web.dev/cls/). These properties can also be set via CSS; note that if they are specified as HTML attributes, any CSS styles targeting your images’ width and height will override those attributes.

</dd>

<dt><code>loading</code> (optional)</dt>
<dd>

A string of either `'eager'` or `'lazy'`. Using the `'lazy'` value will instruct the browser to defer loading the image until it determines it will be needed. The default value, as per the HTML image element spec, is `'eager'` (which will instruct the browser to load the image source as soon as the image element is processed). [Read further on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading).

</dd>

<dt><code>fetchpriority</code> (optional)</dt>
<dd>

A string of either `'high'`, `'low'`, or `'auto`. Provides a hint to the browser as to the relative priority of fetching an image’s source, relative to other images. The default is `'auto'`.

</dd>
</dl>

## Cache warming

The transformation service that powers Enhance Image creates variants of your images on demand — that is, when they are requested by the browser of an end user visiting your site. These images are cached for performance once created. However, the initial network request for each image variant (before it’s cached) can take longer to return than may be ideal, especially for larger or complex images.

For this reason, Enhance Image includes a script for ‘warming’ your image caches, which ensures that each image is cached (and will thus be loaded as quickly as possible) before an end user ever requests it.

This script is available to run via [`npx`](https://docs.npmjs.com/cli/v10/commands/npx), as follows:

```shell
npx @enhance/image warm --directory /public/images --domain https://example.org
```

The script takes two arguments:

<dl>

<dt><code>--directory</code></dt>
<dd class="mbe0">

The path to the directory in your project containing the images you’ll be using with Enhance Image, for which you’d like variants (and caches) generated, e.g. `/public/images`. This path **must start with `/public`**. The directory will be scanned recursively, so only the top most directory needs to be provided.

</dd>

<dt><code>--domain</code></dt>
<dd>

The URL of your application’s deployment, e.g. `https://example.org` or `https://image-4ab.begin.app`.

</dd>

</dl>

Note: The warming script may take some time to complete its initial run. On subsequent runs, images that have already had their caches warmed in previous runs will be skipped, making subsequent runs much faster.

### Integrating with GitHub Actions

We recommend integrating the cache warming script with [GitHub Actions](https://docs.github.com/en/actions) in order to automate this functionality. (The script can be run from your terminal, however this can be easily forgotten on subsequent deployments.)

A GitHub Action workflow for running this script could look (in part) like this:

```yaml
name: CI

on: [push]

jobs:
  deploy:
    name: Deploy (production)
    # …

    steps:
      # …

      - name: Warm image caches
        run: npx @enhance/image warm --directory /public/images --domain https://example.org
```

This will ensure that your image caches are warmed each time a production deploy is made.

## Walkthrough

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/UYfBreIx7W8?si=5vRH9wToaUgqhD7t" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

This walkthrough video covers installing Enhance Image, using the component, configuring the transformation options, and using the `loading` and `fetchpriority` attributes to improve performance.

## Examples

### Basic usage

```html
<enhance-image
  src="/_public/images/dog.jpg"
  alt="My favourite dog"
></enhance-image>
```

Using only the required attributes, and presuming no custom configuration has been specified in your Preflight file, this will result in the following:

- Transformations of your source image will be generated at 2400px, 1200px, and 800px wide
- Each generated image will be formatted as webp, with an 80% quality setting
- The browser will use whichever of these 3 generated images most closely fits the full width of the current viewport

### Providing `sizes`
```html
<enhance-image
  src="/_public/images/dog.jpg"
  alt="My favourite dog"
  sizes="(min-width: 48em) 50vw, 100vw"
></enhance-image>
```

Again presuming the default configuration is being used in this example, the browser will select the generated image closest to 50% of the current viewport width when the viewport is 48em or wider. At viewports narrower than 48em, the image closest to the full width of the current viewport will be used.

### Lazy loading and auto `sizes`
```html
<enhance-image
  src="/_public/images/dog.jpg"
  alt="My favourite dog"
  loading="lazy"
  sizes="auto"
></enhance-image>
```

This is a good strategy to use for images that are rendered outside of the initial viewport area of a page. Since loading of the image will be deferred until the browser anticipates the image will be needed, the browser will already understand what size of image will be needed for the given content area, and can thus automatically determine which of your generated images to use.

### Custom configuration

```javascript
// app/preflight.mjs
export default async function Preflight ({ req }) {
  return {
    plugins: {
      '@enhance/image': {
        transform: {
          widths: [1280, 1024, 720, 480, 375],
          quality: 60,
        }
      }
    }
  }
}
```

- Generated images will be available in widths of 1280px, 1024px, 720px, 480px, and 375px
- Each generated image will be formatted at 60% quality
- As no `format` option has been specified, the default format (webp) will be used

```html
<enhance-image
  src="/_public/images/post-assets/dog.jpg"
  alt="My favourite dog"
  sizes="(min-width: 96em) 25vw, (min-width: 48em) 50vw, 100vw"
></enhance-image>
```

- At viewports at least 96em wide, the generated image closest to `25vw` in width will be used; at viewports between 48–96em wide, the generated image closest to `50vw` in width will be used; at viewports narrower than 48em, the image closest to the full width of the current viewport will be used

## Usage notes

The `sizes` attribute used by Enhance Image is simply a proxy for [`HTMLImageElement.sizes`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes). This `sizes` attribute, as specified by [the HTML living standard](https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-sizes), can be tough to wrap your head around in certain cases. However, we believe it’s beneficial to remain close to the web platform, as it avoids the need to learn brittle abstractions and thus keeps knowledge reusable. As such, when you learn how to work with Enhance Image’s `sizes` attribute, you’re actually learning how to work with the Image element’s `sizes` attribute — warts and all.

Below are several considerations to keep in mind when using `sizes`.

### Order of media conditions

When multiple media conditions are listed, the first media condition that matches the viewport will be used, and all others will be ignored. Therefore, if using `min-width` media queries, these should be written in descending order, e.g. `(min-width: 72em) 25vw, (min-width: 48em) 50vw`. Conversely, `max-width` media queries should be written in ascending order.

### Using absolute lengths

When deciding which of your generated images to use for a given media condition in `sizes`, the browser evaluates multiple factors — not just the viewport width, but also the current display’s pixel density, and potentially other factors as determined by the particular browser.

Additionally, it’s important to keep in mind that the lengths specified in the `sizes` attribute do not represent a desired *image width*, but rather *the width of the content area the image is meant to occupy*.

Therefore, if you specify an absolute length in your `sizes` attribute (for example: `(min-width: 48em) 400px`), the browser may not select an image that is closest to 400px in width. If, for example, the browser is currently running in an environment with a 2x pixel density, it will likely select an image closer to 800px in width, in order to fill a 400px wide content area with an image of a suitable size given a 2x pixel density display.

For this reason, it’s often advantageous (and makes for a clearer implementation) to specify the lengths in your `sizes` attribute using `vw` units.

For further details, see [MDN’s documentation on the `sizes` attribute](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes), or their [documentation of the `img` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img).


## Roadmap

The following updates are either planned or currently in active development:

- Support for handling image assets via private S3 buckets
- Streamline image cache warming

