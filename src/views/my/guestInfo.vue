<template>
  <div class="guestInfo">
    <nav-bar title="订单客户信息" :left="1" :backurl="'/my/index'"></nav-bar>
    <div class="search-wrap">
        <van-search placeholder="请输入搜索关键词" v-model="value" @input="searchHandle"/>
    </div>
    <div class="guestInfoList">
        <ul>
            <li v-for="(item,index) in guestInfoList" :key="index" @click="$router.push({path:'/my/guestOrder',query:{busniessName:item.busniessName}})">
                <div class="title">
                    <span class="fr">订单数：{{item.orderCount}}</span>
                    <i class="iconfont icon-gongsi"></i>{{item.busniessName}}
                </div>
                <div class="info">
                    <p>企业地址：{{item.busniessAddress}}</p>
                    <p>联系方式：{{item.contactTel}}</p>
                    <p>联系人：{{item.contactName}}</p>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { Search } from "vant"
import NavBar from "@/components/navBar/navBar.vue";
import {$my} from "@/api"
export default {
  components: {
    [Search.name]:Search,
    NavBar
  },
  data() {
    return {
    //    String busniessName;/*企业名称*/
    // String busniessAddress;/*企业地址*/
    // String contactName;/*联系人名称*/
    // String contactTel;/*联系人电话*/
    // Integer orderCount;/*订单数量*/
        value:'',
        guestInfoList:[]
    };
  },
  mounted () {
      this.init();
  },
  methods: {
      init(){
        this.orderAccountList();
          // for(let i=0; i<5; i++) {
          //     this.guestInfoList.push(
          //         {id:Math.random(),title:'杭州xx贸易有限公司',orderNumber:12+i, address:'浙江省杭州市江干区秋涛北路101号304室',tel:'13305716666',contacts:'朱xx'}
          //     )
          // }
      },
      orderAccountList () {
        $my.orderAccountList({},res => {
          if (res && res.success == true) {
              this.guestInfoList = res.data;
          } else {
            this.$toast(res.message)
          }
        },err => {

        })
      },
      searchHandle :(function(event) {
      let timeId = null;
      return function() {
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(() => {
          
          $my.orderAccountList({
            busniessName:this.value
          },res => {
            if (res && res.success == true) {
              this.guestInfoList = res.data;
            } else {
              this.$toast(res.message)
            }
          })
        }, 300);
      };
    })()
  },
  filters: {
    
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/modules/guestOrder.less";
</style>
<style lang="less">
.guestInfo {
  .van-cell__value {
    border: 1px solid #e1e2e3;
    border-radius: 100px;
    padding: 5px;
  }
  .van-search .van-field__control {
    text-indent: 60px!important;
  }
  .van-field{
    position: relative;
    .van-field__left-icon {
      position: absolute;
      left: 20px;
      top: 10px;
      .van-icon {
        font-size: 36px;
        color:#cbcbcb;
      }
    }
    .van-field_clear{
      color: #bfc2c2;
      margin-right:30px;
    }
  }      
}
</style>