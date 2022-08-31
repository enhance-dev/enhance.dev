---
title: Architect
---

Architect deploys Function Web Apps ([FWA](https://fwa.dev)) that are dynamic web applications composed entirely of [pure functions](https://en.wikipedia.org/wiki/Pure_function) to Amazon Web Services.

## Quickstart

Install the Architect CLI with npm: `npm i -g @architect/architect`. 

> 🔬 [Detailed instructions for setting up your AWS credentials.](https://arc.codes/docs/en/get-started/detailed-aws-setup)

### Generate a new project

```bash
npm create @enhance ./my-enhance-project
```

### Preview in your browser

```bash
cd my-enhance-project
npm install
npm start
```

### Deploy

```bash
arc deploy
```
