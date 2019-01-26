var createViewModel = require("./lists-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var FrameModule = require("ui/frame");
var observable = require("data/observable");
var pageData = new observable.Observable();

function onNavigatingTo(args) {
    var page = args.object;
    if(!Sqlite.exists("populated.db")) {
        Sqlite.copyDatabase("populated.db");
    }
    (new Sqlite("populated.db")).then(db => {
        db.execSQL("CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, list_name TEXT, status TEXT)").then(id => {
            page.bindingContext = createViewModel(db);
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });
} exports.onNavigatingTo = onNavigatingTo;

function buttonClick(args){
    const page = args.object;
    const element = page.getViewById("setActiveButton");
    element.classList.toggle("listItemsDone");
    console.log(element.text + element.id);
  } exports.buttonClick = buttonClick;

//https://stackoverflow.com/questions/37652578/click-event-on-an-item-template sjå denne for databinding i item.itemtemplate
//https://github.com/NativeScript/NativeScript/issues/4469#issuecomment-334079192
 
/*Next buttin to text-general*/
function navText(){
  FrameModule.topmost().navigate('views/diary/text/text');
} exports.navText = navText;

