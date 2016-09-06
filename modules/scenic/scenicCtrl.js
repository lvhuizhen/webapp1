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
            this.getNearbyData(query.lat,query.lon,query.ssId);
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
        getNearbyData: function(lat,lon,ssid){
            xhr.ajaxCall({
                func:'scenic_spots/listNearbyss',
                type:'GET',
                data:{
                    lat:lat,
                    lon:lon,
                    ssId:ssid
                }
            },function(res){   
                console.log(res.data);
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

