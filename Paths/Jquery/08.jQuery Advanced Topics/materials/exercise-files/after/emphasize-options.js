/* public defaults */
(function($){
	$.fn.emphasize = function(options) {
		var settings = {};
		$.extend(settings, this.emphasize.defaults, options);
		return this.css('background-color', settings.backColor);
	}
	
	$.fn.emphasize.defaults = {
		backColor: 'orange'
	};
})(jQuery);
