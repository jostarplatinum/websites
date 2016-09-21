$(document).ready(function(){
	var firstHeight = 778;
	var dataArr = [];
	var mod = $(".qfigure");
	$(mod).each(function (i, item) {
        if (i === 0) {
            dataArr[i] = $(item).offset().top - Math.floor($(item).height() / 2) - 500
        } else {
            dataArr[i] = $(item).offset().top - Math.floor($(item).height() / 2)
        }
    });
	var winHeight = $(window).height();
	var $body = $("body");
	var bodyheight = $body.height();
	$(window).scroll(function (e) {
        scrollTop = $(window).scrollTop();
        if (scrollTop >= firstHeight) {
            $("#topbar").addClass("topicfixed")
        } else {
            if ($("#topbar").hasClass("topicfixed")) {
                $("#topbar").removeClass("topicfixed")
            }
        }
        if (scrollTop < 100) {
            $body.attr("id", "pg0")
        }
        $(dataArr).each(function (i, item) {
            if (Math.floor(winHeight / 2) + scrollTop >= item) {
                $body.attr("id", "pg" + (i + 1))
            }
        });
        if (scrollTop + winHeight >= bodyheight) {
            $body.attr("id", "pg3")
        }
    });


    $(".circle span").mouseover(function(){
    	if(!$(this).hasClass("on")){
    		$(this).addClass("on").siblings().removeClass("on");
    	var index=$(this).index();
    	$("#crossbanenr li").eq(index).fadeIn("slow").siblings().fadeOut();
    	}
    });
    timer=setInterval(function(){
    	$(".on").removeClass("on").siblings().addClass("on");
    	var index=$(".on").index();
    	$("#crossbanenr li").eq(index).fadeIn("slow").siblings().fadeOut();
    },4000);

    $("#crossbanenr").mouseover(function(){
    	clearInterval(timer);
    }).mouseout(function(){
    	timer=setInterval(function(){
    		$(".on").removeClass("on").siblings().addClass("on");
    		var index=$(".on").index();
    		$("#crossbanenr li").eq(index).fadeIn("slow").siblings().fadeOut();
    	},4000);
    });
})