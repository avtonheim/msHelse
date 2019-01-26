var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Dialogs = require("ui/dialogs");

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.lists = new ObservableArray([]);

    viewModel.insert = function() {
        Dialogs.prompt({
          title: "Legg til nytt gjøremål",
          message: "Planlegg ein kjekk aktivitet!",
          okButtonText: "Legg til",
          cancelButtonText: "Avbryt"
        }).then(result => {
            database.execSQL("INSERT INTO lists (list_name, status) VALUES (?, ?)", [result.text, "doing"]).then(id => {
                this.lists.push({id: id, list_name: result.text});
            }, error => {
                console.log("INSERT ERROR", error);
            });
        });
    }

    viewModel.select = function() {
        this.lists = new ObservableArray([]);
        database.all("SELECT id, list_name FROM lists WHERE status = 'doing'").then(rows => {
            for(var row in rows) {
                this.lists.push({id: rows[row][0], list_name: rows[row][1]});
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    /* Denne skal kunne sette done basert på klikk i listview */
    viewModel.updateItemDone = function(args) {
        var listName = args.object.text;
        this.listsDone = new ObservableArray([]);
        database.all("UPDATE lists SET status = 'done' WHERE list_name = (list_name) VALUES (?) ", [listName]).then(rows => {
            for(var row in rows) {
                
                this.listsDone.push({id: rows[row][0], list_name: rows[row][1]});
                console.log(this.listsDone);
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

     
     viewModel.doneItems = function() {
        this.listsDone = new ObservableArray([]);
        database.all("SELECT id, list_name FROM lists WHERE status = 'done'").then(rows => {
            for(var row in rows) {
                this.listsDone.push({id: rows[row][0], list_name: rows[row][1]});
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    viewModel.delete = function(id) {
        this.lists = new ObservableArray([]);
        database.all("DELETE FROM lists WHERE id = (?)", [id]).then(rows => {
            for(var row in rows) {
                this.lists.push({id: rows[row][0], list_name: rows[row][1]});
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }


    viewModel.select();
    viewModel.doneItems();

    return viewModel;
}
exports.createViewModel = createViewModel;
