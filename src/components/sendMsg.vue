<template>
  <button v-on:click="run" :disabled="disabled || time > 0">{{ text }}</button>
</template>
<script>
  export default {
    name: 'sendMsg',
    props: {
        second: {
            type: Number,
            default: 60
        },
        runText1:{
          type:String,
          default:'重新获取'
        },
        runText2:{
            type:String,
            default:'s'
        },
        startText:{
            type:String,
            default:'获取验证码'
        }
    },
    data() {
      return {
        time: 0,
        disabled:false
      }
    },
    components: {
    },
    mixins: [],
    mounted() {},
    computed: {
        text () {
            return this.time >0 ?this.runText1+ this.time + this.runText2 : this.startText;
        }
    },
    methods: {
      run () {
          this.$emit('on-run');
      },
      start(){
          this.disabled = true;
          this.time = parseInt(this.second)+1;
          this.timer();
      },
      stop(){
          this.time = 0;
          this.disabled = false;
      },
      timer () {
          if (this.time > 0) {
              this.time--;
              setTimeout(this.timer, 1000);
          }else{
              this.disabled = false;
          }
      }
    }
  }
</script>
