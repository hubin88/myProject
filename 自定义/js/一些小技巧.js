//判断是否是微信浏览器
function is_weixin() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}
//禁用所有的CSS动画
$(".stopMoving").click(function() {
	jQuery.fx.off = true;
})

//其作用是从当前页面的地址的参数中提取出指定的参数值
getQueryStringByName = function(name) {
	var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return result[1];
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = location.search.substr(1).match(reg);
	if (r != null) return unescape(decodeURI(r[2]));
	return null;
}

function Setone() {
	var time = 60;
	$("#btn_send").attr("disabled", true).addClass("disabled").val("重新发送" + time);

	function doTimer() {
		if (time > 0) {
			timer = setTimeout(function() {
				$("#btn_send").attr("disabled", true).addClass("disabled").val("重新发送" + (--time));
				doTimer();
			}, 1000);
		} else {
			$("#btn_send").attr("disabled", false).removeClass("disabled").val("点击获取");
		}
	}
	doTimer();
};

//在body标签上加入如下代码，让弹出窗口总是在最上面 
onblur = "this.focus()";
//告诉IE使用最新的引擎渲染网页,不需要做兼容处理
< meta http - equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" >


	//让网页多长时间（秒）刷新自己，或在多长时间后让网页自动链接到其它网页。
	< Meta http - equiv = "Refresh" Content = "30" >
	< Meta http - equiv = "Refresh" Content = "5; Url=http://www.xia8.net" >
	//注意：其中的5是指停留5秒钟后自动刷新到URL网址。


	//指定网页在缓存中的过期时间，一旦网页过期，必须到服务器上重新调阅。用于设定网页的到期时间
	< Meta http - equiv = "Expires" Content = "0" >
	< Meta http - equiv = "Expires" Content = "Wed, 26 Feb 1997 08:21:57 GMT" >
	//注意：必须使用GMT的时间格式，或直接设为0（数字表示多少时间后过期）。


	//禁止浏览器从本地计算机的缓存中访问页面内容。
	< meta http - equiv = "Pragma" content = "no-cache" >
	//这样设定，访问者将无法脱机浏览。
	< meta http - equiv = "cache-control" content = "no-cache" >
	//清除缓存（再访问这个网站要重新下载！）

	//设定页面使用的字符集。
	< meta http - equiv = "content-Type" content = "text/html; charset=gb2312" >
	//语言设定
	< meta http - equiv = "Content-Language" content = "zh-cn" / >

	//revisit-after代表网站重访,7days代表7天，依此类推。
	< Meta name = "revisit-after" Content = "7days" >

	//浏览器访问某个页面时会将它存在缓存中，下次再次访问时就可从缓存中读取，以提高速度。如果网页过期，那么存盘的cookie将被删除
	< Meta http - equiv = "Set-Cookie" Content = "cookievalue=xxx; expires=Wednesday,21-Oct-98 16:14:21 GMT; path=/" >


	//强制页面在当前窗口以独立页面显示。
	< Meta http - equiv = "Widow-target" Content = "_top" >
	//这个属性是用来防止别人在框架里调用你的页面。Content选项：_blank、_top、_self、_parent.


	//这个是页面被载入和退出时的一些特效。
	< Meta http - equiv = "Page-Enter" Content = "blendTrans(Duration=0.5)" >
	< Meta http - equiv = "Page-Exit" Content = "blendTrans(Duration=0.5)" >
	< Meta http - equiv = "Page-Enter" Content = "revealTrans(duration=x, transition=y)" >
	< Meta http - equiv = "Page-Exit" Content = "revealTrans(duration=x, transition=y)" >
	//Duration的值为网页动态过渡的时间，单位为秒。    Transition是过渡方式，它的值为0到23，分别对应24种过渡方式。
	//如下表：   0    盒状收缩   1    盒状放射 2    圆形收缩   3    圆形放射 4    由下往上   5    由上往下 6    从左至右   7    从右至左 8    垂直百叶窗   9    水平百叶窗 10   水平格状百叶窗  11   垂直格状百叶窗 12   随意溶解   13   从左右两端向中间展开 14   从中间向左右两端展开 15   从上下两端向中间展开 16   从中间向上下两端展开 17   从右上角向左下角展开 18   从右下角向左上角展开 19   从左上角向右下角展开 20   从左下角向右上角展开 21   水平线状展开 22   垂直线状展开  23   随机产生一种过渡方式
	//为搜索引擎提供的关键字
	< Meta name = "Keywords" Content = "关键词1,关键词2，关键词3,关键词4,……" >

	//Description用来告诉搜索引擎你的网站主要内容。
	< Meta name = "Description" Content = "你网页的简述" >

	//标注网页的作者或制作组
	< Meta name = "Author" Content = "张三，abc@sina.com" >
	//Content可以是：你或你的制作组的名字,或Email

	//标注版权
	< Meta name = "Copyright" Content = "本页版权归Zerospace所有。All Rights Reserved" >

	//插入网页基链接属性
	< Base href = "http://www.xia8.net/" target = "_blank" >
	//你网页上的所有相对路径在链接时都将在前面加上“http://www.cn8cn.com/”。其中target="_blank"是链接文件在新的窗口中打开，你可以做其他设置。将“_blank”改为“_parent”是链接文件将在当前窗口的父级窗口中打开；改为“_self”链接文件在当前窗口（帧）中打开；改为“_top”链接文件全屏显示。

	//非响应式的布局变成响应式的布局
	< meta name = "viewport" content = "width=device-width,height=device-height,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" >
	< meta http - equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" >
	< meta name = "HandheldFriendly" content = "true" >