console.log("加载成功！！");

require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        //首页导航
        "nav": "nav",
        "goodsDesc": "goodsDesc"
    },
    shim: {
        //设置依赖关系
        "jquery-cookie": ["jquery"]
    }
})

require(["nav", "goodsDesc"], function(nav, goodsDesc){
    //导航栏部分
    nav.topNavDownload();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();
    //index页面没有全部商品分类
    nav.allGoodsTab();


    goodsDesc.download();
    goodsDesc.banner();
})