<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="view"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" class="view"></router-view>
    </transition>
    <tabbar v-if="$route.meta.tabbar && footerBar"></tabbar>
    <loading v-if="$store.state.common.loading" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import prefixAPI from "@/api/prefixAPI"; // prefixAPI 前缀
import tabbar from "@/components/tabbar";
import Loading from "@/components/loading.vue";
export default {
  name: "app",
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  components: {
    tabbar: tabbar,
    Loading
  },
  computed: {
    ...mapGetters(["footerBar"])
  },
  beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack;
    if (isBack) {
      this.transitionName = "slide-right";
    } else {
      this.transitionName = "slide-left";
    }
    this.$router.isBack = false;
  },
  created() {
    
  },
  mounted() {
    this.rem();
  },
  methods: {
    rem() {
      !(function(n) {
        let w = 750;
        var e = n.document,
          t = e.documentElement,
          i = w,
          // d=i/100,
          d = 10,
          o = "orientationchange" in n ? "orientationchange" : "resize",
          a = function() {
            var n = t.clientWidth || 320;
            n > w && (n = w);
            t.style.fontSize = n / d + "px";
          };
        e.addEventListener &&
          (n.addEventListener(o, a, !1),
          e.addEventListener("DOMContentLoaded", a, !1));
      })(window);
    }
  }
};
</script>

<style lang="less" scoped>
#app {
}
.view {
  margin: 0 auto;
  max-width: 750px;
  // position: absolute;
  // left:50%;
  // transform: translate(-50%,0);
  // top:0;
  min-height: 100%;
  width: 100%;
  padding-bottom: 80px;
  transition: all 0.2s cubic-bezier(0.15, 0, 0.1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
</style>
