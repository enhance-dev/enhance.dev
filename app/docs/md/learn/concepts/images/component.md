---
title: Enhance Image Component
---

Enhance Image is a [Single File Component (SFC)](/docs/learn/concepts/single-file-components) that makes authoring responsive images easy, by providing a simple custom element interface backed by an image transformation service.

## Install

Enhance Image comes preinstalled on all new Enhance projects. For preexisting Enhance projects, follow the directions below.

Install Enhance Image via npm:

```shell
npm install @enhance/image
```

Then, add `enhance/arc-image-plugin` to your project’s `.arc` file, under the `@plugins` pragma:

```arc
@plugins
enhance/arc-image-plugin
```

This will ensure that Enhance Image's image transformation service will be used in combination with the Enhance Image component.

Finally, make the component available by exporting it from the package to your project:

<doc-code filename="app/elements/enhance-image.mjs">

```javascript
export default EnhanceImage from '@enhance/image'
```

</doc-code>

## Use

```html
<enhance-image
  src='/_public/images/dog.jpg'
  alt='My favourite dog'
></enhance-image>
```

The Enhance Image component can be used wherever you’d normally use an `img` element with a source image stored in [your project’s `public` directory](/docs/learn/starter-project/public). By default, every source image you reference will be made available in 2400, 1200, and 800 pixel wide variants in the webp format at 80% quality. These settings can be fully customized.

<doc-callout level="none" mark="🎛️">

**[Read more about the customizing responsive images →](/docs/learn/concepts/images/customization)**

</doc-callout>

### Attributes

<dl>
  <dt>src</dt>
  <dd>The path to the source image in your project.</dd>

  <dt>alt</dt>
  <dd>A description of the image. For images that are purely decorative, this can be an empty string.</dd>

  <dt>sizes (optional)</dt>
  <dd>

  A comma separated list of source size descriptors, plus a fallback value. Each source size descriptor contains a media condition followed by a space and a source size value. The fallback value should not contain a media condition. The browser will use this attribute to determine which of your generated images to use for the current media condition. 

  For example, the value `(min-width: 40em) 1200px, 800px` will propose that for viewports of at least 40em wide, an image with a width of at 1200px is preferred; for all other viewports, an image with a width of 800px is preferred. 

  Note that the widths given for source size values cannot be specified as a percent. They can, however, be specified as font relative units (`rem`, `em`, etc.), absolute units (`px`), or the `vw` unit. For further details, see [MDN’s documentation on the `sizes` attribute](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes), or their [documentation of the `img` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img).

  The default value is `100vw`, which will propose that the browser choose an image size that will best fit the full width of the current viewport.

  </dd>

  <dt>width and height (optional)</dt>
  <dd>

  Each of these attributes takes a unitless length which should describe the intrinsic (not the rendered) width and height of your source image. The browser will use this to compute the aspect ratio of your image, which will help to avoid [Cumulative Layout Shift](https://web.dev/cls/). While these attributes are optional, we highly recommend filling them in, as this will improve performance and user experience.

  </dd>
</dl>

## Examples

### Basic usage

```html
<enhance-image
  src='/_public/images/dog.jpg'
  alt='My favourite dog'
  width='3000'
  height='2000'
></enhance-image>
```

Using only the required attributes, and presuming no custom configuration has been specified in your `.arc` file, this will result in the following:

- Transformations of your source image will be generated at 2400px, 1200px, and 800px wide
- Each generated image will be formatted as webp, with an 80% quality setting
- The browser will use whichever of these 3 generated images most closely fits the full width of the current viewport
- The browser will use the provided width and height to determine the image's aspect ratio, thereby preventing cumulative layout shift

### Providing `sizes`
```html
<enhance-image
  src='/_public/images/dog.jpg'
  alt='My favourite dog'
  width='3000'
  height='2000'
  sizes='(min-width: 48em) 920px, 100vw'
></enhance-image>
```

Again presuming the default configuration is being used in this example, the browser will select the generated image closest to the given width of 920px (in this case, the 1200px wide image) when the viewport is 48em or wider. At viewports narrower than 48em, the image closest to the full width of the current viewport will be used.

### Custom configuration

<doc-callout level="none" mark="🎛️">

**[Read more about the customizing responsive images →](/docs/learn/concepts/images/customization)**

</doc-callout>

<doc-code filename="enhance.json">

```json
{
  "plugins": {
    "@enhance/image": {
      "widths": [1280, 1024, 720, 480, 375],
      "quality": 75,
      "directory": "public/images/post-assets"
    }
  }
}
```

</doc-code>

```html
<enhance-image
  src='/_public/images/post-assets/dog.jpg'
  alt='My favourite dog'
  width='3000'
  height='2000'
  sizes='(min-width: 96em) 1200px, (min-width: 48em) 1000px, 100vw'
></enhance-image>
```

- Bitmap images located in `public/images/post-assets` will be transformed ahead of runtime
- Each source image will be available in widths of 1200px, 1024px, 720px, 480px, and 375px
- Each generated image will be formatted at 75% quality; as no `format` option has been specified, the default format (webp) will be used
- At viewports at least 96em wide, the generated image closest to 1200px in width will be used; at viewports between 48–95.9em wide, the generated image closest to 1000px in width will be used; at viewports narrower than 48em, the image closest to the width of the current viewport will be used

