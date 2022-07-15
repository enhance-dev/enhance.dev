/* eslint-disable fp/no-class */
// import API from '/components/data/api.js'

export default function myBase(tagName,config) {
  
  return 
}




export default class EnhanceBase extends HTMLElement {
  constructor() {
    super()
    //   this.api = API()
  }

  select(selector) {
    return this.shadowRoot
      ? this.shadowRoot.querySelector(selector)
      : this.querySelector(selector)
  }

  selectAll(selector) {
    return this.shadowRoot
      ? this.shadowRoot.querySelectorAll(selector)
      : this.querySelectorAll(selector)
  }

  addTemplate(element, selector, replaceContents = false) {
    const template = this.select(selector).content.cloneNode(true)
    replaceContents ? (element.innerHTML = '') : null

    element.appendChild(template)
  }

  findAllDeep(parent, selectors, depth = null) {
    let nodes = []
    let currentDepth = 1
    const recursiveSeek = (_parent) => {
      let next = _parent.shadowRoot
        ? _parent.assignedNodes({ flatten: true })
        : _parent.children
      for (let child of next) {
        if (child.querySelector) {
          const foundItems = child.querySelectorAll(selectors)
          nodes = [...nodes, ...foundItems]
          if (depth && currentDepth < depth) {
            for (const slot of child.querySelectorAll('slot')) {
              recursiveSeek(slot)
            }
          }
        }
      }
    }
    recursiveSeek(parent)
    return nodes
  }
}
