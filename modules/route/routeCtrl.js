/**************************************************************
* @name		:	
* @version	:	v1.0.0
* @author	:	听着情歌流泪
* @email	:	bobo.xiao@nmtree.com
* @explain	:	global script
* @created	:	
* @update   :
**************************************************************/
define([
	'module/route/routeView',
	'utils/tplManager',
	'utils/xhr'
	],function(routeView,TM,xhr) {
    var routeCtrl = {
    	init: function(query){
    		routeView.init();
            this.getRouteData(query.token,query.entry,query.id);
    	},
    	getRouteData: function(token,entry,id){
            xhr.ajaxCall({
                func:'route',
                type:'GET',
                data:{
                    id:id
                }
            },function(res){
                if(res.code == '0'){
                    routeView.showRouteContent(res.data.route);
                }
            });
        }
    };
    return routeCtrl;
});