define(["app", "apps/about/show/show_view"], function(RootApp, View){
  return {
    showAbout: function(){
      var view = new View.Message();
      RootApp.regions.main.show(view);
    }
  };
});
