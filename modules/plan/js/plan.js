function turnTo(id){
	var url = location.href;
    if (url.indexOf('?') >= 0) url = url.split('?')[0];
	window.location.href=url+'?id='+id;
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
				$('ul.tab').addClass('ufixed');
				$('#planContent').css({'margin-top':'40px'});
		}else{
				$('ul.tab').removeClass('ufixed');
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

function t(){
	
}


