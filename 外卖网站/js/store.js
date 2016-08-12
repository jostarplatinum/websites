$(function(){
	$(".smallBoxList .sanjiao").click(function(){
		$(".sanjiao").click(function(){
			var cla= $(this).attr("class");
			if(cla.indexOf("rotate")==-1){
				$(this).addClass('rotate');
			}else{
				$(this).removeClass('rotate');
			}
			$(this).parent().next().stop().slideToggle(200);				
		});
	})
	
})

$(function(){
	$(".fourButton>li").click(function(){
		var index=$(this).index();
		$(this).find("a").addClass('active');
		$(this).siblings().find("a").removeClass('active');
		$(".main-left>.box").eq(index).addClass("xianshi").siblings().removeClass("xianshi");
	})
})