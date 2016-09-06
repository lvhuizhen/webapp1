define([
    'utils/tplManager',
    ],function(TM) {
    var scenicView = {
        init: function(query){
             
        },
        showScenicData: function(data){
            if (data) {
                if (data.imgStrList) {
                    XL('header').css({'background':'url('+data.imgStrList[0]+'-spotheader.ht)','background-size':'100% 100%'});
                }
                var output1 = TM.renderTplById('HscenicContentTemplate',data);
                XL('#scenicContent header').html(output1);
                var list=JSON.stringify(data);      
                var output2=TM.renderTplById('BscenicContentTemplate',data);
                if (data.playCount==0) {
                    XL('.tab').append('<li class="active acre"><div>指南</div></li>');
                    XL('.tab li:nth-child(1)').css({'width':'100%'});
                }else{
                    XL('.tab').append('<li class="active"><div>指南</div></li><li><div>玩法</div></li>');
                    XL('.tab li').css({'width':'50%'});
                    output2+="<script>tab();</script>";
                }             
                output2+="<script>t();</script>";
                output2+="<script>bs();</script>";
                XL('#scenicContent>section #tContent .tCon0').html(output2);
                var phoneNum=data.guidePhone.split('、');
                var ua = navigator.userAgent.toLowerCase(); 
                if (/iphone|ipad|ipod/.test(ua)) {
                    for(var i=0;i<phoneNum.length;i++){
                        $('#telPhone').append('<a href="tel:'+phoneNum[i]+'">'+phoneNum[i]+'</a>&nbsp;&nbsp;');
                    }         
                } else if (/android/.test(ua)) {
                     for(var i=0;i<phoneNum.length;i++){
                        $('#telPhone').append('<b>'+phoneNum[i]+'</b>');
                    }   
                }
                var lil=$('.tieshi-list li').length;
                if (lil==0) {
                    $('.tieshi').hide();
                }
                
            }
            
        },
        showRelatedData: function(data){  
            if (data.sub) {
                var output = TM.renderTplById('relatedContentTemplate',data);
                output+='<script>sw();</script>';
                XL(output).insertBefore('.tieshi');
            } 
        },
        showNearbyData: function(data){  
            if (data) {
                var output = TM.renderTplById('nearByContentTemplate',data);
                output+='<script>sw();</script>';
                XL(output).insertAfter('.tieshi');
            }
        },
        showPlayData: function(data){
            var renderData = {
                lists : (data.length > 0 ? data : false)
            };
            if (renderData) {
                var output = TM.renderTplById('playContentTemplate',renderData);
                XL('#scenicContent>section #tContent .tCon1').html(output);
            }      
        }    
    };
    return scenicView;
});