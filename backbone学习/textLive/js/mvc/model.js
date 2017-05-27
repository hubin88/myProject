;
(function() {
	var ModelLi = window.ModelLi = window.ModelLi || {};
	ModelLi = Backbone.Model.extend({
		defaults: {
			ID: "",
			AnalystHeadImg: "",
			AnalystName:"",
			CreateDate:"",
			PraiseNum:"",
			Contents:"",
			QuestionsContent:"",
			QuestionsName:"",
			ReplyDate:"",
			QuestionsContent:""
		}
	});
	var ModelList = window.ModelList = window.ModelList || {};
	ModelList = Backbone.Collection.extend({
		model: ModelLi
	});
})()