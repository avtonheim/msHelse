var FrameModule = require("ui/frame");
var createViewModel = require("./text-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");

function onLoaded(args){
var page = args.object;
page.bindingContext = { someProperty : 100};
(new Sqlite("my.db")).then(db => {
       db.execSQL("CREATE TABLE IF NOT EXISTS text (id INTEGER PRIMARY KEY AUTOINCREMENT, textItem TEXT)").then(id => {
           page.bindingContext = createViewModel(db);
       }, error => {
           console.log("CREATE TABLE ERROR", error);
       });
   }, error => {
       console.log("OPEN DB ERROR", error);
   });
}
exports.onLoaded = onLoaded;

function finishDiary(){
  FrameModule.topmost().navigate('views/home-page/home-page');
}
exports.finishDiary = finishDiary;
