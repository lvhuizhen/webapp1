<?php
    include ('header.php');
?>


	<div class="page topics" data-page="topics" id="topicsContent"></div>
    
    <script type="text/template" id="topicsContentTemplate">
        <div class="topics-banner" style="background-image:url({{img}})">
            <div class="topics-head-info">
                <h1>{{title}}</h1>    
                <h2>
                    <i class="icon left-line"></i>
                    {{subTitle}}
                    <i class="icon right-line"></i>
                </h2>    
            </div>
        </div>

        <div class="content-block">
            <!--线路简介-->
            <div class="description">
                <div class="content-block-inner">
                    {{description}}
                </div>
            </div>
            <!--线路列表-->
            <div class="topics-scenic-list">
                {{#each this.ssList}}
                <div class="card topics-card">
                    <div class="card-header no-border">
                            <div class="card-header-icon">
                                <i class="icon topic-card-head-icon"></i>
                            </div>
                            <div class="title">{{name}}</div>
                            <div class="address">{{cityName}} , {{countryName}}</div>
                    </div>
                    <div class="card-content">
                        <div class="imgFull">
                            <img src="{{img}}">
                            <span class="imgCount">{{imgCount}}张</span>
                        </div>
                        <p>{{description}}</p>
                    </div>
                </div>
                {{/each}}
            </div>
        </div>
    </script>


<?php
    include_once ('footer.php');
?>
