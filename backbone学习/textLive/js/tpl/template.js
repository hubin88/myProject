;(function(){
	var UI = window.UI = window.UI || {};
	UI.navHTML=[
		'<div class="navbar">',
			'<div class="nav">',
			'</div>',
			'<div class="date-time">',
				'<input type="button" id="today" value="今天" />',
				'<input type="button" name="" id="chose-date" value="选择日期" />',
				'<input type="text" name="" id="datetime-local" />',
			'</div>',
			'<div class="operation">',
				'<div class="question addcolor">纸条提问</div>',
				'<div class="enter">进入</div>',
				'<div class="more">更多</div>',
			'</div>',
		'</div>'
	].join("");
	UI.contentHTML=[
		'<div class="content">',
			'<div class="list">',
				'<ul class="media-list"></ul>',
			'</div>',
		'</div>'
	].join("");
})();
