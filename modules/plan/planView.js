define([
    'utils/tplManager',
	],function(TM) {
    var planView = {
    	init: function(query){
            
    	},
        showPlanContent: function(data){
           var output = TM.renderTplById('HplanContentTemplate',data);
            output+='<script>hinit();</script>'
            XL('#planHeader').html(output);
            var d=data.fromDateStr;
            var i=-1;
            var ssContent=[];
            $('#fDate').html(d.slice(0,4)+'/'+d.slice(5,7));
             $.LTtemplate.registerHelper('showContent', function (data) {
                var _tpl = [];
                var c=0;
                $.each(data,function(index,val){
                    _tpl.push('<div class="plan-item-body">');
                    if(val.type == 'ss'){
                        if (c==0) {                           
                            _tpl.push('<div class="title playa"><img src="modules/plan/images/playa.png" alt="">游玩</div>');
                            _tpl.push('<div class="ssContent"></div>');
                            i+=1;
                            ssContent[i]='';
                        }     
                           ssContent[i]+='<span class="title1">'+val.name+'</span><span class="dot"></span>';
                           c+=1;
                    }
                   
                    if(val.type == 'flight' || val.type == 'train' || val.type == 'smalltraffic'){      
                        _tpl.push('<div class="trafficA">');
                        _tpl.push('<div class="traffic-item">');
                        if(val.type == 'flight'){         
                            _tpl.push('<div class="title"><img src="modules/plan/images/traffic.png" alt="">交通</div>');
                            _tpl.push('<p class="title1">'+val.superStartName+' <span class="toRight"><span class="gray">飞机</span></span>'+val.superEndName+'</p>');
                            _tpl.push('<p class="gray">出发：'+data[index-1].name+'</p>');
                            if (data[index+1]) {
                                 _tpl.push('<p class="gray">到达：'+data[index+1].name+'</p>'); 
                            }
                            var stops=val.stops;
                            var s=stops.split(',').length;
                            var startT=val.startTime.slice(0,5);
                            var endT=val.endTime.slice(0,5);
                            _tpl.push('<p class="gray">'+startT+'-'+endT+'<span class="turn">转</span><span class="ssnum">+'+s+'</span></p>');
                            _tpl.push('<p class="gray">'+val.airlineShortName+'&nbsp;'+val.flightNumber+'</p>');
                            _tpl.push('</div>');
                        }
                        if (val.type == 'train') {
                            _tpl.push('<div class="title"><img src="modules/plan/images/icon.png" alt="">交通</div>');
                            _tpl.push('<p class="title1">'+val.superStartName+' 火车 '+val.superEndName+'</p>');
                            _tpl.push('<p class="gray">'+val.departTime+'-'+val.arriveTime+'<span>转</span><span class="ssnum">+'+s+'</span></p>');
                        }
                        if (val.type == 'smalltraffic') {
                            _tpl.push('<p class="title1">'+val.startStr+'-'+val.stTypeStr+'-'+val.endStr+'</p>');
                        }   
                        _tpl.push('</div>'); 
                        _tpl.push('</div>');            
                    }
                    if (val.type == 'hotel') {
                         _tpl.push('<div class="trafficA">');
                        _tpl.push('<div class="title hotela"><img src="modules/plan/images/hotela.png" alt="">酒店</div>');
                        _tpl.push('<div class="title1">酒店<span class="waitHotel">待定</span></div>');
                        _tpl.push('<div class="gray">推荐酒店区域  <span class="reco">'+val.recomAreaName+'</span></div>');

                        _tpl.push('</div>'); 
                    }
                    _tpl.push('</div>');
                });
                return _tpl.join('\n');
            }); 
            var output1 = TM.renderTplById('BplanContentTemplate',data);
            XL('#planContent').html(output1);
            for(j=0;j<=i;j++){
                $($('.ssContent')[j]).html(ssContent[j]);
            }
            var smallTraffic={'00':'zzb','01':'bus','02':'bus','03':'train', '04':'taxi','05':'minibus',
                             '06':'jdzx','07':'flight','08':'walk','09':'cable','10':'jqyy',
                             '11':'zzb', '12':'ld','13':'bus','14':'xjd','15':'xjd',  
                             '16':'xjd','17':'kt','18':'qsc','19':'moto','20':'bicycle',
                             '21':'horse'};
             $.LTtemplate.registerHelper('dayContent', function (data) {
                var _tpl = [];
                var count1=0;
                var count2,playId,vname;
                $.each(data,function(index,val){
                    if (val.type=='ss' && count1==0 && val.playId!=0 && val.playItemId!=0) { 
                            count2=0;                   
                            playId=val.playId;
                            vname=val.name;
                            count1+=1;
                            var duration=val.duration;
                            var h=Math.floor(duration/60);
                            var m=duration%60;
                            _tpl.push('<div class="ss">');
                            _tpl.push('<div class="ssTitle">');
                            _tpl.push('<div class="icon1 scenic"></div>');
                            _tpl.push('<div class="ssDetail">');
                            _tpl.push('<p>'+val.name);
                            if (val.isTag==1) {
                               _tpl.push('<span class="tTag">'+val.tag+'</span>'); 
                            }
                            _tpl.push('</p>');
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
                            _tpl.push('<div class="playList">');    
                            _tpl.push('<div class="start"><span class="topArrow"></span>'+vname+'玩法-开始</div>');

                    }else if (val.playId==playId) {
                           if (val.type=='node') {
                                 _tpl.push('<div class="ssTitle bgb">');
                                _tpl.push('<div class="snode">');
                                _tpl.push('<div class="icon1 dNode"></div>');
                                _tpl.push('<div class="ssDetail">');
                                _tpl.push('<p>'+val.name+'</p>');
                                _tpl.push('<p>'+val.startTime.slice(0,-3)+'到达</p>');
                                _tpl.push('</div>');
                                _tpl.push('</div>');
                                _tpl.push('<p class="gray ndes">'+val.description150+'</p>');
                                _tpl.push('</div>');
                           }
                           if (val.type=='ss') {
                                var duration=val.duration;
                                var h=Math.floor(duration/60);
                                var m=duration%60;
                                _tpl.push('<div class="ss bgb">');
                                _tpl.push('<div class="ssTitle">');
                                _tpl.push('<div class="icon1 scenic"></div>');
                                _tpl.push('<div class="ssDetail">');
                                _tpl.push('<p>'+val.name);
                                if (val.isTag==1) {
                                   _tpl.push('<span class="tTag">'+val.tag+'</span>'); 
                                }
                                _tpl.push('</p>');
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
                           _tpl.push('<div class="start">'+vname+'玩法-结束</div>');
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
                                _tpl.push('<p>推荐酒店区域 '+val.recomAreaName+'</p>');
                            }
                            if (val.isAssign==1) {
                                var duration=val.duration;
                                var h=Math.floor(duration/60);
                                var m=duration%60;
                                var startTime=val.startTime.slice(0,-3);
                                _tpl.push('<p>'+val.hotelList[0].name+'');
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
                            _tpl.push('<div class="ssTitle">');
                            _tpl.push('<div class="icon1 scenic"></div>');
                            _tpl.push('<div class="ssDetail">');
                            _tpl.push('<p>'+val.name);
                            if (val.isTag==1) {
                               _tpl.push('<span class="tTag">'+val.tag+'</span>'); 
                            }
                            _tpl.push('</p>');
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
                        }
                        if (val.type=='node' || val.type=='city') {
                                _tpl.push('<div class="ssTitle">');
                                _tpl.push('<div class="snode">');
                                _tpl.push('<div class="icon1 dNode"></div>');
                                _tpl.push('<div class="ssDetail">');
                                _tpl.push('<p>'+val.name+'</p>');
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
                            // if (data[index-1]) {
                            //     if(data[index-1].type=='flight'){
                            //         _tpl.push('<div class="icon1 dAirport"></div>');
                            //     }
                            //     if(data[index-1].type=='train'){
                            //         _tpl.push('<div class="icon1 dTrain"></div>');
                            //     }
                            // }else if (data[index+1]) {
                            //     if(data[index+1].type=='flight'){
                            //         _tpl.push('<div class="icon1 dAirport"></div>');
                            //     }
                            //     if(data[index+1].type=='train'){
                            //         _tpl.push('<div class="icon1 dTrain"></div>');
                            //     }
                            // }
                            if (val.name.indexOf('机场')!=-1) {
                                _tpl.push('<div class="icon1 dAirport"></div>');
                            }
                            if (val.name.indexOf('火车')!=-1) {
                                _tpl.push('<div class="icon1 dTrain"></div>');
                            }
                            
                            _tpl.push('<div class="HubDetail">');
                            _tpl.push('<p>'+val.name+'</p>');
                            _tpl.push('<p>'+val.startTime.slice(0,-3)+'到达</p>');
                            _tpl.push('</div>');
                            _tpl.push('</div>');
                        }
                        if (val.type=='flight') {
                            var h=Math.floor(val.trafficDuration/60);
                            var m=val.trafficDuration%60;
                            _tpl.push('<div class="traffic">');
                            _tpl.push('<div class="icon2 flight"></div>');
                            _tpl.push('<div class="trafficContent">');
                            _tpl.push('<div>');
                            _tpl.push('<p class="gray"><span class="trafficName">飞机</span>');
                                if (h!=0) {
                                    _tpl.push('<span class="time">'+h+'小时</span>');
                                }
                                if (m!=0) {
                                    _tpl.push('<span class="time">'+m+'分钟</span>');
                                }
                                _tpl.push('</p>');
                            var stops=val.stops;
                            var s=stops.split(',').length;
                            _tpl.push('<p>'+val.superStartName+'-'+val.superEndName+'<span class="turn">转</span><span class="ssnum">+'+s+'</span></p>');
                            _tpl.push('</div>');
                            _tpl.push('<div>');
                            _tpl.push('<p>'+val.airlineShortName+' '+val.flightNumber+'</p>');
                            _tpl.push('<p>'+val.startTime.slice(0,-3)+'-'+val.endTime.slice(0,-3));
                            if (val.stops) {
                                _tpl.push('<span class="stop">经停</span><span class="zz">'+val.stops+'</span>');
                            }
                            _tpl.push('</p>');                   
                            _tpl.push('</div>');
                            _tpl.push('</div>');
                            _tpl.push('</div>');
                        }
                        if (val.type=='train') {
                            _tpl.push('<div class="traffic">');
                            _tpl.push('<div class="icon2 train"></div>');
                            _tpl.push('<div class="trafficContent">');
                            
                            _tpl.push('<p><span class="trafficName">火车</span>'+val.startTime-val.endTime+'小时</p>');
                            _tpl.push('<p>'+val.superStartName+'-'+val.superEndName+'</p>');
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
           
            $('#planHeader').on('tap','ul.tab li',function(){
                var index=$(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                if(index==0){
                    XL('#planContent').html(output1);                  
                }else{
                    var output = TM.renderTplById('dayContentTemplate',data.dayList[index-1]);
                    output+='<script>checkAll();swp1();</script>';
                    XL('#planContent').html(output);
                }
            });
            $('#planContent').on('tap','.plan-item-title',function(){
                var index=parseInt($(this).find('.dayNum').html().slice(1));
                $('ul.tab li:nth-child('+(index+1)+')').addClass('active').siblings().removeClass('active');
                var output = TM.renderTplById('dayContentTemplate',data.dayList[index-1]);
                output+='<script>checkAll();swp1();</script>';
                $(".page").scrollTop(0);
                XL('#planContent').html(output);
            });            
        }
    };
    return planView;
});