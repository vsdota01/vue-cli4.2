<template>
  <div class="conpon-detail">
    <MyHeader></MyHeader>
    <div class="container">
      <div class="title">我的卡包</div>
      <div class="conpon-item-detail">
        <div class="detail-top">
          <div class="conpon-item-explain">
            <div class="conpon-item-name">{{ detail.couponName }}</div>
            <p class="explain-text" v-for="(item, index) in title" :key="index">
              {{ item }}
            </p>
          </div>
          <div class="conpon-item-number flex flex-ai-center theme">
            券号：<span>{{ detail.couponCode }}</span>
          </div>
          <div class="couponItem-stauts flex flex-center" v-if="tag">
            {{ tag }}
          </div>
        </div>
        <div class="detail-bottom flex flex-center flex-column">
          <p class="conpon-detail-during flex">
            有效期：{{ detail.couponStartTime | formatTime }} 至
            {{ detail.couponEndTime | formatTime }}
          </p>
          <p class="flex flex-ai-center flex-js-start" @click="toExplain">
            使用须知<img class="link" src="../assets/linkD@2x.png" />
          </p>
        </div>
      </div>
    </div>
    <div class="safebottom"></div>
  </div>
</template>

<script>
import MyHeader from "@/components/Header/myHeader.vue";
import { parseTime } from "@/utils/index.js";
import { queryTicketDetails } from "@/api/coupon/index";
import "../style/bag.scss";
export default {
  data() {
    return {
      detail: {},
      title: []
    };
  },
  components: { MyHeader },
  filters: {
    formatTime(v) {
      return parseTime(v, "{y}-{m}-{d}");
    }
  },
  methods: {
    toExplain() {},
    fQueryTickets() {
      this.$store.commit("showLoading");
      queryTicketDetails({ ticketId: this.$route.query.id })
        .then(resp => {
          this.detail = resp.ticketDetails || {};
          this.title = this.detail.couponTitle.split("|");
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
  },
  computed: {
    tag() {
      const e = this.item.couponEndTime;
      const t = new Date(new Date().toLocaleDateString()).getTime();
      if (e - t < 3600 * 1000 * 24) {
        return "今日过期";
      } else if (e - t < 3600 * 1000 * 24 * 2) {
        return "明日过期";
      } else if (e - t < 3600 * 1000 * 24 * 4) {
        return "3日后过期";
      } else {
        return null;
      }
    }
  }
};
</script>

<style></style>
