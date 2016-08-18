define(["app", "apps/test/list/list_view"], function(RootApp, View){
    RootApp.module("TestsApp.List", function(List, RootApp, Backbone, Marionette, $, _){
        List.Controller = {
            listTests: function(criterion){
                require(["common/loading","entities/test"], function(Loading){
                    //直接依赖于loading
                    Loading.attach(RootApp.regions.main);
                    var fetchingTests = RootApp.request("rs:test:getTests");
                    var TestListLayout = new View.Layout();
                    var TestListPanel = new View.Panel();

                    //异步读取数据
                    $.when(fetchingTests).done(function(tests){
                        //实例化一个CompositeView
                        var TestListView = new View.tests({
                            collection: tests
                        });
                        //layout展现region
                        TestListLayout.on("show", function(){
                            TestListLayout.panelRegion.show(TestListPanel);
                            TestListLayout.TestRegion.show(TestListView);
                        });
                        //panelRegion响应Test:new事件
                        TestListPanel.on("test:new", function(){
                            RootApp.trigger("test:new");
                        });
                        //TestRegion(CompositeView)响应内部的itemView事件
                        TestListView.on("childview:test:edit", function(childView, args){
                            RootApp.trigger("test:edit", args.model.get("id"));
                        });
                        //TestRegion(CompositeView)响应内部的itemView事件
                        TestListView.on("childview:test:delete", function(childView, args){
                            args.model.destroy();
                        });
                        //展现layout
                        RootApp.regions.main.show(TestListLayout);
                    });
                });
            }
        }
    });

    return RootApp.TestsApp.List.Controller;
});
