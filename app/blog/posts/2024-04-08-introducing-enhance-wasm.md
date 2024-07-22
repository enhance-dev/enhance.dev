---
title: "Introducing Enhance WASM"
image: '/_public/blog/post-assets/enhance-wasm-splash.png'
image_alt: "The image is a playful, cloud-themed illustration featuring logos of various programming languages and frameworks, such as Django, .NET, Go, Java, Node.js, PHP, Python, Ruby on Rails, R, and WordPress. In the center, a cute, winged mascot is pulling a banner that says EVERY SERVER, ANY LANGUAGE suggesting a platform or service that supports multiple programming languages across different server environments. The background is a light blue sky with fluffy clouds, adding to the airy, cloud computing motif."
category: enhance
description: "Say hello to Enhance WASM — backend agnostic server-side rendering for web components."
author: "Brian LeRoux"
avatar: "brian.jpg"
mastodon: "@brianleroux@indieweb.social"
published: "April 8, 2024"
---

## Backend agnostic server-side rendering (SSR) for Web Components

Web Components are the browser native way to extend HTML. But as a primarily browser based technology they are defined with JavaScript which limits them to either rendering solely client side — which has janky performance, poor SEO, and is not optimally accessible — or within a server-side JavaScript runtime, which isn’t always an option for shops that use other backend runtimes.

**[Enhance WASM](https://enhance.dev/wasm)** unlocks **server-side rendering Web Components** for any backend runtime.


* **Write Once, Render Anywhere**: Author standard web components and deploy them with any backend. **[Enhance WASM](https://enhance.dev/wasm)** takes care of rendering across any server environment.
* **Seamless Integration**: Easily integrate **[Enhance WASM](https://enhance.dev/wasm)** into your existing projects with minimal setup. Extensive documentation, high quality baseline components, and broad community support make adoption a breeze.
* **Better DX**: Stop wasting time on slow build steps and reimplementing brittle frontend code that already works. Web standards ensure rock solid reliability and performance without rewrites.
* **Performance Optimized**: No more spinners or skeleton screens. Enjoy faster load times and improved SEO. Your users get a snappy experience, and you get better developer velocity.

We really believe this is a leapfrog moment for frontend development. Server-side rendering is a key requirement for personalized web applications. Organizations that prioritize the stability, performance and accessibility of web standards run workloads in a huge variety of backend runtimes. **Now we can build browser native web interfaces that cross the runtime chasm.**


## Try it out and get involved!

Enhance is completely open source code and we need your help! We’re opening up Enhance WASM immediately with support for **[Node](https://github.com/enhance-dev/enhance-ssr)**, **[Deno](https://github.com/enhance-dev/enhance-ssr-deno)**, **[Python](https://github.com/enhance-dev/enhance-ssr-python)**, **[Ruby](https://github.com/enhance-dev/enhance-ssr-ruby)**, **[PHP](https://github.com/enhance-dev/enhance-ssr-php)**, **[Java](https://github.com/enhance-dev/enhance-ssr-java)**, **[C#](https://github.com/enhance-dev/enhance-ssr-c-sharp)**, **[Rust](https://github.com/enhance-dev/enhance-ssr-rust)**, and **[Go](https://github.com/enhance-dev/enhance-ssr-go)**. We need your help testing and implementing support for these and other runtimes! If you want to see a runtime not mentioned here [please let us know](https://github.com/enhance-dev/enhance-ssr/issues).

Example starter projects:

* [Node](https://enhance.dev/docs/)
* [Deno](https://github.com/enhance-dev/enhance-ssr-deno)
* [Python](https://github.com/enhance-dev/enhance-ssr-python)
* [Ruby on Rails](https://github.com/enhance-dev/enhance-ssr-ruby-on-rails)
* [PHP with Wordpress](https://github.com/enhance-dev/enhance-wordpress-plugin)
* [Java ](https://github.com/enhance-dev/enhance-ssr-java)


## FAQ

_How are components authored?_

Components are authored exactly per the Web Components specification. Enhance WASM also enables a more backend oriented pure functional style and has several helper libraries for making common client-side patterns cleaner.

_Do I need to run client JS to render components?_

No. Web Components are completely rendered server-side HTML. You can then optionally run client-side upgrades should the element need it. It is worth noting we’ve found the majority of elements only need to be server rendered and do not require any client javascript at all.

_Can I use client-side JS with these components?_

Of course!

_What about Lit?_

We definitely hear community folk when they say, “just use Lit”, but per the Lit documentation their own SSR renderer isn’t production ready today, and even then is Node.js only. Lit is ultimately more focused on client-side upgrade than server-side usage which is totally cool! Enhance encourages SSR and “HTML first” and treats the client-side element upgrade as a progressive enhancement step. You can use Enhance to render initial HTML and Lit for client-side interactions if that makes sense for your project. We find most elements are not client-side interactive anyhow.
