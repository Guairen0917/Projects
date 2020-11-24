console.log("加载成功！！！");

require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "goodsCart": "goodsCart"
    },
    shim: {
        //设置依赖关系
        "jquery-cookie": ["jquery"]
    }
})

require(["goodsCart"], function(goodsCart){
    //购买了 还买的
    goodsCart.download();
    goodsCart.cartHover();

    //已加入购物车的数据
    goodsCart.listCarData();
    //结算页选择按钮
    goodsCart.checkFunc();
    //商品数量增加减少和删除
    goodsCart.changeCars();
})