import ChMessage from "./Index.vue";
import { h, render } from "vue";

const MOUNT_COMPONENT_REF = "ch_component";
const COMPONENT_CONTAINER_SYMBOL = Symbol("ch_component_container");

function mergeOptions(opts, type = "success", duration) {
  const defaultOpts = {
    duration: duration || 3000,
    type
  };
  if (typeof opts === "string") {
    defaultOpts.message = opts;
    return defaultOpts;
  }
  return Object.assign({}, defaultOpts, opts);
}

function createMessage(opts) {
  const instance = createMessageComponentByOpts(opts);
  appendToBody(instance);
  return instance.proxy;
}

function createMessageComponentByOpts(opts) {
  return createComponent(ChMessage, opts);
}

function appendToBody(componentInstance) {
  document.body.append(componentInstance.vnode.el);
}

function createComponent(Component, props, children) {
  const vnode = h(Component, { ...props, ref: MOUNT_COMPONENT_REF }, children);
  const container = document.createElement("div");
  vnode[COMPONENT_CONTAINER_SYMBOL] = container;
  render(vnode, container);
  return vnode.component;
}

export function Message(opts) {
  return createMessage(mergeOptions(opts));
}
