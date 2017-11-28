var FrameModule = require("ui/frame");
var createViewModel = require("./text-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");


function onLoaded(args){
var page = args.object;
page.bindingContext = {someProperty : 100};
(new Sqlite("my.db")).then(db => {
       db.execSQL("CREATE TABLE IF NOT EXISTS dialouge (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, timestamp INT)").then(id => {
           page.bindingContext = createViewModel(db);
           console.log("Databse saved!");
       }, error => {
           console.log("CREATE TABLE ERROR", error);
       });
   }, error => {
       console.log("OPEN DB ERROR", error);
   });
} exports.onLoaded = onLoaded;
