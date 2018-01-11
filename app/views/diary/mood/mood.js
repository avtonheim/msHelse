var createViewModel = require("./mood-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var labelModule = require("ui/label");
var frameModule = require('ui/frame');

function onNavigatingTo(args){
var page = args.object;
//Controlling the native back-button
var controller = frameModule.topmost().ios.controller;
var navigationItem = controller.visibleViewController.navigationItem;
navigationItem.setHidesBackButtonAnimated(true, false);
page.bindingContext = { someProperty : 30};
if (!Sqlite.exists("populated.db")) {
        Sqlite.copyDatabase("populated.db");
    }
(new Sqlite("populated.db")).then(db => {
       db.execSQL("CREATE TABLE IF NOT EXISTS mood (id INTEGER PRIMARY KEY AUTOINCREMENT, moodState INT, timestamp INT)").then(id => {
           page.bindingContext = createViewModel(db);
            console.log("Database Saved!");
       }, error => {
           console.log("CREATE TABLE ERROR", error);
       });
   }, error => {
       console.log("OPEN DB ERROR", error);
   });

} exports.onNavigatingTo = onNavigatingTo;


function navSymptom(){
  frameModule.topmost().navigate('views/diary/symptoms/symptoms');
}
exports.navSymptom = navSymptom;
