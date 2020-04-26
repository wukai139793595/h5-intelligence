<template>
  <div class="navHeihgt">
    <van-nav-bar :title="title">
      <span slot="left">
        <van-icon name="arrow-left" @click="backHandle" v-if="left==1"></van-icon>
        <span v-if="left==2" class="address" @click="showPickerHandle">
          {{address}}
          <i class="traingle"></i>
        </span>
      </span>
      <span slot="right">
        <van-icon name="search" slot="right" v-if="right==1" @click="searchHandle" />
        <van-icon name="plus" v-if="right==2" @click="addHandle"/>
      </span>
    </van-nav-bar>
    <van-popup v-model="show" position="bottom">
      <van-picker :columns="columns" @change="pickerChange" />
    </van-popup>
  </div>
</template>

<script>
import { NavBar,Icon,Popup,Picker } from "vant"
export default {
  components: {
      [NavBar.name]:NavBar,
      [Icon.name]:Icon,
      [Popup.name]:Popup,
      [Picker.name]:Picker
  },
  props: {
    backurl: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    left: {
      default: 2
    },
    right: {},
    address: {
      type: String,
      default: ""
    },
    columns: {
      type: Array,
      default: () => ["杭州", "宁波", "温州", "嘉兴", "湖州"]
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    addHandle () {
      this.$emit('addClient')
    },
    //   后退
    backHandle() {
      if(this.backurl) {
        if (this.backurl == '/index') {
          this.$notify({type:'primary',message:'返回app'})
        } else {
          this.$router.push({path:this.backurl})
        }
      } else {
        this.$router.goBack();
      }
      
    },
    // 显示picker组件
    showPickerHandle() {
      this.show = true;
    },
    // 选择地市
    pickerChange(picker, value, index) {
      this.$emit("update:address", value);
      this.show = false;
    },
    // 点击查找图标
    searchHandle() {
      this.$emit('focusSearch')
    }
  }
};
</script>

<style lang="less" scoped>
  .navHeihgt {
    height:86px;
  }
  /deep/ .van-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    background:linear-gradient(to right,#237af7,#3298fe);
    height: 86px;
    line-height: 86px;
    .van-nav-bar__title{
      color: #fff;
      font-size: 28px;
    }
    .van-nav-bar__left{
      left:30px;
      top: 0;
    }
    .van-icon{
      color: #fff;
      font-size: 32px;
    }
  }
  .address {
    font-size: 20px;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
  }
  .traingle {
    vertical-align: middle;
    display:inline-block;
    border-top: 6px solid #fff;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
</style>
