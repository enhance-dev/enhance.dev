---
title: "Air Quality App with Enhance"
image: "/_public/blog/post-assets/aqi-app.jpg"
image_alt: "A comic-style view of the AQI app on a smartphone."
category: enhance
description: "Use built-in Enhance features to fetch and cache air quality data from the US EPA to be displayed as HTML custom elements. All super fast!"
author: "Taylor Beseda"
avatar: "tbeseda.jpg"
mastodon: "@tbeseda@indieweb.social"
published: "July 12, 2023"
---

With wildfire season well upon us in North America, it’s a good idea to keep an eye on local air quality.
Let’s get some real time data from the US EPA’s [AirNow](https://www.airnow.gov/) program.
Even with a limited API request budget, we can get snappy results by caching and refreshing data on demand.
All with features already built into [Enhance](https://enhance.dev).

<p class="text-center">
  <a href="https://invent-k6b.begin.app/" target="_blank">Try the AQI app now.</a>
</p>

## AirNow API

```
https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&API_KEY=_SECRET_&zipCode=90210
```

That’s it, that’s the URL we’ll use to request the air quality index (AQI) for any given US zip code*.
We get back an array of one to three measurements if a weather station is found near the requested zip code.

```javascript
{
  AQI: 58,
  Category: {
    Name: 'Moderate',
    Number: 2,
  },
  DateObserved: '2023-06-08 ',
  HourObserved: 10,
  LocalTimeZone: 'MST',
  ParameterName: 'O3',
  ReportingArea: 'Denver-Boulder',
  StateCode: 'CO',
}
```

We’ll need to keep in mind that [this API limits us to 500 requests per hour](https://docs.airnowapi.org/faq#rateLimits), however the docs also let us know that most data points are updated once each hour.
So if our application caches its copy of that data for 15 min, we can query 125 unique zip codes each hour - probably a good start, at least until it goes viral 😉

*For simplicity, I’m sticking with US data, but international data is available.
I recommend checking out[ IQAir](https://api-docs.iqair.com/).

## Databases in Enhance Apps

To cache AQI info we’ll need to stash data in a database.
And it needs to be fast!

Enhance is built on top of [Architect](https://arc.codes) and comes with all of Arc’s superpowers for free.
These features (database access, scheduled functions, event queues, and more) are all opt-in and don’t bloat your deployed project.

The data layer is powered by DynamoDB from AWS, so it’s incredibly quick to set and get data for a page request.
Like, &lt;10ms fast.

The simplest way to start with database operations is to install [@begin/data](https://www.npmjs.com/package/@begin/data) (this library can be used with any Arc/Enhance app, even if you deploy to your own AWS account).

Here’s a sample of usage:

```javascript
import data from '@begin/data'

const table = 'pizza'

await data.set([ // save multiple pizzas at once
  {table, key: 'bbq-chkn', toppings: ['chicken', 'chz', 'bbq sauce']},
  {table, key: 'southwest', toppings: ['chilis', 'red onion', 'corn', 'chz']},
  {table, key: 'hawaiian', toppings: ['chz', 'ham', 'pineapple']},
])

const bestPizza = data.get({table, key: 'hawaiian'})

console.log(bestPizza.toppings.at(-1)) // 'pineapple'
```

## Cache API Requests

I’ve created a simple form component that GETs the /us route with a zip query parameter.
My Enhance API function will then lookup the most recent AQI data for that zip code.
But a visitor could refresh that page several times over the course of an hour, burning through my allotted AirNow API limit.

![AQI app form with single zip code field](/_public/blog/post-assets/aqi-app-form.png)

So when the data is fetched the first time, I’ll cache the response with a time-to-live (TTL) value of 15 min - AirNow’s data rarely changes for a given location more than once in an hour.
Then, when that user refreshes or someone else requests the same zip code, I’ll check the database first and only query the API if a record doesn’t exist for that zip.

<begin-code filename="/app/api/us.mjs">

```javascript
import data from '@begin/data'

const { AIRNOW_URL } = process.env
const table = 'aqi'

export async function get({ query: { zip } }) {
  if (!zip) return {} // just render the form

  const cacheKey = `zip:${zip}`

  let aqiData
  try {
    // first, check the cache
    const cached = await data.get({ table, key: cacheKey })

    if (cached?.aqiData) {
      aqiData = cached.aqiData // continue with data we have
    } else {
      // no cache, go get some data from AirNow
      const response = await fetch(AIRNOW_URL + `&zip=${zip}`)

      aqiData = await response.json()

      await data.set({ // cache the new data
        table,
        key: cacheKey,
        aqiData,
        ttl: Math.round(Date.now() / 1_000) + (60 * 15),
        // ↑ 15 minutes from now as seconds since epoch
      })
    }
  } catch (error) {
    return { status: 500 }
  }

  return { json: { aqiData } }
}
```

</begin-code>

Granted this doesn’t have much error handling, but it serves as a great example of how simple my API layer is here.

Now we can present this data in our views powered by server-rendered custom elements and browser-native web components! I won’t get into the specifics of creating SVG meters (inspired by [breathable.app](https://breathable.app)), but here’s what I worked up:

![Screenshot of the full AQI app interface](/_public/blog/post-assets/aqi-app-screenshot.png)

## Extended Example

In my full example I also grab a visitor’s likely zip code based on their IP address and serve that result from the index route.
Not only is the AQI data cached, but so is the zip code lookup since that service also has daily limits.

Interactive example here: [https://invent-k6b.begin.app/](https://invent-k6b.begin.app/)

And the source code: [https://github.com/enhance-dev/enhance-example-aqi](https://github.com/enhance-dev/enhance-example-aqi)

You can even see the range of meter values: [https://invent-k6b.begin.app/test](https://invent-k6b.begin.app/test)
