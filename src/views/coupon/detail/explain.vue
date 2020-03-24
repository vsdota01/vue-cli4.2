<template>
  <div class="conpon-explain">
    <MyHeader></MyHeader>
    <div class="container">
      <div class="title">使用须知</div>
      <p class="conpon-explain-detial">
        <Editor :detail="detail.couponExplain"></Editor>
      </p>
    </div>
    <div class="safebottom"></div>
  </div>
</template>

<script>
import MyHeader from "@/components/Header/myHeader.vue";
import Editor from "@/components/Editor/index.vue";
import { queryTicketDetails } from "@/api/coupon/index";
import "../style/bag.scss";
export default {
  data() {
    return {
      detail: {}
    };
  },
  components: { MyHeader, Editor },
  methods: {
    fQueryTickets() {
      this.$store.commit("showLoading");
      queryTicketDetails({ ticketId: this.$route.query.id })
        .then(resp => {
          this.detail = resp.ticketDetails || {};
        })
        .catch(err => {
          this.$toast(err);
        })
        .finally(() => {
          this.$store.commit("hideLoading");
        });
    }
  },
  mounted() {
    this.fQueryTickets();
  }
};
</script>

<style></style>
