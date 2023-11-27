---
title: State
---

State is a core concept in many modern web frameworks, allowing you to request, modify, and write data to both your server and your UI.

Being a full stack framework, Enhance comes with a methodology for working with state out of the box — all the way from your database and your user’s session to their browser.

If you’re coming to Enhance from another web framework, you may find our concept and implementation of state to be a little different from what you’re used to. This is actually good news, however: by learning to work with state in Enhance, you’re leveling up to working with state on the web platform itself — and you’ll be able to carry this knowledge and skillset forward throughout your career.

## The problem

State management has grown to become a massive, complex topic in the last decade, primarily due to the way many modern frameworks approach data synchronization and [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) updates. This has lead to a number of challenging outcomes for web developers:

1. Complex, nuanced code is often required in order to synchronize data between the server and the client, and to keep this data from diverging.
2. Multiple libraries and APIs (often bespoke to the framework in use) are required to process network calls, database updates, and state synchronization, and to reconcile virtual DOMs with the real DOM.
3. Developers frequently need to relearn these libraries and APIs as they evolve, leading to time lost to refactoring.
4. When moving on to new projects, many developers find the knowledge they accrued in items 1–3 needs to be modified or scrapped, due to differences in frameworks or methodologies adopted by other developers.

If this cycle sounds familiar to you, you’re not alone. We’ve experienced these pain points too — which is why Enhance helps you advance to using powerful, performant, standards based methodologies for working with state — all via patterns that will last as long as the web does.

## State: the Enhance way

As a full stack framework, Enhance emphasizes server side rendering by default — with no opt-in or extra work required. Because of this, Enhance applications sidestep much of the complexity in state synchronization inherent to so many other web frameworks.

Virtual DOMs, meanwhile, exist to solve problems that Enhance applications avoid out of the box — and through surgical DOM updates via progressive enhancement. Without the need for a virtual DOM, developers no longer need to be wary of leveraging platform native APIs for reading and updating state. This unlocks massive performance gains and application resiliency which would be impossible to realize when working with the abstractions of frameworks that run ‘further from the metal’.

Every Enhance element has optional access to Enhance’s state object, made available through the Enhance element function signature:

<doc-code filename="app/elements/my-element.mjs">

```javascript
export default function MyElement ({ html, state }) {
  const { attrs, store } = state
  // …
}
```

</doc-code>

The state object contains four top level keys:

- `attrs`, which contains all the key value pairs of attributes passed into your custom element’s instance
- `store`, which contains the global state of your Enhance application
- `instanceID`, which is a unique ID per instance of Custom Element
- `context`, which is an Object that can be used to pass state to child elements to avoid prop drilling

These keys allow you to work with both basic and complex state in powerful ways without the need for complex abstractions or third party libraries.

<doc-callout level="none" mark="✏️">

**[Learn about using attributes for basic state](/docs/elements/state/attributes)**

</doc-callout>


<doc-callout level="none" mark="🎛️">

**[Learn about using the store for complex state](/docs/elements/state/store)**

</doc-callout>

