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
This enables you to reuse utility classes without bloating your stylesheets for general styling while also use element styling for specific css that utility classes are not designed for.

## Utility classes

A quick look at applying utility classes.  
These classes are general and adhere to a system.

```javascript
export default function MyParagraph({ html }) {
  return html`
    <p class="font-serif text1 p1 mb-1">
      <slot></slot>
    </p>
  `
}
```

<doc-callout level="none" mark="🖍️">

**[Read more about Enhance utility classes →](/docs/learn/concepts/styling/utility-classes)**

</doc-callout>

## Element styles

An example of a specific style that would not be appropriate as a utility class.

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

<doc-callout level="none" mark="🎨">

**[Read more about element styles →](/docs/learn/concepts/styling/element-styles)**

</doc-callout>
