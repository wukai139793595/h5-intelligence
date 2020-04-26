<template>
  <div class="potential-client">
    <nav-bar title="意向客户列表" :left="1" :right="2" @addClient="updateClientHandle('add')"></nav-bar>
    <div class="container">
      <div class="search-wrap">
        <van-search placeholder="请输入搜索关键词" v-model="value" @input="searchHandle" />
      </div>
      <div class="list-wrap">
        <div class="head">
          <span class="f1">意向客户名称</span>
          <span class="f2">录入时间</span>
          <span class="f3">操作</span>
        </div>
        <ul class="client-list">
          <li class="item" v-for="(item,index) in clients" :key="index">
            <span class="f1">{{item.businessName}}</span>
            <span class="f2">{{item.createDate|createDateFormat}}</span>
            <span class="f3">
              <i class="iconfont icon-bianji" @click="updateClientHandle('update',item,index)"></i>
              <i class="iconfont icon-shanchu1" @click="deleteHandle(item,index)"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <!-- dialog -->
    <van-dialog
      v-model="dialogInfo"
      width="80%"
      :showConfirmButton="false"
      :showCancelButton="false"
    >
      <div class="dialogInfo">
        <div class="info-wrap">
          <div class="title">
            <span>
              <i class="iconfont icon-kehu"></i>
              <span>意向客户信息</span>
            </span>
            <van-icon @click="cancelHandle" name="cross" size="20px" color="#bebfc1" />
          </div>
          <ul>
            <li :class="{'error':err_name}">
              <i class="iconfont icon--tishi"></i>
              <van-field
                v-model="updateClient.businessName"
                placeholder="请输入企业名称"
                @focus="err_name=false"
              ></van-field>
            </li>
            <li :class="{'error':err_address}">
              <i class="iconfont icon--tishi"></i>
              <van-field
                v-model="updateClient.businessAddress"
                placeholder="请输入企业地址"
                @focus="err_address=false"
              ></van-field>
            </li>
            <li :class="{'error':err_phoneName}">
              <i class="iconfont icon--tishi"></i>
              <van-field
                v-model="updateClient.phoneName"
                placeholder="请输入联系人"
                @focus="err_phoneName=false"
              ></van-field>
            </li>
            <li :class="{'error':err_phoneNumber}">
              <i class="iconfont icon--tishi"></i>
              <van-field
                v-model="updateClient.phoneNumber"
                maxlength="11"
                placeholder="请输入联系方式"
                @focus="err_phoneNumber=false"
              ></van-field>
            </li>
            <li :class="{'error':err_remarks}">
              <i class="iconfont icon--tishi"></i>
              <van-field
                v-model="updateClient.remarks"
                placeholder="请输入备注"
                @focus="err_remarks=false"
              ></van-field>
            </li>
          </ul>
          <div class="btnLay">
            <van-button plain @click="cancelHandle" type="info">取消</van-button>
            <van-button @click="submitHandle" type="info">确定</van-button>
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Dialog, Search, Field, Button, Icon } from "vant";
import { mapMutations } from "vuex";
import NavBar from "@/components/navBar/navBar.vue";

import { $my } from "@/api";
import { format } from "date-fns";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    [Search.name]: Search,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Field.name]: Field,
    NavBar
  },
  data() {
    return {
      handleType: "",
      updateClient: {
        businessName: "", //企业名称
        businessAddress: "", //企业地址
        phoneName: "", //联系人
        phoneNumber: "", //联系电话
        remarks: "" //备注
      },
      dialogInfo: false,
      value: "",
      clients: [
        // {
        //   company: "杭州XX贸易有限公司",
        //   time: "2019-7-21"
        // },
        // {
        //   company: "杭州XX贸易有限公司",
        //   time: "2019-7-21"
        // },
        // {
        //   company: "杭州XX贸易有限公司",
        //   time: "2019-7-21"
        // }
      ],
      err_name: false,
      err_address: false,
      err_phoneName: false,
      err_phoneNumber: false,
      err_remarks: false
    };
  },
  created() {
    this.getPotential();
  },
  methods: {
    ...mapMutations(["set_loading"]),
    // 搜索
    searchHandle: (function(event) {
      let timeId = null;
      return function() {
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(() => {
          $my.getPurposeCustomer(
            {
              businessName: this.value
            },
            res => {
              if (res && res.success == true) {
                this.clients = res.data;
              } else {
                this.$toast(res.message);
              }
            }
          );
        }, 300);
      };
    })(),
    // 获取列表
    getPotential() {
      this.set_loading(true);
      $my.getPurposeCustomer(
        {
          businessName: "",
          createBy: "1",
          updateBy: "1"
        },
        res => {
          this.set_loading(false);
          if (res && res.success == true) {
            this.clients = res.data;
          } else {
            this.$toast(res.message);
          }
        },
        err => {
          this.set_loading(false);
        }
      );
    },
    // 更新
    updateClientHandle(type, item, index) {
      this.handleType = type;
      this.dialogInfo = true;
      if (type == "update") {
        this.updateClient = { ...item };
        this.updateIndex = index;
      } else if (type == "add") {
        this.updateClient = {
          businessName: "", //企业名称
          businessAddress: "", //企业地址
          phoneName: "", //联系人
          phoneNumber: "", //联系电话
          remarks: "" //备注
        };
      }
    },
    checkInput() {
      if (!this.updateClient.businessName) {
        this.err_name = true;
        return false;
      }
      if (!this.updateClient.businessAddress) {
        this.err_address = true;
        return false;
      }
      if (!this.updateClient.phoneName) {
        this.err_phoneName = true;
        return false;
      }
      return true;
    },
    // 确认
    submitHandle() {
      if (!this.checkInput()) {
        return;
      }
      let params = {};
      this.set_loading(true);
      if (this.handleType == "update") {
        params = {
          ...this.updateClient
        };
        $my.modPurposeCustomer(
          params,
          res => {
            this.set_loading(false);
            if (res && res.success == true) {
              this.dialogInfo = false;
              this.clients.splice(this.updateIndex, 1, {
                ...this.updateClient
              });
            } else {
              this.$toast(res.message);
            }
          },
          err => {
            this.set_loading(false);
          }
        );
      } else if (this.handleType == "add") {
        params = {
          ...this.updateClient,
          statusCd: 1,
          createBy: "tsa"
        };
        $my.addPurposeCustomer(
          params,
          res => {
            this.set_loading(false);
            if (res && res.success == true) {
              this.$toast("添加成功");
              this.dialogInfo = false;
              this.getPotential();
            } else {
              this.$toast(res.message);
            }
          },
          err => {
            this.set_loading(false);
          }
        );
      }
    },
    // 删除
    deleteHandle(item, index) {
      var that = this;
      Dialog.confirm({
        title: "删除",
        message: "确认删除该意向客户？"
      }).then(() => {
        that.set_loading(true);
        $my.delPurposeCustomer(
          `?id=${item.id}`,
          res => {
            that.set_loading(false);
            if (res && res.success == true) {
              that.clients.splice(index, 1);
            } else {
              that.$toast(res.message);
            }
          },
          err => {
            that.set_loading(false);
          }
        );
      }).catch(()=>{});
    },
    // 取消
    cancelHandle() {
      this.dialogInfo = false;
    }
  },
  filters: {
    createDateFormat(value) {
      return value ? format(new Date(value), "yyyy-MM-dd") : "";
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/modules/potentialClient.less";
</style>
<style lang="less">
.potential-client {
  .van-cell__value {
    border: 1px solid #e1e2e3;
    border-radius: 100px;
    padding: 5px;
  }
  .van-search .van-field__control {
    text-indent: 60px !important;
  }
  .van-field {
    position: relative;
    .van-field__left-icon {
      position: absolute;
      left: 20px;
      top: 10px;
      .van-icon {
        font-size: 36px;
        color: #cbcbcb;
      }
    }
    .van-field_clear {
      color: #bfc2c2;
      margin-right: 30px;
    }
  }
  .dialogInfo {
    .van-field__control {
      padding: 0 20px 0 20px;
      font-size: 18px;
      &::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #d2d2d2;
      }

      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #d2d2d2;
      }

      &:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #d2d2d2;
      }
    }
    .btn-wrap {
      text-align: center;

      button {
        width: 30%;
        height: 6%;
        // padding: 10px 30px;
      }

      .cancel {
        margin-right: 20px;
        background-color: #ffffff;
        border-radius: 38px;
        border: solid 2px #2175f6;
        font-size: 30px;
        color: #2176f6;
      }

      .confirm {
        background-image: linear-gradient(
          -90deg,
          #349cff 0%,
          #2b89fb 51%,
          #2175f6 100%
        );
        border-radius: 38px;
        letter-spacing: 6px;
        color: #ffffff;
        font-size: 30px;
        border: solid 2px #2175f6;
      }
    }
  }
}
</style>