var createViewModel = require("../diary/text/text-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');

function onLoad(args){
  var page = args.object;
  (new Sqlite("my.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS dialouge (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, timestamp INT)").then(id => {
           page.bindingContext = createViewModel(db);
              console.log("Database Saved!");
         }, error => {
             console.log("CREATE TABLE ERROR", error);
         });
     }, error => {
         console.log("OPEN DB ERROR", error);
     });
}
exports.onLoad = onLoad;


function textView(args){
frameModule.topmost().navigate({moduleName: "views/textview/textview", context: {id: args.object.bindingContext.Texts.getItem(args.index).Id}});
} exports.textView = textView;
