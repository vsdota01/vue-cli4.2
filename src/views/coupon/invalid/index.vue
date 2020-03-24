<template>
  <div class="conpon-bag">
    <MyHeader></MyHeader>
    <div class="container">
      <div class="title">失效券</div>
      <nav class="conpon-bag-nav flex flex-ai-center">
        <div
          class="nav-item"
          :class="[active == 1 ? 'active' : '']"
          @click="fChangeRoute(1, 'used')"
        >
          已使用
        </div>
        <div
          class="nav-item"
          :class="[active == 2 ? 'active' : '']"
          @click="fChangeRoute(2, 'overdue')"
        >
          已过期
        </div>
        <div class="flex1"></div>
      </nav>
      <router-view></router-view>
    </div>
    <div class="safebottom"></div>
  </div>
</template>

<script>
import MyHeader from "@/components/Header/myHeader.vue";
import "../style/bag.scss";
export default {
  data() {
    return {
      active: 1
    };
  },
  components: { MyHeader },
  methods: {
    fChangeRoute(index, path) {
      if (this.active == index) return;
      this.active = index;
      this.$router.replace({ path: path });
    }
  }
};
</script>

<style></style>
