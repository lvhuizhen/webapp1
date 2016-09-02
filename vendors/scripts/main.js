/******************************************
* @project     :    
* @file        :    APP入口
* @authors     :    听着情歌流泪 (bobo.xiao@nmtree.com)
* @version     :    v1.0.0
* @web         :    http://www.nmvdian.com
* Released     :    2015-08-18 13:30
******************************************/
+function ($) {
    "use strict";
    //全局配置
    var defaults = {
        version     :   {
          'app'   : '0.0.1'
        },
        staticPath : _HOST,
        modulePath : _HOST+'modules/',
        apiPath : 'http://t.api.mydeertrip.com/',
        author          :   '听着情歌流泪',
        email           :   'bobo.xiao@nmtree.com',
    };
    $.appConfig = $.extend(defaults,appConfig);
}(Zepto);
;(function() {
    'use strict';
    require.config({
        baseUrl: $.appConfig.staticPath,
        paths: {
            utils       :   'static/scripts/utils',
            router      :   'static/scripts/router',
            swiper      :   'static/scripts/swiper.min',
            module      :   $.appConfig.modulePath,
        },
        waitSeconds:15,
        urlArgs: "v=" + (+new Date()),
    });
    
    requirejs.onError = function (err) {
        if (err.requireType === 'timeout') {
            console.log('modules: ' + err.requireModules);
        }
        throw err;
    };
    
    require(['router'], function(router) {
        var XLsharePage = {
            initialize: function() {
                window.onload = this.initMainView();
            },
            initMainView: function() {
                window.XL = $ = Zepto;
                router.init();
            }
        };
        XLsharePage.initialize();
    });
    require(['swiper'],function(){
    });
})();
