$(function(){
	var $jsBigImg = $("#js-big-img");
	var $carouselSmall = $("#carousel-small");
	var $imgrolls = $("#carousel-small a");
	var $sliderPrev = $("#slider-prev");
	var $slideNext = $("#slider-next");
    var len  = $imgrolls.length;
    var flag = 1;
	var index = 0;
	var adTimer = null;

	$imgrolls.click(function(){
		index = $imgrolls.index(this);
		showImg(index);
	}).eq(0).click();	


	//滑入 停止动画，滑出开始动画.
	$carouselSmall.hover(function(){
			if( adTimer ){ 
				clearInterval(adTimer);
			}
		 },function(){
			adTimer = setInterval(function() {
				showImg(index);
			    index++;
				if(index==len) { index=0; }
			},5000 );
	}).trigger("mouseleave");
	 

	//prev点击按钮
	 $sliderPrev.click(function () {	 	
		if(index == 0) {
	 		index = 5;
	 	} else {
	 		index -= 1;	 		
	 	}
	 	showImg(index);
      });

	 //next按钮
	  $slideNext.click(function () {	
		if(index == 5) {
	 		index = 0;
	 	} else {
	 		index += 1;	 		
	 	}
	 	showImg(index);	 	
      });


	//显示不同的幻灯片
	function showImg(index) {		
		var $rollobj = $("#carousel-small");
		var $jsBigImg = $("#js-big-img");
		var $carouselSmallA = $("#carousel-small a");
		var $rolllist = $rollobj.find("a");
		var newhref = $rolllist.eq(index).attr("href");
		$jsBigImg.attr("href",newhref)
				 .find("img").eq(index).stop(true,true).fadeIn()
				 .siblings().fadeOut();
		$carouselSmallA.css("opacity","1")
				 .eq(index).css("opacity","0.5");		
	}

})


