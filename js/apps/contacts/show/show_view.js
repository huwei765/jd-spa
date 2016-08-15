define(["app",
        "tpl!apps/contacts/show/templates/missing.tpl",
        "tpl!apps/contacts/show/templates/view.tpl"],
       function(RootApp, missingTpl, viewTpl){
  RootApp.module("ContactsApp.Show.View", function(View, RootApp, Backbone, Marionette, $, _){
    View.MissingContact = Marionette.ItemView.extend({
      template: missingTpl
    });

    View.Contact = Marionette.ItemView.extend({
      template: viewTpl,

      events: {
        "click a.js-edit": "editClicked"
      },

      editClicked: function(e){
        e.preventDefault();
        this.trigger("contact:edit", this.model);
      }
    });
  });

  return RootApp.ContactsApp.Show.View;
});
