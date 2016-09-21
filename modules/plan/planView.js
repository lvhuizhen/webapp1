define([
    'utils/tplManager',
	],function(TM) {
    var planView = {
    	init: function(query){
            
    	},
        showPlanContent: function(data){
            var output = TM.renderTplById('HplanContentTemplate',data);
            output+='<script>hinit();</script>';
            XL('#planHeader').html(output);
            var ftop=$('#planContent').offset().top-40;
            var d=data.fromDateStr;
            $('#fDate').html(d.slice(0,4)+'/'+d.slice(5,7));
            var dayData=data;
            var dCount=-1;
            $.LTtemplate.registerHelper('trafficContent', function (data) {
                dCount+=1;
                var _tpl = [];
                var c1=0;
                $.each(data,function(index,val){  
                    if(val.type == 'flight' || val.type == 'train' || val.type == 'smallTraffic'){                  
                        if(val.type == 'flight' || val.type == 'train'){ 
                            if (c1==0) {
                               _tpl.push('<div class="trafficT">');         
                               _tpl.push('<div class="title"><img src="modules/plan/images/traffic.png" alt="">交通</div>');                
                               c1+=1;
                            }  
                            _tpl.push('<div class="traffic-item">');        
                            _tpl.push('<p class="title1">'+val.superStartName);
                            if (val.type=='flight') {
                                _tpl.push('<span class="toRight"><span class="gray">飞机</span></span>');
                            }
                            if (val.type=='train') {
                                _tpl.push('<span class="toRight"><span class="gray">火车</span></span>');
                            }
                            _tpl.push(val.superEndName+'</p>');
                            _tpl.push('<p class="gray">出发：'+data[index-1].name+'</p>');
                            if (data[index+1]) {
                                 _tpl.push('<p class="gray">到达：'+data[index+1].name+'</p>'); 
                            }
                            var startT=val.startTime.slice(0,5);
                            var endT=val.endTime.slice(0,5);
                            _tpl.push('<p class="gray">'+startT+'-'+endT);
                            // 转车和加号
                            var strFnum=zhuan(val.flightNumber);
                            _tpl.push(strFnum);
                            var plus=diy_time(val.departTime,val.arriveTime);
                            _tpl.push(plus);
                            _tpl.push('</p>');
                            _tpl.push('<p class="gray">');
                            if (val.type=='flight') {
                                _tpl.push(val.airlineShortName);
                            }
                            if (val.type=='train') {
                                _tpl.push(val.airline);
                            }
                            _tpl.push('&nbsp;'+val.flightNumber+'</p>');
                            _tpl.push('<p class="gray">');
                            if (val.stops) {
                                _tpl.push('<span class="stop">经停</span><span class="zz">'+val.stops+'</span>');
                            }
                            _tpl.push('</p>');   
                            _tpl.push('</div>');             
                        }
                        
                        if(val.type == 'smallTraffic') {
                            var traStr=dayData.dayList[dCount].cityStr.split('-');
                            if ($.inArray(val.startStr,traStr)!=-1 && $.inArray(val.endStr,traStr)!=-1) {
                                if (c1==0) {
                                   _tpl.push('<div class="trafficT">');         
                                   _tpl.push('<div class="title"><img src="modules/plan/images/traffic.png" alt="">交通</div>');                
                                   c1+=1;
                                }  
                                _tpl.push('<div class="traffic-item">');
                                _tpl.push('<p class="title1">'+val.startStr+'<span class="toRight"><span class="gray">'+val.stTypeStr+'</span></span>'+val.endStr+'</p>');
                                _tpl.push('</div>');
                            }                  
                        }   
                    }  
                    var d=index+1;
                    if (_tpl.length>0 && d==data.length) {
                        _tpl.push('</div>');
                    }       
                });
                return _tpl.join('\n');
            }); 
            $.LTtemplate.registerHelper('playContent', function (data) {
                var _tpl = [];
                var c2=0;
                $.each(data,function(index,val){
                    if(val.type == 'ss' && val.parentId==0){
                        if (c2==0) {
                            _tpl.push('<div class="title playa"><img src="modules/plan/images/playa.png" alt="">游玩</div>');
                            _tpl.push('<div class="ssContent">');
                            c2+=1;
                        }                 
                           _tpl.push('<span class="title1">'+val.name+'</span><span class="dot"></span>');                          
                    }   
                    var d=index+1;
                    if (_tpl.length>0 && d==data.length) {
                        _tpl.push('</div>');
                    }                  
                });
                return _tpl.join('\n');
            }); 
            $.LTtemplate.registerHelper('hotelContent', function (data) {
                var _tpl = [];
                var c3=0;
                var ch=0;
                $.each(data,function(index,val){
                    if (val.type == 'hotel') {
                        if (c3==0) {
                          _tpl.push('<div class="trafficA">');
                          _tpl.push('<div class="title hotela"><img src="modules/plan/images/hotela.png" alt="">酒店</div>');
                          c3+=1;
                        }
                        ch=index;
                    }
                    var d=index+1;
                    if (_tpl.length>0 && d==data.length) {
                       
                       if (data[ch].isAssign==0) {
                         _tpl.push('<div class="title1">酒店');
                         _tpl.push('<span class="waitHotel">待定</span>');
                         _tpl.push('</div>');
                         _tpl.push('<span class="gray">推荐酒店区域</span>');
                         _tpl.push('<span class="reco gray">'+data[ch].recomAreaName+'</span>');
                       }
                       if (data[ch].isAssign==1) {
                          _tpl.push('<div class="title1">'+data[ch].recomAreaName+'</div>');
                       }
                       
                        _tpl.push('</div>');
                    }       
                });
                return _tpl.join('\n');
            }); 
            var output1 = TM.renderTplById('BplanContentTemplate',data);
            output1+='<script>bs();</script>';
            XL('#planContent').html(output1);
            
            var smallTraffic={'00':'zzb','01':'bus','02':'bus','03':'train', '04':'taxi','05':'minibus',
                             '06':'jdzx','07':'flight','08':'walk','09':'cable','10':'jqyy',
                             '11':'zzb', '12':'ld','13':'bus','14':'xjd','15':'xjd',  
                             '16':'xjd','17':'kt','18':'qsc','19':'moto','20':'bicycle',
                             '21':'horse'};
             $.LTtemplate.registerHelper('dayContent', function (data) {
                var _tpl = [];
                var count1=0,playId,count2,vname;
                $.each(data,function(index,val){
                    if (count1==0 && val.playId!=0 && val.playItemId!=0) { 
                            count2=0;                
                            playId=val.playId;                    
                            count1+=1;
                            _tpl.push('<div class="playList">');  
                            if (data[index-1] && data[index-1].name!=null && data[index-1].playId==playId && data[index-1].parentId==0 && data[index-1].playItemId==0) {
                                vname=data[index-1].name;
                                _tpl.push('<div class="start"><span class="topArrow"></span>'+vname+'玩法-开始</div>');
                            }
                    }
                    if (val.playId==playId) {
                           if (val.type=='node') {
                                 _tpl.push('<div class="ssTitle bgb">');
                                _tpl.push('<div class="snode">');
                                _tpl.push('<div class="icon1 dNode"></div>');
                                _tpl.push('<div class="ssDetail">');
                                _tpl.push('<p class="np">'+val.name+'</p>');
                                _tpl.push('<p>'+val.startTime.slice(0,-3)+'到达</p>');
                                _tpl.push('</div>');
                                _tpl.push('</div>');
                                if (val.description150) {
                                    _tpl.push('<p class="gray ndes">'+val.description150+'</p>');
                                }
                                
                                _tpl.push('</div>');
                           }
                           if (val.type=='ss') {
                                var duration=val.duration;
                                var h=Math.floor(duration/60);
                                var m=duration%60;
                                _tpl.push('<div class="ss bgb">');
                                _tpl.push('<div class="ssTitle" onclick=turnTo('+val.latitude+','+val.longitude+','+val.id+')>');
                                _tpl.push('<div class="icon1 scenic"></div>');
                                _tpl.push('<div class="ssDetail">');
                                _tpl.push('<div>'+val.name);
                                if (val.isTag==1) {
                                   _tpl.push('<span class="tTag">'+val.tag+'</span>'); 
                                }
                                _tpl.push('</div>');
                                _tpl.push('<p class="gray">'+val.startTime.slice(0,-3)+'到达 体验');
                                if (h!=0) {
                                    _tpl.push('<span class="time">'+h+'小时</span>');
                                }
                                if (m!=0) {
                                    _tpl.push('<span class="time">'+m+'分钟</span>');
                                }
                                _tpl.push('</p>');
                                _tpl.push('</div>');
                                _tpl.push('<div class="arrow"></div>');
                                _tpl.push('</div>');
                                
                                _tpl.push('<div class="swiper-container1">');
                                _tpl.push('<div class="swiper-wrapper">');
                                for (var i = 0; i <val.imgs.length; i++) {
                                    _tpl.push('<div class="swiper-slide">');
                                    _tpl.push('<img src="'+val.imgs[i]+'-planspot.ht" alt="">');
                                    _tpl.push('</div>');
                                }                    
                                _tpl.push('</div>');
                                _tpl.push('</div>');
                               if (val.description150) {
                                    _tpl.push('<div class="description">'+val.description150+'<span>..查看全文</span></div>');
                                }
                               _tpl.push('</div>');
                            }
                            if (val.type=='smallTraffic') {
                                var trafficDuration=val.trafficDuration;
                                var h=Math.floor(trafficDuration/60);
                                var m=trafficDuration%60;
                                _tpl.push('<div class="traffic bgc">');
                                _tpl.push('<div class="icon2 '+smallTraffic[val.stTypeCode]+'"></div>');
                                _tpl.push('<div class="trafficContent">');
                                _tpl.push('<div>');
                                _tpl.push('<p><span class="trafficName">'+val.stTypeStr+'</span>');
                                if (h!=0) {
                                    _tpl.push(h+'小时');
                                }
                                if (m!=0) {
                                    _tpl.push(m+'分钟');
                                }
                                _tpl.push('</p>');
                                _tpl.push('<p>'+val.startStr+'-'+val.endStr+'</p>');
                                _tpl.push('</div>');
                                if (val.description) {
                                    _tpl.push('<div>');
                                    _tpl.push('<p>'+val.description+'</p>');
                                    _tpl.push('</div>');
                                }                                                  
                                _tpl.push('</div>');
                                _tpl.push('</div>');
                           }
                    }else{  
                        if (count2==0) {    
                           if (vname!=null) {
                            _tpl.push('<div class="start">'+vname+'玩法-结束</div>');
                           }
                           _tpl.push('</div>');
                           count2+=1;
                        }                       
                        if (val.type=='hotel') {
                            _tpl.push('<div class="trafficHub">');
                            _tpl.push('<div class="icon1 hotel"></div>');
                            _tpl.push('<div class="HubDetail">');
                                
                            if (val.isAssign==0) {  
                              _tpl.push('<p>酒店');             
                              _tpl.push('<span class="waitHotel">待定</span>');    
                              _tpl.push('</p>');               
                              _tpl.push('<span class="gray">推荐酒店区域</span>');
                              _tpl.push('<span class="gray">'+val.recomAreaName+'</span>');
                            }
                            if (val.isAssign==1) {
                                var duration=val.duration;
                                var h=Math.floor(duration/60);
                                var m=duration%60;
                                var startTime=val.startTime.slice(0,-3);
                                _tpl.push('<p>'+val.recomAreaName+'');
                                _tpl.push('</p>');
                                _tpl.push('<p class="gray">'+val.startTime.slice(0,-3)+'到达 体验');
                                if (h!=0) {
                                    _tpl.push('<span class="time">'+h+'小时</span>');
                                }
                                if (m!=0) {
                                    _tpl.push('<span class="time">'+m+'分钟</span>');
                                }
                                _tpl.push('</p>');
                             }

                            _tpl.push('</div>');
                            _tpl.push('</div>');
                        }
                        if (val.type=='ss') {
                            var duration=val.duration;
                            var h=Math.floor(duration/60);
                            var m=duration%60;
                            _tpl.push('<div class="ss">');
                            _tpl.push('<div class="ssTitle" onclick=turnTo('+val.latitude+','+val.longitude+','+val.id+')>');
                            _tpl.push('<div class="icon1 scenic"></div>');
                            _tpl.push('<div class="ssDetail">');
                            _tpl.push('<div class="np">'+val.name);
                            if (val.isTag==1) {
                               _tpl.push('<span class="tTag">'+val.tag+'</span>'); 
                            }
                            _tpl.push('</div>');
                            _tpl.push('<p class="gray">'+val.startTime.slice(0,-3)+'到达 体验');
                            if (h!=0) {
                                _tpl.push('<span class="time">'+h+'小时</span>');
                            }
                            if (m!=0) {
                                _tpl.push('<span class="time">'+m+'分钟</span>');
                            }
                            _tpl.push('</p>');
                            _tpl.push('</div>');
                            _tpl.push('<div class="arrow"></div>');
                            _tpl.push('</div>');
                            _tpl.push('<div class="swiper-container1">');
                            _tpl.push('<div class="swiper-wrapper">');
                            for (var i = 0; i <val.imgs.length; i++) {
                                _tpl.push('<div class="swiper-slide">');
                                _tpl.push('<img src="'+val.imgs[i]+'-planspot.ht" alt="">');
                                _tpl.push('</div>');
                            }                    
                            _tpl.push('</div>');
                            _tpl.push('</div>');
                            if (val.description150) {
                                _tpl.push('<div class="description">'+val.description150+'<span>..查看全文</span></div>');
                            }
                            _tpl.push('</div>');
                        }
                        if (val.type=='node' || val.type=='city') {
                                _tpl.push('<div class="ssTitle">');
                                _tpl.push('<div class="snode">');
                                _tpl.push('<div class="icon1 dNode"></div>');
                                _tpl.push('<div class="ssDetail">');
                                _tpl.push('<p class="np">'+val.name+'</p>');
                                _tpl.push('<p>'+val.startTime.slice(0,-3)+'到达</p>');
                                _tpl.push('</div>');
                                _tpl.push('</div>');
                                if (val.description150) {
                                   _tpl.push('<p class="gray ndes">'+val.description150+'</p>');
                                }
                                _tpl.push('</div>');
                        }
                        if (val.type=='trafficHub'){
                            _tpl.push('<div class="trafficHub">');
                            if (val.name.indexOf('机场')!=-1) {
                                _tpl.push('<div class="icon1 dAirport"></div>');
                            }else if (val.name.indexOf('火车')!=-1) {
                                _tpl.push('<div class="icon1 dTrain"></div>');
                            }else{
                                _tpl.push('<div class="icon1 dNode"></div>');   
                            }
                            
                            _tpl.push('<div class="HubDetail">');
                            _tpl.push('<p>'+val.name+'</p>');
                            _tpl.push('<p>'+val.startTime.slice(0,-3)+'到达</p>');
                            _tpl.push('</div>');
                            _tpl.push('</div>');
                        }
                        if (val.type=='flight' || val.type=='train') {
                            var h=Math.floor(val.trafficDuration/60);
                            var m=val.trafficDuration%60;
                            _tpl.push('<div class="traffic">');
                            if (val.type=='flight') {
                                _tpl.push('<div class="icon2 flight"></div>');
                            }else{
                                 _tpl.push('<div class="icon2 train"></div>');
                            }
                            _tpl.push('<div class="trafficContent">');
                            _tpl.push('<div>');
                            if (val.type=='flight') {
                                _tpl.push('<p class="gray"><span class="trafficName">飞机</span>');
                            }else{
                                _tpl.push('<p class="gray"><span class="trafficName">火车</span>');
   
                            }
                            if (h!=0) {
                                _tpl.push('<span class="time">'+h+'小时</span>');
                            }
                            if (m!=0) {
                                _tpl.push('<span class="time">'+m+'分钟</span>');
                            }
                            _tpl.push('</p>');
                            _tpl.push('<p>'+val.superStartName+'-'+val.superEndName);
                            // 转车和加号
                            var strFnum=zhuan(val.flightNumber);
                            _tpl.push(strFnum);
                            var plus=diy_time(val.departTime,val.arriveTime);
                            _tpl.push(plus);
                            _tpl.push('</p>');
                            _tpl.push('</div>');
                            _tpl.push('<div>');
                            if(val.type=='flight'){
                                _tpl.push('<p>'+val.airlineShortName+' ');
                            }else{
                                _tpl.push('<p>'+val.airline+' ');
                            }
                            _tpl.push(val.flightNumber+'</p>');
                            _tpl.push('<p>'+val.startTime.slice(0,-3)+'-'+val.endTime.slice(0,-3));
                            if (val.stops) {
                                _tpl.push('<span class="stop">经停</span><span class="zz">'+val.stops+'</span>');
                            }
                            _tpl.push('</p>');                   
                            _tpl.push('</div>');
                            _tpl.push('</div>');
                            _tpl.push('</div>');
                        }
                        
                        if (val.type=='smallTraffic') {
                            var trafficDuration=val.trafficDuration;
                            var h=Math.floor(trafficDuration/60);
                            var m=trafficDuration%60;
                            _tpl.push('<div class="traffic">');
                            _tpl.push('<div class="icon2 '+smallTraffic[val.stTypeCode]+'"></div>');
                            _tpl.push('<div class="trafficContent">');
                            _tpl.push('<div>');
                            _tpl.push('<p><span class="trafficName">'+val.stTypeStr+'</span>');
                            if (h!=0) {
                                _tpl.push(h+'小时');
                            }
                            if (m!=0) {
                                _tpl.push(m+'分钟');
                            }
                            _tpl.push('</p>');
                            _tpl.push('<p>'+val.startStr+'-'+val.endStr+'</p>');
                            _tpl.push('</div>');                                                       
                            if (val.description) {
                                _tpl.push('<div>');
                                _tpl.push('<p>'+val.description+'</p>'); 
                                _tpl.push('</div>');
                            }                        
                            _tpl.push('</div>');
                            _tpl.push('</div>');
                        }
                    }
                });
                return _tpl.join('\n');
            }); 
            function ssDH(){
                var sl=$('.ss').length;
                for(var i=0;i<sl;i++){
                     var sh=parseInt($($('.ss')[i]).find('.ssDetail>div:nth-child(1)').css('height').slice(0,-2));
                     if (sh>30) {
                        var tag= $($('.ss')[i]).find('.ssDetail>div.np span.tTag').html();
                        $($('.ss')[i]).find('.ssDetail>div.np span.tTag').remove();
                        $($('.ss')[i]).find('.ssDetail>div.np').append('<p class="tTag">'+tag+'</p>');
                     }
                }
            }
            $('#planHeader').on('tap','ul.tab li',function(){
                var index=$(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                if(index==0){
                    XL('#planContent').html(output1);        
                }else{
                    var output = TM.renderTplById('dayContentTemplate',data.dayList[index-1]);
                    output+='<script>checkAll();swp1();bs();</script>';
                    XL('#planContent').html(output);
                    ssDH();    
                }
            });
            $('#planContent').on('click','.plan-item-title',function(){
                var index=parseInt($(this).find('.dayNum').html().slice(1));                $('ul.tab li:nth-child('+(index+1)+')').addClass('active').siblings().removeClass('active');
                var output = TM.renderTplById('dayContentTemplate',data.dayList[index-1]);
                output+='<script>checkAll();swp1();bs();</script>';
                XL('#planContent').html(output);
                ssDH();
                $('#planWrapper').scrollTop(ftop);
                $('#planWrapper').on('scroll',function() {
                    var cls=$('ul#tab').prop('class');
                    if($('#planWrapper').scrollTop()>=ftop){
                            if (cls.indexOf('ufixed')!=-1) {
                                $('ul#tab').removeClass('ufixed');
                            }
                            $('ul#tab').addClass('sfixed');
                            $('#planContent').css({'margin-top':'40px'});
                    }else{
                            if (cls.indexOf('sfixed')!=-1) {
                                $('ul#tab').removeClass('sfixed');
                            }
                            $('ul#tab').addClass('ufixed');
                            $('#planContent').css({'margin-top':'0'});
                    }
                });
            });  
        }    
    };
    return planView;
});