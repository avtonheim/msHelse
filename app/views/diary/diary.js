var frameModule = require('ui/frame');

function onLoaded(args){
  var page = args.object;
  page.bindingContext = { someProperty : 20};
}
exports.onLoaded = onLoaded;


function onNavPinch(){
  frameModule.topmost().navigate('views/diary/pinch/pinch');
}
exports.onNavPinch = onNavPinch;
