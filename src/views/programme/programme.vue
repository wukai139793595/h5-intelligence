<template>
  <div class="programme">
    <nav-bar :title="title" :left="1"></nav-bar>
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
          <label>公司面积</label>
          <span><van-field v-model="content.area" placeholder="0.00" />平方米</span>
        </li>
        <li>
          <label>公司人数</label>
          <van-stepper v-model="content.people" />
        </li>
        <li>
          <label>电脑台数</label>
          <van-stepper v-model="content.computer" />
        </li>
        <li>
          <label>摄像头数量</label>
          <van-stepper v-model="content.camera" />
        </li>
        <li>
          <label>公司入口数量</label>
          <van-stepper v-model="content.joinNum" />
        </li>
        <li>
          <label>打印机数目</label>
          <van-stepper v-model="content.printer" />
        </li>
      </ul>
    </div>

    <div class="btnLay">
      <van-button round plain type="info">重新开始</van-button>
      <van-button round type="info">开始定制</van-button>
    </div>
  </div>
</template>
<script>
  import NavBar from "@/components/navBar/navBar.vue"
  export default {
    components: {
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
        titleArr:[
          {id:'office',title:'办公区场景解决方案'},
          {id:'factory',title:'智慧厂区场景解决方案'},
          {id:'hotel',title:'智慧酒店场景解决方案'},
          {id:'retail',title:'新零售场景解决方案'},
          {id:'custom',title:'自定义场景解决方案'}
        ],
      };
    },
    watch: {},
    created () {
      this.checkID();
    },
    mounted(){

    },
    computed: {

    },
    methods: {
      // 检查路由id
      checkID(){
        let id = this.$route.params.id;
        this.titleArr.map(item=>{
          if(id == item.id) {
            this.title = item.title;
          }
        });
        if(!this.title) {
          this.$notify({ type: 'warning', message: '参数错误，请重点选择' });
          this.$router.go(-1);
        }
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '~@/assets/css/modules/programme.less';
</style>
