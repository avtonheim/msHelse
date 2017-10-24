var gestures = require("ui/gestures");
var labelModule = require("ui/label");
var frameModule = require('ui/frame');

function onLoaded(args){
var page = args.object;
var pan = page.getViewById("panTouch");
pan.on(gestures.GestureTypes.pan, function(args) {
    console.log("Pan deltaX:" + args.deltaX + "; deltaY:" + args.deltaY + ";");
});
page.bindingContext = { someProperty : 30};
} exports.onLoaded = onLoaded;

function navSymptom(){
  frameModule.topmost().navigate('views/diary/symptoms/symptoms');
}
exports.navSymptom = navSymptom;
