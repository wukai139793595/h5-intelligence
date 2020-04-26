
const getters = {

    footerBar: state => state.footerBar,
    // 选中的数量
    selectTotalCount: state => {

        return state.result.orderProdList.reduce((pre, ele, ind) => {
            return (
                pre +
                ele.orderProdXaList.reduce((p, e, i) => {
                    return p + Number(e.count);
                }, 0)
            );
        }, 0)


    },
    // 选中的金额
    selectTotalMoney: state => {
        let money = 
        state.result.orderProdList.reduce((pre, ele, ind) => {
                    return (
                        pre +
                        ele.orderProdXaList.reduce((p, e, i) => {
                            return p + (e.objectNumber * e.objectPrice);
                        }, 0)
                    );
                }, 0)

        return money.toFixed(2);
    },
    // 一次性费用
    totalExtraFee: state => {
        let money = 
        state.result.orderProdList.reduce((pre, ele, ind) => {
                    return (
                        pre +
                        ele.orderProdXaList.reduce((p, e, i) => {
                            return p + (e.objectNumber * e.objectExtraFee);
                        }, 0)
                    );
                }, 0)

        return money.toFixed(2);
    },
    // tabbar显示数字
    cartTotal : state => {
        return state.shopCartList.length
    }
}

export default getters