---
title: TodoMVC Tutorial
---

A Choose Your Own Adventure tutorial for building a to-do list web app.


## Introduction

In recent years, recommended approaches to web development have fractured along many lines.
One of these fissures is between HTML First and JavaScript First approaches.
JavaScript First means that JavaScript is the primary means of building all the features and functions of the app.
With this approach HTML is more of a compile target.

HTML First means that the app is built to work with HTML and CSS as much as possible. It can then be enhanced with a little JavaScript as needed.

Both approaches can be successful depending on your goals.
The path taken is usually a result of comfort and experience with the tools required.
The tag line for Enhance is “An HTML First Framework”.
However, Enhance can work with either approach.
It was designed to enable HTML First where other frameworks make that approach difficult.


This tutorial will show how to build the same app (a todo list) with both approaches using Enhance.
If you are coming from a primarily JavaScript framework first, you can follow that path to better leverage your experience and comfort.
Or you can follow the HTML First path to maximize performance and resilience from the start.



## Todo MVC feature overview

The [TodoMVC](https://todomvc.com/) project was started as a way to compare frontend frameworks.
It is a simple to-do app that was written as a reference design.
It has been implemented in most popular frameworks.
The design is dated, and the features are limited.
But it allows for the comparison of frameworks by keeping those aspects similar.
The project has a specification [here](https://github.com/tastejs/todomvc/blob/master/app-spec.md) for reference.
The Enhance version tries to follow as closely as possible, only deviating in a few instances to highlight Enhance patterns that are improved over other frameworks (i.e., the HTML structure is changed to allow the app to work without JavaScript enabled).

### Features
The following features are from the [Todo MVC Specification Functionality](https://github.com/tastejs/todomvc/blob/master/app-spec.md#functionality).
There are slight variations from the specification where Enhance has better built in options for features like persistence.

* **No todos**:
   * When there are no todos, #main and #footer should be hidden.
*  **New todo**:
   * New todos are entered in the input at the top of the app. The input element should be focused when the page is loaded, preferably by using the autofocus input attribute. Pressing Enter creates the todo, appends it to the todo list, and clears the input. Make sure to .trim() the input and then check that it's not empty before creating a new todo.
*  **Mark all as complete**:
   * This checkbox toggles all the todos to the same state as itself. Make sure to clear the checked state after the "Clear completed" button is clicked. The "Mark all as complete" checkbox should also be updated when single todo items are checked/unchecked. Eg. When all the todos are checked it should also get checked.
*  **Item**:
   * A todo item has three possible interactions:
     1. Clicking the checkbox marks the todo as complete by updating its completed value and toggling the class completed on its parent `<li>`
     2. Double-clicking the `<label>` activates editing mode, by toggling the .editing class on its `<li>`
     3. Hovering over the todo shows the remove button (.destroy)
* **Editing**:
  * When editing mode is activated it will hide the other controls and bring forward an input that contains the todo title, which should be focused (.focus()). The edit should be saved on both blur and enter, and the editing class should be removed. Make sure to .trim() the input and then check that it's not empty. If it's empty the todo should instead be destroyed. If escape is pressed during the edit, the edit state should be left and any changes be discarded.
* **Counter**:
  * Displays the number of active todos in a pluralized form. Make sure the number is wrapped by a `<strong>` tag. Also make sure to pluralize the item word correctly: 0 items, 1 item, 2 items. Example: 2 items left
* **Clear completed button**:
  * Removes completed todos when clicked. Should be hidden when there are no completed todos.
* **Persistence**: Handled by Enhance's build in database.
* **Routing**: Handled by Enhance's server routing.


## Get Started & Development Server

First, let's create an app and get oriented to the [Enhance project structure](https://enhance.dev/docs/conventions/structure).
Create a starting app with the following command:

```bash
npx "@enhance/cli@latest" new ./enhance-todo -y`
```

This new project now has a boilerplate page in `/app/pages/index.mjs`.


Next make sure that all the project dependencies are updated by running

```bash
npm install
```

To start the Enhance development server you can use the Enhance CLI with `npx enhance dev`, or you can use the shortcut setup in the starter project with `npm start`.
Once started your project is served at `http://localhost:3333`.
Load that page into your browser to view your project.
This server has built in live reload so that changes to most of the project files and configuration will trigger the browser to reload immediately.


Before moving on lets briefly talk about the structure of Enhance apps and what goes in the app folder.


## Enhance Project Structure

Enhance projects are set up to enable you to create dynamic multi-page applications with as little friction as possible.
They come preconfigured with everything you need to work with file-based routing and standards-based components.
Most of the code goes in the app folder.



```
app
├── api ............... data routes
│   └── index.mjs
├── browser ........... browser JavaScript
│   └── index.mjs
├── components ........ single file web components
│   └── my-card.mjs
├── elements .......... custom element pure functions
│   └── my-header.mjs
├── pages ............. file-based routing
│   └── index.html
└── head.mjs .......... custom <head> component

```

* **Head**: The head.mjs file is for customizing your document’s `<head>` tag.
* **Pages**: The pages folder enables file-based routing. To add a route just add an HTML file to this directory (or another directory within it). The name of the file will be the URL you view it at. For example, `app/pages/about.html` will be viewed at `/about`.
* **Elements**: The elements folder is where you keep your [Enhance Elements](/docs/elements). These are custom element templates that get rendered server side and set your HTML page up for progressive enhancement.
* **Components**: The components folder is where you keep your [single file web components](/docs/components). These components are rendered server-side, but also include client-side code for additional interactivity. This allows you to add progressive enhancements to your component in one file.
* **API**: The api folder is preconfigured to expose data to your file-based routes. For example, the file `app/api/index.mjs` will automatically pass state to `app/pages/index.mjs` as well as expose an endpoint for standard REST verbs like GET and POST.
* **Browser**: The browser folder is preconfigured to output a bundle to be used when progressively enhancing your pages in the browser. Files in `app/browser` are bundled to `/public/browser/`.

For more details on these folders and the structure of an Enhance application refer to [Enhance Project Structure](/docs/conventions/structure).


## API Routes and Data Layer
To handle the persistence of tasks for the todo app we need a server with API routes and a database. 
The original Todo MVC app was entirely client side, built as a single page app with tasks saved to local storage.
We could build a similar SPA with Enhance, but using the full power of Enhance we can do better.

Lets build a full CRUD (Create Read Update Delete) API for our tasks.
The tasks we need a description, completion status, created time, and a key or id to reference it in the database.
The JSON representation of this might look something like:


```json
{
  "task": "Wash the Car",
  "completed": false,
  "created": "2024-01-01T13:51:50.417-07:00",
  "key": "Mqx159x7U"
}
```

### Enhance API Routes
Enhance API routes respond to HTTP requests for data (usually JSON, or any other mime-type).
These api routes are in `/app/api` and they follow the file based routing.
[**File based routing**](/docs/routing/api-routes) means all named files in these folders respond to requests that match their path (i.e. http://example.com/right/here would be handled by `/app/api/right/here.mjs` and `/app/pages/right/here.html`).

These API files also provide a way to pass data on to the HTML render function where the data will be combined with markup before responding.
If an HTTP request has an `Accept` header for the mime-type `application/json` the data returned from the api function in the `json` property will be returned directly.
If the request has an `Accept` header with the mime-type `text/html` the data returned from the api is passed to the page rendering function (described later).

For API paths and path parts that need to respond to a range of requests Enhance uses the "$there.mjs" convention to create [**Dynamic Routes**](/docs/routing/dynamic-routes).
Any path part that starts with a $ is dynamic and can respond to any string in that part.
If two dollar signs are used (i.e. `/app/api/right/$$.mjs`) then it will match anything for the rest of the path.

For our tasks API we will use the following routes to handle CRUD operations:

**Routes**
  * `/` (root) 
    * GET - List of all tasks
  * `/todos` 
    * POST - Create new tasks
  * `/todos/$id` 
    * GET - Read task details by `id`
    * POST - Update task
  * `/todos/$id/delete` 
    * POST - Delete task


> Why do we have a POST `/todos/$id/delete` route instead of a DELETE `/todos/$id` route? 
> It is because browsers only support GET and POST and we want to be able to support non-JavaScript use cases with our forms.


Lets start by creating the route handler for the list of all tasks served from the `/`(root) path.
This handler is named `index.mjs` and located at `/app/api/index.mjs`.
Copy the following code to that file:

```javascript
// /app/api/index.mjs

export async function get (req) {
  let todos = [
    {
      "task": "Wash the Car",
      "completed": false,
      "created": "2024-01-01T13:51:50.417-07:00",
      "key": "Mqx159x7U"
    }
  ]

  return {
    json: { todos }
  }
}

```

This file handles GET requests requests so the exported function is called `get`.
If we start the developement server (`npm start`) and navigate to `https://localhost:3333` we see the JSON output for our list of tasks.

Instead of a static list of tasks we want to store them in out database.
The code to read to and from the database would result in duplication across multiple api files so lets build a data access layer to group those functions.

### Database and Data Access
Every Enhance app comes with its own database.
It's batteries included with no overhead.
`@begin/data` is just a thin wrapper around DynamoDB which is an incredibly fast, truly serverless database.

The following code is a basic data access layer for CRUD operations.
It is similar to what the Enhance CLI will scaffold for you if you use the [CRUD Generator](/docs/deployment/begin#generate-crudl-routes).

You can copy and paste it into `/app/models/todos.mjs`. 
It uses the `@begin/data` wrapper and exports methods for all the CRUD operation.

```javascript

import data from '@begin/data'
import { validator } from '@begin/validator'
import { Todo } from './schemas/todo.mjs'

const deleteTodo = async function (key) {
  await data.destroy({ table: 'todos', key })
  return { key }
}

const upsertTodo = async function (todo) {
  return data.set({ table: 'todos', ...todo })
}

const getTodo = async function (key) {
  return data.get({ table: 'todos', key })
}

const getTodos = async function () {
  const databasePageResults = await data.page({
    table: 'todos',
    limit: 25
  })

  let todos = []
  for await (let databasePageResult of databasePageResults) {
    for (let todo of databasePageResult) {
      delete todo.table
      todos.push(todo)
    }
  }

  return todos
}

const validateTodo = {
  shared (req) {
    return validator(req, Todo)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, todo: data } : { todo: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, todo: data } : { todo: data }
  }
}

export {
  deleteTodo,
  getTodo,
  getTodos,
  upsertTodo,
  validateTodo
}
```

This code also uses the `@begin/validator` to do server side validation of data.
The Todo MVC does not focus on validating data so we will not include it in this tutorial, but for a real app it's a critical requirement (for reference see [Problems Loop](/docs/patterns/form-validation)).
On thing that the validator does for us and the reason we use it here is to convert data into the format for the server. 

HTML forms (which we will use for our app) send data as string values. 
The data fields in our sample task include completed status and created.
These will be sent by the browser as strings so we need to know how to convert them. 

To do this we can build a simple schema for a task and then our validator will use that schema to know how to coerce them into the correct type.
The schema file is shown below stored in `/app/models/schema/todo.mjs`. It follows the [JSON schema](https://json-schema.org/) standard.


```json

export const Todo = {
  "id": "Todo",
  "type": "object",
  "properties": {
    "task": {
      "type": "string"
    },
    "completed": {
      "type": "boolean"
    },
    "created": {
      "type": "string",
      "format": "date-time"
    },
    "key": {
      "type": "string"
    }
  }
}
```

### Finishing API Routes


Now using our data access layer we can write the next api route to create new tasks.
Copy and paste the following code to `/app/api/todos.mjs`.


```javascript
// `/app/api/todos.mjs`

import { upsertTodo, validateTodo } from '../models/todos.mjs'

export async function post (req) {

  if (!req.body?.created) {
    req.body.created = new Date().toISOString()
  }

  let { todo } = await validateTodo.create(req)

  const result = await upsertTodo(todo)
  return {
    json: { todo: result },
    location: '/'
  }
}
```

In this case we create tasks with a POST request so the handler is exported as a post function.
We import the upsertTodo and validateTodo functions.
Validate will convert the data and then upsert is used to create and update tasks.

Notice this post function returns an object with a `json` property and a `location` property. 
If the HTTP request is for `application/json` data the `todo` that was created is returned.
But if the request was for `text/html` then the `location` property causes a 302 redirect to `/` to be sent. 
This will cause the browser to redirect back to the root to show the updated list of tasks.

The `index.mjs` handler we built first retured only static data. 
Update it with the following to serve the list of tasks from the database.

```javascript
// /app/api/index.mjs

import { getTodos } from '../models/todos.mjs'

export async function get (req) {
  let todos = await getTodos()

  return {
    json: { todos }
  }
}
```

To handle updating tasks we need an api at `/app/api/todos/$id.mjs`.
Copy the following code to that file.

```javascript
// `/app/api/todos/$id.mjs`.

import { getTodo, upsertTodo, validateTodo } from '../../models/todos.mjs'

export async function post(req) {
  const id = req.pathParameters?.id

  let { todo } = await validateTodo.update(req)

  const result = await upsertTodo({ key: id, ...todo })
  return {
    json: { todo: result },
    location: '/'
  }
}

```

This route uses the `pathParameter` to get the `id` from the dynamic path variable.

Finally, to delete tasks we need a `/app/api/todos/$id/delete.mjs`.
Copy and paste the code below into the delete handler.

```javascript

import { deleteTodo } from '../../../models/todos.mjs'

export async function post (req) {
  const id = req.pathParameters?.id

  let todo = await deleteTodo(id)
  return {
    json: { todo },
    location: '/'
  }
}
```

Now we have all the basic API features ready to build the Todo App.



## App Structure

Following the reference design of Todo MVC we will structure the app similarly.
Start by making an HTML page in `/app/pages/index.html` as a shell for the app.
Add the following markup there:

```html
<todo-app>
  <todo-header slot="header"></todo-header>
  <todo-list slot="list"></todo-list>
  <todo-footer slot="footer"></todo-footer>
</todo-app>
<todo-app-footer></todo-app-footer>
```

This will be the roadmap for breaking up the sections of the app into components.
There will be six components in total (5 of which are shown here).


* `<todo-app>` Is a container for the dynamic pieces of the app.
* `<todo-header>` Has the input for adding new items to the todo list.
* `<todo-list>` Is the list of todos consisting of item components.
* `<todo-item>` Is the task itself with buttons to mark them as complete, update or delete them.
* `<todo-footer>` Has controls to filter active or completed items from the list as well as to delete all completed items.
* `<todo-app-footer>` Attribution links and other instructions.

![todo MVC outline](/img/docs/todomvc-outline.png)


## Styles

Design and styling is not the main focus of this tutorial.
For information on Enhance styling best practice refer to [Enhance Styles/](/docs/enhance-styles/.).
This tutorial uses styles from the TodoMVC project with minor changes.
The CSS from TodoMVC will be broken into sections and scoped to each component above following recommended Enhance patterns.
Some changes are made to accommodate the HTML structure needed to function without JavaScript as much as possible.

To start, we will copy some of the styles from the Todo MVC project into the static asset.
Copy the CSS in https://github.com/enhance-dev/todo-mvc/blob/main/public/index.css to the public folder at `/public/styles.css`.


## Static Assets: Public folder → /_public/ route

Static assets like images, scripts, and the CSS file above are required for most web application.
Enhance handles fingerprinting and serving assets from the root public directory via the convenient `/_public` route.

These assets are dropped in your Enhance project’s public folder.
They can be organized with any sort of directory structure you’d like.


```
.
├── app/ ............... dynamic app features
└── public ............. static assets
    └── styles.css
```


Asset can then be accessed from anywhere by adding `/_public/` to the beginning of the URL route.
For this project we will add a link in the `<head>` pointing to `styles.css`:

```html
<link rel="stylesheet" href="/_public/styles.css">
```

### Note: Automatic “fingerprinting”

File “fingerprinting” is giving static files a unique filename based on that file’s contents.
Typically this uses a computational hash of that file’s content as part of the name.
`logo.png` becomes `logo-cd94b3594d.png`.
Under the hood, Enhance will dynamically fingerprint each static asset based on its contents.
As a developer, you don’t need to worry about creating hashed file names, keeping a reference to each file’s actual name on disk, etc.
Enhance (via [Architect](https://arc.codes/)) will create and track fingerprinted files for you.
When your project code uses the `/public` route to reference files, Enhance will help update references with the fingerprinted filename wherever they are used.

For more information on the Public folder and static assets in general refer to the docs [Public (Static Assets)](https://enhance.dev/docs/conventions/public).


## Head

Now that we have our CSS in the static assets public folder we need to add the `<link>` to reference it into the head.
We mentioned in a previous section that the `head.mjs` file is in the `/app/` folder.
Lets look at how to customize it by adding our link.


The `<head>` tag is a very important point of customization for your app, allowing you to add things like a page titles, favicons, social/Open Graph metadata, etc.
However, the `<head>` tag cannot be written as a custom element (or an enhance component), and it can’t contain other custom elements.
This is because, as defined by the HTML spec, only a subset of existing HTML tags are permitted in the `<head>` tag.
As Custom Elements are elements which are defined by HTML authors, they are not included in this subset of permitted tags.

Enhance projects come with a default Head component to get you started, but we expect you’ll need to make changes to it.
By default, we include [a meta tag for character encoding](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset), [a viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag), an empty [document title element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title), a default favicon, and the [Enhance Styles utility class system](https://enhance.dev/docs/enhance-styles).

The default `head.mjs` boilerplate is shown below.



```javascript
// /app/head.mjs
import { getStyles }  from '@enhance/arc-plugin-styles'
const { linkTag } = getStyles

export default function Head () {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title></title>
      ${linkTag()}
      <link rel="icon" href="/_public/favicon.svg">
    </head>
`
}
```


We will override it by removing the first two lines of code that add the Enhance styles (since we are using todoMVC styles instead).
Then we will replace the `${linkTag()}` line in the middle with the link tag to our styles CSS file: `<link rel="stylesheet" href="/_public/styles.css">`.
For more information on the head refer to the docs, [Head](https://enhance.dev/docs/conventions/head).


## Choose Your Own Adventure

With the server side API routes and data access layer created and the shell of the app defined it is now time to choose which path to take in this adventure.
If you want to follow the HTML First path continue reading the next paragraph.
But if you would like to follow the JavaScript First approach jump ahead to the paragraph by that name.




## HTML First

With the skeleton HTML page for our app already created lets build the components needed.
These components are built as custom elements using the Enhance `elements` folder.
Copy and paste the following code into the `/app/elements/todo-app.html` file.
The file name (todo-app.html) will use this code as a server rendered custom element with the HTML in this file rendered.
Notice that the style tag with CSS for the todo app is included here.
Enhance will add scoping to these styles so they only target the instance of `todo-app` and then this style tag will be hoisted to the head so that the styles will be loaded prior to the page rendering.



```html
<!-- /app/elements/todo-app.html -->
<section class="todoapp">
  <slot name="header"></slot>
  <slot name="list"></slot>
  <slot name="footer"></slot>
</section>
```

### Enhance Elements
This is the first "Enhance Element" in this project.
Elements are the reusable building blocks of your Enhance application.
They are pure functions authored as single-file components and can be static or update dynamically to state changes.
Elements live in the `app/elements/` folder in the Enhance starter project.

These elements use the platforms "custom element" API to create components that can be reused anywhere in our app.
We will look at adding dynamic client side capabilities to these elements later.
But in this case we just have HTML, CSS and composability with slots.

With this element created we can use it in any page by adding `<todo-app></todo-app>`.
We already did this with our `index.html` page.
Now this element will expand into that component when a page is rendered.
* When naming these custom elements they must contain a "-" to distinguish them from regular HTML elements.
* By specification these custom elements cannot be used as self closing tags so the full opening and closing tag is required.

For more information on how Elements refer to the documentation on [Elements](/docs/elements).


### Slots
To add composability to these elements we can use both attributes and slots.
With HTML the `<slot>` element is generally for use in the shadow DOM.
The Shadow DOM is a platform API that creates an isolated DOM inside an element that encapsulates styles (and more).
It is best to avoid using the shadow DOM unless strong isolation is required.
Enhance will server render the slotted content in place of these.
This allows for composition of components using the convenience of slots without having to use the shadow DOM.
For more information on how Enhance uses slots refer to the documentation on [Enhance Slots](/docs/elements/html/slots).

Looking at `app/pages/index.html` we can see the authored use of the `<todo-app>` element.
Any child elements with a `slot="header"` attribute will be rendered where the element has the `<slot name="header"></slot>`.
In this way we can pass children to the component and control what the output markup looks like.

```html
<todo-app>
  <todo-header slot="header"></todo-header>
  <todo-list slot="list"></todo-list>
  <todo-footer slot="footer"></todo-footer>
</todo-app>
<todo-app-footer></todo-app-footer>
```



## Header component
Now that we have the todo-app component that serves as the container for the app we will fill in the dynamic components with the required features.
The first of these is the `todo-header`.
This component has the input form for adding new tasks to the list.
To begin copy and paste the following code to `/app/elements/todo-header.mjs`.
As mentioned previously the CSS here is taken from the reference app for consistent design.

The markup has an `h1` and a form with a single input.
The form posts to `/todos`.
This is the endpoint we generated to create new tasks.
This form will rely implicit submission.
After entering a new task the user only needs to hit enter to submit this task.


```javascript
// /app/elements/todo-header.mjs
export default TodoHeader({html}){
return html`
  <header class="header">
    <h1>todos</h1>
    <form action="/todos" method="POST">
      <input autofocus="autofocus" autocomplete="off" placeholder="What needs to be done?" name="task" class="new-todo">
    </form>
  </header>
  `
  }
```

Note that this component is fully functional with no additional JavaScript.
So far the HTML First approach is going well.
A simple form tag and input tag and we have a large chunk of functionality.

## HTML First and Forms First
Forms are the best method for sending data from a browser to the server.
They have been around almost as long as the web itself.
For a long time they were the only way.
With JavaScript Frameworks the `<form>` has fallen out of fashion.
Most frameworks scrap forms in favor of bespoke libraries to send data to the server in some other way.

With the HTML first approach we will lean heavily on forms.
This will result in more bulletproof interaction, faster development, and less code.


## List and Item Components
Now we need to create the list of tasks.
Following our app structure laid out earlier this requires two components.
We will build them together since they relate closely to each other.

Unlike the header component that has static markup with a form, these components are dynamic.
The contents depends on what tasks are in the database.
This introduces the need for state dependent elements.

### Passing State to Elements
Every Enhance element has optional access to Enhance’s state object, made available through the Enhance element `state` property.
The state object contains four top level keys:

*  `attrs`, which contains all the key value pairs of attributes passed into your custom element’s instance
*  `store`, which contains the global state of your Enhance application
*  `instanceID`, which is a unique ID per instance of Custom Element
*  `context`, which is an Object that can be used to pass state to child elements to avoid prop drilling

For more details refer to [State](/docs/elements/state) in the docs.

For our list element we will use the `store` and then the item will also use `attrs` (attributes).

First lets start with the todo item.
Copy and paste the following into `/app/elements/todo-list.mjs`.

For now we will omit the styles because they are taken directly from the reference app and they will get in the way initially.
Following our pattern of using forms first this item is made of two forms. The first form allows editing existing items.
The second form allows deleting items.

Attributes are the primary element API of the web platform so we use them for the todo item.
One important caveat is that attributes are always strings.
This means boolean attributes (i.e. completed) and numbers (not used in this component) will both become strings in the `attrs` object.
For more details refer to [Attributes](/docs/elements/state/attributes) in the docs.
The state of the `completed` attribute for the item results in the `checked` attribute being added to the completed checkbox.


```javascript
// /app/elements/todo-item.mjs

export default function TodoItem({html,state}){
    const { attrs = {} } = state
    const { completed = '', key = '', task = '' } = attrs
    const checked = completed === 'true' ? 'checked' : ''

    return html`
<div class="view">
  <form  action="/todos/${key}" class=" update-todo " method="POST" >
    <button class="edit-task hidden" type=submit >update</button>
    <input class="hidden toggle" name="completed" type="checkbox" ${checked} >
    <button class="set-complete" type=submit formaction="/todos/${key}?toggle" aria-label="toggle complete"></button>
    <input type="text" name="task" value="${task}" class="edit" >
    <input type="hidden" name="key" value="${key}">
  </form>

  <form class="delete-todo" action="/todos/${key}/delete" method="POST" >
    <input type="hidden" name="key" value="${key}">
    <button class="destroy"></button>
  </form>
</div>
  `
  }
```

The delete form posts to the delete route and the edit form submits to the edit route by the form action attribute.
But notice that the edit form has two submit buttons.

Since we are building this form to work without JavaScript as much as possible there is one feature that is slightly challenging.
We can edit the task description and submit the form by hitting enter.
This does an implicit submit updating the description.
To toggle the completed state of the form we need to update the checkbox and then submit.
This is two actions.
We can do it with one action by using a feature of form submission.
We can add another submit button that changes the action of the form.
This is the second button in the first form.
We add the `?toggle` query string to the end of the formaction attribute.
When this button is used it submits the form with this new path.
We will also need to update the post function on the server to respond to this.
In order for the implicit submit of the form to stay the same we need to add a hidden submit button with the default submit action above our new submit.
Implicit submit will use the first submit button in the form.

To handle the `toggle` query parameter add the following lines to the `/app/api/todos/$id.mjs` inside the top of the post function.
If the toggle parameter is present the completed flag is switched.

```javascript
  const toggle = req.query.hasOwnProperty('toggle')
  const body = { ...req.body }
  body.completed = toggle ? !body.completed : body.completed
```

The line of code that validates the task should use this modified body property instead of the passed body as follows.

```javascript
let { todo } = await validate.update({ ...req, body })
```


Now we have items that display, edit and delete todos.
Next we need a list item to add these items.
Copy and paste the following into `/app/elements/todo-list.mjs`.


```javascript
// /app/element/todo-list.mjs

export default function TodoList({html,state}){
    const { store ={}} = state
    const { todos =[]} = store

    const display = todos.length ? 'block' : 'none'

    const listItems = todos.map(todo => `
      <li id="${todo.key}" >
      <todo-item class="todo" key="${todo.key}" completed="${todo.completed}" task="${todo.task}"></todo-item>
      </li>
      `).join('')

return html`

<section class="main" style="display: ${display};">
  <form action="/todos/toggle" method="POST">
    <button id="toggle-all" type="submit" class="toggle-all"></button>
    <label for="toggle-all">Mark all as complete</label>
  </form>
  <ul class="todo-list">
    ${listItems}
  </ul>
</section>
`}
```

This component uses the store to get the list of tasks and adds them to a `<ul>` list wrapped in `<li>`'s.
In addition the list adds another form to handle the mark all as complete functionality.
This form submits to a `/todos/toggle` post api route that does not yet exist.
Add that api route to `/app/api/todos/toggle.mjs` by coping the following code to that file.

```javascript
// /app/api/todos/toggle.mjs
import { upsertTodo, getTodos } from '../../models/todos.mjs'

export async function post (req) {

  let todos = await getTodos()
  let active = todos.filter(todo=>!todo.completed)
  let completed = todos.filter(todo=>todo.completed)

  if (active.length > 0) {
    await Promise.all(active.map(todo=>upsertTodo({...todo, completed: true})))
  } else {
    await Promise.all(completed.map(todo=>upsertTodo({...todo, completed: false})))
  }

  todos = await getTodos()
  active = todos.filter(todo => !todo.completed)
  completed = todos.filter(todo => todo.completed)

  return {
    json: { todos, active, completed },
    location: '/'
  }
}
```

Our full todo list with most features are in place now.

The last critical functions of the app include the ability to filter the list.
These will be built into the todo-footer component.
The features needed are to filter tasks to all, active, or completed.
We also need to be able to clear (delete) all the completed tasks.

For an HTML first approach to this we can use regular links (anchor tags) for filtering.
The clear feature should use a post request since it is destructive.
For this we can use a form.

Copy and paste the following into /app/elements/todo-footer.mjs.

```javascript
// /app/elements/todo-footer.mjs

export default function TodoFooter({html,state}){
    const { store = {} } = state
    const { todos = [], active = [], completed = [], filter = 'all' } = store
    const display = (todos.length || active.length || completed.length) ? 'block' : 'none'

    return html`
  <footer class="footer" style="display: ${display};">
    <span class="todo-count"><strong>${active.length}</strong> items left</span>
    <ul class="filters">
      <li><a href="/" class="${filter === 'all' ? 'selected' : ''}">All</a></li>
      <li><a href="/?filter=active" class="${filter === 'active' ? 'selected' : ''}">Active</a></li>
      <li><a href="/?filter=completed" class="${filter === 'completed' ? 'selected' : ''}">Completed</a></li>
    </ul>
    <form action="/todos/completed/delete" method="POST">
      <button class="clear-completed" style="display: ${completed.length ? 'block' : 'none'};">Clear completed</button>
    </form>
  </footer>
    `
  }
}
```

In order to support the filtering query parameters used in the links above we need to update the `/app/api/index.mjs` to filter the list accordingly.
The query parameters for the api can be pulled from the `req.query` propety.

```javascript
import { getTodos } from '../models/todos.mjs'

export async function get (req) {
  let todos = await getTodos()
  let active = todos.filter(todo => !todo.completed)
  let completed = todos.filter(todo => todo.completed)

  const filter = req.query.filter
  if (filter==='active') todos = active
  if (filter==='completed') todos = completed

  return {
    json: { todos, active, completed, filter }
  }
}
```


To clear all completed tasks add the following new api route to respond to the new clear completed form in the footer component.

```javascript
// /app/api/todos/completed/delete.mjs

import { deleteTodo, getTodos } from '../../../models/todos.mjs'

export async function post (req) {
  const todos = await getTodos()
  const completed = todos.filter(todo=>todo.completed)
  await Promise.all(completed.map(todo=>deleteTodo(todo.key)))
  return {
    location: '/'
  }
}
```


We have just one finishing touch to add to the app.
We need a footer component with some attribution and directions.
This is another static element similar to the header.

Copy and paste the following to /app/elements/todo-app-footer.mjs.

```javascript
export default function TodoAppFooter({ html }) {
  return html`
    <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Written by the <a href="https://enhance.dev">Enhance Team</a></p>
        <p>Part of <a href="https://todomvc.com">TodoMVC</a></p>
    </footer>
    `
}
```


## HTML First goes far
We now have a complete todo list app with all the required functionality and not a single line of client side JavaScript.
There are additional things we could add (and we will in the next section), but if these were the requirements of a greenfield project this could be released as is for testing and feedback.
We believe this should be recommended best practice, and we think that it is by far the fastest way to get a working app.

## Progressive Enhancement
Progressive enhancement means starting with HTML and CSS to build a working app and then incrementally improve it with a little JavaScript if necessary.
This is an incremental additive approach and it should not require building your app twice.
As previously mentioned we have a fully functional app that meets all our requirements.
What could we add with PE?

The biggest thing that could be improved is allowing for updates to the todo list without a full page reload.
The next sections following the JavaScript first approach will add those features.


## JavaScript First
If you are following the JavaScript first path welcome and lets get started. 
If you followed the HTML first path and want to see how to improve the app to avoid full page reloads continue reading. 


## Client side State Management

The goal is to build apps that are full featured (or as close as possible) without JavaScript.
From there they can be improved using some JavaScript.
This approach leverages HTML as much as possible with real forms and anchor tags.
Most of the application state is stored in the form and the URL.
When the app is feature complete using this approach, it may not be necessary to add much JavaScript.


One common enhancement for a typical CRUD app is to avoid full page reloads when submitting form data.
To do this we need a client side data store.
Since the app is fully functional, we can use the HTML and existing backend routes to minimize this work.
The goal is to:

1. Send data to the server and update the UI without reloading the page
2. Minimal changes to the working HTML
3. Minimal extra JavaScript
4. Avoid stalling the main UI thread with long running tasks

With the CRUDL (Create, Read, Update, Delete, and List) operations already fully implemented the simplest approach is to plug in between this exchange.
A typical form post and response for a CRUD route is shown below.


1. **Reactive data store** to share state changes throughout the app
2. A **web worker** to move slow operations like Fetching off the main (UI) thread
3. An **API helper** to wrap up these pieces of code and handle message passing between them


It looks a bit complicated, but this pattern can be reduced to a very minimal footprint and extended to a large complicated application.
First lets examine some of the key pieces of this architecture before looking at the code.



## Client API Handler

The client API handler, represented by the large green circle above, handles communication between the parts of this architecture.
A simplified example including an HTML page with a form is shown below.
The `API` function is a wrapper over the message passing to the worker and updates to the store so that that code can stay out of individual components.
It exposes methods to do the CRUD operations (simplified to just create for this example) and to subscribe to updates.
The `processForm` function translates the form data to be handled by the worker.
In a typical application the API function would be externalized in its own file so that it can be imported and used in any component that needs access to the state.


A limitation of HTML forms is that all the data is represented in flat key value pairs of strings.
In many cases the CRUD object may be nested with other types of values like numbers or booleans.
The Enhance approach to this is to normalize and reshape this form data when it is received by the server using a JSON schema.
With the client side store we can do the same process in the API function using the same JSON schema.



```html
<h1>Tasks</h1>
<ul>
  <li>First Task</li>
</ul>
<form action="/todos" method="POST">
  <input type="text" name="task"/>
</form>

<script>
  import Store from '@enhance/store'
  function API(){
    const store = Store({tasks:['First Task']})
    let worker =  new Worker('/worker.mjs')
    worker.onmessage = createMutation

    function processForm(form){
      return JSON.stringify(new FormData(form))
    }
    function create(form) {
      const data = processForm(form)
      worker.postMessage({
        data: form
      })
    }
    function createMutation({ task = '' }) {
      const copy = store.tasks?.slice() || []
      copy.push(task)
      store.tasks = copy
    }
    return {
      create,
      subscribe: store.subscribe,
      unsubscribe: store.unsubscribe
    }
  }

  const api = API()
  const myForm = document.querySelector('form')
  myForm.addEventListener('submit', (event)=> {
    event.preventDefault()
    api.create(myForm)
  })
  const list = document.querySelector('ul')
  api.subscribe(update, ['tasks'])
  function update(tasks){
    list.innerHTML = tasks.map(task => `<li>${task}</li>`).join('')
  }

</script>
```



## Reactive Data Store

The `Store` is a light weight (~100 lines of code) reactive data store (`@enhance/store`).
It is abstracted into a package because the code does not generally need to be modified for different projects and the interface for it is small.
Once added to your app you can store objects and subscribe to updates to those objects from anywhere.
The store is basically a single JavaScript object that is shared across all components that need access to it.
You can add or modify data by setting or getting as with any object (i.e. `store.myData = ['one', two']`).
Your components become reactive to that data by subscribing to changes in certain keys (i.e. `store.subscribe(updateFunc, ['myData'])`).
This works by using a JavaScript [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) so that when data is set the subscribed handlers will be called using the <code>[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)</code> so that updates are grouped to UI updates.
There are many reactive data patterns used in modern web applications (event buses, useState, signals, Redux, etc.).
This Enhance Store pattern is simple to get started with, but can scale to very advanced use cases.



## Web Worker

The whole point of this enhancement over full page reloads is for the UI to remain interactive and stable all the time.
Updating data may require fetching data to and from the server which can be slow.
If we can offload this slow work somewhere we can avoid stalling the interactivity of the UI.
Web workers allow us to run a script on an entirely separate thread so that the code in the main thread that is responsible for our UI remains responsive.
The [Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) does just that.
The code for this worker is externalized into a separate file because the `new Worker()` API loads the code from a URL.
That is why it is represented as a dotted line inside the API in the architectural diagram above.
The messages from the worker are sent from the API and returned there even though the code is run in a different thread as an independent script.


```javascript
// worker.mjs
self.onmessage = work

async function work ({ data }) {
    try {
      const result = await (await fetch(
        `/todos`, {
          body: payload,
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })).json()

      self.postMessage({
        result
      })
    }
    catch (err) {
      // RESPOND WITH ERROR
      console.error(err)
    }
}
```



## Worker to Client Message State Machine

Web Workers pass messages back and forth between the main thread using the built in `postMessage`, and respond to messages using the `onmessage` subscription.
In a simple case we can manually wire these together.
If the worker and the store are doing multiple operations like most CRUD apps there are different messages to route back and forth.
A good way to handle this is with a small state machine using a switch/case to route.



```javascript
// Main Thread Client
/////////////////////////
const CREATE = 'create'
const UPDATE = 'update'
worker.onmessage = workerResponse
function workerResponse(e) {
  const { data } = e
  const { result, type } = data
  switch (type) {
  case CREATE:
    createMutation(result)
    break
  case UPDATE:
    updateMutation(result)
    break
  }
}
function create(data){
  worker.postMessage(data)
}
function createMutation(result){
  //update store
}
///////////////////////////////////////
// Worker
const CREATE = 'create'
const UPDATE = 'update'
self.onmessage = stateMachine
async function stateMachine ({ data }) {
  const { data: payload, type } = data
  switch (type) {
  case CREATE:
    createFetch(payload)
    break
  case UPDATE:
    updateFetch(payload)
  }
}
function createFetch(payload){
  ...
  self.postMessage(result)
}
```



## Optimistic UI updates

An additional optimization that can be made is to let the UI respond to data changes optimistically instead of waiting for the server to respond.
In the above example a `create` is started using the data given by the user.
That data is then passed to the worker which sends it to the server where it is added to the database.
Now let's consider the `delete` operation.
One way to make the UI feel very fast is for deleted data to disappear instantly.
In reality for the data to be truly deleted the worker still needs to make a `fetch` request to the `/things/{id}/delete` route.
That takes some time.
Following the same patterns above we can easily implement optimistic delete by having the `API.delete(key)`:



1. Delete they item from the client side store and put it in a `deletedItems` list in the store.
2. Request the worker to do the fetch to delete on the server.
3. If worker receives a success nothing else happens.
4. If worker receives a failure or error the store delete is reverted by pulling it off the `deletedItems` and restoring it to the
