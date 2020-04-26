<template>
  <div class="my">
    <nav-bar :left="0" title="我的"></nav-bar>
    <div class="my-wrap">
      <div class="client-info">
        <div class="img-wrap">
          <img src="~@/assets/images/avater.png" alt />
        </div>
        <div class="client-content">
          <p class="name">{{userInfo.userName}}</p>
          <p class="company">
            <span>{{userInfo.sysCompanyName}}</span>
            <span>{{userInfo.deptName}}</span>
          </p>
          <p class="satisfaction">
            <span>客户满意度</span>
            <van-rate v-model="value" readonly />
            <span class="degree">非常满意（100分）</span>
          </p>
        </div>
      </div>
      <div class="potential">
        <img src="~@/assets/images/order.png" alt @click="$router.push('/my/guestInfo')" />
        <img src="~@/assets/images/potential.png" alt @click="$router.push('/my/potentialClient')" />
      </div>
      <div class="finish-order">
        <p class="title">
          <span class="stand">本月完成订单</span>
          <span class="month" @click="selectDateHandle">
            {{currentDate|dateFormat}}月
            <span class="my-icon-down"></span>
          </span>
        </p>
        <ul class="number-wrap">
          <li>
            <p>{{orderMonthCount.successMonthCount}}</p>
            <p>本月完成总数量</p>
          </li>
          <li>
            <p>{{orderMonthCount.successAllCount}}</p>
            <p>已完成数量</p>
          </li>
          <li>
            <p>{{orderMonthCount.onWayMonthCount}}</p>
            <p>在途订单数量</p>
          </li>
        </ul>
      </div>
      <div class="order-accept">
        <div class="accept">
          <div class="title">
            <span class="stand">订单受理</span>
          </div>
          <div class="echarts-wrap">
            <div id="accept"></div>
          </div>
        </div>
        <div class="effect">
          <div class="title">
            <span class="stand">订单实施进度</span>
          </div>
          <ul class="progress-wrap">
            <li>
              <p>
                <span>未处理</span>
                <span>{{orderCount.noAcceptCount}}</span>
              </p>
              <van-progress
                color="linear-gradient(270deg, #ffcd9d 0%, #fea194 51%, #fd758b 100%)"
                :percentage="noAcceptCountPercentage"
                stroke-width="8"
                :show-pivot="false"
              />
            </li>
            <li>
              <p>
                <span>办结完成</span>
                <span>{{orderCount.successCount}}</span>
              </p>
              <van-progress
                color="linear-gradient(270deg,#9eefff 0%, #7ac3ff 51%, #5597ff 100%)"
                :percentage="successCountPercentage"
                stroke-width="8"
                :show-pivot="false"
              />
            </li>
            <li>
              <p>
                <span>办结失败</span>
                <span>{{orderCount.failCount}}</span>
              </p>
              <van-progress
                color="linear-gradient(90deg, #ff9e48 0%, #ffae44 51%, #ffbd3f 100%)"
                :percentage="failCountPercentage"
                stroke-width="8"
                :show-pivot="false"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <van-popup v-model="show" round position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        @confirm="dateConfirmHandle"
        @cancel="dateCancelHandle"
      />
    </van-popup>
  </div>
</template>

<script>
import { Progress, Rate, DatetimePicker, Popup } from "vant";
import { format } from "date-fns";
import echarts from "../../../static/js/echarts.min.js";

import NavBar from "@/components/navBar/navBar.vue";
import { $my } from "@/api";
export default {
  components: {
    [Progress.name]: Progress,
    [Rate.name]: Rate,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    NavBar
  },
  data() {
    return {
      show: false,
      currentDate: new Date(), //时间
      value: 5,
      instance: null,
      orderMonthCount: {
        successMonthCount: "", //月受理成功订单数量
        onWayMonthCount: "", //月在途订单数量
        successAllCount: "" //用户受理成功订单数量
      },
      orderCount: {
        failCount: 0, //办结失败（受理失败）订单数量
        successCount: 0, //办结成功（受理成功）订单数量
        acceptCount: 0, //受理订单数
        noAcceptCount: 0 //未受理订单数
      },
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "智慧企业",
            type: "pie",
            radius: ["30px", "50px"],
            avoidLabelOverlap: false,
            minAngle: 20,
            label: {
              normal: {
                formatter: "  {c}\n {b}",
                show: true
              }
            },
            labelLine: {
              normal: {
                show: false,
                length: 8,
                length2: 6
              }
            },
            data: [
              {
                value: 0,
                name: "受理",
                itemStyle: {
                  color: "#ff9e48"
                }
              },
              {
                value: 0,
                name: "未受理",
                itemStyle: {
                  color: "#7d90ff"
                }
              }
            ]
          }
        ]
      }
    };
  },
  computed :{
    userInfo () {
      return this.$store.state.common.userInfo
    },
    noAcceptCountPercentage() {
      let {failCount,successCount,acceptCount,noAcceptCount} = this.orderCount;
      let total = acceptCount+noAcceptCount;
        if (total == 0) {
          return 0;
        }
      let percent = (noAcceptCount/total) * 100
      return  percent;
    },
    successCountPercentage () {
      let {failCount,successCount,acceptCount,noAcceptCount} = this.orderCount;
      let total = acceptCount+noAcceptCount;
      if (total == 0) {
          return 0;
        }
      let percent = (successCount/total) * 100
      return  percent;
    },
    failCountPercentage () {
      let {failCount,successCount,acceptCount,noAcceptCount} = this.orderCount;
      let total = acceptCount+noAcceptCount;
      if (total == 0) {
          return 0;
        }
      let percent = (failCount/total) * 100
      return  percent;
    }
  },
  created() {
    
  },
  mounted() {
    this.instance = echarts.init(document.getElementById("accept"));
    this.instance.setOption(this.option);
    this.getOrderMonthCount();
    this.getOrderCount();
    this.$store.dispatch('set_user_info')
  },
  methods: {
    // 月订单数据查询
    getOrderMonthCount() {
      let dateStr = this.currentDate
        ? format(this.currentDate, "yyyy-MM-dd")
        : "";
      $my.getOrderMonthCount(
        {
          monthDate: dateStr
        },
        res => {
          if (res && res.success == true) {
            this.orderMonthCount = res.data;
          }
        }
      );
    },
    // 全部订单数据查询
    getOrderCount() {
      $my.getOrderCount({}, res => {
        if (res && res.success == true) {
          console.log("getOrderCount", res);
          this.orderCount = res.data;
          this.option.series[0].data[0].value =res.data.acceptCount;
          this.option.series[0].data[1].value = res.data.noAcceptCount;
          this.instance.setOption(this.option)
        }
      });
    },
    // 确认选择时间
    dateConfirmHandle() {
      this.show = false;
      this.getOrderMonthCount();
    },
    // 取消
    dateCancelHandle() {
      this.show = false;
    },
    // 显示时间选择器
    selectDateHandle() {
      this.show = true;
    }
  },
  filters: {
    dateFormat(time) {
      return time ? format(time, "MM") : "";
    }
  }
};
</script>

<style lang="less" >
.my {
  .van-rate__icon {
    font-size: 14px !important;
  }
}
</style>
<style lang="less" scoped>
@import "~@/assets/css/modules/my.less";
</style>