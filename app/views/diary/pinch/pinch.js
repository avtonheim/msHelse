//var createViewModel = require("./pinch-view-model").createViewModel;
//var Sqlite = require("nativescript-sqlite");
var gestures = require("ui/gestures");
var labelModule = require("ui/label");
var frameModule = require('ui/frame');

function onLoaded(args){
var page = args.object;
var label = page.getViewById("panTouch");
label.on(gestures.GestureTypes.touch, function (args) {
    console.log("Touch: x: " + args.getX() + " y: " + args.getY());
});
/*(new Sqlite("my.db")).then(db => {
    db.execSQL("CREATE TABLE IF NOT EXISTS pinch (id INTEGER PRIMARY KEY AUTOINCREMENT, touch_x TEXT, touch_y TEXT)").then(id => {
        page.bindingContext = createViewModel(db);
    }, error => {
        console.log("CREATE TABLE ERROR", error);
    });
}, error => {
    console.log("OPEN DB ERROR", error);
});*/
page.bindingContext = { someProperty : 30};
} exports.onLoaded = onLoaded;


function navSymptom(){
  frameModule.topmost().navigate('views/diary/symptoms/symptoms');
}
exports.navSymptom = navSymptom;
