define(["marionette"], function(Marionette){
    //实例化主APP
    var RootApp = new Marionette.Application();
    //监听主程序启动:启动前渲染基本框架
    RootApp.on("before:start",function(){
        //主区域
        var RootRegion = Marionette.LayoutView.extend({
            el:"#app-container",
            regions:{
                header:"#header-region",
                main: "#main-region"
            }
        });
        RootApp.regions = new RootRegion();//注册RootApp的Regions
    });
    //监听子程序切换
    RootApp.on("switchApp",function(appName,args){
        RootApp.startSubApp(appName,args);
    });
    //启动子程序
    RootApp.startSubApp = function(appName, args){
        var currentApp = RootApp.getSubAppInstance(appName);
        if(currentApp === RootApp.currentApp){
            if(currentApp){
                currentApp.start(args);
            }
        }
        else{
            if(RootApp.currentApp){
                RootApp.currentApp.stop();
            }
            RootApp.currentApp = currentApp;
            if(currentApp){
                currentApp.start(args);
            }
        }
    };
    //监听主程序启动:启动时进入路由指定页面
    RootApp.on("start",function(){
        //判断是否创建路由，若有路由，则初始化路由，通过路由进入
        if(Backbone.history){
            //开启路由监控
            Backbone.history.start();
            //若当前路由为空，则设置进入默认路由
            if(RootApp.getCurrentRoute() === ""){
                //触发默认事件并进入默认路由
                RootApp.trigger("default");
            }
        }
    });
    //注册获取子程序方法
    RootApp.getSubAppInstance = function(appName){
        return appName ? RootApp.module(appName) : null;
    };
    //注册获取当前路由方法
    RootApp.getCurrentRoute = function(){
        return Backbone.history.fragment
    };
    //注册路由导航方法
    RootApp.navigate = function(route,  options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    };
  return RootApp;
});
