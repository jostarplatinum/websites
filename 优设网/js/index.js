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

$(function(){
	var $changeTab = $("#change-tab span");
	$changeTab.hover(function(){
		$(this).addClass("current")//当前元素高亮
			.siblings().removeClass("current");
			//去掉其他同辈<li>元素的高亮

			var index = $changeTab.index(this);
			//获取当前单击的<li>元素在全部li元素中的索引

			$("#change-li ul")//选取子节点。不选取子节点会引起错误。如果里面还有div元素
				.eq(index).show()//显示<li>元素对应的div元素
				.siblings().hide();//隐藏其他同辈的div元素
	}).hover(function() {
		$(this).addClass("hover");
	},function() {
		$(this).removeClass("hover");
	})
})

$(function(){
	var $absoluteImg = $("#absolute-img");
	var $mgHeight = $absoluteImg.offset().top;
	$(window).scroll(function(){
		 var $scrollHeight = $(window).scrollTop();
		if($mgHeight-$scrollHeight < 0) {
			$absoluteImg.css("position","fixed");
		} else {
			$absoluteImg.css("position","static");
		}
	});
})

$(function () {
	$(window).scroll(function(){
		if ($(window).scrollTop()>100){

			$("#back-top").fadeIn(500);

		} else {

			$("#back-top").fadeOut(500);

		}
	});

	//当点击跳转链接后，回到页面顶部位置

	$("#back-top").click(function(){

		$('body,html').animate({scrollTop:0},300);

		return false;
	});

});

$(function() {
	$('#input-style').focus(function() {
		var parent = $(this).parent("#search-input");
		var $doubi = parent.find(".doubi");
		$(this).addClass("focus");
		if($(this).val() == this.defaultValue) {
			$(this).val("");
		}
		$doubi.css( {
			"height":"23px",
			"top":"-23px"
		}
			);
	}).blur(function() {
		var parent = $(this).parent("#search-input");
		var $doubi = parent.find(".doubi");
		$(this).removeClass("focus");
		if ($(this).val() == '') {
			$(this).val(this.defaultValue);
		}

		$doubi.css( {
			"height":"0",
			"top":"0"
		});
	}).keyup(function(e) {
		if(e.which == 13) {
			alert("回车提交表单！");
		}
	});
});

$(function(){
	var $shareFlag = $(".share-flag");
	var $shareCont = $(".share-slide-container");
	var $shareListBox = $(".share-list-box");
	$shareCont.hover(function(){
		$shareCont.css("width","226px");
		$shareListBox.css({
			"width":"226px",
			"display":"block"
		});
	},function(){
		$shareCont.css("width","0");
		$shareListBox.css({
			"width":"0",
			"display":"none"
		});
	});
})
