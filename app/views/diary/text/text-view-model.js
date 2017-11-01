var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");
var Dialogs = require("ui/dialogs");

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.textItem = "";


    viewModel.insert = function() {
          database.execSQL("INSERT INTO text (textItem) VALUES (?)", [this.textItem]).then(id => {
            Dialogs.alert("Lagret!")
              console.log("INSERT RESULT", id);
          }, error => {
              console.log("INSERT ERROR", error);
          });
      }


      viewModel.select = function() {
            database.all("SELECT * FROM text").then(rows => {
                for(var row in rows) {
                    console.log("RESULT", rows[row]);
                }
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }


    return viewModel;
}
exports.createViewModel = createViewModel;
