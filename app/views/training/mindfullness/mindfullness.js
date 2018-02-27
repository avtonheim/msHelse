var animationModule = require("ui/animation");
var frameModule = require("ui/frame")
var Observable = require("data/observable").Observable;
var pageData = new Observable();

function pageLoaded(args) {
    var page = args.object;
    pageData.set("instruction0", true);
    pageData.set("instruction1", true);
    pageData.set("instruction2", true);
    args.object.bindingContext = pageData;
}

function startMind(args) {
  var page = args.object;
  var view = page.getViewById("view");

view.animate({ opacity: 2 })
    .then(function () {
      pageData.set("instruction0", !pageData.get("instruction0"));
     })
    .then(function () { return view.animate({ scale: { x: 1, y: 1 }, duration: 5000, rotate: 70 }); })
    .then(function () {
      pageData.set("instruction0", !pageData.get("instruction0"));
      pageData.set("instruction1", !pageData.get("instruction1"));
    })
    .then(function () { return view.animate({ scale: { x: 0.5, y: 0.5 }, duration: 5000, rotate: 0 }); })
    .then(function () {
      pageData.set("instruction0", !pageData.get("instruction0"));
      pageData.set("instruction1", !pageData.get("instruction1"));
     })
    .then(function () { return view.animate({ scale: { x: 1, y: 1 }, duration: 5000, rotate: 70 }); })
    .then(function () {
      pageData.set("instruction0", !pageData.get("instruction0"));
      pageData.set("instruction1", !pageData.get("instruction1")); })
    .then(function () { return view.animate({ scale: { x: 0.5, y: 0.5 }, duration: 5000, rotate: 0 }); })
    .then(function () {
      pageData.set("instruction0", !pageData.get("instruction0"));
      pageData.set("instruction1", !pageData.get("instruction1")); })
    .then(function () { return view.animate({ scale: { x: 1, y: 1 }, duration: 5000, rotate: 70 }); })
    .then(function () {
      pageData.set("instruction0", !pageData.get("instruction0"));
      pageData.set("instruction1", !pageData.get("instruction1")); })
    .then(function () { return view.animate({ scale: { x: 0.5, y: 0.5 }, duration: 5000, rotate: 0 }); })
    .then(function () {
      pageData.set("instruction0", !pageData.get("instruction0"));
      pageData.set("instruction1", !pageData.get("instruction1")); })
    .then(function () { return view.animate({ scale: { x: 1, y: 1 }, duration: 5000, rotate: 70 }); })
    .then(function () {
      pageData.set("instruction0", !pageData.get("instruction0"));
      pageData.set("instruction1", !pageData.get("instruction1")); })
    .then(function () { return view.animate({ scale: { x: 0.5, y: 0.5 }, duration: 5000, rotate: 0 }); })
    .then(function () {
      pageData.set("instruction0", !pageData.get("instruction0"));
      pageData.set("instruction1", !pageData.get("instruction1")); })
    .then(function () { return view.animate({ scale: { x: 1, y: 1 }, duration: 5000, rotate: 70 }); })
    .then(function () {
      pageData.set("instruction0", !pageData.get("instruction0"));
      pageData.set("instruction1", !pageData.get("instruction1")); })
    .then(function () { return view.animate({ scale: { x: 0.5, y: 0.5 }, duration: 7000, rotate: 0 }); })
    .then(function () {
      pageData.set("instruction1", !pageData.get("instruction1"));
      pageData.set("instruction2", !pageData.get("instruction2")); })
      .catch(function (e) {
      console.log(e.message);
    });
}

function stopMind(args){
  frameModule.topmost().navigate("views/training/training");
}

exports.stopMind = stopMind;
exports.pageLoaded = pageLoaded;
exports.startMind = startMind;
