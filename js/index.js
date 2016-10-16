// mouseon
// function showList(){
// 	$().mouseover(function(event) {
// 		// $().show
// 	});
// }
// 
window.onload = function () {
	var Lis = document.getElementById("shopClass").getElementsByTagName("li");
	for (i = 0; i < Lis.length; i++) {
	    Lis[i].i = i;
	    Lis[i].onmouseover = function () {
	        this.className = "lihover";

	        var h0 = (this.i - 1) * 30 + 42;
	        var y = this.getElementsByTagName("div")[0].offsetHeight;
	        var h = this.getElementsByTagName("div")[0].style.top + y;

	        if (h < h0) {
	            this.getElementsByTagName("div")[0].style.top = h0 + "px";
	        }

	        if (y > 550) {
	            this.getElementsByTagName("div")[0].style.top = "3px";
	        }
	    }

	    Lis[i].onmouseout = function () {
	        this.className = "";
	    }
	}

	//图片轮播
	var container = document.getElementById('container');
	var list = document.getElementById('list');
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');

	var index = 1;
	var len = 2;
	var animated = false;
	var interval = 3000;
	var timer;

	// go函数是animate内的一个函数，这里是运动过度动画效果
    // 递归函数，递归就是本身调用自己。
	function animate (offset) {
	    if (offset == 0) {
	        return;
	    }
	    animated = true;
	    var time = 300;
	    var inteval = 10;
	    var speed = offset/(time/inteval);
	    var left = parseInt(list.style.left) + offset;

	    var go = function (){
	        if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
	            list.style.left = parseInt(list.style.left) + speed + 'px';
	            setTimeout(go, inteval);
	        }
	        else {
	            list.style.left = left + 'px';
	            if(left>0){
	                list.style.left = -811 * len + 'px';
	            }
	            if(left<(-811 * (len-1))) {
	                list.style.left = '0px';
	            }
	            animated = false;
	        }
	    }
	    go();
	}

	//图片下标圆点提醒和图片位置对应。
	function showButton() {
	    for (var i = 0; i < buttons.length ; i++) {
	        if( buttons[i].className == 'on'){
	            buttons[i].className = '';
	            break;
	        }
	    }
	    buttons[index - 1].className = 'on';
	}
	//哪个提示小圆点被单击了 
	for (var i = 0; i < buttons.length; i++) {
	    buttons[i].onclick = function () {
	        if (animated) {
	            return;
	        }
	        if(this.className == 'on') {
	            return;
	        }
	        var myIndex = parseInt(this.getAttribute('index'));
	        var offset = -811 * (myIndex - index);

	        animate(offset);
	        index = myIndex;
	        showButton();
	    }
	}


	// 自动播放图片
	function play(){
        // 上面已经用了一个定时器setTimeout
        // 这里我们另外用一个定时器setInterval
        timer = setInterval(function(){
            next.onclick();
        },3000);
    }
    function stop() {
        clearInterval(timer);
    }

    // 单击 > 右滚动图标
	next.onclick = function () {
	    if (animated) {
	        return;
	    }
	    if (index == len) {
	        index = 1;
	    }
	    else {
	        index += 1;
	    }
	    animate(-811);
	    showButton();
	}
	//单击 < 左滚动图标
	prev.onclick = function () {
	    if (animated) {
	        return;
	    }
	    if (index == 1) {
	        index = len;
	    }
	    else {
	        index -= 1;
	    }
	    animate(811);
	    showButton();
	}



	container.onmouseover = stop;
	container.onmouseout = play;

	play();


}
