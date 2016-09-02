define(['utils/appFunc'],function(appFunc) {

    var apiServerHost = $.appConfig.apiPath;
    //var codes = $.appConfig.errCode;
    var codes = [
        {code:10000, message:'Your session is invalid, please login again',path:'/'},
        {code:10001, message:'Unknown error,please login again',path:'tpl/login.html'},
        {code:20001, message:'User name or password does not match',path:'/'}
    ];
    var xhr = {
        search: function(code){
            for (var i=0;i< codes.length; i++){
                if (codes[i].code === code) {
                    return codes[i];
                }
            }
            return false;
        },
        getRequestURL: function(options){
            var host = apiServerHost || window.location.host;
            var port = options.port || window.location.port;
            var query = options.query || {};
            var func = options.func || '';

            var apiServer = host + func +
                (appFunc.isEmpty(query) ? '' : '?');

            var name;
            for (name in query) {
                apiServer += name + '=' + query[name] + '&';
            }
            return apiServer.replace(/&$/gi, '');
        },

        ajaxCall: function(options,callback){
            options = options || {};
            options.data = options.data ? options.data : '';
            options.type = options.type || 'POST';
            $.ajax({
                url   : xhr.getRequestURL(options) ,
                type  : options.type,
                data  : options.data,
                async: false,  
                /*
                headers: {
                    //'key' :'asdas',
                },
                */
                beforeSend: function(xhrs, settings){
                    XL.showPreloader('请求数据');
                },
                complete: function(xhrs, status){
                    setTimeout(function(){
                        XL.hidePreloader();
                    },500);
                    
                },
                error:function(xhrs, errorType, error){
                    var codeLevel = xhr.search(xhrs.status);
                    $.toast(codeLevel.message);
                    //NMAPP.alert(codeLevel.message);
                    /*
                    switch(xhr.status){
                        case 404 :
                            NMAPP.alert(codeLevel.message);
                        break;
                        case 500 :
                            NMAPP.alert(codeLevel.message);
                        break;
                        default:
                            NMAPP.alert('未知错误');
                        break;
                    }
                    */
                },
                success:function(data){
                    var codeLevel = xhr.search(data.code);
                    if(!codeLevel){
                        (typeof(callback) === 'function') ? callback(data) : '';
                    }else{
                        $.toast(codeLevel.message);
                    }
                    
                }
            });

        }

    };

    return xhr;
});
