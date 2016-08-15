define(["app", "apps/contacts/list/list_view"], function(RootApp, View){
  RootApp.module("ContactsApp.List", function(List, RootApp, Backbone, Marionette, $, _){
    List.Controller = {
      listContacts: function(criterion){
        require(["common/loading","entities/contact"], function(Loading){
            //直接依赖于loading
            Loading.attach(RootApp.regions.main);

          var fetchingContacts = RootApp.request("contact:entities");

          var contactsListLayout = new View.Layout();
          var contactsListPanel = new View.Panel();

          require(["entities/common"], function(FilteredCollection){
            $.when(fetchingContacts).done(function(contacts){
              var filteredContacts = RootApp.Entities.FilteredCollection({
                collection: contacts,
                filterFunction: function(filterCriterion){
                  var criterion = filterCriterion.toLowerCase();
                  return function(contact){
                    if(contact.get('firstName').toLowerCase().indexOf(criterion) !== -1
                      || contact.get('lastName').toLowerCase().indexOf(criterion) !== -1
                      || contact.get('phoneNumber').toLowerCase().indexOf(criterion) !== -1){
                        return contact;
                    }
                  };
                }
              });

              if(criterion){
                filteredContacts.filter(criterion);
                contactsListPanel.once("show", function(){
                  contactsListPanel.triggerMethod("set:filter:criterion", criterion);
                });
              }

              var contactsListView = new View.Contacts({
                collection: filteredContacts
              });

              contactsListPanel.on("contacts:filter", function(filterCriterion){
                filteredContacts.filter(filterCriterion);
                RootApp.trigger("contacts:filter", filterCriterion);
              });

              contactsListLayout.on("show", function(){
                contactsListLayout.panelRegion.show(contactsListPanel);
                contactsListLayout.contactsRegion.show(contactsListView);
              });

              contactsListPanel.on("contact:new", function(){
                require(["apps/contacts/new/new_view"], function(NewView){
                  var newContact = RootApp.request("contact:entity:new");

                  var view = new NewView.Contact({
                    model: newContact
                  });

                  view.on("form:submit", function(data){
                    if(contacts.length > 0){
                      var highestId = contacts.max(function(c){ return c.id; }).get("id");
                      data.id = parseInt(highestId) + 1;
                    }
                    else{
                      data.id = 1;
                    }
                    if(newContact.save(data)){
                      contacts.add(newContact);
                      view.trigger("dialog:close");
                      var newContactView = contactsListView.children.findByModel(newContact);
                      // check whether the new contact view is displayed (it could be
                      // invisible due to the current filter criterion)
                      if(newContactView){
                        newContactView.flash("success");
                      }
                    }
                    else{
                      view.triggerMethod("form:data:invalid", newContact.validationError);
                    }
                  });

                  RootApp.trigger("common:dialog",view);
                });
              });

              contactsListView.on("childview:contact:show", function(childView, args){
                RootApp.trigger("contacts:show", args.model.get("id"));
              });

              contactsListView.on("childview:contact:edit", function(childView, args){
                require(["apps/contacts/edit/edit_view"], function(EditView,DialogEx){
                  var model = args.model;
                  var view = new EditView.Contact({
                    model: model
                  });

                  view.on("form:submit", function(data){
                    if(model.save(data)){
                      childView.render();
                      view.trigger("dialog:close");
                      childView.flash("success");
                    }
                    else{
                      view.triggerMethod("form:data:invalid", model.validationError);
                    }
                  });

                  RootApp.trigger("common:dialog",view);
                });
              });

              contactsListView.on("childview:contact:delete", function(childView, args){
                args.model.destroy();
              });

              RootApp.regions.main.show(contactsListLayout);
            });
          });
        });
      }
    }
  });

  return RootApp.ContactsApp.List.Controller;
});
