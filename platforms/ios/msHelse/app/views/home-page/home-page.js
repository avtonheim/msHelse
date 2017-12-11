var frameModule = require('ui/frame');
var builder = require('ui/builder');
var fs = require('file-system');
var createViewModel = require("./home-page-view-model").createViewModel;
var LocalNotifications = require("nativescript-local-notifications");

exports.onLoaded = function(args){
  var page = args.object;
  var stackLayout = page.getViewById('mood');

  // Load our JS for the component
  var path = fs.knownFolders.currentApp().path;
  var componentJS = require(path + '/views/graphs/moodgraph.js');

  // Actually have the builder build the Component using the XML & JS.
  var component = builder.load(path + '/views/graphs/moodgraph.xml', componentJS);

  // And add our component to the visual tree
  stackLayout.addChild(component);

  LocalNotifications.requestPermission().then((granted) => {
        if(granted) {
            page.bindingContext = createViewModel();
        }
    })
}



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
