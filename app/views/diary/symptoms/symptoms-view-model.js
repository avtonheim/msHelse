var Observable = require("data/observable").Observable;
var Sqlite = require("nativescript-sqlite");

//Read more of SQLITE in nativescript
//https://developer.telerik.com/products/nativescript/going-off-the-grid-with-nativescript/

function createViewModel(database) {
    var viewModel = new Observable();

    viewModel.insert = function(args) {
          var btnText = args.object.text;
          var btn = args.object;
          btn.backgroundColor = "#3489db";
          new Sqlite("my.db", function(err, db) {
              db.execSQL("INSERT INTO symptoms (symptom, timestamp) VALUES (?, datetime())", [btnText], function(err, id) {
                  console.log("The new record id is: " + btnText);
              });
          });
      }

      viewModel.select = function() {
            database.all("SELECT * FROM symptoms").then(rows => {
                for(var row in rows) {
                 console.log("Result", rows[row]);
                }
            }, error => {
                console.log("SELECT ERROR", error);
            });
        }
    return viewModel;
}
exports.createViewModel = createViewModel;
