define(function(){
    var lt = $.LTtemplate;

    var tplManager = {


        loadTpl: function(id){
            var tpl = $('#' + id).html();
            return tpl;
        },

        renderRemoteTpl: function(tplName,renderData,callback){
            tplName = tplName || '';
            $.get('page/' + tplName + '.tpl.html' ,function(markup){
                var compiledTemplate = lt.compile(markup);
                var output = compiledTemplate(renderData);

                typeof(callback === 'function') ? callback(output) : null;
            });

        },

        renderTpl: function(markup,renderData){
            var compiledTemplate = lt.compile(markup);
            var output = compiledTemplate(renderData);
            return output;
        },

        renderTplById: function(tplId,renderData){
            var markup = this.loadTpl(tplId);
            var compiledTemplate = lt.compile(markup);
            var output = compiledTemplate(renderData);
            return output;
        }

    };

    return tplManager;
});