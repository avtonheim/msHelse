var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var createViewModel = require("../diary/mood/mood-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");

function onPageLoaded(args){
    var page = args.object;
   if(!Sqlite.exists("populated.db")) {
            Sqlite.copyDatabase("populated.db");
        }
    (new Sqlite("populated.db")).then(db => {
           db.execSQL("CREATE TABLE IF NOT EXISTS mood (id INTEGER PRIMARY KEY AUTOINCREMENT, moodState TEXT, timestamp INT)").then(id => {
                page.bindingContext = createViewModel(db);
                console.log("Database Saved!");
           }, error => {
               console.log("CREATE TABLE ERROR", error);
           });
       }, error => {
           console.log("OPEN DB ERROR", error);
       });

} exports.onPageLoaded = onPageLoaded;
