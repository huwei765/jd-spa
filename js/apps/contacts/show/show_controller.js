define(["app", "apps/contacts/show/show_view"], function(RootApp, View){
  RootApp.module("ContactsApp.Show", function(Show, RootApp, Backbone, Marionette, $, _){
    Show.Controller = {
      showContact: function(id){
        require(["common/loading","entities/contact"], function(Loading){
            //占位符
            var loading_args = {
                title: "Artificial Loading Delay",
                message: "Data loading is delayed to demonstrate using a loading view."
            };
            //直接依赖于loading
            Loading.attach(RootApp.regions.main,loading_args);

          var fetchingContact = RootApp.request("contact:entity", id);
          $.when(fetchingContact).done(function(contact){
            var contactView;
            if(contact !== undefined){
              contactView = new View.Contact({
                model: contact
              });

              contactView.on("contact:edit", function(contact){
                RootApp.trigger("contacts:edit", contact.get("id"));
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
