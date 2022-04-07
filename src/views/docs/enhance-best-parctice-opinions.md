# Web Components: The Good Parts

## Web Components in a nutshell
1. Behavior: Custom Elements with lifecycle hooks
    The custom element lifecycle hooks allow behavior to be attached to a component
2. Templating: `<template>` and `<slot>`
3. Encapsulation: ShadowDOM
   a. CSS hooks: `:host`, `::slotted`, `::part`

## A subset
Enhance supports the whole platform specification for custom elements and web components. What is lacking from the specification is a way to server render these components to avoid FOUC or opt to not use the shadowDOM if desired. Enhance adds this behavior by server rendering markup that behaves as users intend even prior to the custom element 
