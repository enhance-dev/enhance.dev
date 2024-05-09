---
title: Begin
---

[Begin](https://begin.com/) deploys Function Web Apps ([FWA](https://fwa.dev)) which are dynamic web applications composed entirely of [pure functions](https://en.wikipedia.org/wiki/Pure_function). Enhance on Begin gives you the ability to build a frontend completely in basic HTML, and browser native custom elements, and the backend completely in pure cloud functions. No messy build steps. No servers to scale or maintain.

## Quickstart

Install the Begin CLI by opening your terminal and entering the following command:

```bash
npm i --global @begin/deploy
```

### Generate a new project

```bash
npx "@enhance/cli@latest" new my-enhance-project
```

### Preview in your browser

```bash
cd my-enhance-project
npx enhance dev
```

### Add a new HTML page

```bash
npx enhance generate page --path hello/world
```
> Creates app/pages/hello/world.html

### Add a dynamic page

```bash
npx enhance generate page --path boom --type js
```
> Creates app/pages/boom.mjs

### Back that page with an API route

```bash
npx enhance generate api --path boom
```
> Creates `app/api/boom.mjs`

### Generate CRUDL routes

Create a real HTML form for CRUDL (create, read, update, destroy, and list) backed by DynamoDB.

```bash
npx enhance generate scaffold Cat name:string birthday:date email:email
```

### Log in

Create a Begin account by running the following command in your terminal, then following the instructions to authorize with GitHub.

```bash
npx begin login
```

### Deploy

Time to ship your brand new project to a fresh environment!

```bash
npx begin deploy
```

<doc-callout level="info" mark="📖">

Read more about how automating releases via [GitHub Actions](https://begin.com/deploy/docs/getting-started/github-actions).

</doc-callout>
