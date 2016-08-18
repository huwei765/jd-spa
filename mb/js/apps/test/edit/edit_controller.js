define(["app", "apps/test/edit/edit_view"], function(RootApp, View){
    RootApp.module("TestApp.Edit", function(Edit, RootApp, Backbone, Marionette, $, _){
        Edit.Controller = {
            editTest: function(id){
                require(["common/loading", "entities/test"], function(Loading){
                    var loading_args = {
                        title: "Artificial Loading Delay",
                        message: "Data loading is delayed to demonstrate using a loading view."
                    };
                    //直接依赖于loading
                    Loading.attach(RootApp.regions.main,loading_args);
                    //声明异步请求对象
                    var fetchingTest = RootApp.request("rs:test:getTest", id);
                    //异步请求读取数据
                    $.when(fetchingTest).done(function(test){
                        var ItemView = new View.test({
                            model:test
                        });
                        //监听提交事件
                        ItemView.on("form:submit", function(data){
                            if(test.save(data)){
                                RootApp.trigger("test:list");
                            }
                            else{
                                ItemView.triggerMethod("form:data:invalid", test.validationError);
                            }
                        });

                        RootApp.regions.main.show(ItemView);
                    });
                });
            }
        };
    });

    return RootApp.TestApp.Edit.Controller;
});
