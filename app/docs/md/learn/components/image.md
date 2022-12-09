---
title: Image
---

Images can enrich web content, but they can also introduce performance issues, from reducing a page’s time to [Largest Contentful Paint](https://web.dev/lcp/) to introducing [Cumulative Layout Shift](https://web.dev/cls/).

The Enhance image component is designed to help alleviate these issues for images stored in your project’s [public folder](/docs/learn/starter-project/public), by providing: 

<dl class='pl2 pl4-lg'>
  <dt class='font-medium'>Configurable image optimization</dt>
  <dd>Generate alternative formats, set quality levels for lossy formats, and generate different image sizes on the fly.</dd>
  
  <dt class='font-medium mt0'>Responsive images</dt>
  <dd>The <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture'>picture element</a> offers a lot of power in delivering images tailored to different media conditions, but it can be challenging to implement correctly. The image component abstracts and simplifies this API to make responsive images a breeze.</dd>

  <dt class='font-medium mt0'>Generated sizing attributes</dt>
  <dd>For each image variant you provide, the image component will generate corresponding <code>width</code> and <code>height</code> attributes to prevent layout shift from occurring.</dd>

  <dt class='font-medium mt0'>Lazy loading</dt>
  <dd>Images that aren’t critical for a page’s initial render can be lazy loaded to improve the <a href='https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path'>critical rendering path</a>.</dd>
</dl>

## Usage

### enhance-image
This parent element is used to specify your image’s source, its loading strategy, and any <code>alt</code> text you wish to provide.

#### Attributes

<dl class='pl2 pl4-lg'>
  <dt class='font-bold'><code>src</code> <span class='font-normal'>required</span></dt>
  <dd>The path to your source image. In order to take advantage of image optimization, your image <em>must</em> reside in your project’s public folder. This source will also be used as the fallback image in case none of the provided <code>enhance-image-variant</code>s’ media conditions are matched by the client.</dd>
  
  <dt class='font-bold mt0'><code>alt</code></dt>
  <dd>Alternative text description of the image. <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-alt'>Read more about the <code>alt</code> attribute here</a>.</dd>

  <dt class='font-bold mt0'><code>loading</code></dt>
  <dd>The loading strategy to be used. Can be either <code>eager</code> to load the image immediately, or <code>lazy</code> to defer loading until the image approaches the viewport. Defaults to <code>eager</code>. <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading'>Read more about the <code>loading</code> attribute here</a>.</dd>
</dl>

### enhance-image-variant
This element is used to specify a variation of your source image. This is where you can apply image optimization to your source image, as well as specific media conditions under which the variant should be rendered.

#### Attributes

<dl class='pl2 pl4-lg'>
  <dt class='font-bold'><code>format</code></dt>
  <dd>The desired format for the generated image. Available formats are <code>jpg</code>, <code>png</code>, <code>gif</code>, <code>webp</code>, and <code>avif</code>. Defaults to the source image format.
  <doc-callout level='caution' class='mt0'>

  Not all browsers support all image formats — see [MDN’s image filetype and format guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types) for reference.

  </doc-callout></dd>

  <dt class='font-bold mt0'><code>media</code></dt>
  <dd>The <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#syntax'>media condition</a> under which the generated image should be displayed. If a media condition is not provided, the image will be rendered under all media conditions, unless a variant with a matching media condition precedes it.
  <doc-callout level='caution' class='mt0'>

  Due to [the design of the underlying specification](https://html.spec.whatwg.org/multipage/images.html#selecting-an-image-source), the order of media conditions is important: unlike in CSS, the browser will use the _first_  matching media condition it encounters, rather than examining each media condition for the best fit.

  </doc-callout>

  <doc-callout level='tip' class='mt0'>

  As a safety net, where media conditions are all of type `min-width` or `max-width`, these will be reordered into the expected sequence by the component (descending for `min-width`, ascending for `max-width`). The authored order will persist in the generated output if other media features (or multiple media features) are used.

  </doc-callout></dd>

  <dt class='font-bold mt0'><code>quality</code></dt>
  <dd>The quality setting controls the amount of compression to apply to the generated image. Acceptsa numeric string from <code>0</code> to <code>100</code>. Higher numbers result in higher quality and less compression, at the expense of larger file size. Defaults to full quality. TODO: which formats is this available for?</dd>

  <dt class='font-bold mt0'><code>width</code></dt>
  <dd>The desired <a href='https://developer.mozilla.org/en-US/docs/Glossary/Intrinsic_Size'>intrinsic width</a> of the generated image. Accepts a unitless numeric string, to specify the width in pixels. Defaults to the source image width.

  <doc-callout level='info' class='mt0'>

  Generated images will never be upscaled. If a provided `width` exceeds your source image’s width, it will be replaced by the source width.

  </doc-callout>
  </dd>

</dl>

## Examples

### Basic optimization

<doc-code>

```html
<enhance-image src='/_public/axol.png' alt='Illustration of Axol, the friendly axolotl that is Enhance’s mascot.'>
  <enhance-image-variant width='600' format='jpg' quality='60'></enhance-image-variant>
</enhance-image>
```

</doc-code>

The generated image will have an instrinsic width of 600px, and will be reformatted from a PNG to a JPG, at 60% quality.

### Lazy loading

<doc-code>

```html
<enhance-image
  src='/_public/footer-graphic.png'
  alt='A huge image with a large filesize, placed at the bottom of the page.'
  loading='lazy'
></enhance-image>
```

</doc-code>

The image will only be loaded as it approaches the viewport. Note that no variant has been declared, so the source image itself will be used, rather than a generated image. If variants are declared, they will all follow the specified loading strategy. (The use of variants is recommended if your source images have not been optimized. This example merely illustrates that variants are not required.)


### Responsive images

<doc-code>

```html
<enhance-image src='/_public/axol.jpg' alt='Illustration of Axol, the friendly axolotl that is Enhance’s mascot.'>
  <enhance-image-variant media='(min-width: 90em)' width='600'></enhance-image-variant>
  <enhance-image-variant media='(min-width: 48em)' width='400'></enhance-image-variant>
  <enhance-image-variant width='200'></enhance-image-variant>
</enhance-image>
```

</doc-code>

In this example, the browser will check each media condition to establish which image should be loaded. If the viewport is at least `90em` wide, the 600px wide image will be loaded, and the other variants will be skipped for analysis. Otherwise, if the viewport is at least `48em` wide, the 400px wide image will be loaded, and the remaining variant will be skipped. Finally, if neither of these media conditions are matched, the 200px wide image will be loaded. Only one image will be generated when the document loads, depending on which media condition is matched first by the viewport. If the viewport is resized, the media conditions will be checked again, and another variant will be loaded if another media condition is matched.

<doc-callout level='tip'>

Note the absence of a media condition on the last (and smallest) variant, indicating that this image should act as a fallback if no other media conditions are matched by the viewport. This is the recommended strategy for mobile-first responsive images.

</doc-callout>

If you instead wish to specify variants using `max-width` media conditions, the conditions should be given in ascending order:

<doc-code>

```html
<enhance-image src='/_public/axol.jpg' alt='Illustration of Axol, the friendly axolotl that is Enhance’s mascot.'>
  <enhance-image-variant media='(max-width: 20em)' width='200'></enhance-image-variant>
  <enhance-image-variant media='(max-width: 48em)' width='400'></enhance-image-variant>
  <enhance-image-variant width='600'></enhance-image-variant>
</enhance-image>
```

</doc-code>

In this example, the largest image is left without a media condition, as it will be used only if the smaller media conditions are not a match. In accordance with mobile-first principles, we recommended the use of `min-width` media queries over `max-width` media queries, but the choice is yours!

### Other media conditions

Images can of course be generated for media conditions beyond viewport widths. For example, if you wish to size an image based on the device’s display resolution:

<doc-code>

```html
<enhance-image src='/_public/axol.jpg' alt='Illustration of Axol, the friendly axolotl that is Enhance’s mascot.'>
  <enhance-image-variant media='(min-resolution: 300dpi)' width='1200'></enhance-image-variant>
  <enhance-image-variant media='(min-resolution: 150dpi)' width='800'></enhance-image-variant>
  <enhance-image-variant width='400'></enhance-image-variant>
</enhance-image>
```

</doc-code>

<doc-callout level='tip'>

For a full list of media features, see [MDN’s @media docs](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_features).

</doc-callout>

