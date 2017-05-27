;
(function() {
	var views = window.Views = window.Views || {},
		variable = {};
	variable = {
		roomId: "", //房间ID
		index: 0, //房间序号
		queryMinRecordId: 0, //记录集的最小ID，历史记录
		noteMinRecordId: 0, //获取历史记录提问
		listNum: 10, //每次获取条数
		dateTime: "", //选择日期查询
		tempTime: "", //临时存储所选的日期
		timeOne: "", //刷新内容定时器
		timeTwo: "", //新消息定时器
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
		contentData: [] //存储内容的ID，用来比较是否需要刷新内容
	};
	var ModelLi = Backbone.Model.extend({
		defaults: {
			ID: "",
			AnalystHeadImg: "",
			AnalystName: "",
			CreateDate: "",
			PraiseNum: "",
			Contents: "",
			QuestionsContent: "",
			QuestionsName: "",
			ReplyDate: "",
			QuestionsContent: "",
			isEnterRoom: false,
			isEdit: false
		}
	});
	var ModelList = Backbone.Collection.extend({
		model: ModelLi
	});
	views.LiView = Backbone.View.extend({
		tagName: "li",
		initialize: function() {
			_.bindAll(this, "render", 'remove')
			this.model.on('change', this.render);
			this.model.on('remove', this.unrender);
		},
		events: {
			"click .zan": "likeIt",
			'click .delete': 'remove'
		},
		render: function() {
			var self = this;
			this.$el.attr("data-id", self.model.get('ID')).html(
				'<a class="pull-left" href="#">' +
				'<img class="media-object" src=' + self.model.get('AnalystHeadImg') + ' alt="...">' +
				'</a>' +
				'<div class="media-body">' +
				'<div class="media-heading"><span class="name addcolor">' + self.model.get('AnalystName') + '</span><span class="time">' + self.model.get('CreateDate') + '</span><span class="zan"></span><span class="num">' + self.model.get('PraiseNum') + '</span></div>' +
				'<div class="live-content">' + decodeURI(self.model.get('Contents')).replace(/\[em_([1-9]|[1-6][0-9]|7[0-5])\]/g, '<img src="img/face/$1.ico" border="0" />') +
				(self.model.get('QuestionsContent') ? '<div class=replyBox><span class="reply">回复</span><span class="questionName">' + self.model.get('QuestionsName') + '</span><span class="questionTime">' + self.model.get('ReplyDate') + '</span>' +
					'<p>' + self.model.get('QuestionsContent') + '</p>' +
					'</div>' : "") +
				'</div>' +
				'<div class="favor"><span class="delete ' + (self.model.get('isEnterRoom') ? (self.model.get('isEdit') ? "" : "hide") : "hide") + '">删除</span></div>' +
				'</div>'
			);
			return this;
		},
		likeIt: function(e) {
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
			var $this = $(e.target),
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
		},
		unrender: function() {
			$(this.el).remove();
		},
		remove: function(e) {
			var self = this;
			this.model.destroy();
			var $this = $(e.target);
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
								self.unrender();
							}
						}
					);
				},
				cancel: function() {
					return "";
				}
			});
		}
	});
	views.NavView = Backbone.View.extend({
		id: "live-text",
		initialize: function() {
			_.bindAll(this, "html", "queryListCallBack", "queryList", "appendItem", "noPermissions");
			this.getToken();
			this.$el.append(UI.navHTML, UI.contentHTML);
			this.getUserInfo();
			this.collection = new ModelList();
			this.collection.on('add', this.appendItem);
		},
		events: {
			"click .navbar>.nav": "table",
			"click .zan": "likeIt",
			"click .enter": "enterRoom",
			"click .back": "back"
		},
		table: function(e) {
			if(variable.enterRoomFlag) return false;
			if(variable.isBrowse) {
				variable.index = $(e.target).index();
				variable.roomId = $(e.target).attr("data-rid");
				$(e.target).addClass("active").siblings().removeClass("active");
				this.clearCollection();
				this.queryList();
			} else {
				var funID = "";
				for(var i = 0, len = allPermissions.length; i < len; i++) {
					if(allPermissions[i].bindObjId == $(this).attr("data-rid") && allPermissions[i].funcode == "001" && allPermissions[i].hasfun == 0) {
						funID = allPermissions[i].funid; //通过此id来查找对应的提示图片
					}
				}
				this.noPermissions(funID);
			}
		},
		noPermissions: function(funID) {
			var self = this;
			Ajax(AppConfig.bing, JSON.stringify({
				"en": 0,
				"cmd": {
					"md": "01",
					"fc": "013",
					"mdl": "03",
					"token": variable.token
				}
			}), function(msg) {
				var noPermissionsData = msg.data || [];
				self.noPermissionsFun(noPermissionsData, funID); //图片提示方法
			});
		},
		noPermissionsFun: function() {

		},
		back: function() {
			this.addNav(variable.roomDatas);
			$(".navbar .enter").show();
			$(".date-time").css("display", "none");
			$(".nav li[data-rid='" + variable.roomId + "']").addClass("active");
//			this.queryList();
			console.log(this.collection)
//			variable.enterRoomFlag = false;
		},
		enterRoom: function() {
			var self = this;
			variable.enterRoomFlag = true;
			for(var i = 0; i < this.collection.length; i++) {
				if(variable.isEdit) {
					this.collection.at(i).set({
						isEnterRoom: true,
						isEdit: true
					});
				} else {
					this.collection.at(i).set({
						isEnterRoom: true,
					});
				}
			}
			$(".navbar .enter").hide();
			$(".navbar").find(".nav").html("<ul><span class=\"back\">返回</span><li class=\"addcolor addCursor\">" + variable.roomDatas[variable.index].rname + "</li></ul>").end().find(".date-time").css("display", "inline-block");
			variable.tempTime = variable.dateTime;
			//选择今天
			$("#today").click(function() { //选择日期是今天，显示最新10条直播
				variable.isScroll = false;
				variable.alertFlag = true;
				variable.dateTime = 0;
				self.queryList();
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
						self.queryList();
					} else {
						self.queryList(variable.dateTime, "该日期无直播内容，请重新选择！");
					}
				}
			});
		},
		getToken: function() {
			variable.token = getQueryString("token")
		},
		getUserInfo: function() {
			var self = this;
			Ajax(AppConfig.bing, JSON.stringify({
				"en": 0,
				"cmd": {
					"md": "01",
					"fc": "009",
					"token": variable.token
				}
			}), function(msg) {
				self.userInfoCallBack(msg);
			});
		},
		userInfoCallBack: function(msg) {
			variable.isAnalyst = msg.data.grouptype;
			variable.userID = msg.data.cid;
			variable.userHeadImg = msg.data.groupimg;
			variable.userName = msg.data.nickname;
			variable.userRoleName = msg.data.groupname;
			variable.isRegister = msg.data.isRegister;
			this.getRoom();
		},
		getRoom: function() {
			var self = this;
			Ajax(AppConfig.bing, JSON.stringify({
				"en": 0,
				"cmd": {
					"md": "03",
					"fc": "001",
					"rstatus": 1,
					"token": variable.token
				}
			}), function(msg) {
				self.RoomCallBack(msg);
			});
		},
		RoomCallBack: function(msg) {
			var self = this;
			variable.roomDatas = msg.data;
			this.addNav(variable.roomDatas);
			variable.roomId = variable.roomDatas[0].rid;
			$(".nav li[data-rid='" + variable.roomId + "']").addClass("active");
			this.queryList();
			variable.timeOne = setInterval(self.queryList, AppConfig.time);
			if(variable.isAnalyst == variable.isAnalystFlag) {
				this.onLine();
				this.getQuestions();
			} else {
				$(".operation .question").css('display', 'inline-block');
			}
			self.getPermissions();
		},
		getPermissions: function() {
			var self = this;
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
					variable.allPermissions = msg.data || [];
					self.hasPermissions(variable.allPermissions);
				});
		},
		hasPermissions: function(allPermissions) {
			if(variable.isAnalyst == variable.isAnalystFlag) {
				variable.isBrowse = true;
			}
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
		},
		addNav: function(datas) {
			var str = "";
			for(var i = 0, len = datas.length; i < len; i++) {
				str += '<li class="list" data-rid=' + datas[i].rid + ' data-rstatus=' + datas[i].rstatus + '>' + datas[i].rname + '</li>';
			}
			this.$el.find(".nav").html("<ul>" + str + "</ul>");
			$("body").prepend(this.$el);
		},
		queryList: function(datyTime, text) {console.log(variable.roomId)
			$('ul.media-list', this.el).html("");
			var self = this;
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
				function(msg) {console.log(msg)
					var data = msg.Data.List.reverse();
					$.each(data, function(item, value) {
						self.addItem(value);
					});
				}
			);
		},
		clearCollection: function() {
			this.collection.reset();
		},
		addItem: function(value) {
			this.item = new ModelLi();
			this.item.set({
				ID: value.ID,
				AnalystHeadImg: value.AnalystHeadImg,
				AnalystName: value.AnalystName,
				CreateDate: value.CreateDate,
				PraiseNum: value.PraiseNum,
				Contents: value.Contents,
				QuestionsContent: value.QuestionsContent,
				QuestionsName: value.QuestionsName,
				ReplyDate: value.ReplyDate,
				QuestionsContent: value.QuestionsContent,
				isEnterRoom: false,
				isEdit: false
			});
			this.collection.add(this.item);
		},
		appendItem: function(item) {
			var itemView = new views.LiView({
				model: item
			});
			$('ul.media-list', this.el).append(itemView.render().el);
			this.getListHeight();
		},
		queryListCallBack: function(msg, text) {
			var self = this;
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
			self.addContent(data, self.html);
		},
		//		addContent: function(data, fun) {
		//			fun(data);
		//			this.getListHeight();
		//		},
		getListHeight: function() {
			var WH = $(window).height(),
				NH = $(".navbar").outerHeight(),
				CH = $(".comments-box").outerHeight();
			$(".content .list").height(WH - NH - CH);
		},
		onLine: function() {
			var self = this;
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
					setTimeout(self.onLine, AppConfig.onLineTime);
				}
			);
		},
		getQuestions: function() {

		},
		html: function(data) {
			var self = this;
			$(".content .list .media-list").html(self.getList(data));
			$(".content .list").mCustomScrollbar("update");
			if(!variable.isScroll) {
				setTimeout(function() {
					$(".content .list").mCustomScrollbar("scrollTo", "bottom");
				}, 200);
			}
		},
		prepend: function(data) {
			var self = this;
			$(".content .list .media-list li").removeClass("scrollToMe");
			$(".content .list .media-list").prepend(self.getList(data));
			$(".content .list").mCustomScrollbar("update");
			setTimeout(function() {
				$(".content .list").mCustomScrollbar("scrollTo", ".scrollToMe");
			}, 200);
		},
		getList: function(data) {
			variable.contentData = [];
			var str = "";
			for(var len = data.length, i = len - 1; i >= 0; i--) {
				str += '<li class="media ' + (i == 0 ? "scrollToMe" : "") + '" data-id=' + data[i].ID + '>' +
					'<a class="pull-left" href="#">' +
					'<img class="media-object" src=' + data[i].AnalystHeadImg + ' alt="...">' +
					'</a>' +
					'<div class="media-body">' +
					'<div class="media-heading"><span class="name addcolor">' + data[i].AnalystName + '</span><span class="time">' + data[i].CreateDate + '</span><span class="zan"></span><span class="num">' + data[i].PraiseNum + '</span></div>' +
					'<div class="live-content">' + decodeURI(data[i].Contents).replace(/\[em_([1-9]|[1-6][0-9]|7[0-5])\]/g, '<img src="img/face/$1.ico" border="0" />') +
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
		},
		getBoxPosition: function() {
			$(".pop-box").css({
				"left": ($(window).width() - $(".pop-box").width()) / 2,
				"top": $(window).height() > 500 ? "150px" : "40px"
			});
		}
	});
	var nav = new views.NavView;
})();