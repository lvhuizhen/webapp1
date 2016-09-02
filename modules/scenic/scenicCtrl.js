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
	'module/scenic/scenicView',
	'utils/tplManager',
	'utils/xhr'
	],function(scenicView,TM,xhr) {
    var scenicCtrl = {
    	init: function(query){
    		scenicView.init();
    		this.getScenicData(query.ssId);
            this.getPlayData(query.ssId);
            this.getRelatedData(query.ssId);
            this.getNearbyData(query.ssId);
    	},
    	getScenicData: function(ssid){
    		xhr.ajaxCall({
    			func:'scenic_spots/guide',
    			type:'GET',
    			data:{
    				id:ssid
    			}
    		},function(res){
    			if(res.code == '0'){
    				scenicView.showScenicData(res.data.ss);
    			}
    		});
    	},
        getRelatedData: function(ssid){
            xhr.ajaxCall({
                func:'scenic_spots/related',
                type:'GET',
                data:{
                    id:ssid
                }
            },function(res){
                if(res.code == '0'){
                    scenicView.showRelatedData(res.data);
                }
            });
        },
        getNearbyData: function(ssid){
            xhr.ajaxCall({
                func:'scenic_spots/listNearbyss',
                type:'GET',
                data:{
                    id:ssid
                }
            },function(res){         
                    scenicView.showNearbyData(res.data);         
            });
        },
        getPlayData: function(ssid){
            xhr.ajaxCall({
                func:'scenic_spots/play',
                type:'GET',
                data:{
                    id:ssid
                }
            },function(res){
                 if(res.code == '0'){
                    scenicView.showPlayData(res.data.playList);
                 }
            });
        }
    };
    return scenicCtrl;
});

