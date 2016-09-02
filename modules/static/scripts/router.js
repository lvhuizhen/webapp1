define([],function() {
    var router = {
        init: function() {
            var pageName = $('.page').attr('data-page');
            var urlQuery = $.parseUrlQuery(location.href);
            router.loadController(pageName,urlQuery)
        },
        loadController: function(controllerName,query){
            require([$.appConfig.modulePath +  controllerName + '/'+ controllerName + 'Ctrl.js'], function(controller) {
                controller.init(query);
            });
        }
    };

    return router;
});