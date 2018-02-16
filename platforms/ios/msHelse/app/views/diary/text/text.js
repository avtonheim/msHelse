var frameModule = require("ui/frame");
var createViewModel = require("./text-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");


function onNavigatingTo(args){
var page = args.object;
//page.bindingContext = {someProperty : 100};
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
           console.log("Databse saved!");
       }, error => {
           console.log("CREATE TABLE ERROR", error);
       });
   }, error => {
       console.log("OPEN DB ERROR", error);
   });
} exports.onNavigatingTo = onNavigatingTo;

function selected(args){
  var selected = args.object;
  selected.backgroundColor = "gray";

} exports.selected = selected;
