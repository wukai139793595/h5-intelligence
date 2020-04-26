<template>
  <div class="loading">
    <van-loading type="spinner"/>
  </div>
</template>
 
<script>
import {Loading} from 'vant'
  export default {
    name: 'LOADING',
    data () {
      return {}
    },
    components: {
        [Loading.name]:Loading
    }
  }
</script>
<style scoped>
  .loading{
    position: fixed;
    top:0;
    bottom: 0;
    right: 0;
    left:0;
    z-index:121;
    width: 100vw;
    background: rgba(0,0,0,0.3);
    display: flex;
    vertical-align: middle;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

</style>
