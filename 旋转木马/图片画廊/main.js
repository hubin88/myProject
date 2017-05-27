!(function($) {
	var LightBox = function(settings) {
		var self = this;
		this.settings = {
			speed: 500
		};
		$.extend(self.settings, settings || {});
		this.popMask = $('<div id="lightBox-mask">'); //遮罩层
		this.popUp = $('<div id="lightBox-popUp">'); //弹出框
		this.bodyNode = $("body"); //body节点
		this.groupName = null; //图片所属的组名
		this.groupData = []; //存储同一组的数据
		this.renderDom();
		this.picViewArea = this.popUp.find(".lightBox-pic-view"); //图片预览区
		this.popupPic = this.popUp.find(".lightBox-image"); //图片
		this.picTitleArea = this.popUp.find(".lightBox-pic-caption"); //图片描述区
		this.prevBtn = this.popUp.find(".lightBox-prev-btn"); //上一张按钮
		this.nextBtn = this.popUp.find(".lightBox-next-btn"); //下一张按钮
		this.picTitle = this.popUp.find(".lightBox-pic-desc"); //图片标题区
		this.picCurrentIndex = this.popUp.find(".lightBox-pic-index"); //图片索引
		this.closeBtn = this.popUp.find(".lightBox-btn-close"); //关闭按钮
		this.flag = true; //关闭连续点击
		this.bodyNode.on("click", ".lightBox-start", function(e) {
			e.stopPropagation();
			var currentGroupName = $(this).attr("data-group"); //当前组名
			if(currentGroupName != self.groupName) {
				self.groupName = currentGroupName;
				self.getGroup(); //根据当前组名获取同一组数据
			}
			self.initPopup($(this)); //初始化弹出框
		});
		this.popMask.click(function() { //关闭弹出层
			$(this).fadeOut();
			self.popUp.fadeOut();
			this.clear = false;
		});
		this.closeBtn.click(function() { //关闭弹出层
			self.popMask.fadeOut();
			self.popUp.fadeOut();
			this.clear = false;
		});
		this.prevBtn.hover(function() { //前一张
			if(!$(this).hasClass("disabled") && self.groupData.length > 1) {
				$(this).addClass('lightBox-prev-btn-show');
			}
		}, function() {
			$(this).removeClass('lightBox-prev-btn-show');
		}).click(function(e) {
			e.stopPropagation();
			if(!$(this).hasClass("disabled") && self.flag) {
				self.flag = false;
				self.goTo("prev");
			}
		});
		this.nextBtn.hover(function() { //后一张
			if(!$(this).hasClass("disabled") && self.groupData.length > 1) {
				$(this).addClass('lightBox-next-btn-show');
			}
		}, function() {
			$(this).removeClass('lightBox-next-btn-show');
		}).click(function(e) {
			e.stopPropagation();
			if(!$(this).hasClass("disabled") && self.flag) {
				self.flag = false;
				self.goTo("next");
			}
		});
		this.timer = null; //定时器
		this.clear = false; //关闭弹出框就不触发改变窗口事件
		$(window).resize(function() {
			clearTimeout(self.time);
			if(self.clear) {
				self.timer = setTimeout(function() {
					self.loadPic(self.groupData[self.index].src);
				}, 500);
			}
		}).keyup(function(e) {
			if(this.clear = true) {
				var keyValue = e.keyCode||e.which;
				if(keyValue == 37 || keyValue == 38) {
					self.prevBtn.click();
				} else if(keyValue == 39 || keyValue == 40) {
					self.nextBtn.click();
				}
			}
		});
	};
	LightBox.prototype = {
		goTo: function(dir) {
			if(dir === "prev") {
				this.index--;
				if(this.index <= 0) {
					this.prevBtn.addClass("disabled").removeClass("lightBox-prev-btn-show");
				}
				if(this.index != this.groupData.length - 1) {
					this.nextBtn.removeClass("disabled");
				}
			} else if(dir === "next") {
				this.index++;
				if(this.index >= this.groupData.length - 1) {
					this.nextBtn.addClass("disabled").removeClass("lightBox-next-btn-show");
				}
				if(this.index != 0) {
					this.prevBtn.removeClass("disabled");
				}
			}
			var src = this.groupData[this.index].src;
			this.loadPic(src);
		},
		changePic: function(width, height) {
			var self = this,
			winWidth = $(window).width(),
			winHeight = $(window).height();
			//如果图片的尺寸大于浏览器的尺寸，看看是否溢出
			var scale = Math.min(winWidth / (width + 10), winHeight / (height + 10), 1);
			width = width * scale;
			height = height * scale;
			this.picViewArea.animate({
				width: width - 10,
				height: height - 10
			}, self.settings.speed);
			this.popUp.animate({
				width: width,
				height: height,
				marginLeft: -(width / 2),
				top: (winHeight - height) / 2
			}, self.settings.speed, function() {
				self.popupPic.css({
					width: width - 10,
					height: height - 10
				}).fadeIn();
				self.picTitleArea.fadeIn();
				self.flag = true;
				self.clear = true;
			});
			//设置文字和当前索引
			this.picTitle.text(this.groupData[this.index].title);
			this.picCurrentIndex.text("当前索引：" + (this.index + 1) + " of " + this.groupData.length);
		},
		loadPic: function(sourceSrc) {
			var self = this;
			self.popupPic.css({
				width: "auto",
				height: "auto"
			}).hide();
			this.picTitleArea.hide();
			this.preLoadImg(sourceSrc, function() {
				self.popupPic.attr("src", sourceSrc);
				var picWidth = self.popupPic.width(),
				picHeight = self.popupPic.height();
				self.changePic(picWidth, picHeight);
			});
		},
		preLoadImg: function(sourceSrc, callback) {
			var img = new Image();
			if(!!window.ActiveXObject) { //IE
				img.onreadystatechange = function() {
					if(this.readyState == "complete") {
						callback();
					}
				};
			} else {
				img.onload = function() {
					callback();
				}
			}
			img.src = sourceSrc;
		},
		showMaskAndPopup: function(sourceSrc, currentId) {
			var self = this,
			winWidth = $(window).width(),
			winHeight = $(window).height(),
			viewHeight = winHeight / 2 + 10;
			this.popupPic.hide();
			this.picTitleArea.hide();
			this.popMask.fadeIn();
			this.popUp.fadeIn().css({
				width: winWidth / 2 + 10,
				height: winHeight / 2 + 10,
				marginLeft: -(winWidth / 2 + 10) / 2,
				top: -viewHeight
			}).animate({
				top: (winHeight - viewHeight) / 2
			}, self.settings.speed, function() {
				self.loadPic(sourceSrc); //在弹出框中加载图片
			});
			this.picViewArea.css({
				width: winWidth / 2,
				height: winHeight / 2
			});
			this.index = this.getIndexOf(currentId); //获取当前点击图片的id在当前组别的索引 
			var groupDataLength = this.groupData.length;
			if(groupDataLength > 1) {
				if(this.index === 0) {
					this.prevBtn.addClass("disabled");
					this.nextBtn.removeClass("disabled");
				} else if(this.index === groupDataLength - 1) {
					this.prevBtn.removeClass("disabled");
					this.nextBtn.addClass("disabled");
				} else {
					this.prevBtn.removeClass("disabled");
					this.nextBtn.removeClass("disabled");
				}
			}else{
				this.prevBtn.addClass("disabled");
				this.nextBtn.addClass("disabled");
			}
		},
		getIndexOf: function(currentId) {
			var index = 0;
			$(this.groupData).each(function(i) {
				index = i;
				if(this.id === currentId) {
					return false;
				}
			});
			return index;
		},
		initPopup: function(currentObj) {
			var sourceSrc = currentObj.attr("data-source"),
			currentId = currentObj.attr("data-id");
			this.showMaskAndPopup(sourceSrc, currentId);
		},
		getGroup: function() {
			var self = this;
			var groupList = this.bodyNode.find("*[data-group=" + this.groupName + "]"); //相同组名的所有对象
			self.groupData = []; //先清空数组
			groupList.each(function() { //保存同一组的所有数据
				self.groupData.push({
					src: $(this).attr("data-source"),
					id: $(this).attr("data-id"),
					title: $(this).attr("data-title")
				});
			});
		},
		//遮罩层和弹出框添加到body节点
		renderDom: function() {
			var strDom = '<div class="lightBox-pic-view">' +
			'<span class="lightBox-btn lightBox-prev-btn"></span>' +
			'<img class="lightBox-image"/>' +
			'<span class="lightBox-btn lightBox-next-btn"></span>' +
			'<div class="lightBox-pic-caption">' +
			'<div class="lightBox-caption-area">' +
			'<p class="lightBox-pic-desc"></p>' +
			'<p class="lightBox-pic-index"></p>' +
			'</div>' +
			'<div class="lightBox-btn-close"></div>' +
			'</div>' +
			'</div>';
			//插入到弹出框
			this.popUp.html(strDom);
			this.bodyNode.append(this.popMask, this.popUp);
		}
	};
	window.LightBox = LightBox;
})(jQuery);