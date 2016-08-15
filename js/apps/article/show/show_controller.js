define(["app", "apps/contacts/show/show_view"], function(RootApp, View){
  RootApp.module("ContactsApp.Show", function(Show, RootApp, Backbone, Marionette, $, _){
    Show.Controller = {
      showContact: function(id){
        require(["common/views", "entities/contact"], function(CommonViews){
          var loadingView = new CommonViews.Loading({
            title: "Artificial Loading Delay",
            message: "Data loading is delayed to demonstrate using a loading view."
          });
          RootApp.regions.main.show(loadingView);

          var fetchingContact = RootApp.request("contact:entity", id);
          $.when(fetchingContact).done(function(contact){
            var contactView;
            if(contact !== undefined){
              contactView = new View.Contact({
                model: contact
              });

              contactView.on("contact:edit", function(contact){
                RootApp.trigger("contact:edit", contact.get("id"));
              });
            }
            else{
              contactView = new View.MissingContact();
            }

            RootApp.regions.main.show(contactView);
          });
        });
      }
    }
  });

  return RootApp.ContactsApp.Show.Controller;
});
