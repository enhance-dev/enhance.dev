---
title: Begin
---

[Begin](https://begin.com/) deploys Function Web Apps ([FWA](https://fwa.dev)) which are dynamic web applications composed entirely of [pure functions](https://en.wikipedia.org/wiki/Pure_function). Enhance on Begin gives you the ability to build a frontend completely in basic HTML, and browser native custom elements, and the backend completely in pure cloud functions. No messy build steps. No servers to scale or maintain.

## Quickstart

Install the Begin CLI by opening your terminal and entering the following command:

- Mac, Linux: `curl -sS https://dl.begin.com/install.sh | sh`
  - Then follow the printed instructions to add Begin to your `$PATH`.
- Windows: `iwr https://dl.begin.com/install.ps1 -useb | iex`

### Generate a new project

```bash
begin new my-enhance-project
```

### Preview in your browser

```bash
cd my-enhance-project
begin dev
```

### Add a new HTML page

```bash
begin generate page --path hello/world
```
> Creates app/pages/hello/world.html

### Add a dynamic page

```bash
begin generate page --path boom --type js
```
> Creates app/pages/boom.mjs

### Back that page with an API route

```bash
begin generate api --path boom
```
> Creates `app/api/boom.mjs`

### Generate CRUDL routes

Create a real HTML form for CRUDL (create, read, update, destroy, and list) backed by DynamoDB.

```bash
begin generate scaffold Cat name:string birthday:date email:email
```

### Deploy

<doc-callout level="caution" mark="🛠️">

The new version of Begin is under active development and not yet generally available.
Account registration and `deploy` features will not work.
In the meantime, you can still use the `begin` CLI, `dev` Sandbox, and generators.

Sign up for early access at [Begin.com](https://begin.com).

</doc-callout>

```bash
begin deploy
```
