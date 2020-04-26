<template>
  <div class="productItem">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ul>
        <li v-for="(item,index) in product" :key="index" @click="toDetailHandle(item)">
          <div class="pic">
            <img :src="baseUrl+'/zhsys/config/getProjectImgDetail?projectConfigXaId='+item.id" alt />
          </div>
          <div class="title">{{item.configXaName}}</div>
          <div class="operation">
            <label for class="price">
              ￥
              <span class="num">{{item.configXaPrice}}</span>
            </label>
            <span class="shopcart" @click.stop="addCartHandle(item,index)">
              <i class="iconfont icon-gouwuche"></i>
            </span>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { List } from "vant";
import { $product } from "@/api";
import prefixAPI from "@/api/prefixAPI"
export default {
  components: {
    [List.name]: List
  },
  props: {
    company: {
      type: String,
      default: ""
    },
    configName: {
      type: String,
      default: ""
    },
    search_err: {
      type: Boolean
    },
    inputFocus: {
      type: Boolean
    },
    searchKey: {
      type: String,
      default: ""
    },

    obj: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      baseUrl: '',
      product: [],
      total: 0,
      loading: false,
      finished: false,
      page: 1,
      pageSize: 10,
      locked: false
    };
  },
  created() {
    if (process.env.NODE_ENV == "development") {
      this.baseUrl = prefixAPI.loc;
    } else if (process.env.NODE_ENV == "production") {
      this.baseUrl = prefixAPI.server;
    }
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    // 跳转到详情页面
    toDetailHandle(item) {
      if (this.company) {
        this.$router.push({
          name: "productDetail",
          query: {
            id: item.id,
            company: this.company,
            configCode:this.obj.configCode,
            configName: this.obj.configName,
            configXaCode: item.configXaCode,
            projectId:item.projectId,
            configXaPrice: item.configXaPrice,
            feeTye: item.feeTye,
            configXaName: item.configXaName,
            configXaContent: item.configXaContent,
            configXaExtraPrice: item.configXaExtraPrice
          }
        });
      } else {
        this.$notify({ type: "warning", message: "请填写客户名称" });
        this.$emit("update:search_err", true);
      }
    },
    // 添加到购物车
    addCartHandle(item) {
      if (!this.company) {
        this.$notify({ type: "warning", message: "请填写客户名称" });
        this.$emit("update:search_err", true);
        return
      }
      $product.addConfigShoppingCart({
        companyName: this.company,
        projectConfig: {
          projectId: item.projectId, //关联解决方案表id
          configCode: this.obj.configCode, //方案配置表编码
          configName: this.obj.configName, //方案配置表名称
          projectConfigXaList: [
            {
              configXaCode: item.configXaCode, //方案配置子项目编码
              configXaName: item.configXaName, //方案配置子项目名称
              configXaPrice: item.configXaPrice, //配置项目的价格
              configXaExtraPrice: item.configXaExtraPrice, //项目配置额外价格
              feeTye: item.feeTye, //费用类型
              configXaNum: item.configXaNum //费用类型 产品配置细项中默认0,产品详情中根据实际参数来
            }
          ]
        }
      },res => {
        if (res && res.success == true) {
          this.$store.dispatch('set_shop_cart',{params:{}})
          this.$notify({type:'success',message:'添加成功'})
        } else {
          this.$toast(res.message)
        }
      },err => {

      });
    },
    //初始化数据
    init() {
      this.product = [];
      this.total = 0;
      this.page = 1;
      this.onLoad();
    },

    onLoad() {
      // 根据 type 请求获取数据
      let data = {
        configXaCode: this.obj.configCode, //类型code，必填
        configName: this.configName, //配置名称，可不填，模糊查询
        start: (this.page - 1) * this.pageSize, //从0开始间隔limit
        limit: this.pageSize //每页数据量
      };
      this.loading = true;
      if (!this.locked) {
        this.locked = true;
        $product.getXaPageListByType(
          data,
          res => {
            this.locked = false;
            this.loading = false;
            if (res && res.success == true) {
              this.page += 1;
              this.product.push(...res.data.data);
              this.total = res.data.totalCount;
              if (this.product.length >= this.total) {
                this.finished = true;
              }
            }
          },
          err => {
            this.loading = true;
            this.locked = false;
          }
        );
      }
    },
    searchByName() {
      this.product = [];
      this.total = 0;
      this.page = 1;
      this.onLoad();
      this.$emit("update:inputFocus", false);
      // this.$emit("update:configName", "");
      console.log("1111");
    }
  }
};
</script>

<style lang="less" scoped>
.productItem {
  padding: 25px 0 0 30px;

  ul {
    overflow: hidden;
    width: 100%;
  }

  li {
    float: left;
    width: calc(50% - 5px);
    margin: 0 30px 25px 0;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;

    .pic {
      width: 100%;
      height: 286px;
      background: #eee;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .title {
      margin-top: 15px;
      font-size: 24px;
      line-height: 48px;
      height: 48px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 10px;
    }

    .operation {
      overflow: hidden;
      height: 65px;
      line-height: 65px;
      font-size: 18px;
      padding: 0 10px 8px;

      .price {
        float: left;
        color: #f00;
        font-size: 14px;

        .num {
          font-size: 28px;
          font-weight: bold;
        }
      }

      .shopcart {
        float: right;
        width: 56px;
        height: 56px;
        line-height: 54px;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #acadaf;
        color: #acadaf;

        .iconfont {
          color: #acadaf;
          font-size: 28px;
        }
      }
    }
  }
}
</style>
