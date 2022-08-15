---
title: Styling
---

## Optimal styling
An important part of both user experience and developer experience is applying styles to your app. There are a lot of solutions for approaching `css`, but very few that are designed for both the user and the developer in mind. Enhance projects are set-up in a way to enable developers to add styles without compromising user experience via slow load times or flash of unstyled content. This is done by returning to first principles and thinking about what a developer could do by hand that would be both optimal and specific. Enhance [single file components](/docs/learn/concepts/single-file-components) allow you to co-locate your styles with your markup but enhance projects also come preconfigured with a customizable utility class system. This enables you to reuse [†](#footnote)utility classes without bloating your stylesheets for general styling but also use element styling for specific css that utility classes are not designed for.

## Utility classes
A quick look at utility classes in practice
```javascript
export default function MyParagraph({ html }) {
  return html`
<p class="font-serif p1 mb-1">
  <slot></slot>
</p>
  `
}
```
> [🖍  Read more about enhance utility classes →](/docs/learn/practices/styling/utility-classes)

## Element styles
An example of a specific style that would not be appropriate as a utility class
```javascript
export default function MyParagraph({ html }) {
  return html`
<style>
  :host {
    max-width: 5rem;
    min-width: 2rem;
  }
</style>
<p class="font-serif p1 mb-1">
  <slot></slot>
</p>
  `
}
```
> [🖌  Read more about element styles →](/docs/learn/practices/styling/element-styles)


<a id="footnote"></a>
<small>†Utility classes were invented by [Nicole Sullivan](https://twitter.com/stubbornella/status/1471213109767405568), extended by [Brad Frost](https://atomicdesign.bradfrost.com/), popularized by [Nicolas Gallagher](https://nicolasgallagher.com/about-html-semantics-front-end-architecture/), revolutionized by [Adam Morse](https://mrmrs.cc/writing/scalable-css) and monetized by [Adam Wathan](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)</small>
