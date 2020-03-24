<template>
  <div class="toast-box" :class="customClass" ref="box">
    <!-- <app-toast v-for="(i, index) in list" :key="index" :message="i.message" :position='i.position' :duration="duration"/> -->
  </div>
</template>

<style scoped>
.toast-box {
  position: fixed;
  max-width: 80%;
  min-width: 400px;
  z-index: 4000;
  transition: opacity 0.3s linear;
  display: flex;
  flex-direction: column;
}
.toast-box > div {
  margin-bottom: 20px;
}
.placetop {
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}
.placemiddle {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.placebottom {
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}
.pop-enter,
.pop-leave-active {
  opacity: 0;
}
</style>

<script>
import Vue from "vue";
import AppToast from "./index.vue";
const ToastConstructor = Vue.extend(AppToast);

const list = [];
export default {
  name: "toastBox",
  props: {
    message: String,
    className: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: "middle"
    },
    duration: {
      type: Number,
      default: null
    }
  },
  computed: {
    customClass() {
      var classes = [];
      switch (this.position) {
        case "top":
          classes.push("placetop");
          break;
        case "bottom":
          classes.push("placebottom");
          break;
        default:
          classes.push("placemiddle");
      }
      classes.push(this.className);
      return classes.join(" ");
    }
  },
  methods: {
    toast(params) {
      let duration = params.duration;
      list.push({
        ...params
      });
      const n = list.length;
      duration = n * duration;
      let instance = new ToastConstructor().$mount();
      instance.message = params.message;
      instance.duration = duration;
      this.$refs.box.appendChild(instance.$el);
      setTimeout(() => {
        this.list = [...list.splice(n - 1, 1)];
      }, duration);
    }
  }
};
</script>
