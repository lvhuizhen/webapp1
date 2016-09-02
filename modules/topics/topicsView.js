define([
    'css!module/topics/topics.css',
    'utils/tplManager',
	],function(CSS,TM) {
    var topicsView = {
    	init: function(query){

    	},
    	showTopicsData: function(data){
            var output = TM.renderTplById('topicsContentTemplate',data);
            XL('#topicsContent').html(output);
        }
    };
    return topicsView;
});