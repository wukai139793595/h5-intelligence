<template>
  <div class="programme">
    <nav-bar title="办公区场景解决方案" :left="1"></nav-bar>
    <div class="part part-jjfa-1">
      <ul>
        <li>
          <label><i class="iconfont icon-qiye"></i>企业名称</label>
          <van-field v-model="form.name" />
        </li>
        <li>
          <label><i class="iconfont icon-xinxi1"></i>基础信息</label>
        </li>
      </ul>
    </div>
    <div class="part part-jjfa-2">
      <ul>
        <li>
          <label>楼层数</label>
          <van-stepper v-model="content.people" />
        </li>
        <li>
          <label>仓库数</label>
          <van-stepper v-model="content.computer" />
        </li>
        <li>
          <label>室内监控</label>
          <van-stepper v-model="content.camera" />
        </li>
        <li>
          <label>室外监控</label>
          <van-stepper v-model="content.joinNum" />
        </li>
      </ul>
    </div>

    <div class="btnLay">
      <van-button round plain type="info">重新开始</van-button>
      <van-button round type="info" @click="start">开始定制</van-button>
    </div>
  </div>
</template>
<script>
import { Field,Stepper,Button,Icon } from "vant"
import NavBar from "@/components/navBar/navBar.vue"
export default {
    components: {
        [Button.name]:Button,
        [Stepper.name]:Stepper,
        [Field.name]:Field,
        NavBar
    },
    data() {
        return {
        title:'',
        content:{
            area:'',
            people:'',
            computer:'',
            camera:'',
            joinNum:'',
            printer:'',
        },
        form:{
            name:''
        },
        };
    },
    watch: {},
    created () {
        
    },
    mounted(){

    },
    computed: {

    },
    methods: {
        start(){
            this.$router.push({path:'/programme/recommend'})
        }
    }
}

</script>
<style lang="less" scoped>
  @import '~@/assets/css/modules/programme.less';
</style>
