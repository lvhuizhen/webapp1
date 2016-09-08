function turnTo(latitude,longitude,id){
	var url = location.href;
    if (url.indexOf('?') >= 0) url = url.split('?')[0].slice(0,-8);
	window.location.href=url+'scenic.php?lat='+latitude+'&lon='+longitude+'&ssId='+id;
}
function hinit(){
	var liLen=$('.tab li').length;
	$('ul.tab').css({'width':liLen*72+'px'});
	$('ul.tab').on('tap','li',function(){
		var index=$(this).index();
		$(this).addClass('active').siblings().removeClass('active');
	});
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
       	slidesPerView: 'auto',
        paginationClickable: true,
        freeMode: true
    });
}
function bs(){
	var ftop=$('#planContent').offset().top-40;
	$('.plan').on('scroll',function() {
		if($('.plan').scrollTop()>=ftop){
				$('ul.tab').css({'position':'fixed','top':'0','z-index':'2010'});
				$('#planContent').css({'margin-top':'40px'});
		}else{
				$('ul.tab').css({'position':'','top':'','z-index':''});
				$('#planContent').css({'margin-top':'0'});
			}
		});
}
function checkAll(){
	var descriptionAll=$('.description');
	for (var i = 0; i <descriptionAll.length; i++) {
		var dh=$(descriptionAll[i]).css('height').slice(0,-2);
		if (dh<=68) {
			$(descriptionAll[i]).find('span').hide();
		}else{
			$(descriptionAll[i]).css('height','66px');
		}
	}
	$('.description').on('tap','span',function(){
		$(this).closest('.description').css('height','auto');
		$(this).hide();
	});
}
function swp1(){
	var swiper1 = new Swiper('.swiper-container1', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        spaceBetween: 2,
        freeMode: true
		});
}
function zhuan(flightNumber){
	var f=flightNumber.split(',').length;
	if (f>1) {
		return '<span class="turn">转</span>';
	}else{
		return '';
	}
}
function diy_time(dtime,atime){
	var time1=dtime.split('T')[0];
	var time2=atime.split('T')[0];
    time1 = Date.parse(new Date(time1));
    time2 = Date.parse(new Date(time2));
    var d=Math.abs(parseInt((time2 - time1)/1000/3600/24));
    if (d>0) {
    	return '<span class="ssnum">+'+d+'</span>';
    }else{
    	return '';
    }
}

