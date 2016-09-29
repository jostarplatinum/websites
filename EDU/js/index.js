$(document).ready(function(){
	// var oNotice = $('notice');
 //    var oClose = $('no-notice');
 //    // 判断顶部通知是否含有cookie
 //    if (getCookie('close')) {
 //        oNotice.style.marginTop = -36 + 'px';
 //    } else {
 //        oNotice.style.marginTop = 0;
 	var cookie_close=$.cookie("close");
 	if(cookie_close == false){
 		$('#notice').css("margin-top","-36px");
 	}else{
 		$('#notice').css("margin-top","0");
 	}

    $('#no-notice').on("click",function(){
    	$.cookie("close","false",{expires:10});
    	$('#notice').animate({"margin-top":"-36px"})
    });
})