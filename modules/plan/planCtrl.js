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
	'module/plan/planView',
	'utils/tplManager',
	'utils/xhr'
	],function(planView,TM,xhr) {
    var planCtrl = {
    	init: function(query){
    		planView.init();
            this.getPlanData(query.token,query.id);
    	},
    	getPlanData: function(token,id){
            xhr.ajaxCall({
                func:'plan',
                type:'GET',
                data:{
                    id:id
                }
            },function(res){
                if(res.code == '0'){                
                    planView.showPlanContent(res.data.plan);
                }else{
                    document.write('暂时没有数据');
                }
            });
        }
    };
    return planCtrl;
});