module.exports = {
  'reg': {
    methods: {
      // 匹配手机号码
      isTel: function(v) {
        let r = /^((13|14|15|16|17|18|19)){1}\d{9}$/;
        return r.test(v) ? true : false;
      },
      // 匹配电信号码
      isCT: function(v) {
        let r = /1[3-9]+\d{9}/,
          re = new RegExp(r);
        if (v.length != 0) {
          if (v.search(re) != -1) {
            let s = v.substring(0, 3);
            return s == "133" || s == "149" || s == "153" || s == "162" || s == "171" || s == "173" || s == "177" ||
              s == "180" || s == "181" || s == "189" || s == "191" || s == "199" ? true : false;
          } else {
            let s = v.substring(0, 5);
            return s == "10649" && v.length == 13 ? true : false;
          };
        };
      },
      // 是否中文
      isChineseChar: function(str) {
        let reg = /[^\u4E00-\u9FA5|.]/g;
        return reg.test(str);
      },
      /**
       *   获取URL参数
       */
      getUrlKey: function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [,
          ""
        ])[1].replace(/\+/g, '%20')) || null;
      },
    }
  },
  'browser':{
    methods:{
      //电信客户端
      isCTapp: function() {
          let a = navigator.userAgent.toLowerCase().indexOf("ctclient") > -1;
          return b = a ? 1 : 0;
      },
      //ios终端
      isIos: function() {
          let a = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          return b = a ? 1 : 0;
      },
      //android终端
      isAndroid: function() {
          let a = navigator.userAgent.toLowerCase().indexOf("android") > -1;
          return b = a ? 1 : 0;
      },
      // QQ浏览器
      isQQ: function() {
          let a = navigator.userAgent.toLowerCase().toLowerCase().match(/QQ/i) == "qq";;
          return b = a ? 1 : 0;
      },
      // 微信
      isWeChat: function() {
          let a = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
          return b = a ? 1 : 0;
      },
    }
  }
};
