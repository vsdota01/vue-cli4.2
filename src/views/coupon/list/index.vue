<template>
  <div class="conpon-list">
    <MyHeader :disDefault="true" @back="back"></MyHeader>
    <div class="container">
      <div class="title">我的卡包</div>
      <van-list :loading="loading" :finished="finished" @load="fQueryMyTickets">
        <CouponItem
          color="#fff"
          class="conpon-list-item"
          v-for="(item, index) in list"
          :key="index"
          :item="item"
          @click="toDetail(item)"
        >
        </CouponItem>
      </van-list>
      <div class="list-footer flex flex-center">
        <span class="noMore">没有更多了</span>
        <span class="theme" @click="toInvalid">查看失效券</span>
      </div>
    </div>
    <div class="safebottom"></div>
  </div>
</template>

<script>
import MyHeader from "@/components/Header/myHeader.vue";
import { queryMyTickets } from "@/api/coupon/index";
import CouponItem from "../components/CouponItem.vue";
import { routerLink } from "@/utils/public.js";
import "../style/bag.scss";
export default {
  data() {
    return {
      offset: 0,
      limit: 5,
      loading: false,
      finished: false,
      list: [],
      from: ""
    };
  },
  components: { MyHeader, CouponItem },
  methods: {
    toInvalid() {
      routerLink({ path: "/coupon/invalid" });
    },
    toDetail(item) {
      if (this.from) {
        this.$wk.sendCouponItem(item);
      } else {
        if (item.source == "mini" || item.source == "MINI") return;
        routerLink({ path: "/coupon/detail", query: { id: item.id } });
      }
    },
    back() {
      if (!this.from) {
        this.$wk.exit();
      } else {
        history.back();
      }
    },
    fQueryMyTickets() {
      this.$store.commit("showLoading");
      this.loading = true;
      queryMyTickets({
        couponStatus: 1,
        limit: this.limit,
        offset: this.offset
      })
        .then(resp => {
          this.list = this.list.concat(resp.list);
          if (!resp.hasMore) {
            this.finished = true;
          } else {
            this.offset += this.limit;
          }
        })
        .catch(err => {
          this.finished = true;
          this.$toast(err);
        })
        .finally(() => {
          this.loading = false;
          this.$store.commit("hideLoading");
        });
    }
  },
  created() {
    this.from = this.$route.query.from || "";
  }
};
</script>

<style></style>
