define(["app","marionette"], function(RootApp,Marionette){
    var Router = Marionette.AppRouter.extend({
        appRoutes:{
            "contacts(/filter/criterion::criterion)":"listContacts",
            "contacts/:id": "showContact",
            "contacts/:id/edit": "editContact"
        }
    });
    //应答通信
    //命令通信
    var executeAction = function(appName,appTag,action,args){
        RootApp.startSubApp(appName);//启动子程序
        //在路由中通过执行命令，可以去执行action,好处就是：不用指定特定的app引用
        var cmd = "cmd:" + appTag + ":" + action;
        cmd = cmd.toLowerCase();//转化成小写
        RootApp.execute(cmd,args);
    };
    //事件通信
    var triggerAction = function(appName,appTag,action,args){
        //启动子程序
        //RootApp.startSubApp(appName);
        //组装事件
        var evt = appTag + ":" + action;
        evt = evt.toLowerCase();
        //触发事件
        RootApp.trigger(evt,args);
    };
    //声明API
    var API = {
        listContacts: function(criterion){
            triggerAction("ContactsApp","Contacts","list");
        },
        showContact: function(id){
            triggerAction("ContactsApp","Contacts","show",id);
        },
        editContact: function(id){
            triggerAction("ContactsApp","Contacts","edit",id);
        }
    };
    //实例化路由
    RootApp.on("before:start",function(){
        new Router({
            controller:API
        });
    });
    //默认启动路由
    RootApp.on("default",function(){
        API.listContacts();
    });
    return Router;
});
