var createViewModel = require("./symptoms-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');

/*
Sjå på denne! https://docs.nativescript.org/cookbook/ui/switch
*/

function onNavigatingTo(args){
  var page = args.object;
  //page.bindingContext = { someProperty : 50};
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
exports.onNavigatingTo = onNavigatingTo;
/*
function expandCard(args){
   var btn = args.object;
   btn.height = "400px";


} exports.expandCard = expandCard;

function exitCard(args){
  var page = args.object;
  var reduceCard = page.getViewById("symptomC");

  reduceCard.height = "100px";
} exports.exitCard = exitCard;
*/

function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}
exports.tapHome = tapHome;

function onNavText(){
  frameModule.topmost().navigate('views/diary/text/text');
}
exports.onNavText = onNavText;
