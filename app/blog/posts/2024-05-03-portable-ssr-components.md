---
title: "Portable Server Rendered Web Components with Enhance SSR"
image: '/_public/blog/post-assets/axol-and-wordpress.png'
image_alt: "Enhance logo and Wordpress logo"
category: ssr, wasm
description: " Developers want to build sites with custom components, companies want to reuse those components on all their sites, users want those sites to be fast, and everyone wants them to be stable."
author: 'Ryan Bethel'
avatar: 'ryanbethel.png'
mastodon: "@ryanbethel@indieweb.social"
published: "May 3, 2024"
---



## TL;DR

Developers want to build sites with custom components, companies want to reuse those components on all their sites, users want those sites to be fast, and everyone wants them to be stable. Achieving all of these goals is difficult. Is there even a way to create components that are language and framework agnostic, server rendered by default, and as stable as the web platform itself?

[Enhance.dev](https://enhance.dev) proves this is possible. Enhance is an HTML-first framework for server rendering web components. Originally written in JavaScript, it was recently ported to other languages using WASM. I will share more of the technical details of the WASM version in a later post. This post focuses on why you should care about portable server rendered web components.


## Basic Example

Portable server rendered web components start with HTML, using Custom Elements as components — like this:



<begin-code filename="authored Page index.html">

```html
<my-heading heading="Home"></my-heading>
<my-footer>Content</my-footer>
```

</begin-code>


Those components are then defined as a pure function of state, which returns HTML — for example, using JavaScript:


<begin-code filename="component my-heading.mjs">

```javascript
export default myHeading({html,state}){
  return html`<h1>${state.attrs.heading || "Default"}</h1>`
}
```

</begin-code>

Alternatively, these functions can be defined in any other language, like PHP:

<begin-code filename="component my-heading.php">

```php
<?php
function my_heading($state) {
  $heading = $state["attrs"]["heading"] ?? "Default";
  return "<h1>{$heading}</h1>"
}
```

</begin-code>

Or even by using a templating engine, like Mustache:

<begin-code filename="component my-heading.mustache">

```html
<h1>{{attrs.heading}}</h1>
```

</begin-code>

Some components (like this footer) can be written as plain HTML:

<begin-code filename="component my-footer.html">

```html
<div><slot>Default Heading</slot></div>
```

</begin-code>

When delivering an HTML page in response to a network request, those authored custom elements are expanded on the server using the component functions to produce the resulting HTML:

<begin-code filename="rendered page index.html">

```html
<my-heading heading="Home"><h1>Home</h1></my-heading>
<my-footer><div>Content</div></my-footer>
```

</begin-code>


This may all look too simple to be useful, but it’s this simplicity that makes this approach so flexible. HTML is the exchange format, and HTML can be used anywhere. And `<style>` and `<script>` tags are also HTML, so the component definition can include its own styling and behavior.

<begin-code filename="component my-footer.html">

```html
<style> my-footer {color: blue;} </style>
<div><slot>Default Heading</slot></div>
<script>/* client-side JavaScript */; customElements.define('my-footer', MyFooter)</script>
```

</begin-code>


This is not hypothetical. And it’s not limited to trivial examples. We have a [showcase](http://enhance.dev/showcase) full of dynamic sites using this approach.

We also have open-source [repositories ](https://github.com/enhance-dev/enhance-ssr-php)in almost a dozen languages and frameworks that work. Most of these repositories use a WASM [implementation](https://github.com/enhance-dev/enhance-ssr-wasm) that can be leveraged by any language. The PHP implementation has been rewritten in native PHP to work better for environments like WordPress. Beyond the code itself, anyone could adopt this [general approach](#how-does-it-work).


## Goals

Enhance's portable server rendered web components are designed to achieve the following goals:

1. **Build with components:**
    Building with custom components was not always easy on the web. Frameworks like React brought this to the forefront, but at the cost of reducing performance and increasing complexity. Custom Elements brought a native component model to the web, but without server-side rendering.
2. **Server-side render (SSR) by default:**
    With React and other JavaScript heavy frameworks, loading spinners and skeleton screens are the norm. But the best practice when authoring web pages is still to deliver working HTML from the server. It can then be enhanced with client-side JavaScript, but it should be usable from the start.
3. **As stable as the web platform itself:**
    The closer this approach tracks with or uses the platform itself, the more stable it will be. The web (especially HTML) has focused on stability from its inception. Old sites should continue to work and only require updates to add new features. Instead, sites built with modern frameworks rot faster than a ripe banana.
4. **Language and framework agnostic:**
    JavaScript gets most of the attention on social media, but Ruby, PHP, and Python are the web's workhorses. JavaScript frameworks sometimes cheat SSR by creating a whole DOM on the server to model event listeners, etc. This is complicated, error-prone, and slow. It also rules out solutions that work for other languages. A shared set of components can't depend on running DOM APIs on the server.


## How does it work?

The algorithm `enhance-ssr` uses to expand custom elements on the server is relatively simple. Enhance leverages the platform for as much as possible, only filling the gaps on the server that the platform does not address. The portability and simplicity come from constraints on component definitions. Other web component frameworks allow querySelectors and event listener code in their render functions. Then rendering requires a working DOM, or lots of polyfills.

Enhance’s approach is summarized below. Anyone is free to copy it. It would be nice to give a nod to the [Enhance.dev](https://enhance.dev/) team in the spirit of open source, but these ideas are free to use.

It works like this:

* **Components are standard Custom Elements.** The platform gives us this for free, and with it a unique tag name to identify each component. This means both authored and expanded pages are valid HTML.
* **Components are defined as a pure function of state that returns plain HTML.** This state can include data from the server and attribute values on the component. Components can even be written as plain HTML if they don't depend on state (other than attributes and children).
* **Attributes are strings only.** This is how HTML works. Sticking to string attributes avoids many problems created by JSX-like solutions. There are other ways to pass complex data if needed.
* **Light DOM by default.** Shadow DOM is supported but not required. Using the light DOM by default means everything (including `<form>`s) works as expected.
* **Slots are used with light DOM on the server.** In the browser, slots are only allowed in the Shadow DOM. The server is not the browser. The slots used on the server in component definitions are replaced by content before sending the document to the browser. And you can still use slots with the shadow DOM in the browser. Both work with this approach.
* **Styles in components are lifted to the head, deduplicated, and scoped to just the component.** Styles that relate to components are written as a style tag with the component. They are then scoped to the component and lifted to the head when rendered.
* **Scripts in components are collected and moved to the bottom of the body.** The client-side behavior is scoped to the component with <code>[customElements.define()](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define)</code>.

## Enhance SSR in action — with WordPress

WordPress is the ideal challenge for portable server rendered web components. WordPress has been around for over 20 years and [it powers more websites than any other platform on the web](https://www.wpzoom.com/blog/wordpress-statistics/). It promises backward compatibility, and it is the Swiss army knife of CMS's. You can write classic templates as `.php` files, block templates as `.html` files, WYSIWYG content in the new block editor, and custom HTML snippets in text boxes all through the admin backend. To be a general purpose tool for WordPress, this solution must be very flexible.

As an extra challenge, most WordPress hosting providers will not allow installing the native [Extism](https://extism.org) binary that the WASM version of `enhance-ssr` depends on (more about the awesome [Extism](https://extism.org/) project and other runtimes in the next blog post). To get around this blocker, `enhance-ssr` needed to be rewritten in native PHP.

Enhance SSR is (in my biased opinion) an impressive piece of software — not because of its imposing size or complexity, but because of its simplicity. It implements the [component expansion algorithm](#how-does-it-work) in under 500 lines of code with only a few dependencies (all credit to Kristofer Joseph(@kristoferjoseph@indieweb.social) as the original creator). This simplicity made it possible to compile Enhance SSR to [WASM](https://github.com/enhance-dev/enhance-ssr-wasm) in order to support other languages, and to rewrite it in native PHP. Both the WASM and PHP versions are packaged [together here](https://github.com/enhance-dev/enhance-ssr-php). They can be installed using PHP’s Composer package manager with `composer require enhance-dev/ssr`.


## The WordPress plugin

Server rendering WordPress content is demonstrated in the example below. It has also been wrapped into a WordPress plugin with some examples at [github.com/enhance-dev/enhance-wordpress-plugin](https://github.com/enhance-dev/enhance-wordpress-plugin).  Because pre and post expansion everything is valid HTML, it uses pre rendered content everywhere inside the CMS, and all the HTML passes through the renderer as a final step.

<begin-code filename="enhance-wordpress-plugin.php">

```php
<?php
use Enhance\Enhancer;
use Enhance\Elements;
use Enhance\ShadyStyles;

function start_output_buffering() {
	$elementPath  = __DIR__ . '/elements';
	$elements     = new Elements( $elementPath );
	$scopeMyStyle = new ShadyStyles();
	$enhance      = new Enhancer(
		array(
			'elements'        => $elements,
			'initialState'    => array(),
			'styleTransforms' => array(
                      array( $scopeMyStyle, 'styleTransform' )
                  ),
			'enhancedAttr'    => true,
			'bodyContent'     => false,
		)
	);

	ob_start(
		function ( $buffer ) use ( $enhance ) {
			return $enhance->ssr( $buffer );
		}
	);
}

add_action( 'template_redirect', 'start_output_buffering' );
```
</begin-code>


## Example: the Alert component

This example uses an `e-alert` component that creates dismissible messages. It is adapted from the [M- Components](https://m-docs.org) (a cool project I highly recommend). The `e-alert` component shown here includes component styles, slotted light DOM content, state in the form of attributes, another nested component, and client side JavaScript to handle the dismiss behavior. By authoring only `<e-alert type=success>A Message</e-alert>` everything else comes from the server side render.

<begin-code filename="elements/e-alert.php">

```php
<?php
function EAlert( $state ) {
	$attrs             = $state['attrs'] ?? array();
	$dismissible       = $attrs['dismissible'] !== 'false';
	$type              = $attrs['type'] ?? '';
	$alert             = $type === 'warn' || $type === 'error';
	$dismissibleButton = $dismissible ? '<e-button type=remove aria-label="Dismiss Alert" ></e-button>'
		: '';
	return <<<HTMLDOC
    <style scope="global">
	  e-alert {
	   /* .... Other styles omitted */*
	      &[type="success"] {
	          background-color: var(--e-color-green-1);
	      }
	  }
    </style>

    <slot></slot>
    {$dismissibleButton}

    <script type="module">
      class EAlert extends HTMLElement {
        constructor() {
          super();
          this.dismiss = this.dismiss.bind(this);
        }

        connectedCallback() {
          if (this.getAttribute("dismissible") !== "false") {
            const dismissBtn = this.querySelector("e-button[type=remove]");
            dismissBtn.addEventListener("click", () => this.dismiss());
            this.append(dismissBtn);
          }
        }

        static get observedAttributes() {
          return ["autodismiss"];
        }

        attributeChangedCallback(name, oldVal, newVal) {
          if (name === "autodismiss") {
            const seconds = newVal ? parseInt(newVal) * 1000 : 4000;
            setTimeout(() => this.dismiss(), seconds);
          }
        }

        dismiss() {
          this.dispatchEvent(new CustomEvent("dismiss"));
          this.remove();
        }
      }
      customElements.define("e-alert", EAlert);
    </script>
HTMLDOC;
}
```

</begin-code>


## Components that truly work everywhere

We can use the `e-alert` component in pages and post templates:

<begin-code filename="enhance-page-template.php">

```php
<?php
/* Template Name: Enhance Page Template */
?>
<?php get_header(); ?>
<e-container>
  <e-alert type="success">Your flight has been canceled.</e-alert>
</e-container>

<!-- Other Content -->

<?php get_footer(); ?>
```

</begin-code>

We can also use it in HTML snippets in the Admin panel:



![html snippet in a wordpress text box](/_public/blog/post-assets/portable-ssr-components/html-snippet.png)


We can even use it as custom blocks in the WordPress editor:



![custom gutenburg block menu with enhance element icons](/_public/blog/post-assets/portable-ssr-components/block-editor-menu.png)


When we view the source on the post, we see that our components have been server-side rendered with the expanded content. The styles have been moved to a style tag in the head, and the script defining the custom element behavior is in a script tag at the bottom of the page. All this is from the single file component definition. You can check it out yourself with this deployed example: [enhancessr.wpcomstaging.com/](https://enhancessr.wpcomstaging.com/).





![view source of expanded e-alert element](/_public/blog/post-assets/portable-ssr-components/e-alert-view-source.png)



## Headless WordPress

WordPress is a popular choice as a headless CMS. Users add content to the WordPress editor, and developers build the frontend using their chosen framework. The biggest hurdle to this use case is that — by default — the CMS stores posts and pages as many small HTML snippets stitched together. This means that when developers request a post through the REST API, it returns the content as HTML. That is not ideal if you want full control of how the site is rendered on the frontend. But with custom elements as an intermediate representation, you get back HTML representing the authored HTML. The component definitions are then used to SSR the site with the other frontend pieces. Check out an example REST API response here: [https://enhancessr.wpcomstaging.com/wp-json/wp/v2/posts/26](https://enhancessr.wpcomstaging.com/wp-json/wp/v2/posts/26). In the lines below, the `content` property shows the e-alert.





![Wordpress Rest API showing chunk of html for an e-alert element](/_public/blog/post-assets/portable-ssr-components/e-alert-from-rest-api.png)



## Try it

You can try the WordPress plugin yourself today by cloning the contents of the plugin repository ([github.com/enhance-dev/enhance-wordpress-plugin](http://github.com/enhance-dev/enhance-wordpress-plugin](https://github.com/enhance-dev/enhance-wordpress-plugin))) into the plugin directory for any WordPress site. Once the plugin is activated, you can add the `e-alert` and a few other components in the block editor or anywhere in your WordPress site.


## “You can't build Photoshop that way” — and other common objections



* **“You can't build complicated sites with this.”** This post is focused on portability, server rendering, and stability, which heavy JavaScript frameworks struggle to do. There are many ways to progressively enhance from there. We believe it is possible, even preferred, to build complex sites this way, but that is not the focus of this post.
* **“Slots are not allowed in the light DOM.”** The server is not the browser. Slots are replaced with their content before they are sent to the browser. When components with slots are server rendered, only valid HTML is sent to the browser. And of course you are free to use slots in the shadow DOM if needed.
* **“String attributes are too limiting for complex data.“** This is how HTML works. Following this constraint avoids the uncanny valley of React/JSX Props that look like HTML, but are not. This maintains a clear distinction between HTML attributes and JavaScript properties. There are plenty of ways to handle complex data and to link attributes to properties, but that is beyond the scope of this blog post.
