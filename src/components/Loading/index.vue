<template>
  <div v-show="value" @touchmove.prevent class="load-box">
    <div class="loader ball-pulse-sync">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
import "loaders.css/src/animations/ball-pulse-sync.scss";
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style>
.load-box {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.3);
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loader > div {
  width: 30px;
  height: 30px;
  background-color: #56bacf;
}
</style>
