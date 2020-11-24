console.log("加载成功！");

require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        
        //首页导航
        "nav": "nav",
        "goodsList": "goodsList"
    }
})
 
require(["nav", "goodsList"], function(nav, goodsList){
    //导航栏部分
    nav.topNavDownload();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();
    //index页面没有全部商品分类
    nav.allGoodsTab();

    //加载商品数据
    goodsList.download();
    goodsList.banner();

})