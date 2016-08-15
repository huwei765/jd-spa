define(["app", "apps/contacts/common/views"], function(RootApp, CommonViews){
  RootApp.module("ContactsApp.New.View", function(View, RootApp, Backbone, Marionette, $, _){
    View.Contact = CommonViews.Form.extend({
      title: "New Contact",

      onRender: function(){
        this.$(".js-submit").text("Create contact");
      }
    });
  });

  return RootApp.ContactsApp.New.View;
});
