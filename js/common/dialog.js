define(["app","jquery-ui"], function(RootApp){
    RootApp.module("Common.Dialog", function(Dialog, RootApp, Backbone, Marionette, $, _){
        Dialog.load = function(view){
            //设置初始值
            //获取dialogRegion
            var current_region = Dialog.getDialogRegion();
            //注册onShow
            current_region.onShow = function(view){
                var self = this;
                var closeDialog = function(){
                    self.stopListening();
                    self.empty();
                    self.$el.dialog("destroy");
                };
                this.listenTo(view, "dialog:close", closeDialog);
                this.$el.dialog({
                    modal: true,
                    title: view.title,
                    width: "auto",
                    close: function(e, ui){
                        closeDialog();
                    }
                });
            };
            //触发show
            current_region.show(view);
        };
        //获取dialog区域
        Dialog.getDialogRegion = function(){
            var region_el = "#dialog-region";
            var _curRegion = RootApp.regions.getRegion('dialog');
            if(_curRegion){
                return _curRegion;
            }
            else{
                //添加Dialog区域
                RootApp.regions.addRegions({dialog:region_el});
                return RootApp.regions.getRegion('dialog');
            }
        };
    });

  return RootApp.Common.Dialog;
});
