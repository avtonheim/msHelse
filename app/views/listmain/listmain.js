var frameModule = require('ui/frame');

function onLoaded(args){
var page = args.object;

var controller = frameModule.topmost().ios.controller;
var navigationItem = controller.visibleViewController.navigationItem;
navigationItem.setHidesBackButtonAnimated(true, false);
} exports.onLoaded = onLoaded;

function navList(){
  frameModule.topmost().navigate('views/lists/lists');
}
exports.navList = navList;

function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}
exports.tapHome = tapHome;
