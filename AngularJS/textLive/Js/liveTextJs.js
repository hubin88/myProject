var liveText = angular.module('liveText', []);
liveText.controller("myLive", ["$scope", "$http", function($scope, $http) {
	//	$scope.token = getQueryString("token");
	$scope.enterRoomFlag = false;
	$scope.popBoxIn = false;
	$scope.roomName = [{
		rid: 1,
		rname: "公共直播间"
	}, {
		rid: 2,
		rname: "黄金直播间"
	}, {
		rid: 3,
		rname: "VIP直播间"
	}];
	$scope.userData = {
		cid: 635,
		groupid: 33,
		groupimg: "http://66.66.66.52/cfpro/upload/role/12.gif",
		groupname: "分析师",
		grouptype: 2,
		isRegister: true,
		mobile: "13588888888",
		nickname: "13588888888",
		uimg: "http://66.66.66.52/cfpro/upload/Users/img/1.png",
		uname: "13588888888",
	};
	$scope.onLineAnalyst = [{
		"AnalystID": 11,
		"AnalystName": "dadqdwq",
	}, {
		"AnalystID": 12,
		"AnalystName": "aaaqwdqwdaaq",
	}, {
		"AnalystID": 13,
		"AnalystName": "aadqwdqwdaaaq",
	}];
	$scope.roomId = $scope.roomName[0].rid;
	$scope.curname = $scope.roomName[0].rname;
	$scope.getCurname = function(index) {
		$scope.curname = $scope.roomName[index].rname;
	}
	$scope.changeRoomID = function(id) {
		$scope.roomId = id;
	};
	$scope.changeEnterRoomFlag = function() {
		$scope.enterRoomFlag = !$scope.enterRoomFlag;
	};
	$scope.lists = datas;
	$scope.remove = function(index) {
		$scope.lists.splice(index, 1);
	};
	$scope.enterQuestion = function() {
		$scope.popBoxIn = true;
	};
	$scope.submitQuestion = function() {
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
		$scope.popBoxIn = false;
	};
	$scope.family = [{
		val: "Microsoft YaHei",
		content: "微软雅黑"
	}, {
		val: "SimSun",
		content: "宋体"
	}, {
		val: "SimHei",
		content: "黑体"
	}, {
		val: "KaiTi",
		content: "楷体"
	}];
	$scope.selected1 = "Microsoft YaHei";
	$scope.size = [{
		val: "9",
		content: "9px"
	}, {
		val: "10",
		content: "10px"
	}, {
		val: "11",
		content: "11px"
	}, {
		val: "12",
		content: "12px"
	}, {
		val: "13",
		content: "13px"
	}, {
		val: "14",
		content: "14px"
	}];
	$scope.selected2 = "14";
	$scope.showFontPanel = false;
	$scope.toggleXieti = function() {
		var fontStyle = "";
		if($(".content textarea").css("font-style") == "italic") {
			fontStyle = "normal";
			$(".font-xieti").css("font-style", "italic");
		} else {
			fontStyle = "italic";
			$(".font-xieti").css("font-style", "normal");
		}
		$(".content textarea").css({
			"font-style": fontStyle
		});
	};
}]);
liveText.directive("toggleRoom", function() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			element.bind('click', function(event) {
				element.addClass('active').siblings().removeClass("active");
				scope.roomId = attrs.rid;
				scope.changeRoomID(scope.roomId);
				scope.getCurname(scope.roomId - 1);
			});
		}
	}
});
liveText.directive("addPraise", function() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			element.bind('click', function(event) {
				if(!scope.userData.isRegister) { //游客不能点赞
					$.dialog({
						title: '系统提示',
						content: '游客不能点赞哦，请先登录！',
						ok: function() {},
						cancel: function() {
							return "";
						}
					});
					return false;
				}
				var id = $(this).parents("li").attr("data-id");
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
					var num = $(this).siblings(".num").text();
					$(this).siblings(".num").text(++num);
					setCookie(id, true);
				}
			});
		}
	}
});
liveText.directive("choseDate", function() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			element.hover(function() {
				$("#chose-date").css({
					background: "#E6AF41",
					color: "#fff"
				});
			}, function() {
				$("#chose-date").css({
					background: "transparent",
					color: "inherit"
				});
			}).datepicker({
				dateFormat: "yy-mm-dd",
				maxDate: "0"
			}).change(function() {
				var dateTime = element.val();
			})
		}
	}
});
liveText.directive("getAnalyst", function() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			element.hover(function() {
				$(this).addClass("active").siblings().removeClass("active");
			}).click(function() {
				var $this = $(this);
				scope.analystid = $this.attr("id");
				$("#dropdownMenu .people").text($this.text()).attr("data-chosed", true);
			});
		}
	}
});
liveText.directive("questionContent", function() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			element.find("textarea").on('input propertychange', function() {
				var len = $(this).val().length;
				$(".pop-box .remaining").html((200 - len) + "字");
			});
		}
	}
});
liveText.directive("toggleWeight", function() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			element.click(function() {
				var fontWeight = "";
				if($(".content textarea").css("font-weight") == "bold") {
					fontWeight = "normal";
					$(".font-weight").css("font-weight", "normal");
				} else {
					fontWeight = "bold";
					$(".font-weight").css("font-weight", "bold");
				}
				$(".content textarea").css({
					"font-weight": fontWeight
				});
			});
		}
	}
});
liveText.directive("toggleXieti", function() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			element.click(function() {
				var fontStyle = "";
				if($(".content textarea").css("font-style") == "italic") {
					fontStyle = "normal";
					$(".font-xieti").css("font-style", "italic");
				} else {
					fontStyle = "italic";
					$(".font-xieti").css("font-style", "normal");
				}
				$(".content textarea").css({
					"font-style": fontStyle
				});
			});
		}
	}
});
liveText.directive("faceBox", function() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			$(".content .face").qqFace({
				id: 'facebox', //表情盒子的ID
				assign: '.content textarea', //给那个控件赋值
				path: 'Images/face/' //表情存放的路径
			});
		}
	}
});