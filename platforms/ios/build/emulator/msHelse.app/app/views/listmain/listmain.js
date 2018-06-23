var frameModule = require('ui/frame');

function onLoaded(args){
    var page = args.object;
    page.enableSwipeBackNavigation = false;
    var controller = frameModule.topmost().ios.controller;
    var navigationItem = controller.visibleViewController.navigationItem;
    navigationItem.setHidesBackButtonAnimated(true, false);
}

function navList(){
  frameModule.topmost().navigate('views/lists/lists');
}

function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}

exports.tapHome = tapHome;
exports.navList = navList;
exports.onLoaded = onLoaded;
