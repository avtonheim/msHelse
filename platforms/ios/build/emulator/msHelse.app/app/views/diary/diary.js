var frameModule = require('ui/frame');

function onLoaded(args){
  var page = args.object;
  //Controlling the native back-button
  var controller = frameModule.topmost().ios.controller;
  var navigationItem = controller.visibleViewController.navigationItem;
  navigationItem.setHidesBackButtonAnimated(true, false);
  page.enableSwipeBackNavigation = false;
}

function onNavMood(){
  frameModule.topmost().navigate('views/diary/mood/mood');
}

function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}

exports.onLoaded = onLoaded;
exports.onNavMood = onNavMood;
exports.tapHome = tapHome;
