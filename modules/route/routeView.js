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
                var dayl=$('.one-day').length;
                for(var i=1;i<=dayl;i++){
                    var listL=$('.one-day:nth-child('+i+') .ssList').length;
                    for(var j=2;j<=listL+1;j++){
                        var snameh=$('.one-day:nth-child('+i+') .ssList:nth-child('+j+') .sname').css('height').slice(0,-2);
                        var psnameh=parseInt(snameh);
                        if (psnameh>=30) {
                            var exp=$('.one-day:nth-child('+i+') .ssList:nth-child('+j+') .sname span').html();
                            $('.one-day:nth-child('+i+') .ssList:nth-child('+j+') .sname span').remove();
                            XL('<p class="exp">'+exp+'</p>').insertAfter('.one-day:nth-child('+i+') .ssList:nth-child('+j+') .sname');
                        }
                    }
                    
                }
            }	
        }
    };
    return routeView;
});