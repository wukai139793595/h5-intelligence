<template>
  <div class="home">
    <nav-bar title="首页" :left="1" backurl="/index"></nav-bar>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in bannerImages" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <!--  -->
    <ul class="nav">
      <li v-for="(item,index) in nav" :key="index">
        <router-link :to="'/programme/office?id='+item.id">
          <i class="iconfont" :class="iconArr[index]"></i>
          {{item.projectName}}
          <van-icon name="arrow" />
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Button, Icon } from "vant";
import { mapMutations } from "vuex";
import NavBar from "@/components/navBar/navBar.vue";
import { $home } from "@/api";
export default {
  components: {
    [Button.name]: Button,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    NavBar
  },
  data() {
    return {
      bannerImages: [],
      iconArr:["icon-bangongshi","icon-gongchang","icon-jiudian","icon-lingshou","icon-zidingyi"],
      nav: []
    };
  },
  watch: {},
  computed: {},
  mounted() {
    this.init();
    this.getProjectList();
    
  },
  methods: {
    ...mapMutations(["set_loading"]),
    getProjectList() {
      this.set_loading(true);
      $home.getProjectList(
        {},
        res => {
          this.set_loading(false);
          if (res && res.success == true) {
            this.nav = res.data
          }
        },
        err => {
          this.set_loading(false);
        }
      );
    },
    async init() {
      // this.nav = [
      //   {
      //     icon: "icon-bangongshi",
      //     link: "/programme/office",
      //     title: "办公区场景解决方案"
      //   },
      //   {
      //     icon: "icon-gongchang",
      //     link: "/programme/factory",
      //     title: "智慧厂区场景解决方案"
      //   },
      //   {
      //     icon: "icon-jiudian",
      //     link: "/programme/hotel",
      //     title: "智慧酒店场景解决方案"
      //   },
      //   {
      //     icon: "icon-lingshou",
      //     link: "/programme/retail",
      //     title: "新零售场景解决方案"
      //   },
      //   {
      //     icon: "icon-zidingyi",
      //     link: "/programme/custom",
      //     title: "自定义场景解决方案"
      //   }
      // ];

      this.bannerImages = [
        "./static/images/temp/banner.jpg",
        "./static/images/temp/banner.jpg",
        "./static/images/temp/banner.jpg",
        "./static/images/temp/banner.jpg"
      ];
      // let ret = await $http.get($intelligence.loginSubmit,{})
      // console.log(ret);
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/modules/home.less";
</style>
