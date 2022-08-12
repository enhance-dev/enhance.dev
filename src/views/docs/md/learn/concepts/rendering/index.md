---
title: Rendering
---


Enhance gives you the ability to write HTML pages comprised of custom elements authored as [single file components](/docs/learn/concepts/single-file-components) that get expanded on demand.

Single file components are rendered on the server where enhance does the tedious work of expanding custom elements as well as setting up your document for progressively enhancing components to dynamic render in the browser.

Enhance processes your style tags moving them to the head of the document and also moves any script tags in your component to the bottom of the document.

Initial server render is great for when you have mostly static content. Lots of components are not updated dynamically in the browser so enhance dramatically cuts down on the JavaScript required for your app. Repeated markup authored as custom elements enables reuse but enhance also adds special handling of `<slot>` elements following the [web component spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#adding_flexibility_with_slots). This powerful feature enables you to reuse layouts and components by substituting their internals while maintaining core functionality.

> ✨[Read more about `slot` handling here](http://localhost:3333/docs/learn/concepts/rendering/slots)

