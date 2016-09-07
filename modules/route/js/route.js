function turnTo(latitude,longitude,id){
	var url = location.href;
    if (url.indexOf('?') >= 0) url = url.split('?')[0].slice(0,-9);
	window.location.href=url+'scenic.php?lat='+latitude+'&lon='+longitude+'&ssId='+id;
}
function sinit(){
	$('.route').on('scroll',function() {
		if($('.route').scrollTop()>=48){
			$('.nav_toggle').show();
		}else{
			$('.nav_toggle').hide();
		}
	});
	$('.route').on('tap','.nav_toggle',function(){
		$('.nav_bg').show();
		$('.nav_wrap').addClass('on');
		$('#daySide').removeClass('z1').addClass('z500');
		$(this).hide();
	});
	function nh(){
		$('.nav_bg').hide();
		$('.nav_wrap').removeClass('on');
		$('.nav_toggle').show();
		// $('.navList ul li>div.t').css('background-color','#FFF');
		// $('.navList ul li p').css('background-color','#FFF');
	}
	$('#routeContent').on('tap','.nav_bg',function(){
		nh();
	});
	$('#routeContent').on('tap','.navList ul li>div.t',function(){
		var index=$(this).closest('li').index();
        var top=$('.one-day:nth-child('+(index+1)+')').offset().top+$('.route').scrollTop();
        $('.route').scrollTop(top);
		nh();
	});
	$('#routeContent').on('tap','.navList ul li p',function(){
		var indexp=$(this).index()+2;
		var indexl=$(this).closest('li').index()+1;
		var stop=$('.route').scrollTop();
		var topp=$('.one-day:nth-child('+indexl+') .ssList:nth-child('+indexp+')').offset().top+stop;
		$('.route').scrollTop(topp);
		nh();
	})
	var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    loop: true,
   	onSlideChangeEnd:function(swiper){
			var ccc=swiper.container;
			var dispElem=ccc.find('.currentImg:nth-child(1)');
	        var l=ccc.find('.swiper-slide').length-2;
	        if (swiper.activeIndex>l) {
	             dispElem.html('1');
	        }else if (swiper.activeIndex==0) {
	            dispElem.html(l);
	        }else{
	        	dispElem.html(swiper.activeIndex);   
	        }
	    } 
	});
}
