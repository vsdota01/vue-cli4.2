import Vue from "vue";
import templete from "./index.vue";

const ToastConstructor = Vue.extend(templete);

let instance = new ToastConstructor().$mount();

ToastConstructor.prototype.close = function() {
  return (
    instance.$el &&
    instance.$el.parentNode &&
    instance.$el.parentNode.removeChild(instance.$el)
  );
};

let Toast = (options = {}) => {
  instance.close();
  clearTimeout(instance.timer);
  instance = new ToastConstructor().$mount();
  let duration = options.duration || 2000;
  instance.message = typeof options === "string" ? options : options.message;
  instance.position = options.position || "middle";
  instance.className = options.className || "";
  document.body.appendChild(instance.$el);
  return new Promise(resolve => {
    Vue.nextTick(function() {
      instance.timer = setTimeout(function() {
        instance.close();
        resolve();
      }, duration);
    });
  });
};

export default Toast;
