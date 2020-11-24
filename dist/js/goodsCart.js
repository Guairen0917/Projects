define(['jquery','jquery-cookie'], function($) {
    //13
    function download(){
        $.ajax({
            url: "../data/goodsCarList.json",
            success: function(obj){
                // alert(obj);
                var arr = obj.data;
                for(var i = 0; i < arr.length; i++){
                    $(`<li class="J_xm-recommend-list span4">    
                    <dl> 
                        <dt> 
                            <a href="#"> 
                                <img src="${arr[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="小米净水器1A（厨下式）"> 
                            </a> 
                        </dt> 
                        <dd class="xm-recommend-name"> 
                            <a href="#"> 
                                ${arr[i].name}
                            </a> 
                        </dd> 
                        <dd class="xm-recommend-price">${arr[i].price}元</dd> 
                        <dd class="xm-recommend-tips">   ${arr[i].comments}人好评    
                            <a class="btn btn-small btn-line-primary J_xm-recommend-btn" href="#" style="display: none;" id = "${arr[i].goodsid}">加入购物车</a>  
                        </dd> 
                        <dd class="xm-recommend-notice">

                        </dd> 
                    </dl>  
                </li>`).appendTo("#J_miRecommendBox .xm-recommend ul.row");
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    //13-1移入移出 
    function cartHover(){
        //移入
        $("#J_miRecommendBox .xm-recommend ul.row").on("mouseenter", ".J_xm-recommend-list", function(){
            $(this).find(".xm-recommend-tips a").css("display", "block");
        })
        //移出
        $("#J_miRecommendBox .xm-recommend ul.row").on("mouseleave", ".J_xm-recommend-list", function(){
            $(this).find(".xm-recommend-tips a").css("display", "none");
        })

        //13-2加入购物车操作
        $("#J_miRecommendBox .xm-recommend ul.row").on("click", ".J_xm-recommend-list a.btn", function(){
            
            //获取当前的商品列表
            var id = this.id;
            // alert(id);
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

            //alert($.cookie("goods"));.
            listCarData(); //点击加入购物车 列表同时刷新
            return false;
        })
    }

    //14加载已经加入购物车的商品
    /* 
        1 cookie 中只存储了 商品id 及其数量
        2 加载数据 有商品id对应的详细信息
            goodsCarList.json
            goodsList2.json
            [注]找出加入购物车的商品
        了解 new Promise 顺序处理两次 加载数据
    */
    function listCarData(){
        //清除上一次加载的结果
        $("#J_cartListBody .J_cartGoods").html("");

        new Promise(function(resolve, reject){
            $.ajax({
                url: "../data/goodsCarList.json",
                success: function(obj){
                    //如果下载成功，把下载到数据中的商品列表传输过去
                    resolve(obj.data);
                },
                error: function(msg){
                    reject(msg);
                }
            })
        }).then(function(arr1){
            //console.log(arr1);
            //下载第二部分
            //语法
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: "../data/goodsList2.json",
                    success: function(arr2){
                        //将两份数据合并
                        var newArr = arr1.concat(arr2);
                        resolve(newArr);
                    },
                    error: function(msg){
                        reject(msg);
                    }
                })
            })
        }).then(function(arr){
            // console.log(arr);
            //获取cookie中存储的对象 id num
            var cookieStr = $.cookie("goods");
            //如果存在cookie
            if(cookieStr){
                //转成JSON字符串
                var cookieArr = JSON.parse(cookieStr);
                var newArr = []; //建一个空数组
                //遍历cookie传来的字符串
                for(var i = 0; i < cookieArr.length; i++){
                    for(var j = 0; j < arr.length; j++){
                        //合并的cookie中 商品id为 product_id 或者 goodsid
                        //兼容处理
                        if(cookieArr[i].id == arr[j].product_id || cookieArr[i].id == arr[j].goodsid){
                            //获取cookie 中商品数量 
                            arr[j].num = cookieArr[i].num;
                            //
                            arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].goodsid;
                            newArr.push(arr[j]);
                        }
                    }
                }

                //console.log(newArr);
                //14-2拿到加入购物车的所有数据，加载到页面上
                for(var i = 0; i < newArr.length; i++){
                    var node = $(` <div class="item-row clearfix" id = ${newArr[i].id}> 
                        <div class="col col-check">  
                            <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                        </div> 
                        <div class="col col-img">  
                            <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                <img alt="" src="${newArr[i].image}" width="80" height="80"> 
                            </a>  
                        </div> 
                        <div class="col col-name">  
                            <div class="tags">   
                            </div>     
                            <div class="tags">  
                            </div>   
                            <h3 class="name">  
                                <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                    ${newArr[i].name}
                                </a>  
                            </h3>        
                        </div> 
                        <div class="col col-price"> 
                            ${newArr[i].price}元 
                            <p class="pre-info">  </p> 
                        </div> 
                        <div class="col col-num">  
                            <div class="change-goods-num clearfix J_changeGoodsNum"> 
                                <a href="javascript:void(0)" class="J_minus">
                                    <i class="iconfont"></i>
                                </a> 
                                <input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                                <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                            </div>  
                        </div> 
                        <div class="col col-total"> 
                            ${(newArr[i].price * newArr[i].num).toFixed(2)}元 
                            <p class="pre-info">  </p> 
                        </div> 
                        <div class="col col-action"> 
                            <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                        </div> 
                    </div> `);
                    node.appendTo($("#J_cartListBody .J_cartGoods"));
                }

                //数据加载完成时 计算一次
                isCheckAll();
            }
        })
    }

    //15结算页全选按钮和单选按钮点击
    function checkFunc(){
        $(".list-head .col-check").find("i").click(function(){
            var allChecks = $(".list-body").find(".item-row").find(".col-check i");
            //点击一下就判断是否有选中属性（icon-checkbox-selected） 有就取消
            if($(this).hasClass("icon-checkbox-selected")){
                $(this).add(allChecks).removeClass("icon-checkbox-selected");
            }else{
                //没有就设置 i标签 icon-checkbox-selected
                $(this).add(allChecks).addClass("icon-checkbox-selected");
            }
            //点击一次选择按钮时 计算一次价格
            isCheckAll();
            return false;
        })

        //15-1 给单件商品的复选框设置事件委托
        $("#J_cartListBody .J_cartGoods").on("click", ".col-check i", function(){
            if($(this).hasClass("icon-checkbox-selected")){
                $(this).removeClass("icon-checkbox-selected");
            }else{
                $(this).addClass("icon-checkbox-selected");
            }
            isCheckAll();
            return false;
        })
    }

    //15-2 封装判断是否都被选中方法
    function isCheckAll(){
        var allChecks = $(".list-body").find(".item-row");
        var isAll = true; //假设都选中
        var total = 0;
        var count = 0;
        var totalCount = 0;
        //遍历
        allChecks.each(function(index, item){
            //遍历每个节点 如果未被选中 isAll = false
            if(!$(item).find(".col-check i").hasClass("icon-checkbox-selected")){
                isAll = false;
            }else{
                //获取单件商品总价格 遍历完后累加
                total += parseFloat($(item).find(".col-price").html().trim()) * parseFloat($(item).find(".col-num input").val());
                //获取单件商品的数量 遍历完后累加
                count += parseInt($(item).find(".col-num input").val());
            }
            //合计
            totalCount += parseInt($(item).find(".col-num input").val());
        });
        //将统计数据返回页面
        $("#J_cartTotalPrice").html(total);
        $("#J_selTotalNum").html(count);
        $("#J_cartTotalNum").html(totalCount);

        //15-3 判断是否全选
        //如果有一个未被选中，返回isAll = false
        //如果isAll为真 全选 否则不全选
        if(isAll){
            $(".list-head .col-check").find("i").addClass("icon-checkbox-selected");
        }else{
            $(".list-head .col-check").find("i").removeClass("icon-checkbox-selected");
        }
    }

    //16商品数量增加减少和删除
    function changeCars(){
        //16-1 给删除按钮添加事件委托
        $("#J_cartListBody .J_cartGoods").on("click", ".col-action .J_delGoods", function(){
            var id = $(this).closest(".item-row").remove().attr("id");
            //删除cookie中的数据
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for(var i = 0; i < cookieArr.length; i++){
                if(id == cookieArr[i].id){
                    //删除数据
                    cookieArr.splice(i, 1);
                    break;
                }
            }
            //删除最后一条cookie数据 cookie应该被清除 
            cookieArr.length == 0 ? $.cookie("goods", null) : $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
            //删除一条数据 统计一次
            isCheckAll();
            return false;
        })

        //16-2 给+和-添加事件委托
        $("#J_cartListBody .J_cartGoods").on("click", ".J_minus,.J_plus", function(){
            var id = $(this).closest(".item-row").attr("id");
            //找出cookie
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    //说明存在该数据
                    if(this.className == "J_minus"){
                        //数量-1
                        cookieArr[i].num == 1 ? alert("数量为1，不能再减少拉`(*>﹏<*)′") : cookieArr[i].num--;
                    }else{
                        cookieArr[i].num++;
                    }
                    break;
                }
            }
            //更新页面上的数量
            $(this).siblings("input").val(cookieArr[i].num);
            //更新页面上的单个商品价格
            var price = parseFloat($(this).closest(".col-num").siblings(".col-price").html().trim());
            $(this).closest(".col-num").siblings(".col-total").html((price * cookieArr[i].num).toFixed(1) + "元");

            //最后将更改后的数据存储到cookie中
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })

            //每次更改一次数据，重新计算一次总价
            isCheckAll();
            return false;
        })
    }

    return {
        download: download,
        cartHover: cartHover,

        listCarData: listCarData,
        checkFunc: checkFunc,

        changeCars: changeCars
    }
    
});