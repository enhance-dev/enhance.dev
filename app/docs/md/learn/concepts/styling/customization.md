---
title: Customizing Styles
---

It is possible to completely customize your project's utility classes. There are two ways to do this:

## enhance.json

The `enhance.json` file at the root of your project is designed to act as [a single source of configuration for Enhance plugins](/docs/learn/starter-project/configuration).

To add configuration options for Enhance Styles, simply add the key `"@enhance/styles"` under the `plugins` object. For example:

<doc-code filename="enhance.json">

```json
{
  "plugins": {
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

<doc-link-callout link="https://github.com/enhance-dev/enhance-styles#readme" mark="🎛️">
  Check out the Enhance Styles readme for a full list of the available customizations
</doc-link-callout>

## Dedicated configuration file

If you'd prefer to use a dedicated configuration file for Enhance Styles (instead of `enhance.json`), you can do so by writing an `@enhance-styles` pragma in your `.arc` file, and specifying a configuration file with the `config` key. This file should be in `json` format, and should be placed in the root of your project. For example:

```arc
@enhance-styles
config styleguide.json
```

This configuration file should be structured in the same manner as the contents of the `"@enhance/styles"` object used in `enhance.json`.
