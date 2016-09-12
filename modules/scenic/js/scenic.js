function turnTo(latitude,longitude,id){
	var url = location.href;
    if (url.indexOf('?') >= 0) url = url.split('?')[0].slice(0,-10);
	window.location.href=url+'scenic.php?lat='+latitude+'&lon='+longitude+'&ssId='+id;
}
function tab(){
	$('#scenicContent').on('tap','.tab li',function(){
		var index=$(this).index()+1;
		$('.tab li:nth-child('+index+')').addClass('active').siblings().removeClass('active');
		$('#tContent>div.tCon'+(index-1)+'').show().siblings().hide();
	});
}
$('#scenicContent').on('tap','#telPhone b',function(){
	var pnum=$(this).html();
	$('#con').show();
	$('#confir>p>b').html(pnum);
});
$('#confir button').on('tap',function(){
	var pnum=$('#confir>p>b').html();
	var cho=$(this).html();
	$('#con').hide();
	if (cho=='呼叫') {	
	     return window.location.href = 'tel://'+pnum;
	}
});
function t(){
	ftop=$('section').offset().top;
	var initHeight=$('.gaikuang-body>div.ttext').css('height');
	var inhs=parseInt(initHeight.slice(0,-2));
	if (inhs>78) {
		$('.gaikuang-body>div.ttext').css({'height':'78px'});
		$('#scenicContent').on('tap','.gaikuang-body>div.ttext',function(){
				$('.gaikuang-body>div.ttext').css({'height':initHeight});
				$('.gaikuang-body .gzz').hide();
		});	
	}
	var initHei=[];
	var tli=$('.tieshi-list li').length;
	for(var i=1;i<=tli;i++){
		initHei[i]=$('.tieshi-list li:nth-child('+i+') div.ttext').css('height');
		var inhs=parseInt(initHei[i].slice(0,-2));
		if (inhs>68) {
			$('.tieshi-list li:nth-child('+i+') div.ttext').css({'height':'68px'});
			$('#scenicContent').on('tap','.tieshi-list li:nth-child('+i+') div.ttext',function(){
					$(this).css({'height':initHei[i]});
					$(this).find('.gzz').hide();
			});
		}else{
			$('.tieshi-list li:nth-child('+i+') div.ttext .gzz').hide();
		}
	}
}
function bs(){
	$('#scenicContent').on('scroll',function() {
		var cls=$('ul#tab').prop('class');
		if($('#scenicContent').scrollTop()>=ftop){
			// alert('IOS兼容');
			if (cls.indexOf('ufixed')!=-1) {
				$('ul#tab').removeClass('ufixed');
			}
			$('ul#tab').addClass('sfixed');
			$('#tContent').css({'margin-top':'40px'});
		}else{
			if (cls.indexOf('sfixed')!=-1) {
				$('ul#tab').removeClass('sfixed');
			}
			$('ul#tab').addClass('ufixed');
			$('#tContent').css({'margin-top':'2px'});
			}
		});
}
function sw(){
	var swiper = new Swiper('.swiper-container', {
	    pagination: '.swiper-pagination',
	    slidesPerView: 'auto',
	    spaceBetween: 1,
	    freeMode: true
	});
}







