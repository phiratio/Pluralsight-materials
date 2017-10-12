/* Make the application work offline */
$(function () {
	if(!!window.applicationCache) {
		var appCache = window.applicationCache;
		appCache.addEventListener("downloading", function () {
			$("#rates progress").css('display', 'block');
		}, false);
		
		appCache.addEventListener("progress", function (progressEvent) {
			var percentage = progressEvent.loaded / progressEvent.total * 100;
			$("#rates progress").val(percentage);
		}, false);
		
		var complete = function () {
			$("#rates progress").hide();
		}
		appCache.addEventListener("cached", complete, false);
		appCache.addEventListener("updateready", complete, false);
		appCache.addEventListener("error", complete, false);
		appCache.addEventListener("obsolete", complete, false);
	}
	
	var offline = function () {
		$("#network-status").removeClass("online").addClass("offline");
	};
	window.addEventListener("offline", offline, false);
	if(!navigator.onLine) offline();
	
	window.addEventListener("online", function () {
		$("#network-status").removeClass("offline").addClass("online");
	}, false);
	
});