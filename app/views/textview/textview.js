var createViewModel = require("../diary/text/text-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');

function onLoad(args){
  var page = args.object;
  if(!Sqlite.exists("populated.db")) {
          Sqlite.copyDatabase("populated.db");
      }
  (new Sqlite("populated.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS dialouge (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, question TEXT, timestamp INT)").then(id => {
             page.bindingContext = createViewModel(db);
             console.log("Databse saved!");
         }, error => {
             console.log("CREATE TABLE ERROR", error);
         });
     }, error => {
         console.log("OPEN DB ERROR", error);
     });
}
exports.onLoad = onLoad;
