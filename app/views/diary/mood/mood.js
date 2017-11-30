var createViewModel = require("./mood-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var labelModule = require("ui/label");
var frameModule = require('ui/frame');

function onLoaded(args){
var page = args.object;
page.bindingContext = { someProperty : 30};

(new Sqlite("my.db")).then(db => {
       db.execSQL("CREATE TABLE IF NOT EXISTS mood (id INTEGER PRIMARY KEY AUTOINCREMENT, moodVal INT, timestamp INT)").then(id => {
           page.bindingContext = createViewModel(db);
            console.log("Database Saved!");
       }, error => {
           console.log("CREATE TABLE ERROR", error);
       });
   }, error => {
       console.log("OPEN DB ERROR", error);
   });

} exports.onLoaded = onLoaded;


function navSymptom(){
  frameModule.topmost().navigate('views/diary/symptoms/symptoms');
}
exports.navSymptom = navSymptom;
