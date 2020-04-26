<template>
  <div id="productHome" @click="showSelect=false">
    <nav-bar title="智慧企业产品" :right="1" :left="2" :address.sync="address" @focusSearch="focusSearch"></nav-bar>
    <div class="part part-jjfa-1">
      <ul>
        <li class="outer-li" :class="{'inputFocus':inputFocus}">
          <label v-if="!inputFocus">
            <i class="iconfont icon-normal"></i>客户名称
          </label>
          <div class="search-wrap">
            <van-search
              :class="{'search_err':search_err}"
              v-if="!inputFocus"
              clearable
              v-model="company"
              @focus="search_err=false"
              @input="searchInputHandle"
              placeholder
            />
            <ul class="auto-box" v-if="showSelect">
              <li class="auto-item" v-for="item in autoSearchArr" @click="selectHandle(item)">{{item.businessName}}</li>
            </ul>
          </div>
          <template v-if="inputFocus">
            <van-field clearable ref="searchField" v-model='configName' placeholder />
            <i class="iconfont icon-sousuo"></i>
            <van-button type="info" @click="searchHandle">搜索</van-button>
            <label class="cancel" @click="blurSearch">取消</label>
          </template>
        </li>
      </ul>
    </div>
    <van-tabs v-model="active" :sticky="true" @click="tabsClickHandle" :swipe-threshold="5" scrollspy lazy-render>
      <van-tab
        :title="item.configName"
        :name="item.configCode"
        v-for="(item) in typeArr"
        :key="item.configCode"
      >
        <product-item
          :searchKey="company"
          :company="company"
          :configName.sync="configName"
          :search_err.sync="search_err"
          :inputFocus.sync="inputFocus"
          :ref="item.configCode"
          :obj="item"
        ></product-item>
      </van-tab>
      <!-- <van-tab title="DICT" name="1" v->
        <product-item :searchKey="company" :type="'dict'"></product-item>
      </van-tab>
      <van-tab title="硬件" name="2">
        <product-item :searchKey="company" :type="'hardware'"></product-item>
      </van-tab>
      <van-tab title="软件" name="3">
        <product-item :searchKey="company" :type="'soft'"></product-item>
      </van-tab>
      <van-tab title="套餐" name="4">
        <product-item :searchKey="company" :type="'pack'"></product-item>
      </van-tab>
      <van-tab title="维保服务" name="5">
        <product-item :searchKey="company" :type="'server'"></product-item>
      </van-tab>-->
    </van-tabs>
    <div class="mask" v-if="inputFocus"></div>
  </div>
</template>

<script>
import { Tab, Tabs, Field, Button, Icon, Search } from "vant";
import { mapActions } from "vuex";
import NavBar from "@/components/navBar/navBar.vue";
import productItem from "./components/productItem.vue";
import { $product,$my } from "@/api";
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Search.name]: Search,
    NavBar,
    productItem
  },
  data() {
    return {
      title: "",
      inputFocus: false,
      search_err: false, //search未输入显示红色边框
      showSelect: false,
      configName: '',  //搜索类型的值
      address: "杭州",
      company: "",
      typeArr: [],
      active: "1",
      autoSearchArr: []
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      // 获取类型
      $product.getConfigType(
        {},
        res => {
          if (res && res.success == true) {
            this.typeArr = res.data;
            this.active = res.data[0].configCode;
          }
        },
        err => {}
      );
    },
    // tabs 点击
    tabsClickHandle (){
      this.configName = '';
      setTimeout(()=>{
        this.$refs[this.active][0].init();
      },100)
    },
    // 点击顶部导航搜索图标
    focusSearch() {
      this.inputFocus = true;
    },
    // 点击取消
    blurSearch() {
      this.inputFocus = false;
    },
    // 搜索产品
    searchHandle() {
      // console.log(this.$refs[this.active])
      this.$refs[this.active][0].searchByName();
    },
    // 选中提示列表
    selectHandle (item) {
      this.company = item.businessName;
      this.showSelect = false;
    },
    // 自动搜索功能
    searchInputHandle: (function(event) {
      let timeId = null;
      return function() {
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(() => {
          if (!this.company) {
            this.selectArr = [];
            return;
          }
          if (this.company.length < 2) {
            return;
          }
          $my.getPurposeCustomer({
            businessName:this.company
          },res => {
            if (res && res.success == true) {
              this.autoSearchArr = res.data;
              this.showSelect =true
            }
          })
        }, 300);
      };
    })()
  }
};
</script>

<style lang="less">
#productHome {
  .van-tab--active {
    color: #237bf7;
  }

  .van-tabs__line {
    background: #237bf7;
  }
}
</style>
<style lang="less" scoped>
@import "~@/assets/css/modules/product.less";
</style>
