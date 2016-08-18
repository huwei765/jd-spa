define(["app","tpl!apps/test/edit/templates/item.tpl","backbone.syphon"],function(RootApp,itemTpl){
    RootApp.module("TestApp.Edit.View",function(View,RootApp, Backbone, Marionette, $, _){
        View.test = Marionette.ItemView.extend({
            tagName: "div",
            className: "common-wrapper",
            template: itemTpl,
            events: {
                "click a#submitId": "submitClicked"
            },
            submitClicked: function(e){
                e.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger("form:submit", data);
            }
        });
    });
    return RootApp.TestApp.Edit.View;
});