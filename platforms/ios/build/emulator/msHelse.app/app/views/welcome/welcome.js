var viewModule = require("ui/core/view");
var frameModule = require('ui/frame');
var page;

function onLoaded(args){
  page = args.object;
  var view = page.getViewById("view");
  view.animate({
      scale: { x: 1.5, y: 1.5},
      duration: 600
  })
  .then(function(){
      return args.object.animate({
        opacity: 0,
        duration: 900
      });
  })
  .then(function(){
    frameModule.topmost().navigate("views/home-page/home-page");
  });
}
exports.onLoaded = onLoaded;
