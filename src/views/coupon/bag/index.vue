<template>
  <div class="conpon-bag">
    <MyHeader :disDefault="true" @back="back"> </MyHeader>
    <div class="container">
      <div class="title">我的卡包</div>
      <div class="offline-bag" v-if="list.length > 0">
        <div class="card-container">
          <CouponItem
            :color="index == 0 ? '#5d5d5d' : '#fff'"
            :translateTop="true && list.length > 1"
            :showTag="true"
            v-for="(item, index) in list"
            :key="index"
            :item="item"
          ></CouponItem>
        </div>
        <div class="curve" v-if="list.length > 0"></div>
        <div class="flex flex-js-betw flex-ai-center conpon-bag-show">
          <div class="typeName">线下使用包</div>
          <div class="lookAll link flex flex-ai-center" @click="toList(1)">
            查看全部(<span>{{ total }}</span
            >)<img src="../assets/link@2x.png" class="link" />
          </div>
        </div>
      </div>
      <div class="noData" v-else>
        <span class="noMore">暂无可用券</span>
        <span class="theme" @click="toInvalid">查看失效券</span>
      </div>
      <!-- <div class="card-bag">
        <div class="card-container">
          <CouponItem color="#e1c183" :translateTop="true" :showTag="true"></CouponItem>
          <CouponItem color="#fff" :translateTop="true" :showTag="false"></CouponItem>
        </div>
        <div class="curve"></div>
        <div class="flex flex-js-betw flex-ai-center conpon-bag-show">
          <div class="typeName">兑换卡包</div>
          <div class="lookAll link flex flex-ai-center" @click="toList(1)">查看全部(<span>12</span>)<img src="../assets/link@2x.png" class="link"/></div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/Header/myHeader.vue";
import CouponItem from "../components/CouponItem.vue";
import { queryMyTickets } from "@/service/coupon/index";
import "../style/bag.scss";
export default {
  data() {
    return {
      list: [],
      total: 0
    };
  },
  components: { MyHeader, CouponItem },
  methods: {
    back() {
      this.$wk.exit();
    },
    toInvalid() {
      this.$route.push({ path: "/coupon/invalid" });
    },
    toList(index) {
      this.$route.push({ path: "/coupon/list", query: { type: index } });
    },
    fQueryMyTickets() {
      this.$store.commit("showLoading");
      queryMyTickets({ couponStatus: 1, limit: 2, offset: 0 })
        .then(resp => {
          this.list = this.list.concat(resp.list);
          this.total = resp.total || 0;
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
    this.fQueryMyTickets();
  }
};
</script>
