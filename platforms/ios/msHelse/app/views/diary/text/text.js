var FrameModule = require("ui/frame");

function onLoaded(args){
var page = args.object;
page.bindingContext = { someProperty : 100};
}
exports.onLoaded = onLoaded;

function tapBackList(){
  frameModule.topmost().navigate('views/diary/lists/lists');
} exports.tapBackList = tapBackList;

function finishDiary(){
  FrameModule.topmost().navigate('views/home-page/home-page');
}
exports.finishDiary = finishDiary;
