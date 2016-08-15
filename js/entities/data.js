define(["app"], function(RootApp){
  RootApp.module("Entities", function(Entities, RootApp, Backbone, Marionette, $, _) {
      var API = {
          //获取单个contact数据
          getContactEntity: function (id) {
              require(["entities/contact"],function(contactEntities){
                  return contactEntities.getContactEntity(id);
              });
          },
          //获取列表
          getContactEntities : function(){
              require(["entities/contact"],function(contactEntities){
                  console.log("x2");
                  return contactEntities.getContactEntities();
              });
          }
      };
      //对外提供server服务
      RootApp.reqres.setHandler("contact:entity", function (id) {
          return API.getContactEntity(id);
      });
      RootApp.reqres.setHandler("contact:entities", function () {
          console.log("x1");
          return API.getContactEntities();
      });
  });
  return RootApp.Entities;
});
