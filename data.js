//5主页数据加载
define(['jquery'], function($) {
    //数据下载
    function download(){
        $.ajax({
            url: "../data/data.json",
            success: function(result){
                //第一部分数据加载
                var firstData = result[0];
                var node = $(`<div class = 'home-banner-box'>
                <a href="#">
                    <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1a2f39c9fe0804ace1d3707574c7c86f.jpg?thumb=1&w=1226&h=120&f=webp&q=90" alt=""/>
                </a>
            </div>
            <div class = "home-brick-box home-brick-row-2-box xm-plain-box">
                <div class = 'box-hd'>
                    <h2 class = 'title'>${firstData.title}</h2>
                    <div class = "more">
                        <a href="#" class = 'more-link'>
                            查看全部
                            <i class = 'iconfont iconfont-resultow-right-big'></i>
                        </a>
                    </div>
                </div>
                <div class = 'hox-bd clearfix'>
                    <div class = 'row'>
                        <div class = 'span4'>
                            <ul class = 'brick-promo-list clearfix'>
                                <li class = 'brick-item brick-item-l'>
                                    <a href="#">
                                        <img src="${firstData.img}" alt=""/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class = 'span16'>
                            <ul class = 'brick-list clearfix'>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`);
                node.appendTo(".page-main .container");

                //遍历子节点插入数据
                for(var i = 0; i < firstData.childs.length; i++){
                    $(`<li class = 'brick-item brick-item-m brick-item-m-2'>
                        <a href="#">
                            <div class = 'figure figure-img'>
                                <img width="160" height="160" src="${firstData.childs[i].img}" alt=""/>
                            </div>
                            <h3 class = 'title'>
                                ${firstData.childs[i].title}
                            </h3>
                            <p class = 'desc'>${firstData.childs[i].desc}</p>
                            <p class = 'price'>
                                <span class = 'num'>${firstData.childs[i].price}</span>
                                元
                                <span>起</span>
                                ${firstData.childs[i].del == 0 ? "" : "<del>" + firstData.childs[i].del + "元<del>"}
                            </p>
                        </a>
                    </li>`).appendTo(node.find(".hox-bd .span16 ul"));
                }    

                //6后续部分
                for(var i = 1; i < result.length; i++){
                    var node2 = $(`<div class = 'home-banner-box'>
                        <a href="#">
                            <img src="${result[i].topImg}" alt=""/>
                        </a>
                    </div>
                    <div class = 'home-brick-box home-brick-row-2-box xm-plain-box'>
                        <div class = 'box-hd clearfix'>
                            <h2 class = 'title'>${result[i].title}</h2>
                            <div class = 'more'>
                                <ul class = 'tab-list'>
                                    <li class = 'tab-active'>
                                        热门
                                    </li>
                                    <li>
                                        ${result[i].subTitle}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class = 'box-bd'>
                            <div class = 'row'>
                                <div class = 'span4'>
                                    <ul class = 'brick-promo-list clearfix'>
                                        <li class = 'brick-item  brick-item-m'>
                                            <a href="#">
                                                <img src="${result[i].leftChilds[0]}" alt=""/>
                                            </a>
                                        </li>
                                        <li class = 'brick-item  brick-item-m'>
                                            <a href="#">
                                                <img src="${result[i].leftChilds[1]}" alt=""/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class = 'span16'>
                                    <div>
                                        <ul class = 'brick-list clearfix'>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul class = 'brick-list clearfix hide'>
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
                    node2.appendTo(".page-main .container");

                    //热门部分
                    var hotChilds = result[i].hotChilds;
                    for(var k = 0; k < hotChilds.length; k++){
                        $(`<div>
                            <li class = 'brick-item ${k == 7 ? "brick-item-s" : "brick-item-m brick-item-m-2"}'>
                                <a href="#">
                                    <div class = 'figure figure-img'>
                                        <img width="160" height="160" src="${hotChilds[k].img}" alt=""/>
                                    </div>
                                    <h3 class = 'title'>${hotChilds[k].title}</h3>
                                    <p class = 'desc'>${hotChilds[k].desc}</p>
                                    <p class = 'price'>
                                        <span class = 'num'>${hotChilds[k].price}</span>元
                                        <!-- 判断有无 del属性 -->
                                        ${hotChilds[k].del == 0 ? "" : "<del><span class = 'num'>" + hotChilds[k].del + "</span>元</del>"}
                                    </p>
                                </a>
                            </li>
                        </div>`).appendTo(node2.find(".span16 .brick-list").eq(0));
                    }
                    $(`<li class = 'brick-item brick-item-s'>
                            <a href="#">
                                <div class = 'figure figure-more'>
                                    <i class = 'iconfont iconfont-circle-arrow-right'></i>
                                </div>
                                <div class = 'more'>
                                    浏览更多
                                    <small>热门</small>
                                </div>
                            </a>
                        </li>`).appendTo(node2.find(".span16 .brick-list").eq(0));


                    //热门旁边部分
                    var childs = result[i].childs;
                    for(var l = 0; l < childs.length; l++){
                        $(`<div>
                            <li class = 'brick-item ${l == 7 ? "brick-item-s" : "brick-item-m brick-item-m-2"}'>
                                <a href="#">
                                    <div class = 'figure figure-img'>
                                        <img width="160" height="160" src="${childs[l].img}" alt=""/>
                                    </div>
                                    <h3 class = 'title'>${childs[l].title}</h3>
                                    <p class = 'desc'>${childs[l].desc}</p>
                                    <p class = 'price'>
                                        <span class = 'num'>${childs[l].price}</span>元
                                        ${childs[l].del == 0 ? "" : "<del><span class = 'num'>" + childs[l].del + "</span>元</del>"}
                                    </p>
                                </a>
                            </li>
                        </div>`).appendTo(node2.find(".span16 .brick-list").eq(1));
                    }
                    //小卡片
                    $(`<li class = 'brick-item brick-item-s'>
                        <a href="#">
                            <div class = 'figure figure-more'>
                                <i class = 'iconfont iconfont-circle-resultow-right'></i>
                            </div>
                            <div class = 'more'>
                                浏览更多
                                <small>${result[i].subTitle}</small>
                            </div>
                        </a>
                    </li>`).appendTo(node2.find(".span16 .brick-list").eq(1));    
                }
                
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    
    //后插入节点 通过事件委托 添加移入移出事件
    function tabMenu(){
        //.page-main .container 为祖先节点（不是新插入的）| .more .tab-list li 为父节点
        $(".page-main .container").on("mouseenter", ".more .tab-list li", function(){
            $(this).addClass("tab-active").siblings("li").removeClass("tab-active");

            //同时切换显示的商品内容
            $(this).closest(".home-brick-box").find(".box-bd .span16 div ul").addClass("hide").eq($(this).index()).removeClass("hide");
        })
    }

    return {
        download: download,
        tabMenu: tabMenu
    }
});