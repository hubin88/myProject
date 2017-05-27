;(function() {
	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'index',
			'content':'content',
			'register':'register',
			'loading': 'loading',
			'*error': 'content' 
		},
		index:function(){
			window.ViewManage.GetView("ContentView").install();
		}
	});

	BaseRouter = window.BaseRouter = new AppRouter();
	Backbone.history.start();
})();