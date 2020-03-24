<template>
  <div name="toast-pop" class="aiways-toast">
    <div class="toast" :class="customClass" :style="{ padding: '10px' }">
      <span class="text">{{ message }}</span>
    </div>
  </div>
</template>

<style>
.aiways-toast .toast {
  position: fixed;
  max-width: 80%;
  min-width: 150px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 4000;
  transition: opacity 0.3s linear;
}
.aiways-toast .text {
  font-size: 15px;
  line-height: 2;
  display: block;
  text-align: center;
}
.aiways-toast .placetop {
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}
.aiways-toast .placemiddle {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.aiways-toast .placebottom {
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}
.aiways-toast .pop-enter,
.pop-leave-active {
  opacity: 0;
}
</style>

<script>
export default {
  name: "toast",
  props: {
    message: String,
    className: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: "middle"
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
  }
};
</script>
