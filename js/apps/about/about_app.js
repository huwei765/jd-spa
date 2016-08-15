define(["app"], function(RootApp){
    RootApp.module("AboutApp",function(AboutApp,RootApp){
        //设置本模块在主模块启动时不自动加载启动
        AboutApp.startWithParent = false;
        //定义执行action的方法
        var executeAction = function(action, arg){
            RootApp.startSubApp("AboutApp");//启动子程序
            action(arg);//执行action
            //执行命令：激活header组件数据(启动contacts时，同时启动header组件)
            RootApp.execute("set:active:header", "about");
        };
        //内部封装的API
        var API = {
            showAbout: function(){
                require(["apps/about/show/show_controller"], function(ShowController,arg){
                    executeAction(ShowController.showAbout, arg);
                });
            }
        };
        //对外通信方式一
        RootApp.on("about:show", function(){
            RootApp.navigate("about");
            API.showAbout();
        });
    });

  return RootApp.AboutApp;
});
