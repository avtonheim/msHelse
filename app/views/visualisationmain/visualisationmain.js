var frameModule = require('ui/frame');

function onLoaded(args){
    var page = args.object;
    page.enableSwipeBackNavigation = false;
    var controller = frameModule.topmost().ios.controller;
    var navigationItem = controller.visibleViewController.navigationItem;
    navigationItem.setHidesBackButtonAnimated(true, false);
}

function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}

function tapGraph(){
  frameModule.topmost().navigate('views/visualisationmain/visualisation/visualisation');
}

function tapText(){
  frameModule.topmost().navigate('views/textoverview/textoverview');
}

function tapReport(){
  frameModule.topmost().navigate('views/visualisationmain/consultation/consultation');
}

exports.onLoaded = onLoaded;
exports.tapHome = tapHome;
exports.tapGraph = tapGraph;
exports.tapText = tapText;
exports.tapReport = tapReport;
