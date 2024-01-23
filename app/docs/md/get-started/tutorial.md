---
title: Todo-MVC Tutorial
---

A Choose Your Own Adventure tutorial for building a to-do list web app.


## Introduction

In recent years, recommended approaches to web development have fractured along many lines.
One of these fissures is between HTML First and JavaScript First approaches.
JavaScript First means that JavaScript is the primary means of building all the features and functions of the app.
With this approach HTML is more of a compile target.

HTML First means that the app is built to work with HTML and CSS as much as possible. It can then be enhanced with a little JavaScript if needed.

Both approaches can be successful depending on your goals.
The path taken is usually a result of comfort and experience with the tools required.
The tag line for Enhance is “An HTML First Framework”.
However, Enhance can work with either approach.
It was designed to enable HTML First where other frameworks make that approach difficult.


This tutorial will show how to build the same app (a to-do list) with both approaches using Enhance.
If you are coming from a framework that is primarily JavaScript first, you can follow that path to better leverage your experience and comfort.
Or if you would prefer, you can follow the HTML First path to maximize performance and resilience from the start.



## Todo MVC feature overview

The [TodoMVC](https://todomvc.com/) project was started as a way to compare frontend frameworks.
It is a simple to-do app that was written as a reference design.
It has been implemented in most popular frameworks.
The design is dated, and the features are limited.
But it allows for the comparison of frameworks by keeping those aspects similar.
The project has a specification [here](https://github.com/tastejs/todomvc/blob/master/app-spec.md) for reference.
The Enhance version tries to follow as closely as possible only deviating in a few instances to highlight Enhance patterns that are improved over other frameworks (i.e. HTML structure is changed to allow the app to work without JavaScript enabled).


## Get Started & Development Server

First, let's create an app and get oriented to the Enhance project structure ([https://enhance.dev/docs/conventions/structure](https://enhance.dev/docs/conventions/structure)).
Create a starting app with the following command:

* `npx "@enhance/cli@latest" new ./enhance-todo -y`

This new project now has a boilerplate page in `/app/pages/index.mjs`.


Next make sure that all the project dependencies are updated by running `npm install`.

To start the Enhance development server you can use the enhance cli with `npx enhance dev`, or you can use the shortcut setup in the starter project with `npm start`.
Once started your project is served at `http:localhost:3333`.
Load that page into your browser to view your project.
This server has built in live reload so that changes to most of the project files and configuration will trigger the browser to reload immediately.


Before moving on lets briefly talk about the structure of enhance apps and what goes in the app folder.


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



* **Head**: The head.mjs file is for customizing your document’s <head> tag. 
* **Pages**: The pages folder enables file-based routing. To add a route just add an HTML file to this directory (or another directory within it). The name of the file will be the URL you view it at. For example, `app/pages/about.html` will be viewed at `/about`.
* **Elements**: The elements folder is where you keep your [Enhance Elements](https://enhance.dev/docs/elements). These are custom element templates that get rendered server side and set your HTML page up for progressive enhancement.
* **Components**: The components folder is where you keep your single file web components. These components are rendered server-side, but also include client-side code for additional interactivity. This allows you to add progressive enhancements to your component in one file.
* **API**: The api folder is preconfigured to expose data to your file-based routes. For example, the file app/api/index.mjs will automatically pass state to app/pages/index.mjs as well as expose an endpoint for standard REST verbs like get and post.
* **Browser**: The browser folder is preconfigured to output a bundle to be used when progressively enhancing your pages in the browser. Files in app/browser are bundled to /public/browser/.

For more details on these folders and the structure of an Enhance application refer to [enhance.dev/docs/conventions/structure](https://enhance.dev/docs/conventions/structure).


## Scaffold API Routes and Data Layer

For the todoMVC tasks we need the description of the task, its completion status and a key or id to reference it in the database.
The JSON representation of this might look something like:


```json
{
  "task": "Wash the Car",
  "completed": false,
  "key": "Mqx159x7U"
}
```

We are building a server rendered app so lets start by shaping an API to handle these tasks.
This API needs to create new tasks, edit existing tasks and mark them as completed, delete tasks and list all the tasks filtered by their completed status.
This is often referred to as CRUD or CRUDL for Create, Read, Update, Delete, and sometimes List.
We can either build these API routes by hand or take advantage of the Enhance CLI CRUD generator to build most of the boilerplate to save time.
We will use the generator to scaffold them and then edit them as needed.

When we run the CLI generator command we specify the shape of the data by looking at the JSON for a task shown above.
We have `task` as a string value, `completed` as a boolean, and `key` as a string.
We can generate these with:

* `npx enhance gen scaffold Todo task:string completed:boolean` 

Note key is omitted because it is the default id for CRUD routes.

**Files**
  * API data routes
    * /app/api/links.mjs
    * /app/api/links/$id.mjs
    * /app/api/links/$id/delete.mjs
  * HTML pages
    * /app/pages/links.mjs
    * /app/pages/links/$id.mjs
  * Data Access Layer 
    * /app/models/links.mjs
    * /app/models/schema/links.mjs

**Corresponding HTTP Routes**
  * `/todos` - List and Create
    * GET - List and Create form in one page
    * POST - Create Post endpoint
  * `/todos/$id` - Read and Update
    * GET - Read and Update form
    * POST - Update Post endpoint
  * `/todos/$id/delete` - Delete
    * POST - Deletes object

> Why do we have a POST `/links/$id/delete` route instead of a DELETE `/links/$id` route? It is because browsers only support GET and POST and we want to be able to support non-JavaScript use cases with our forms.


This creates the api route for create and list at the `/todos` where a POST will create a new todo and a GET will list all of the todos.
This route file is `/app/api/todos.mjs`.
The read and update route is at `/todos/{id}` where a GET will read the todo and a POST will update it.
The file is at `/app/api/todos/$id.mjs`.
And finally a POST to `/todos/{id}/delete` will delete the task.

### Enhance API Routes
Enhance API routes respond to HTTP requests for data (either JSON, or any other text data).
These api routes are in `/app/api` following the file based routing.
They also provide a way to prepare pass data on to the HTML render function to combine that data with markup before responding. 
If an HTTP request has headers for `application/json` the data returned from the api function in the `json` property will be returned directly.
If the request is for `text/html` the data returned for the api is passed to the page rendering function.

The api routes export named functions corresponding to the HTTP method handled. 
For more details refer to the docs on [API Routes](/docs/routing/api-routes/)


The `/todos` api route generated by the scaffold command is shown below.

```javascript
// /app/api/todos.mjs
import { upsertTodo, validate } from '../models/todos.mjs'

export async function get (req) {
  if (req.session.problems) {
    let { problems, todo, ...session } = req.session
    return {
      session,
      json: { problems, todo }
    }
  }
}

export async function post (req) {
  const session = req.session
  // Validate
  let { problems, todo } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, todo },
      json: { problems, todo },
      location: '/todos'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, todo: removed, ...newSession } = session
  try {
    const result = await upsertTodo(todo)
    return {
      session: newSession,
      json: { todo: result },
      location: '/todos'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/todos'
    }
  }
}

```

This file handles GET requests and POST requests. 
One challenge using the generator is that we get a lot of code that may be challenging to understand initially. 

We will cover more of the details of this code later in the tutorial, but here is a brief overview.
First the data access methods used to validate data and write to the database are imported.
Data validation is a critical requirement for real applications. 
Much of the code in this generated api helps with this validation.
The post function validates the submitted task data which returns validation errors as a problems object.
If problems are present the function short circuits before writing to the database.
It will add the problems and the initial task to the sesson and and redirects back to the todos page so that the user can fix these problems.
The get function looks for these problems and passes them to the page render function so that they can be displayed for the user.
We call this HTML first server validation the "Problems Loop". 
Todo MVC does not include validation so we will not either. 
For more details on this refer to the [Problems Loop](/docs/patterns/form-validation) section of the enhance docs.



### Database and Data Access
Every Enhance app comes with its own database.
It is batteries included? @begin/data is just a thin wrapper around DynamoDB which is an incredibly fast, truly serverless database.
If you don’t need or use it, it will not get in your way nor will you be charged for it.

The generated api routes use a generated data access layer to read and write to the database.
This code is generated into the `/app/models/todos.mjs` and `/app/models/schemas/todo.mjs` files.
The schema file is a JSON schema used in the generator command.
The data access is shown below.

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



The generator also creates html pages for each of these routes in the pages folder.
These pages can be deleted because we will build a new page for the todo app.
The files in the elements folder can also be deleted.

To test the generated pages start the development server (`npm start`) and load the todo list at [http://localhost:3333/todos](http://localhost:3333/todos).
From here you can create new tasks and edit existing tasks.
This page is ugly and the it does not have the features required for todoMVC, but it is a starting point to build from. 


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
For information on Enhance styling best practice refer to [enhance.dev/docs/enhance-styles/](https://enhance.dev/docs/enhance-styles/.).
This tutorial uses styles from the TodoMVC project with minor changes.
The CSS from TodoMVC will be broken into sections and scoped to each component above following recommended Enhance patterns.
Some changes are made to accommodate the HTML structure needed to function without JavaScript as much as possible.


To start, we will copy some of the basic styles from the Todo MVC project into the static asset.
Copy the following css to the public folder at `/public/styles.css`.


```css
/* /public/styles.css */
@charset 'utf-8';

html,
body {
	margin: 0;
	padding: 0;
}

button {
	margin: 0;
	padding: 0;
	border: 0;
	background: none;
	font-size: 100%;
	vertical-align: baseline;
	font-family: inherit;
	font-weight: inherit;
	color: inherit;
	-webkit-appearance: none;
	appearance: none;
}

body {
	font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
	line-height: 1.4em;
	background: #f5f5f5;
	color: #111111;
	min-width: 230px;
	max-width: 550px;
	margin: 0 auto;
	font-weight: 300;
}

.hidden {
	display: none;
}

:focus {
	box-shadow: 0 0 2px 2px #CF7D7D;
	outline: 0;
}
```



## Static Assets: Public folder → /_public/ route

Static assets like images, scripts, and the CSS file above are required for most web application.
Enhance handles fingerprinting and serving assets from the root public directory via the convenient /_public/ route.

These assets are dropped in your Enhance project’s public folder.
They can be organized with any sort of directory structure you’d like.


```
.
├── app/ ............... dynamic app features
└── public ............. static assets
    └── styles.css
```


Asset can then be accessed from anywhere by adding `/_public/` to the beginning of the url route.
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

For more information on the Public folder and static assets in general refer to the docs ( [https://enhance.dev/docs/conventions/public](https://enhance.dev/docs/conventions/public)).


## Head

Now that we have our CSS in the static assets public folder we need to add the `<link>` to reference it into the head.
We mentioned in a previous section that the `head.mjs` file is in the `/app/` folder.
Lets look at how to customize it by adding our link.


The `<head>` tag is a very important point of customization for your app, allowing you to add things like a page titles, favicons, social/Open Graph metadata, etc.
However, the <head> tag cannot be written as a custom element (or an enhance component), and it can’t contain other custom elements.
This is because, as defined by the HTML spec, only a subset of existing HTML tags are permitted in the <head> tag.
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


We will override it by removing the first two lines of code that add add the Enhance styles (since we are using todoMVC styles instead).
Then we need to remove the `${linkTag()}` line in the middle.
Finally we will add the link tag to our styles below the title boilerplate: `<link rel="stylesheet" href="/_public/styles.css">`.
For more information on the head refer to the docs [https://enhance.dev/docs/conventions/head](https://enhance.dev/docs/conventions/head).


## Choose Your Own Adventure

With the serverside API routes and data access layer created and the shell of the app defined it is now time to choose which path to take in this adventure.
If you want to follow the HTML First path continue reading the next paragraph.
But if you would like to follow the JavaScript First approach jump ahead to the paragraph by that name.




## HTML First

With the skeleton HTML page for our app already created lets build the components needed.
These components are built as custom elements using the Enhance `elements` folder.
Cut and paste the following code into the `/app/elements/todo-app.html` file.
The file name (todo-app.html) will use this code as a server rendered custom element with the HTML in this file rendered.
Notice that the style tag with css for the todo app is included here.
Enhance will add scoping to these styles so they only target the instance of todo-app and then this style tag will be hoisted to the head so that the styles will be loaded prior to the page rendering.



```html
<!-- /app/elements/todo-app.html --> 
<style>
  section.todoapp {
	background: #fff;
	margin: 130px 0 40px 0;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
	            0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }

  input::placeholder {
	font-style: italic;
	font-weight: 400;
	color: rgba(0, 0, 0, 0.4);
  }
</style>
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
Elements live in the app/elements/ folder in the Enhance starter project.

These elements use the plantforms "custom element" API to create components that can be reused anywhere in our app.
We will look at adding dynamic clientside capapilities to these elements later. 
But in this case we just have HTML, CSS and composibility with slots.

With this element created we can use it in any page by adding `<todo-app></todo-app>`. 
We already did this with our index.html page.
Now this element will expand into that component when a page is rendered. 
* When naming these custom elements they must contain a "-" to distinguish them from regular HTML elements.
* By specification these custom elements cannot be used as self closing tags so the full opening and closing tag is required. 

For more information on how Elements refer to the documentation on [Elements](http://localhost:3333/docs/elements). 


### Slots
To add composibility to these elements we can use both attributes and slots. 
With HTML the `<slot>` element is generally for use in the shadow DOM.
The Shadow DOM is a platform API that creates an isolated DOM inside an element that encapsulates styles (and more). 
It is best to avoid using the shadow DOM unless strong isolation is required.
Enhance will server render the slotted content in place of these.
This allows for composition of components using the convenience of slots without having to use the shadow DOM.
For more information on how Enhance uses slots refer to the documentation on [Enhance Slots](http://localhost:3333/docs/elements/html/slots). 

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
As mentioned previously the css here is taken from the reference app for consistent design. 

The markup has an `h1` and a form with a single input. 
The form posts to `/todos`. 
This is the endpoint we generated to create new tasks.
This form will rely implicit submission.
After entering a new task the user only needs to hit enter to submit this task.


```html 
<style>
.new-todo {
	position: relative;
	margin: 0;
	width: 100%;
	font-size: 24px;
	font-family: inherit;
	font-weight: inherit;
	line-height: 1.4em;
	color: inherit;
	padding: 6px;
	border: 1px solid #999;
	box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
}

.new-todo {
	padding: 16px 16px 16px 60px;
	height: 65px;
	border: none;
	background: rgba(0, 0, 0, 0.003);
	box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}

h1 {
	position: absolute;
	top: -140px;
	width: 100%;
	font-size: 80px;
	font-weight: 200;
	text-align: center;
	color: #b83f45;
	text-rendering: optimizeLegibility;
}
</style>

  <header class="header">
    <h1>todos</h1>
    <form action="/todos" method="POST">
      <input autofocus="autofocus" autocomplete="off" placeholder="What needs to be done?" name="task" class="new-todo">
    </form>
  </header>
```

Note that this component is fully functional with no additional JavaScript. 
So far the HTML First approach is going well.

## Update API route redirect after POST
We now need to update some of our API routes so that after we submit data they will redirect back to the desired location. 
The user interface for the todo list is at the root (`/`).
The generated CRUD routes are hosted at `/todos`. 
When we post to `/todos` with a successful task the browser will redirect back to '/todos' to GET the list of tasks.
We need to change that redirect to return to the root.

```javascript

// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { upsertTodo, validate } from '../models/todos.mjs'

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const session = req.session
  // Validate
  let { problems, todo } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, todo },
      json: { problems, todo },
      location: '/'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, todo: removed, ...newSession } = session
  try {
    const result = await upsertTodo(todo)
    return {
      session: newSession,
      json: { todo: result },
      location: '/'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/'
    }
  }
}

```




## List Component


```javascript
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

<style>
/* Styles omitted */
</style>
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



```css
 .todo-list li .toggle + button {
      background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
      background-repeat: no-repeat;
      background-position: center left;
    }
    .todo-list li .toggle:checked + button {
      background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');
    }
    .todo-list li button {
      overflow-wrap: break-word;
      padding: 15px 15px 15px 60px;
      display: block;
      line-height: 1.2;
      transition: color 0.4s;
      font-weight: 400;
      color: #484848;
    }
    button.edit-task.edit-task {
      display: none;
    }


.main {
	position: relative;
	z-index: 2;
	border-top: 1px solid #e6e6e6;
}

.toggle-all {
	width: 1px;
	height: 1px;
	border: none; /* Mobile Safari */
	opacity: 0;
	position: absolute;
	right: 100%;
	bottom: 100%;
}

.toggle-all + label {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 45px;
	height: 65px;
	font-size: 0;
	position: absolute;
	top: -65px;
	left: -0;
}

.toggle-all + label:before {
	content: '❯';
	display: inline-block;
	font-size: 22px;
	color: #949494;
	padding: 10px 27px 10px 27px;
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}

.toggle-all:checked + label:before {
	color: #484848;
}

.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}

.todo-list li {
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
	border-bottom: none;
}

.todo-list li.editing {
	border-bottom: none;
	padding: 0;
}

.todo-list li.editing .edit {
	display: block;
	width: calc(100% - 43px);
	padding: 12px 16px;
	margin: 0 0 0 43px;
}


.todo-list li .toggle {
	text-align: center;
	width: 40px;
	/* auto, since non-WebKit browsers doesn't support input styling */
	height: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	border: none; /* Mobile Safari */
	-webkit-appearance: none;
	appearance: none;
}

.todo-list li .toggle {
	opacity: 0;
}

.todo-list li .toggle + label {
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
	background-repeat: no-repeat;
	background-position: center left;
}

.todo-list li .toggle:checked + label {
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');
}

.todo-list li label {
	overflow-wrap: break-word;
	padding: 15px 15px 15px 60px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
	font-weight: 400;
	color: #484848;
}

.todo-list li.completed label {
	color: #949494;
	text-decoration: line-through;
}

.todo-list li .destroy {
	/* display: none; */
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #949494;
	transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover,
.todo-list li .destroy:focus {
	color: #C18585;
}

.todo-list li .destroy:after {
	content: '×';
	display: block;
	height: 100%;
	line-height: 1.1;
}

.todo-list li:hover .destroy {
	display: block;
}


.todo-list li.editing:last-child {
	margin-bottom: -1px;
}

@media screen and (-webkit-min-device-pixel-ratio:0) {
	.toggle-all,
	.todo-list li .toggle {
		background: none;
	}
	.todo-list li .toggle {
		height: 40px;
	}
}

@media (max-width: 430px) {
	.footer {
		height: 50px;
	}
	.filters {
		bottom: 10px;
	}
}

.toggle-all:focus + label {
	box-shadow: 0 0 2px 2px #CF7D7D;
	outline: 0;
}
```



## JavaScript First


## Clientside State Management

The goal is to build apps that are full featured (or as close as possible) without JavaScript.
From there they can be improved using some JavaScript.
This approach leverages HTML as much as possible with real forms and anchor tags.
Most of the application state is stored in the form and the URL.
When the app is feature complete using this approach, it may not be necessary to add much JavaScript.


One common enhancement for a typical CRUD app is to avoid full page reloads when submitting form data.
To do this we need a clientside data store.
Since the app is fully functional, we can use the HTML and existing backend routes to minimize this work.
The goal is to:



1. Send data to the server and update the UI without reloading the page
2. Minimal changes to the working HTML
3. Minimal extra JavaScript
4. Avoid stalling the main UI thread with long running tasks

With the CRUDL (Create, Read, Update, Delete, and List) operations already fully implemented the simplest approach is to plug in between this exchange. A typical form post and response for a CRUD route is shown below. 


1. **Reactive data store** to share state changes throughout the app
2. A **web worker** to move slow operations like Fetching off the main (UI) thread
3. An **API helper** to wrap up these pieces of code and handle message passing between them


It looks a bit complicated, but this pattern can be reduced to a very minimal footprint and extended to a large complicated application.
First lets examine some of the key pieces of this architecture before looking at the code.



## Client API Handler

The client API handler, represented by the large green circle above, handles communication between the parts of this architecture.
A simplified example including an HTML page with a form is shown below.
The `API` function is a wrapper over the message passing to the worker and updates to the store so that that code can stay out of individual components.
It exposes methods to do the CRUD operations (simplifed to just create for this example) and to subscribe to updates.
The `processForm` function translates the form data to be handled by the worker.
In a typical application the API function would be externalized in its own file so that it can be imported and used in any component that needs access to the state.


A limitation of HTML forms is that all the data is represented in flat key value pairs of strings.
In many cases the CRUD object may be nested with other types of values like numbers or booleans.
The Enhance approach to this is to normalize and reshape this form data when it is received by the server using a JSON schema.
With the clientside store we can do the same process in the API function using the same JSON schema.



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

The `Store` is a light weight (~100loc) reactive data store (`@enhance/store`).
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



1. Delete they item from the clientside store and put it in a `deletedItems` list in the store.
2. Request the worker to do the fetch to delete on the server.
3. If worker receives a success nothing else happens.
4. If worker receives a failure or error the store delete is reverted by pulling it off the `deletedItems` and restoring it to the 
