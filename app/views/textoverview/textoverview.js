var createViewModel = require("../diary/text/text-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');

function onLoad(args){
  var page = args.object;
  (new Sqlite("my.db")).then(db => {
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


function textView(args){
frameModule.topmost().navigate('views/textview/textview');
} exports.textView = textView;
