var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var Dialogs = require("ui/dialogs");

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.lists = new ObservableArray([]);

    viewModel.insert = function() {
        Dialogs.prompt("Nytt gjøremål. Legg til tekst i boksen", "").then(result => {
            database.execSQL("INSERT INTO lists (list_name) VALUES (?)", [result.text]).then(id => {
                this.lists.push({id: id, list_name: result.text});
            }, error => {
                console.log("INSERT ERROR", error);
            });
        });
    }

    viewModel.select = function() {
        this.lists = new ObservableArray([]);
        database.all("SELECT id, list_name FROM lists").then(rows => {
            for(var row in rows) {
                this.lists.push({id: rows[row][0], list_name: rows[row][1]});
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    //Deleting whole table
    viewModel.delete = function() {
      new Sqlite("my.db", function(err, db) {
        database.execSQL("DROP TABLE IF EXISTS lists", [], function(err) {
            Dialogs.alert("Alle gjøremål er sletta");
            viewModel.set('lists', []);
        });
    });
}


    viewModel.select();

    return viewModel;
}
exports.createViewModel = createViewModel;
