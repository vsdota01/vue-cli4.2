<template>
  <div class="my-header" v-if="isApp">
    <transition name="fadeIn">
      <div class="toolbar flex flex1 flex-col" v-show="isToolbar">
        <div class="safeTop"></div>
        <div class="androidBar" v-if="isAndroid"></div>
        <header class="flex flex-ai-center flex-js-betw">
          <div class="flex flex-center header-left" @click="back">
            <div class="backBox flex flex-center">
              <img src="@/assets/imgs/navigation_back@2x.png" />
            </div>
          </div>
          <div class="flex flex-center flex1"><slot></slot></div>
          <div class="flex flex-center header-right">
            <slot name="share"></slot>
          </div>
        </header>
      </div>
    </transition>
    <transition name="fadeIn">
      <div class="toolbar_dynamic flex flex1 flex-col" v-show="!isToolbar">
        <div class="safeTop"></div>
        <div class="androidBar" v-if="isAndroid"></div>
        <header class="flex flex-ai-center flex-js-betw">
          <div class="flex flex-center header-left" @click="back">
            <div class="backBox flex flex-center">
              <img src="@/assets/imgs/back@2x.png" />
            </div>
          </div>
          <div class="flex flex-center header-right">
            <slot name="share"></slot>
          </div>
        </header>
      </div>
    </transition>
    <div class="androidBar" v-if="isAndroid && type === 'toolbar'"></div>
    <div class="safeTop" v-if="type === 'toolbar'"></div>
    <div class="h-header" v-if="type === 'toolbar'"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isToolbar: this.type === "toolbar",
      isApp: true
    };
  },
  props: {
    type: {
      default: "toolbar",
      type: String
    },
    offsetTop: {
      default: 100,
      type: Number
    },
    disDefault: {
      default: false,
      type: Boolean
    },
    service: {
      default: false,
      type: Boolean
    },
    preVisitArgs: {
      default: "",
      type: String
    }
  },
  mounted() {
    if (this.$wk.getPlatform() === "web") {
      // this.isApp = false
    }
    if (this.type === "toolbar_dynamic") {
      window.addEventListener("scroll", this.scrollToTop);
    }
  },
  computed: {
    isAndroid() {
      const na = navigator.userAgent.toLowerCase();
      return na.match(/android/);
    }
  },
  methods: {
    scrollToTop() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > this.offsetTop) {
        this.isToolbar = true;
      } else {
        this.isToolbar = false;
      }
    },
    back() {
      if (this.disDefault) {
        this.$emit("back");
      } else {
        window.history.back();
      }
    }
  }
};
</script>
<style scoped="scoped" lang="scss">
@import "@/assets/style/base.scss";
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fadeIn-enter-active {
  animation: fadeIn 0.3s;
}
.fadeIn-leave-active {
  transition: fadeIn 0.1s reverse;
}
.safeTop {
  padding-top: $safetopenv;
  padding-top: $safetop;
  background: transparent;
}
.androidBar {
  height: 40px;
  background: transparent;
}
.my-header {
  .h-header {
    height: 88px;
  }
  .toolbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 99;
    & header {
      width: 100%;
      height: 88px;
      position: relative;
      font-family: $fdefault;
      font-size: 36px;
      color: #2f3a44;
      & > div {
        height: 100%;
      }
      .header-left,
      .header-right {
        position: absolute;
        top: 0;
        min-width: 88px;
      }
      .header-left {
        left: 0;
        .backBox {
          width: 68px;
          height: 68px;
          border-radius: 68px;
          & img {
            width: 23px;
            height: 40px;
          }
        }
      }
      .header-right {
        right: 0;
        .serviceBtn {
          width: 68px;
          height: 68px;
          border-radius: 68px;
          & img {
            width: 48px;
            height: 48px;
          }
        }
      }
    }
  }
  .toolbar_dynamic {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    background: transparent;
    & header {
      width: 100%;
      height: 88px;
      position: relative;
      font-size: 34px;
      & > div {
        height: 100%;
      }
      .header-left,
      .header-right {
        position: absolute;
        top: 0;
        min-width: 88px;
      }
      .header-left {
        left: 10px;
        .backBox {
          width: 68px;
          height: 68px;
          border-radius: 68px;
          background: rgba(227, 227, 227, 0.3);
          & img {
            width: 40px;
            height: 40px;
          }
        }
      }
      .header-right {
        right: 0;
        .serviceBtn {
          width: 68px;
          height: 68px;
          border-radius: 68px;
          background: rgba(227, 227, 227, 0.3);
          & img {
            width: 48px;
            height: 48px;
          }
        }
      }
    }
  }
}
</style>
