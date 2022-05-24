// node_modules/@enhance/store/index.mjs
var _state = {};
var dirtyProps = [];
var listeners = [];
var inWindow = typeof window != "undefined";
var set = inWindow ? window.requestAnimationFrame : setTimeout;
var cancel = inWindow ? window.cancelAnimationFrame : clearTimeout;
var timeout;
var handler = {
  set: function(obj, prop, value) {
    if (prop === "initialize" || prop === "subscribe" || prop === "unsubscribe") {
      return false;
    }
    let oldValue = obj[prop];
    if (oldValue !== value) {
      obj[prop] = value;
      dirtyProps.push(prop);
      timeout && cancel(timeout);
      timeout = set(notify);
    }
    return true;
  }
};
_state.initialize = initialize;
_state.subscribe = subscribe;
_state.unsubscribe = unsubscribe;
var store = new Proxy(_state, handler);
function Store(initialState) {
  if (initialState) {
    initialize(initialState);
  }
  return store;
}
function merge(o, n) {
  for (let prop in n) {
    o[prop] = n[prop];
  }
}
function initialize(initialState) {
  if (initialState) {
    merge(_state, initialState);
  }
}
function subscribe(fn, props) {
  fn.observedProperties = props || [];
  return listeners.push(fn);
}
function unsubscribe(fn) {
  return listeners.splice(listeners.indexOf(fn), 1);
}
function notify() {
  listeners.forEach((fn) => {
    const props = fn.observedProperties;
    const payload = props.length ? dirtyProps.filter((key) => props.includes(key)).reduce((obj, key) => {
      return {
        ...obj,
        [key]: _state[key]
      };
    }, {}) : { ..._state };
    fn(payload);
  });
  dirtyProps.length = 0;
}
export {
  Store as default
};
