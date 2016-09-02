/*!**************************************************************
* @name		:	
* @version	:	v1.0.0
* @author	:	听着情歌流泪
* @email	:	bobo.xiao@nmtree.com
* @explain	:	plugin script
* @created	:	
* @update   :
**************************************************************/
'use strict';

;(function ($) {
	/***************
	* 获取url参数
    ***************/
    $.parseUrlQuery = function () {
        var query = {}, i, params, param;
        var url = location.href;
        if (url.indexOf('?') >= 0) url = url.split('?')[1];
        else return query;
        params = url.split('&');
        for (i = 0; i < params.length; i++) {
            param = params[i].split('=');
            query[param[0]] = param[1];
        }
        return query;
    };
})(Zepto);

+function ($) {
    'use strict';
    $.showPreloader = function (title,icon) {
        var _preloaderHTML = '<div id="js_loading">'+
                             '<div class="preloader-indicator-overlay"></div>'+
                             '<div class="wd-preloader">'+
                             '<i class="icon iconloading '+(icon ? icon : defaults.preloaderIcon)+'"></i>'+
                             '<h4 class="preloader-title">'+(title ? title : defaults.preloaderTitle)+'</h4>'+
                             '<div id="dot_wave">'+
                             '<div class="dot_wave dot_wave_1"></div>'+
                             '<div class="dot_wave dot_wave_2"></div>'+
                             '<div class="dot_wave dot_wave_3"></div>'+
                             '</div>'+
                             '</div>'+
                             '</div>';
        $(defaults.preloaderContainer).append(_preloaderHTML);
    };
    $.hidePreloader = function () {
        $('#js_loading').remove();
        
    };
    var defaults  = $.showPreloader.prototype.defaults = {
        preloaderTitle          : '加载中',
        preloaderIcon           : 'loading',
        preloaderContainer      : document.body 
    };
}(Zepto);

+function($){
  'use strict';
  $.serializeObject = function (obj) {
      if (typeof obj === 'string') return obj;
      var resultArray = [];
      var separator = '&';
      for (var prop in obj) {
          if ($.isArray(obj[prop])) {
              var toPush = [];
              for (var i = 0; i < obj[prop].length; i ++) {
                  toPush.push(prop + '=' + obj[prop][i]);
              }
              resultArray.push(toPush.join(separator));
          }
          else {
              // Should be string
              resultArray.push(prop + '=' + obj[prop]);
          }
      }

      return resultArray.join(separator);
  };
}(Zepto)





























