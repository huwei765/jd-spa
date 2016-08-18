define(['app'],function(RootApp){
    RootApp.module("TestApp",function(TestApp){
        //设置本模块在主模块启动时不自动加载启动
        TestApp.startWithParent = false;
        //定义执行action的方法
        var executeAction = function(action, arg){
            RootApp.startSubApp("TestApp");//启动子程序
            action(arg);//执行action
            //执行命令：激活header组件数据(启动contacts时，同时启动header组件)
            RootApp.execute("set:active:header", "test");
        };
        //对外提供服务接口
        var API = {
            listTest: function(criterion){
                require(["apps/test/list/list_controller"], function(ListController){
                    executeAction(ListController.listTests, criterion);
                });
            },
            editTest: function(id){
                require(["apps/test/edit/edit_controller"], function(EditController){
                    executeAction(EditController.editTest, id);
                });
            },
            newTest: function(){
                require(["apps/test/new/new_controller"], function(NewController){
                    executeAction(NewController.newTest);
                });
            }
        };
        //对外通信方式一：事件
        RootApp.on("test:list",function(args){
            RootApp.navigate("test");
            API.listTest();
        });
        RootApp.on("test:new",function(){
            RootApp.navigate("test/new");
            API.newTest();
        });
        RootApp.on("test:edit",function(id){
            RootApp.navigate("test/" + id + "/edit");
            API.editTest(id);
        });
    });
});