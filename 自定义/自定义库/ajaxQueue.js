/*
 * jQuery.ajaxQueue - A queue for ajax requests
 * 
 * (c) 2011 Corey Frang
 * Dual licensed under the MIT and GPL licenses.
 *
 * Requires jQuery 1.5+
 */
(function($) {

	// 声明一个jquery空对象，这个对象用来存放我们的队列
	var ajaxQueue = $({});

	$.ajaxQueue = function(ajaxOpts) {
		var jqXHR,
			dfd = $.Deferred(),
			promise = dfd.promise();
		// 将ajax加入运行队列
		ajaxQueue.queue(doRequest);
		// 添加中断ajax方法
		promise.abort = function(statusText) {
			// 判断ajax是否在运行,如果有正在运行ajax，就将其结束掉ajax
			if (jqXHR) {
				return jqXHR.abort(statusText);
			}
			// 将执行完毕的ajax从队列中删除
			var queue = ajaxQueue.queue(),
				index = $.inArray(doRequest, queue);

			// 判断队列中是否存在执行完毕ajax，如有就将其从队列中剔除 
			if (index > -1) {
				queue.splice(index, 1);
			}
			// 最后将ajax状态改为失败，rejectWith()作用相当于reject()
			dfd.rejectWith(ajaxOpts.context || ajaxOpts, [promise, statusText, ""]);
			return promise;
		};
		// 执行我们的ajax查询操作方法
		function doRequest(next) {
			jqXHR = $.ajax(ajaxOpts)
				.done(dfd.resolve)
				.fail(dfd.reject)
				.then(next, next);
		}

		return promise;
	};
})(jQuery);
//调用方法
//$.ajaxQueue({
//  url: "/echo/html/",
//  dataType: "json"
//}).done(function( data ) {
//  console.log("请求成功回调函数");  
//}).fail(function(){
//  alert("请求失败回调函数"); 
//});