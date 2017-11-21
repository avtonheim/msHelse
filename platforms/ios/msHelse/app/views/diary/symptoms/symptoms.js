var createViewModel = require("./symptoms-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');
var Observable = require('data/Observable');

function onLoaded(args){
  var page = args.object;
  page.bindingContext = { someProperty : 50};
  (new Sqlite("my.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS symptom (id INTEGER PRIMARY KEY AUTOINCREMENT, symptomItem TEXT)").then(id => {
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
