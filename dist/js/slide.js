define(['jquery'], function($) {
    //下载数据
    function download(){
        $.ajax({
            url: "../data/slide.json",
            success: function(result){
                var slideArr = result.data.list.list;
                for(var i = 0; i < slideArr.length; i++){
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                        <a href="#" target = "_blank">
                            <div class = 'content'>
                                <div class = 'thumb'>
                                    <img width="160" height="160" src="${slideArr[i].pc_img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                                </div>
                                <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                                <p class = 'desc'>${slideArr[i].desc}</p>
                                <p class = 'price'>
                                    <span>${slideArr[i].seckill_Price}</span>元
                                    <del>${slideArr[i].goods_price}元</del>
                                </p>
                            </div>
                        </a>
                    </li>`).appendTo("#J_flashSaleList ul");
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    
    //商品列表滚动
    function slideTab(){
        var aSpans = $(".swiper-controls").find("span");
        var iNow = 0;
        //26 是由于json中有26个数据对象
        var count = Math.ceil(26 / 4) - 1;

        //启动定时器
        var timer = setInterval(function(){
            iNow++;
            tab();
            if(iNow == count){
                clearInterval(timer);
            }
        }, 4000);

        //给切换图片按钮添加点击事件
        aSpans.click(function(){
            if($(this).index() == 0){
                //
                iNow--;
                iNow = Math.max(0, iNow);
            }else{
                iNow++;
                iNow = Math.min(count, iNow);
            }
            tab();
        })

        //添加移入移除效果
        /* $("#J_flashSaleList").mouseenter(function(){
            clearInterval(timer);
        });
        $("#J_flashSaleList").mouseleave(function(){
            //重新启动定时器 要重新定义
            timer = setInterval(function(){
                if(iNow = Math.max(0, iNow)){
                    iNow++;
                }
                tab();
                if(iNow == count){
                    clearInterval(timer);
                }
            }, 4000);
        }) */
        $("#J_flashSaleList").stop().on({
            mouseenter: function(){
                clearInterval(timer);
            },
            mouseleave: function(){
                //不能重新定义， 否则 var timer 会触发bug 移入移出只能触发一次
                timer = setInterval(function(){
                    if(iNow = Math.max(0, iNow)){
                        iNow++;
                    }
                    tab();
                    if(iNow == count){
                        clearInterval(timer);
                    }
                }, 4000);
            }
        })

        //封装切换函数
        function tab(){
            //给开始和最后一组设置不可点击
            iNow == 0 ? aSpans.eq(0).addClass("swiper-button-disabled") : aSpans.eq(0).removeClass("swiper-button-disabled");
            iNow == count ? aSpans.eq(1).addClass("swiper-button-disabled") : aSpans.eq(1).removeClass("swiper-button-disabled");

            //count 最后一组只有两个数据 只需移动 （-992 + 496）px
            var iTarget = iNow >= count ? iNow * -992 + 496 : iNow * -992;
            $("#J_flashSaleList ul").css({
                transform: `translate3d(${iTarget}px, 0px, 0px)`,
                transitionDuration: "1000ms"
            })
        }

    }

    return {
        download: download,
        slideTab: slideTab
    }
});