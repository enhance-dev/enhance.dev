---
title: Using Sass
links:
  - "Example app": https://github.com/enhance-dev/enhance-example-sass
---

[Sass](https://sass-lang.com/) is a superset of CSS, meaning you can write CSS in Sass as well as leverage Sass’ own preprocessing features such as nesting, mixins, operators, and so on. For those looking to use Sass with Enhance, the following steps are the easiest way to get started:

1. Install the Sass node module (`npm install -D sass`)
2. Write some styles in Sass (using either the `.scss` or `.sass` syntax)
3. Run the Sass module on your source code, being sure to output the generated CSS to the public directory (`npx sass ./app/styles.scss ./public/styles.css`)
4. Add a `link` tag to [your project’s head component](/docs/conventions/head) to reference the generated styles (`<link rel="stylesheet" href="/_public/styles.css" />`), and optionally remove the Enhance Styles `linkTag` if you prefer

With this setup in place, your generated Sass styles will be deployed and fingerprinted along with your other public assets.

To get a feel for how this all comes together, check out [this basic example app](https://github.com/enhance-dev/enhance-example-sass).

## Considerations

While Sass was a popular choice for many years — and many existing websites still rely on it — we don’t find it to be the best choice for new projects where other options are available. Instead, we recommend using Enhance Styles, our built in styling library, which we believe offers a number of advantages over writing styles in Sass.

### No build step required

Enhance Styles is written in CSS, and thus requires no transpilation to be used in the browser. CSS has come an incredibly long way since the introduction of Sass, and now includes an upgraded version of Sass’ CSS variables in the form of [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), giving developers native access to what was arguably Sass’ most important feature. Just as jQuery inspired improvements in JavaScript, we think this is a great example of a third party library inspiring improvements in CSS.

Because Enhance Styles is written in plain CSS, this does mean authors don’t have access to other Sass features such as mixins, extends, or loops — but in fact, we view this as a benefit. Many of these abstractions provided by Sass can cause developers to unintentionally add significant bloat to their generated stylesheets, resulting in poor performance and degraded user experience. These abstractions can also make it harder to debug code when bugs pop up, as the code you write is not the same as the code being shipped to end users.

### Smaller CSS bundles, greater versatility

Enhance Styles’ default configuration weighs in at 11kb or less (depending on the type and level of compression used), yet offers an incredible wealth of versatility by exposing atomic, reusable CSS classes (also called utility classes) which can be used to style all manner of layouts and interface elements. Enhance Styles can also be [fully customized](/docs/enhance-styles/customization) in order to integrate with existing or new design systems.

For a more in depth look at why we prefer to write CSS using the atomic methodology, [check out our deep dive in this article](https://begin.com/blog/posts/2023-01-10-past-informs-the-present-our-approach-to-css).

### Maintainable scoped styles

Enhance also includes the ability to write [styles scoped to reusable components](/docs/enhance-styles/element-styles), eliminating the need for complex orchestrations of class names and selector hierarchies which Sass is frequently used to accomplish.

### Styleguide

Every new Enhance project ships with [a cribsheet](https://github.com/enhance-dev/enhance-styles-cribsheet) — a reference to all the utility classes defined in your project, which will autogenerate to include any customizations you may have made. This allows everyone on your team to quickly look up the exact classes (and their definitions) in use on your specific project.

## Summary

We believe Enhance Styles’ simpler setup and zero config default, its breadth of features, and its small surface area paired with its extremely high versatility is a winning combination, and we invite you to give it a try in your next Enhance project!

