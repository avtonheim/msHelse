var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
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
          database.execSQL("INSERT INTO symptom (symptomItem) VALUES (?)", [btnId]).then(id => {
              console.log("INSERT RESULT", btnId);
          }, error => {
              console.log("INSERT ERROR", error);
          });
      }

      viewModel.select = function() {
            database.all("SELECT symptomItem FROM symptom").then(rows => {
                for(var row in rows) {
                 console.log("Result", rows[row]);

                }
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }
        viewModel.select();
    return viewModel;
}
exports.createViewModel = createViewModel;
