var createViewModel = require("./lists-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");
var FrameModule = require("ui/frame");


function onNavigatingTo(args) {
    var page = args.object;
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
