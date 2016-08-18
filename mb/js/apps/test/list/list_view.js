define(["app",
        "tpl!apps/test/list/templates/layout.tpl",
        "tpl!apps/test/list/templates/panel.tpl",
        "tpl!apps/test/list/templates/none.tpl",
        "tpl!apps/test/list/templates/list.tpl",
        "tpl!apps/test/list/templates/list_item.tpl"],
    function(RootApp, layoutTpl, panelTpl, noneTpl, listTpl, listItemTpl){
        RootApp.module("TestApp.List.View", function(View, RootApp, Backbone, Marionette, $, _){
            //定义layout
            View.Layout = Marionette.LayoutView.extend({
                template: layoutTpl,
                regions: {
                    panelRegion: "#panel-region",
                    TestRegion: "#test-region"
                }
            });
            //定义panel
            View.Panel = Marionette.ItemView.extend({
                template: panelTpl,
                triggers: {
                    "click a.tip-btn": "test:new"
                }
            });
            //定义单条数据记录
            View.test = Marionette.ItemView.extend({
                tagName: "div",
                className: "item-test bdb-1px",
                template: listItemTpl,

                triggers: {
                    "click a.ia-r": "test:edit"
                },
                events: {
                    "click": "choseSelect"
                },

                flash: function(cssClass){
                    var $view = this.$el;
                    $view.hide().toggleClass(cssClass).fadeIn(800, function(){
                        setTimeout(function(){
                            $view.toggleClass(cssClass)
                        }, 500);
                    });
                },

                choseSelect: function(e){
                    this.$el.toggleClass("warning");
                },

                remove: function(){
                    var self = this;
                    this.$el.fadeOut(function(){
                        Marionette.ItemView.prototype.remove.call(self);
                    });
                }
            });

            var NoContactsView = Marionette.ItemView.extend({
                template: noneTpl,
                tagName: "div",
                className: "alert"
            });
            //定义多条数据列表
            View.tests = Marionette.CompositeView.extend({
                tagName: "div",
                className: "Testess",
                template: listTpl,
                emptyView: NoContactsView,
                childView: View.test,
                childViewContainer: "div.Testess_bd",

                initialize: function(){
                    this.listenTo(this.collection, "reset", function(){
                        this.attachHtml = function(collectionView, childView, index){
                            collectionView.$el.append(childView.el);
                        }
                    });
                },

                onRenderCollection: function(){
                    this.attachHtml = function(collectionView, childView, index){
                        collectionView.$el.prepend(childView.el);
                    }
                }
            });
        });

        return RootApp.TestApp.List.View;
    });