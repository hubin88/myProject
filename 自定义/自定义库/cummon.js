//从当前页面的地址的参数中提取出指定的参数值
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = location.search.substr(1).match(reg);
	if (r != null) return unescape(decodeURI(r[2]));
	return null;
}
// 获取当前的绝对路径
function getAbsolutePath() {
	var href = document.location.href,
		pathname = document.location.pathname,
		pos = href.indexOf(pathname),
		localhostPath = href.substring(0, pos),
		projectname = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
	return localhostPath + projectname + "/";
}
//判断是否是微信浏览器
function is_weixin() {
	var ua = navigator.userAgent.toLowerCase();
	if (/MicroMessenger/i.test(ua)) {
		return true;
	} else {
		return false;
	}
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

//数字千分位形式
function toThousands(num) {
	var num = num.toString(),
		index = num.indexOf(".");
	if (index < 0) {
		return num.replace(/,/g, "").replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
	} else {
		var numIntegralPart = num.substring(0, index),
			numDecimalPart = num.substring(index);
		return numIntegralPart.replace(/,/g, "").replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + numDecimalPart;
	}
}

//输入银行卡号码
function bankcard(num) {
	return num.toString().replace(/\s/g, '').replace(/(\d{4})/g, "$1 ");
}

//获取数字num的第n位(从右往左)
function getAnumber(num, n) {
	var num = (num || 0).toString();
	if (n > num.length) {
		return (num + "的位数不足" + n + "位");
	} else {
		var result = num.substr(-n, 1);
		return result;
	}
}

//获取2个数之间的随机整数
function getRandomNumber(lowValue, highValue) {
	var choice = highValue - lowValue + 1;
	return Math.floor(Math.random() * choice + lowValue);
}

//随机字母和数字字符串
function getRandomString(n) {
	if (typeof n != "number") {
		return "参数错误";
	}
	var str = "",
		chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
		l = chars.length;
	for (var i = 0; i < n; i++) {
		var index = Math.floor(Math.random() * l);
		str += chars[index];
	}
	return str;
}

//把十进制数转换成其他进制hex<37
function decimalToOther(number, hex) {
	var result = Number(number).toString(hex || 2);
	return result;
}

//只能输入数字
function onlyEnterNumbers(obj) {
	obj.keydown(function(e) {
		var kc = e.keyCode;
		var arr = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 107, 109, 110, 8, 9, 37, 38, 39, 40, 46];
		var flag = $.inArray(kc, arr);
		if (flag == -1) {
			return false;
		}
	});
}

//去除数组中重复的项
function arrayToWeight(arr) {
	if (!(arr instanceof Array)) {
		return "参数错误";
	}
	var newArr = [];
	for (var i = 0, l = arr.length; i < l; i++) {
		if ($.inArray(arr[i], newArr) == -1) {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}
//数组重新排列
function arrayShuffle(arr) {
	if (!(arr instanceof Array)) {
		return "参数错误";
	}
	return arr.sort(function() {
		return Math.random() - 0.5;
	});
}
//统计数组中每个元素的个数
function getElementsNumber(arr) {
	if (!(arr instanceof Array)) {
		return "参数错误";
	}
	var obj = {};
	for (var i = 0, l = arr.length; i < l; i++) {
		var item = arr[i];
		obj['"' + item + '"'] = (obj['"' + item + '"'] + 1) || 1;
	}
	return obj;
}

//把数字转换为中文大写
function NoToChinese(num) {
	if (!/^\d*(\.\d*)?$/.test(num)) {
		alert("Number is wrong!");
		return "Number is wrong!";
	}
	var AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
	var BB = new Array("", "拾", "佰", "仟", "萬", "億", "点", "");
	var a = ("" + num).replace(/(^0*)/g, "").split("."),
		k = 0,
		re = "";
	for (var i = a[0].length - 1; i >= 0; i--) {
		switch (k) {
			case 0:
				re = BB[7] + re;
				break;
			case 4:
				if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
					re = BB[4] + re;
				break;
			case 8:
				re = BB[5] + re;
				BB[7] = BB[5];
				k = 0;
				break;
		}
		if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
		if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
		k++;
	}
	if (a.length > 1) //加上小数部分(如果有小数部分) 
	{
		re += BB[6];
		for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
	}
	return re;
}

//金额转换为中文
function moneyToUppercase(n) {
	var fraction = ['角', '分'];
	var digit = [
		'零', '壹', '贰', '叁', '肆',
		'伍', '陆', '柒', '捌', '玖'
	];
	var unit = [
		['元', '万', '亿'],
		['', '拾', '佰', '仟']
	];
	var head = n < 0 ? '欠' : '';
	n = Math.abs(n);
	var s = '';
	for (var i = 0; i < fraction.length; i++) {
		s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
	}
	s = s || '整';
	n = Math.floor(n);
	for (var i = 0; i < unit[0].length && n > 0; i++) {
		var p = '';
		for (var j = 0; j < unit[1].length && n > 0; j++) {
			p = digit[n % 10] + unit[1][j] + p;
			n = Math.floor(n / 10);
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	}
	return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

//鼠标位置
function getMousePosition(ev) {
	if (ev.pageX || ev.pageY) {
		return {
			x: ev.pageX,
			y: ev.pageY
		};
	}
	return {
		x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y: ev.clientY + document.body.scrollTop - document.body.clientTop
	};
}

//图片加载
function loadImage(url, callback) {
	var img = new Image();
	img.src = url;
	if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数 
		callback.call(img);
		return; // 直接返回，不用再处理onload事件 
	}
	img.onload = function() { //图片下载完毕时异步调用callback函数。 
		callback.call(img); //将回调函数的this替换为Image对象 
	};
}
//表单验证
var check = {
	//用户名
	user: {
		min: 4,
		max: 12,
		reg: /^(\w|[\u4e00-\u9fa5]){2,10}$/,
		error_empty: '用户名不能为空',
		error: '用户名不正确',
		error_min: function() {
			return '用户名最少' + this.min + '个字符';
		},
		error_max: function() {
			return '用户名最多' + this.max + '个字符';
		},
		validate: function(val) {
			if (isEmpty(val)) {
				return this.error_empty;
			}
			if (val.length < this.min) {
				return this.error_min();
			}
			if (val.length > this.max) {
				return this.error_max();
			}
			var validate = this.reg.test(val);
			return !validate ? this.error : true;
		}
	},
	//姓名
	name: {
		reg: /^[\u4e00-\u9fa5]{2,10}$/,
		error: '姓名只能输入汉字',
		error2: '姓名为2-10个汉字',
		validate: function(val) {
			val = String(val);
			if (val.length < 2 || val.length > 10) return this.error2;
			var validate = this.reg.test(trim(val));
			return validate ? true : this.error;
		}
	},
	//昵称
	nickname: {
		min: 2,
		max: 12,
		reg: /^([a-zA-Z\u4e00-\u9fa5]){2,12}$/,
		error_empty: '昵称不能为空',
		error: '昵称格式为汉字或字母！',
		error_min: function() {
			return '昵称最少' + this.min + '个汉字或字母';
		},
		error_max: function() {
			return '昵称最多' + this.max + '个汉字或字母';
		},
		validate: function(val) {
			if (isEmpty(val)) {
				return this.error_empty;
			}
			if (val.length < this.min) {
				return this.error_min();
			}
			if (val.length > this.max) {
				return this.error_max();
			}
			var validate = this.reg.test(trim(val));
			return !validate ? this.error : true;
		}
	},
	//密码(数字和字母)
	passwordold: {
		min: 6,
		max: 20,
		storage: null,
		reg: /^([a-zA-Z0-9]){6,20}$/,
		error: '密码只能为字母和数字',
		error_empty: '密码不能为空',
		error_min: function() {
			return '密码最少' + this.min + '个字符';
		},
		error_max: function() {
			return '密码最多' + this.max + '个字符';
		},
		validate: function(val) {
			val = val.toString();
			if (isEmpty(val)) {
				return this.error_empty;
			}
			if (val.length < this.min) {
				return this.error_min();
			}
			if (val.length > this.max) {
				return this.error_max();
			}
			var validate = this.reg.test(trim(val));
			return validate ? true : this.error;
		}
	},
	//密码确认
	repasswordold: {
		error: '两次密码不一致',
		error_empty: '密码不能为空',
		validate: function(val) {
			if (isEmpty(val)) return this.error_empty;
			if (val != check.passwordold.storage) {
				return this.error;
			}
			return true;
		}
	},
	//密码(数字,字母,下划线)
	password: {
		min: 6,
		max: 20,
		storage: null,
		reg: /^([a-zA-Z0-9_]){6,20}$/,
		error: '密码长度为6-20个字符[数字字母下划线]',
		error_empty: '密码不能为空',
		error_min: function() {
			return '密码最少' + this.min + '个字符';
		},
		error_max: function() {
			return '密码最多' + this.max + '个字符';
		},
		validate: function(val) {
			val = val.toString();
			if (isEmpty(val)) {
				return this.error_empty;
			}
			if (val.length < this.min) {
				return this.error_min();
			}
			if (val.length > this.max) {
				return this.error_max();
			}
			var validate = this.reg.test(trim(val));
			if (validate) {
				this.storage = val;
			}
			return validate ? true : this.error;
		}
	},
	//密码确认
	repassword: {
		error: '两次密码不一致',
		error_empty: '密码不能为空',
		validate: function(val) {
			if (isEmpty(val)) return this.error_empty;
			if (val != check.password.storage) {
				return this.error;
			}
			return true;
		}
	},
	//取款密码
	bankpassword: {
		length: 6,
		storage: null,
		reg: /^([0-9]){6}$/,
		error: '取款密码为6个数字组合',
		error_empty: '密码不能为空',
		validate: function(val) {
			val = val.toString();
			if (isEmpty(val)) {
				return this.error_empty;
			}
			var validate = this.reg.test(trim(val));
			if (validate) {
				this.storage = val;
			}
			return validate ? true : this.error;
		}
	},
	//密码确认
	rebankpassword: {
		error: '两次密码不一致',
		error_empty: '密码不能为空',
		validate: function(val) {
			if (isEmpty(val)) return this.error_empty;
			if (val != check.bankpassword.storage) {
				return this.error;
			}
			return true;
		}
	},
	//电话号码
	phone: {
		reg: /^1[34578]{1}[0-9]{9}$/,
		error: '手机号格式错误',
		error_empty: '手机号不能为空',
		error_number: '手机号为11位，请重新输入',
		validate: function(val) {
			val = String(val);
			if (isEmpty(val)) return this.error_empty;
			if (val.length < 11) return this.error_number;
			var validate = this.reg.test(val);
			return validate ? true : this.error;
		}
	},
	//邮箱
	email: {
		reg: /[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
		error: '电子邮箱不正确',
		error_empty: '电子邮箱不能为空',
		validate: function(val) {
			if (isEmpty(val)) return this.error_empty;
			var validate = this.reg.test(val);
			return validate ? true : this.error;
		}
	},
	//QQ
	qq: {
		reg: /^[0-9]+$/,
		error: 'QQ格式错误',
		error_empty: 'QQ不能为空',
		validate: function(val) {
			if (isEmpty(val)) return true;
			var validate = this.reg.test(trim(val));
			return validate ? true : this.error;
		}
	},
	//验证码
	code: {
		reg: /^([a-zA-Z0-9]){4,6}$/,
		error: '验证码错误',
		error_empty: '验证码不能为空',
		validate: function(val) {
			if (isEmpty(val)) return this.error_empty;
			var validate = this.reg.test(trim(val));
			return validate ? true : this.error;
		}
	},
	//身份证
	identification: {
		reg: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$/,
		error: '身份证号码不正确',
		validate: function(val) {
			var validate = this.reg.test(trim(val));
			return validate ? true : this.error;
		}
	},
	//金额
	money: {
		reg: /^([1-9][\d]{0,7}|0)(\.[\d]{0,2})?$/,
		error: '输入的金额错误',
		error_empty: '金额不能为空',
		validate: function(val) {
			if (isEmpty(val)) return this.error_empty;
			var validate = this.reg.test(trim(val));
			return validate ? true : this.error;
		}
	},
	//数字
	integer: {
		reg: /^\d+$/,
		error: '请输入数字',
		validate: function(val) {
			var validate = this.reg.test(trim(val));
			return validate ? true : this.error;
		}
	},
	//日期验证
	dateValidation: {
		error: '日期不正确',
		error_empty: '日期不能为空',
		reg: /^(?:(?!0000)[0-9]{4}([-/._,])(?:(?:0?[1-9]|1[0-2])([-/._,])(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])([-/._,])(?:29|30)|(?:0?[13578]|1[02])([-/._,])31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/._,])0?2([-/._,])29)$/,
		validate: function(val) {
			val = val.toString();
			if (isEmpty(val)) return this.error_empty;
			var validate = this.reg.test(trim(val));
			return validate ? true : this.error;
		}
	}
};

//时间转换成日期格式 new Date().format("YYYY/MM/DD hh:mm:ss.SSS 星期d")
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDay(),
		"D+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S+": this.getMilliseconds()
	};
	var day = ["日", "一", "二", "三", "四", "五", "六"];
	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			var value = RegExp.$1.length;
			switch (value) {
				case 1:
					format = format.replace(RegExp.$1, day[o[k]]);
					break;
				case 2:
					format = format.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length));
					break;
				case 3:
					format = format.replace(RegExp.$1, ("000" + o[k]).substr(("" + o[k]).length));
					break;
			}
		}
	}
	return format;
};

//指定日期格式转换为标准时间 new Date().getNormal("2016/04/11 17:21:30.125")
Date.prototype.getNormal = function(dateString) {
	dateString = dateString.toString().replace(/[-/._:\s]/g, ",").split(",");
	var Y = dateString[0],
		M = dateString[1] - 1,
		D = dateString[2],
		h = dateString[3] || 0,
		m = dateString[4] || 0,
		s = dateString[5] || 0,
		S = dateString[6] || 0;
	return new Date(Y, M, D, h, m, s, S);
};

//时间加指定天数new Date().addDays(3).format("YYYY/MM/DD hh:mm:ss")
Date.prototype.addDays = function(d) {
	var time = this.getTime() + d * 86400000;
	return new Date(time);
};

//时间加指定小时new Date().addHours(3).format("YYYY/MM/DD hh:mm:ss")
Date.prototype.addHours = function(h) {
	var time = this.getTime() + h * 3600000;
	return new Date(time);
};

//时间加指定分钟new Date().addMinutes(30).format("YYYY/MM/DD hh:mm:ss")
Date.prototype.addMinutes = function(m) {
	var time = this.getTime() + m * 60000;
	return new Date(time);
};

//时间加指定秒new Date().addSeconds(30).format("YYYY/MM/DD hh:mm:ss")
Date.prototype.addSeconds = function(s) {
	var time = this.getTime() + s * 1000;
	return new Date(time);
};

//时间加指定 天数,时,分,秒 new Date().addTimes(3,2,30,25).format("YYYY/MM/DD hh:mm:ss")
Date.prototype.addTimes = function(d, h, m, s) {
	var time = this.getTime() + d * 86400000 + h * 3600000 + m * 60000 + s * 1000;
	return new Date(time);
};

//时间差 new Date().timeDifference("2016-4-8 17:30:25.125")或者new Date().timeDifference("1460369336608")
Date.prototype.timeDifference = function(specifiedDate) {
	var nowTime = new Date().getTime(),
		specifiedtime = Number(specifiedDate) > 0 ? Number(specifiedDate) : new Date().getNormal(specifiedDate).getTime(),
		differ = nowTime - specifiedtime,
		difference = Math.floor(Math.abs(differ) / 1000),
		daysTime = Math.floor(difference / 86400),
		hoursTime = Math.floor(difference / 3600 - daysTime * 24),
		minutesTime = Math.floor(difference / 60 - hoursTime * 60 - daysTime * 24 * 60),
		secondsTime = difference % 60;
	if (differ > 0) {
		if (daysTime >= 7) {
			return (Number(specifiedDate) > 0 ? new Date(Number(specifiedDate)).format("YYYY-MM-DD") : new Date().getNormal(specifiedDate).format("YYYY-MM-DD"));
		} else if (daysTime > 0) {
			return daysTime + "天前";
		} else {
			if (hoursTime > 0) {
				return hoursTime + "小时前";
			} else {
				if (minutesTime > 0) {
					return minutesTime + "分钟前";
				} else {
					return "刚刚";
				}
			}
		}
	} else {
		return (Number(specifiedDate) > 0 ? new Date(Number(specifiedDate)).format("YYYY-MM-DD") : new Date().getNormal(specifiedDate).format("YYYY-MM-DD"));
	}
};

//获取本周的第一天（周日）时间
function firstDay() {
	var today = new Date();
	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);
	return new Date(today.getTime() - today.getDay() * 86400000);
}

//ajax请求
function Ajax(url, data, doSuccess, doError, doBefore, doComplete, type, dataType) {
	if (typeof doBefore !== "function") {
		doBefore = function() {};
	}
	if (typeof doSuccess !== "function") {
		doSuccess = function() {};
	}
	if (typeof doError !== "function") {
		doError = function() {};
	}
	if (typeof doComplete !== "function") {
		doComplete = function() {};
	}
	if (!type) {
		type = "post";
	}
	if (!dataType) {
		dataType = "json";
	}
	$.ajax({
		url: url,
		data: data,
		dataType: dataType,
		type: type,
		beforeSend: doBefore,
		complete: doComplete
	}).then(doSuccess, doError);
}

//弹出框
function ShortTips(text, second) {
	var html = '<div class="tips"><div class="single"></div></div>';
	$("body").append(html);
	$(".single").text(text);
	var w = $(window).width(),
		ew = $(".tips").width();
	$(".tips").css({
		"left": (w - ew) / 2,
		"opacity": 1
	});
	setTimeout(function() {
		$(".tips").animate({
			opacity: 0
		}, 500, function() {
			$(this).remove();
		})
	}, second || 2000);
}

//placeholder功能兼容IE9以下
function PlaceHolder() {
	var holders = this.holders = $("input[placeholder!='']");
	this.hasInput = [];
	this.holdColor = [];
	this.inputColor = [];
	for (var i = 0, l = holders.length; i < l; i++) {
		this.hasInput[i] = false;
		this.holdColor[i] = '#aaa';
		this.inputColor[i] = $(holders[i]).css("color");
		$(this.holders[i]).attr("data-index", i);
	}
};

PlaceHolder.prototype.start = function() {
	if (this.hasPlaceholderSupport()) {
		return;
	}
	var me = this;
	me.holders.on("focus", function(e) {
		$target = $(e.target);
		var index = $target.attr("data-index");
		if (!me.hasInput[index]) {
			me.hasInput[index] = true;
			$target.val("").css("color", me.inputColor[index]);
		}
	});

	me.holders.on("blur", function(e) {
		$target = $(e.target);
		var index = $target.attr("data-index");
		if ($target.val() == "") {
			me.hasInput[index] = false;
			$target.val($target.attr("placeholder")).css("color", me.holdColor[index]);
		}
	});
	$("input[placeholder!='']").blur();
};

PlaceHolder.prototype.hasPlaceholderSupport = function() {
	var attr = "placeholder";
	var input = document.createElement("input");
	return attr in input;
};

PlaceHolder.prototype.stop = function() {
	$("input[placeholder!='']").off();
};

var placeHolder = new PlaceHolder();
placeHolder.stop();
placeHolder.start();
//监听鼠标滚轮事件
/*
 addEvent(document, "mousewheel", function(event) {
	if (event.delta < 0) {
		console.log("向下滚动了");
	}
});
 * */
var addEvent = (function(window, undefined) {
	var _eventCompat = function(event) {
		var type = event.type;
		if (type == 'DOMMouseScroll' || type == 'mousewheel') {
			event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
		}
		//alert(event.delta);
		if (event.srcElement && !event.target) {
			event.target = event.srcElement;
		}
		if (!event.preventDefault && event.returnValue !== undefined) {
			event.preventDefault = function() {
				event.returnValue = false;
			};
		}
		return event;
	};
	if (window.addEventListener) {
		return function(el, type, fn, capture) {
			if (type === "mousewheel" && document.mozHidden !== undefined) {
				type = "DOMMouseScroll";
			}
			el.addEventListener(type, function(event) {
				fn.call(this, _eventCompat(event));
			}, capture || false);
		}
	} else if (window.attachEvent) {
		return function(el, type, fn, capture) {
			el.attachEvent("on" + type, function(event) {
				event = event || window.event;
				fn.call(el, _eventCompat(event));
			});
		}
	}
	return function() {};
})(window);

//动态加载js文件
// eg:loadScript("file1.js",function(){
// 		loadScript("file2.js",function(){
// 			alert("file is loaded!");
// 		})
// 	});
function loadScript(url,callback){
	var script=document.createElement("script");
	script.type="text/javascript";
	if (script.readyState) {//IE
		script.onreadystatechange=function() {
			if (script.readyState==="load"||script.readyState==="complete") {
				script.onreadystatechange=null;
				callback();
			}
		}
	}else{//其他浏览器
		script.onload=function() {
			callback();
		}
	}
	script.src=url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

//防抖函数
function debounce(func,wait,immediate){
	var timeout;
	return function(){
		var context = this, args = arguments;
		var later = function(){
			timeout = null;
			if(!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later,wait);
		if(callNow) func.apply(context,args);
	};
}

//节流函数
function throttle(func,wait,mustRun){
	var timeout, startTime = new Date();
	return function(){
		var content = this, args = arguments,curTime = new Date();
		clearTimeout(timeout);
		if(curTime - startTime >= mustRun){
			func.apply(context,args);
			startTime = curTime;
		}else{
			timeout = setTimeout(func,wait);
		}
	};
}