---
title: Enhance Styles
---

An important part of both user experience and developer experience is applying styles to your app.
There are a lot of solutions for approaching CSS, but very few that are designed with both the end user and the developer in mind.

## Optimal styling

Enhance projects are set up in a way to enable developers to add styles without compromising user experience via slow load times or flash of unstyled content.
This is done by returning to first principles and thinking about what a developer could do by hand that would be both optimal and specific.

Enhance [single-file components](/docs/learn/concepts/single-file-components) allow you to co-locate your styles (using `<style>` tags) with your markup.
Enhance projects also come preconfigured with [a customizable utility class system](/docs/learn/concepts/styling/enhance-styles/utility-classes).
This enables you to reuse utility classes without bloating your stylesheets.

You are able to keep your styles [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) with reusable utility classes as well as apply specific element styles with a plain `<style>` tag.

## Utility classes

Utility classes (also referred to as ‘atomic classes’ or ‘functional classes’) are small, composable, single purpose classes which do one thing well. Enhance comes preloaded with Enhance Styles, a customizable and [parametric](https://en.wikipedia.org/wiki/Parametric_design) suite of utility classes for working with nearly every aspect of styling. This approach lends itself extremely well to design systems, and a great experience for both users and developers.

<doc-callout level="none" mark="🖍️">

**[Read more about Enhance utility classes →](/docs/learn/concepts/styling/enhance-styles/utility-classes)**

</doc-callout>

## Logical properties

Enhance Styles’ utility class system is built with logical properties in mind. These properties make it easy to compose styles that are resilient across multiple languages and writing modes.

<doc-callout level="none" mark="🔀">

**[Read more about logical properties →](/docs/learn/concepts/styling/enhance-styles/logical-properties)**

</doc-callout>

## Customization

Enhance Styles is built with [parametric design systems](https://en.wikipedia.org/wiki/Parametric_design) in mind. A huge number of configurable options are available, with sensible defaults baked into all new projects.

<doc-callout level="none" mark="🎛️">

**[Read more about customization →](/docs/learn/concepts/styling/enhance-styles/customization)**

</doc-callout>

## Modular scales

For styling typography and layouts, Enhance Styles’ fluid, modular scales reduce the amount of breakpoint specific code you need to write, while allowing these styles to scale gracefully across a wide range of viewports.

<doc-callout level="none" mark="📏">

**[Read more about modular scales→](/docs/learn/concepts/styling/enhance-styles/modular-scales)**

</doc-callout>

## Element styles

Certain styles are never reused so are not appropriate as a utility class. For these cases, you can write specific styles using the `<style>` tag in your custom element. These styles will be scoped to the element they’re declared in (and its children), and can take advantage of Enhance Styles’ generated custom properties.

<doc-callout level="none" mark="🎨">

**[Read more about element styles →](/docs/learn/concepts/styling/enhance-styles/element-styles)**

</doc-callout>

## Cribsheet

Every Enhance app ships with a preconfigured, dynamic cribsheet to help you find the right class for the job.

Just start your project (`npm start`) and navigate to `/_styleguide/cribsheet`. Here you'll be able to search through all the utility clases and custom properties available to your app. Any customizations you make to your styleguide will automatically be reflected in your cribsheet.

<doc-callout level="none" mark="🫠">

 Fun fact: cribsheet was originally called cheatsheet but we discovered while trying to publish the module that `npm` does not allow the publishing oof modules with the word cheatsheet in them. ( Except for the ones they do. )

</doc-callout>

