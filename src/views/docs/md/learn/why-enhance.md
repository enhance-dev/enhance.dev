---
title: Why Enhance?
---

Enhance came from our experience building a large Functional Web App. We first chose a modern JavaScript framework that brought more problems than it solved. Slowly unraveling that decision helped us find a better way.

From a first principles approach all we really wanted was a component system with life-cycle hooks. With the [Web Components spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components) this is now built right into the browser. The only thing lacking is a reasonable way to server render these components.

Our goal is to enable anyone to build multi-page dynamic web apps while staying as close to the platform as possible. Enhance fills in just a few gaps to make this experience as smooth as possible.

Our criteria for success are:

1. Author and deliver HTML pages

> Write components as [pure functions](https://en.wikipedia.org/wiki/Pure_function) that return HTML. Then we render them on the server to deliver working HTML.

2. Use generally available Web Standards

> Enhance takes care of the tedious parts, which allows you to more efficiently use the Web Platform standards that exist today. There may be standards to replace parts of enhance in the future, but we are building things now.

3. Progressively enhance working HTML

> We start with working HTML then layer on enhancements in a way that lets you incrementally progress from prototype to production.

Now we spend more time adding new features and less time chasing breaking changes from dependencies. Our app can grow without build times and JavaScript payloads growing fatter.

With full access to all the browsers APIs (like forms) there is no need to cobble together libraries to make a real app of any size.

No skeleton screens and loaders needed. No flash of unstyled content ( FOUC ) and layout shifts from JavaScript load time delays.

Using just HTML, CSS and a sprinkling of JavaScript we can build complex dynamic applications. Now we solve interesting problems instead of constantly looking for solutions to the problems that larger frameworks bring.

