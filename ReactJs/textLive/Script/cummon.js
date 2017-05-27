//ajax请求
function ajax(url, data, doSuccess) {
	$.ajax({
		url: url,
		data: data,
		type: "post",
		async: false,
		dataType: "json"
	}).then(doSuccess);
}
//从当前页面的地址的参数中提取出指定的参数值
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = decodeURIComponent(location.search).substr(1).match(reg);
	if (r != null) return unescape(decodeURI(r[2]));
	return null;
}
//设置Cookie
function setCookie(name, value, option) {
	var isLocalStorage = !!window.localStorage;
	if (isLocalStorage) {
		localStorage.setItem(name, value);
		return;
	}
	var str = name + "=" + escape(value);
	if (option) {
		//如果设置了过期时间
		if (option.expireDays) {
			var date = new Date(),
				ms = option.expireDays * 24 * 3600 * 1000;
			date.setTime(date.getTime() + ms);
			str += "; expires=" + date.toGMTString();
		}
		if (option.path) str += "; path=" + path; //设置访问路径
		if (option.domain) str += "; domain=" + domain; //设置访问主机
		if (option.secure) str += "; true"; //设置安全性
	}
	document.cookie = str;
}

//获取Cookie
function getCookie(name) {
	var isLocalStorage = !!window.localStorage;
	if (isLocalStorage) {
		return localStorage.getItem(name);
	}
	var cookieArray = document.cookie.split("; "),
		l = cookieArray.length,
		i, arr;
	for (i = 0; i < l; i++) {
		arr = cookieArray[i].split("="); //将名和值分开
		if (arr[0] == name) return unescape(arr[1]); //如果是指定的cookie，则返回它的值
	}
	return "";
}

//删除Cookie
function deleteCookie(name) {
	var isLocalStorage = !!window.localStorage;
	if (isLocalStorage) {
		localStorage.removeItem(name);
		return;
	}
	setCookie(name, "", {
		expireDays: -1
	}); //将过期时间设置为过去来删除一个cookie
}

//去掉左右两边的空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

//判断值是否为空
function isEmpty(strValue) {
	if (strValue == null || strValue == undefined || trim(strValue) == "" || trim(strValue).toLowerCase() == "null" || trim(strValue).toLowerCase() == "undefined") {
		return true;
	} else {
		return false;
	}
}
//删除数组中的某个值
function deleteVal(arr,val){
	for (var i = 0,l=arr.length; i < l; i++) {
		if (arr[i] == val){
			arr.splice(i, 1);
			return arr;
		}
	}
	return arr;
}
//获取某个值在数组中的位置
function getIndex(arr,val){
	for (var i = 0,l=arr.length; i < l; i++) {
		if (arr[i] == val){
			return i;
		}
	}
	return -1;
}
