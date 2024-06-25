---
title: Customization
---

Enhance Styles is deeply customizable, allowing it to adapt easily to existing or new design systems and brand language. Customizing Enhance Styles is accomplished via a JSON configuration file and an addition to your Enhance project’s `.arc` file.

## Add a JSON config file

Add a new JSON file at the root of your project to start configuring Enhance Styles. This file can be named whatever you like; we’ll use the name `styleguide.json` for the examples shown here.

<doc-link-callout link="https://raw.githubusercontent.com/enhance-dev/enhance-styles/main/config.json" mark="📄">
  Copy the default config to get started
</doc-link-callout>

## Update `.arc`

Next, edit your project’s `.arc` file to instruct Enhance Styles as to the location of your configuration file. Add the `@enhance-styles` pragma, and then `config styleguide.json` below the pragma:

```arc
@enhance-styles
config styleguide.json
```

## Customization options

The following customization options are available:

### `typeScale`

The configuration for the fluid typographic scale. Affects font size classes and the respective custom properties referenced by those classes.

**Note: Enhance Styles will automatically assign the generated base step in this scale (`var(--text0)`) to the `body` font size.**

Configuration options are:

- **`steps`** (default: `6`): The number of steps, including the base font size, to be used for the type scale. **Two negative steps will be generated** for setting type at sub-body sizes. (We do not currently generate additional negative steps as this often results in type that is far too small to read.)
- **`viewportMin`** (default: `320`): The minimum viewport width, in pixels. Font sizes will not decrease at viewports narrower than this width.
- **`viewportMax`** (default: `1500`): The maximum viewport width, in pixels. Font sizes will not increase at viewports wider than this width.
- **`baseMin`** (default: `16`): The base font size, in pixels, to be used at the minimum viewport width.
- **`baseMax`** (default: `18`): The base font size, in pixels, to be used at the maximum viewport width.
- **`scaleMin`** (default: `"minor-third"`): The minimum scaling factor, either as a rational number or a named ratio, to be used for computing all steps above and below the base font size, at the minimum viewport width.
- **`scaleMax`** (default: `"perfect-fourth"`): The maximum scaling factor, either as a rational number or a named ratio, to be used for computing all steps above and below the base font size, at the maximum viewport width.

### `spaceScale`

The configuration for the fluid spacing scale. Affects margin, padding, and gap classes and the respective custom properties referenced by those classes.

Configuration options are:

- **`steps`** (default: `6`): The number of steps, including the base step, to be used for the space scale. **A symmetric number of positive and negative steps will be generated** (for example, 6 steps would generate 1 base step, 5 positive steps, and 5 negative steps).
- **`viewportMin`** (default: `320`): The minimum viewport width, in pixels. Spacing sizes will not decrease at viewports narrower than this width.
- **`viewportMax`** (default: `1500`): The maximum viewport width, in pixels. Spacing sizes will not increase at viewports wider than this width.
- **`baseMin`** (default: `16`): The base spacing size, in pixels, to be used at the minimum viewport width.
- **`baseMax`** (default: `18`): The base spacing size, in pixels, to be used at the maximum viewport width.
- **`scaleMin`** (default: `"minor-third"`): The minimum scaling factor, either as a rational number or a named ratio, to be used for computing all steps above and below the base size, at the minimum viewport width.
- **`scaleMax`** (default: `"perfect-fourth"`): The maximum scaling factor, either as a rational number or a named ratio, to be used for computing all steps above and below the base size, at the maximum viewport width.

### `typeScale` and `spaceScale`: named ratios

The `scaleMin` and `scaleMax` parameters for the `typeScale` and `spaceScale` options can be set using any [rational number](https://www.mathsisfun.com/rational-numbers.html). For convenience, the following [named ratios](https://24ways.org/2011/composing-the-new-canon) may be also be used:

| Named ratio | As a rational number |
|-|-|
| `minor-second`| 1.067 |
| `major-second`| 1.125 |
| `minor-third`| 1.2 |
| `major-third`| 1.25 |
| `perfect-fourth`| 1.333 |
| `augmented-fourth`| 1.414 |
| `perfect-fifth`| 1.5 |
| `golden-ratio`| 1.618 |
| `major-sixth`| 1.667 |
| `minor-seventh`| 1.778 |
| `major-seventh`| 1.875 |
| `octave`| 2 |

### `fonts`
`fonts` are the font stacks you wish to use. They can be named however you like, but it is recommended to retain a sans-serif, a serif and a mono stack for most pages.

The default stacks are:

- `sans`: "system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif"
- `serif`: "Georgia,Cambria,Times New Roman,Times,serif"
- `mono`: "Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace"

### `theme`
`theme` is the set of theme colors.
Colors must be hexadecimal.
Colors can be named however you like.
Colors included in the theme setting will have a color scale generated.
It is recommended to pick a color, then choose a middle lightness as the basis of the scale so as to maximize the amount of steps in the scale that are not white or black.
You can choose your naming convention.
Bootstrap-like themes will use generic names such as "primary".
Material-like themes will choose a theme color name i.e. "indigo".

If you’d like to opt out of the styles generated by the `theme` module, you can set this field to `false` in your `styleguide.json`:

```json
{
  "theme": false
}
```

#### Light/Dark mode

By default Enhance Styles ships with light and dark mode enabled. If you want your app to support only light or only dark mode drop this CSS in your [head](/docs/conventions/head) as a global style:


```html
<style>
  :root {
    color-scheme: only light; /* if you want to force light mode */
    color-scheme: only dark;  /* if you want to force dark mode */
  }
</style>
```

<doc-link-callout link="https://github.com/enhance-dev/enhance-styles?tab=readme-ov-file#theme" mark="🎨">
  Read more about themes
</doc-link-callout>

### `color`
`color` is for one off spot colors. Colors must be specified as hexadecimal and can be named however you like. For example:

 `"crimson": "#eb0052"`

### `grid`
`grid` contains the settings for CSS grid classes.

- `steps` are the amount of sections you want in your grid. Default is 6.

### `properties`
`properties` is an object of named value custom properties. These can be used to supply variables for anything from drop shadows to animations. [Some inspiration](https://open-props.style/)

### `queries`
`queries` are the units for `min-width` media queries. This encourages a mobile first approach to styling. Start by making your mobile, single-column layout then resize your browser wider and only add media queries when your design requires it. Labels for the sizes will be appended to the class names inside the media query block. i.e. `static-lg`. This allows you to add all the classes for every breakpoint and the classes will be overridden as the browser resizes. The default is `"lg": "48em"`

### `borders`
`borders` are settings for borders.
- `widths` is an array of border widths. The defaults are 1, 2, and 4

### `radii`
`radii` is an array of border radii. The defaults are 2, 8, 16, and 9999 ( for use with pill buttons )

### `reset`
Enhance Style ships with a CSS reset by default in order to normalize inconsistencies and provide a blank slate from which to build. If you’d prefer to not have this reset included in the CSS bundle, you can add the following to your `styleguide.json`:

```json
{
  "reset": false
}
```
