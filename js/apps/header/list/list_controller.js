define(["app", "apps/header/list/list_view"], function(RootApp, View){
  RootApp.module("HeaderApp.List", function(List, RootApp, Backbone, Marionette, $, _){
    List.Controller = {
        //展现header（从view层展现）
        listHeader: function(){
            require(["entities/header"], function(){
                var links = RootApp.request("header:entities");
                var headers = new View.Headers({collection: links});

                headers.on("brand:clicked", function(){
                    RootApp.trigger("contacts:list");
                });

                headers.on("childview:navigate", function(childView, model){
                    var trigger = model.get("navigationTrigger");
                    RootApp.trigger(trigger);
                });

                RootApp.regions.header.show(headers);
            });
        },
        //激活header(从model层设置数据)
        setActiveHeader: function(headerUrl){
            //通过reqres方式请求来自于另一个组件的数据信息（请求header entity的实体数据信息list）
            var links = RootApp.request("header:entities");
            //在获取的实体数据list中选中指定的那个数据实体
            var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
            //设置该数据实体的属性为：selected
            headerToSelect.select();
            //重置数据实体集合
            links.trigger("reset");
        }
    };
  });

  return RootApp.HeaderApp.List.Controller;
});
