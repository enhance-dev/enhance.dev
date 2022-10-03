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
begin new project --path ./my-enhance-project
```

### Preview in your browser

```bash
cd my-enhance-project
begin dev
```

### Add a new HTML page

```bash
begin new page --path hello/world
```
> Creates app/pages/hello/world.html

### Add a dynamic page

```bash
begin new page --path boom --type js
```
> Creates app/pages/boom.mjs

### Back that page with an API route

```bash
begin new api --path boom
```
> Creates app/api/boom.mjs

### Generate CRUDL routes

Create a real HTML form for CRUDL (create, read, update, destroy, and list) backed by DynamoDB.

```bash
begin generate scaffold Cat name:string birthday:date email:email
```

### Deploy

```bash
begin deploy
```
