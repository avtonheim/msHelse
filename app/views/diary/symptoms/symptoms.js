var frameModule = require('ui/frame');
var Observable = require('data/Observable');

function onLoaded(args){
  var page = args.object;
  page.bindingContext = { someProperty : 50};
}
exports.onLoaded = onLoaded;

function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}
exports.tapHome = tapHome;

function onNavText(){
  frameModule.topmost().navigate('views/diary/text/text');
}
exports.onNavText = onNavText;

function onTap(eventData){
  console.log("tap!", eventData.propertyName);
} exports.onTap = onTap;
