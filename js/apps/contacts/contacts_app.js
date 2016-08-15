define(["app"], function(RootApp){
    RootApp.module("ContactsApp", function(ContactsApp, RootApp, Backbone, Marionette, $, _){
        //设置本模块在主模块启动时不自动加载启动
        ContactsApp.startWithParent = false;
        //定义执行action的方法
        var executeAction = function(action, arg){
            RootApp.startSubApp("ContactsApp");//启动子程序
            action(arg);//执行action
            //执行命令：激活header组件数据(启动contacts时，同时启动header组件)
            RootApp.execute("set:active:header", "contacts");
        };
        //对外提供服务接口
        var API = {
            listContacts: function(criterion){
                require(["apps/contacts/list/list_controller"], function(ListController){
                    executeAction(ListController.listContacts, criterion);
                });
            },

            showContact: function(id){
                require(["apps/contacts/show/show_controller"], function(ShowController){
                    executeAction(ShowController.showContact, id);
                });
            },

            editContact: function(id){
                require(["apps/contacts/edit/edit_controller"], function(EditController){
                    executeAction(EditController.editContact, id);
                });
            }
        };
        //对外通信方式一：事件
        RootApp.on("contacts:list",function(args){
            RootApp.navigate("contacts");
            API.listContacts();
        });
        RootApp.on("contacts:show",function(id){
            //单条数据展示
            RootApp.navigate("contacts/"+id);
            API.showContact(id);
        });
        RootApp.on("contacts:edit",function(id){
            RootApp.navigate("contacts/" + id + "/edit");
            API.editContact(id);
        });
        //对外通信方式二：命令
        RootApp.commands.setHandler("cmd:contactsapp:listcontacts",function(){
            RootApp.navigate("contacts");
            API.listContacts();
        });
        RootApp.commands.setHandler("cmd:contactsapp:showcontact",function(id){
            RootApp.navigate("contacts/"+id);
            API.showContact(id);
        });
        RootApp.commands.setHandler("cmd:contactsapp:editcontact",function(id){
            RootApp.navigate("contacts/" + id + "/edit");
            API.editContact(id);
        });
  });
  return RootApp.ContactsApp;
});
