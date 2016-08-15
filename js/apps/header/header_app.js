define(["app", "apps/header/list/list_controller"], function(RootApp, ListController){
  RootApp.module("HeaderApp", function(HeaderApp, RootApp, Backbone, Marionette, $, _){
      //定义对外API接口
      var API = {
          listHeader: function(){
              //展现header的view
              ListController.listHeader();
          }
      };
      //建立激活header的命令
      RootApp.commands.setHandler("set:active:header", function(name){
          //从数据逻辑层面上去激活header(本质是设置header的model值)
          ListController.setActiveHeader(name);
      });
      //监听启动事件
      HeaderApp.on("start", function(){
          API.listHeader();
      });
  });
  return RootApp.HeaderApp;
});
