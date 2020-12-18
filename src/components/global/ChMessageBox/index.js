import ChMessageBox from "./Index.vue";
import { h, render } from "vue";

const MOUNT_COMPONENT_REF = "ch_component_message_box";
const COMPONENT_CONTAINER_SYMBOL = Symbol("ch_component_message_box_container");

/**
 * merge 组件中的 prop
 * @param message
 * @param title
 * @param opts
 */
function mergeOptions(message, title, opts) {
  const defaultOpts = {
    message,
    title
  };
  return Object.assign({}, defaultOpts, opts);
}

function createMessageBox(opts) {
  const instance = createMessageBoxComponentByOpts(opts);
  appendToBody(instance);
  return instance.proxy;
}

function createMessageBoxComponentByOpts(opts) {
  return createComponent(ChMessageBox, opts);
}

function createComponent(Component, props, children) {
  const vnode = h(Component, { ...props, ref: MOUNT_COMPONENT_REF }, children);
  const container = document.createElement("div");
  vnode[COMPONENT_CONTAINER_SYMBOL] = container;
  render(vnode, container);
  return vnode.component;
}

function appendToBody(componentInstance) {
  document.body.append(componentInstance.vnode.el);
}

const MessageBox = function(message = "", title = "", opts) {
  createMessageBox(mergeOptions(message, title, opts));
};

export default MessageBox;
export { MessageBox };
