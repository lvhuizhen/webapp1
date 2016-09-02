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


