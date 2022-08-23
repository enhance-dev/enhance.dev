---
title: Rendering
---


Enhance gives you the ability to write HTML pages comprised of custom elements authored as [single file components](/docs/learn/concepts/single-file-components) that get expanded on demand.

## Less tedium
Single file components are rendered on the server where Enhance does the tedious work of expanding custom elements as well as setting up your document for progressively enhancing components for dynamic render in the browser.

## Styles and scripts
Enhance processes your style tags moving them to the head of the document and also moves any script tags in your component to the bottom of the document. This is done via [transforms](/docs/learn/features/transforms/) which are extension points you can add for your project if need be.

## Load faster
Server side render is great for when you have mostly static content. Lots of components are not updated dynamically in the browser so Enhance dramatically cuts down on the JavaScript required for your app which speeds up page load significantly.

## Standards based reuse
Repeated markup authored as custom elements enables reuse but Enhance also adds special handling of `<slot>` elements following the [Web Component standard](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#adding_flexibility_with_slots). This powerful feature enables you to reuse layouts and components by substituting their internals while maintaining core functionality.

<doc-callout level="none" mark="✨">

**[Read more about custom element expansion →](/docs/learn/concepts/html/elements)**

</doc-callout>

<doc-callout level="none" mark="🎰">

**[Read more about `slot` handling →](/docs/learn/concepts/html/slots)**

</doc-callout>
