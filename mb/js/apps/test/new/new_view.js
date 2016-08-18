define(["app","tpl!apps/test/new/templates/layout.tpl","tpl!apps/test/new/templates/item.tpl","tpl!apps/test/new/templates/panel.tpl"],function(RootApp,layoutTpl,itemTpl,panelTpl){
    RootApp.module("TestApp.New.View",function(View,RootApp,Backbone,Marionette,$, _){
        //定义layoutView
        View.Layout = Marionette.LayoutView.extend({
            template:layoutTpl,
            regions:{
                content_region:".common-wrapper",
                panel_region:".check-btn-auto"
            }
        });
        //定义content view
        View.Content = Marionette.ItemView.extend({
            template:itemTpl,
            tagName:"div",
            tagClass:"Testess02",
            formSubmit:function(){
                var data = {
                    "userName" : this.$el.find("input[name='Testess.name']").val(),
                    "phoneNumber" : this.$el.find("input[name='Testess.mobile']").val(),
                    "area_combo" : "hello",
                    "detail" : "111",
                    "provinceId" : "1",
                    "cityId" : "2",
                    "areaId" : "3"
                };
                this.trigger("form1:submit1",data);
            }
        });
        //定义panel view
        View.Panel = Marionette.ItemView.extend({
            template:panelTpl,
            triggers:{
                "click #submitId":"test:save"
            }
        });
    });
    return RootApp.TestApp.New.View;
});