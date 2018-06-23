var createViewModel = require("./symptoms-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');
var observable = require("data/observable");
var pageData = new observable.Observable();
var Dialogs = require("ui/dialogs");

function onNavigatingTo(args){
  var page = args.object;
  //Controlling the native back-button
  var controller = frameModule.topmost().ios.controller;
  var navigationItem = controller.visibleViewController.navigationItem;
  navigationItem.setHidesBackButtonAnimated(true, false);

  if (!Sqlite.exists("populated.db")) {
          Sqlite.copyDatabase("populated.db");
      }
      (new Sqlite("populated.db")).then(db => {
          db.execSQL("CREATE TABLE IF NOT EXISTS symptoms (id INTEGER PRIMARY KEY AUTOINCREMENT, symptom TEXT, morning INT, evening INT, timestamp INT)").then(id => {
              page.bindingContext = createViewModel(db);
          }, error => {
              console.log("CREATE TABLE ERROR", error);
          });
      }, error => {
          console.log("OPEN DB ERROR", error);
      });
}
function loaded(args){
  pageData.set("showDetails0", true);
  pageData.set("showDetails1", true);
  pageData.set("showDetails2", true);
  pageData.set("showDetails3", true);
  pageData.set("showDetails4", true);
  args.object.bindingContext = pageData;
}

function tapHome(){
  Dialogs.confirm({
      title: "Vil du avbryte?",
      okButtonText: "Ja",
      cancelButtonText: "Avbryt"
  }).then(function (result) {
      if (result === true) {
      frameModule.topmost().navigate('views/home-page/home-page');
    }
  });
}

function onNavText(){
  frameModule.topmost().navigate('views/diary/text/text');
}
/*Ugly workaround!!*/
function toggle0(args){
	pageData.set("showDetails0", !pageData.get("showDetails0"));
}
function toggle1(args){
	pageData.set("showDetails1", !pageData.get("showDetails1"));
}
function toggle2(args){
  pageData.set("showDetails2", !pageData.get("showDetails2"));
}
function toggle3(args){
	pageData.set("showDetails3", !pageData.get("showDetails3"));
}
function toggle4(args){
  pageData.set("showDetails4", !pageData.get("showDetails4"));
}

exports.onNavigatingTo = onNavigatingTo;
exports.loaded = loaded;
exports.tapHome = tapHome;
exports.onNavText = onNavText;
exports.toggle0 = toggle0;
exports.toggle1 = toggle1;
exports.toggle2 = toggle2;
exports.toggle3 = toggle3;
exports.toggle4 = toggle4;
