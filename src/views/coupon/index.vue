<template>
  <div class="coupon" :style="styleObject()">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: "",
      styleObject() {
        return {
          height: window.screen.height + "px",
          width: "100%"
        };
      }
    };
  },
  watch: {
    // 使用watch 监听$router的变化
    $route(to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (from.meta.index == undefined) return;
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>
