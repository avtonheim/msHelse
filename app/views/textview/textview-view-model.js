var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");

function createViewModel(database, id) {
    var viewModel = new Observable();
    viewModel.specificText = new ObservableArray([]);
    viewModel.Id = id;

    viewModel.select = function() {
        this.specificText = new ObservableArray([]);
        database.all("SELECT content, timestamp FROM dialouge WHERE id = ?", [this.Id]).then(rows => {
            for(var row in rows) {
                this.specificText.push({content: rows[row][0], date: rows[row][1]});
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    viewModel.select();

    return viewModel;
}

exports.createViewModel = createViewModel;
