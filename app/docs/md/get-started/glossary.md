---
title: Glossary
links: # Further Reading
  - Functional Web Apps: https://fwa.dev
  - Architect: https://arc.codes
---

## General Terminology

### Progressive Enhancement

Progressive enhancement is a design philosophy that focuses on providing a baseline experience to all users, directly from the server, without any browser JavaScript.
This baseline experience is then enhanced by client-side features as the browser supports them.

### Single File Component (SFC)

A single file component is a component that is defined in a single file.
Enhance SFCs are called _Elements_ and reside in the `app/elements` directory.
The element's server-side and front-end (HTML, CSS, and JavaScript) code is defined in the same file.  
This is made possible by Enhance's built-in rendering engine.

### Scoped Styles

Scoped styles are styles that are scoped to a specific component.
This means that the styles will only apply to the component and its children.
Scoped styles are defined in the `<style>` tag of an element.

### Cloud Functions

Cloud functions are serverless functions. See [FWA](#functional-web-app-fwa) below.

## Technical Standards

### Web Component (WC)

A Web Component is a set of web platform APIs that allow you to define custom elements and their behavior, which can then be used in your web pages and web apps.
The APIs consist of Custom Elements, Shadow DOM, HTML Templates, and HTML Imports.

### Custom Elements

HTML Custom Elements are a sub-set of the Web Component standards that allow you to define custom HTML elements and their behavior.
Custom Elements do not require JavaScript and can be entirely rendered by the server.

### Shadow DOM

Shadow DOM is a sub-set of the Web Component standards that allow you to attach a set of DOM nodes to an element, and keep those DOM nodes separate from the main document DOM.
This lets you author code that is effectively private to the component.  
Enhance does not make use of Shadow DOM, but does not limit its usage in your components' browser code.

### ES Modules (ESM)

ES Modules refers to an ECMAScript standard for loading JavaScript modules.
They are the standard module format in JavaScript.
They are supported in all modern browsers and Node.js.  
Enhance uses the `.mjs` file extension to indicate to the Node.js runtime that the file is an ES Module.

### CommonJS (CJS)

CommonJS is a standard for loading JavaScript modules.
It is most common in Node.js environments.  
Enhance projects very rarely include CommonJS modules.

## Projects and Organizations

### [Functional Web App](https://fwa.dev/) (FWA)

> Functional Web App (FWA) is an architectural pattern for building web applications and APIs. It empowers developers with the flexibility of dynamic, full-stack applications 
paired with the ease of scaling a static website.
> 

Cloud functions (aka “serverless”) + managed database + deterministic deployment

### [Architect](https://arc.codes) (Arc)

An orchestration framework with strong conventions for building **Functional Web Apps**.
**Arc** offers many **FWA** primitives and has a robust plugin API.  
Architect apps target AWS for deployment.

### [Enhance](https://enhance.dev)

A build-less, HTML-first web application framework; implemented as an **Architect** plugin.
Enhance is mostly a web server that focuses on web standards (Web Components in particular), to enable powerful and accessible browser experiences.   
Enhance is an **Arc** plugin with its own conventions, driven by Arc authors solidifying how they build web apps into a framework.

### [Begin.com](https://begin.com)

Begin.com is a cloud provider, specialized in the deployment of **Architect** **FWA** projects with an emphasis on **Enhance**-powered applications.
