var animationModule = require("ui/animation");
var frameModule = require("ui/frame")
var Observable = require("data/observable").Observable;


function pageLoaded(args) {
    var page = args.object;

    var context = new Observable({ messageToUser: "Klikk på blomsten for å starte!" })
    page.bindingContext = context;
    //Change label's text
    context.set("messageToUser", "Fokuser på pusten din og klikk på blomsten for å starte.");

} exports.pageLoaded = pageLoaded;

function startMind(args) {
  var page = args.object;
  var view = page.getViewById("view");

view.animate({ opacity: 2, delay: 3000 })
    .then(function () { console.log("Pust inn"); })
    .then(function () { return view.animate({ scale: { x: 2, y: 2 }, duration: 5000, rotate: 360 }); })
    .then(function () { console.log("Pust ut"); })
    .then(function () { return view.animate({ scale: { x: 1, y: 1 }, duration: 5000, rotate: 0 }); })
    .then(function () { return view.animate({ scale: { x: 2, y: 2 }, duration: 5000, rotate: 360 }); })
    .then(function () { return view.animate({ scale: { x: 1, y: 1 }, duration: 5000, rotate: 0 }); })
    .then(function () { return view.animate({ scale: { x: 2, y: 2 }, duration: 5000, rotate: 360 }); })
    .then(function () { return view.animate({ scale: { x: 1, y: 1 }, duration: 5000, rotate: 0 }); })
    .then(function () { return view.animate({ scale: { x: 2, y: 2 }, duration: 5000, rotate: 360 }); })
    .then(function () { return view.animate({ scale: { x: 1, y: 1 }, duration: 5000, rotate: 0 }); })
    .then(function () { return view.animate({ scale: { x: 2, y: 2 }, duration: 5000, rotate: 360 }); })
    .then(function () { return view.animate({ scale: { x: 1, y: 1 }, duration: 6000, rotate: 180 }); })
    .then(function () {
    console.log("Animation finished");

})
    .catch(function (e) {
    console.log(e.message);
});

} exports.startMind = startMind;

function stopMind(args){
  frameModule.topmost().navigate("views/training/training");
} exports.stopMind = stopMind;
