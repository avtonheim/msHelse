var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.lists = new ObservableArray([]);


    // insert a new record
    viewModel.insert = function(touch_x, touch_y) {
        new Sqlite("my.db", function(err, db) {
            db.execSQL("INSERT INTO pinch (touch_x, touch_y) VALUES (?,?)", [touch_x, touch_y], function(err, id) {
                console.log("The new record id is: " + id);
            });
        });
    }

    // select a single record
    viewModel.selectRecord = function() {
        new sqlite("my.db", function(err, db) {
            db.all("SELECT * FROM pinch ORDER BY id", [], function(err, rs) {
                console.log("Result set is: " + rs);  // Prints [["Field1", "Field2",...]]
            });
        });
    }

    viewModel.selectRecord();

    return viewModel;
}
exports.createViewModel = createViewModel;
