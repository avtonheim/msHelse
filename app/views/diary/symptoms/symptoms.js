var createViewModel = require("./symptoms-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');
var Observable = require('data/Observable');

function onLoaded(args){
  var page = args.object;
  page.bindingContext = { someProperty : 50};
  if (!Sqlite.exists("populated.db")) {
      Sqlite.copyDatabase("populated.db");
  }
  (new Sqlite("populated.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS symptoms (id INTEGER PRIMARY KEY AUTOINCREMENT, symptom TEXT, morning INT, evening INT, timestamp INT)").then(id => {
             page.bindingContext = createViewModel(db);
              console.log("Database Saved!");
         }, error => {
             console.log("CREATE TABLE ERROR", error);
         });
     }, error => {
         console.log("OPEN DB ERROR", error);
     });
}
exports.onLoaded = onLoaded;

function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}
exports.tapHome = tapHome;

function onNavText(){
  frameModule.topmost().navigate('views/diary/text/text');
}
exports.onNavText = onNavText;

function onsole(args){
  var symptomType = args.object.context;
  var eventVal = args.object.value; //day or night
  var eventTime = args.object.text;
  var morgonVal = 0;
  var kveldVal = 0;
    if(eventTime == "Kveld"){
      var kveldVal = 1;
  } if(eventTime == "Morgon"){
      var morgonVal = 1;
  }
  console.log("Morgon: " + morgonVal + " " + "Kveld: " + kveldVal);
} exports.onsole = onsole;
