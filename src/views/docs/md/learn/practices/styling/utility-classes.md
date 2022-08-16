---
title: Utility classes
---

## General styling
[†](#footnote)Utility classes are an optimal way to apply general styling. They remove large amounts of duplication from your stylesheets and lend visual harmony to your sites.

## Styleguide
As a basis of styleguides utility classes are unparalleled in providing a usable system for developers and a cohesive appearance to your users.

## Ready to go
Enhance comes preconfigured with a [customizable utility class system](https://github.com/enhance-dev/enhance-styles). During development you can use the stylesheet found in `public/styles.css`. For production you can inline this stylesheet into the head of your document since utility class stylesheets tend to be tiny — around ~30k on disk and 9k over the wire.

## Usage
Apply utility classes to your element markup

```javascript
export default function MyParagraph({ html }) {
  return html`
<p class="font-serif p1 mb-1">
  <slot></slot>
</p>
  `
}
```

## Customize
It is possible to completely customize your project's utility classes. To do so you will need to do two things:
1. Add a `styleguide.json` file to the root of your project.  [ 📄 You can copy this one to get started →](https://raw.githubusercontent.com/enhance-dev/enhance-styles/main/config.json)
2. Edit your project's `.arc` file to tell it where to grab the config

Add these lines at the bottom of your `.arc` file in the root of your project.
```arc

@enhance-styles
config styleguide.json
```


<a id="footnote"></a>
<small>†Utility classes were invented by [Nicole Sullivan](https://twitter.com/stubbornella/status/1471213109767405568), extended by [Brad Frost](https://atomicdesign.bradfrost.com/), popularized by [Nicolas Gallagher](https://nicolasgallagher.com/about-html-semantics-front-end-architecture/), revolutionized by [Adam Morse](https://mrmrs.cc/writing/scalable-css) and monetized by [Adam Wathan](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)</small>
