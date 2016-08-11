/*搜索栏切换*/
var tatmsh = document.getElementById("tts");
var ttsLi = tatmsh.getElementsByTagName("li");
var sBox = document.getElementById("searchBox");
var sbLi = sBox.getElementsByTagName("div");
var searchClick = document.getElementById("searchClick");
~function () {
    for (var i = 0; i < ttsLi.length; i++) {
        var cur = ttsLi[i];
        cur.index = i;
        cur.onclick = function () {
            for (var j = 0; j < ttsLi.length; j++) {
                ttsLi[j].className = "";
                sbLi[j].style.display="none";
            }			
			sbLi[this.index].style.display = "block";
			if (this.index == 0) {
				this.className = "taoselect";
                searchClick.style.background = "#ff5400";
            }
			if (this.index == 1) {
                this.className = "tmallSelect";
                searchClick.style.background = "#c60000";
            }
			if (this.index == 2) {
                this.className = "shopSelect";
                searchClick.style.background = "#FF34B3";
            }          
        }
    }

}();

/*轮播图*/
var Imove = document.getElementById("Imove");
var innerImove = document.getElementById("inner-Imove");
var ImoveTip = document.getElementById("ImoveTip");
var oLis = ImoveTip.getElementsByTagName("li");
var lBtn = document.getElementById("lBtn");
var rBtn = document.getElementById("rBtn");
var Btn = Imove.getElementsByTagName("a");
var tio = document.getElementById("tio");
var tii = document.getElementById("tii");
var tit = document.getElementById('tit');
var lBtn2 = document.getElementById('lBtn2');
var rBtn2 = document.getElementById('rBtn2');
var oLis2 = tit.getElementsByTagName("li");
var strongNum = document.getElementById("strongNum");
var flag = "getComputedStyle" in window;
function getCss(curEle, attr) {
    var val = null, reg = null;
    if (flag) {
        val = getComputedStyle(curEle, null)[attr];
    } else {
        if (attr === "opacity") {
            val = curEle.currentStyle["filter"];
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
            val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
        } else {
            val = curEle.currentStyle["filter"];
        }
    }
    var reg = /^(-?\d+(\.\d+)?)(px|em|pt|rem)?$/;
    return reg.test(val) ? parseFloat(val) : val;

};
function getWin(attr, val) {
    if (typeof val === "undefined") {
        return document.documentElement[attr] || document.body[attr];
    } else {
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }

}

function setCss(curEle, attr, val) {
    var reg = /^-?\d+(\.\d+)?(?:px|em|pt|reg|rem)?$/;
    if (attr == "opacity") {
        if (flag) {
            curEle.style.opacity = val;
        } else {
            curEle.style["filter"] = "alpha(opacity=" + val * 100 + ")";
        }
        return;
    }
    if (attr == "float") {
        ele.style["cssFloat"] = val;
        ele.styel["styleFloat"] = val;
        return;
    }
    var reg = /^(width|left|height|top|right|bottom|(margin|padding)(Top|Bottom|Left|Right)?)$/;
    if (reg.test(attr)) {
        if (!isNaN(val)) {
            val += "px";
        }
        curEle.style[attr] = val;
    }
}
function setGroupCss(curEle, obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            setCss(curEle, key, obj[key]);
        }
    }
}
function linear(t, b, c, d) {
    return c * t / d + b;
}
function animate(curEle, target, duration) {
    var begin = {}, change = {}, interval = 10, time = 0;
    window.clearInterval(curEle.zhufengTimer);
    for (var key in target) {
        if (target.hasOwnProperty(key)) {
            begin[key] = getCss(curEle, key);
            change[key] = target[key] - begin[key];
        }
    }
    curEle.zhufengTimer = setInterval(function () {
        time += interval;
        if (time >= duration) {
            window.clearInterval(curEle.zhufengTimer);
            setGroupCss(curEle, target);
        }
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                curPosi = linear(time, begin[key], change[key], duration);
                setCss(curEle, key, curPosi);
            }
        }
    }, interval)
}
var timer = setInterval(move, 3000);
var timer2 = setInterval(move2, 3000);
var step = 0, step2 = 0;
function move() {
    if (step == 5) {
        step = 0;
        innerImove.style.left = 0;
    }
    step++;

    animate(innerImove, {left: -step * 520}, 400);
    changeTip();

}
function move2() {
    if (step2 == 5) {
        step2 = 0;
        tii.style.left = 0;
    }
    step2++;
    animate(tii, {left: -step2 * 520}, 400);
    changeTip2();
}
function changeTip() {
    var oLis = ImoveTip.getElementsByTagName("li");
    for (var i = 0; i < oLis.length; i++) {
        var tempStep = step > oLis.length -1 ? 0 : step;
        var curLi = oLis[i];
        tempStep === i ? curLi.className = "select" : curLi.className = '';
    }
}
function changeTip2() {
    var oLis2 = tit.getElementsByTagName("li");
    for (var i = 0; i < oLis2.length; i++) {
        var cur2 = oLis2[i];
        var temp = step2 >= 5 ? 0 : step2;
        i === temp ? cur2.className = "selectT" : cur2.className = "";
    }
}
-function lunboClick() {
    for (var i = 0; i < oLis.length; i++) {
        var cur = oLis[i], cur2 = oLis2[i];
        cur.index = i;
        cur2.index = i;
        cur.onclick = function () {
            step = this.index;
            animate(innerImove, {left: -this.index * 520}, 400);
            changeTip();
        };
        cur2.onclick = function () {
            step = this.index;
            animate(tii, {left: -this.index * 520}, 400);
            changeTip();
        };

    }
}();
Imove.onmouseover = function () {
    window.clearInterval(timer);
    lBtn.style.display = "block";
    rBtn.style.display = "block";
};
tio.onmouseover = function () {
    window.clearInterval(timer2);
    lBtn2.style.display = "block";
    rBtn2.style.display = "block";
};
Imove.onmouseout = function () {
    timer = setInterval(move, 3000);
    lBtn.style.display = "none";
    rBtn.style.display = "none";
};
tio.onmouseout = function () {
    timer2 = setInterval(move2, 3000);
    lBtn2.style.display = "none";
    rBtn2.style.display = "none";
};
rBtn.onclick = move;
rBtn2.onclick = move2;
lBtn.onclick = function () {
    if (step == 0) {
        step = 5;
        innerImove.style.left = -(step * 520) + "px";
    }
    step--;
    animate(innerImove, {left: -step * 520}, 400);
    changeTip();
};
lBtn2.onclick = function () {

    if (step2 == 0) {
        step2 = 5;
        tii.style.left = -(step2 * 520) + "px";
    }
    step2--;
    animate(tii, {left: -step2 * 520}, 400);
    changeTip2();
};

/*公告选项卡*/
var noticeHd=document.getElementById("notice-hd");
var oLiNotice=noticeHd.getElementsByTagName("li");
var tbNotice=document.getElementById("tb-notice");
var oDivNotice=tbNotice.getElementsByTagName("div");

~function(){
    for(var i=0;i<oLiNotice.length;i++){
        var cur=oLiNotice[i];
        cur.index=i;
        cur.onmouseover=function(){
            for(var j=0;j<oLiNotice.length;j++){
                oLiNotice[j].className="";
                oDivNotice[j].style.display="none";
            }
            this.className="select";
            oDivNotice[this.index].style.display="block";
        }
    }


}();

