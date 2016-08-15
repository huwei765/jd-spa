define(["app"], function(RootApp){
    RootApp.module("Common", function(Common, RootApp, Backbone, Marionette, $, _){
        //内部封装的API
        var API = {
            loadDialog : function(view){
                require(["common/dialog"],function(Dialog){
                    Dialog.load(view);
                });
            },
            loadLoading:function(region,args){
                require(["common/loading"],function(loading){
                    loading.attach(region,args);
                });
            }
        };
        //监听dialog事件
        RootApp.on("common:dialog",function(view){
            API.loadDialog(view);
        });
        //监听loading事件
        RootApp.on("common:loading",function(region,args){
            console.log("x1");
            API.loadLoading(region,args);
        });
        //对外暴露的接口
        Common.loadingFun = function(region,args){
            API.loadLoading(region,args);
        };
    });

  return RootApp.Common;
});
