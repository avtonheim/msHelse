var frameModule = require("ui/frame");
var createViewModel = require("../../diary/symptoms/symptoms-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");



exports.pageLoaded = function(args) {
  var page = args.object;
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
};
