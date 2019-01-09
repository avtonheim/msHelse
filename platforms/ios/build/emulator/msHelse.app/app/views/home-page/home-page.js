var createViewModel = require("../diary/mood/mood-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var frameModule = require('ui/frame');

var builder = require('ui/builder');
var fs = require('file-system');

function onLoaded(){
  //Controlling the native back-button
  var controller = frameModule.topmost().ios.controller;
  var navigationItem = controller.visibleViewController.navigationItem;
  navigationItem.setHidesBackButtonAnimated(true, false);
} exports.onLoaded = onLoaded;

function onLoadedGraph(args){
  var page = args.object;

  if(!Sqlite.exists("populated.db")) {
    Sqlite.copyDatabase("populated.db");
}
(new Sqlite("populated.db")).then(db => {
   db.execSQL("CREATE TABLE IF NOT EXISTS mood (id INTEGER PRIMARY KEY AUTOINCREMENT, moodState INT, timestamp INT)").then(id => {
        page.bindingContext = createViewModel(db);
   }, error => {
       console.log("CREATE TABLE ERROR", error);
   });
}, error => {
   console.log("OPEN DB ERROR", error);
});

 /* var stackLayout = page.getViewById('mood');
  var path = fs.knownFolders.currentApp().path;
  var componentJS = require(path + '/views/graphs/patientOverview/moodgraph.js');
  var component = builder.load(path + '/views/graphs/patientOverview/moodgraph.xml', componentJS);
  stackLayout.addChild(component);*/

} exports.onLoadedGraph = onLoadedGraph;



function tapInfo(){
  frameModule.topmost().navigate('views/information/information');
} exports.tapInfo = tapInfo;

function onTap(){
  frameModule.topmost().navigate('views/training/training');
}
exports.onTap = onTap;

function tapDiary(){
  frameModule.topmost().navigate('views/diary/diary');
}
exports.tapDiary = tapDiary;

function tapVisual(){
  frameModule.topmost().navigate('views/visualisationmain/visualisationmain');
}
exports.tapVisual = tapVisual;

function tapTodo(){
  frameModule.topmost().navigate('views/listmain/listmain');
}
exports.tapTodo = tapTodo;

function tapHome(){
  frameModule.topmost().navigate('views/home-page/home-page');
}
exports.tapHome = tapHome;
