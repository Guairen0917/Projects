define(['jquery', 'jquery-cookie'], function($) {
    //10-2
    function download(){
        //10-2-1 找到详情页商品id
        var product_id = valueByName(location.search, "product_id");
        //10-2-2 ajax下载数据 
        $.ajax({
            url: "../data/goodsList.json",
            success: function(arr){
                //10-2-3 通过product_id 找到对应商品信息
                var goodsMsg = arr.find(item => item.product_id == product_id);
                //console.log(goodsMsg);
                var node = $(`<!-- 导航 -->
                <div id = 'J_proHeader' data-name="${goodsMsg.name}">
                    <div class = 'xm-product-box'>
                        <div id = 'J_headNav' class = 'nav-bar'>
                            <div class = 'container J_navSwitch'>
                                <h2 class = 'J_proName'>${goodsMsg.name}</h2>
                                <div class = 'con'>
                                    <div class = 'left'>
                                        <span class = 'separator'>|</span>
                                        <a href="#">${goodsMsg.title}</a>
                                    </div>
                                    <div class = 'right'>
                                        <a href="#">概述</a>
                                        <span class = 'separator'>|</span>
                                        <a href="#">参数</a>
                                        <span class = 'separator'>|</span>
                                        <a href="#">F码通道</a>
                                        <span class = 'separator'>|</span>
                                        <a href="#">用户评价</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 商品详情数据展示 -->
                <div class = 'xm-buyBox' id = 'J_buyBox'>
                    <div class = 'box clearfix'>
                        <!-- 商品数据 -->
                        <div class = 'pro-choose-main container clearfix'>
                            <div class = 'pro-view span10'>
                                <!-- img-con fix 设置图片浮动 -->
                                <div id = 'J_img' class = 'img-con' style = 'left: 338px; margin: 0px;'>
                                    <div class = 'ui-wrapper' style="max-width: 100%;">
                                        <!-- 图片 -->
                                        <div class = 'ui-viewport' style="width: 100%; overflow: hidden; position: relative; height: 560px;">
                                            <div id = 'J_sliderView' class = 'sliderWrap' style = 'width: auto; position: relative;'>
   
                                            </div>
                                        </div>
                                        <!-- 显示第几张图片的下标 -->
                                        <div class = 'ui-controls ui-has-pager ui-has-controls-direction'>
                                            <div class = 'ui-pager ui-default-pager'>
                                                
                                            </div>
                                            <div class = 'ui-controls-direction'>
                                                <a class="ui-prev" href="">上一张</a>
                                                <a class="ui-next" href="">下一张</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = 'pro-info span10'>
                                <!-- 标题 -->
                                <h1 class = 'pro-title J_proName'>
                                    <span class = 'img'></span>
                                    <span class = 'name'>${goodsMsg.name}</span>
                                </h1>
                                <!-- 提示 -->
								<p class = 'sale-desc' id = 'J_desc'>
                                    ${goodsMsg.product_desc_ext}
                                </p>
                                <div class = 'loading J_load hide'>
                                    <div class = 'loader'></div>
                                </div>
                                <!-- 主体 -->
                                <div class = 'J_main'>
                                    <!-- 经营主题 -->
                                    <p class = 'aftersale-company' id = 'J_aftersaleCompany' type = '1' desc = 'null'>小米自营</p>
                                    <!-- 价格 -->
                                    <div class = 'pro-price J_proPrice'>
                                        <span class = 'price'>
											${goodsMsg.price_max}元
                                            <del>${goodsMsg.market_price_max}元</del>
                                        </span>
                                        <span class="seckill-notic hide"><em></em><i></i><span><span></span></span></span>
                                    </div>
                                    <!-- 常态秒杀倒计时 -->
                                    <div class = 'pro-time J_proSeckill'>
                                        <div class="pro-time-head">
                                            <em class="seckill-icon"></em> 
                                            <i>秒杀</i>
                                            <span class="time J_seckillTime">距结束 03 时 24 分 46 秒</span>
                                       </div>
                                        <div class = 'pro-time-con'>
                                            <span class = 'pro-time-price'>
                                                ￥
                                                <em class = 'J_seckillPrice'>${goodsMsg.price_min}</em>
                                                <del>
                                                    ￥
                                                    <em class = 'J_seckillPriceDel'>${goodsMsg.market_price_min}</em>
                                                </del>
                                            </span>
                                        </div>
                                    </div>
                                        <!-- 已经选择产品 -->
                                        <div class = 'pro-list' id = 'J_proList'>
                                            <ul>
                                                <li>${goodsMsg.name} ${goodsMsg.value}  
                                                    <del>${goodsMsg.market_price_min}元</del>  
                                                    <span>  ${goodsMsg.price_min} 元 </span> 
                                                </li>
                                                <li class="totlePrice" data-name="seckill">   
                                                    秒杀价   ：${goodsMsg.price_min}元  
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- 购买按钮 -->
                                        <ul class="btn-wrap clearfix" id="J_buyBtnBox">     
                                            <li>  
                                                <a href="#" class="btn btn-primary btn-biglarge J_login" id = "${goodsMsg.product_id}">加入购物车</a>  
                                            </li>   
                                            <li>  
                                                <a href="goodsCar.html" class="btn-gray btn-like btn-biglarge"> 
                                                    <i class="iconfont default"></i>查看购物车 
                                                </a>  
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
                node.insertAfter("#app div .header");

                //11-1加载详情页所有图片
                var aImages = goodsMsg.images;
                if(aImages.length == 1){
                    //一张图片不显示轮播效果
                    $(`<img class = 'slider done' 
                    src="${aImages[0]}" 
                    style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: block;" 
                    alt=""/>`).appendTo("#J_sliderView");

                    //隐藏上一张下一张按钮
                    node.find(".ui-controls").hide();
                }else{
                    for(var i = 0; i < aImages.length; i++){
                        //设置第几张图片按钮 active
                        $(`<div class = 'ui-pager-item'>
                            <a href="#" data-slide-index = "0" class = 'ui-pager-link ${i == 0 ? "active" : ""}'>1</a>
                        </div>`).appendTo(node.find(".ui-pager"));

                        //加载所有图片
                        $(`<img class = 'slider done' 
                        src="${aImages[i]}" 
                        style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: ${i == 0 ? "block" : "none"};" 
                        alt=""/>`).appendTo(node.find("#J_sliderView"));
                    }
                }

            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    //获取当前点击商品数据 通过product_id
    //?name1=value1&name2=value2&name3=value3
    //10-1 封装的提取键值对函数 这里的name 是 传入的参数 product_id 的名字
    function valueByName(search, name){
        //键值对起始位置
        var start = search.indexOf(name + "=");
        //查找不到 start返回值-1
        if(start == -1){
            return null;
        }else{
            var end = search.indexOf("&", start);
            //查找不到 end返回值-1 说明为最后一个键值对
            if(end == -1){
                end = search.length;
            }

            //获取到起始结束位置 提取传入的字符串 search = ?name1=value1...
            // str = name1=value1
            var str = search.substring(start, end);
            //字符串分割 arr = ["name1", "value1" ...]
            var arr = str.split("=");
            // arr[1] = value1
            return arr[1];
        }
    }

    //11-2详情页商品图片轮播
    function banner(){
        var iNow = 0;
        var aBtns = null;
        var aImgs = null;
        var timer = null;

        //11-2-1点击按钮切换 插入页面节点 通过事件委托完成   
        $("#app div").on("click", ".ui-controls .ui-pager .ui-pager-item a", function(){
            //此处应当获取其父节点下标 a标签被一个div包裹
            iNow = $(this).parent().index();
            tab();

            return false; //阻止a标签 冒泡和默认行为
        }) 

        //11-2-2封装图片切换方法
        function tab(){
            //非空则赋值
            if(!aImgs){
                aImgs = $("#J_img").find("img");
            }
            if(!aBtns){
                aBtns = $("#J_img").find(".ui-controls .ui-pager .ui-pager-item a");
            }
            //一张图片则关掉定时器
            if(aImgs.size() == 1){
                clearInterval(timer);
            }else{
                if(iNow == aImgs.size()){
                // if(iNow == 5){
                    iNow = 0;
                }
                
                aBtns.removeClass("active").eq(iNow).addClass('active');
                aImgs.hide().eq(iNow).show();
            }
        }

        //11-2-3 
        //启动定时器
        timer = setInterval(function(){
            iNow++;
            tab();
        }, 3000);

        //鼠标移入移出
        $("#app div").on("mouseenter", "#J_img", function(){
            clearInterval(timer);
        })

        $("#app div").on("mouseleave", "#J_img", function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            }, 3000);
        })

        //上一张和下一张图片切换
        $("#app div").on("click", ".ui-prev,.ui-next", function(){
            if(this.className == 'ui-prev'){
                iNow--;
                if(iNow == -1){
                    iNow = 4;
                }
            }else{
                iNow++;
            }
            tab();
            return false;
        })
    }

    //12加入购物车操作
    $("#app div").on("click", ".J_login", function(){
        //获取点击加入购物车按钮 对应商品id
        
        //cookie 本地缓存技术（最大存储4kb，只能存储字符串） => 存储商品id，其数量
        //关联数组 [{id:1, num1}, {id:2, num2}] 转成json格式字符串存储在cookie中
        var id = this.id;
        //（1）先判断cookie中是否存在商品信息
        var first = $.cookie("goods") == null ? true : false;

        //（2）如果是第一次添加  即购物清单为空时，要创建一个cookie
        if(first){
            //直接创建cookie
            /* var cookieStr = [{"id":${id},"num":1}];
            $.cookie("goods", JSON.stringify(cookieStr), { */
            var cookieStr = `[{"id":${id},"num":1}]`;
            $.cookie("goods", cookieStr, {
                //过期时间
                expires: 7
            })
        }else{
            var same = false; //假设没有添加过
            
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            //（3）判断之前是否添加过   即购物清单有数据时，要对cookie判断 有则num+1 无则创建新对象存储 商品id和数量
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    //（3-1）之前添加过，数量+1
                    cookieArr[i].num++;
                    same = true;
                    break;//跳出循环
                }
            }

            if(!same){
                //（3-2）之前没有添加过，新增商品数据
                var obj = {id:id, num:1};
                cookieArr.push(obj);
            }
            //最后，存回cookie中
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires:7
            })
        }

        //alert($.cookie("goods"));
        alert("加入购物车成功！");
        return false;
    })

    return {
        download: download,
        banner: banner
    }
});