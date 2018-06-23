var frameModule = require("ui/frame");
var createViewModel = require("./text-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var Dialogs = require("ui/dialogs");


function onNavigatingTo(args){
var page = args.object;
var keyboard = page.getViewById("subject");
keyboard._ios.returnKeyType = UIReturnKeyDone;

//Controlling the native back-button
var controller = frameModule.topmost().ios.controller;
var navigationItem = controller.visibleViewController.navigationItem;
navigationItem.setHidesBackButtonAnimated(true, false);
if (!Sqlite.exists("populated.db")) {
        Sqlite.copyDatabase("populated.db");
    }
(new Sqlite("populated.db")).then(db => {
       db.execSQL("CREATE TABLE IF NOT EXISTS dialouge (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, timestamp INT)").then(id => {
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


function selected(args){
  var selected = args.object;
  selected.backgroundColor = "gray";
}

exports.onNavigatingTo = onNavigatingTo;
exports.tapHome = tapHome;
exports.selected = selected;
