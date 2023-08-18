---
title: Using Tailwind
links:
  - "Example app": https://github.com/enhance-dev/enhance-example-tailwind
---

[Tailwind](https://tailwindcss.com) is a popular utility CSS library. For those looking to use Tailwind with Enhance, follow Tailwind’s [installation instructions using the Tailwind CLI](https://tailwindcss.com/docs/installation), keeping the following in mind:

- Your `tailwind.config.js` file’s `content` value should be set to: `["./app/**/*.{html,mjs}"]`
- The path supplied to the Tailwind CLI’s output (`-o`) argument should reside in [your project’s public folder](/docs/learn/starter-project/public)
- You’ll need to replace the code referencing Enhance Styles’ `linkTag` in [your project’s head component](/docs/learn/starter-project/head) with a link tag for your Tailwind styles (e.g. `<link rel="stylesheet" href="/_public/tailwind.css" />`)

With this setup in place, your generated Tailwind styles will be deployed and fingerprinted along with your other public assets.

To get a feel for how this all comes together, check out [this basic example app](https://github.com/enhance-dev/enhance-example-tailwind).

## Considerations

We want Enhance users to be successful first and foremost — and if success for you includes using libraries like Tailwind, that’s fine! With that said, we do feel [Enhance Styles](/docs/learn/concepts/styling/enhance-styles), our built in styling library, offers some significant advantages in comparison to Tailwind.

### Defaults and customization

Enhance Styles requires no configuration out of the box, which means developers can get up and running with sensible defaults and zero time spent on configuration. For individuals and teams looking for customizations, however, Enhance Styles’ [configuration interface](/docs/learn/concepts/styling/enhance-styles/customization) is easily approachable, but also offers a wealth of [customization options](https://github.com/enhance-dev/enhance-styles#customize) perfectly suited to teams working with nuanced design systems.

### Modern features

Enhance Styles supports a number of features not available in Tailwind, including:

- [Fluid, modular scales](/docs/learn/concepts/styling/enhance-styles/modular-scales) for typography and layout (to reduce the need for breakpoint scoped styles)
- Full [logical property support](/docs/learn/concepts/styling/enhance-styles/logical-properties) (to support all writing modes)
- Generation of CSS custom properties (for design systems and brand standards)

### Balance

Writing new CSS shouldn’t be scary. Enhance Styles strikes a balance between using utility CSS for global styles and writing new CSS rulesets when required by bespoke interfaces.

Our default utility stylesheet includes our full suite of utility classes (allowing for complete and rapid iteration directly in the browser, which is not supported by Tailwind), yet it weighs in at 11kb or less (depending on the type and level of compression used).

For styles outside the scope of our utility classes — such as unique interface elements — we recommend using [element styles](/docs/learn/concepts/styling/enhance-styles/element-styles), which will scope those styles to the reusable component in which they’re written.

Finally, should you wish to include additional global styles or classes, this can be accomplished via [global stylesheets](/docs/learn/features/transforms/style-transforms#scope%3Dglobal).

### Styleguide

Every new Enhance project ships with [a cribsheet](https://github.com/enhance-dev/enhance-styles-cribsheet) — a reference to all the utility classes defined in your project, which will autogenerate to include any customizations you may have made. This allows everyone on your team to quickly look up the exact classes (and their definitions) in use on your specific project.

## Summary

The benefits of utility focused CSS are myriad, ranging from performance to rapid iteration and beyond.

However, there was likely a time for any proponent of utility (or 'atomic', or 'functional') CSS where the very concept of writing styles in this manner seemed counterintuitive. For proponents of Tailwind, we suggest that — just like with utility CSS in general — the comparative benefit of Enhance Styles might only be felt after using it.

We believe Enhance Styles’ simpler setup and zero config default, its breadth of features, and its comparatively small surface area paired with its extremely high versatility is a winning combination, and we invite you to give it a try in your next Enhance project!

