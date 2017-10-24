var frameModule = require('ui/frame');

function onLoaded(args){
  var page = args.object;
  page.bindingContext = { someProperty : 20};
}
exports.onLoaded = onLoaded;


function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}
exports.tapHome = tapHome;


function onNavPinch(){
  frameModule.topmost().navigate('views/diary/pinch/pinch');
}
exports.onNavPinch = onNavPinch;
