var createViewModel = require("./textview-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');

function onLoad(args){
  var page = args.object;
  (new Sqlite("my.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS dialouge (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, timestamp INT").then(id => {
             page.bindingContext = createViewModel(db, page.navigationContext.id);
              console.log("Database Saved!");
         }, error => {
             console.log("CREATE TABLE ERROR", error);
         });
     }, error => {
         console.log("OPEN DB ERROR", error);
     });
}
exports.onLoad = onLoad;
