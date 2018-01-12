var frameModule = require('ui/frame');

function onLoaded(args){
  var page = args.object;

  //Controlling the native back-button
  var controller = frameModule.topmost().ios.controller;
  var navigationItem = controller.visibleViewController.navigationItem;
  navigationItem.setHidesBackButtonAnimated(true, false);
}
exports.onLoaded = onLoaded;


function onNavMood(){
  frameModule.topmost().navigate('views/diary/mood/mood');
}
exports.onNavMood = onNavMood;

function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}
exports.tapHome = tapHome;
