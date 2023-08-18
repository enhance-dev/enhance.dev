---
title: Using Tailwind
---

Tailwind is a popular utility CSS library. For those looking to use Tailwind with Enhance, simply follow Tailwind’s installation instructions using the Tailwind CLI, keeping the following in mind:
Your tailwind.config.js file’s content value should be set to: `["./app/**/*.{html,mjs}"]`
The path supplied to the Tailwind CLI’s output (-o) argument should reside in your project’s public folder
You’ll need to replace the code referencing Enhance Styles’ linkTag in your project’s head component with a link tag for your Tailwind styles (e.g.` <link rel="stylesheet" href="/_public/tailwind.css" />`)
With this setup in place, your generated Tailwind styles will be deployed and fingerprinted along with your other public assets.
To get a feel for how this all comes together, check out this basic example app.

## Considerations

We want Enhance users to be successful first and foremost — and if success for you necessitates using libraries like Tailwind, that’s fine! With that said, we do feel Tailwind offers some significant disadvantages in comparison to Enhance Styles, our built in styling library.
Build configuration
Tailwind requires a build configuration (tailwind.config.js) in order to work. This necessitates conceptual overhead and additional artefacts, which can slow down and muddle the development process. While this can offer versatility for teams looking to incorporate their design system, it can also hold back developers looking to get started as quickly as possible. Additionally, Tailwind’s configuration interface is exceptionally complex, and can occupy quite a lot of cognitive load to familiarize.
Enhance Styles also offers customization via configuration. However, no configuration is needed by default, which means developers can get up and running with styling with zero time spent on configuration. The configuration interface is also much more streamlined than Tailwind’s, yet still offers a wealth of customization perfectly suited to teams working with nuanced design systems.

## Unsupported features

Tailwind lacks support for a number of features available in Enhance Styles, including:
Full logical property support (to support all writing modes)
Fluid, modular scales for typography and layout (to reduce the need for breakpoint scoped styles)
If Tailwind does update to include these features in the future, it is likely these would be shipped as a breaking change, requiring rewrites of your existing code.

## Depth vs efficiency

Tailwind includes a massive amount of utility classes, arguably encompassing every possible style you might wish to write. This aligns with their concept of never having to leave your HTML to write styles, however this comes with a number of downsides:
Massive scope of classes can be difficult to internalize.
Ability to specify aribitrary values can lead to stylesheet bloat and divergence from design systems (or other design standards).
In order to keep CSS bundle sizes from exploding, Tailwind will generate only the classes used in your markup; however, this negates one of the best parts of utility based CSS libraries: the ability to iterate directly in the browser. Designers or other design adjacent team members are thus unable to explore permutations of interfaces using classes that have not already been used within your application.
Enhance Styles strikes a balance between using utility CSS for global styles and writing new CSS rulesets when required by bespoke interfaces.
Our default utility stylesheet includes our full suite of utility classes (allowing for rapid iteration in the browser), but weighs in at 11kb or less (depending on the type and level of compression used).
For styles outside the scope of our utility classes, we recommend using element styles, which will scope those styles to the component in which they’re written.
Finally, should you wish to include additional global styles or classes, this can be accomplished via global stylesheets.

## Styleguide

Every new Enhance project ships with a "cribsheet" — a reference to all the utility classes defined in your project, which will autogenerate to include any customizations you may have made. This allows everyone on your team to quickly look up the exact classes (and their definitions) in use on your specific project.

## Licensing

While Tailwind’s CSS library is licensed under an MIT open source license, their component library is a commercial product with somewhat amibigous variations, and is not open source.
Enhance Styles is (and will always be) a free and open source library, and our upcoming suite of web components will be as well. You’ll never have to double check if your project is in violation of our terms of use, nor will you need to hand over a dime in order to leverage our components.

## Summary

The benefits of utility focused CSS are myriad, ranging from performance to rapid iteration and beyond. However, there was likely a time for any proponent of utility (or 'atomic', or 'functional') CSS where the very concept of writing styles in this manner seemed counterintuitive. For proponents of Tailwind, we suggest that — just like with utility CSS in general — the comparative benefit of Enhance Styles might only be felt after using it.
We believe Enhance Styles’ simpler setup and zero config default, its breadth of features, and its comparatively small surface area paired with its extremely high versatility is a winning combination, and we invite you to give it a try in your next Enhance project!

