var createViewModel = require("./lists-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var FrameModule = require("ui/frame");
var observable = require("data/observable");
var pageData = new observable.Observable();

function onNavigatingTo(args) {
    var page = args.object;
    const finsihed = false;
    (new Sqlite("my.db")).then(db => {
        db.execSQL("CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, list_name TEXT)").then(id => {
            page.bindingContext = createViewModel(db);
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });
} exports.onNavigatingTo = onNavigatingTo;
 
/*Next buttin to text-general*/
function navText(){
  FrameModule.topmost().navigate('views/diary/text/text');
} exports.navText = navText;

function loaded(args){    
    pageData.set("done", true);
    args.object.bindingContext = pageData;
  } exports.loaded = loaded;

  function tapDone(args){
    const index = args.index;
    const page = args.object.page;
    const listView = page.getViewById("listView");
    page.bindingContext.lists.push({ list_name: "ferdig!"});
    listView.refresh();

	pageData.set("done", !pageData.get("done"));
} exports.tapDone = tapDone;
