<?php
	include ('header.php');
?>
<link rel="stylesheet" href="modules/plan/css/plan.css">
</head>
<body>
<div class="page plan" data-page="plan">
	<div id="planHeader"></div>
	<div id="planContent"></div>
</div>

<script type="text/template" id="HplanContentTemplate">
	<div class="plan-banner" >
		<div class="headerImg" style="background:url('{{headerImg}}-planheader.ht');background-size: 100% 100%;">
			<div>
				<div class="userInfo">
					{{#if user.photo}}
					<span class="photo" style="background: url({{user.photo}});background-size: 100% 100%;"></span>
					{{else}}
					<span class="default" style="background: url('modules/plan/images/user.png');background-size: 100% 100%;"></span>
					{{/if}}
					<p class="username">{{user.nickName}}</p>
				</div>
				<div class="planInfo">
					<p class="planName">{{name}}</p>
					<div class="fromDate">
					  <div>
					  	<span class="pLine"></span>
					  	<span class="dot1"></span>
					  </div>
					  <span id="fDate"></span>
					  <div>
					  	<span class="dot1"></span>
					  	<span class="pLine"></span>				  	
					  </div>
					</div>
				</div>
			</div>
		</div>
		<div class="swiper-container" style="z-index: 20;">
			<ul class="tab swiper-wrapper">
				<li class="swiper-slide active"><span>全部</span></li>
				{{#each dayList}}
					<li class="swiper-slide"><span>Day{{@index+1}}</span></li>
				{{/each}}
			</ul>
		</div>
	</div>
</script>
<script type="text/template" id="BplanContentTemplate">
	<div class="plan-list">
			{{#each dayList}}
			<div class="plan-item">
				<div class="plan-item-title">					
					<div class="dayNum">D{{@index+1}}</div>
					<div class="trans">
						<p>{{cityStr}}</p>
						<p>{{dayDateStr}}</p>
					</div>
					<div class="arrow"></div>					
				</div>
				{{showContent dayLine}}	
			</div>
			{{/each}}
	</div>
</script>
<script type="text/template" id="dayContentTemplate">
	{{dayContent dayLine}}
</script>
<?php
	include_once ('footer1.php');
?>
<script type="text/javascript" src="modules/plan/js/plan.js"></script>
<?php
	include_once ('footer2.php');
?>