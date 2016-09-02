define([
    'utils/tplManager'
	],function(TM) {
    var routeView = {
    	init: function(query){
    	},
        showRouteContent: function(data){
            if (data) {
                var output = TM.renderTplById('routeContentTemplate',data);
                output+='<script>sinit();</script>';
                XL('#routeContent').html(output);
            }	
        }
    };
    return routeView;
});