var frameModule = require("ui/frame");


function onLoaded(args){
var page = args.object;
page.bindingContext = { someProperty : 80};
}
exports.onLoaded = onLoaded;


function navText(){
  frameModule.topmost().navigate('views/diary/text/text');
}
exports.navText = navText; 
