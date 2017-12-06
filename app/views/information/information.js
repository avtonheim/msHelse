var utilityModule = require("utils/utils");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = { };
}
exports.pageLoaded = pageLoaded;

exports.launchNevroNel = function() {
    utilityModule.openUrl("http://nevro.legehandboka.no/handboken/sykdommer/demyeliniserende-sykdommer/ms/kort-om-ms/");
}
exports.launchMSforbundet = function() {
    utilityModule.openUrl("http://www.ms.no");
}
exports.launchMSveileder = function() {
    utilityModule.openUrl("https://helse-bergen.no/norsk-ms-veileder");
}
