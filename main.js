console.log("加载成功");
/*
    配置当前项目用到的模块（AMD规范）
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav": "nav",
        "slide": "slide",
        "data": "data"
    },
    shim: {
        //设置依赖关系
        "jquery-cookie": ["jquery"]
    }
})

require(["nav", "slide", "data"], function(nav, slide, data){
    //导航栏部分
    nav.download();
    
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();

    //商品列表部分
    slide.download();
    
    slide.slideTab();

    //主页数据加载
    data.download();
    data.tabMenu();
})