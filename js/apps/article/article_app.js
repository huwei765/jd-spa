define(["app"], function(RootApp){
    RootApp.module("ArticleApp", function(ArticleApp, RootApp, Backbone, Marionette, $, _){
        //监听启动
        ArticleApp.on("start",function(args){
            //子模块启动时开始做些初始化的操作
            if(args){
                console.log("ContactsApp start");
            }
        });
  });
  return RootApp.ArticleApp;
});
