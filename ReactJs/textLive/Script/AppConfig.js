;
(function() {
	var AppConfig = window.AppConfig = window.AppConfig || {};
	AppConfig.bing="http://66.66.66.52/BIService/BiServlet";
	AppConfig.URL="http://66.66.66.52:8099/Live/Service.ashx";
	AppConfig.functionID = {
		OnLine: 100,
		LiveList: 101,
		Likes: 102,
		DeleteLiveContent: 103,
		OnlineAnalysts: 104,
		QuestionsToAsk: 105,
		NoteList: 106,
		NewNoteQuestions: 107,
		ReplyToQuestion: 108,
		Message:109,
		UploadImg: 38
	};
	AppConfig.time=10*1000;//刷新时间
	AppConfig.questionTime=60*1000,//新提问刷新
	AppConfig.onLineTime=50*1000;//打卡间隔
})();