---
title: Introducing Enhance Styles 5.0
image: "/_public/blog/post-assets/cole-enhance-styles-5/cover.jpg"
image_alt: "Illustration showing the Enhance mascot, Axol the axolotl, floating in the sky with a handful of balloons. Text on the left side of the image reads 'Enhance Styles 5.0.'"
category: enhance
description: "Today, we’re excited to announce the release of Enhance Styles 5.0, a major upgrade to the configurable styling library included with all Enhance projects."
author: 'Cole Peters'
avatar: 'cole.jpg'
mastodon: "@colepeters@mastodon.online"
published: "May 12, 2023"
---

Today, we’re excited to announce the release of Enhance Styles 5.0, a major upgrade to the configurable styling library included with all Enhance projects. This release introduces:

- Fluid modular scales for typography and layout, exposed through utility classes and custom properties
- CSS logical properties for margins, padding, borders, sizes, insets, and text alignment, exposed through utility classes
- Updates and revisions to flexbox and grid classes

For existing Enhance projects, you can upgrade to this new release of Enhance Styles via one of two methods:

1. **If you already have `@enhance/arc-plugin-styles` listed in your project’s dependencies:** update this package to the latest release by running `npm i @enhance/arc-plugin-styles@^3.0.1`
2. **If you don’t have the styles plugin listed in your project’s dependencies:** upgrade the `@enhance/arc-plugin-enhance` package to the latest release by running `npm i @enhance/arc-plugin-enhance@^6.0.1`

Being a major release, 5.0 does contain breaking changes. We don’t ship breaking changes often, but for this release of Enhance Styles, we identified a couple key areas of improvement that couldn’t be introduced in any other way. Despite these breaking changes, the upgrade path should be painless (and we’ll cover that throughout this article).

Without further ado, let’s examine these updates in detail!

## Fluid modular scales

One of the most powerful features of Enhance Styles (and other atomic or utility class focused styling libraries) is the concept of using modular scales for parametric design and development. Modular scales are of particular value in design systems, where their values can be used for typography as well as layout.

We’ve revised our approach to modular scales in two ways for this new release of Enhance Styles.

First: we’ve adopted fluid modular scales. You might be familiar with the concept of fluid scales thanks to tools like [Utopia](https://utopia.fyi) — but if you’re not, our new Enhance docs on modular (and fluid) scales have you covered! [Head on over to the docs](https://enhance.dev/docs/learn/concepts/styling/modular-scales) for a deep dive. In short, fluid modular scales allow design aspects like font sizes and layout spacing units to scale fluidly between a minimum and maximum viewport size, thus reducing the amount of breakpoint specific CSS you need to write, and providing a great user experience regardless of the size of the user’s device or browser window.

> As designers and developers, we can stop fussing about a potentially infinite array of typographic and spatial variations, and instead focus almost entirely on the extremes: ‘What size should this type be at a minimum, and what size should it be at a maximum?’ Or, ‘How far away should element A be from element B at a minimum, and how far away should it be at a maximum?’
> 
> — Me, [a couple articles ago](https://begin.com/blog/posts/2023-04-21-building-the-enhance-landing-page)

Along with adopting fluid modular scales, we’ve also updated Enhance Styles to allow for the generation of two distinct scales: one for type sizes, and another for layout spacing sizes (used for margins and padding, as well as for gaps in flexbox and grid layouts). In our experience, scales for typography and scales for layout spacing can have differing requirements; for example, typographic scales rarely need more than one or two negative steps on the scale (as font sizes quickly approach the illegible as they reduce past the base size), but spacing scales can make great use of a range of smaller sizes. Additionally, you may want your spacing scale’s intervals to increase or decrease at a faster rate than your type scale (or vice versa). Allowing for distinct configurations between the type scale and space scale means a greater range of use cases and design systems can be accommodated by Enhance Styles.

Both the type and the space scale are fully configurable, but come with some sensible defaults out of the box to get you started. Type scale values are baked into font size classes (e.g. `.text2` or `.text-1`), and space scale values are baked into classes for margins, padding, and gaps (e.g. `.m4`, `.p0`, or `gap-2`). You can also use the scale values within your [element styles](https://enhance.dev/docs/learn/concepts/styling/element-styles) using the generated custom properties (e.g. `var(--text-2)` or `var(--space--4)`).

For much more on Enhance Styles’ new fluid modular scales, including a full technical walkthrough, [check out the new docs](https://enhance.dev/docs/learn/concepts/styling/modular-scales) — or see the default scales in action in [this tiny little demo](https://color-ig2.begin.app)!

### Upgrading to the fluid modular scales

For the most part, this upgrade path should just be a matter of updating your Enhance Styles configuration file (if you have one — if you don’t, the upgrade should be automatic). For example, here’s an example of the old configuration shape:

```json
{
	"base": 16,
	"scale": {
		"steps": 12,
		"ratio": "perfectFourth"
	}
}
```

…and here’s an example of how to use these values with the new scales:

```json
{
	"typeScale": {
		"steps": 12,
		"viewportMin": 320,
		"viewportMax": 1500,
		"baseMin": 16,
		"baseMax": 16,
		"scaleMin": "perfect-fourth",
		"scaleMax": "perfect-fourth",
	},
	{
	"spaceScale": {
		"steps": 12,
		"viewportMin": 320,
		"viewportMax": 1500,
		"baseMin": 16,
		"baseMax": 16,
		"scaleMin": "perfect-fourth",
		"scaleMax": "perfect-fourth",
	}
}
```

Note that the above configuration will **not** produce fluidly scaling values, but rather reproduces the previous scale exactly. You would, at a minimum, need to set a larger `baseMax` size for both your type and space scales in order to see any fluid resizing across viewport widths.

Also, note that the new type scale produces only 2 negative steps — thus, if you’ve used classes like `.text-3` or `.text-4`, these would need to be refactored to account for this change. However, as these type sizes would likely have been illegible, we expect this is not a common use case.

## CSS logical properties

We want Enhance to be a great framework for everyone. But not everyone uses the left to right (LTR) writing system that CSS was originally based on. This is where logical properties come in. Logical properties are used in CSS layout modules to describe ‘logical’ directions based on the current writing mode, as opposed to physical directions. In the LTR writing mode, the block axis runs from the top to the bottom of the page, while the inline axis runs from the left to the right of the page. In a right to left (RTL) writing mode, the inline axis would run from the right to the left of the page, and so forth.

Logical properties allow us to write more robust styles, which are resilient to changes in writing modes. For those working in non LTR writing modes, or those who needs to internationalize their work, logical properties can save a ton of work, and help designers and developers reason about designs in a more logical way.

In order to accommodate these logical properties, we’ve switched our margin, padding, width/height, border, inset, and text alignment classes from using ‘physical’ direction abbreviations (t/r/b/l for top, right, bottom, and left) to using abbreviations for logical directions. So, for example, the `.mt4` class, which applied the 4th spacing interval to the `margin-top` property, now becomes `.mbs4`, which will apply the 4th spacing interval to the `margin-block-start` property.

The table below demonstrates each physical direction in the LTR writing mode, and its equivalent using logical properties:

| LTR physical | LTR logical & abbreviation |
| - | - |
| top & bottom | block, `b` |
| left & right | inline, `i` |
| top | block-start, `bs` |
| bottom | block-end, `be` |
| left | inline-start, `is` |
| right | inline-end, `ie` |

These abbreviations are combined with our margin and padding abbreviations, for example, to create our new margin and padding classes, e.g. `mi-4` for setting the inline margins to the -5th spacing interval, or `pbe2` for setting the block-end padding to the 2nd spacing interval.

### Upgrading to logical properties

This upgrade path involves a little bit more refactoring, but much of this should be able to be accomplished with a little find and replace magic.

- For margin, padding, radius and border classes, replace physical direction abbreviations with logical direction abbreviations (see table above)
- For text alignment classes, replace `.text-left` with `.text-start` and `.text-right` with `.text-end`
- For the positioning reset classes `.t0`, `.b0`, `.l0` and `.r0`, replace with `.inset-<logical abbreviation>-0`, using the table above. The `.trbl` class, used to zero out all insets, is replaced by the `.inset-0` class.
- For width classes, e.g. `.w-auto` or `.w-100`, `w` becomes `si` (abbreviated for ‘size, inline’).
- For height classes, e.g. `.h-auto` or `.h-100`, `h` becomes `sb` (abbreviated for ‘size, block’)

## Updates to flexbox and grid classes

Finally, we’ve added some classes for properties that were previously missing for flexbox and grid layouts. You should now find options for any declarative flavor of the following properties:

- `align-items` (`.align-items-<N>`)
- `align-content` (`.align-content-<N>`)
- `align-self` (`.align-self-<N>`)
- `justify-content` (`.justify-content-<N>`)
- `justify-items` (`.justify-items-<N>`)
- `justify-self` (`.justify-self-<N>`)

We also now support the `place-` properties ([`-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/place-items), [`-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/place-content) and [`-self`](https://developer.mozilla.org/en-US/docs/Web/CSS/place-self)):

- `place-items` (`.place-items-<N>`)
- `place-content` (`.place-content-<N>`)
- `place-self` (`.place-self-<N>`)

### Migrating to the new flexbox and grid properties

Follow the table below when migrating to the properties mentioned above:

| Before | After |
| - | - |
| `.items-<N>` | `.align-items-<N>` |
| `.content-<N>` | `.align-content-<N>` |
| `.self-<N>` | `.align-self-<N>` |
| `.justify-<N>` | `.justify-content-<N>` |

## Next steps

The new release of Enhance Styles goes a long way to adopting some of the most exciting design and development strategies on the web today. Especially when considering fluid type size and layout spacing, we’re looking forward to helping our users both cut down on repetitive, fragile code, and to delivering a better experience to a wider range of users. We also hope that folks working in writing modes other than LTR will make some great use of our new classes leveraging logical properties.

As part of our work to get this release out, we’ve also made a substantial overhaul of [our styling documentation within the Enhance docs](https://enhance.dev/docs/learn/concepts/styling/). We hope these will be useful to both new and existing users getting familiar with these changes.

With this release now out the door, we’ll be turning our attention to another kind of documentation — a dynamic, generated reference guide that will make both discovering and searching for Enhance utility classes a whole lot easier. Stay tuned for updates on this front!

In the meantime, as always, we can’t wait to see what you build with Enhance. Be sure to drop in to [the Enhance Discord](https://enhance.dev/discord) to let us know what you’re working on and what you think of the new Enhance styles, or to ask any questions you might have. You can also feel free to ping us on [Mastodon](https://fosstodon.org/@enhance_dev)!

Have fun, and happy styling!
