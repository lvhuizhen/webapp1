<?php
	include ('header.php');
?>

<link rel="stylesheet" href="modules/scenic/css/scenic.css">
</head>
<body>
	<div class="page scenic" data-page="scenic" >
		<div id="con" style="display: none;">
			<div id="conbk"></div>
			<div id="confir">
				<p>确认拨打电话<b></b>？</p>
				<button id="cancelp">取消</button>
				<button id="phonep">呼叫</button>
			</div>
		</div>
		<div id="scenicContent">
			<header></header>
			<section>
				<ul class="tab">
					
				</ul>
				<div id="tContent">
					<div class="tCon0"></div>
					<div class="tCon1"></div>
				</div>
			</section>
			<div class="download">					
				<b class="cancelD">
					<img src="modules/scenic/images/close.png">
				</b>
				<span class="logo">
					<img src="modules/scenic/images/bhead.png">
				</span>
				<div class="xl-description">
					<p class="d1">驯鹿旅行</p>
					<p class="d2">你的自助游行程助手！</p>
				</div>
				<span class="ljxz">
					立即下载
				</span>									
			</div>
		</div>
	</div>

	<script type="text/template" id="HscenicContentTemplate">
			<div class="hzz"></div>
			<div class="hText">
				<div class="title">
					{{#if name}}<h1>{{name}}</h1>{{/if}}
					{{#if enName}}<h2>{{enName}}</h2>{{/if}}
				</div>
				<div>
					<div class="rContent">
						{{#if importantStr}}<p>{{importantStr}}</p>{{/if}}
						<p>{{countryName}} <i></i> {{cityName}}</p>
						{{#if natureStr}}
						<p>{{natureStr}}</p>{{/if}}
					</div>				
				</div>			
			</div>
	</script>
	<script type="text/template" id="BscenicContentTemplate">	
			{{#if description150}}
			<div class="suxie">
				<h3 class="ctitle">速写</h3>
				<p class="ttext">
					{{description150}}
				</p>
			</div>
			{{/if}}
			{{#if guideIntro}}
			<div class="gaikuang">
				<h3 class="ctitle">概况</h3>
				<div class="gaikuang-body">
					<div class="ttext">					
						{{guideIntro}}
						<div class="gzz"></div>
					</div>
				</div>
				
			</div>
			{{/if}}
			<div class="tieshi">	
				<h3 class="ctitle">实用信息</h3>		
				<ul class="tieshi-list">
					{{#if guideAddress}}
					<li id="addres">
						<p class="icon1">
							<img src="modules/scenic/images/address.png"/>
							地址：
						</p>
						<div  class="right-con">
							<div class="ttext tclick">
								<a href="">{{guideAddress}}</a>
								<div class="gzz"></div>
							</div>
						</div>				
					</li>
					{{/if}}	
					{{#if guideTraffic}}
					<li>
						<p class="icon2">
							<img src="modules/scenic/images/traffic.png"/>
							交通：
						</p>
						<div  class="right-con">
							<div class="ttext">
								{{guideTraffic}}
								<div class="gzz"></div>
							</div>
						</div>				
					</li>
					{{/if}}	
					{{#if guideOpenTime}}
					<li>
						<p class="icon3">
							<img src="modules/scenic/images/openTime.png"/>
							开放时间：
						</p>
						<div class="right-con">
							<div class="ttext">
								{{guideOpenTime}}
								<div class="gzz"></div>
							</div>
						</div>	
					</li>
					{{/if}}	
					{{#if guideTicket}}
					<li>
						<p class="icon4">
							<img src="modules/scenic/images/ticket.png"/>
							门票：
						</p>
						<div class="right-con">
							<div class="ttext">
								{{guideTicket}}
								<div class="gzz"></div>
							</div>
						</div>	
					</li>
					{{/if}}	
					{{#if guideStay}}
					<li>
						<p class="icon5">
							<img src="modules/scenic/images/hotel.png"/>
							住宿：
						</p>
						<div class="right-con">
							<div class="ttext">
								{{guideStay}}
								<div class="gzz"></div>
							</div>
						</div>							
					</li>
					{{/if}}	
					{{#if guideBestTime}}
					<li>
						<p class="icon6">
							<img src="modules/scenic/images/bestTime.png">
							最佳时间：
						</p>
						<div class="right-con">
							<div class="ttext">
								{{guideBestTime}}
								<div class="gzz"></div>
							</div>
						</div>	
					</li>
					{{/if}}	
					{{#if guideTips}}
					<li>
						<p class="icon7">
							<img src="modules/scenic/images/tips.png"/>
							贴士：
						</p>
						<div class="right-con" id="guideTips">
							<div class="ttext">
								{{guideTips}}
								<div class="gzz"></div>
							</div>
							
						</div>	
					</li>
					{{/if}}	
					{{#if guideWebsite}}
					<li>
						<p class="icon8">
							<img src="modules/scenic/images/website.png"/>
							网站：
						</p>
						<div class="right-con">
							<div class="ttext tclick">
								<a href="{{guideWebsite}}">{{guideWebsite}}</a>
								<div class="gzz"></div>
							</div>
						</div>
					</li>
					{{/if}}	
					{{#if guidePhone}}
					<li >
						<p class="icon9">
							<img src="modules/scenic/images/tel.png"/>
							电话：
						</p>
						<div class="right-con">
							<div class="ttext tclick" id="telPhone">
								<div class="gzz"></div>
							</div>
						</div>					
					</li>
					{{/if}}	
				</ul>
			</div>
			
	</script>
	<script type="text/template" id="relatedContentTemplate">
		<div class="zjd">
			<h3 class="ctitle">子景点</h3>
			<div class="zviewImg" id="zviewImg1">
				<div class="swiper-container">
			        <div class="swiper-wrapper">
			        	{{#each sub}}
			            <div class="swiper-slide">
			            	<div onclick="turnTo({{id}})"></a>
				            	<p class="viewName">{{name}}</p>
				            	<div class="fj-zz"></div>
				            	{{#if img}}
				            	<img src="{{img}}-spotsubspot.ht" alt="">
				            	{{/if}}
				            </div>
			            </div>
			        	{{/each}}
			        </div>
			    </div>
			</div>
		</div>
	</script>
	<script type="text/template" id="nearByContentTemplate">
		<div class="fj">
			<h3 class="ctitle">附近景点</h3>
			<div class="zviewImg" id="zviewImg2">
				<div class="swiper-container">
			        <div class="swiper-wrapper">
			        	{{#each sub}}
			            <div class="swiper-slide">
			            	<p class="viewName">{{name}}</p>
			            	<div class="fj-zz"></div>
			            	<img src="{{img}}" alt="">
			            </div>
			        	{{/each}}
			        </div>
			    </div>
			</div>
		</div>
	</script>
	<script type="text/template" id="playContentTemplate">	
		{{#if lists}}
			<ul>
				{{#each lists}}
				<li>
					<div class="playName">
						<div class="playText">
							<p>{{durationStr}}<span class="pL">|</span>{{name}}</p>				
						</div>
					</div>
					<p class="ttext">
						{{description}}
					</p>
					<div class="playLine"></div>
				</li>
				{{/each}}
			</ul>	
		{{/if}}
	</script>
	
<?php
	include_once ('footer1.php');
?>
<script type="text/javascript" src="modules/scenic/js/scenic.js"></script>
<?php
	include_once ('footer2.php');
?>







	