$(document).ready(function(){
	$(".shopcart").mouseover(function(){
		$(".shopcart").css("background","#fff");
		$(".shopcart").find("a").children().css("color","#ff8737");
		$(".shopcart").find("span").css("color","#ff8737");
		$(".shopcartifo").stop().slideDown();
	}).mouseout(function(){
		$(".shopcart").css("background","#424242");
		$(".shopcart").find("a").children().css("color","#b0b0b0");
		$(".shopcart").find("span").css("color","#b0b0b0");
		$(".shopcartifo").stop().slideUp();
	});

	$(".guide").mouseover(function(){
		var index = $(".guide").index(this);
		$(".list li").eq(index).stop().show();
	}).mouseout(function(){
		var index = $(".guide").index(this);
		$(".list li").eq(index).stop().hide();
	});
	// 轮播图
	$(".cir li").on("click",function(){
		var index = $(".cir li").index(this);
		$(this).addClass("selected")
			   .siblings().removeClass("selected");
		var imgsrc = $(".bgimg").find("img").eq(index).attr("src");
		$(".bg").css({"background-image":"url("+imgsrc+")","opacity":"0"}).animate({opacity:"1"},400);
	});
	$("#left").on("click",function(){
		var index = $(".selected").index();
		if(index == 0){
			index = 4;
		}else{
			index--;
		}
		$(".cir li").eq(index).addClass("selected")
			   		.siblings().removeClass("selected");
		var imgsrc = $(".bgimg").find("img").eq(index).attr("src");
		$(".bg").css({"background-image":"url("+imgsrc+")","opacity":"0"}).animate({opacity:"1"},400);
	})
	$("#right").on("click",function(){
		var index = $(".selected").index();
		if(index == 4){
			index = 0;
		}else{
			index++;
		}
		$(".cir li").eq(index).addClass("selected")
			   		.siblings().removeClass("selected");
		var imgsrc = $(".bgimg").find("img").eq(index).attr("src");
		$(".bg").css({"background-image":"url("+imgsrc+")","opacity":"0"}).animate({opacity:"1"},400);
	})
	timer = setInterval(function(){
        $("#right").click();
    },4000);
    $(".section2").mouseenter(function(){
        clearInterval(timer);
    });
    $(".section2").mouseleave(function(){
        timer = setInterval(function(){
            $("#right").click();
        },4000)
    });

    $(".nav li").mouseover(function(){
		$(this).children("div").show();
	}).mouseout(function(){
		$(this).children("div").hide();
	});

	$(".butr").on("click",function(){
		$(".lists").animate({right:"1226px"},500);
		$(".butl").addClass("butt");
		$(this).removeClass("butt");
	});
	$(".butl").on("click",function(){
		$(".lists").animate({right:"0px"},500);
		$(".butr").addClass("butt");
		$(this).removeClass("butt");
	});
	setInterval(function(){
        $(".butr").click();
        setTimeout(function(){
        	$(".butl").click();
        },5000);
    },10000);

    $(".nav2 li").mouseover(function(){
    	$(this).addClass("choose")
    		   .siblings().removeClass("choose");
    	var index=$(this).index();
    	$(".seclist2").eq(index).show()
    				  .siblings().hide();
    	$(".title").show();
    })

    $(".s1 li").on("click",function(){
    	var num = $(this).index();
    	$(this).addClass("sd")
			   .siblings().removeClass("sd");
		$(this).parent().prev().animate({right:num*296+"px"},1000);
    })
    $(".r").on("click",function(){
    	var index = $(this).parent().find(".sd").index();
    	if(index == 3){
    		index=3;
    	}else{
    		index++;
    	}
    	$(this).parent().find(".sd").removeClass("sd");
    	$(this).parent().children(".s1").find("li").eq(index).addClass("sd");
    	$(this).parent().children(".seclist4").animate({right:index*296+"px"},1000);
    })
    $(".l").on("click",function(){
    	var index = $(this).parent().find(".sd").index();
    	if(index == 0){
    		index=0;
    	}else{
    		index--;
    	}
    	$(this).parent().find(".sd").removeClass("sd");
    	$(this).parent().children(".s1").find("li").eq(index).addClass("sd");
    	$(this).parent().children(".seclist4").animate({right:index*296+"px"},1000);
    })
})