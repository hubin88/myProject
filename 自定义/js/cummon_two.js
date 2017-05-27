!(function() {
	var P = null;
	var check = {
		user: {
			min: 4,
			max: 12,
			reg: /^([a-zA-Z0-9]){4,12}$/,
			reg1: /^[\u4e00-\u9fa5]{2,10}$/,
			error_empty: '用户名不能为空',
			error: '用户名不正确',
			error_min: function() {
				return '用户名最少' + this.min + '个字符';
			},
			error_max: function() {
				return '用户名最多' + this.max + '个字符';
			},
			validate: function(val) {
				if (val == '') {
					return this.error_empty;
				}
				if (val.length < this.min) {
					return this.error_min();
				}
				if (val.length > this.max) {
					return this.error_max();
				}
				var validate = this.reg.test(val);
				var validate1 = this.reg1.test($.trim(val));
				return !validate && !validate1 ? this.error : true;
			}
		},
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
				if (val == '') {
					return this.error_empty;
				}
				if (val.length < this.min) {
					return this.error_min();
				}
				if (val.length > this.max) {
					return this.error_max();
				}
				var validate = this.reg.test($.trim(val));
				return !validate ? this.error : true;
			}
		},
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
				if (val == '') {
					return this.error_empty;
				}
				if (val.length < this.min) {
					return this.error_min();
				}
				if (val.length > this.max) {
					return this.error_max();
				}
				var validate = this.reg.test($.trim(val));
				return validate ? true : this.error;
			}
		},
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
				if (val == '') {
					return this.error_empty;
				}
				if (val.length < this.min) {
					return this.error_min();
				}
				if (val.length > this.max) {
					return this.error_max();
				}
				var validate = this.reg.test($.trim(val));
				if (validate) {
					this.storage = val;
				}
				return validate ? true : this.error;
			}
		},
		password2: {
			error: '两次密码不一致',
			validate: function(val) {
				if (val == '') return check.password.error_empty;
				if (val != check.password.storage) {
					return check.password2.error;
				}
				return true;
			}
		},
		phone: {
			reg: /^1[34578]{1}[0-9]{9}$/,
			error: '手机号格式错误',
			error_empty: '手机号不能为空',
			error_2: '手机号为11位，请重新输入',
			validate: function(val) {
				val = String(val);
				if (val == '') return this.error_empty;
				if (val.length < 11) return this.error_2;
				var validate = this.reg.test(val);
				return validate ? true : this.error;
			}
		},
		name: {
			reg: /^[\u4e00-\u9fa5]{2,10}$/,
			error: '姓名只能输入汉字',
			error2: '姓名为2-10个汉字',
			validate: function(val) {
				val = String(val);
				if (val.length < 2 || val.length > 10) return this.error2;
				var validate = this.reg.test($.trim(val));
				return validate ? true : this.error;
			}
		},
		email: {
			reg: /[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
			error: '电子邮箱不正确',
			error_empty: '电子邮箱不能为空',
			validate: function(val) {
				if (val == '') return this.error_empty;
				var validate = this.reg.test(val);
				return validate ? true : this.error;
			}
		},
		qq: {
			reg: /^[0-9]+$/,
			error: 'QQ格式错误',
			error_empty: 'QQ不能为空',
			validate: function(val) {
				if (val == '') return true;
				var validate = this.reg.test($.trim(val));
				return validate ? true : this.error;
			}
		},
		emailphone: {
			empty: '手机号不能为空',
			error: '手机号/邮箱格式错误',
			validate: function(val) {
				var validate = false;
				if (val == '') {
					return this.empty;
				} else if (check.email.reg.test($.trim(val)) || check.phone.reg.test($.trim(val))) {
					return true;
				}
				return this.error;
			}
		},
		smsverify: {
			reg: /^([a-zA-Z0-9]){4,6}$/,
			error: '验证码错误',
			validate: function(val) {
				var validate = this.reg.test($.trim(val));
				return validate ? true : this.error;
			}
		},
		verify: {
			reg: /^([a-zA-Z0-9]){4,6}$/,
			error: '验证码错误',
			validate: function(val) {
				var validate = this.reg.test($.trim(val));
				return validate ? true : this.error;
			}
		},
		qverify: {
			reg: /^([a-zA-Z0-9]){4,7}$/,
			error: '确认码错误',
			error_empty: '确认码不能为空',
			validate: function(val) {
				if (val == '') return this.error_empty;
				var validate = this.reg.test($.trim(val));
				return validate ? true : this.error;
			}
		},
		mobileverify: {
			reg: /^\d+$/,
			error: '验证码错误',
			error_empty: '验证码不能为空',
			validate: function(val) {
				if (val == '') {
					return this.error_empty;
				}
				var validate = this.reg.test($.trim(val));
				return validate ? true : this.error;
			}
		},
		sfz: {
			reg: /^([a-zA-Z0-9]){15,18}$/,
			error: '身份证号码不正确',
			validate: function(val) {
				var validate = this.reg.test($.trim(val));
				return validate ? true : this.error;
			}
		},
		zjhm: {
			reg: /^([a-zA-Z0-9]){5,25}$/,
			error: '证件号码不正确',
			error_empty: '证件号码不能为空',
			validate: function(val) {
				if (val == '') return this.error_empty;
				var validate = this.reg.test($.trim(val));
				return validate ? true : this.error;
			}
		},
		notempty: {
			error: '不能为空',
			validate: function(val) {
				if (val == '') return this.error;
				return true;
			}
		},
		money: {
			reg: /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
			// reg : /^\d+(\.\d+)?$/,
			error: '输入的金额错误',
			error_empty: '金额不能为空',
			validate: function(val) {
				var validate = this.reg.test($.trim(val));
				return validate ? true : this.error;
			}
		},

		drawmoney: {
			reg: /^([1-9][\d]{0,7}|0)?$/,
			// reg : /^\d+(\.\d+)?$/,
			error: '必须是正整数！',
			error_empty: '金额不能为空',
			validate: function(val) {
				var validate = this.reg.test($.trim(val));
				return validate ? true : this.error;
			}
		},

		integer: {
			reg: /^\d+$/,
			error: '请输入数字',
			validate: function(val) {
				var validate = this.reg.test($.trim(val));
				return validate ? true : this.error;
			}
		},
		passold: {
			length: 6,
			storage: null,
			reg: /^([0-9]){6}$/,
			error: '取款密码为6个数字组合',
			validate: function(val) {
				val = val.toString();
				if (val == '') {
					return this.error;
				}
				var validate = this.reg.test($.trim(val));
				if (validate) {
					this.storage = val;
				}
				return validate ? true : this.error;
			}
		},
		pass: {
			length: 6,
			storage: null,
			reg: /^([0-9]){6}$/,
			error: '取款密码为6个数字组合',
			validate: function(val) {
				val = val.toString();
				if (val == '') {
					return this.error;
				}
				var validate = this.reg.test($.trim(val));
				if (validate) {
					this.storage = val;
				}
				return validate ? true : this.error;
			}
		},
		pass2: {
			error: '两次密码不一致',
			validate: function(val) {
				if (val == '') return check.pass.error;
				if (val != check.pass.storage) {
					return this.error;
				}
				return true;
			}
		},
		bankname: {
			error: '银行名称不正确',
			validate: function(val) {
				if (val.toString().length < 2) return this.error;
				return true;
			}
		},
		bank: {
			error: '银行帐号不正确',
			error_empty: '银行帐号不能为空',
			validate: function(val) {
				if (val == '') return this.error_empty;
				if (val.toString().length < 2) return this.error;
				return true;
			}
		},
		branch: {
			error: '开户支行不正确',
			validate: function(val) {
				if (val.toString().length < 2) return this.error;
				return true;
			}
		},
		address: {
			error: '联系地址不正确',
			error_empty: '联系地址不能为空',
			validate: function(val) {
				if (val == '') return this.error_empty;
				if (val.toString().length < 2) return this.error;
				return true;
			}
		},
		bank_address: {
			error: '收款银行地址不正确',
			error_empty: '银行地址不能为空',
			validate: function(val) {
				if (val == '') return this.error_empty;
				if (val.toString().length < 2) return this.error;
				return true;
			}
		},
		account: {
			error: '交易账号为8位数字',
			error_empty: '交易账号不能为空',
			reg: /\d{8}/,
			validate: function(val) {
				if (val == '') return this.error_empty;
				var validate = this.reg.test($.trim(val));
				return validate ? true : this.error;
			}
		},
	};
	
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
	};

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
	};
	/**
	 * Quniter
	 * FormsCheck 表单验证
	 * Ajax 回调用法，PHP返回规则
	 * array(
	 * 		'status'=>1,               //状态：1验证成功， 跳转到jumpurl
	 * 	 	'jumpurl' => '/user/index'
	 * 	 	'msg'=>'用户名错误',       //错误消息提示
	 * 	 	'name' => 'user',          //指向input，这里的user指向input的class为forms-user
	 * 	);
	 */

	function FormsCheck(form, setting) {
		this.oParents = $(form || '#myform');
		this.options = $.extend({
			callback: function() {},
			enterCallback: function() {},
			resetCallback: function() {},
			onblur: true,
			hintTxt: true
		}, setting);
		this.run();
	}

	FormsCheck.prototype = {
		isSubmit: false,
		run: function() {
			if (!this.oParents[0]) return;
			this.oBtnSubmit = this.oParents.find('.form-submit');
			this.submitType = 'ajax';
			if (!this.ajaxUrl) {
				this.ajaxUrl = this.oParents.attr('action');
			}
			if (this.oBtnSubmit.hasClass('is-submit')) {
				this.submitType = 'submit';
			}
			this.init();
		},
		init: function() {
			var _this = this;
			this.allInput = $('input[class*=forms-]', this.oParents);
			this.data = this.oParents.data();

			this.oBtnSubmit.click(function() {
				_this.inputVerify();
				return false;
			});

			this.oParents.submit(function() {
				_this.inputVerify();
				return false;
			});

			this.allInput.each(function() {
				var $this = $(this);
				var name = _this.getName(this);
				var data = $this.data();
				if (data) {
					for (var key in data) {
						check[name][key] = data[key];
					}
				}
				if (data.place) {
					_this.togglePlace($this, data.place);
				}
				_this.inputBlur($this);
			});
		},
		inputVerify: function() {
			if (this.allInput.length <= 0) return false;

			var _this = this;
			this.allInput.each(function() {
				var self = $(this),
					data = _this._validate(self);
				if (data.type == true) {
					_this.isSubmit = true;
				} else {
					_this.isSubmit = false;
					_this.htmlHintHandel(self, data);
					return false;
				}
			});
			if (!this.isSubmit) return false;
			/* 按钮提交验证回调 */
			if (typeof this.options.validateSubmit == 'function') {
				var vs = this.options.validateSubmit(this);
				if (vs === true) this._submit();
				return;
			} else {
				this._submit();
			}
			this.oBtnSubmit.addClass('disabled');
			this.options.enterCallback.call(this);
		},
		_validate: function(self) {
			var name = this.getName(self),
				val = self.val(),
				data = {},
				selfdata = self.data(),
				checkobj = check[name],
				validateFunc = checkobj['validate'],
				validate;
			if (name == 'submit') {
				data.type = true;
				return data;
			}
			if (val == '' && checkobj.error_empty) {
				data.type = false;
				data.html = checkobj.error_empty;
				return data;
			}
			if ((selfdata.min && val < selfdata.min) || (selfdata.max && val > selfdata.max)) {
				data.type = false;
				data.html = selfdata.hint;
				return data;
			}

			if (validateFunc) {
				validate = validateFunc.call(checkobj, val);
			} else {
				return alert(name + '不存在validate函数');
			}

			if (validate === true) {
				data.type = true;
			} else {
				data.html = validate;
			}
			return data;
		},
		_submit: function() {
			if (this.oBtnSubmit.hasClass('disabled')) {
				return;
			}
			var _this = this;
			if (this.submitType == 'ajax') {
				$.ajax({
					url: _this.ajaxUrl,
					type: 'post',
					cache: false,
					dataType: 'json',
					data: this.oParents.serialize(),
					success: function(json) {
						_this.ajaxCallBack(json);
						_this.oBtnSubmit.removeClass('disabled');
						_this.options.resetCallback.call(_this, json);
					},
					error: function() {
						_this.oBtnSubmit.removeClass('disabled');
						_this.options.resetCallback.call(_this);
					}
				});
			} else if (this.submitType == 'submit') {
				this.oParents.submit();
			}
		},
		ajaxCallBack: function(json) {
			this.options.callback(json);
			window.FormsCallback && window.FormsCallback.call(this, json);
			if (this.data.success == 'alert' && json.status == 1) {
				var data = {};
				data.msg = json.message;
				if (this.data.reload) {
					data['enterCallback'] = function() {
						if (json.jumpurl) {
							window.location.href = json.jumpurl
						} else {
							window.location.reload();
						}
					}
				}
				P && P.alert(data);
				return;
			}

			if (typeof this.options.success == 'function')
				return this.options.success.call(this, json), !1;

			if (json.status == 1 && json.jumpurl)
				return window.location.href = json.jumpurl, !1;

			if (json.name != 'error') {
				var input = this.allInput.filter('.forms-' + json.name);
			} else {
				var input = this.oBtnSubmit;
			}
			var data = json;
			data.html = json.msg || json.message;
			data.type = json.status;
			this.htmlHintHandel(input, data);
		},
		inputBlur: function($obj) {
			var _this = this;
			if (!this.options.onblur) return false;
			$obj.unbind('blur').bind('blur', function() {
				var self = $(this),
					data = _this._validate(self),
					url = self.data('url');
				data.isblur = false;
				if (url && data.type) {
					_this.inputAjax && _this.inputAjax.abort();
					_this.inputAjax = $.post(url, {
						values: self.val()
					}, function(json) {
						if (json.status == 1) {
							data.html = json.message || '输入正确';
							_this.htmlHintHandel(self, data, 1);
						} else {
							data.html = json.message || '输入错误';
							_this.htmlHintHandel(self, data, 0);
						}
					}, 'json');
				} else {
					_this.htmlHintHandel(self, data, data.type);
				}
			});
		},
		togglePlace: function($obj, place) {
			$obj.siblings(place).mousedown(function() {
				$obj.focus();
				return false;
			});
			$obj.keyup(function() {
				var $this = $(this);
				var toggle = $this.val() == '' ? 'show' : 'hide';
				$this.siblings(place)[toggle]();
			});
		},
		getName: function(self) {
			return $(self).attr('class').match(/(forms-)\w*/)[0].replace('forms-', '');
		},
		htmlHintHandel: function(self, data, type) {
			if (data.isblur !== false) self.focus();
			if (typeof this.options.getErrors == 'function') {
				this.options.getErrors(self, data);
				return false;
			}
			type ? this.showSuccess(self, data) : this.showError(self, data);
		},
		showError: function(obj, data) {
			var parent = obj.parent(),
				html;
			if (typeof data == 'object' && data.html) {
				html = data.html;
			}
			if (typeof data == 'string' && data != '') {
				html = data;
			}
			obj.siblings('.forms-success').remove();
			var oError = obj.siblings('.forms-error, .verify-hint');
			if (html && this.options.hintTxt !== null) {
				if (oError[0]) {
					oError.show().html(html);
				} else {
					oError = $('<span class="forms-hint forms-error">' + html + '</span>');
					obj.parent().append(oError);
				}
			}
			clearTimeout(obj.TIME);
			parent.removeClass('show-success').addClass('show-error');
			obj.TIME = setTimeout(function() {
				parent.removeClass('show-error');
				if (oError.data('ishide')) {
					oError.hide();
				} else {
					oError.remove();
				}
			}, 10000);
		},
		showSuccess: function(obj, data) {
			var html = '输入正确'
			if (typeof data == 'object' && data.html) {
				html = data.html;
			}
			if (typeof data == 'string') {
				html = data;
			}
			obj.siblings('.forms-error').remove();
			obj.parent().addClass('show-success').removeClass('show-error');
			if (obj.data('success')) {
				var oSuccess = obj.siblings('.forms-success, .verify-hint');
				if (oSuccess[0]) {
					oSuccess.show().addClass('forms-hint forms-success').html(html);
				} else {
					oSuccess = $('<span class="forms-hint forms-success">' + html + '</span>');
					obj.parent().append(oSuccess);
				}
			}
		}
	}

	if (typeof define == 'function') {
		define(function(require, exports, module) {
			P = require('P');
			module.exports = FormsCheck;
		});
	} else {
		window.FormsCheck = FormsCheck;
	}
})();

function getCode(self, type) {
	var $this = $(self);
	if ($this.hasClass('disabled')) return;
	var phone = $('#phone').val();
	var vcode = $('#qverify').val();
	var reg = /^13[0-9]{1}[0-9]{8}$|14[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$/;
	if (phone == '' || !reg.test(phone)) {
		$('#phone-error').addClass('forms-error').html('手机号格式错误！');
		setTimeout("removeError()", 2000);
		return false;
	}

	$.ajax({
		url: '/phonecode.html',
		type: 'post',
		cache: false,
		dataType: 'json',
		data: {
			phone: phone,
			type: type,
			vcode: vcode
		},
		success: function(data) {
			if (data.status == 1) {
				$('#' + data.name + '-error').addClass('Validform_right').html('验证码发送成功！');
				countDown();
				setTimeout("removeError()", 2000);
			} else {
				$('#' + data.name + '-error').addClass('forms-error').html(data.msg);
				setTimeout("removeError()", 2000);
			}
		},
		error: function() {
			$('#phone-error').addClass('forms-error').html('发送失败，请联系在线客服！');
			setTimeout("removeError()", 2000);
		}
	});

	var total = 60;

	function countDown() {
		total--;
		if (total > 0) {
			$this.addClass('disabled').html(total + '秒后重新获取');
			setTimeout(countDown, 1000);
		} else {
			$this.removeClass('disabled').html('获取验证码');
		}
	}
}

function removeError() {
	$('#phone-error').removeClass('forms-error').html('');
	$('#qverify-error').removeClass('forms-error').html('');
	$('#verify-error').removeClass('Validform_right').html('');
}
var InterValObj; //timer变量，控制时间
var curCount = 60; //当前剩余秒数

function sendMobileCode() {
	if ($("#btnSendCode").hasClass('disabled')) return false;
	var vcode = $("#vcode").val();
	var phone = $("#phone").val();
	var phone_salt = $("#phone_salt").val();
	if (!phone) {
		$('#phone').focus();
		return false;
	}
	//设置button效果，开始计时
	$("#btnSendCode").attr("disabled", "true");
	//$("#btnSendCode").val("请在" + curCount + "秒内输入验证码");
	$("#btnSendCode").addClass('disabled').val(curCount + "秒后可再次获取");
	InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
	$.ajax({
		type: "GET", //用POST方式传输
		dataType: "JSON", //数据格式:JSON
		url: window.registerUrl, //目标地址
		data: "a=ajax&type=1&phone=" + phone + "&phone_salt=" + phone_salt + "&vcode=" + vcode, //传值，这里直接传了字符串
		success: function(json) { //console.log(json.status);return false;
			var dom = $('#hint-' + json.name);
			if (json.status == 1) {
				$('.verify-hint').hide();
				dom.show().html(json.message).attr('class', 'verify-hint verify-status1');
				return true;
			} else {
				dom.show().html(json.message).attr('class', 'verify-hint verify-status');
				setTimeout(function() {
					dom.hide();
				}, 10000);
				curCount = 60;
				window.clearInterval(InterValObj); //停止计时器
				$("#btnSendCode").removeAttr("disabled"); //启用按钮
				$("#btnSendCode").removeClass('disabled').val("重新发送验证码");
				return false;
			}
		}
	});
	return false;
}
//timer处理函数
function SetRemainTime() {
	if (curCount == 0) {
		curCount = 60;
		window.clearInterval(InterValObj); //停止计时器
		$("#btnSendCode").removeAttr("disabled"); //启用按钮
		$("#btnSendCode").removeClass('disabled').val("重新发送验证码");
	} else {
		curCount--;
		//$("#btnSendCode").val("请在" + curCount + "秒内输入验证码");
		$("#btnSendCode").val(curCount + "秒后可再次获取");
	}
}

// $('#btnSendCode').click(sendMobileCode);