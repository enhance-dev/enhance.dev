---
title: "Tested: Database Providers on Lambda"
image: "/_public/blog/post-assets/lambda-cloud-comic-sketch_ai.jpeg"
image_alt: "Comic book-style clouds with an AWS Lambda logo"
category: architect
description: "Third party database providers speed-tested on AWS Lambda. Compare performance with DynamoDB in real time with our sample application."
author: "Taylor Beseda"
avatar: "tbeseda.jpg"
mastodon: "@tbeseda@indieweb.social"
published: "June 6, 2023"
---

The last couple years have seen the rise of third party database providers, Database as a Service (DBaaS).
Instead of hosting your database on the same box as your primary application server, developers can use an external db host.
Often called "serverless" databases, these offerings offload the responsibility of maintaining a database appliance.
Providers also often offer useful dashboards, data browsing, branching, schema versioning, and more.

## Selecting a Database

When adding a data layer to any application, choosing a database type, engine, and, now, provider is an important choice.

### Database Paradigm + Speed

Probably the most important factor when choosing a database is deciding on "relational" tables like SQL or "document" storage, often called NoSQL.
But for this experiment, we'll set that aside and focus on the second most important consideration: access speed.

Specifically, we'll look at how fast the simplest queries are from a Lambda (deployed to AWS with the vanilla Node.js runtime) to various third party db vendors.

## The Tests

I've created an [Architect](https://arc.codes) application (hosted on Begin) that's made up of several functions: one for testing each provider and one to provide a web view of embedded `<iframes>` with the results of each.

Each test implementation performs essentially the same query:

```sql
SELECT * FROM things
```

The code and more technical explanation is available on [the actual test page](https://awaken-un3.begin.app/):

![sample data](/_public/blog/post-assets/dbaas-sample.png)

### Sampled Speeds

| Provider | Driver | Approx. Query Time |
|---|---|---|
| [Neon](https://neon.tech) <sup>1</sup> | `postgres` | 300ms |
| | `@neondatabase/serverless` | 100ms |
| [Supabase](https://supabase.com) <sup>2</sup> | `postgres` | 450ms |
| | REST API via `fetch` | <mark>25</mark> - 375ms |
| [PlanetScale](https://planetscale.com) | `mysql2` | 125ms |
| | `@planetscale/database` | <mark>25</mark> - 150ms |
| [MongoDB](https://mongodb.com) | `mongodb` | 725ms |
| [DynamoDB](https://aws.amazon.com/dynamodb/) | `@architect/functions` | <mark>10ms</mark> |

<sup>1</sup> This does not include the cold start.
The "wake" time can exceed 5s (5,000ms), but once active is 0.
Neon is in early access and is working on various (paid) ways to manage this penalty.

<sup>2</sup> Supabase's `@supabase/supabase-js` was not tested as it requires a build step on install (my CD environment, Lambda, doesn't have node-gyp).
I expect it would perform similarly to their REST API.

### Regional Differences

The above sampling is for tests where the database provider is _always_ in a different US region from the Lambdas that connect to them.
The only provider sharing a region with the Lambda is Dynamo since both resources will naturally be created in the same AWS region.

**All providers get a significant speed boost** when in the same region as your Lambda and using the "native" driver.

<deploy-docs-callout level="tip">

For example, when both Lambda and Supabase are in `us-east-1`, the same query with `postgres` takes ~50ms: 9x faster 🔥

</deploy-docs-callout>

(Limited tests were conducted in shared regions but are not demonstrated live.)

### Considerations

These tests do not:

- attempt to pool or keep-alive connections
- snapshot results or track variance over time
- test subsequent queries
- use a large dataset or a variety of DB operations
- thoroughly consider resource regions

## Conclusions

Not surprisingly, AWS's own DynamoDB is the fastest way to query data from a Lambda-based application.
Its repeatable 10ms query latency is 2.5 times better than the closest competitor's best results.
We acknowledge that it may be intimidating to get started with a NoSQL database, and that's why we provide [`@begin/data`](https://www.npmjs.com/package/@begin/data) as an abstraction layer on top of DynamoDB.
For folks who want to learn more about DynamoDB we recommend [Alex DeBrie's The DynamoDB Book](https://www.dynamodbbook.com/).

That said, all tested provider queries are less than half a second (except MongoDB - however, their paid tiers do reach that 500ms threshold)!

Ultimately any database is better than no database.
Don't be paralyzed or resort to throwing the kitchen sink at the problem. Pick one and get to building the initial implementation.
