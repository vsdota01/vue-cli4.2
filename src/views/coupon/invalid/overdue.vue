<template>
  <div class="conpon-list">
    <van-list
      :loading="loading"
      :finished="finished"
      @load="fQueryMyTickets"
      finished-text="没有更多了"
    >
      <CouponItem
        color="#fff"
        class="conpon-list-item"
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        :disabled="true"
      >
        <div slot="status" class="conpon-status flex flex-center">已过期</div>
      </CouponItem>
    </van-list>
  </div>
</template>

<script>
import CouponItem from "../components/CouponItem.vue";
import { queryMyTickets } from "@/api/coupon/index";
import { routerLink } from "@/utils/public.js";
import "../style/bag.scss";
export default {
  data() {
    return {
      offset: 0,
      limit: 5,
      loading: false,
      finished: false,
      list: []
    };
  },
  components: { CouponItem },
  methods: {
    toInvalid() {
      routerLink({ path: "/coupon/invalid" });
    },
    toDetail(item) {
      routerLink({ path: "/coupon/detail", query: { id: item.id } });
    },
    fQueryMyTickets() {
      this.$store.commit("showLoading");
      this.loading = true;
      queryMyTickets({
        couponStatus: 4,
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
  }
};
</script>

<style></style>
