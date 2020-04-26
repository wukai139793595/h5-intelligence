<template>
    <div>
        <nav-bar title="订单详情" :left="1" ></nav-bar>
        <orderDetailItem :id="id"></orderDetailItem>
    </div>
</template>

<script>
    import NavBar from "@/components/navBar/navBar.vue";
    import orderDetailItem from "@/views/shoppingCart/components/orderDetailItem";
    import {$my} from "@/api"
    export default {
        components: {
            NavBar,
            orderDetailItem,
        },
        data() {
            return {
                id: ''
            }
        },
        created () {
            this.id = this.$route.query.id;
            this.ordShopCode = this.$route.query.ordShopCode;
            this.loadOrderShop();
        },
        mounted () {
             
        },
        methods: {
            loadOrderShop() {
                $my.loadOrderShop({
                    orderShopId:this.id
                },res => {
                    if (res && res.success == true) {
                        console.log('loadOrderShop',res)
                        this.$store.commit('set_order_prod_list',res.data.orderProdList);
                        this.$store.commit('set_order_account_do',res.data.orderAccount);
                        this.$store.commit('set_order_info',res.data)
                    }
                })
            }
        }
    }
</script>

<style lang="less">
  @import "~@/assets/css/modules/order.less";
</style>