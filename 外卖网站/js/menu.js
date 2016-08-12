/*轮播图*/
var banner = document.getElementById("banner");
var imglist = document.getElementById("img-list");
var btnList = document.getElementById("btn-list");
var blist = btnList.getElementsByTagName("li");
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
var step = 0;
function move() {
    if (step == 4) {
        step = 0;
        imglist.style.left = 0;
    }
    step++;

    animate(imglist, {left: -step * 980}, 400);
    changeTip();
}

function changeTip() {
	var blist = btnList.getElementsByTagName("li");
    for (var i = 0; i < blist.length; i++) {
        var tempStep = step > blist.length -1 ? 0 : step;
        var curLi = blist[i];
        tempStep === i ? curLi.className = "select" : curLi.className = '';
    }
}

-function lunboClick() {
    for (var i = 0; i < blist.length; i++) {
        var cur = blist[i];
        cur.index = i;
        cur.onmousemove = function () {
            step = this.index;
            animate(imglist, {left: -this.index * 980}, 400);
            changeTip();
        };
    }
}();

banner.onmouseover = function () {
    window.clearInterval(timer);
};
banner.onmouseout = function () {
    timer = setInterval(move, 3000);
};

