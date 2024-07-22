---
title: "On the eleventh day of Enhancing: Environment Variables"
image: "/_public/blog/post-assets/piping.jpg"
category: enhance, webdev, webcomponents
description: "Setting environment variables to enable different behaviors in production."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "January 5, 2023"
---

![piping](/_public/blog/post-assets/piping.jpg)
<small>Original photo by [Samuel Regan-Asante](https://unsplash.com/@fkaregan) on [Unsplash](https://unsplash.com/s/photos/bagpipes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
</small>

Environment variables are key-value pairs that enable you to change the behavior of our application depending on the environment. Begin supports environment variables while doing local development and any of the deployed environments.

## Local environment variables

Let’s test our environment variables locally before we deploy the code that uses them to a staging or production environment. The quickest way to include an environment variable locally is to create a `.env` file at the root of your project. Let’s add a `DEBUGGING` environment variable to this file.

```
DEBUGGING=on
```

Now let’s use it in some code. Open `app/elements/my-footer.mjs` and update the code, so it looks like this:

```javascript
export default function Element ({ html, state }) {
 const showDebugInfo = process.env.DEBUGGING === 'on'
 return html`
<footer>
 ${ showDebugInfo ? `<pre>${JSON.stringify(state, null, 2)}</pre>` : ''}
</footer>`
}
```


We are reading the value of `DEBUGGING` from `process.env`. If the value is `on` we’ll show the debugging information. Otherwise, we’ll skip it. Open up [http://localhost:3333/about](http://localhost:3333/about) and you should see:

![debugging on](/_public/blog/post-assets/12-days/debugging-on.png)

Now, updated the `.env` file so `DEBUGGING` is off.

```
DEBUGGING=off
```

The [http://localhost:3333/about](http://localhost:3333/about) will automatically refresh and the debugging info is gone!

![debugging off](/_public/blog/post-assets/12-days/debugging-off.png)

## Remote environment variables

You can set up different environment variables for each of your deployed environments (see yesterday for instructions on creating environments). For our example, we are going to assume you have `staging` and `production` environments.

Let’s set our `DEBUGGING` environment variable to `on` for `staging` but `off` for `production`. In order to do that, execute the following commands:

```bash
begin env create --env staging --name DEBUGGING --value on
begin deploy --env staging
begin env create --env production --name DEBUGGING --value off
begin deploy --env production
```

Now if you go to your `staging` URL you will see the debugging information:

![debugging on](/_public/blog/post-assets/12-days/debugging-on.png)

But, if you got to your `production` URL you will not see the debugging information.

![debugging off](/_public/blog/post-assets/12-days/debugging-off.png)

## Next Steps

Speaking of debugging, how do we get the logs once we deploy to the cloud? Tune in tomorrow to find out.
