$(function(){
	$("header .login .username").hover(function(){
		$("header .login .username .userMenu").stop().slideDown(200);
		$("header .login .username .triangle_icon").addClass('iconRotate');
	},function(){
		$("header .login .username .userMenu").stop().slideUp(200);
		$("header .login .username .triangle_icon").removeClass('iconRotate');
	});	

})

$(function(){
	$("#main-left-ul li").click(function(){
		var index=$(this).index();
		$(this).find("a").addClass("active-li");
		$(this).siblings().find("a").removeClass("active-li");
		$("#main-right-inner>div").eq(index).addClass("active").siblings().removeClass("active");
	});
})