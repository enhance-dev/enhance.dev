---
title: Cribsheet
---

Most Enhance apps ship with a preconfigured, dynamic cribsheet to help you find the right Enhance Styles class for the job.

Just start your project (`npm start`) and navigate to `/_styleguide/cribsheet`. Here you'll be able to search through all the utility classes and custom properties available to your app. Any [customizations](/docs/enhance-styles/customization) you make to your styleguide will automatically be reflected in your cribsheet.

If you are [migrating from an Architect project](https://enhance.dev/cookbook/migrate-from-architect) to an Enhance project or you are starting with our [minimal template](https://github.com/enhance-dev/enhance-starter-project-minimal) then you will need to add the cribsheet to your project.

## Install Dependencies

First install the `@enhance/styles-cribsheet` package

```bash
npm install @enhance/styles-cribsheet
```

## Update Your `.arc` File

Next update your `.arc` file to load the cribsheet plugin.

<doc-code filename=".arc">

```diff
@app
your-app

@plugins
enhance/arc-plugin-enhance
+ enhance/styles-cribsheet
```

</doc-code>

Now, when you start your project (npm start) the `/_styleguide/cribsheet` route will be available.
