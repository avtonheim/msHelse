var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");
var Dialogs = require("ui/dialogs");

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();

    viewModel.insert = function(args) {
          var btnId = args.object.text;
          var btn = args.object;
          btn.backgroundColor = "#3489db";
          database.execSQL("INSERT INTO symptoms (symptomItem) VALUES (?)", [btnId]).then(id => {
            Dialogs.alert("Lagret!")
              console.log("INSERT RESULT", id);
          }, error => {
              console.log("INSERT ERROR", error);
          });
      }

      viewModel.select = function() {
            database.all("SELECT * FROM symptoms").then(rows => {
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
