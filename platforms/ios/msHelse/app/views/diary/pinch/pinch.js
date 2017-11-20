//var createViewModel = require("./pinch-view-model").createViewModel;
//var Sqlite = require("nativescript-sqlite");
var gestures = require("ui/gestures");
var labelModule = require("ui/label");
var frameModule = require('ui/frame');

function onLoaded(args){
var page = args.object;
page.bindingContext = { someProperty : 30};
} exports.onLoaded = onLoaded;


function navSymptom(){
  frameModule.topmost().navigate('views/diary/symptoms/symptoms');
}
exports.navSymptom = navSymptom;
