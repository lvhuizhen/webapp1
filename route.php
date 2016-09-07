<?php
	include ('header.php');
?>
<link rel="stylesheet" href="modules/route/css/route.css">
</head>
<body>
	<div class="page route" data-page="route">
		<div id="routeContent"></div>
		<div class="nav_toggle hidden">
			<div class="img_bg hcenter vcenter">
				<img src="modules/route/images/hover.png">
			</div>
		</div>
	</div>
	<script type="text/template" id="routeContentTemplate">
		<div class="route-banner"  style="{{#if img}}background: url({{img}}-routeheader.ht);
		    {{else}}
		    	{{#if dayList[0].ssList[0]}}background: url({{dayList[0].ssList[0].imgList[0].img}}-routeheader.ht);
		    	{{/if}}
		    {{/if}}background-size: 100% 100%;">
			<div class="wshadow"></div>
			<div class="wrapper">
				<div class="route-head-info">
					<p class="xianlu">线路<span>|</span>{{dayCount}}天</p>
					<p class="description1">{{title}}</p>
					<p class="description2">{{subTitle}}</p>
				</div>
				{{#if description}}
				<div class="route-head-con">
					{{description}}
				</div>
				{{/if}}
			</div>
			
		</div>
		<div class="content-block">
		{{#if dayList}}
			{{#each dayList}}
			<div class="one-day" id="s{{@index}}">
				<div class="dayList">
					<p>Day{{@index+1}}</h1>
					<p>{{citys}}</h1>
					{{#if description}}
					<p>
						{{description}}
					</p>
					{{/if}}
				</div>
				{{#each ssList}}
				<div class="ssList">
					<div class="ssName">
						<div onclick="turnTo({{latitude}},{{longitude}},{{id}})">
							<div class="icon">
								<img src="modules/route/images/scenic.png" alt="">
							</div>
							<div class="ssRecom">
								<p class="sname">
									{{name}}
									<span>{{experienceTag}}</span>
								</p>
								<p class="cname">{{cityName}}
									{{#if recomTimeStr}}
									<i></i>{{recomTimeStr}}
									{{/if}}
								</p>
							</div>
							<div class="arrow"></div>
						</div>
					</div>
					<div class="swiper-container">
				        <div class="swiper-wrapper">
				        	{{#each imgList}}
				            <div class="swiper-slide">
				                <img src="static/images/blank.gif" data-echo="{{img}}-routepic.ht" alt="">
				            </div>
				            {{/each}}
				        </div>
				       <div class="tip">
				           <span class="currentImg"></span>/{{imgCount}}
				       </div>
				    </div>
				    {{#if description150}}
					<p>
						{{description150}}
					</p>
					{{else}}
					<p>
						{{description}}
					</p>
					{{/if}}
				</div>
				{{/each}}
			</div>
			{{/each}}
		{{/if}}
		</div>	
		
		<div class="nav_bg hidden"></div>
		<div class="nav_wrap">
			<div class="navList">
				<ul>
				{{#if dayList}}
					{{#each dayList}}
						<li>
							<div class="t">
								<div style="width: 100%;height: 100%">
									<span class="dnum">D{{@index+1}}</span>
									<span class="citys">{{citys}}</span>
								</div>	
							</div>
							<div>
							{{#each ssList}}				
								<p>
									<span class="dDot"></span>{{name}}
								</p>
							{{/each}}
							</div>
						</li>
					{{/each}}
				{{/if}}
				</ul>
			</div>
		</div>
		
	</script>
<?php
	include_once ('footer1.php');
?>

<script src="modules/route/js/route.js"></script>
<?php
	include_once ('footer2.php');
?>