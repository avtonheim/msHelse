var frameModule = require('ui/frame');

function onLoaded(args){
  var page = args.object;
  page.enableSwipeBackNavigation = true;
  var controller = frameModule.topmost().ios.controller;
  var navigationItem = controller.visibleViewController.navigationItem;
  navigationItem.setHidesBackButtonAnimated(true, false);
}
 
 function MindfullnessTap(){
   frameModule.topmost().navigate('views/training/mindfullness/mindfullness');
 }

 function tapHome(){
   frameModule.topmost().navigate('views/home-page/home-page');
 }

exports.onLoaded = onLoaded;
exports.MindfullnessTap = MindfullnessTap;
exports.tapHome = tapHome;
