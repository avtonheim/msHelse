var frameModule = require("ui/frame");
var createViewModel = require("../diary/symptoms/symptoms-view-model").createViewModel;
var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");

exports.pageLoaded = function(args) {
  var page = args.object;
  (new Sqlite("my.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS symptoms (id INTEGER PRIMARY KEY AUTOINCREMENT, symptom TEXT, timestamp INT)").then(id => {
             page.bindingContext = createViewModel(db);
              console.log("Database Saved!");
         }, error => {
             console.log("CREATE TABLE ERROR", error);
         });
     }, error => {
         console.log("OPEN DB ERROR", error);
     });
};
