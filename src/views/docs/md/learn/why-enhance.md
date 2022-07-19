---
title: Why Enhance?
---

When we set out to build our first Functional Web Apps we reached for the "obvious" choice and went with a modern, compiler based, virtual DOM centric, JavaScript framework.

We quickly realized the limitations of this approach as we built beyond the “Hello World” examples and attempted instead to build a business.

As our app grew, so did the build times as well as the JavaScript payload. Breaking changes from constantly updating dependencies meant we were spending more time on the things that _were not_ shipping and less time on the user-facing product.

Even though these frameworks seemed like they had an entire development solution, in practice we were still needing to cobble together multiple libraries in order to make an app of any significant size. This led to code in multiple module systems as well as domain specific languages. We found ourselves deep in transplier territory, managing multiple configuration files and a lot of boilerplate.

The user experience was also impacted by using a client-side JavaScript dependent solution. We found ourselves needing to add skeleton screens and loaders even after spending a lot of time working through solutions for flash of unstyled content ( FOUC ) and layout shifts from the prolonged loading of the page due to the amount of JavaScript code needed. Not to mention having very little guidance on how to handle situations where the JavaScript didn't load correctly or was very delayed by slow connection speeds.

All this complexity made us wish we could just use HTML, CSS and a sprinkling of JavaScript to build applications, instead of constantly looking for solutions to the available solutions.

When we approached these needs from a first principles standpoint we came to the conclusion that the main thing we wanted from a framework was a component system with life-cycle hooks, which is now built directly into the browser following the [Web Components spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

Our goal was to enable everyone to build multi-page, dynamic, Functional Web Apps using just what comes with the browser and a little cloud function rendering to build applications of any scale.

We decided that if it was worth the time to do it, then we should do it right. So we came up some criteria for success:


1. Pure functions

> Same input should return the same output.

2. Should only use generally available Web Standards

> Enhance takes care of the tedious parts, which allows you to more efficiently use the Web Platform standards that exist today. There may be standards to replace parts of enhance in the future, but we are building things now.

3. Should progressively enhance working HTML

> With enhance we start with working HTML then layer on enhancements in a way that lets you incrementally progress from prototype to production.
