var createViewModelMood = require("../../../diary/mood/mood-view-model").createViewModel;
var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");

exports.onLoad = function(args) {
/*Database for symptoms*/
 var page = args.object;
 /*Database for mood*/
 if (!Sqlite.exists("populated.db")) {
         Sqlite.copyDatabase("populated.db");
     }
 (new Sqlite("populated.db")).then(db => {
        db.execSQL("CREATE TABLE IF NOT EXISTS mood (id INTEGER PRIMARY KEY AUTOINCREMENT, moodState INT, timestamp INT)").then(id => {
            page.bindingContext = createViewModelMood(db);
             console.log("Database Saved!");
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });

};
