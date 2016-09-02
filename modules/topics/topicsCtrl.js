define([
    'module/topics/topicsView',
	'utils/xhr'
	],function(topicsView,xhr) {
    var topicsCtrl = {
    	init: function(query){
            topicsView.init();
            this.getTopicsData(query.topicId);
    	},
    	getTopicsData: function(topicid){
            xhr.ajaxCall({
                func:'topic',
                type:'GET',
                data:{
                    topicId:topicid
                }
            },function(res){
                if(res.code == '0'){
                    topicsView.showTopicsData(res.data.topic);
                }
            });
        }
    };
    return topicsCtrl;
});