/**************************************************************
* @name		:	
* @version	:	v1.0.0
* @author	:	听着情歌流泪
* @email	:	bobo.xiao@nmtree.com
* @explain	:	global script
* @created	:	
* @update   :
**************************************************************/
define(['utils/tplManager'],function(TM) {
    var homeCtrl = {
    	init: function(query){
    		console.warn(query);
    		var dd = TM.renderTplById('showdemo','');
            XL('#demo').html(dd);
    	}
    };
    return homeCtrl;
});