define(["app", "apps/contacts/edit/edit_view"], function(RootApp, View){
  RootApp.module("ContactsApp.Edit", function(Edit, RootApp, Backbone, Marionette, $, _){
    Edit.Controller = {
      editContact: function(id){
        require(["common/views", "entities/contact"], function(CommonViews){
          var loadingView = new CommonViews.Loading({
            title: "Artificial Loading Delay",
            message: "Data loading is delayed to demonstrate using a loading view."
          });
          RootApp.regions.main.show(loadingView);

          var fetchingContact = RootApp.request("contact:entity", id);
          $.when(fetchingContact).done(function(contact){
            var view;
            if(contact !== undefined){
              view = new View.Contact({
                model: contact,
                generateTitle: true
              });

              view.on("form:submit", function(data){
                if(contact.save(data)){
                  RootApp.trigger("contact:show", contact.get('id'));
                }
                else{
                  view.triggerMethod("form:data:invalid", contact.validationError);
                }
              });
            }
            else{
              view = new RootApp.ContactsApp.Show.MissingContact();
            }

            RootApp.regions.main.show(view);
          });
        });
      }
    };
  });

  return RootApp.ContactsApp.Edit.Controller;
});
