/*
    要用到jquery ajax 下载数据
*/
define(['jquery'], function($) {
    function download(){
        $.ajax({
            url: "../data/goodsList2.json",
            success: function(arr){
                //8大图商品
                $(`<div data-v-61428f58 class = 'section'>
                <div data-v-61428f58 class = 'components-list-box'>
                    <div data-v-a2d6c756 class="channel-product-imgText">
                        <div data-v-a2d6c756 class = 'channel-product-top'>
                            <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                                <div data-v-a2d6c756 class = 'figure'>
                                    <a href="goodsDesc.html?product_id=${arr[0].product_id}">
                                        <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${arr[0].image}" alt=""/>
                                    </a>
                                </div>
                                <div data-v-a2d6c756 class = 'content'>
                                    <h3 data-v-a2d6c756 class = 'title'>
                                        <a data-v-a2d6c756 href="goodsDesc.html?product_id=${arr[0].product_id}">
                                            ${arr[0].name}
                                        </a>
                                    </h3>
                                    <p data-v-a2d6c756 class = 'desc'>${arr[0].desc}</p>
                                    <p data-v-a2d6c756 class = 'price'>
                                        <strong data-v-a2d6c756>${arr[0].price}</strong>元
                                        <span data-v-a2d6c756>起</span>
                                        <del data-v-a2d6c756>${arr[0].del}元</del>
                                    </p>
                                    <p data-v-a2d6c756 class = 'link'>
                                        <a data-v-a2d6c756 href="goodsDesc.html?product_id=${arr[0].product_id}">立即购买</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 分割线 -->
            <div data-v-61428f58 class = 'section'>
                <div data-v-61428f58 class = 'components-list-box'>
                    <div data-v-4a0c734d class = 'channel-line' style = 'background-color: rgb(245, 245, 245); height: 14px;'></div>
                </div>
            </div>`).appendTo(".page-main .app-body");
 
                //小图商品
                for(var i = 1; i < arr.length; i++){
                    //每两个商品创建一行
                    //先创建布局
                    if(i % 2 != 0){
                        var row = $(`<div data-v-61428f58 class = 'section'>
                        <div data-v-61428f58 class = 'components-list-box'>
                            <div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
                                <div data-v-45ef62b1 class = 'row'>
                                    
                                </div>
                            </div>
                        </div>
                    </div>`);
                        row.appendTo(".page-main .app-body");  
                    }

                    //创建每一个商品添加到创建的布局里
                    $(`<div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                        <div data-v-45ef62b1 class = 'figure'>
                            <a data-v-45ef62b1 href="goodsDesc.html?product_id=${arr[i].product_id}" class = 'exposure'>
                                <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${arr[i].image}" alt=""/>
                            </a>
                        </div>
                        <h3 data-v-45ef62b1 class = 'title'>
                            <a data-v-45ef62b1 href="goodsDesc.html?product_id=${arr[i].product_id}">${arr[i].name}</a>
                        </h3>
                        <p data-v-45ef62b1 class = 'desc'>${arr[i].desc}</p>
                        <p data-v-45ef62b1 class = 'price'>
                            <strong data-v-45ef62b1>${arr[i].price}</strong>元
                            <span data-v-45ef62b1>起</span>
                            <del data-v-45ef62b1>${arr[i].del}元</del>
                        </p>
                    </div>`).appendTo(row.find(".row"));

                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    
    //9-1实现商品列表页轮播图
    function banner(){
        var oDiv = $(".swiper-container .swiper-wrapper");
        var aBtns = $(".swiper-container .swiper-pagination a");
        //设置当前显示图片的下标
        var iNow = 0;
        //设置定时器
        var timer = null;
        //启动定时器 2s切换一次
        timer = setInterval(function(){
            iNow++;
            tab();
        }, 2000);

        //9-3添加移入移出效果
        $(".swiper-container").mouseenter(function(){
            clearInterval(timer);
        });

        $(".swiper-container").mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            }, 2000);
        })

        //给页面上指示当前图片下标的原点添加点击事件
        aBtns.click(function(){
            iNow = $(this).index();
            tab();
            return false; //阻止a 链接默认行为（跳转）
        })

        //9-2封装切换函数
        function tab(){
            //移除小圆点 给小标 iNow 添加 swiper-pagination-bullet-active
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");

            //为什么在切换动画里面完成小圆点：因为两者不能同步
            //两者等价 因为 2 代表轮播图里只有两张图片 aBtns.size() = 2 
            // if(iNow == aBtns.size()){
            if(iNow >= 2){
                aBtns.eq(0).addClass("swiper-pagination-bullet-active");
            }

            //切换动画 
            oDiv.animate({left: -2560 * iNow}, 1000, function(){
                //动画结束的时候判断，是否是最后一张图片
                // if(iNow == aBtns.size()){
                if(iNow >= 2){
                    iNow = 0;
                    oDiv.css("left", 0);
                    /*
                    //小圆点写在里面的话，是切换完成后才会显示
                    aBtns.eq(0).addClass("swiper-pagination-bullet-active");
                    */
                }
            })

        }
    }
    
    return {
        download: download,
        banner: banner
    }
});