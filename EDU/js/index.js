/**
 *  显示隐藏函数,如果是显示就隐藏,是隐藏就显示
 * @param {object} obj 需要在点击或hover后实现点击显示隐藏.的对象
 */
function showHide (obj) {
    var objDisplay = $(obj).css('display');
    if (objDisplay == 'none') {
        $(obj).css('display','block')
    } else {
        $(obj).css('display','none')
    }
}

/*
 *顶部通知条,不再提醒cookie
 */
$(document).ready(function(){
	// 顶部广告
 	var $cookie_close=$.cookie("close");
 	if($cookie_close){
 		$('#notice').css("margin-top","-36px");
 	}else{
 		$('#notice').css("margin-top","0");
 	}
    $('#no-notice').on("click",function(){
    	$.cookie("close",false,{path: '/',expires:10});
    	$('#notice').animate({"margin-top":"-36px"})
    });
})
/* 通知条结束*/

/**
 * 关注与登录模块开始
 */
$(document).ready(function(){
    var $followAdd = $(".follow span");
	var $loginWrap = $('.login-wrap');
	var $loginClose = $('#login-close');
	var $obtn = $('#login-form .login-btn');
	var $loginError = $('.login-error');
	var $removeDefine = $('.remove-define');
	// 判断是否有关注cookie若有直接设置为关注样式
    if ($.cookie('followSuc') === 'true') {
        followShow();
    }
    // 从服务器获取关注成功数据,并设置关注成功cookie
    function followCookie () {
        $.ajax({
        	type: 'GET',
     		url: 'http://study.163.com/webDev/attention.htm',
    		data: {} ,
    		success: function(backdata){
    			if (backdata == '1') {
                	// 设置关注成功cookie
               		$.cookie('followSuc', 'true', {path: '/',expires:10});
            	}
    		},
    		fail:function (error) {
            	console.log('服务器响应失败,错误号:' + error);
        	}
        })
    }

    // 点击关注事执行的函数
    function followClick () {
        // 判断是否有登录成功的cookie
        if ($.cookie('loginSuc')) {
            // 存在登录成功的cookie时,点击关注,改变样式.
            followShow();
            // 从服务器获取关注成功数据,并设置关注成功cookie
            followCookie();

        } else {
            // 本地不存在登录cookie时,进入登入层
            loginShowHide();
            // 添加登录事件
            $obtn.on("click",loginBtn);
            // 点击X退出登录层
        	$loginClose.on("click",function(){
            	$loginWrap.css('display','none');
            });

        }
    }
	// 给关注按钮添加点击事件
    $followAdd.on("click",function(){
    	followClick ();
    })
    // 登录层显示
    function loginShowHide () {
        showHide($loginWrap);
    }
    // 关注层显示
    function followShow () {
        var $followRemove = $('.follow-remove');
        showHide($followAdd);
        showHide($followRemove);

    }
    var loginSuccess = function (data) {
        if (data === '1') {
                // 设置登录成功函数cookie
            $.cookie('loginSuc', true, {path: '/',expires:10});
                // 登录成功,登录层消失
            loginShowHide();
                // 关注样式改变
            followShow();
                // 从服务器获取关注成功数据,并设置关注成功cookie
            followCookie();
        } else {
                /* 登录错误时响应*/
            $loginError.attr('display','block');
            setTimeout(function () {
                    $loginError.attr('display','none');
                }, 2000);
        }
    };
    var loginBtn = function() {
		var user = $('#login-form input[type=text]').val();
    	var pass = $('#login-form input[type=password]').val();
        // 向服务器提交的数据
        var data = {
            userName: md5(user),
            password: md5(pass)
        };
        $.ajax({
        	type: 'GET',
     		url: 'http://study.163.com/webDev/login.htm',
    		data: data ,
    		success: function(backdata){
    			loginSuccess(backdata);
    		},
    		fail:function (error) {
            	console.log('服务器响应失败,错误号:' + error);
        	}
        })
    }
    $removeDefine.on("click",function(){
    	console.log("10");
    	followShow();
        $.cookie('followSuc',null);
    })
});
/* 关注与登录结束*/

/**
 * 轮播图开始.
 */
$(document).ready(function () {
    var $Slideshow = $('.Slideshow');
    var $aImg = $('.Slideshow a');
    var $aLI = $('.Slideshow li');
    var timer = null;
    var index = 0;
    // 自动播放函数
    function autoPlay(){
    	clearInterval(timer);
    	timer= setInterval(function(){
    		index = $(".active").index();
    		if (index == $aImg.length-1)
    		{
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
        index = $(".active").index();
        if(index!=curIndex){
        	$aImg.eq(index).animate({'opacity':'0'},500);
        	$aImg.eq(curIndex).animate({'opacity':'1'},500);
        	$aLI.eq(curIndex).addClass("active");
        	$aLI.eq(index).removeClass("active");
        }
    }
    // 添加循环点击切换
    $aLI.on('click',function(){
    	change($(this).index());
    })
    // hover时暂停轮播
    // 移出继续轮播
    $Slideshow.mouseover(function(){
    	clearInterval(timer);
    }).mouseout(function(){
    	autoPlay();
    })

});
/* 轮播图结束*/

/*
 * 生活环境图片无缝滚动
 */
$(document).ready(function () {
    var $environment = $('.environment');
    var $environmentUl = $('.environment-ul');
    var $environmentLi = $('.environment-ul li');
    var environmentTimer = null;
    var environmentSpeed = 1;
    $environmentLi.clone(true).appendTo($environmentUl);
    $environmentLi = $('.environment-ul li');
    $environmentUl.css('width', $environmentLi.length * $environmentLi.innerWidth() + 'px');
    var leftpx = $environmentUl.position().left;
    function ulMove () {
        $environmentUl.animate({left:leftpx - environmentSpeed + 'px'},10);
        leftpx -= environmentSpeed;
        if (leftpx <= -$environmentUl.width() / 2) {
            $environmentUl.css({left:0});
            leftpx = 0;
        }
    }
    environmentTimer = setInterval(ulMove, 10);
    $environment.mouseover(function(){
    	clearInterval(environmentTimer);
    }).mouseout(function(){
    	environmentTimer = setInterval(ulMove, 20);
    })
});
/* 结束无缝滚动*/

/*
 *视频播放开始
 */
$(document).ready(function () {
    var moivePlayer = $('.studyMoive img');
    var playerWrap = $('.moive-wrap');
    var closeMoive = $('#moive-close');
    var moive = $('#moive');

    function playPause () {
        if (moive.paused)
            setTimeout(function () {
                moive.play();

            }, 500);
        else
            moive.pause();
    }

    function play () {
        showHide(playerWrap);
        playPause();

    }
    moivePlayer.on('click', play);
    closeMoive.on('click', play);
});
/* 视频播放结束*/

/*
 * 课程列表开始
 */
$(document).ready(function () {
    var $design = $('.design');
    var typeNumber = 10;
    var $tabDesign = $('.conent-tab li').eq(0);
    var $tabLanguage = $('.conent-tab li').eq(1);
    var $pagination = $('.pagination');
    // var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;

    // 默认页面课程列表
    var psizeNumber = 20;
    // if (clientWidth <= 1205) {
    //     psizeNumber = 15;
    // } else {
    //     psizeNumber = 20;
    // }
    // 页码大小限制
    var totalPage;
    // 默认页码
    var pageNoNumber = 1;
    // tab页切换课程列表
    function tabChange () {
        $('.design .class-list').remove();
        course();
    }
    // 产品设计点击切换
    $tabDesign.on('click', function () {
        $tabLanguage.removeClass('tab-active');
        $(this).attr('class','tab-active');
        typeNumber = 10;
        pageNoNumber = 1;
        tabChange();
    });
    // 编程语言点击切换
    $tabLanguage.on('click', function () {
        $tabDesign.removeClass('tab-active');
        $(this).attr('class','tab-active');
        typeNumber = 20;
        pageNoNumber = 1;
        tabChange();
    });
    /**
     * 页码切换部分.
     */
    var $paginationUP = $('.pagination i').eq(0);
    var $paginationDOWN = $('.pagination i').eq(1);

    // 数字切换页码
    var $pageUl = $('.page-ul');
    var $pageLi = $('.page-ul li');
    $pageLi.on('click',function () {
            // 当前高亮
            $(this).addClass('page-active').siblings().removeClass('page-active');
            // 从服务器获取的页码
            pageNoNumber = parseInt($(this).text());
            tabChange();
    });
    // 向上向下切换页码
    // 默认为false表示向下增加
    var UpOrDown = true;
    // 向上向下点击时执行的事件.
    function upDown () {
        // for (var i = 0; i < pageLi.length; i++) {
        //     // 当向下翻页时传入页码不为8的倍数时,根据条件翻页,处理传入为8时,直接翻页导致最后的8和8的倍数取不到的情况
        //     if (UpOrDown && parseInt(pageNoNumber % 8) !== 0) {
        //         pageLi[i].innerHTML = parseInt(pageNoNumber / 8) * 8 + i + 1;
        //     } else {
        //         // 当向上时,如果传入为8的倍数时,直接翻页,不这样处理的话总是会出现要比8的倍数少1才翻页的情况
        //         if (parseInt(pageNoNumber % 8) == 0) {
        //             pageLi[i].innerHTML = (parseInt(pageNoNumber / 8) - 1) * 8 + i + 1;
        //         } else {
        //             // 向上翻页的普通情况
        //             pageLi[i].innerHTML = parseInt(pageNoNumber / 8) * 8 + i + 1;

        //         }
        //     }
        //     pageLi[i].className = '';
        // }
        // if (parseInt(pageNoNumber % 8) == 0) {
        //     pageLi[pageLi.length - 1].className = 'page-active';

        // } else {
        //     pageLi[parseInt(pageNoNumber % 8) - 1].className = 'page-active';
        // }
        var pageActiveText = parseInt($('.page-active').text());
        var index = $('.page-active').index()+1;
        if (pageActiveText <= 2){
        	$pageUl.children('li').eq(index).addClass('page-active').siblings().removeClass('page-active');
        }else{
        	if (pageActiveText >= totalPage - 2){
        		$('.end').css('display','none');
        		$pageUl.children('li').eq(index).addClass('page-active').siblings().removeClass('page-active');
        	}else{
        	$('.start').css('display','block');
        		$pageUl.children('li').each(function(){
        			if ( !$(this).hasClass('ellipsis') && !$(this).hasClass('endpage') && !$(this).hasClass('startpage')){
        				$(this).text(parseInt($(this).text())+1);
        			}
        		})
        	}
        }
        // tabChange();
    }
    // 向上翻页点击事件
    // myAddEvent(paginationUP, 'click', function () {
    //     pageNoNumber--;
    //     // 边界处理
    //     if (pageNoNumber <= 1) {
    //         pageNoNumber = 1;
    //     }
    //     UpOrDown = false;
    //     upDown();
    // });
    // 向下翻页点击事件
    $paginationDOWN.on('click', function () {
        pageNoNumber++;
        // 边界处理
        if (pageNoNumber >= totalPage) {
            pageNoNumber = totalPage;
        }
        UpOrDown = true;
        upDown();
    });
    $('.ellipsis').unbind('click');
    // Ajax函数
    function course () {
        var senddata = {
            pageNo: pageNoNumber,
            psize: psizeNumber,
            type: typeNumber
        };
        $.ajax({
        	type:'get',
        	url:'http://study.163.com/webDev/couresByCategory.htm',
        	data:senddata,
        	dataType: "json",
        	success: function(backdata){
    			// 总页数
                totalPage = backdata.totalPage;
                var list = backdata.list;
                for (var i in list) {
                    // 课程列表容器
                    var classList = $('<div></div>');
                    classList.attr('class','class-list');
                    classList.appendTo($design);
                    // 课程图片
                    var classListImg = $('<img>');
                    classListImg.attr('src',list[i].middlePhotoUrl);
                    classListImg.attr('alt',list[i].name);
                    classListImg.appendTo(classList);
                    // 课程信息.文字信息包裹.
                    var classListContent = $('<div></div>');
                    classListContent.attr('class','describe');
                    classListContent.appendTo(classList);
                    // 课程标题
                    var classListTitle = $('<a></a>');
                    classListTitle.attr('href',list[i].providerLink);
                    classListTitle.html(list[i].name);
                    classListTitle.appendTo(classListContent);
                    // 课程发布者
                    var classProvider = $('<p></p>');
                    classProvider.html(list[i].provider);
                    classProvider.appendTo(classListContent);
                    // 课程学习人数
                    var classPerson = $('<div></div>');
                    // 人数图标
                    var hotPriceIcon = $('<i></i>');
                    hotPriceIcon.html('&#xe603;');
                    hotPriceIcon.attr('class','iconfont');
                   	classPerson.html(list[i].learnerCount);
                   	hotPriceIcon.prependTo(classPerson);
                    classPerson.appendTo(classListContent);
                    // 课程价格
                    var classPrice = $('<strong></strong>');
                    if (list[i].price == '0') {
                        classPrice.html('免费');
                    } else {
                        classPrice.html(list[i].price);
                        // 价格图标..
                        var classPriceIcon = $('<i></i>');
                        classPriceIcon.html('&#xe609;');
                        classPriceIcon.attr('class','iconfont');
                        classPrice.appendTo(classPriceIcon);
                    }
                    classPrice.appendTo(classListContent);

                    // hover时的样式容器
                    var hoverDiv = $('<div></div>');
                    hoverDiv.attr('class','describe-hover');
                    hoverDiv.css('display','none');
                    hoverDiv.appendTo(classList);

                    // hover时课程标题
                    var hoverListTitle = $('<a></a>');
                    hoverListTitle.html(list[i].name);
                    hoverListTitle.attr('href',list[i].providerLink);
                    hoverListTitle.appendTo(hoverDiv);
                    // 人数图标
                    var hoverPerson = $('<div></div>');
                    var hotPriceIcon = $('<i></i>');
                    hotPriceIcon.html('&#xe603;');
                    hotPriceIcon.attr('class','iconfont');
                    hoverPerson.html(list[i].learnerCount + '人在学');
                   	hotPriceIcon.prependTo(hoverPerson);
                    hoverPerson.appendTo(hoverDiv);
                    // 课程发布者
                    var hoverProvider = $('<p></p>');
                    hoverProvider.text('发布者 ：' + list[i].provider);
                    hoverProvider.appendTo(hoverDiv);
                    // 分类
                    var hoverCategory = $('<p></p>');
                    hoverCategory.text('分类 ：' + list[i].categoryName);
                    hoverCategory.appendTo(hoverDiv);

                    // 课程描述......
                    var hoverDescription = $('<p></p>');
                    hoverDescription.html(list[i].description);
                    hoverDescription.attr('class','description');
                    hoverDescription.css('display','none');
                    hoverDescription.appendTo(classList);
                }
                // 课程列表的hover效果
                // 获取课程列表数量
                var classlisthover = $('.class-list');
                classlisthover.mouseover(function(){
                	$(this).attr('class','hover-class-list');
                    $(this).children('.describe').css('display','none');
                    $(this).children('.describe-hover').css('display','block');
                    $(this).children('.description').css('display','block');
                }).mouseout(function(){
                	$(this).attr('class','class-list');
                    $(this).children('.describe').css('display','block');
                    $(this).children('.describe-hover').css('display','none');
                    $(this).children('.description').css('display','none');
                });
                $('.endpage').text(totalPage);
    		},
    		fail:function (error) {
            	console.log('服务器响应失败,错误号:' + error);
        	}
        })
    }
    course();
});
/* 课程列表结束*/