---
title: Styling
---

An important part of both user experience and developer experience is applying styles to your app.
There are a lot of solutions for approaching CSS, but very few that are designed for both the user and the developer in mind.

## Optimal styling

Enhance projects are set up in a way to enable developers to add styles without compromising user experience via slow load times or flash of unstyled content.
This is done by returning to first principles and thinking about what a developer could do by hand that would be both optimal and specific.

Enhance [single-file components](/docs/learn/concepts/single-file-components) allow you to co-locate your styles (using `<style>` tags) with your markup.
Enhance projects also come preconfigured with [a customizable utility class system](/docs/learn/concepts/styling/utility-classes).
This enables you to reuse utility classes without bloating your stylesheets for general styling while also use element styling for specific CSS that utility classes are not designed for.

## Utility classes

Utility classes (also referred to as ‘atomic classes’ or ‘functional classes’) are small, composable, single purpose classes which do one thing well. Enhance comes preloaded with Enhance Styles, a customizable and parametric suite of utility classes for working with nearly every aspect of styling. This approach lends itself extremely well to design systems, and a great experience for both users and developers.

<doc-callout level="none" mark="🖍️">

**[Read more about Enhance utility classes →](/docs/learn/concepts/styling/utility-classes)**

</doc-callout>

## Logical properties

Enhance Styles’ utility class system is built with logical properties in mind. These properties make it easy to compose styles that are resilient across multiple writing modes.

<doc-callout level="none" mark="🔀">

**[Read more about logical properties →](/docs/learn/concepts/styling/logical-properties)**

</doc-callout>

## Customization

Enhance Styles is built with parametric design systems in mind. A huge number of configurable options are available, with sensible defaults baked into all new projects.

<doc-callout level="none" mark="🎛️">

**[Read more about customization →](/docs/learn/concepts/styling/customization)**

</doc-callout>

## Modular scales

For styling typography and layouts, Enhance Styles’ fluid, modular scales reduce the amount of breakpoint specific code you need to write, while allowing these styles to scale gracefully across a wide range of viewports.

<doc-callout level="none" mark="📏">

**[Read more about modular scales→](/docs/learn/concepts/styling/modular-scales)**

</doc-callout>

## Element styles

Certain styles would not be appropriate as a utility class. For these cases, you can write specific styles using the `<style>` tag in your custom element. These styles will be scoped to the element they’re declared in (and its children), and can take advantage of Enhance Styles’ generated custom properties.

<doc-callout level="none" mark="🎨">

**[Read more about element styles →](/docs/learn/concepts/styling/element-styles)**

</doc-callout>
