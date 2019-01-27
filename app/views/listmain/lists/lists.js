var createViewModel = require("./lists-view-model").createViewModel;
var Sqlite = require("nativescript-sqlite");


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

//https://stackoverflow.com/questions/37652578/click-event-on-an-item-template sjå denne for databinding i item.itemtemplate
//https://github.com/NativeScript/NativeScript/issues/4469#issuecomment-334079192

