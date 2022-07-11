# Why Enhance?

When we set out to build our first Functional Web Apps we reached for the "obvious" choice and went with a modern, compiler based, virtual DOM centric, JavaScript framework.

We quickly realized the limitations of this approach as we built beyond the “Hello World” examples and attempted instead to build a business.

As our app grew, so did the build times as well as the JavaScript payload. Breaking changes from constantly updating dependencies meant we were spending more time on the things that were not shipping and less time on the user-facing product.

Even though these frameworks seemed like they had an entire development solution, in practice we were still needing to cobble together multiple libraries in order to make an app of any significant size. This led to code in multiple module systems as well as domain specific languages. We found ourselves deep in transplier territory, managing multiple configuration files and a lot of boilerplate.

All the complexity made us long for a simpler time where anyone could just use HTML, CSS and a sprinkling of JavaScript to build whatever they needed.

We found ourselves looking more and more closely at the Web Components spec and started to figure out what we'd need to replace our ever-bloating framework code, with something built in harmony with the Web Platform.

Our goal was to enable everyone to build multi-page, dynamic, Functional Web Apps using just what comes with the browser and a little cloud function rendering to build applications of any scale.

We decided that if it was worth the time to do it, then we should do it right. So we came up some criteria for success:


1. No build step
2. Web Standards
3. Progressive enhancement
    

With enhance we start with working HTML then layer on enhancements in a way that lets you incrementally progress from prototype to production.
