var frameModule = require("ui/frame");

function onLoaded(args){
var page = args.object;
page.bindingContext = { someProperty : 100};
}
exports.onLoaded = onLoaded;

function finishDiary(){
  frameModule.topmost().navigate('views/home-page/home-page');
}
exports.finishDiary = finishDiary;
