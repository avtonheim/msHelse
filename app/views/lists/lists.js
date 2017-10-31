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

//TODO: make a checklist of checked items

function markDone(args) {
  var listId = args.view;
  listId.backgroundColor = "#3489db";
  console.log("Changed " + listId + " to selected");

} exports.markDone = markDone;

/*Next buttin to text-general*/
function navText(){
  FrameModule.topmost().navigate('views/diary/text/text');
} exports.navText = navText;
