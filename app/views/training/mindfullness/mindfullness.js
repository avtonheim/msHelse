var animate = require("ui/animation");
var frameModule = require("ui/frame")

function pageLoaded(args) {

} exports.pageLoaded = pageLoaded;

function startMind(args) {
  var page = args.object;
  var view = page.getViewById("view");
  view.animate({
    rotate: 360,
    duration: 8000
});
} exports.startMind = startMind;

function stopMind(){
  frameModule.topmost().navigate("views/training/training");
} exports.stopMind = stopMind;
