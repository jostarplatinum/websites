// section1
$(document).ready(function(){
	// 购物篮
	$(".shopcart").mouseover(function(){
		$(".shopcartifo").stop().slideDown();
	}).mouseout(function(){
		$(".shopcartifo").stop().slideUp();
	});
})

// section2
$(document).ready(function(){
	// 搜索列表
	$('#search-text').focus(function(){
		$('#search-keywords').hide();
		$('#search-list').show();
		$(this).css('border-color','#ff8737');
		$('#btn-search').css('border-color','#ff8737');
	}).blur(function(){
		$('#search-keywords').show();
		$('#search-list').hide();
		$(this).css('border-color','#e0e0e0');
		$('#btn-search').css('border-color','#e0e0e0');
	})
	// 中部导航栏
	$(".guide").hover(function(){
		var index = $(".guide").index(this);
		$(".nav-list .ifos").eq(index).show();
		$(".section1 .nav-list").css("border-width","1px");
	},function(){
		var index = $(".guide").index(this);
		$(".nav-list .ifos").eq(index).hide();
		$(".section1 .nav-list").css("border-width","0px");
	});

	// 轮播图
	var $bgImg = $('.bgimg');
	var $bgImgLi = $('.bgimg li');
    var $bgLi = $('.cir li');
	var timer = null;
    var index = 0;
    // 自动播放函数
    function autoPlay(){
    	clearInterval(timer);
    	timer= setInterval(function(){
    		index = $(".selected").index();
    		if (index == $bgLi.length-1){
    			index = 0;
    		}else{
    			index++;
    		}
    		change(index);
    	},5000);
    }
	autoPlay();
    // 改变当前高亮的索引,以及显示的图片,切换方法
    function change (curIndex) {
        index = $(".selected").index();
        if(index!=curIndex){
        	$bgImgLi.eq(index).animate({'opacity':'0'},500);
        	$bgImgLi.eq(curIndex).animate({'opacity':'1'},500);
        	$bgLi.eq(curIndex).addClass("selected");
        	$bgLi.eq(index).removeClass("selected");
        }
    }
    // 添加循环点击切换
    $bgLi.on('click',function(){
    	change($(this).index());
    })
    // 添加左点击切换
    $("#btn-left").on('click',function(){
    	if(!$bgImgLi.is(":animated")){
    		index = $(".selected").index();
    		if (index == 0){
    			index = $bgLi.length-1;
    		}else{
    			index--;
    		}
    		change(index);
    	}
    })
    // 添加右点击切换
    $("#btn-right").on('click',function(){
    	if(!$bgImgLi.is(":animated")){
    		index = $(".selected").index();
    		if (index == $bgLi.length-1){
    			index = 0;
    		}else{
    			index++;
    		}
    		change(index);
    	}
    })
    // hover时暂停轮播
    // 移出继续轮播
    $bgImg.mouseover(function(){
    	clearInterval(timer);
    }).mouseout(function(){
    	autoPlay();
    })
    // 轮播图 完

    // 子菜单
    $(".banner-nav li").mouseover(function(){
		$(this).children("div").show();
	}).mouseout(function(){
		$(this).children("div").hide();
	});
});

// section4
$(document).ready(function(){
	$(".btns .btn-right").on("click",function(){
		$(".star-goods-lists").animate({right:"1226px"},500);
		$(".btn-left").addClass("active");
		$(this).removeClass("active");
	});
	$(".btns .btn-left").on("click",function(){
		$(".star-goods-lists").animate({right:"0px"},500);
		$(".btn-right").addClass("active");
		$(this).removeClass("active");
	});
	setInterval(function(){
        $(".btn-right").click();
        setTimeout(function(){
        	$(".btn-left").click();
        },5000);
    },10000);
})

// 切换
$(document).ready(function(){
	$(".sec-nav li").mouseover(function(){
    	$(this).addClass("choose")
    		   .siblings().removeClass("choose");
    	var index=$(this).index();
    	console.log($(this).parents(".wrap").find("ul").eq(index));
    	$(this).parents(".wrap").find("ul").eq(index).show()
    				  .siblings().hide();
    	$(".title").show();
    });
})

// 内容轮播
$(document).ready(function(){
	$(".box-cir li").on("click",function(){
    	var num = $(this).index();
    	$(this).addClass("box-cir-active")
			   .siblings().removeClass("box-cir-active");
		$(this).parent().prev().animate({right:num*296+"px"},200);
    });
    $(".box-right").on("click",function(){
    	var index = $(this).parent().find(".box-cir-active").index();
    	if(index == 3){
    		index=3;
    	}else{
    		index++;
    	}
    	$(this).parent().find(".box-cir-active").removeClass("box-cir-active");
    	$(this).parent().children(".box-cir").find("li").eq(index).addClass("box-cir-active");
    	$(this).parent().children(".seclist").animate({right:index*296+"px"},200);
    })
    $(".box-left").on("click",function(){
    	var index = $(this).parent().find(".box-cir-active").index();
    	if(index == 0){
    		index=0;
    	}else{
    		index--;
    	}
    	$(this).parent().find(".box-cir-active").removeClass("box-cir-active");
    	$(this).parent().children(".box-cir").find("li").eq(index).addClass("box-cir-active");
    	$(this).parent().children(".seclist").animate({right:index*296+"px"},200);
    })
})