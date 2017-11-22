var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");
var Dialogs = require("ui/dialogs");

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();

    viewModel.insert = function() {
          database.execSQL("INSERT INTO dialouge (content, timestamp) VALUES (?, datetime())", [this.textItem]).then(id => {
              console.log("INSERT RESULT", this.textItem);
          }, error => {
              console.log("INSERT ERROR", error);
          });
      }


      viewModel.select = function() {
            database.all("SELECT * FROM dialouge").then(rows => {
                for(var row in rows) {
                    console.log("RESULT", rows[row]);
                }
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }

    viewModel.select();

    return viewModel;
}
exports.createViewModel = createViewModel;
