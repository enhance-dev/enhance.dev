---
title: Customizing Responsive Images
---

Our on demand image transformation service works by taking a source image from your project and applying transformations based on size, image format, and image quality. It will also generate image transformations ahead of runtime for any bitmap image stored in a given directory, so that this task is completed before these images are requested by a user’s browser.

Settings for these configuration options can be specified in [your project's `enhance.json`](/docs/learn/starter-project/configuration), under the `plugins` key. For example:

<doc-code filename="enhance.json">

```json
{
  "plugins": {
    "@enhance/image": {
      "widths": [2400, 1200, 800],
      "format": "webp",
      "quality": 80,
      "directory": "public/images"
    }
  }
}
```

</doc-code>

The above configuration will tell the image transformation service that, for every source image passed to the Enhance Image component, it should generate three variants: one at 2400px wide, one at 1200px wide, and one at 800px wide (while preserving your images' intrinsic aspect ratios). Each of those variants will be generated in the webp format, at a quality setting of 80%. Additionally, any source images stored in `public/images` (or any directory within that directory) will have these transformations generated ahead of runtime.

(Coincidentally, the above configuration is the default for the image transformation service, and may be omitted if this works well enough for you.)

## Options

<dl>
  <dt>widths (optional)</dt>
  <dd>

  The `widths` option takes an array of unitless integers. A variant of your source image will be generated for every width specified, with a height corresponding to the source image's intrinsic aspect ratio. The image transformation service will *not* enlarge images, so a source image that is smaller than a specified width will be returned at its maximum intrinsic width. The default widths are 2400, 1200, and 800.

  </dd>

  <dt>format (optional)</dt>
  <dd>

  The format option takes one of the following format strings: `webp`, `avif`, `jpeg`, `png`, or `gif`. Generated images will be returned in the given format. `webp` is recommended for compatibility and performance, and is the default option. [Read more about image formats on the web here.](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)

  </dd>

  <dt>quality (optional)</dt>
  <dd>

  The quality setting takes a number between 0–100. Generated images will be returned at the quality level specified. It's best to choose a quality level that results in the smallest possible file size without significant degradation in image quality — this can vary based on the content of the images being processed, and you may need to experiment a bit to find the best setting based on your content. The quality option defaults to 80.

  </dd>

  <dt>directory (optional)</dt>
  <dd>

  The directory option specifies where your source images are stored within your project. The image transformation service will recursively scan this directory for bitmap images so that it can generate the image transformations and cache them ahead of runtime, thus increasing image rendering performance. Images passed to the Enhance Image component from outside the specified directory will not be transformed ahead of runtime. The directory specified here should be stored within [your project’s public directory](https://enhance.dev/docs/learn/starter-project/public). The default value is `public/images`.

  </dd>
</dl>

## Using a separate configuration file
If you'd prefer to use a dedicated configuration file for Enhance Image (instead of `enhance.json`), you can do so by writing an `@enhance-image` pragma in your `.arc` file, and specifying a configuration file with the `config` key. This file should be in `json` format, and should be placed in the root of your project. For example:

```arc
@enhance-image
config enhance-image.json
```

