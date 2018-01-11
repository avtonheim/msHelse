var utilityModule = require("utils/utils");
var frameModule = require("ui/frame");

function onLoaded(args) {
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

exports.launchNevroNel = function() {
    utilityModule.openUrl("http://nevro.legehandboka.no/handboken/sykdommer/demyeliniserende-sykdommer/ms/kort-om-ms/");
}
exports.launchMSforbundet = function() {
    utilityModule.openUrl("http://www.ms.no");
}
exports.launchMSveileder = function() {
    utilityModule.openUrl("https://helse-bergen.no/norsk-ms-veileder");
}
