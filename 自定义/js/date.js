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

//指定日期格式转换为标准时间new Date().getNormal("2016/04/11 17:21:30.125")
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
	var time = this.getTime() - 0 + d * 86400000;
	return new Date(time);
};

//时间加指定小时new Date().addHours(3).format("YYYY/MM/DD hh:mm:ss")
Date.prototype.addHours = function(h) {
	var time = this.getTime() - 0 + h * 3600000;
	return new Date(time);
};

//时间加指定分钟new Date().addMinutes(30).format("YYYY/MM/DD hh:mm:ss")
Date.prototype.addMinutes = function(m) {
	var time = this.getTime() - 0 + m * 60000;
	return new Date(time);
};

//时间加指定秒new Date().addSeconds(30).format("YYYY/MM/DD hh:mm:ss")
Date.prototype.addSeconds = function(s) {
	var time = this.getTime() - 0 + s * 1000;
	return new Date(time);
};

//时间加指定 天数,时,分,秒 new Date().addTimes(3,2,30,25).format("YYYY/MM/DD hh:mm:ss")
Date.prototype.addTimes = function(d, h, m, s) {
	var time = this.getTime() - 0 + d * 86400000 + h * 3600000 + m * 60000 + s * 1000;
	return new Date(time);
};

//时间差 new Date().timeDifference("2016-4-8 17:30:25") 
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
			return (Number(specifiedDate) > 0 ? new Date(Number(specifiedDate)) : new Date().getNormal(specifiedDate).format("YYYY-MM-DD"));
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
		return (Number(specifiedDate) > 0 ? new Date(Number(specifiedDate)) : new Date().getNormal(specifiedDate).format("YYYY-MM-DD"));
	}
};