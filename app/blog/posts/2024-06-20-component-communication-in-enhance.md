---
title: "Component Communication in Enhance"
image: '/_public/blog/post-assets/component-communication/communication.jpg'
image_alt: "Five laptops open on a desk."
photographer: "Marvin Meyer"
photographer_url: "https://unsplash.com/@marvelous?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
category: enhance
description: "Enhance makes it easy to build applications composed of web components. Each component encapsulates its own UI and functionality. However, under some circumstances you may need to communicate between components to share data or react to changes elsewhere on the page."
author: 'Simon MacDonald'
avatar: 'simon.png'
mastodon: "@macdonst@mastodon.online"
published: "June 20, 2024"
---

Enhance makes it easy to build applications composed of web components. Each component encapsulates its own UI and functionality. However, under some circumstances you may need to communicate between components to share data or react to changes elsewhere on the page. In this post, we are going to learn a few ways of achieving communication between components.

In our first example we will build a chart component that is composed of three child components (blue border): `chart-options`, `chart-type` and `reactive-chart` and their parent component (orange border) `chart-container`.

![Chart example](/_public/blog/post-assets/component-communication/example1.png)

## Child to Parent communication

For this type of communication, we leverage the web platform by using Events for communication from child to parent.

In our example app, when the user clicks on the "Show Labels" switch we want to toggle whether or not the labels are displayed on our chart. This means we will need to build a web component that listens to the change event from the switch, marshals up the important data and then fires a `CustomEvent` that the parent component will listen to.

Here’s the full code listing for you to look over then we’ll point out some of the salient features.

<begin-code filename="app/components/chart-options.mjs">

```javascript
import CustomElement from '@enhance/custom-element'
export default class ChartOptions extends CustomElement {
   constructor() {
       super()
       this.optionChanged = this.optionChanged.bind(this)
   }

   connectedCallback() {
       this.addEventListener('change', this.optionChanged)
   }

   disconnectedCallback() {
       this.removeEventListener('change', this.optionChanged)
   }

   optionChanged(evt) {
       this.dispatchEvent(
           new CustomEvent("chartoption", {
             bubbles: true,
             detail: {
               attribute: evt.target.name,
               value: evt.target.checked
              },
           }),
       )
   }

   render({ html }) {
       return html`
         <slot></slot>
       `
   }
}

customElements.define("chart-options", ChartOptions);
```

</begin-code>

In the web component’s `constructor` method on line 6 you might notice this code:

```javascript
this.optionChanged = this.optionChanged.bind(this)
```

We do this so that when the `optionsChanged` event listener is invoked that `this` is bound to our web component instead of the default binding which would be undefined.

Next we’ll register/unregister our event listener in our `connectedCallback` and `disconnectedCallback` methods.

```javascript
connectedCallback() {
  this.addEventListener('change', this.optionChanged)
}

disconnectedCallback() {
  this.removeEventListener('change', this.optionChanged)
}
```

This is my preference for handling event listeners. There is some discussion about whether or not this is a best practice. See [Nolan Lawson](https://nolanlawson.com/2024/01/13/web-component-gotcha-constructor-vs-connectedcallback/), [Hawk Ticehurst](https://hawkticehurst.com/writing/you-are-probably-using-connectedcallback-wrong/), and [Chris Ferdinandi](https://gomakethings.com/youre-probably-using-connectedcallback-wrong-in-your-web-component/).

Then in our `optionsChanged` event handler we create a `CustomEvent` called `chartoption` which will be dispatched up the DOM to our parent component.

```javascript
optionChanged(evt) {
    this.dispatchEvent(
        new CustomEvent("chartoption", {
            bubbles: true,
            detail: {
            attribute: evt.target.name,
            value: evt.target.checked
            },
        }),
    )
}
```

By using a `CustomEvent` we can differentiate our `change` event from other `change` events elsewhere on the page and customize our payload.

<deploy-docs-callout level="info">

**Note:** You may be wondering why we fire a `CustomEvent` instead of letting the change event bubble up to our parent component. There are two very good reasons for this. The first is that we want to encapsulate the business logic into our `chart-options` component. Since the parent component is listening for a `chartoption` event changing the underlying implementation of the `chart-options` component can be done without disturbing the parent component. Secondly, we have another component called `chart-type` which would also be firing a change event and we want to be able to differentiate between the two components easily.

</deploy-docs-callout>

Finally, our `render` method is quite short:

```javascript
render({ html }) {
    return html`
        <slot></slot>
    `
}
```

As we are using the [HTML web components](https://adactio.com/journal/20618) pattern. Our web component is just a wrapper around our checkbox input element. For example:

```html
<chart-options>
    <e-input-group field-class="flex justify-content-between align-items-center">
        <fieldset>
            <label>Multiple</label>
            <e-switch>
                <input is="switch" type="checkbox" name="multiple" checked>
            </e-switch>
        </fieldset>
    </e-input-group>
</chart-options>
```

With all this in place we are now able to communicate state changes from child components to the parent using the native web platform but how does the parent component listen for this `chartoption` event?

## Parent to Child communication

In the previous section our child component was firing a `chartoption` event. Our parent component needs to listen for this event and communicate down to the child components by setting attributes on the child component.

Once again here is the full code listing. We’ll call out the important bits next.

<begin-code filename="app/components/chart-container.mjs">

```javascript
import CustomElement from '@enhance/custom-element'

export default class ChartContainer extends CustomElement {
   constructor() {
       super()
       this.updateOption = this.updateOption.bind(this)
       this.updateType = this.updateType.bind(this)
       this.chart = document.querySelector('reactive-chart')
   }

   connectedCallback() {
       this.addEventListener('chartoption', this.updateOption)
       this.addEventListener('charttype', this.updateType)
   }

   disconnectedCallback() {
       this.removeEventListener('chartoption', this.updateOption)
       this.removeEventListener('charttype', this.updateType)
   }

   updateOption(evt) {
       const { attribute, value } = evt.detail
       if (value) {
           this.chart.setAttribute(attribute, '')
       } else {
           this.chart.removeAttribute(attribute)
       }
   }

   updateType(evt) {
       const { type } = evt.detail
       this.chart.setAttribute('type', type)
   }

   render({ html }) {
       return html`
   <e-box ord="primary">
       <e-row>
           <e-col span="3">
               <h4 class="mar-t-xs">Chart Options</h4>
               <chart-options>
                   <e-input-group field-class="flex justify-content-between align-items-center" >
                       <fieldset>
                           <label>Multiple</label>
                           <e-switch>
                               <input is="switch" type="checkbox" name="multiple" checked>
                           </e-switch>

                       </fieldset>
                   </e-input-group>
                   <e-input-group field-class="flex justify-content-between align-items-center" >
                       <fieldset>
                           <label>Show Labels</label>
                           <e-switch>
                               <input is="switch" type="checkbox" checked name="show-labels" >
                           </e-switch>
                       </fieldset>
                   </e-input-group>
               </chart-options>
       </e-col>
       <e-col>
           <div>
               <reactive-chart
                   data-key="medals"
                   type="bar"
                   heading="2016 Summer Olympics Medal Table"
                   value-key="Country"
                   value-names="Gold,Silver,Bronze"
                   multiple
                   show-labels>
               </reactive-chart>
               <chart-type>
                   <e-input-group enhanced="✨">
                       <legend>Chart Type</legend>
                       <fieldset>
                           <input id="bar" type="radio" name="type" value="bar" checked>
                           <label for="bar">Bar</label>
                           <input id="column" type="radio" name="type" value="column">
                           <label for="column">Column</label>
                           <input id="area" type="radio" name="type" value="area">
                           <label for="area">Area</label>
                           <input id="line" type="radio" name="type" value="line">
                           <label for="line">Line</label>
                       </fieldset>
                   </e-input-group>
               </chart-type>
           </div>
       </e-col>
   </e-row>
   </e-box>
       `
   }
}

customElements.define("chart-container", ChartContainer);
```

</begin-code>

In our `connectedCallback` method we are listening for two `CustomEvents`. The first one for `chartoption` is the only one we’ll be going in depth into for this example.

```javascript
connectedCallback() {
    this.addEventListener('chartoption', this.updateOption)
    this.addEventListener('charttype', this.updateType)
}
```

When our `chart-container` component receives a `chartoption` event it calls the `updateOption` method:

```javascript
updateOption(evt) {
    const { attribute, value } = evt.detail
    if (value) {
        this.chart.setAttribute(attribute, '')
    } else {
        this.chart.removeAttribute(attribute)
    }
}
```

From the event's details we can pull off the name of the attribute we need to set and whether the switch is on or off. If our `value` is `true` we set an attribute on the `reactive-chart` component. If our `value` is false, we remove the attribute.

<deploy-docs-callout level="info">

**Note:** for more details on dealing with binary attributes see [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML).

</deploy-docs-callout>

With this attribute being added or removed from the `reactive-chart` component, it will be notified via its  `attributeChangedCallback`. Then our chart can re-render itself based on the updated attributes.

Check out the [demo](https://horse-6n8.begin.app/chart) and [source code](https://github.com/macdonst/e-components/tree/reactive) for this example.

## Shared State or Store

For larger applications, managing state between multiple components can become complex. In such cases, using a shared state management solution can be beneficial and that’s why `@enhance/store` exists. Store based communication is not limited to a parent-child relation. You can share information between any components.

In our second example we’ll simplify our chart component that is still composed of three child components (blue border): `chart-options`, `chart-type` and `reactive-chart`. We will replace `CustomEvents` with a shared state so that sibling elements can communicate with each other instead of requiring a parent element to receive events and pass down attribute changes.

![Another chart example](/_public/blog/post-assets/component-communication/example2.png)

`@enhance/store` is a [singleton](https://en.wikipedia.org/wiki/Singleton_pattern) reactive data store. The store provides an interface that allows components to subscribe to updates to the store or specific properties on the store.

For our example we will create a new file called `app/browser/api.mjs`. That is where we will initialize our store.


<begin-code filename="app/browser/api.mjs">

```javascript
import Store from '@enhance/store'

const store = Store()

export default function API() {
   initialize()

   return {
     store,
     subscribe: store.subscribe,
     unsubscribe: store.unsubscribe
   }
}
```

</begin-code>

This API interface will give components access to our store and a convenient way to subscribe/unsubscribe the changes to data in the store.

For our "position" selection box we will use the `chart-options` component from the previous example. Switching it from firing a `CustomEvent` to updating the store. The `optionChanged` method becomes:

```javascript
optionChanged(evt) {
    this.api.store.position = evt.target.value
}
```

Since we are no longer sending `CustomEvents` the `chart-container` component becomes purely presentational. You can remove all of the business logic and just have a render method. For example:


<begin-code filename="app/components/chart-container.mjs">

```javascript
import CustomElement from '@enhance/custom-element'

export default class ChartContainer extends CustomElement {
   render({ html }) {
       return html`
       <e-row>
       <e-col colspan="12">
           <e-box ord="primary">
               <e-row>
               <e-col>
               <chart-type>
                   <e-input-group>
                       <legend>Sort By</legend>
                       <fieldset>
                           <input id="goals" type="radio" name="type" value="goals">
                           <label for="goals">Goals</label>
                           <input id="assists" type="radio" name="type" value="assists">
                           <label for="assists">Assists</label>
                           <input id="points" type="radio" name="type" value="points" checked>
                           <label for="points">Points</label>
                       </fieldset>
                   </e-input-group>
               </chart-type>
               </e-col>
               <e-col>
               <chart-options>
                   <e-input-group field-class="flex justify-content-between align-items-center" >
                       <fieldset>
                           <select>
                               <option value="all">Position</option>
                               <option value="C">Centre</option>
                               <option value="L">Left Wing</option>
                               <option value="R">Right Wing</option>
                               <option value="D">Defence</option>
                         </select>
                       </fieldset>
                   </e-input-group>
               </chart-options>
               </e-col>
               </e-row>
               <reactive-chart
                   data-key="scorers"
                   type="points"
                   heading="2023 NHL Scoring Leaders"
                   value-key="Points"
                   value-names="Goals,Assists,Points"
                   position="all"
                   multiple
                   show-labels>
               </reactive-chart>
               </e-box>
           </e-col>
       </e-row>
       `
   }
}

customElements.define("chart-container", ChartContainer);
```

</begin-code>

Now in our `reactive-chart` we’ll subscribe to changes in the store.

```javascript
connectedCallback() {
    this.api.subscribe(this.update,['chartData', 'position', 'type'])
}

disconnectedCallback() {
    this.api.unsubscribe(this.update)
}
```

If the `chart-options` or `chart-type` component updates the state the `update` method of `reactive-chart` will be invoked.

```javascript
update(payload) {
    if (payload.position) {
        this.setAttribute('position', payload.position)
    }
    if (payload.type) {
        this.setAttribute('type', payload.type)
    }
    if (payload.chartData) {
        // re-render chart with updated data
    }
}
```

Then the component takes advantage of the `attributeChangedCallback` to re-render itself based on the `position` or `type` filter you set.

Check out the [demo](https://shiny-qmm.begin.app/chart) and [source code](https://github.com/macdonst/e-components/tree/reactive-store) for this example.


## Final Thoughts

By leveraging what the web platform already provides we can communicate between parent and child components by passing attributes down to the child and events up to the parent. This is enough for most web applications and we caution you not to rush into more complicated solutions. When interactions get more complex, then consider adopting a shared state solution like `@enhance/store`.
