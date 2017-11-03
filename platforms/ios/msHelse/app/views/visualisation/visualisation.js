
var createViewModelSym = require("../diary/symptoms/symptoms-view-model").createViewModel;
var createViewModelTxt = require("../diary/text/text-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');
var Observable = require('data/Observable');

function onLoaded(args){
  page = args.object;
  (new Sqlite("my.db")).then(db => {
         db.execSQL("CREATE TABLE IF NOT EXISTS symptom (id INTEGER PRIMARY KEY AUTOINCREMENT, symptomItem TEXT)").then(id => {
             page.bindingContext = createViewModelSym(db);
             console.log("database saved!")
         }, error => {
             console.log("CREATE TABLE ERROR", error);
         });
     }, error => {
         console.log("OPEN DB ERROR", error);
     });

} exports.onLoaded = onLoaded;
