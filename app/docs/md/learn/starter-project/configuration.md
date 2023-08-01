---
title: Configuration
---

Enhance starter projects include several tools to get you up and running with best practices as easily as possible (like the Enhance Styles library and the Enhance Image component and transformation service). While these tools come with sensible defaults baked in, each can also be customized to best suit your project’s requirements.

To customize these (and other tools in the future), we expose a single configuration file (`enhance.json`) at the root of each project.

<doc-callout level="info">

For backwards compatibility (and for those who prefer to write one config file per plugin), each plugin can also have its own config file declared in your project’s `.arc` file — view the customization docs for [Enhance Styles](/docs/learn/concepts/styling/customization) and [Enhance Image](/docs/learn/concepts/images/customization) for more details.

</doc-callout>

## enhance.json

At present, `enhance.json` contains a single `plugins` key, which itself can be used to set customization options for [Enhance Styles](/docs/learn/concepts/styling/) and [Enhance Image](/docs/learn/concepts/images/). Each plugin configuration object should be keyed by its package name. For example:

<doc-code filename="enhance.json">

```json
{
  "plugins": {
    "@enhance/image": {
      "widths": [2400, 1200, 800],
      "format": "webp",
      "quality": 80,
      "directory": "public/images"
    },
    "@enhance/styles": {
      "fonts": {
        "sans": "system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif",
        "serif": "Georgia,Cambria,Times New Roman,Times,serif",
        "mono": "Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace"
      },
      …
    }
  }
}
```

</doc-code>

If a plugin is not configured in `enhance.json`, it will fall back to its default configuration.
