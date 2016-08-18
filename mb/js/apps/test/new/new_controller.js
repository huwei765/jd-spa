define(["app","apps/test/new/new_view","backbone.syphon"],function(RootApp,View){
    RootApp.module("TestApp.New",function(New,RootApp,Backbone,Marionette){
        New.Controller = {
            newTest:function(){
                require(["common/loading","entities/test"],function(Loading){
                    //预加载
                    Loading.attach(RootApp.regions.main);
                    //实例化layout
                    var newLayout = new View.Layout();
                    var newPanel = new View.Panel();
                    //异步请求model数据
                    var fetchingTest = RootApp.request("rs:test:newTest");
                    $.when(fetchingTest).done(function(test){
                        //实例化一个content view
                        var newContent = new View.Content({
                            model:test
                        });
                        //展现content 和panel
                        newLayout.on("show",function(){
                            newLayout.getRegion("content_region").show(newContent);
                            newLayout.getRegion("panel_region").show(newPanel);
                        });
                        //panel监听新增消息
                        newPanel.on("test:save",function(){
                            newContent.formSubmit();
                        });
                        newContent.on("form1:submit1",function(data){
                            //请求collection数据
                            var fetchingTests = RootApp.request("rs:test:getTests");
                            $.when(fetchingTests).done(function(temp_Test){
                                //获取collection的最大id
                                if(temp_Test.length > 0){
                                    var highestId = temp_Test.max(function(c){ return c.id; }).get("id");
                                    data.id = parseInt(highestId) + 1;
                                }
                                else{
                                    data.id = 1;
                                }
                                //保存model 并同时增加collection
                                if(fetchingTest.save(data)){
                                    temp_Test.add(fetchingTest);
                                    RootApp.trigger("test:list");
                                }
                            });

                        });
                        //展现layout
                        RootApp.regions.getRegion("main").show(newLayout);
                    });
                });
            }
        }
    });
    return RootApp.TestApp.New.Controller;
});