var variable = {
	roomId: "", //房间ID
	index: 0, //房间序号
	queryMinRecordId: 0, //记录集的最小ID，历史记录
	noteMinRecordId: 0, //获取历史记录提问
	listNum: 10, //每次获取条数
	dateTime: 0, //选择日期查询
	tempTime: "", //临时存储所选的日期
	timeOne: "", //新消息定时器
	roomDatas: "", //直播间对象
	imgObj: "", //图片对象
	isUpLoadImg: true, //图片上传是否成功
	userID: "", //用户ID
	userHeadImg: "", //用户头像
	userName: "", //用户名
	userRoleName: "", //角色名
	enterRoomFlag: false, //是否进入房间
	isAnalyst: "", //是否是分析师
	isAnalystFlag: 2, //分析师标示
	isBrowse: false, //浏览权限
	isEdit: false, //编辑权限
	isRegister: false, //是否为注册登录用户
	isQuestionNote: false, //纸条提问权限
	questionID: "", //要回复的问题的ID
	questionName: "", //回复问题的提问者
	questionContent: "", //问题内容
	isReplyFlag: false, //是否是回复提问
	enlarge: "", //窗口变大
	allPermissions: "", //权限数据
	alertFlag: true, //弹出框
	textareaH: "", //文本框初始高度
	token: "", //登录token
	isHistory: false,
	isScroll: false,
	contentData: [] //存储内容的ID，用来比较是否需要刷新内容
};
//当天的时间戳
var today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);
//获取tokne
variable.token = getQueryString("token");
//维护token
setInterval(function() {
	Ajax(AppConfig.bing,
		JSON.stringify({
			"en": 0,
			"cmd": {
				"md": "01",
				"fc": "003",
				"token": variable.token
			}
		}),
		function(msg) {}
	);
}, 10 * 60 * 1000);

//调整分辨率
variable.enlarge = getQueryString("type");
if(variable.enlarge == "big") {
	$(".navbar .enter").css('display', 'none');
	$(".navbar .more").css('display', 'inline-block');
} else {
	$(".navbar .enter").css('display', 'inline-block');
	$(".navbar .more").css('display', 'none');
}
//更多
$(".navbar .more").on("click", function() {
	window.NativeOpenCfm("文字直播");
});
//获取用户信
Ajax(AppConfig.bing, JSON.stringify({
	"en": 0,
	"cmd": {
		"md": "01",
		"fc": "009",
		"token": variable.token
	}
}), function(msg) {
	variable.isAnalyst = msg.data.grouptype;
	variable.userID = msg.data.cid;
	variable.userHeadImg = msg.data.groupimg;
	variable.userName = msg.data.nickname;
	variable.userRoleName = msg.data.groupname;
	variable.isRegister = msg.data.isRegister;
	//直播间
	Ajax(AppConfig.bing, JSON.stringify({
			"en": 0,
			"cmd": {
				"md": "03",
				"fc": "001",
				"rstatus": 1,
				"token": variable.token
			}
		}),
		function(msg) {
			var roomData = msg.data;
			variable.roomDatas = roomData || [];
			//直播间名称展示
			addNav(roomData);
			variable.roomId = variable.roomDatas[0].rid;
			$(".nav li[data-rid='" + variable.roomId + "']").addClass("active");
			//查询列表
			queryList();
			setInterval(function() {
				queryList(variable.dateTime);
			}, AppConfig.time);
			if(variable.isAnalyst == variable.isAnalystFlag) {
				//打卡
				onLine();
				//接收提问
				getQuestions();
			} else {
				$(".operation .question").css('display', 'inline-block');
			}
			//获取权限 
			Ajax(AppConfig.bing, JSON.stringify({
					"en": 0,
					"cmd": {
						"md": "01",
						"fc": "012",
						"mdl": "03",
						"ptype": 2,
						"token": variable.token
					}
				}),
				function(msg) {
					var allPermissions = msg.data || [];
					variable.allPermissions = allPermissions;
					for(var i = 0, len = allPermissions.length; i < len; i++) {
						if(allPermissions[i].bindObjId == variable.roomId && allPermissions[i].funcode == "001" && allPermissions[i].hasfun == 1) {
							variable.isBrowse = true;
						}
						if(allPermissions[i].bindObjId == variable.roomId && allPermissions[i].funcode == "002" && allPermissions[i].hasfun == 1) {
							variable.isEdit = true;
						}
						if(allPermissions[i].bindObjId == variable.roomId && allPermissions[i].funcode == "003" && allPermissions[i].hasfun == 1) {
							variable.isQuestionNote = true;
						}
					}
					//直播间切换
					$(".navbar>.nav").on("click", "li.list", function() {
						var that = $(this);
						variable.alertFlag = true;
						variable.isScroll = false;
						if(variable.isAnalyst == variable.isAnalystFlag) { //工作人员默认有所有直播间的浏览权限
							clearTimeout(variable.timeOne);
							variable.isEdit = false;
							variable.index = $(this).index();
							variable.roomId = $(this).attr("data-rid");
							$(this).addClass("active").siblings().removeClass("active");
							getQuestions();
							//查询列表
							queryList();
							for(var i = 0, len = allPermissions.length; i < len; i++) {
								if(allPermissions[i].bindObjId == variable.roomId && allPermissions[i].funcode == "002" && allPermissions[i].hasfun == 1) {
									variable.isEdit = true; //判断编辑权限
								}
							}
						} else {
							variable.isBrowse = false;
							for(var i = 0, len = allPermissions.length; i < len; i++) {
								if(allPermissions[i].bindObjId == $(this).attr("data-rid") && allPermissions[i].funcode == "001" && allPermissions[i].hasfun == 1) {
									variable.isBrowse = true; //判断用户的浏览权限
								}
							}
							if(variable.isBrowse) { //拥有浏览权限的用户可以切换直播间
								variable.isQuestionNote = false;
								for(var i = 0, len = allPermissions.length; i < len; i++) {
									if(allPermissions[i].bindObjId == $(this).attr("data-rid") && allPermissions[i].funcode == "003" && allPermissions[i].hasfun == 1) {
										variable.isQuestionNote = true;
									}
								}
								variable.index = $(this).index();
								variable.roomId = $(this).attr("data-rid");
								$(this).addClass("active").siblings().removeClass("active");
								//查询列表
								queryList();
							} else { //无浏览权限的用户弹出图片提示
								var funID = "";
								for(var i = 0, len = allPermissions.length; i < len; i++) {
									if(allPermissions[i].bindObjId == $(this).attr("data-rid") && allPermissions[i].funcode == "001" && allPermissions[i].hasfun == 0) {
										funID = allPermissions[i].funid; //通过此id来查找对应的提示图片
									}
								}
								//无权限
								Ajax(AppConfig.bing, JSON.stringify({
									"en": 0,
									"cmd": {
										"md": "01",
										"fc": "013",
										"mdl": "03",
										"token": variable.token
									}
								}), function(msg) {
									var noPermissions = msg.data || [];
									noPermissionsFun(noPermissions, funID); //图片提示方法
								});
							}
						}
					});
				});
		});
});
//点赞
$(".content").on("click", ".zan", function() {
	if(!variable.isRegister) { //游客不能点赞
		$.dialog({
			title: '系统提示',
			content: '游客不能点赞哦，请先登录！',
			ok: function() {
				window.ReLoginPC();
			},
			cancel: function() {
				return "";
			}
		});
		return false;
	}
	var $this = $(this),
		id = $this.parents("li").attr("data-id"),
		num = Number($this.siblings(".num").text());
	if(getCookie(id)) { //判断是否已经点过赞了
		if($("#live-text").prev("div").css("visibility") == "visible") {
			return false;
		}
		$.dialog({
			title: '系统提示',
			content: '您已经点过赞啦！',
			time: 2000
		});
	} else {
		Ajax(
			AppConfig.URL, {
				Function: AppConfig.functionID.Likes,
				RecordID: id
			},
			function(msg) {
				var flag = msg.Data.IsOK;
				if(flag) {
					$this.siblings(".num").text(num + 1);
					setCookie(id, true);
				}
			}
		);
	}
});
//分辨率改变要重新计算页面的高度
$(window).resize(function() {
	getListHeight();
	getBoxPosition();
	$(".content .list").mCustomScrollbar("scrollTo", "bottom");
});
//滚动条，加载更多
$(".content .list").mCustomScrollbar({
	scrollInertia: 500, //缓冲时间
	autoDraggerLength: true,
	scrollButtons: {
		enable: true,
		scrollType: "continuous"
	},
	callbacks: {
		onTotalScrollBack: function() { //滚动条到最顶端事件
			variable.queryMinRecordId = $(".media-list>.media").first().attr("data-id");
			history(variable.queryMinRecordId); //查询历史消息
		},
		whileScrolling: function() {
			variable.isScroll = true;
		},
		onTotalScroll: function() {
			variable.isScroll = false;
			variable.isHistory = false;
		}
	}
});
//纸条提问
$(".navbar .question").click(function() {
	if(!variable.isQuestionNote) { //无纸条提问权限的用户弹出提示图片
		var funID = "";
		for(var i = 0, len = variable.allPermissions.length; i < len; i++) {
			if(variable.allPermissions[i].bindObjId == variable.roomId && variable.allPermissions[i].funcode == "003" && variable.allPermissions[i].hasfun == 0) {
				funID = variable.allPermissions[i].funid;
			}
		}
		//无权限
		Ajax(AppConfig.bing, JSON.stringify({
			"en": 0,
			"cmd": {
				"md": "01",
				"fc": "013",
				"mdl": "03",
				"token": variable.token
			}
		}), function(msg) {
			var noPermissions = msg.data || [];
			noPermissionsFun(noPermissions, funID);
		});
		return false;
	}
	Ajax(
		AppConfig.URL, {
			Function: AppConfig.functionID.OnlineAnalysts,
			SignID: 1002
		},
		function(msg) {
			var analyst = msg.Data.Users;
			if(analyst.length < 1) { //判断是否有分析师在线
				if($("#live-text").prev("div").css("visibility") == "visible") {
					return false;
				}
				$.dialog({
					title: '系统提示',
					content: '当前暂无分析师在线，过会再来吧！',
					time: 2000
				});
				return false;
			}
			var str = '<span class="closed">X</span>' +
				'<div class="title">纸条提问</div>' +
				'<div class="noteQuestion">' +
				'<div class="onlineAnalyst">' +
				'<span>请选择在线分析师：</span>' +
				'<div class="dropdown">' +
				'<button class="dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown"><span class="people">请选择</span><span class="downArrow"></span></button>' +
				'<ul class="dropdown-menu analyst" role="menu" aria-labelledby="dropdownMenu"></ul>' +
				'</div>' +
				'<div class="problem">' +
				'<div class="tijiao">' +
				'<span>请输入您的问题：</span>' +
				'</div>' +
				'<div class="text">' +
				'<textarea id="ask" maxlength="200"></textarea>' +
				'<span class="remaining">200字</span>' +
				'<input type="submit" id="submitAsk" value="提交" />' +
				'</div>' +
				'</div>' +
				'</div>';
			if(variable.enlarge == "big") {
				$(".pop-box").addClass("small");
			} else {
				$(".pop-box").removeClass("small");
			}
			$(".pop-box").show().html(str);
			getBoxPosition(); //弹出层居中显示
			$(".pop-box .closed,.navbar,.content").click(function() { //关闭弹出层
				$(".pop-box").hide();
			});
			var analystid = "";
			$.each(analyst, function(i, v) { //分析师列表
				$(".pop-box .analyst").append('<li data-analystid="' + v.UserID + '"><a href="javascript:;">' + v.UserName + '</a></li>');
			});
			$("ul.dropdown-menu>li").hover(function() {
				$(this).addClass("active").siblings().removeClass("active");
			});
			$("ul.dropdown-menu>li").click(function() { //选择分析师
				var $this = $(this);
				analystid = $this.attr("data-analystid");
				$("#dropdownMenu .people").text($this.text()).attr("data-chosed", true);
			});
			$(".pop-box textarea").on('input propertychange', function() { //文本框输入字数
				var len = $(this).val().length;
				$(".pop-box .remaining").html((200 - len) + "字");
			});
			$("#submitAsk").click(function() { //提交提问以及验证
				if($("#live-text").prev("div").css("visibility") == "visible") {
					return false;
				}
				if(!$("#dropdownMenu .people").attr("data-chosed")) {
					$.dialog({
						title: '系统提示',
						content: '请在在线分析师中选择提问对象！',
						time: 2000
					});
					return false;
				}
				if(isEmpty($(".pop-box textarea").val())) {
					$.dialog({
						title: '系统提示',
						content: '提问内容不能为空哦！',
						time: 2000
					});
					return false;
				}
				if(/<[^>]*>/.test($(".pop-box textarea").val())) {
					$.dialog({
						title: '系统提示',
						content: '输入内容不合规范，请修改后重新提交！',
						time: 2000
					});
					return false;
				}
				Ajax(
					AppConfig.URL, {
						Function: AppConfig.functionID.QuestionsToAsk,
						AnalystID: analystid,
						RoomID: variable.roomId,
						QuestionName: variable.userName,
						QuestionContent: trim($(".pop-box textarea").val())
					},
					function(msg) {
						var flag = msg.Data.IsOK;
						if(flag) {
							$(".pop-box").hide();
							$.dialog({
								title: '系统提示',
								content: '提交成功！',
								time: 2000
							});
						}
					}
				);
			});
		}
	);

});
//进入聊天室
$(".navbar .enter").on("click", function() {
	variable.enterRoomFlag = true;
	$(this).hide();
	$(".navbar").find(".nav").html("<ul><span class=\"back\">返回</span><li class=\"addcolor addCursor\">" + variable.roomDatas[variable.index].rname + "</li></ul>").end().find(".date-time").css("display", "inline-block");
	variable.tempTime = variable.dateTime;
	//选择今天
	$("#today").click(function() { //选择日期是今天，显示最新10条直播
		variable.isScroll = false;
		variable.alertFlag = true;
		variable.dateTime = 0;
		queryList();
	});
	$("#datetime-local").hover(function() {
		$("#chose-date").css({
			background: "#E6AF41",
			color: "#fff"
		});
	}, function() {
		$("#chose-date").css({
			background: "transparent",
			color: "inherit"
		});
	});
	//选择日期
	$("#datetime-local").datepicker({
		dateFormat: "yy-mm-dd",
		maxDate: "0"
	});
	$("#datetime-local").change(function() {
		variable.isScroll = false;
		variable.alertFlag = true;
		variable.dateTime = $(this).val();
		if(!isEmpty(variable.dateTime)) {
			if(variable.dateTime == new Date().format("YYYY-MM-DD")) { //选择日期是今天，显示最新10条直播
				variable.dateTime = 0;
				queryList();
			} else {
				queryList(variable.dateTime, "该日期无直播内容，请重新选择！");
			}
		}
	});
	if(variable.isEdit) { //有编辑权限的工作人员显示可操作控件
		$(".content .comments-box,.content .delete").removeClass("hide");
		getListHeight(); //计算直播内容高度
		variable.textareaH = $(".content .text textarea").height();
		$(".content .list").mCustomScrollbar("scrollTo", "bottom");
		$(".content .media-list").off().on("click", ".delete", function() { //删除某条直播
			var $this = $(this),
				id = $this.parents("li").attr("data-id");
			if($("#live-text").prev("div").css("visibility") == "visible") {
				return false;
			}
			$.dialog({
				title: '系统提示',
				content: '您确定删除吗!',
				ok: function() {
					Ajax(
						AppConfig.URL, {
							Function: AppConfig.functionID.DeleteLiveContent,
							RecordID: id
						},
						function(msg) {
							var flag = msg.Data.IsOK;
							if(flag) {
								$this.parents("li").remove();
							}
						}
					);
				},
				cancel: function() {
					return "";
				}
			});
		});
		//字体
		$(".content .font").click(function() {
			$(".face-panel").hide();
			$(".font-panel").toggle();
		});
		//绑定选择字体事件
		$(".font-family").change(function() {
			var font = $(this).val();
			$(".content textarea").css({
				"font-family": font
			});
		});
		//绑定选择字体大小事件
		$(".font-size").change(function() {
			var font = $(this).val();
			$(".content textarea").css({
				"font-size": font + "px"
			});
		});
		//绑定设置字体加粗事件
		$(".font-weight,.font-xieti").click(function() {
			var fontWeight = "",
				fontStyle = "";
			if($(this).is(".font-weight")) {
				if($(".content textarea").css("font-weight") == "bold") {
					fontWeight = "normal";
					$(this).css("font-weight", "normal");
				} else {
					fontWeight = "bold";
					$(this).css("font-weight", "bold");
				}
				$(".content textarea").css({
					"font-weight": fontWeight
				});
			} else if($(this).is(".font-xieti")) {
				if($(".content textarea").css("font-style") == "italic") {
					fontStyle = "normal";
					$(this).css("font-style", "normal");
				} else {
					fontStyle = "italic";
					$(this).css("font-style", "italic");
				}
				$(".content textarea").css({
					"font-style": fontStyle
				});
			}
		});
		$(".content textarea").focus(function() {
			$(".font-panel").hide();
			$(".face-panel").hide();
		});
		//表情
		$(".content .face").qqFace({
			id: 'facebox', //表情盒子的ID
			assign: 'textarea', //给那个控件赋值
			path: 'Images/face/' //表情存放的路径
		});
		$(".content .face").click(function() {
			$(".font-panel").hide();
		});
		//图片
		var uploader = WebUploader.create({
			auto: true,
			runtimeOrder: "flash",
			formData: {
				Function: AppConfig.functionID.UploadImg
			},
			swf: "Js/Uploader.swf",
			server: AppConfig.URL,
			pick: {
				id: ".picture",
				innerHTML: "图片"
			},
			fileNumLimit: 1,
			fileSizeLimit: 2097152,
			fileSingleSizeLimit: 2097152,
			accept: {
				title: 'Images',
				extensions: 'gif,jpg,png',
				mimeTypes: 'image/*'
			},
			compress: {
				noCompressIfLarger: true,
				compressSize: 800 * 1024
			}
		});
		uploader.on('beforeFileQueued', function(file) {
			if(!variable.isUpLoadImg) { //只能发一张图片
				$.dialog({
					title: '系统提示',
					content: '上传图片过多，每次仅能发送1张图片！',
					time: 2000
				});
				uploader.reset();
				return false;
			}
			if(file.size > 2097152) { //图片大小为2M
				$.dialog({
					title: '系统提示',
					content: '发送的图片不能超过2M！',
					time: 2000
				});
				uploader.reset();
				return false;
			}
		});
		uploader.on('uploadSuccess', function(file, response) { //上传图片成功的回调函数
			if(response.IsSuccess) {
				var data = response.Data;
				variable.imgObj = data;
				variable.isUpLoadImg = false;
				$(".content textarea").setCaret();
				$(".content textarea").insertAtCaret("[img]");
				uploader.reset(); //上传成功后重置
			} else {
				$.dialog({
					title: '系统提示',
					content: response.ErrorMessage,
					time: 2000
				});
				return false;
			}
		});
		//提问列表
		$(".content .prompt").off().on("click", function() {
			var str, _this = $(this);
			$(".pop-box").css("opacity", "0").show().html('<span class="closed">X</span><div class="title">对我的提问</div><div class="warp"><ul class="askList"></ul></div>');
			$(".pop-box .closed").click(function() {
				$(".pop-box .askList").html("");
				$(".pop-box").hide();
			});
			getNoteList(0); //提问列表展示
			getBoxPosition(); //弹出层位置
			_this.css({ //切换背景图片
				"background-image": "url(Images/Nonews.png)",
			});
			//回复提问
			$(".pop-box").on("click", ".askList .reply", function() {
				var $this = $(this),
					textStr = "";
				variable.questionID = $this.parents("li").attr("data-ID");
				variable.questionName = $this.siblings(".name").text();
				variable.questionContent = $this.parent().siblings(".askContent").text();
				textStr = "【回复】" + variable.questionName + variable.questionContent;
				$("#live-text .content .recommend").show().html(textStr + "<span class='clear'>X<span>").attr("title", textStr); //提问内容显示到输入框上面
				$(".content textarea").height(variable.textareaH - $(".content .recommend").height());
				$(".pop-box").hide();
				variable.isReplyFlag = true;
				$("#live-text .content .recommend .clear").click(function() { //取消回复
					$(this).parent().hide();
					$(".content textarea").val("");
					$(".content textarea").height(variable.textareaH);
					variable.isReplyFlag = false;
				});
			});
		});
		//文本框字数限制
		$(".content textarea").on('input propertychange', function() {
			var len = $(this).val().length;
			$(".content .remained").html((500 - len) + "字");
		});
		//发布消息
		$(".comments-box .send input").off().on("click", function() {
			if($("#live-text").prev("div").css("visibility") == "visible") {
				return false;
			}
			var that = $(".content textarea"),
				fontStyle = that.css("font"),
				val = $(".content textarea").val(),
				//内容中空格和换行保留，图片占位符替换成图片对象，标签转义
				value = encodeURI('<p style=\"font:' + fontStyle + '\">' + val.replace(/ /gi, "&nbsp;").replace(/\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029)/g, "<br>").replace(/\[img\]/g, "<div>" + (isEmpty(variable.imgObj) ? "[img]" : variable.imgObj) + "</div>") + '</p>');
			if(isEmpty(val)) {
				$.dialog({
					title: '系统提示',
					content: '输入内容不能为空哦！',
					time: 2000
				});
				return false;
			}
			if(val.match(/\[img\]/g) && val.match(/\[img\]/g).length > 1) {
				$.dialog({
					title: '系统提示',
					content: '上传图片过多，每次仅能发送1张图片！',
					time: 2000
				});
				return false;
			}
			if(/<[^>]*>/.test(val)) {
				$.dialog({
					title: '系统提示',
					content: '输入内容不合规范，请修改后重新提交！',
					time: 2000
				});
				return false;
			}
			if(variable.isReplyFlag) { //回复提问直播内容
				Ajax(
					AppConfig.URL, {
						Function: AppConfig.functionID.ReplyToQuestion,
						RoomID: variable.roomId,
						AnalystID: variable.userID,
						AnalystName: variable.userName,
						AnalystHeadImg: variable.userHeadImg,
						Contents: value,
						QuestionID: variable.questionID,
						QuestionName: variable.questionName,
						QuestionContent: variable.questionContent
					},
					function(msg) {
						var flag = msg.Data.IsOK;
						if(flag) {
							sendMsg();
							$(".content .recommend").hide();
							$(".content textarea").height(variable.textareaH);
							variable.isReplyFlag = false;
						}
					}
				);
			} else { //发布直播内容
				Ajax(
					AppConfig.URL, {
						Function: AppConfig.functionID.Message,
						RoomID: variable.roomId,
						AnalystID: variable.userID,
						AnalystName: variable.userName,
						AnalystHeadImg: variable.userHeadImg,
						Contents: value
					},
					function(msg) {
						var flag = msg.Data.IsOK;
						if(flag) {
							sendMsg();
						}
					}
				);
			}

		});
	}
});
//返回
$(".nav").on("click", ".back", function() {
	variable.enterRoomFlag = false;
	addNav(variable.roomDatas);
	$(".navbar .enter").show();
	$(".comments-box").addClass("hide");
	$(".date-time").css("display", "none");
	$(".nav li[data-rid='" + variable.roomId + "']").addClass("active");
	$("#live-text .content .recommend").hide();
	$(".content textarea").height(variable.textareaH);
	$(".content .list").height($(window).height() - $(".navbar").outerHeight() - 20);
	$(".pop-box .askList").html("");
	$(".pop-box").hide();
});
//接收纸条提问
function getQuestions() {
	Ajax(
		AppConfig.URL, {
			Function: AppConfig.functionID.NewNoteQuestions,
			AnalystID: variable.userID,
			RoomID: variable.roomId
		},
		function(msg) {
			var flag = msg.Data.IsHave;
			if(flag) { //有新消息切换背景
				$(".content .prompt").css("background-image", "url(Images/news.png)");
			} else {
				$(".content .prompt").css("background-image", "url(Images/Nonews.png)");
			}
			variable.timeOne = setTimeout(getQuestions, AppConfig.questionTime);
		}
	);
}
//获取提问列表
function getNoteList(noteMinRecordId) {
	Ajax(
		AppConfig.URL, {
			Function: AppConfig.functionID.NoteList,
			AnalystID: variable.userID,
			RoomID: variable.roomId,
			MinRecordID: noteMinRecordId,
			TopNumber: 10
		},
		function(msg) {
			$(".pop-box").css("opacity", "1");
			var data = msg.Data.List || [],
				arr = [],
				flag = $(".pop-box .askList").children("li").length;
			if(data.length == 0) {
				if(flag == 0) {
					$(".pop-box .askList").html("<p>您没有需要回答的问题</p>");
				}
				return false;
			}
			for(var i = 0, len = data.length; i < len; i++) {
				arr.push('<li data-id=' + data[i].ID + '><div class="detailed"><span class="name">' +
					data[i].QuestionName + '：' +
					'</span><span class="time">' + data[i].CreateTime +
					'</span><span class="replied ' + (data[i].IsRep ? "\">已回复" : "reply\">回复") +
					'</span></div><div class="askContent">' +
					data[i].QuestionContent +
					'</div></li>');
			}
			variable.noteMinRecordId = data[len - 1].ID;
			$(".pop-box .askList").find("p").remove();
			$(".pop-box .askList").append(arr.join(""));
			$(".pop-box .warp").off("scroll").on("scroll", function() { //滚动条到最低端加载更多提问
				var scrollTop = $(this).scrollTop();
				var windowHeight = $(this).height();
				var scrollHeight = $(this).children(".askList").outerHeight();　　
				if(scrollTop + windowHeight >= scrollHeight) {
					getNoteList(variable.noteMinRecordId);
				}
			});
		}
	);
}
//发送文本内容
function sendMsg() {
	variable.isScroll = false;
	variable.dateTime = 0;
	queryList();
	variable.isUpLoadImg = true;
	variable.imgObj = "";
	$(".content textarea").val("");
	$(".content .remained").html("500字");
}
//打卡
function onLine() {
	Ajax(
		AppConfig.URL, {
			Function: AppConfig.functionID.OnLine,
			SignID: 1002,
			UserID: variable.userID,
			UserName: variable.userName,
			UserIcon: variable.userHeadImg,
			userRoleName: variable.userRoleName
		},
		function(msg) {
			setTimeout(onLine, AppConfig.onLineTime);
		}
	);
}
//查询列表
function queryList(datyTime, text) {
	if(variable.isHistory) {
		return false;
	}
	Ajax(
		AppConfig.URL, {
			Function: AppConfig.functionID.LiveList,
			RoomID: variable.roomId,
			DType: 0,
			MaxRecordID: 0,
			MinRecordID: 0,
			TopNumber: variable.listNum,
			Date: datyTime || 0
		},
		function(msg) {
			var data = msg.Data.List || [];
			if(data.length < 1) { //没有内容弹出提示
				if(variable.alertFlag == true) {
					$.dialog({
						title: '系统提示',
						content: text || '分析师还未开始直播，请耐心等待！',
						time: 2000
					});
					variable.alertFlag = false; //弹出提示后不再继续弹出
				}
				if(!isEmpty(text)) {
					variable.dateTime = variable.tempTime;
				} else {
					$(".content .list .media-list").html("");
				}
				return false;
			}
			var dataID = [];
			for(var len = data.length, i = len - 1; i >= 0; i--) {
				dataID.push(data[i].ID);
			}
			if(dataID.join("") == variable.contentData.join("")) {
				return false;
			}
			addContent(data, html);
		}
	);
}

//查看历史
function history(queryMinRecordId) {
	Ajax(
		AppConfig.URL, {
			Function: AppConfig.functionID.LiveList,
			RoomID: variable.roomId,
			DType: 1,
			MaxRecordID: 0,
			MinRecordID: queryMinRecordId,
			TopNumber: variable.listNum,
			Date: 0
		},
		function(msg) {
			var data = msg.Data.List || [];
			if(data.length < 1) {
				return false;
			}
			addContent(data, prepend);
		}
	);
}
//直播内容展示
function addContent(data, fun) {
	fun(data);
	getListHeight();
}

function html(data) {
	$(".content .list .media-list").html(getList(data));
	$(".content .list").mCustomScrollbar("update");
	if(!variable.isScroll) {
		setTimeout(function() {
			$(".content .list").mCustomScrollbar("scrollTo", "bottom");
		}, 200);
	}
}

function prepend(data) {
	$(".content .list .media-list li").removeClass("scrollToMe");
	$(".content .list .media-list").prepend(getList(data));
	$(".content .list").mCustomScrollbar("update");
	setTimeout(function() {
		$(".content .list").mCustomScrollbar("scrollTo", ".scrollToMe");
	}, 200);
}
//获取直播间高度
function getListHeight() {
	var WH = $(window).height(),
		NH = $(".navbar").outerHeight(),
		CH = $(".comments-box").outerHeight();
	$(".content .list").height(WH - NH - CH);
}
//获取直播内容
function getList(data) {
	variable.contentData = [];
	var str = "";
	for(var len = data.length, i = len - 1; i >= 0; i--) {
		str += '<li class="media ' + (i == 0 ? "scrollToMe" : "") + '" data-id=' + data[i].ID + '>' +
			'<a class="pull-left" href="#">' +
			'<img class="media-object" src=' + data[i].AnalystHeadImg + ' alt="...">' +
			'</a>' +
			'<div class="media-body">' +
			'<div class="media-heading"><span class="name addcolor">' + data[i].AnalystName + '</span><span class="time">' + data[i].CreateDate + '</span><span class="zan"></span><span class="num">' + data[i].PraiseNum + '</span></div>' +
			'<div class="live-content">' + decodeURI(data[i].Contents).replace(/\[em_([1-9]|[1-6][0-9]|7[0-5])\]/g, '<img src="Images/face/$1.ico" border="0" />') +
			(data[i].QuestionsContent ? '<div class=replyBox><span class="reply">回复</span><span class="questionName">' + data[i].QuestionsName + '</span><span class="questionTime">' + data[i].ReplyDate + '</span>' +
				'<p>' + data[i].QuestionsContent + '</p>' +
				'</div>' : "") +
			'</div>' +
			'<div class="favor"><span class="delete ' + (variable.enterRoomFlag ? (variable.isEdit ? "" : "hide") : "hide") + '">删除</span></div>' +
			'</div>' +
			'</li>';
		variable.contentData.push(data[i].ID)
	}
	return str;
}
//图片放大
function showBigImg(e) {
	var html = $(e).attr("bigSrc"),
		w = $(e).attr("hWidth"),
		h = $(e).attr("hHeight"),
		width = $(e).attr("hWidth"),
		height = $(e).attr("hHeight"),
		WW = $(window).width() * 0.8,
		WH = $(window).height() * 0.8,
		windowH = $(window).height(),
		windowW = $(window).width(),
		m = w / h,
		n = windowW / windowH;
	if(m >= n && w > WW) {
		width = WW;
		height = WW / w * h;
	}
	if(m < n && h > WH) {
		height = WH;
		width = WH / h * w;
	}
	layer.open({ //弹出层插件
		type: 1,
		title: false,
		closeBtn: 1,
		area: [width + "px", height + "px"],
		shadeClose: true,
		move: ".layui-layer-content",
		moveType: "1",
		tipsMore: true,
		moveOut: true,
		content: "<img class='bigImg' src='" + html + "'/>"
	});
	windowSize(n, windowW, windowH);
	addEvent(document, "mousewheel", function(event) { //鼠标滚动,放大或缩小图片
		if(event.delta < 0) {
			$(".layui-layer").css({
				"width": $(".layui-layer").width() * 1.05,
				"height": $(".layui-layer").height() * 1.05
			});
		} else {
			if($(".layui-layer").width() > 150 || $(".layui-layer").height() > 150) {
				$(".layui-layer").css({
					"width": $(".layui-layer").width() * 0.95,
					"height": $(".layui-layer").height() * 0.95
				});
			}
		}
		$(".layui-layer").css({
			"left": ($(window).width() - $(".layui-layer").width()) / 2,
			"top": ($(window).height() - $(".layui-layer").height()) / 2
		})
		$(".layui-layer-content").css({
			"width": "100%",
			"height": "100%"
		});
		$(".layui-layer-content img").css({
			"width": "100%",
			"height": "100%"
		});
	});
}
//无权限图片提示
function noPermissionsFun(data, funID) {
	var imgSrc = "",
		tipLink = "",
		len = data.length;
	for(var i = 0; i < len; i++) {
		if(data[i].funid == funID) {
			imgSrc = data[i].tipsimgurl;
			tipLink = data[i].tipslink.indexOf("http") > -1 ? data[i].tipslink : "http://" + data[i].tipslink;
		}
	}
	if(!!imgSrc) {
		$('<img style="display: none;" id="hideImg"/>').appendTo("body");
		$("#hideImg").attr("src", imgSrc);
		$("#hideImg").load(function() {
			var w = $("#hideImg").width(),
				h = $("#hideImg").height(),
				width,
				height,
				WW = $(window).width() * 0.8,
				WH = $(window).height() * 0.8,
				windowH = $(window).height(),
				windowW = $(window).width(),
				m = w / h,
				n = windowW / windowH;
			if(m >= n && w > WW) {
				width = WW;
				height = WW / w * h;
			}
			if(m < n && h > WH) {
				height = WH;
				width = WH / h * w;
			}
			layer.open({
				type: 1,
				title: false,
				closeBtn: 1,
				area: [width + "px", height + "px"],
				shadeClose: true,
				move: false,
				moveType: "1",
				moveOut: true,
				content: "<img class='cursorImg' src='" + imgSrc + "'/>"
			});
			windowSize(n, windowW, windowH);
			if(!!tipLink) { //点击无权限提示图片后跳转到对应页面
				$(".layui-layer-content").click(function() {
					window.open(tipLink);
				});
			}
			$("#hideImg").remove();
		});
	} else {
		if(!!tipLink) {
			layer.open({
				type: 2,
				title: false,
				closeBtn: 1,
				area: ["500px", "280px"],
				shadeClose: true,
				move: false,
				moveOut: true,
				content: tipLink
			});
		} else {
			if($("#live-text").prev("div").css("visibility") == "visible") {
				return false;
			}
			$.dialog({
				title: '系统提示',
				content: '您无访问权限,请联系客服！',
				time: 2000
			});
			return false;
		}
	}
}
//弹出层图片随窗口大小改变
function windowSize(n, windowW, windowH) {
	var H = $(".layui-layer").height(),
		W = $(".layui-layer").width();
	$(window).resize(function() { //改变分辨率等比例放大或缩小图片
		if($(window).width() / $(window).height() >= n) {
			$(".layui-layer").css({
				"width": W * $(window).height() / windowH,
				"height": H * $(window).height() / windowH
			});
		} else {
			$(".layui-layer").css({
				"width": W * $(window).width() / windowW,
				"height": H * $(window).width() / windowW
			});
		}
		$(".layui-layer").css({
			"left": ($(window).width() - $(".layui-layer").width()) / 2,
			"top": ($(window).height() - $(".layui-layer").height()) / 2
		})
		$(".layui-layer-content").css({
			"width": "100%",
			"height": "100%"
		});
		$(".layui-layer-content img").css({
			"width": "100%",
			"height": "100%"
		});
	});
}
//直播间名称展示
function addNav(datas) {
	var str = "";
	for(var i = 0, len = datas.length; i < len; i++) {
		str += '<li class="list" data-rid=' + datas[i].rid + ' data-rstatus=' + datas[i].rstatus + '>' + datas[i].rname + '</li>';
	}
	$(".navbar>.nav").html("<ul>" + str + "</ul>");
}
//弹出框位置
function getBoxPosition() {
	$(".pop-box").css({
		"left": ($(window).width() - $(".pop-box").width()) / 2,
		"top": $(window).height() > 500 ? "150px" : "40px"
	});
}
//滚动条上下的三角形
$("<div class='arrow-up'></div>").appendTo(".mCSB_buttonUp");
$("<div class='arrow-down'></div>").appendTo(".mCSB_buttonDown");