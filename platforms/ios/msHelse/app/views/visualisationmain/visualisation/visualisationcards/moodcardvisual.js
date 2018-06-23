var createViewModel = require("../../../diary/mood/mood-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");

exports.onLoad = function(args) {
/*Database for Mood*/
var page = args.object;
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
};
