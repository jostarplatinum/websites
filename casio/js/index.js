$(document).ready(function(){
	$(window).resize(function() {
		windowwidth=$(window).width();
  		$(".banner li").css("width",windowwidth);
  		$(".banner-bg").css("margin-left",-(2900-windowwidth)/2+"px");
  		$(".banner-text").css("margin-left",-(2900-windowwidth)/2+"px");
  		$(".section1").css("width",windowwidth+"px");
		$(".banner").css("width",windowwidth*6+"px");
		$(".butr").on("click",function(){
			var index=$(".selected").index();
			$(".selected").removeClass("selected");
			if (index == 5){
				index = 0;
			}else{
				index++;
			}
			$(".circle li").eq(index).addClass("selected");
			$(".banner").css("right",windowwidth*index+"px");
		});
		$(".butl").on("click",function(){
			var index=$(".selected").index();
			$(".selected").removeClass("selected");
			if (index == 0){
				index = 5;
			}else{
				index--;
			}
			$(".circle li").eq(index).addClass("selected");
			$(".banner").css("right",windowwidth*index+"px");
		});
		$(".circle li").on("click",function(){
			var index=$(this).index();
			$(this).addClass("selected").siblings().removeClass("selected");
			$(".banner").css("right",windowwidth*index+"px");
		});
		timer=setInterval(function(){
			$(".butr").click();
		},4000);
	});
	$(window).resize();
})