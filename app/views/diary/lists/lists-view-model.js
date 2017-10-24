var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var Dialogs = require("ui/dialogs");

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.lists = new ObservableArray([]);

    viewModel.insert = function() {
        Dialogs.prompt("Todo List Name", "").then(result => {
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

    /*Slette ein og ein*/
    viewModel.delete = function() {
    Dialogs.confirm("Er du sikker på at du vil slette dette gjøremålet?").then((agree) => {
        if(agree){

            db.execSQL("DELETE id, list_name FROM lists", []).then(
                (err) => {
                    if(!err){
                        Dialogs.alert("Dine gjøremål er sletta!");
                        lists = [];
                        viewModel.set('list_name', []);
                    }
                }
            );
        }
    });

    }

    viewModel.select();

    return viewModel;
}
exports.createViewModel = createViewModel;
