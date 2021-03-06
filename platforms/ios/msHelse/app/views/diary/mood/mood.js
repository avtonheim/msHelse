var createViewModel = require("./mood-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var labelModule = require("ui/label");
var frameModule = require('ui/frame');
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
       db.execSQL("CREATE TABLE IF NOT EXISTS mood (id INTEGER PRIMARY KEY AUTOINCREMENT, moodState INT, timestamp INT)").then(id => {
           page.bindingContext = createViewModel(db);
       }, error => {
           console.log("CREATE TABLE ERROR", error);
       });
   }, error => {
       console.log("OPEN DB ERROR", error);
   });

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

function navSymptom(){
  frameModule.topmost().navigate('views/diary/symptoms/symptoms');
}

exports.onNavigatingTo = onNavigatingTo;
exports.tapHome = tapHome;
exports.navSymptom = navSymptom;
