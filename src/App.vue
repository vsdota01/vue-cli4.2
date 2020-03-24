<template>
  <div id="app">
    <router-view></router-view>
    <loading v-model="$store.state.loading" />
  </div>
</template>

<script>
import Loading from "@/components/Loading";

export default {
  name: "App",
  components: {
    Loading
  }
};
</script>
