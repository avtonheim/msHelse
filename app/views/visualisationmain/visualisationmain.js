var frameModule = require('ui/frame');


function onLoaded(args){
var page = args.object;

var controller = frameModule.topmost().ios.controller;
var navigationItem = controller.visibleViewController.navigationItem;
navigationItem.setHidesBackButtonAnimated(true, false);
}
exports.onLoaded = onLoaded;

function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}
exports.tapHome = tapHome;

function tapGraph(){
  frameModule.topmost().navigate('views/visualisationmain/visualisation/visualisation');
}
exports.tapGraph = tapGraph;

function tapText(){
  frameModule.topmost().navigate('views/textoverview/textoverview');
} exports.tapText = tapText;

function tapReport(){
  frameModule.topmost().navigate('views/visualisationmain/consultation/consultation');
} exports.tapReport = tapReport;
