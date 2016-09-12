function turnTo(latitude,longitude,id){
	var url = location.href;
    if (url.indexOf('?') >= 0) url = url.split('?')[0].slice(0,-9);
	window.location.href=url+'scenic.php?lat='+latitude+'&lon='+longitude+'&ssId='+id;
}
function sinit(){
	console.log(1);
	$('#routeContent').on('scroll',function() {
		if($('#routeContent').scrollTop()>=48){
			$('.nav_toggle').show();
		}else{
			$('.nav_toggle').hide();
		}
	});
	$('#routeContent').on('touchstart','.nav_bg',function(e){
		e.preventDefault();
	});
	$('#routeContent').on('touchmove','.nav_bg',function(e){
		e.preventDefault();
	});
	$('#routeContent').on('touchend','.nav_bg',function(e){
		e.preventDefault();
	});     
	$('.page').on('tap','.nav_toggle',function(){
		$('#routeContent').css({'overflow':'hidden'});
		$('.nav_bg').show();
		$('.nav_wrap').addClass('on');
		$(this).hide();
	});
	function nh(){
		$('#routeContent').css({'overflow-y':'scroll'});
		$('.nav_bg').hide();
		$('.nav_wrap').removeClass('on');
		$('.nav_toggle').show();
	}
	$('#routeContent').on('tap','.nav_bg',function(){
		nh();
	});
	$('#routeContent').on('tap','.navList ul li>div.t',function(){
		var index=$(this).closest('li').index();
        var top=$('.one-day:nth-child('+(index+1)+')').offset().top+$('#routeContent').scrollTop();
        $('#routeContent').scrollTop(top);
		nh();
	});
	$('#routeContent').on('tap','.navList ul li p',function(){
		var indexp=$(this).index()+2;
		var indexl=$(this).closest('li').index()+1;
		var stop=$('#routeContent').scrollTop();
		var topp=$('.one-day:nth-child('+indexl+') .ssList:nth-child('+indexp+')').offset().top+stop;
		$('#routeContent').scrollTop(topp);
		nh();
	});
	if ($('.swiper-container')) {
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
	
}
