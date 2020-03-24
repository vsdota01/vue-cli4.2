<template>
  <div
    class="couponItem flex"
    :class="[translateTop ? 'trans' : '']"
    @click="_click"
  >
    <div class="couponItem-left">
      <div class="left-container flex flex-center flex-column">
        <div
          class="amt"
          :class="[translateTop ? 'trans' : '']"
          v-if="item.couponType == 1 || item.couponType == 3"
        >
          ¥{{ item.couponValue }}
        </div>
        <div
          class="amt"
          :class="[translateTop ? 'trans' : '']"
          v-if="item.couponType == 2"
        >
          {{ item.couponDiscount }}折
        </div>
        <div class="tips" v-if="item.couponType == 1">
          满{{ item.couponThreshold }}可用
        </div>
        <div class="tips" v-if="translateTop && item.couponType == 2">
          &nbsp;
        </div>
      </div>
      <!-- <div class="circle-top" :style="'background:'+this.color+''"></div>
      <div class="circle-bottom" :style="'background:'+this.color+''"></div> -->
    </div>
    <div class="couponItem-right flex flex-column">
      <div class="couponItem-name ellipsis">{{ item.couponName }}</div>
      <div class="couponItem-autograph">{{ item.couponCollectDesc }}</div>
      <div class="couponItem-during">
        {{ item.couponStartTime | formatTime }} 至
        {{ item.couponEndTime | formatTime }}
      </div>
    </div>
    <div class="couponItem-stauts flex flex-center" v-if="showTag && tag">
      {{ tag }}
    </div>
    <div class="overView" v-if="disabled"></div>
    <slot name="status"></slot>
  </div>
</template>

<script>
import { parseTime } from "@/utils/index.js";
export default {
  props: ["color", "translateTop", "showTag", "disabled", "item"],
  methods: {
    _click() {
      this.$emit("click", this.item);
    }
  },
  filters: {
    formatTime(v) {
      return parseTime(v, "{y}-{m}-{d}");
    }
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

<style scoped lang="scss">
.couponItem {
  width: 100%;
  height: 188px;
  background-image: url("../assets/bg_card@2x.png");
  background-size: 100% 100%;
  /* background: #FFFFFF;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.11); */
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  &.trans {
    margin-top: -110px;
    &:first-child {
      margin-top: 0;
    }
  }
  .overView {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.58);
  }
  .couponItem-left {
    padding: 30px 0;
    position: relative;
    width: 26.8%;
    box-sizing: border-box;
    .left-container {
      width: 100%;
      height: 128px;
      /* border-right: 1PX dashed #BFBFBF; */
      .amt {
        font-family: "PingFangSC-Medium";
        font-size: 48px;
        color: #e65a5a;
        &.trans {
          font-size: 36px;
          margin-top: -60px;
        }
      }
      .tips {
        font-family: "PingFangSC-Regular";
        font-size: 20px;
        color: #a8b9c6;
        letter-spacing: 0.17px;
      }
    }
    .circle-top {
      position: absolute;
      top: -13px;
      right: -13px;
      width: 26px;
      height: 26px;
      border-radius: 40px;
      background: #ffffff;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08) inset;
    }
    .circle-bottom {
      position: absolute;
      bottom: -13px;
      right: -13px;
      width: 26px;
      height: 26px;
      border-radius: 40px;
      background: #ffffff;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.11) inset;
    }
  }
  .couponItem-right {
    width: 73.2%;
    padding: 30px 0;
    padding-left: 44px;
    font-family: "PingFangSC-Regular";
    /* background-color: #fff;
          background: radial-gradient(circle at top left,
               transparent 20px,  transparent 0) top left,
      		radial-gradient(circle at bottom left,
               transparent 20px,  transparent 0) bottom left;
      		background-size: 100% 50%;
               background-repeat: no-repeat; */
    .couponItem-name {
      font-size: 30px;
      color: #2f3a44;
    }
    .couponItem-autograph {
      margin-top: 15px;
      font-size: 22px;
      color: #a8b9c6;
    }
    .couponItem-during {
      margin-top: 12px;
      font-size: 22px;
      color: #a8b9c6;
    }
  }
  .couponItem-stauts {
    position: absolute;
    top: 6px;
    right: 8px;
    width: 150px;
    height: 52px;
    border-top-right-radius: 16px;
    background-image: url(../assets/sq@2x.png);
    background-size: 100% 100%;
    font-size: 22px;
    color: #e8c475;
  }
}
</style>
