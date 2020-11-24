// 处理首页导航
define(["jquery"], function($){
    function download(){
        //数据下载
        $.ajax({
            type: "get",
            url: "../data/nav.json",
            success: function(data){
                var bannerArr = data.banner;
                //遍历 添加数据
                for(var i = 0;i < bannerArr.length; i++){
                    $(`<a href="${bannerArr[i].url}">
                    <img class = 'swiper-lazy swiper-lazy-loaded' src = '../images/banner/${bannerArr[i].img}' alt=""/>
                </a>`).appendTo("#J_homeSwiper .swiper-slide");
                    var node = $(`<a href="#" class = 'swiper-pagination-bullet'></a>`);
                    //默认选中第一个小圆点
                    if(i == 0){
                        node.addClass("swiper-pagination-bullet-active");
                    }
                    node.appendTo("#J_homeSwiper .swiper-pagination");
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })

        leftNavDownload();//不暴露页面无法获取
        topNavDownload();
    }

    //1轮播图
    function banner(){
        var iNow = 0;//记录图片下标
        var aImgs = null;//图片
        var aBtns = null;//小圆圈

        var timer = setInterval(function(){
            iNow++;
            tab();
        }, 2500);
        
        //封装切换图片函数
        function tab(){
            if(!aImgs){
                aImgs = $("#J_homeSwiper .swiper-slide").find("a");
            }
            if(!aBtns){
                aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
            }
            if(iNow == 5){
                iNow = 0;
            }
            //图片淡入淡出效果
            aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({opacity: 1}, 500);
            //小圆点切换效果
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
        }

        //轮播图鼠标移入移出
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseenter(function(){
            clearInterval(timer);
        });
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            }, 2500);
        });

        //事件委托 点击小圆点切换图片
        $("#J_homeSwiper .swiper-pagination").on("click", "a", function(){
            iNow = $(this).index();
            tab();
            return false;//阻止a链接默认行为
        })

        // < > 上下张图片切换 
        $(".swiper-button-prev,.swiper-button-next").on("click", function(){
            if(this.className == "swiper-button-prev"){
                iNow--;
                if(iNow == 0){
                    iNow == 4;
                }
            }else{
                iNow++;
            }
            tab();
        })
    }

    //2侧边导航栏
    function leftNavDownload(){
        $.ajax({
            url: "../data/nav.json",
            success: function(result){
                var sideArr = result.sideNav;
                for(var i = 0; i < sideArr.length; i++){
                    var node = $(`<li class = 'category-item'>
                        <a href="/index.html" class = 'title'>
                            ${sideArr[i].title}  
                            <em class = 'iconfont-arrow-right-big'></em>
                        </a>
                    <!-- <div class="children clearfix" style = 'display: block'> 隐藏显示 -->
                    <div class="children clearfix">
                        
                    </div>
                    </li>`);
                    node.appendTo("#J_categoryList");

                    //取出当前选项对应的子节点
                    var childArr = sideArr[i].child;
                    //计算有多少列 6个一列
                    var col = Math.ceil(childArr.length / 6);
                    //设置对应的class样式
                    node.find("div.children").addClass("children-col-" + col);
                    for(var j = 0; j < childArr.length; j++){
                        if(j % 6 == 0){
                            var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}"></ul>`);
                            newUl.appendTo(node.find("div.children"));
                        }
                        $(`<li>
                            <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                                <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                                <span class="text">${childArr[j].title}</span>
                            </a>
                        </li>`).appendTo(newUl);
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }

        })
    }
    //侧边导航 添加移入切换效果
    function leftNavTab(){
        //事件委托 对页面中插入的新节点操作
        $("#J_categoryList").on("mouseenter", ".category-item", function(){
            $(this).addClass("category-item-active");
        })
        $("#J_categoryList").on("mouseleave", "li.category-item", function(){
            $(this).removeClass("category-item-active");
        })
    }


    //3顶部导航栏
    function topNavDownload(){
        $.ajax({
            url: "../data/nav.json",
            success: function(result){
                //取出数据
                var topNavArr = result.topNav;
                topNavArr.push({title: "服务"}, {title: "社区"});
                for(var i = 0; i < topNavArr.length; i++){
                    $(`<li data-index="${i}" class="nav-item">
                        <a href="javascript: void(0);" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1" class="link" data-stat-id="69baf6920236bfcb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-69baf6920236bfcb', 'javascript:void0', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1']);">
                            <span class="text">${topNavArr[i].title}</span>
                        </a> 
                    </li>`).appendTo(".site-header .header-nav .nav-list");
                    
                    var node = $(`<ul class = 'children-list clearfix' style = "display: ${i == 0 ? 'block' : 'none'}">
                    </ul>`);
                    node.appendTo("#J_navMenu .container")
                    //取出所有的子菜单选项
                    if(topNavArr[i].childs){
                        var childsArr = topNavArr[i].childs;
                        for(var j = 0; j < childsArr.length; j++){
                            $(`<li>
                                <a href="#">
                                    <div class = 'figure figure-thumb'>
                                        <img src="${childsArr[j].img}" alt=""/>
                                    </div>
                                    <div class = 'title'>${childsArr[j].a}</div>
                                    <p class = 'price'>${childsArr[j].i}</p>
                                </a>
                            </li>`).appendTo(node);
                        }
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            } 
        })
    }
    //顶部导航 移入移出效果
    function topNavTab(){
        //移入
        $(".header-nav .nav-list").on("mouseenter", ".nav-item", function(){
            $(this).addClass("nav-item-active");
            //找出移入节点对应下标 由于前面还有一个li节点 故减 1。
            var index = $(this).index() - 1;
            //if语句作用：排除 服务和社区触发事件
            if(index >= 0 && index <= 6){
                $("#J_navMenu").css({display: "block"}).removeClass("slide-up").addClass("slide-down");
                $("#J_navMenu .container").find("ul").eq(index).css("display", 'block').siblings("ul").css("display", "none");                ;
            }else{
                $("#J_navMenu").css({display: "none"}).removeClass("slide-down").addClass("slide-up");        
            }
        })
        //移出
        $(".site-header").on("mouseleave", ".nav-item", function(){
            $(this).removeClass("nav-item-active");
        })
        //移出的时候取消下拉菜单
        $(".site-header").mouseleave(function(){
            $("#J_navMenu").css({display: "block"}).removeClass("slide-down").addClass("slide-up");
        })
    }

    //4搜索框
    function searchTab(){
        $("#search").focus(function(){
            $("#J_keywordList").removeClass("hide").addClass("show");
        })
        $("#search").blur(function(){
            $("#J_keywordList").removeClass("show").addClass("hide");
        })
    }

    //7list.html全部商品分类
    function allGoodsTab(){
        $(".header-nav .nav-list").on("mouseenter", ".nav-category", function(){
            $(this).addClass("nav-category-active");
            $(this).find(".site-category").css("display", 'block');
            /* $(this).nextAll().css("display", "none"); */  
        })
        $(".header-nav .nav-list").on("mouseleave", ".nav-category", function(){
            $(this).removeClass("nav-category-active");
            $(this).find(".site-category").css("display", 'none');
        })
    }

    return {
        download: download,
        banner: banner,
        leftNavTab: leftNavTab,
        topNavTab: topNavTab,
        searchTab: searchTab,

        //别的页面调用 要对外暴露
        topNavDownload: topNavDownload,
        leftNavDownload: leftNavDownload,
        //
        allGoodsTab: allGoodsTab
    }
})