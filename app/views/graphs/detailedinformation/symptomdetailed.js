var frameModule = require("ui/frame");
var createViewModel = require("../../diary/symptoms/symptoms-view-model").createViewModel;
var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");
var segmentedBarModule = require("tns-core-modules/ui/segmented-bar");


exports.pageLoaded = function(args) {
  var page = args.object;
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
};
